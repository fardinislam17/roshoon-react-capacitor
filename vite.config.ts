import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
  },
  plugins: [react(), viteTsConfigPaths()],
  server: {
    port: 4000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
});
