import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // 클라이언트의 /api 요청을 서버의 5000포트로 보냄
      '/image': 'http://localhost:5000'
    }
  }
})
