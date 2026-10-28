"""Local GigaAM inference. No audio is sent to Sber or another recognition API."""
import os
import tempfile
import threading
import wave
from pathlib import Path


class GigaAMEngine:
    name = "v3_ctc"

    def __init__(self):
        self.model = None
        self.lock = threading.Lock()

    def load(self):
        import gigaam
        import torch

        torch.set_num_threads(int(os.environ.get("VOICEHELPER_THREADS", "4")))
        cache = Path(os.environ.get("GIGAAM_CACHE", "/workspace/.voicehelper/models"))
        cache.mkdir(parents=True, exist_ok=True)
        # Official loader verifies the published model checksum before loading.
        self.model = gigaam.load_model(self.name, device="cpu", download_root=str(cache))

    def transcribe(self, pcm: bytes, sample_rate: int) -> str:
        if self.model is None:
            raise RuntimeError("GigaAM is not loaded")
        with self.lock, tempfile.TemporaryDirectory(prefix="voicehelper-") as directory:
            path = str(Path(directory) / "audio.wav")
            with wave.open(path, "wb") as audio:
                audio.setnchannels(1)
                audio.setsampwidth(2)
                audio.setframerate(sample_rate)
                audio.writeframes(pcm)
            # ffmpeg in GigaAM converts browser sample rates to mono 16 kHz.
            result = self.model.transcribe(path)
            return result.text.strip()
