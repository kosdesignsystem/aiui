"""Loopback-only Notes demo. Audio -> ffmpeg -> actual GigaAM -> text."""
from __future__ import annotations

import argparse
import io
import json
import logging
import subprocess
import tempfile
import threading
import time
import wave
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[2]
DIST = ROOT / "dist"
MODEL_NAME = "v3_e2e_ctc"
MAX_BYTES = 8 * 1024 * 1024
MAX_SECONDS = 21


class Recognizer:
    def __init__(self, model_name=MODEL_NAME, device="cpu"):
        self.model_name = model_name
        self.device = device
        self.model = None
        self.error = None
        self.lock = threading.Lock()

    def load(self):
        try:
            import gigaam
            self.model = gigaam.load_model(
                self.model_name, device=self.device, fp16_encoder=False,
            )
            logging.info("GigaAM %s ready on %s", self.model_name, self.device)
        except Exception:
            self.error = "Не удалось загрузить GigaAM. Подробности в терминале."
            logging.exception("GigaAM loading failed")

    def transcribe(self, audio):
        with self.lock, tempfile.TemporaryDirectory(prefix="aiui-gigaam-") as folder:
            source = Path(folder) / "recording.wav"
            target = Path(folder) / "mono.wav"
            source.write_bytes(audio)
            # Force WAV input: arbitrary files/URLs cannot be treated as playlists.
            subprocess.run(
                ["ffmpeg", "-nostdin", "-v", "error", "-f", "wav", "-i", str(source),
                 "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", str(target)],
                check=True, capture_output=True, timeout=30,
            )
            started = time.monotonic()
            result = self.model.transcribe(str(target))
            # Current upstream returns TranscriptionResult; older versions returned str.
            text = result.text if hasattr(result, "text") else str(result)
            return {"text": text.strip(), "model": self.model_name,
                    "device": self.device, "inference_seconds": round(time.monotonic() - started, 3)}


def validate_wav(audio):
    try:
        with wave.open(io.BytesIO(audio), "rb") as wav:
            if wav.getnchannels() != 1 or wav.getsampwidth() != 2 or wav.getcomptype() != "NONE":
                raise ValueError("Ожидается моно WAV PCM16")
            rate, frames = wav.getframerate(), wav.getnframes()
            if rate < 8000 or rate > 192000 or not 0.1 <= frames / rate <= MAX_SECONDS:
                raise ValueError("Запишите от 0,1 до 20 секунд речи")
            if len(wav.readframes(frames)) != frames * 2:
                raise ValueError("Запись повреждена")
    except (wave.Error, EOFError) as error:
        raise ValueError("Некорректная WAV-запись") from error


def make_handler(recognizer, port, dist=DIST):
    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(dist), **kwargs)

        def end_headers(self):
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            super().end_headers()

        def permitted(self):
            hosts = {f"127.0.0.1:{port}", f"localhost:{port}"}
            if self.headers.get("Host") not in hosts:
                self.json_response(403, {"error": "Разрешён только локальный адрес"})
                return False
            origin = self.headers.get("Origin")
            if origin and origin not in {f"http://{host}" for host in hosts}:
                self.json_response(403, {"error": "Откройте интерфейс на локальном адресе"})
                return False
            return True

        def json_response(self, status, body):
            payload = json.dumps(body, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)

        def do_GET(self):
            if not self.permitted():
                return
            path = urlsplit(self.path).path
            if path == "/api/health":
                state = "error" if recognizer.error else "ready" if recognizer.model is not None else "loading"
                return self.json_response(200, {"engine": "gigaam", "status": state,
                    "model": recognizer.model_name, "device": recognizer.device,
                    "error": recognizer.error})
            if not (dist / "index.html").is_file():
                return self.json_response(503, {"error": "Сначала выполните npm ci и npm run build"})
            if path.endswith("/") and path != "/":
                return self.json_response(404, {"error": "Не найдено"})
            super().do_GET()

        def do_POST(self):
            if not self.permitted():
                return
            if urlsplit(self.path).path != "/api/transcribe":
                return self.json_response(404, {"error": "Не найдено"})
            if recognizer.model is None:
                return self.json_response(503, {"error": recognizer.error or "GigaAM ещё загружается"})
            if self.headers.get("Content-Type", "").split(";")[0] != "audio/wav":
                return self.json_response(415, {"error": "Ожидается audio/wav"})
            try:
                length = int(self.headers.get("Content-Length", "0"))
            except ValueError:
                length = 0
            if not 44 < length <= MAX_BYTES:
                return self.json_response(413, {"error": "Пустая или слишком большая запись"})
            try:
                self.connection.settimeout(30)
                audio = self.rfile.read(length)
                validate_wav(audio)
                result = recognizer.transcribe(audio)
            except ValueError as error:
                return self.json_response(400, {"error": str(error)})
            except Exception:
                logging.exception("Transcription failed")
                return self.json_response(500, {"error": "Ошибка GigaAM. Подробности в терминале"})
            self.json_response(200, result)

        def log_message(self, message, *args):
            # No audio or transcript in request logs.
            logging.info(message, *args)

    return Handler


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--model", choices=["v3_e2e_ctc", "v3_ctc", "v2_ctc"], default=MODEL_NAME)
    parser.add_argument("--device", choices=["cpu", "cuda"], default="cpu")
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(message)s")
    recognizer = Recognizer(args.model, args.device)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), make_handler(recognizer, args.port))
    logging.info("Open http://localhost:%s/#/app/Notes/main", args.port)
    logging.info("Loading GigaAM %s. First launch downloads model weights.", args.model)
    threading.Thread(target=recognizer.load, daemon=True).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
