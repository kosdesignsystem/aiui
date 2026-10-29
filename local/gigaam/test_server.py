"""API contract tests with an explicit model stub; no claims about ASR quality."""
import io
import json
import tempfile
import threading
import unittest
import urllib.error
import urllib.request
import wave
from http.server import ThreadingHTTPServer
from pathlib import Path
from types import SimpleNamespace

from server import Recognizer, make_handler


def wav_bytes(seconds=0.25):
    buffer = io.BytesIO()
    with wave.open(buffer, "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(48000)
        wav.writeframes(b"\x00\x00" * int(seconds * 48000))
    return buffer.getvalue()


class ServerTests(unittest.TestCase):
    def setUp(self):
        self.paths = []
        class ModelStub:
            def transcribe(inner, path):
                self.paths.append(path)
                with wave.open(path) as wav:
                    self.assertEqual(wav.getframerate(), 16000)
                    self.assertEqual(wav.getnchannels(), 1)
                return SimpleNamespace(text="Тестовая заметка.")
        self.recognizer = Recognizer()
        self.recognizer.model = ModelStub()
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), lambda *a, **kw: None)
        self.port = self.server.server_port
        self.server.RequestHandlerClass = make_handler(self.recognizer, self.port)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()

    def request(self, path, data=None, headers=None):
        req = urllib.request.Request(f"http://127.0.0.1:{self.port}{path}", data=data, headers=headers or {})
        try:
            response = urllib.request.urlopen(req)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            return response.status, json.load(response)

    def test_health_loading_and_ready(self):
        self.assertEqual(self.request('/api/health')[1]['status'], 'ready')
        self.recognizer.model = None
        self.assertEqual(self.request('/api/health')[1]['status'], 'loading')
        self.assertEqual(self.request('/api/transcribe', wav_bytes(), {'Content-Type':'audio/wav'})[0],503)

    def test_wav_resampled_and_temporary_files_removed(self):
        code, body = self.request('/api/transcribe', wav_bytes(), {'Content-Type':'audio/wav'})
        self.assertEqual(code,200)
        self.assertEqual(body['text'],'Тестовая заметка.')
        self.assertEqual(body['model'],'v3_e2e_ctc')
        self.assertTrue(self.paths)
        self.assertFalse(Path(self.paths[0]).exists())

    def test_invalid_audio_and_long_recording(self):
        self.assertEqual(self.request('/api/transcribe', b'not wav' * 20, {'Content-Type':'audio/wav'})[0],400)
        self.assertEqual(self.request('/api/transcribe', wav_bytes(22), {'Content-Type':'audio/wav'})[0],400)
        self.assertEqual(self.request('/api/transcribe', wav_bytes(), {'Content-Type':'text/plain'})[0],415)

    def test_foreign_origin_rejected(self):
        self.assertEqual(self.request('/api/transcribe', wav_bytes(), {'Content-Type':'audio/wav','Origin':'https://example.com'})[0],403)


if __name__ == '__main__':
    unittest.main()
