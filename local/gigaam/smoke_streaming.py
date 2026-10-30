"""Real GigaAM + Silero + WebSocket test. Pass official example.wav path.
No substitute model. Sends >=30 s audio at real-time pace and checks live text.
"""
import asyncio
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import sys
import socket
import time
import numpy as np
import torch
from aiohttp import ClientSession, WSMsgType, web
from gigaam.preprocess import load_audio
from stream_server import Engine, create_app
from streaming import FRAME, Segmenter, Transcript


async def main(path):
    torch.set_num_threads(4)
    engine = Engine()
    engine.executor = ThreadPoolExecutor(max_workers=1)
    await asyncio.to_thread(engine.load)
    assert engine.ready and not engine.error
    # Force speech across 12 s boundaries independently of natural pauses in
    # the fixture. Real GigaAM/timestamps, deterministic always-speech gate.
    source = load_audio(path).numpy()
    long_audio = np.tile(source, 3)
    gate = Segmenter(lambda _: 1)
    jobs, _ = gate.feed(long_audio[:len(long_audio)//FRAME*FRAME])
    jobs.append(gate.finish())
    assert len(jobs) >= 3
    merged = Transcript()
    for job in jobs:
        merged.apply(job, engine.decode(job))
    assert len(merged.text) > 100
    print('Real GigaAM forced-boundary segments:', len(jobs))
    sock = socket.socket(); sock.bind(('127.0.0.1', 0)); port = sock.getsockname()[1]
    runner = web.AppRunner(create_app(engine, port))
    await runner.setup(); await web.SockSite(runner, sock).start()
    original = load_audio(path).numpy()
    audio = np.tile(np.concatenate([original, np.zeros(16000, np.float32)]), 3)
    audio = (audio * 32767).clip(-32768, 32767).astype('<i2')
    previews = []
    done = None
    started = time.monotonic()
    try:
        async with ClientSession() as client:
            async with client.ws_connect(f'http://127.0.0.1:{port}/api/stream') as ws:
                assert (await ws.receive_json())['type'] == 'ready'
                async def read():
                    nonlocal done
                    async for message in ws:
                        if message.type != WSMsgType.TEXT:
                            continue
                        result = json.loads(message.data)
                        assert result['type'] != 'error', result
                        if result['type'] == 'partial' and result['text']:
                            previews.append((time.monotonic()-started, result['text']))
                        elif result['type'] == 'done':
                            done = result['text']
                receiver = asyncio.create_task(read())
                for i in range(0, len(audio), 2048):
                    await ws.send_bytes(audio[i:i+2048].tobytes())
                    target = started + min(i+2048, len(audio))/16000
                    await asyncio.sleep(max(0, target-time.monotonic()))
                assert previews and previews[0][0] < 10, previews[:1]
                assert time.monotonic()-started > 30
                assert not ws.closed, 'Stopped at legacy 20 s limit'
                await ws.send_json({'type': 'stop'})
                await asyncio.wait_for(receiver, 30)
        assert done and len(done) > 100, done
        print(json.dumps({'seconds':round(time.monotonic()-started,2),
                          'first_text_seconds':round(previews[0][0],2),
                          'partial_updates':len(previews), 'final':done}, ensure_ascii=False, indent=2))
    finally:
        await runner.cleanup()
        engine.executor.shutdown()


if __name__ == '__main__':
    asyncio.run(main(sys.argv[1]))
