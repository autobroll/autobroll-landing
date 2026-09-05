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
        facelessVideoEditor: resolve(process.cwd(), 'faceless-video-editor/index.html'),
        automaticCaptions: resolve(process.cwd(), 'automatic-captions/index.html'),
        agencyVideoEditor: resolve(process.cwd(), 'ai-video-editor-for-agencies/index.html'),
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
  },
});
