import * as ort from 'onnxruntime-web/wasm';
import { decodeCTC, type TokenConfig } from './gigaam-web-core';

type Manifest = { model: string; revision: string; bytes: number; parts: { path: string; bytes: number; sha256: string }[] };
let session: ort.InferenceSession | undefined;
let tokens: TokenConfig;
let loading: Promise<void> | undefined;
const send = (data: object) => self.postMessage(data);

async function initialize(modelBase: string, wasmBase: string) {
  ort.env.wasm.numThreads = 1; // GitHub Pages has no cross-origin isolation headers.
  ort.env.wasm.wasmPaths = wasmBase;
  const manifestResponse = await fetch(`${modelBase}manifest.json`);
  if (!manifestResponse.ok) throw new Error('Файлы GigaAM ещё не опубликованы. Обновите страницу позже');
  const manifest: Manifest = await manifestResponse.json();
  const tokenResponse = await fetch(`${modelBase}tokens.json`);
  if (!tokenResponse.ok) throw new Error('Не удалось загрузить словарь GigaAM');
  tokens = await tokenResponse.json();
  let cache: Cache | undefined;
  try { cache = await caches.open(`aiui-gigaam-${manifest.revision}`); } catch { /* Cache may be unavailable in private mode. */ }
  const model = new Uint8Array(manifest.bytes);
  let offset = 0;
  for (const part of manifest.parts) {
    const url = `${modelBase}${part.path}?sha=${part.sha256}`;
    let response = await cache?.match(url);
    let cached = !!response;
    if (!response) response = await fetch(url);
    if (!response.ok) throw new Error('Не удалось скачать GigaAM. Проверьте соединение и повторите');
    let bytes = await response.arrayBuffer();
    const checksum = async (buffer: ArrayBuffer) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', buffer))).map(x => x.toString(16).padStart(2, '0')).join('');
    if (bytes.byteLength !== part.bytes || await checksum(bytes) !== part.sha256) {
      if (!cached) throw new Error('Файл GigaAM повреждён при загрузке. Повторите попытку');
      await cache?.delete(url);
      const retry = await fetch(url, { cache: 'reload' });
      if (!retry.ok) throw new Error('Не удалось повторно скачать GigaAM');
      bytes = await retry.arrayBuffer(); cached = false;
      if (bytes.byteLength !== part.bytes || await checksum(bytes) !== part.sha256) throw new Error('Проверка файла GigaAM не пройдена');
    }
    if (!cached && cache) { try { await cache.put(url, new Response(bytes)); } catch { /* Quota failure must not block recognition. */ } }
    model.set(new Uint8Array(bytes), offset); offset += bytes.byteLength;
    send({ type: 'progress', message: `Загрузка GigaAM: ${Math.round(offset / manifest.bytes * 100)}%` });
  }
  send({ type: 'progress', message: 'Запускаем GigaAM в браузере…' });
  session = await ort.InferenceSession.create(model, { executionProviders: ['wasm'], graphOptimizationLevel: 'all' });
}

self.onmessage = async event => {
  const request = event.data;
  try {
    if (request.type === 'init') {
      loading ??= initialize(request.modelBase, request.wasmBase);
      await loading; send({ type: 'ready' });
    } else if (request.type === 'transcribe') {
      if (!session) throw new Error('GigaAM ещё не готов');
      const audio = new Float32Array(request.audio);
      const result = await session.run({ audio: new ort.Tensor('float32', audio, [1, audio.length]) });
      const text = decodeCTC(result.tokens.data as BigInt64Array, Number(result.lengths.data[0]), tokens);
      send({ type: 'result', id: request.id, text, model: tokens.model });
    }
  } catch (error) {
    console.error('GigaAM browser:', error);
    send({ type: 'error', id: request.id, message: error instanceof Error ? error.message : String(error) });
  }
};
