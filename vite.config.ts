import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const base = process.env.VITE_BASE_PATH ?? (command === "build" ? "./" : "/");
  const voiceHelperProxy = {
    '/voicehelper': {
      target: process.env.VOICEHELPER_SERVER_URL ?? 'http://127.0.0.1:8765',
      ws: true,
    },
  };

  return {
    base,
    plugins: [react()],
    server: { proxy: voiceHelperProxy },
    preview: { proxy: voiceHelperProxy },
  };
});
