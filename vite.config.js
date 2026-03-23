import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/soap': {
        target: 'https://bpmprd.ntpc.co.in',
        changeOrigin: true,
        secure: false
      },
      '/db': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})

// https://vite.dev/config/
//export default defineConfig({
 // plugins: [react()],
//})
