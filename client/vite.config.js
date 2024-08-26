import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
      server: {
  //  port: 3000,
  //  open: true,
    proxy: {
      '/graphql': {
        target: 'http://book-search-engine-ex1w.onrender.com',
        //'book-search-engine-ex1w.onrender.com',
        // For local 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      }
    }
  }
});
