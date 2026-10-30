import asyncio
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from types import SimpleNamespace as Word
import tempfile
import time
import unittest
import numpy as np
from aiohttp import ClientSession, WSMsgType, web
from streaming import FRAME, RATE, Segmenter, Snapshot, Transcript
from stream_server import create_app


class SegmentationTests(unittest.TestCase):
    def test_silence_preroll_and_pause(self):
        s = Segmenter(lambda frame: float(frame[0]))
        finals, preview = s.feed(np.zeros(FRAME * 100, np.float32))
        self.assertEqual((finals, preview), ([], None))
        s.feed(np.ones(FRAME * 40, np.float32))
        finals, _ = s.feed(np.zeros(FRAME * 22, np.float32))
        self.assertEqual(len(finals), 1)
        self.assertEqual(finals[0].start, FRAME * 93)
        self.assertIsNone(s.finish())

    def test_long_speech_stays_bounded_and_keeps_overlap(self):
        s = Segmenter(lambda _: 1)
        finals = []
        for _ in range(60):
            jobs, _ = s.feed(np.ones(FRAME * 32, np.float32))
            finals += jobs
            self.assertLessEqual(len(s.frames) * FRAME, 12 * RATE + FRAME)
        self.assertGreater(len(finals), 4)
        for left, right in zip(finals, finals[1:]):
            self.assertLess(right.start, left.commit_until)
            self.assertLessEqual(len(left.audio), 12 * RATE + FRAME)

    def test_timestamps_keep_real_repetitions_and_remove_context(self):
        t = Transcript()
        first = Snapshot(np.empty(0), 0, 2 * RATE)
        words = [Word(text='да,', start=0, end=.5), Word(text='да', start=.6, end=1),
                 Word(text='потом', start=2.1, end=2.5)]
        self.assertEqual(t.apply(first, words), 'да, да')
        second = Snapshot(np.empty(0), RATE, 4 * RATE)
        words = [Word(text='да', start=0, end=.4), Word(text='потом', start=1.1, end=1.5)]
        self.assertEqual(t.apply(second, words), 'да, да потом')


class FakeEngine:
    def __init__(self):
        self.error = None; self.ready = True
        self.model_name = 'v3_e2e_ctc'; self.device = 'cpu'
        self.executor = ThreadPoolExecutor(max_workers=1)
        self.vad = Word(reset_states=lambda: None)
        self.calls = 0
    def probability(self, frame):
        return float(frame[0] > .1)
    def decode(self, snapshot):
        self.calls += 1
        time.sleep(.02)
        return [Word(text='Привет', start=.1, end=.4)]


class TransportTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.engine = FakeEngine()
        self.directory = tempfile.TemporaryDirectory()
        Path(self.directory.name, 'index.html').write_text('notes')
        # Use ephemeral actual port, reflected in Host/Origin checks.
        import socket
        sock = socket.socket(); sock.bind(('127.0.0.1', 0))
        self.port = sock.getsockname()[1]
        self.runner = web.AppRunner(create_app(self.engine, self.port, Path(self.directory.name)))
        await self.runner.setup(); self.site = web.SockSite(self.runner, sock); await self.site.start()
        self.client = ClientSession()
        self.url = f'http://127.0.0.1:{self.port}'
    async def asyncTearDown(self):
        await self.client.close(); await self.runner.cleanup()
        self.engine.executor.shutdown(); self.directory.cleanup()
    async def receive(self, ws, kind):
        async with asyncio.timeout(5):
            async for message in ws:
                if message.type == WSMsgType.TEXT:
                    value = message.json()
                    if value['type'] == kind:
                        return value
        self.fail(f'No {kind}')
    async def test_partial_before_stop_and_final(self):
        ws = await self.client.ws_connect(self.url + '/api/stream')
        self.assertEqual((await self.receive(ws, 'ready'))['sample_rate'], RATE)
        audio = (np.ones(2048) * 10000).astype('<i2').tobytes()
        for _ in range(9):
            await ws.send_bytes(audio)
        result = await self.receive(ws, 'partial')
        self.assertEqual(result['text'], 'Привет')
        await ws.send_json({'type': 'stop'})
        self.assertEqual((await self.receive(ws, 'done'))['text'], 'Привет')
        await ws.close()
    async def test_silence_does_not_infer(self):
        ws = await self.client.ws_connect(self.url + '/api/stream'); await self.receive(ws, 'ready')
        await ws.send_bytes(bytes(4096)); await self.receive(ws, 'ack')
        await ws.send_json({'type': 'stop'})
        self.assertEqual((await self.receive(ws, 'done'))['text'], '')
        self.assertEqual(self.engine.calls, 0)
        await ws.close()
    async def test_reject_foreign_origin_and_concurrent_session(self):
        response = await self.client.get(self.url + '/api/health', headers={'Origin': 'https://example.com'})
        self.assertEqual(response.status, 403)
        ws = await self.client.ws_connect(self.url + '/api/stream'); await self.receive(ws, 'ready')
        response = await self.client.get(self.url + '/api/stream')
        self.assertEqual(response.status, 409)
        await ws.send_json({'type': 'cancel'}); await ws.close()
    async def test_invalid_audio_and_cancel_are_closed(self):
        ws = await self.client.ws_connect(self.url + '/api/stream'); await self.receive(ws, 'ready')
        await ws.send_bytes(b'x')
        self.assertIn('остановлена', (await self.receive(ws, 'error'))['error'])
        await ws.close()


if __name__ == '__main__':
    unittest.main()
