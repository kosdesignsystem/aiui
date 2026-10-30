#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
PYTHON_BIN="${GIGAAM_PYTHON:-python3}"
if [ "$(uname -s)" = "Darwin" ] && [ "$(uname -m)" != "arm64" ]; then
  echo 'Этот запуск рассчитан на Apple Silicon. Откройте Терминал без Rosetta; Intel Mac требует другого окружения.'
  exit 1
fi
command -v ffmpeg >/dev/null || { echo 'Установите ffmpeg (на Mac: brew install ffmpeg)'; exit 1; }
command -v npm >/dev/null || { echo 'Установите Node.js 20 или новее.'; exit 1; }
node -e 'if (Number(process.versions.node.split(".")[0]) < 20) { console.error("Нужен Node.js 20+"); process.exit(1); }'
"$PYTHON_BIN" -c 'import sys; assert (3,10) <= sys.version_info[:2] < (3,14), "Нужен Python 3.10–3.13; рекомендуется 3.11"'
if [ ! -d .venv-gigaam ]; then "$PYTHON_BIN" -m venv .venv-gigaam; fi
# CPU wheels avoid downloading CUDA packages for this local CPU demo on Linux.
if [ "$(uname -s)" = "Linux" ]; then
  .venv-gigaam/bin/python -m pip install 'torch==2.6.0' 'torchaudio==2.6.0' --index-url https://download.pytorch.org/whl/cpu
fi
.venv-gigaam/bin/python -m pip install -r local/gigaam/requirements.txt
npm ci
VITE_NOTES_ASR=local VITE_BASE_PATH=/ npm run build
exec .venv-gigaam/bin/python local/gigaam/stream_server.py "$@"
