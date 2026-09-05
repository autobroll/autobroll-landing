import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        aiBrollGenerator: resolve(process.cwd(), 'ai-b-roll-generator/index.html'),
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
  },
});
