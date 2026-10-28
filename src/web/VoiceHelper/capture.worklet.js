// AudioWorklet runs outside the UI thread. It sends mono signed PCM16 in 200 ms packets.
class VoiceHelperCapture extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = new Int16Array(Math.round(sampleRate / 5));
    this.offset = 0;
    this.recording = true;
    this.port.onmessage = ({ data }) => {
      if (data.type !== 'stop') return;
      this.recording = false;
      this.flush();
      this.port.postMessage({ type: 'flushed' });
    };
  }
  flush() {
    if (!this.offset) return;
    const pcm = this.buffer.slice(0, this.offset).buffer;
    this.port.postMessage({ type: 'pcm', pcm }, [pcm]);
    this.offset = 0;
  }
  process(inputs) {
    const channel = inputs[0]?.[0];
    if (!this.recording || !channel) return true;
    for (const value of channel) {
      const sample = Math.max(-1, Math.min(1, value));
      this.buffer[this.offset++] = Math.round(sample * (sample < 0 ? 32768 : 32767));
      if (this.offset === this.buffer.length) this.flush();
    }
    return true;
  }
}
registerProcessor('voicehelper-capture', VoiceHelperCapture);
