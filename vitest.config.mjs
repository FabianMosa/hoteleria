import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /.*\.(jsx?|tsx?)$/,
    exclude: [],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
