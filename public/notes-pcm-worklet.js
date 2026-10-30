/* Mono PCM16 / 16 kHz; area averaging fallback if the actual rate differs. */
class NotesPCM extends AudioWorkletProcessor {
  constructor() {
    super();
    this.samples = new Int16Array(2048);
    this.used = 0; this.area = 0; this.width = 0; this.closed = false;
    this.port.onmessage = event => {
      if (event.data === 'flush') {
        this.closed = true;
        if (this.width) this.emit(this.area / this.width);
        this.flush(); this.port.postMessage('flushed');
      }
    };
  }
  emit(value) {
    const v = Math.max(-1, Math.min(1, value));
    this.samples[this.used++] = Math.round(v * (v < 0 ? 32768 : 32767));
    if (this.used === this.samples.length) this.flush();
  }
  flush() {
    if (!this.used) return;
    const buffer = this.samples.slice(0, this.used).buffer;
    this.port.postMessage(buffer, [buffer]); this.used = 0;
  }
  process(inputs) {
    if (this.closed) return false;
    const input = inputs[0]?.[0];
    if (!input) return true;
    const step = sampleRate / 16000;
    for (const value of input) {
      let remaining = 1;
      while (remaining > 1e-9) {
        const take = Math.min(remaining, step - this.width);
        this.area += value * take; this.width += take; remaining -= take;
        if (this.width >= step - 1e-9) { this.emit(this.area / step); this.area = 0; this.width = 0; }
      }
    }
    return true;
  }
}
registerProcessor('notes-pcm', NotesPCM);
