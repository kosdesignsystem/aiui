#!/usr/bin/env bash
set -euo pipefail
service_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
runtime="${VOICEHELPER_RUNTIME_DIR:-/workspace/.voicehelper}"
export UV_CACHE_DIR="$runtime/uv-cache"
command -v ffmpeg >/dev/null
command -v uv >/dev/null
mkdir -p "$runtime"
if [ ! -x "$runtime/venv/bin/python" ]; then uv venv "$runtime/venv"; fi
uv pip install --system-certs --python "$runtime/venv/bin/python" \
  torch==2.8.0+cpu torchaudio==2.8.0+cpu --index-url https://download.pytorch.org/whl/cpu
uv pip install --system-certs --python "$runtime/venv/bin/python" -r "$service_dir/requirements.txt"
echo "Installed. Run: bash $service_dir/start.sh"
