import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      src: path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3333,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
  },
  resolve: {
    alias: {
      '@hookform/resolvers': '/node_modules/@hookform/resolvers',
    },
  },
});
