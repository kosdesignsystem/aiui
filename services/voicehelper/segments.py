"""Bounded rolling utterances for GigaAM (which is not a streaming ASR model)."""
from dataclasses import dataclass
import numpy as np


@dataclass(frozen=True)
class Snapshot:
    segment: int
    pcm: bytes
    final: bool


class Segmenter:
    def __init__(self, sample_rate: int):
        self.rate = sample_rate
        self.buffer = bytearray()
        self.preroll = b""
        self.active = False
        self.segment = 0
        self.silent_samples = 0
        self.since_partial = 0
        self.total_samples = 0

    def feed(self, pcm: bytes) -> list[Snapshot]:
        if not pcm or len(pcm) % 2:
            raise ValueError("Expected mono PCM16 audio")
        samples = np.frombuffer(pcm, dtype="<i2").astype(np.float32) / 32768.0
        self.total_samples += len(samples)
        speech = float(np.sqrt(np.mean(samples * samples))) > 0.004
        if not self.active:
            if not speech:
                self.preroll = (self.preroll + pcm)[-int(self.rate * 0.2) * 2:]
                return []
            self.buffer = bytearray(self.preroll)
            self.preroll = b""
            self.active = True
        self.buffer.extend(pcm)
        self.since_partial += len(samples)
        self.silent_samples = 0 if speech else self.silent_samples + len(samples)
        if self.silent_samples >= self.rate * 0.8:
            return self.finish()
        if len(self.buffer) >= self.rate * 20 * 2:
            overlap = bytes(self.buffer[-int(self.rate * 0.4) * 2:])
            final = self.finish()
            self.preroll = overlap
            return final
        if self.since_partial >= self.rate * 1.5:
            self.since_partial = 0
            return [Snapshot(self.segment, bytes(self.buffer), False)]
        return []

    def finish(self) -> list[Snapshot]:
        snapshot = Snapshot(self.segment, bytes(self.buffer), True) if len(self.buffer) >= self.rate * 0.25 * 2 else None
        self.buffer.clear()
        self.preroll = b""
        self.active = False
        self.silent_samples = self.since_partial = 0
        self.segment += 1
        return [snapshot] if snapshot else []
