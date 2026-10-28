import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves the build from /four-seasons-of-canada/
  base: command === 'build' ? '/four-seasons-of-canada/' : '/',
  plugins: [react()],
}))
