import asyncio
import contextlib
import json
import logging
import os
import time
from contextlib import asynccontextmanager
from urllib.parse import urlparse

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse

from engine import GigaAMEngine
from segments import Segmenter, Snapshot

logger = logging.getLogger("voicehelper")


def create_app(engine=None):
    engine = engine or GigaAMEngine()

    @asynccontextmanager
    async def lifespan(app):
        app.state.status = "loading"
        app.state.recording = False

        async def load():
            try:
                await asyncio.to_thread(engine.load)
                app.state.status = "ready"
            except Exception:
                logger.exception("Could not load GigaAM")
                app.state.status = "error"

        task = asyncio.create_task(load())
        yield
        task.cancel()
        with contextlib.suppress(asyncio.CancelledError):
            await task

    app = FastAPI(title="VoiceHelper · GigaAM", lifespan=lifespan)

    @app.get("/voicehelper/health")
    async def health():
        status = app.state.status
        return JSONResponse({"status": status, "model": engine.name,
                             "message": "Не удалось загрузить GigaAM. Проверьте сервис и доступ к весам модели." if status == "error" else ""},
                            status_code=200 if status == "ready" else 503)

    @app.websocket("/voicehelper/stream")
    async def stream(ws: WebSocket):
        # Same-origin through Vite by default; explicit origins for a separately hosted API.
        origin = ws.headers.get("origin")
        extra_origins = os.environ.get("VOICEHELPER_ALLOWED_ORIGINS", "").split(",")
        if origin and (urlparse(origin).scheme not in {"http", "https"} or
                       (urlparse(origin).netloc != ws.headers.get("host") and origin not in extra_origins)):
            await ws.close(code=1008)
            return
        await ws.accept()
        if app.state.status != "ready":
            await ws.send_json({"type": "error", "message": "GigaAM ещё не готов к распознаванию."})
            await ws.close(code=1013)
            return
        if app.state.recording:
            await ws.send_json({"type": "error", "message": "Сервис занят другой записью. Попробуйте позже."})
            await ws.close(code=1013)
            return
        app.state.recording = True
        queue = asyncio.Queue(maxsize=2)
        worker = None
        sender_lock = asyncio.Lock()

        async def send(data):
            async with sender_lock:
                await ws.send_json(data)

        async def recognize():
            while True:
                job: Snapshot = await queue.get()
                try:
                    started = time.perf_counter()
                    text = await asyncio.to_thread(engine.transcribe, job.pcm, sample_rate)
                    await send({"type": "transcript", "segment": job.segment, "text": text,
                                "final": job.final, "latencyMs": round((time.perf_counter() - started) * 1000)})
                finally:
                    queue.task_done()

        async def enqueue(jobs):
            for job in jobs:
                # Old interim hypotheses may be dropped; final utterances are retained.
                if job.final or queue.empty():
                    pending = asyncio.create_task(queue.put(job))
                    try:
                        done, _ = await asyncio.wait({pending, worker}, timeout=90, return_when=asyncio.FIRST_COMPLETED)
                        if worker in done:
                            worker.result()
                        if pending not in done:
                            raise TimeoutError("Распознавание заняло слишком много времени.")
                    finally:
                        pending.cancel()

        try:
            await send({"type": "connected", "model": engine.name})
            start = await asyncio.wait_for(ws.receive_json(), timeout=30)
            sample_rate = start.get("sampleRate")
            if start.get("type") != "start" or type(sample_rate) is not int or not 8000 <= sample_rate <= 96000:
                raise ValueError("Некорректный формат аудио.")
            segmenter = Segmenter(sample_rate)
            worker = asyncio.create_task(recognize())
            await send({"type": "ready"})
            while True:
                message = await asyncio.wait_for(ws.receive(), timeout=20)
                if message["type"] == "websocket.disconnect":
                    break
                if worker.done():
                    worker.result()
                pcm = message.get("bytes")
                if pcm is not None:
                    if len(pcm) > 65536:
                        raise ValueError("Слишком большой фрагмент аудио.")
                    await enqueue(segmenter.feed(pcm))
                    if segmenter.total_samples < sample_rate * 120:
                        continue
                elif json.loads(message.get("text") or "{}").get("type") != "stop":
                    raise ValueError("Неизвестное сообщение.")
                await enqueue(segmenter.finish())
                # Avoid waiting forever if an inference job has failed.
                joined = asyncio.create_task(queue.join())
                try:
                    done, _ = await asyncio.wait({joined, worker}, timeout=90, return_when=asyncio.FIRST_COMPLETED)
                    if worker in done:
                        worker.result()
                    if joined not in done:
                        raise TimeoutError("Распознавание заняло слишком много времени.")
                finally:
                    joined.cancel()
                await send({"type": "done"})
                break
        except WebSocketDisconnect:
            pass
        except Exception as exc:
            logger.exception("VoiceHelper session failed")
            with contextlib.suppress(Exception):
                await send({"type": "error", "message": str(exc) if isinstance(exc, (ValueError, TimeoutError)) else "Не удалось распознать аудио. Попробуйте ещё раз."})
        finally:
            if worker is not None:
                worker.cancel()
                with contextlib.suppress(asyncio.CancelledError, Exception):
                    await worker
            app.state.recording = False
            with contextlib.suppress(Exception):
                await ws.close()

    return app


app = create_app()
