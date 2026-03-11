import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const base = process.env.VITE_BASE_PATH ?? (command === "build" ? "./" : "/");

  return {
    base,
    plugins: [react()],
  };
});
