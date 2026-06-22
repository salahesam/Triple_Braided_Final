import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
  },
  publicDir: 'public',
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
