import { defineConfig } from "vite";
import { copyFileSync, mkdirSync, existsSync, readFileSync, readdirSync, unlinkSync } from 'node:fs';
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const base = process.env.VITE_BASE_PATH ?? (command === "build" ? "./" : "/");

  return {
    base,
    worker: { format: 'es' },
    plugins: [react(), {
      name: 'copy-onnx-wasm',
      closeBundle() {
        const modelDir = 'dist/models/gigaam-v3';
        if (existsSync(`${modelDir}/manifest.json`)) {
          const manifest = JSON.parse(readFileSync(`${modelDir}/manifest.json`, 'utf-8'));
          const allowed = new Set(['manifest.json', 'tokens.json', ...manifest.parts.map((part: {path:string}) => part.path)]);
          for (const file of readdirSync(modelDir)) {
            if (!allowed.has(file)) unlinkSync(`${modelDir}/${file}`);
          }
        }
        mkdirSync('dist/ort', { recursive: true });
        for (const file of ['ort-wasm-simd-threaded.wasm', 'ort-wasm-simd-threaded.mjs']) {
          copyFileSync(`node_modules/onnxruntime-web/dist/${file}`, `dist/ort/${file}`);
        }
      },
    }],
  };
});
