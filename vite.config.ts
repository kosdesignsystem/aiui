import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const base =
    process.env.VITE_BASE_PATH ??
    (process.env.GITHUB_ACTIONS === "true" && repository ? `/${repository}/` : "/");

  return {
    base,
    plugins: [react()],
  };
});
