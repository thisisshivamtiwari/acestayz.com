import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    host: '0.0.0.0',

    allowedHosts: [
      'www.acestayz.com',
      'acestayz.com',
    ]
  },
  preview: {
    allowedHosts: ['acestayz.com', 'www.acestayz.com'],
  },
  define: {
    'process.env.NODE_DEBUG': false,
    global: {},
  }
})
