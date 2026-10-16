import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          // Kuvakkeet tarkistetaan ensin, koska nimessä "react-icons" on myös sana "react"
          if (id.includes('/node_modules/react-icons/')) {
            return 'icons';
          }
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) {
            return 'vendor';
          }
        }
      }
    },
  }
});