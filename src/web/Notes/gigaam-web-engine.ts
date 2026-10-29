let worker: Worker | undefined;
let loading: Promise<void> | undefined;
let readyResolve: (() => void) | undefined;
let readyReject: ((reason: Error) => void) | undefined;
let onProgress: ((message: string) => void) | undefined;
let sequence = 0;
const pending = new Map<number, { resolve: (text: string) => void; reject: (error: Error) => void }>();

export function cancelBrowserGigaam() {
  worker?.terminate(); worker = undefined; loading = undefined;
  const error = new Error('Распознавание отменено');
  readyReject?.(error); readyReject = undefined; readyResolve = undefined;
  for (const request of pending.values()) request.reject(error);
  pending.clear(); onProgress = undefined;
}

export async function loadBrowserGigaam(progress: (message: string) => void) {
  onProgress = progress;
  if (!loading) {
    loading = new Promise<void>((resolve, reject) => { readyResolve = resolve; readyReject = reject; });
    try {
      worker = new Worker(new URL('./gigaam.worker.ts', import.meta.url), { type: 'module' });
    } catch (error) {
      readyReject?.(error instanceof Error ? error : new Error(String(error)));
      const failed = loading; loading = undefined; await failed; return;
    }
    worker.onmessage = event => {
      const data = event.data;
      if (data.type === 'progress') onProgress?.(data.message);
      else if (data.type === 'ready') { readyResolve?.(); readyResolve = undefined; readyReject = undefined; }
      else if (data.type === 'result') { pending.get(data.id)?.resolve(data.text); pending.delete(data.id); }
      else if (data.type === 'error') {
        const error = new Error(`Не удалось запустить GigaAM: ${data.message}`);
        if (data.id !== undefined) { pending.get(data.id)?.reject(error); pending.delete(data.id); }
        else { readyReject?.(error); worker?.terminate(); worker = undefined; loading = undefined; }
      }
    };
    worker.onerror = () => cancelBrowserGigaam();
    worker.postMessage({ type: 'init', modelBase: new URL('models/gigaam-v3/', document.baseURI).href, wasmBase: new URL('ort/', document.baseURI).href });
  }
  await loading;
}

export function transcribeBrowserGigaam(audio: Float32Array): Promise<string> {
  if (!worker) return Promise.reject(new Error('GigaAM ещё не готов'));
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    worker!.postMessage({ type: 'transcribe', id, audio: audio.buffer }, [audio.buffer]);
  });
}
