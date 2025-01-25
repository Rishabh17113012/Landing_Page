import { defineConfig } from 'vite'

import commonjs from 'vite-plugin-commonjs';

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [commonjs()],
  build: {
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], 
        },
      },
    },
  },
})
