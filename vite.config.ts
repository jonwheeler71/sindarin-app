import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project site from /sindarin-app/, so the
  // production build needs assets referenced under that subpath. Local dev
  // keeps serving from root.
  base: command === 'build' ? '/sindarin-app/' : '/',
  plugins: [react(), tailwindcss()],
}))
