import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // FONTOS: Ide a github repód nevét írd (pl: /my-pwa-app/)
  base: '/repo-neve-itt/', 
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Freelance OS',
        short_name: 'FreeOS',
        description: 'Freelance PWA for tracking income',
        theme_color: '#4f46e5',
        icons: [
          {
            src: 'pwa-192x192.png', // Ezeket majd generálnunk kell
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
