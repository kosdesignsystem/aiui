import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const bundle = await build({ entryPoints: ['src/web/Notes/gigaam.ts'], bundle: true, write: false, format: 'esm', platform: 'node' });
const { GigaamRecording, encodeWav } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

function setup(fetcher, getStream) {
  globalThis.location = { hostname: 'localhost' };
  let stopped = false;
  const stream = { getTracks: () => [{ stop() { stopped = true; } }] };
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { mediaDevices: { getUserMedia: getStream || (async () => stream) } } });
  globalThis.AudioContext = class {
    sampleRate = 48000; state = 'running'; destination = {};
    async resume() {} async close() { this.state = 'closed'; }
    createMediaStreamSource() { return { connect() {}, disconnect() {} }; }
    createGain() { return { gain: { value: 1 }, connect() {}, disconnect() {} }; }
    createScriptProcessor() {
      const node = { connect() {}, disconnect() {} };
      globalThis.audioNode = node;
      return node;
    }
  };
  globalThis.fetch = fetcher;
  const phases = [], texts = [], errors = [];
  const recording = new GigaamRecording({ onPhase: (p) => phases.push(p), onText: (t) => texts.push(t), onError: (e) => errors.push(e) });
  return { recording, phases, texts, errors, stopped: () => stopped, stream };
}
const health = () => ({ ok: true, json: async () => ({ engine: 'gigaam', status: 'ready' }) });
const feed = () => globalThis.audioNode.onaudioprocess({ inputBuffer: { getChannelData: () => new Float32Array(48000) } });

test('encodes mono PCM16 WAV with actual sample rate', async () => {
  const blob = encodeWav([new Float32Array([-1, 0, 1])], 48000);
  const data = new DataView(await blob.arrayBuffer());
  assert.equal(data.getUint32(24, true), 48000);
  assert.equal(data.getInt16(44, true), -32768);
  assert.equal(data.getInt16(48, true), 32767);
});

test('sends WAV only to local API and returns GigaAM text', async () => {
  let sent;
  const s = setup(async (url, options) => {
    if (url === '/api/health') return health();
    sent = { url, options };
    return { ok: true, json: async () => ({ text: 'Привет, мир!', model: 'v3_e2e_ctc' }) };
  });
  await s.recording.start(); feed(); await s.recording.stop();
  assert.equal(sent.url, '/api/transcribe'); assert.equal(sent.options.body.type, 'audio/wav');
  assert.deepEqual(s.texts, ['Привет, мир!']); assert.ok(s.phases.includes('processing')); assert.ok(s.stopped());
});

test('cancel during inference ignores late response (delete/unmount)', async () => {
  let finish;
  const s = setup(async url => url === '/api/health' ? health() : new Promise(resolve => { finish = resolve; }));
  await s.recording.start(); feed(); const done = s.recording.stop();
  s.recording.cancel(); finish({ ok: true, json: async () => ({ text: 'Не возвращать', model: 'v3_e2e_ctc' }) });
  await done; assert.deepEqual(s.texts, []); assert.ok(s.stopped());
});

test('cancel while permission prompt is open releases late microphone stream', async () => {
  let permission;
  const s = setup(async () => health(), () => new Promise(resolve => { permission = resolve; }));
  const pending = s.recording.start();
  while (!permission) await new Promise(resolve => setImmediate(resolve));
  s.recording.cancel(); permission(s.stream); await pending;
  assert.ok(s.stopped()); assert.deepEqual(s.texts, []);
});

test('loading/denied permission/remote page never use browser speech fallback', async () => {
  let s = setup(async () => ({ ok: true, json: async () => ({ engine: 'gigaam', status: 'loading' }) }));
  await s.recording.start(); assert.match(s.errors[0], /загружается/);
  s = setup(async () => health(), async () => { throw new DOMException('denied', 'NotAllowedError'); });
  await s.recording.start(); assert.match(s.errors[0], /Разрешите/);
  s = setup(async () => { throw new Error('must not fetch'); });
  globalThis.location.hostname = 'kosdesignsystem.github.io';
  await s.recording.start(); assert.match(s.errors[0], /локальную/);
});
