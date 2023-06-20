import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [viteCompression({ algorithm: 'brotliCompress'}), react()]
})
