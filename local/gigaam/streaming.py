"""Bounded phrase segmentation; no dependency on the UI or transport."""
from collections import deque
from dataclasses import dataclass
import numpy as np

RATE = 16000
FRAME = 512


@dataclass
class Snapshot:
    audio: np.ndarray
    start: int
    commit_until: int | None = None


class Segmenter:
    def __init__(self, vad, max_seconds=12, pause_seconds=.704):
        self.vad = vad
        self.max_samples = int(max_seconds * RATE)
        self.pause_samples = int(pause_seconds * RATE)
        self.position = 0
        self.preroll = deque(maxlen=8)  # 256 ms retains word onset.
        self.frames = []
        self.start = 0
        self.silence = 0
        self.last_partial = 0
        self.voiced = False

    def feed(self, audio):
        finals = []
        partial = None
        for frame in audio.reshape(-1, FRAME):
            frame = frame.copy()
            speech = self.vad(frame) >= (.35 if self.frames else .5)
            self.position += FRAME
            if not self.frames:
                self.preroll.append(frame)
                if not speech:
                    continue
                self.frames = list(self.preroll)
                self.start = self.position - len(self.frames) * FRAME
                self.preroll.clear()
                self.last_partial = self.start
            else:
                self.frames.append(frame)
            self.voiced = True
            self.silence = 0 if speech else self.silence + FRAME
            if self.silence >= self.pause_samples:
                finals.append(self.finish())
                partial = None
            elif self.position - self.start >= self.max_samples:
                # Keep 2 s context; commit only up to its midpoint. Next decoding
                # filters timestamps before this boundary, preserving repetitions.
                finals.append(Snapshot(np.concatenate(self.frames), self.start,
                                       self.position - RATE))
                self.frames = self.frames[-63:]
                self.start = self.position - len(self.frames) * FRAME
                self.last_partial = self.position
                partial = None
            elif speech and self.position - self.last_partial >= int(.9 * RATE):
                partial = Snapshot(np.concatenate(self.frames), self.start)
                self.last_partial = self.position
        return finals, partial

    def finish(self):
        if not self.frames:
            return None
        result = Snapshot(np.concatenate(self.frames), self.start, self.position)
        self.frames = []
        self.silence = 0
        self.preroll.clear()
        return result


class Transcript:
    def __init__(self):
        self.text = ''
        self.until = -1

    def apply(self, snapshot, words):
        end = snapshot.commit_until
        selected = []
        for word in words:
            midpoint = snapshot.start + round((word.start + word.end) * .5 * RATE)
            if midpoint > self.until and (end is None or midpoint <= end):
                selected.append(word.text)
        phrase = ' '.join(selected).strip()
        value = (self.text + (' ' if self.text and phrase else '') + phrase).strip()
        if end is not None:
            self.text = value
            self.until = end
        return value
