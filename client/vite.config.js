import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
      outDir: 'dist', 
    },
    server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'book-search-engine-ex1w.onrender.com',
        // For local 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
