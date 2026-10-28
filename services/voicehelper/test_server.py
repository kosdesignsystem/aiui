"""Protocol tests use an injected engine, not fake GigaAM recognition results."""
import time
import numpy as np
from fastapi.testclient import TestClient
from starlette.websockets import WebSocketDisconnect
import pytest

from segments import Segmenter
from server import create_app
from engine import GigaAMEngine
from pathlib import Path
from types import SimpleNamespace
import wave


def tone(seconds=0.2, rate=16000):
    values = np.sin(np.arange(int(rate * seconds)) * 2 * np.pi * 300 / rate) * 4000
    return values.astype("<i2").tobytes()


class Engine:
    name = "protocol-test-engine"

    def load(self):
        pass

    def transcribe(self, pcm, sample_rate):
        assert sample_rate == 16000
        assert len(pcm) > 0
        return "проверка протокола"


def ready(client):
    for _ in range(100):
        response = client.get("/voicehelper/health")
        if response.json()["status"] != "loading":
            return response
        time.sleep(0.01)
    raise AssertionError("Service did not load")


def test_silence_does_not_produce_hallucinated_text():
    segmenter = Segmenter(16000)
    for _ in range(20):
        assert segmenter.feed(bytes(6400)) == []
    assert segmenter.finish() == []


def test_interim_and_final_keep_same_segment():
    segmenter = Segmenter(16000)
    jobs = [job for _ in range(8) for job in segmenter.feed(tone())]
    assert len(jobs) == 1 and not jobs[0].final
    finals = [job for _ in range(4) for job in segmenter.feed(bytes(6400))]
    assert len(finals) == 1 and finals[0].final
    assert jobs[0].segment == finals[0].segment
    assert len(finals[0].pcm) > len(jobs[0].pcm)


def test_windows_stay_below_gigaam_25_second_limit():
    segmenter = Segmenter(16000)
    jobs = [job for _ in range(210) for job in segmenter.feed(tone())]
    finals = [job for job in jobs if job.final]
    assert len(finals) == 2
    assert max(len(job.pcm) for job in jobs) <= 21 * 16000 * 2


def test_stream_has_interim_final_and_done():
    with TestClient(create_app(Engine())) as client:
        assert ready(client).status_code == 200
        with client.websocket_connect("/voicehelper/stream") as ws:
            assert ws.receive_json()["type"] == "connected"
            ws.send_json({"type": "start", "sampleRate": 16000})
            assert ws.receive_json()["type"] == "ready"
            for _ in range(8):
                ws.send_bytes(tone())
            interim = ws.receive_json()
            assert interim["type"] == "transcript" and not interim["final"]
            ws.send_json({"type": "stop"})
            final = ws.receive_json()
            assert final["final"] and final["segment"] == interim["segment"]
            assert ws.receive_json() == {"type": "done"}


def test_malformed_audio_releases_session():
    with TestClient(create_app(Engine())) as client:
        ready(client)
        with client.websocket_connect("/voicehelper/stream") as ws:
            ws.receive_json()
            ws.send_json({"type": "start", "sampleRate": 16000})
            ws.receive_json()
            ws.send_bytes(b"x")
            assert ws.receive_json()["type"] == "error"
        with client.websocket_connect("/voicehelper/stream") as ws:
            assert ws.receive_json()["type"] == "connected"


def test_model_load_failure_is_not_reported_as_ready():
    class Broken(Engine):
        def load(self):
            raise RuntimeError("weights unavailable")
    with TestClient(create_app(Broken())) as client:
        response = ready(client)
        assert response.status_code == 503
        assert response.json()["status"] == "error"


def test_inference_failure_returns_error_without_hanging_on_stop():
    class Broken(Engine):
        def transcribe(self, *_):
            raise RuntimeError("inference failed")
    with TestClient(create_app(Broken())) as client:
        ready(client)
        with client.websocket_connect("/voicehelper/stream") as ws:
            ws.receive_json()
            ws.send_json({"type": "start", "sampleRate": 16000})
            ws.receive_json()
            ws.send_bytes(tone(0.5))
            ws.send_json({"type": "stop"})
            assert ws.receive_json()["type"] == "error"


def test_cross_origin_websocket_rejected():
    with TestClient(create_app(Engine())) as client:
        ready(client)
        with pytest.raises(WebSocketDisconnect):
            with client.websocket_connect("/voicehelper/stream", headers={"origin": "https://unrelated.example"}):
                pass


def test_engine_writes_valid_wav_and_removes_temporary_audio():
    captured = []

    class Model:
        def transcribe(self, path):
            captured.append(path)
            with wave.open(path, 'rb') as audio:
                assert audio.getnchannels() == 1
                assert audio.getsampwidth() == 2
                assert audio.getframerate() == 48000
                assert audio.readframes(audio.getnframes()) == tone(0.5, 48000)
            return SimpleNamespace(text=' текст ')

    engine = GigaAMEngine()
    engine.model = Model()
    assert engine.transcribe(tone(0.5, 48000), 48000) == 'текст'
    assert captured and not Path(captured[0]).exists()


def test_busy_service_rejects_second_recording():
    with TestClient(create_app(Engine())) as client:
        ready(client)
        with client.websocket_connect('/voicehelper/stream') as first:
            assert first.receive_json()['type'] == 'connected'
            with client.websocket_connect('/voicehelper/stream') as second:
                result = second.receive_json()
                assert result['type'] == 'error' and 'занят' in result['message']
