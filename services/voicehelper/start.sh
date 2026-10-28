#!/usr/bin/env bash
set -euo pipefail
service_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
runtime="${VOICEHELPER_RUNTIME_DIR:-/workspace/.voicehelper}"
export GIGAAM_CACHE="${GIGAAM_CACHE:-$runtime/models}"
cd "$service_dir"
exec "$runtime/venv/bin/python" -m uvicorn server:app --host 127.0.0.1 --port 8765 \
  --ws-max-size 65536 --ws-max-queue 8
