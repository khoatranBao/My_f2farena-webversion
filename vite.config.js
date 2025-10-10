import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/My_f2farena-webversion/',
  plugins: [react()],
})