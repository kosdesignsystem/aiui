import io
import wave
from pathlib import Path
import sys

import pytest
from fastapi.testclient import TestClient
sys.path.insert(0, str(Path(__file__).parent))
from app import MAX_BYTES, create_app


def wav_bytes(seconds=1):
    output = io.BytesIO()
    with wave.open(output, 'wb') as wav:
        wav.setnchannels(1); wav.setsampwidth(2); wav.setframerate(16000)
        wav.writeframes(b'\0\0' * int(seconds * 16000))
    return output.getvalue()


def test_decodes_and_cleans_up(monkeypatch):
    monkeypatch.delenv('VOICE_API_TOKEN', raising=False)
    paths = []
    def model(path):
        paths.append(Path(path))
        with wave.open(path) as audio:
            assert audio.getframerate() == 16000
            assert audio.getnchannels() == 1
        return 'Проверка речи.'
    with TestClient(create_app(model)) as client:
        assert client.get('/health').json()['model'] == 'v3_e2e_ctc'
        result = client.post('/transcribe', files={'audio': ('speech.wav', wav_bytes())})
        assert result.status_code == 200
        assert result.json()['text'] == 'Проверка речи.'
    assert paths and not paths[0].exists()


@pytest.mark.parametrize('data', [b'', b'not audio', wav_bytes(.05), wav_bytes(26)], ids=['empty', 'invalid', 'short', 'long'])
def test_rejects_invalid_audio(data, monkeypatch):
    monkeypatch.delenv('VOICE_API_TOKEN', raising=False)
    def model(_):
        pytest.fail('Invalid audio must not reach the model')
    with TestClient(create_app(model)) as client:
        assert client.post('/transcribe', files={'audio': ('bad.wav', data)}).status_code == 422


def test_auth_size_and_cors(monkeypatch):
    monkeypatch.setenv('VOICE_API_TOKEN', 'test-key')
    with TestClient(create_app(lambda _: 'text')) as client:
        assert client.post('/transcribe').status_code == 401
        headers = {'Authorization': 'Bearer test-key'}
        assert client.post('/transcribe', headers=headers, content=b'x' * (MAX_BYTES+1)).status_code == 413
        assert client.post('/transcribe', headers=headers).status_code == 422
        result = client.options('/transcribe', headers={'Origin': 'https://kosdesignsystem.github.io', 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'authorization'})
        assert result.status_code == 200
        assert result.headers['access-control-allow-origin'] == 'https://kosdesignsystem.github.io'


def test_model_failure_returns_retryable_error(monkeypatch):
    monkeypatch.delenv('VOICE_API_TOKEN', raising=False)
    def broken(_): raise RuntimeError('internal model detail')
    with TestClient(create_app(broken)) as client:
        response = client.post('/transcribe', files={'audio': ('speech.wav', wav_bytes())})
        assert response.status_code == 503
        assert 'internal model detail' not in response.text


def test_browser_webm_is_decoded(tmp_path, monkeypatch):
    import subprocess
    monkeypatch.delenv('VOICE_API_TOKEN', raising=False)
    wav = tmp_path / 'speech.wav'; wav.write_bytes(wav_bytes())
    webm = tmp_path / 'speech.webm'
    subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-i', str(wav), '-c:a', 'libopus', str(webm)], check=True)
    with TestClient(create_app(lambda _: 'webm decoded')) as client:
        result = client.post('/transcribe', files={'audio': ('recording.webm', webm.read_bytes(), 'audio/webm')})
        assert result.status_code == 200
        assert result.json()['text'] == 'webm decoded'
