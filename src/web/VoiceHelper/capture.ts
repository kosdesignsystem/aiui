import workletUrl from './capture.worklet.js?url';

export type TranscriptEvent = { type: 'transcript'; segment: number; text: string; final: boolean; latencyMs: number };
type Callbacks = { transcript: (event: TranscriptEvent) => void; done: () => void; error: (error: Error) => void };

const serviceAddressKey = 'voicehelper-service-address';

export function savedServiceAddress() {
	try { return localStorage.getItem(serviceAddressKey) || ''; } catch { return ''; }
}

export function normalizeServiceAddress(value: string) {
	if (!value.trim()) return '';
	let url: URL;
	try { url = new URL(value.trim()); } catch { throw new Error('Укажите полный HTTPS-адрес сервиса GigaAM.'); }
	const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
	if (url.protocol !== 'https:' && !(url.protocol === 'http:' && local)) {
		throw new Error('Для подключения к сервису нужен HTTPS. HTTP разрешён только для localhost.');
	}
	if (url.username || url.password || url.search || url.hash) throw new Error('Укажите адрес без пароля, параметров и фрагмента.');
	url.pathname = url.pathname.replace(/\/(health|stream)\/?$/, '').replace(/\/$/, '') || '/voicehelper';
	return url.toString().replace(/\/$/, '');
}

export function saveServiceAddress(value: string) {
	const address = normalizeServiceAddress(value);
	try {
		if (address) localStorage.setItem(serviceAddressKey, address);
		else localStorage.removeItem(serviceAddressKey);
	} catch { throw new Error('Браузер не разрешил сохранить адрес подключения.'); }
	return address;
}

export function needsServiceAddress() {
	return !savedServiceAddress() && !import.meta.env.VITE_VOICEHELPER_URL && window.location.hostname.endsWith('.github.io');
}

export function serviceUrl(path: string) {
	const base = savedServiceAddress() || import.meta.env.VITE_VOICEHELPER_URL || '/voicehelper';
	return new URL(`${base.replace(/\/$/, '')}/${path}`, window.location.origin);
}

export function microphoneError(error: unknown): string {
	if (error instanceof DOMException) {
		if (error.name === 'NotAllowedError') return 'Доступ к микрофону запрещён. Разрешите его в настройках браузера и попробуйте снова.';
		if (error.name === 'NotFoundError') return 'Микрофон не найден. Подключите его и попробуйте снова.';
		if (error.name === 'NotReadableError') return 'Микрофон недоступен или занят другим приложением.';
	}
	return error instanceof Error ? error.message : 'Не удалось начать запись.';
}

export class VoiceCapture {
	private socket: WebSocket | null = null;
	private media: MediaStream | null = null;
	private context: AudioContext | null = null;
	private node: AudioWorkletNode | null = null;
	private disposed = false;
	private recording = false;
	private timer: number | undefined;
	private flushTimer: number | undefined;
	private waiters = new Map<string, { resolve: () => void; reject: (error: Error) => void }>();
	constructor(private callbacks: Callbacks) {}

	private wait(type: string) {
		return new Promise<void>((resolve, reject) => { this.waiters.set(type, { resolve, reject }); });
	}
	private checkActive() {
		if (this.disposed) throw new Error('Запись отменена.');
	}
	private fail(error: Error) {
		if (this.disposed) return;
		this.dispose();
		this.callbacks.error(error);
	}
	private releaseAudio() {
		this.recording = false;
		this.node?.disconnect(); this.node = null;
		this.media?.getTracks().forEach((track) => track.stop()); this.media = null;
		const context = this.context; this.context = null;
		if (context && context.state !== 'closed') void context.close().catch(() => {});
	}

