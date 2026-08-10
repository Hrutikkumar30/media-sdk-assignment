import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@my-app/media-core': path.resolve(__dirname, '../../packages/media-core/src/index.ts'),
        '@my-app/media-react': path.resolve(__dirname, '../../packages/media-react/src/index.ts'),
        '@my-app/media-ui-react': path.resolve(__dirname, '../../packages/media-ui-react/src/index.ts'),
      },
    },
    server: {
      // HMR can be disabled via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
