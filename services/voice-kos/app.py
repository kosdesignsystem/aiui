"""Short, push-to-talk transcription with GigaAM; no recordings are persisted."""
from contextlib import asynccontextmanager
from pathlib import Path
from tempfile import TemporaryDirectory
from threading import Lock
from typing import Callable
import logging
import os
import secrets
import subprocess
import wave

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.concurrency import run_in_threadpool

MAX_BYTES = 5 * 1024 * 1024
MAX_SECONDS = 25
MODEL_NAME = "v3_e2e_ctc"


def decode_audio(source: Path, target: Path) -> None:
    try:
        subprocess.run([
            "ffmpeg", "-nostdin", "-v", "error", "-y", "-protocol_whitelist", "file,pipe", "-i", str(source),
            "-vn", "-ac", "1", "-ar", "16000", "-t", "26", "-c:a", "pcm_s16le", str(target),
        ], check=True, capture_output=True, timeout=30)
        with wave.open(str(target), "rb") as wav:
            duration = wav.getnframes() / wav.getframerate()
        if duration > MAX_SECONDS:
            raise HTTPException(422, "Запись длиннее 25 секунд. Запишите короткое сообщение.")
        if duration < 0.2:
            raise HTTPException(422, "Запись слишком короткая. Удерживайте кнопку, пока говорите.")
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, wave.Error, EOFError):
        raise HTTPException(422, "Не удалось прочитать аудио. Запишите сообщение ещё раз.") from None


def create_app(transcriber: Callable[[str], str] | None = None) -> FastAPI:
    lock = Lock()
    token = os.environ.get("VOICE_API_TOKEN", "")

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        if transcriber is not None:
            app.state.transcribe = transcriber
        else:
            import gigaam
            model = await run_in_threadpool(
                gigaam.load_model, MODEL_NAME,
                device=os.environ.get("GIGAAM_DEVICE", "cpu"),
                download_root=os.environ.get("GIGAAM_CACHE", "/models"),
            )
            app.state.transcribe = model.transcribe
        yield

    app = FastAPI(title="Голос КОС — GigaAM", lifespan=lifespan)
    origins = os.environ.get("VOICE_ALLOWED_ORIGINS", "https://kosdesignsystem.github.io").split(",")
    app.add_middleware(CORSMiddleware, allow_origins=[o.strip() for o in origins],
                       allow_methods=["POST", "GET"], allow_headers=["Authorization", "Content-Type"])

    async def authorize(request: Request):
        supplied = request.headers.get("authorization", "")
        if token and not secrets.compare_digest(supplied, f"Bearer {token}"):
            raise HTTPException(401, "Неверный ключ доступа к GigaAM.")

    @app.get("/health")
    def health():
        return {"status": "ready", "model": MODEL_NAME}

    def recognize(data: bytes):
        # Reject simultaneous jobs instead of accumulating audio in an unbounded queue.
        if not lock.acquire(blocking=False):
            raise HTTPException(503, "Сервер занят. Попробуйте распознать запись чуть позже.")
        try:
            with TemporaryDirectory(prefix="voice-kos-") as directory:
                source = Path(directory) / "input.audio"
                target = Path(directory) / "speech.wav"
                source.write_bytes(data)
                decode_audio(source, target)
                try:
                    result = app.state.transcribe(str(target))
                except Exception:
                    logging.exception("GigaAM inference failed")
                    raise HTTPException(503, "Ошибка GigaAM. Повторите распознавание позже.") from None
                return {"text": str(result), "model": MODEL_NAME}
        finally:
            lock.release()

    @app.post("/transcribe", dependencies=[Depends(authorize)])
    async def transcribe_audio(request: Request):
        # Bound the entire multipart body before parsing or writing an upload.
        body = bytearray()
        async for chunk in request.stream():
            body.extend(chunk)
            if len(body) > MAX_BYTES:
                raise HTTPException(413, "Запись слишком большая. Максимум 5 МБ.")
        request._body = bytes(body)
        try:
            async with request.form(max_files=1, max_fields=0) as form:
                upload = form.get("audio")
                if upload is None or not hasattr(upload, "read"):
                    raise HTTPException(422, "Передайте аудиофайл в поле audio.")
                data = await upload.read()
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(422, "Неверный формат загрузки аудио.") from None
        if not data:
            raise HTTPException(422, "Запись пустая.")
        return await run_in_threadpool(recognize, data)

    return app


app = create_app()
