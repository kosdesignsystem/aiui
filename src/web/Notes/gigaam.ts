/** Real GigaAM inference runs in a browser Worker; audio is never uploaded. */
import { loadBrowserGigaam, transcribeBrowserGigaam, cancelBrowserGigaam } from './gigaam-web-engine';
export type GigaamPhase = 'starting' | 'listening' | 'processing';
export type GigaamCallbacks = {
  onPhase: (phase: GigaamPhase, message: string) => void;
  onText: (text: string) => void;
  onPartial?: (text: string) => void;
  onError: (message: string) => void;
};
export const canRunBrowserGigaam = () => typeof Worker !== 'undefined' && typeof WebAssembly !== 'undefined';

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
  private failed = false;
  private sampleRate = 0;
  private lastRequested = 0;
  private lastCompleted = 0;
  private lastResult = '';
  private inFlight?: Promise<void>;
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
      if (!canRunBrowserGigaam()) throw new Error('В этом браузере недоступен запуск модели GigaAM');
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Микрофон недоступен. Откройте страницу по HTTPS');
      this.callbacks.onPhase('starting', 'Загружаем GigaAM в браузер…');
      this.context = new AudioContext();
      await this.context.resume();
      if (this.cancelled) return;
      await loadBrowserGigaam(message => { if (!this.cancelled) this.callbacks.onPhase('starting', message); });
      if (this.cancelled) return;
      this.callbacks.onPhase('starting', 'Разрешите доступ к микрофону');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
      if (this.cancelled) { stream.getTracks().forEach(track => track.stop()); return; }
      this.stream = stream;
      const context = this.context;
      this.sampleRate = context.sampleRate;
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
        else if (!this.inFlight && this.samples - this.lastRequested >= this.sampleRate * 0.9) {
          // Keep only one inference in flight. Skip obsolete snapshots on slow devices.
          this.inFlight = this.recognizeSnapshot()
            .catch(error => this.fail(error))
            .finally(() => { this.inFlight = undefined; });
        }
      };
      this.source.connect(this.processor); this.processor.connect(this.mute); this.mute.connect(context.destination);
      this.callbacks.onPhase('listening', 'Говорите — текст появляется во время речи');
      this.timer = setTimeout(() => void this.stop(), 20000);
    } catch (error) { this.fail(error); }
  }

  async stop() {
    if (this.stopped || this.cancelled) return;
    if (!this.stream) { this.cancel(); this.callbacks.onText(''); return; }
    this.stopped = true;
    this.release();
    if (this.samples < this.sampleRate * 0.2) { this.callbacks.onError('Запись слишком короткая. Попробуйте ещё раз'); return; }
    this.callbacks.onPhase('processing', 'Уточняем последние слова…');
    try {
      // Finish the current partial before requesting the final, full snapshot.
      await this.inFlight;
      if (this.cancelled || this.failed) return;
      if (this.lastCompleted !== this.samples) await this.recognizeSnapshot();
      if (!this.cancelled && !this.failed) this.callbacks.onText(this.lastResult);
    } catch (error) { this.fail(error); }
    finally { this.chunks = []; }
  }

  private async recognizeSnapshot() {
    const sampleCount = this.samples;
    this.lastRequested = sampleCount;
    const audio = new Float32Array(sampleCount);
    let offset = 0;
    for (const chunk of this.chunks) { audio.set(chunk, offset); offset += chunk.length; }
    const offline = new OfflineAudioContext(1, Math.ceil(audio.length * 16000 / this.sampleRate), 16000);
    const buffer = offline.createBuffer(1, audio.length, this.sampleRate);
    buffer.copyToChannel(audio, 0);
    const source = offline.createBufferSource(); source.buffer = buffer; source.connect(offline.destination); source.start();
    const converted = await offline.startRendering();
    if (this.cancelled || this.failed) return;
    const text = await transcribeBrowserGigaam(converted.getChannelData(0).slice());
    if (this.cancelled || this.failed) return;
    this.lastCompleted = sampleCount; this.lastResult = text;
    this.callbacks.onPartial?.(text);
  }

  cancel() { this.cancelled = true; cancelBrowserGigaam(); this.release(); this.chunks = []; }
  private release() {
    clearTimeout(this.timer);
    if (this.processor) { this.processor.onaudioprocess = null; this.processor.disconnect(); }
    this.source?.disconnect(); this.mute?.disconnect();
    this.stream?.getTracks().forEach(track => track.stop());
    if (this.context && this.context.state !== 'closed') void this.context.close().catch(() => {});
  }
  private fail(error: unknown) {
    this.release();
    if (this.cancelled || this.failed) return;
    this.failed = true;
    const name = error instanceof Error ? error.name : '';
    const message = name === 'NotAllowedError' ? 'Разрешите доступ к микрофону в настройках сайта'
      : name === 'NotFoundError' ? 'Микрофон не найден'
      : name === 'AbortError' ? 'Обработка GigaAM прервана'
      : error instanceof TypeError ? 'Не удалось загрузить GigaAM. Проверьте соединение и повторите'
      : error instanceof Error ? error.message : 'Не удалось распознать запись';
    this.callbacks.onError(message);
  }
}
