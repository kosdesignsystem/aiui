"""Loopback WebSocket dictation: Silero VAD + GigaAM, audio only in memory."""
import argparse
import asyncio
from concurrent.futures import ThreadPoolExecutor
import json
import logging
from pathlib import Path
import time

import numpy as np
from aiohttp import web, WSMsgType
from server import Recognizer, DIST, MODEL_NAME
from streaming import FRAME, RATE, Segmenter, Transcript


class Engine(Recognizer):
    def load(self):
        super().load()
        if self.error:
            return
        try:
            import torch
            from silero_vad import load_silero_vad
            self.vad = load_silero_vad()
            with torch.inference_mode():
                self.vad(torch.zeros(FRAME), RATE)
            self.vad.reset_states()
            self.ready = True
            logging.info("GigaAM + Silero ready on cpu — continuous dictation")
        except Exception:
            self.error = 'Не удалось загрузить Silero VAD. Проверьте терминал.'
            logging.exception('VAD loading failed')

    def probability(self, frame):
        import torch
        with torch.inference_mode():
            return self.vad(torch.from_numpy(frame), RATE).item()

    def decode(self, snapshot):
        import torch
        # Same forward/_decode path as pinned upstream transcribe(), without
        # temporary WAV files or ffmpeg processes. Timestamps reconcile overlap.
        with torch.inference_mode():
            wav = torch.from_numpy(snapshot.audio).to(self.model._device).to(self.model._dtype).unsqueeze(0)
            length = torch.tensor([wav.shape[-1]], device=self.model._device)
            encoded, encoded_len = self.model.forward(wav, length)
            return self.model._decode(encoded, encoded_len, length, True)[0][1] or []


async def session(ws, engine):
    segmenter = Segmenter(engine.probability)
    transcript = Transcript()
    finals = asyncio.Queue(maxsize=8)
    pending = None
    changed = asyncio.Event()
    finishing = False
    cancelled = False
    # Dedicated serial lane: an inference left running by cancellation must end
    # before another session resets the VAD or starts model work.
    executor = engine.executor
    loop = asyncio.get_running_loop()

    async def work(function, *args):
        return await loop.run_in_executor(executor, function, *args)

    await asyncio.to_thread(engine.vad.reset_states)
    await ws.send_json({'type': 'ready', 'sample_rate': RATE, 'model': engine.model_name})

    async def recognize():
        nonlocal pending
        try:
            while not cancelled:
                await changed.wait()
                changed.clear()
                while not finals.empty() or pending is not None:
                    if not finals.empty():
                        job = finals.get_nowait()
                        # Pending previews older than a finalized segment are obsolete.
                        if pending is not None and pending.start < job.commit_until:
                            pending = None
                    else:
                        job, pending = pending, None
                    started = time.monotonic()
                    words = await work(engine.decode, job)
                    if cancelled or ws.closed:
                        return
                    value = transcript.apply(job, words)
                    await ws.send_json({'type': 'partial', 'text': value,
                                        'committed': transcript.text,
                                        'inference_ms': round((time.monotonic()-started)*1000)})
                if finishing:
                    await ws.send_json({'type': 'done', 'text': transcript.text})
                    await ws.close()
                    return
        except Exception:
            logging.exception('GigaAM streaming inference failed')
            if not ws.closed:
                await ws.send_json({'type': 'error', 'error': 'Ошибка GigaAM. Проверьте терминал.'})
                await ws.close()

    worker = asyncio.create_task(recognize())
    remainder = np.empty(0, dtype=np.float32)
    try:
        async for message in ws:
            if message.type == WSMsgType.BINARY:
                if finishing or not message.data or len(message.data) % 2:
                    raise ValueError('Некорректный PCM16-пакет')
                # <= 256 ms per packet; raw PCM16 mono, 16 kHz, little endian.
                if len(message.data) > 8192:
                    raise ValueError('Слишком большой аудиопакет')
                audio = np.frombuffer(message.data, dtype='<i2').astype(np.float32) / 32768
                audio = np.concatenate((remainder, audio))
                count = len(audio) // FRAME * FRAME
                remainder = audio[count:].copy()
                if count:
                    completed, preview = await asyncio.to_thread(segmenter.feed, audio[:count])
                    for job in completed:
                        if finals.full():
                            raise ValueError('Компьютер не успевает распознавать. Диктовка остановлена; повторите короче.')
                        finals.put_nowait(job)
                        pending = None
                    if preview is not None:
                        pending = preview  # At most one latest preview, never a backlog.
                    if completed or preview is not None:
                        changed.set()
                await ws.send_json({'type': 'ack', 'bytes': len(message.data)})
            elif message.type == WSMsgType.TEXT:
                data = json.loads(message.data)
                if data.get('type') == 'cancel':
                    break
                if data.get('type') != 'stop' or finishing:
                    raise ValueError('Неизвестная команда')
                if len(remainder):
                    padded = np.pad(remainder, (0, FRAME - len(remainder)))
                    completed, _ = await asyncio.to_thread(segmenter.feed, padded)
                    for job in completed:
                        finals.put_nowait(job)
                job = segmenter.finish()
                if job:
                    finals.put_nowait(job)
                pending = None
                finishing = True
                changed.set()
            elif message.type in (WSMsgType.ERROR, WSMsgType.CLOSE):
                break
    except (ValueError, json.JSONDecodeError, asyncio.QueueFull):
        if not ws.closed:
            await ws.send_json({'type': 'error', 'error': 'Диктовка остановлена: неверные данные или компьютер не успевает. Текст сохранён.'})
    finally:
        cancelled = True
        changed.set()
        # Do not cancel the executor future: drain it before admitting another mic.
        await worker
        await ws.close()


