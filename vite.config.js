import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    historyApiFallback: true 
  },
  build: {
    outDir: 'dist',
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
