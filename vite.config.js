import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/indicators-app-challenge/',
  build: {
    outDir: './docs'
  },
  rules: {
    "react/prop-types": ["warn"],
    "react/forbid-prop-types": 0,
  }
})
