/** The only recognizer used by Notes: same-origin, local GigaAM Python service. */
export type GigaamPhase = 'starting' | 'listening' | 'processing';
export type GigaamCallbacks = {
  onPhase: (phase: GigaamPhase, message: string) => void;
  onText: (text: string) => void;
  onError: (message: string) => void;
};
export const isLocalGigaamPage = () => ['localhost', '127.0.0.1'].includes(location.hostname);

export function encodeWav(chunks: Float32Array[], sampleRate: number): Blob {
  const samples = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);
  const ascii = (offset: number, text: string) => Array.from(text).forEach((letter, i) => view.setUint8(offset + i, letter.charCodeAt(0)));
  ascii(0, 'RIFF'); view.setUint32(4, buffer.byteLength - 8, true); ascii(8, 'WAVE');
  ascii(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  ascii(36, 'data'); view.setUint32(40, samples * 2, true);
  let offset = 44;
  for (const chunk of chunks) for (const sample of chunk) {
    const clipped = Math.max(-1, Math.min(1, sample));
    view.setInt16(offset, Math.round(clipped * (clipped < 0 ? 32768 : 32767)), true); offset += 2;
  }
  return new Blob([buffer], { type: 'audio/wav' });
}

export class GigaamRecording {
  private cancelled = false;
  private stopped = false;
  private controller = new AbortController();
  private stream?: MediaStream;
  private context?: AudioContext;
  private processor?: ScriptProcessorNode;
  private source?: MediaStreamAudioSourceNode;
  private mute?: GainNode;
  private timer?: ReturnType<typeof setTimeout>;
  private chunks: Float32Array[] = [];
  private samples = 0;
  private limit = 0;
  constructor(private callbacks: GigaamCallbacks) {}

  async start() {
    try {
      if (!isLocalGigaamPage()) throw new Error('Для GigaAM запустите локальную версию: localhost:8765');
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Микрофон недоступен. Откройте локальную страницу в браузере');
      this.callbacks.onPhase('starting', 'Проверяем GigaAM…');
      this.context = new AudioContext();
      await this.context.resume();
      if (this.cancelled) return;
      const healthResponse = await fetch('/api/health', { signal: this.controller.signal });
      if (!healthResponse.ok) throw new Error('Локальный сервис GigaAM не запущен');
      const health = await healthResponse.json();
      if (health.engine !== 'gigaam') throw new Error('Откройте локальную версию на localhost:8765');
      if (health.status !== 'ready') throw new Error(health.error || 'GigaAM загружается. Дождитесь ready в терминале и нажмите снова');
      if (this.cancelled) return;
      this.callbacks.onPhase('starting', 'Разрешите доступ к микрофону');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
      if (this.cancelled) { stream.getTracks().forEach(track => track.stop()); return; }
      this.stream = stream;
      const context = this.context;
      this.limit = context.sampleRate * 20;
      this.source = context.createMediaStreamSource(stream);
      this.processor = context.createScriptProcessor(4096, 1, 1);
      this.mute = context.createGain(); this.mute.gain.value = 0;
      this.processor.onaudioprocess = event => {
        if (this.stopped || this.cancelled) return;
        const remaining = this.limit - this.samples;
        const chunk = event.inputBuffer.getChannelData(0).slice(0, Math.max(0, remaining));
        this.chunks.push(chunk); this.samples += chunk.length;
        if (this.samples >= this.limit) void this.stop();
      };
      this.source.connect(this.processor); this.processor.connect(this.mute); this.mute.connect(context.destination);
      this.callbacks.onPhase('listening', 'Говорите до 20 с. Нажмите микрофон для завершения');
      this.timer = setTimeout(() => void this.stop(), 20000);
    } catch (error) { this.fail(error); }
  }

  async stop() {
    if (this.stopped || this.cancelled) return;
    if (!this.stream) { this.cancel(); this.callbacks.onText(''); return; }
    this.stopped = true;
    const sampleRate = this.context!.sampleRate;
    const blob = encodeWav(this.chunks, sampleRate);
    this.release(); this.chunks = [];
    if (blob.size <= 44 + sampleRate * 0.2) { this.callbacks.onError('Запись слишком короткая. Попробуйте ещё раз'); return; }
    this.callbacks.onPhase('processing', 'GigaAM распознаёт запись…');
    const timeout = setTimeout(() => this.controller.abort(), 180000);
    try {
      const response = await fetch('/api/transcribe', { method: 'POST', headers: { 'Content-Type': 'audio/wav' }, body: blob, signal: this.controller.signal });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Ошибка GigaAM');
      if (!this.cancelled) {
        if (result.model && typeof result.text === 'string') this.callbacks.onText(result.text);
        else throw new Error('Некорректный ответ GigaAM');
      }
    } catch (error) { this.fail(error); }
    finally { clearTimeout(timeout); }
  }

  cancel() { this.cancelled = true; this.controller.abort(); this.release(); this.chunks = []; }
  private release() {
    clearTimeout(this.timer);
    if (this.processor) { this.processor.onaudioprocess = null; this.processor.disconnect(); }
    this.source?.disconnect(); this.mute?.disconnect();
    this.stream?.getTracks().forEach(track => track.stop());
    if (this.context && this.context.state !== 'closed') void this.context.close().catch(() => {});
  }
  private fail(error: unknown) {
    this.release();
    if (this.cancelled) return;
    const name = error instanceof Error ? error.name : '';
    const message = name === 'NotAllowedError' ? 'Разрешите доступ к микрофону в настройках сайта'
      : name === 'NotFoundError' ? 'Микрофон не найден'
      : name === 'AbortError' ? 'GigaAM не ответил за 3 минуты. Проверьте терминал'
      : error instanceof TypeError ? 'Нет связи с локальным GigaAM. Проверьте терминал'
      : error instanceof Error ? error.message : 'Не удалось распознать запись';
    this.callbacks.onError(message);
  }
}
