/** Local Mac GigaAM transport. No browser ASR model or audio upload off-device. */
import type { GigaamCallbacks } from './gigaam';
export const canRunBrowserGigaam = () => ['localhost', '127.0.0.1'].includes(location.hostname)
  && !!navigator.mediaDevices?.getUserMedia && typeof AudioWorkletNode !== 'undefined';
export const recognitionLabel = 'GigaAM · модель на вашем компьютере';
export const unavailableMessage = 'Откройте локальное приложение: http://localhost:8765';
export const releaseRecognizer = () => {};

export class GigaamRecording {
  private socket?: WebSocket;
  private stream?: MediaStream;
  private context?: AudioContext;
  private source?: MediaStreamAudioSourceNode;
  private node?: AudioWorkletNode;
  private cancelled = false;
  private stopped = false;
  private complete = false;
  private pendingBytes = 0;
  private timeout?: ReturnType<typeof setTimeout>;
  constructor(private callbacks: GigaamCallbacks) {}

  async start() {
    try {
      if (!canRunBrowserGigaam()) throw new Error(unavailableMessage);
      this.callbacks.onPhase('starting', 'Проверяем GigaAM на компьютере…');
      // Resume during the user gesture; later model/network waits must not suspend it.
      this.context = new AudioContext({ sampleRate: 16000 });
      await this.context.resume();
      if (this.cancelled || this.stopped) return;
      const health = await fetch('/api/health', { signal: AbortSignal.timeout(10000) }).then(r => r.json());
      if (this.cancelled || this.stopped) return;
      if (health.engine !== 'gigaam' || health.transport !== 'websocket') throw new Error('Запустите новую версию scripts/start-gigaam.sh');
      if (health.status !== 'ready') throw new Error(health.error || 'GigaAM загружается. Дождитесь ready в терминале');
      const socket = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/api/stream`);
      this.socket = socket;
      await new Promise<void>((resolve, reject) => {
        this.timeout = setTimeout(() => reject(new Error('GigaAM не отвечает')), 15000);
        socket.onerror = () => reject(new Error('Нет связи с GigaAM'));
        socket.onclose = () => reject(new Error('Сеанс недоступен. Проверьте другую вкладку и терминал'));
        socket.onmessage = event => {
          try {
            if (JSON.parse(event.data).type !== 'ready') throw new Error('Некорректный ответ GigaAM');
            clearTimeout(this.timeout); resolve();
          } catch (e) { reject(e); }
        };
      });
      if (this.cancelled || this.stopped) return;
      socket.onmessage = event => {
        if (this.cancelled || this.complete) return;
        try {
          const result = JSON.parse(event.data);
          if (result.type === 'ack') { this.pendingBytes = Math.max(0, this.pendingBytes - result.bytes); return; }
          if (result.type === 'error') throw new Error(result.error);
          if (typeof result.text !== 'string') throw new Error('Некорректный текст GigaAM');
          if (result.type === 'partial') this.callbacks.onPartial?.(result.text);
          else if (result.type === 'done') {
            this.complete = true; clearTimeout(this.timeout); this.release();
            this.callbacks.onText(result.text);
          }
        } catch (e) { this.fail(e); }
      };
      socket.onerror = () => this.fail(new Error('Нет связи с GigaAM. Проверьте терминал'));
      socket.onclose = () => { if (!this.complete && !this.cancelled) this.fail(new Error('Связь с GigaAM прервалась. Показанный текст сохранён')); };
      this.callbacks.onPhase('starting', 'Разрешите доступ к микрофону');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
      if (this.cancelled || this.stopped) { stream.getTracks().forEach(t => t.stop()); return; }
      this.stream = stream;
      const context = this.context!;
      await context.audioWorklet.addModule(new URL('notes-pcm-worklet.js', document.baseURI).href);
      if (this.cancelled || this.stopped) return;
      this.node = new AudioWorkletNode(context, 'notes-pcm');
      this.node.port.onmessage = event => {
        if (event.data === 'flushed') { this.finishCapture(); return; }
        if (this.cancelled || this.complete || socket.readyState !== WebSocket.OPEN) return;
        const bytes = (event.data as ArrayBuffer).byteLength;
        // Bound both browser transport and server backlog (ack after VAD ingestion).
        if (socket.bufferedAmount + bytes > 96000 || this.pendingBytes + bytes > 96000) {
          this.fail(new Error('Компьютер не успевает принимать звук. Диктовка остановлена; текст сохранён'));
          return;
        }
        this.pendingBytes += bytes; socket.send(event.data);
      };
      this.source = context.createMediaStreamSource(stream);
      this.source.connect(this.node); this.node.connect(context.destination);
      this.callbacks.onPhase('listening', 'Говорите — текст появляется во время речи');
    } catch (error) { this.fail(error); }
  }

  async stop() {
    if (this.stopped || this.cancelled || this.complete) return;
    this.stopped = true;
    if (!this.node) { this.cancel(); this.callbacks.onText(''); return; }
    this.callbacks.onPhase('processing', 'Завершаем последнюю фразу…');
    this.timeout = setTimeout(() => this.fail(new Error('GigaAM не ответил. Показанный текст сохранён')), 60000);
    this.node.port.postMessage('flush');
    this.stream?.getTracks().forEach(t => t.stop());
  }
  private finishCapture() {
    if (this.cancelled || this.complete) return;
    this.release();
    if (this.socket?.readyState === WebSocket.OPEN) this.socket.send(JSON.stringify({ type: 'stop' }));
  }
  cancel() {
    this.cancelled = true; clearTimeout(this.timeout); this.release();
    this.socket?.close();
  }
  private release() {
    if (this.node) this.node.port.onmessage = null;
    this.source?.disconnect(); this.node?.disconnect();
    this.stream?.getTracks().forEach(t => t.stop());
    if (this.context && this.context.state !== 'closed') void this.context.close().catch(() => {});
  }
  private fail(error: unknown) {
    if (this.cancelled || this.complete) return;
    this.cancel();
    const name = error instanceof Error ? error.name : '';
    this.callbacks.onError(name === 'NotAllowedError' ? 'Разрешите доступ к микрофону в настройках сайта'
      : name === 'NotFoundError' ? 'Микрофон не найден'
      : error instanceof Error ? error.message : 'Ошибка локального GigaAM');
  }
}
