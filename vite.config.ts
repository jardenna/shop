import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-named-as-default
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      overlay: {
        initialIsOpen: false, // Disables overlay by default
      },
    }),
    eslint({
      emitWarning: true,
    }),
  ],
  server: {
    port: 3001,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
    devSourcemap: true,
  },
  build: {
    sourcemap: true,
  },
});