	async start() {
		if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
			throw new Error('Для записи нужен HTTPS или localhost и браузер с поддержкой микрофона.');
		}
		const url = serviceUrl('stream');
		url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
		const connected = this.wait('connected');
		this.socket = new WebSocket(url);
		this.socket.onmessage = ({ data }) => {
			if (this.disposed) return;
			try {
				const event = JSON.parse(data);
				if (event.type === 'error') { this.fail(new Error(event.message)); return; }
				this.waiters.get(event.type)?.resolve(); this.waiters.delete(event.type);
				if (event.type === 'transcript') this.callbacks.transcript(event);
				if (event.type === 'done') { this.dispose(); this.callbacks.done(); }
			} catch { this.fail(new Error('Некорректный ответ сервиса распознавания.')); }
		};
		this.socket.onerror = () => this.fail(new Error('Не удалось подключиться к сервису GigaAM.'));
		this.socket.onclose = () => { if (!this.disposed) this.fail(new Error('Связь с сервисом GigaAM прервана. Распознанный текст сохранён.')); };
		this.timer = window.setTimeout(() => this.fail(new Error('Сервис GigaAM не ответил вовремя.')), 15000);
		await connected;
		window.clearTimeout(this.timer);
		try {
			const media = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true }, video: false });
			if (this.disposed) { media.getTracks().forEach((track) => track.stop()); return; }
			this.media = media;
			media.getAudioTracks().forEach((track) => { track.onended = () => this.fail(new Error('Микрофон отключён.')); });
			try { this.context = new AudioContext({ sampleRate: 16000 }); } catch { this.context = new AudioContext(); }
			await this.context.audioWorklet.addModule(workletUrl);
			this.checkActive();
			const context = this.context;
			this.node = new AudioWorkletNode(context, 'voicehelper-capture');
			this.node.port.onmessage = ({ data }) => {
				if (this.disposed) return;
				if (data.type === 'flushed') {
					window.clearTimeout(this.flushTimer);
					this.releaseAudio();
					if (this.socket?.readyState === WebSocket.OPEN) this.socket.send(JSON.stringify({ type: 'stop' }));
					return;
				}
				if (data.type === 'pcm' && this.socket?.readyState === WebSocket.OPEN) {
					if (this.socket.bufferedAmount > 262144) { this.fail(new Error('Сервис не успевает принимать звук. Попробуйте новую запись.')); return; }
					this.socket.send(data.pcm);
				}
			};
			const ready = this.wait('ready');
			this.socket?.send(JSON.stringify({ type: 'start', sampleRate: context.sampleRate }));
			this.timer = window.setTimeout(() => this.fail(new Error('Не удалось подготовить распознавание.')), 15000);
			await ready;
			this.checkActive();
			window.clearTimeout(this.timer);
			const source = context.createMediaStreamSource(media);
			const silent = context.createGain(); silent.gain.value = 0;
			source.connect(this.node); this.node.connect(silent); silent.connect(context.destination);
			await context.resume(); this.checkActive(); this.recording = true;
		} catch (error) { this.dispose(); throw error; }
	}
	stop() {
		if (!this.recording || this.disposed) return;
		this.recording = false;
		this.node?.port.postMessage({ type: 'stop' });
		this.flushTimer = window.setTimeout(() => this.fail(new Error('Не удалось завершить запись микрофона.')), 2000);
		this.timer = window.setTimeout(() => this.fail(new Error('Распознавание заняло слишком много времени. Уже полученный текст сохранён.')), 95000);
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		window.clearTimeout(this.timer); window.clearTimeout(this.flushTimer);
		this.waiters.forEach(({ reject }) => reject(new Error('Запись отменена.'))); this.waiters.clear();
		this.releaseAudio();
		this.socket?.close(); this.socket = null;
	}
}

export function joinTranscripts(parts: string[]) {
	return parts.reduce((result, part) => {
		const words = part.trim().split(/\s+/).filter(Boolean);
		const previous = result.split(/\s+/);
		let overlap = 0;
		for (let count = 1; count <= Math.min(5, previous.length, words.length); count++) {
			if (previous.slice(-count).join(' ').toLowerCase() === words.slice(0, count).join(' ').toLowerCase()) overlap = count;
		}
		return [result, words.slice(overlap).join(' ')].filter(Boolean).join(' ');
	}, '');
}