def create_app(engine, port=8765, dist=DIST):
    app = web.Application(client_max_size=8192)
    active = False
    allowed = {f'localhost:{port}', f'127.0.0.1:{port}'}

    @web.middleware
    async def local_only(request, handler):
        if request.host not in allowed or (request.headers.get('Origin') and
                request.headers['Origin'] not in {f'http://{host}' for host in allowed}):
            raise web.HTTPForbidden(text='Разрешён только локальный адрес')
        response = await handler(request)
        response.headers['Cache-Control'] = 'no-store'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        return response
    app.middlewares.append(local_only)

    async def health(request):
        state = 'error' if engine.error else 'ready' if getattr(engine, 'ready', False) else 'loading'
        return web.json_response({'engine': 'gigaam', 'transport': 'websocket', 'status': state,
                                  'model': engine.model_name, 'device': engine.device, 'error': engine.error})

    async def stream(request):
        nonlocal active
        if engine.error or not getattr(engine, 'ready', False):
            raise web.HTTPServiceUnavailable(text=engine.error or 'GigaAM загружается')
        if active:
            raise web.HTTPConflict(text='Микрофон уже используется другой вкладкой')
        active = True
        ws = web.WebSocketResponse(heartbeat=15, receive_timeout=90, max_msg_size=8192, compress=False)
        try:
            await ws.prepare(request)
            await session(ws, engine)
        finally:
            active = False
        return ws

    async def static(request):
        path = (dist / request.match_info['path']).resolve()
        if not path.is_relative_to(dist.resolve()) or not path.is_file():
            raise web.HTTPNotFound()
        return web.FileResponse(path)

    app.router.add_get('/api/health', health)
    app.router.add_get('/api/stream', stream)
    app.router.add_get('/', lambda request: web.FileResponse(dist / 'index.html'))
    app.router.add_get('/{path:.*}', static)
    return app


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8765)
    parser.add_argument('--threads', type=int, default=4)
    parser.add_argument('--model', choices=['v3_e2e_ctc'], default=MODEL_NAME)
    args = parser.parse_args()
    import torch
    torch.set_num_threads(max(1, args.threads))
    logging.basicConfig(level=logging.INFO, format='%(message)s')
    engine = Engine(args.model)
    engine.executor = ThreadPoolExecutor(max_workers=1, thread_name_prefix='notes-asr')
    engine.executor.submit(engine.load)
    logging.info('Open http://localhost:%s/#/app/Notes/main — GigaAM + Silero loading', args.port)
    try:
        web.run_app(create_app(engine, args.port), host='127.0.0.1', port=args.port, access_log=None)
    finally:
        engine.executor.shutdown(wait=True)


if __name__ == '__main__':
    main()
