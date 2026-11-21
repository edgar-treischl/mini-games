import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  // IMPORTANT for GitHub Pages deployment
  base: '/mini-games/',

  plugins: [
    react(),
    federation({
      name: 'mini-games',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },

      shared: ['react', 'react-dom']

    }),
  ],

  server: {
    host: true,
    port: 5174,
    cors: true,
  },

  preview: {
    host: true,
    port: 5174,
  },

  build: {
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
  },
});
