import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    eslint(),
  ],
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
    devSourcemap: true,
  },
});
