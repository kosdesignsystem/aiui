"""Run the real widget scenarios in Chrome with original assets over localhost.
Flutter's web widget-test host omits the application asset bundle. This local
transport adapter serves the unmodified files; no application code is mocked.
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import subprocess
import threading

app = Path(__file__).resolve().parents[1]
class Assets(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(app), **kwargs)
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    def log_message(self, *args):
        pass
server = ThreadingHTTPServer(('127.0.0.1', 0), Assets)
threading.Thread(target=server.serve_forever, daemon=True).start()
try:
    command = [os.environ.get('FLUTTER_BIN', 'flutter'), 'test', '--platform', 'chrome',
               '--no-pub', '--reporter', 'expanded',
               f'--dart-define=LAUNCHER_TEST_ASSETS=http://127.0.0.1:{server.server_port}/']
    raise SystemExit(subprocess.call(command, cwd=app))
finally:
    server.shutdown()
    server.server_close()
