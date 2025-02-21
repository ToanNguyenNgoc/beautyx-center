import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Change output directory to 'build'
  },
  resolve: {
    alias: {
      'app': path.resolve(__dirname, 'src/app'), // Set alias 'app' to 'src/app'
    },
  },
})
