import { defineConfig } from 'vite';

// Relative base keeps the build portable on GitHub Pages and any static host
// under an arbitrary sub-path (for example /phantom/dist/).
export default defineConfig({
  base: './',
  server: {
    port: 5178,
    strictPort: true,
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 900,
  },
});
