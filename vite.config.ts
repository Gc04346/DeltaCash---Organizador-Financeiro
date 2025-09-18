import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'DeltaCash',
        short_name: 'DeltaCash',
        description: 'Organizador financeiro pessoal',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/DeltaCash---Organizador-Financeiro/',
        start_url: '/DeltaCash---Organizador-Financeiro/',
        icons: [
          {
            src: "/DeltaCash---Organizador-Financeiro/pwa-192x192.png",
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: "/DeltaCash---Organizador-Financeiro/pwa-512x512.png",
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: "/DeltaCash---Organizador-Financeiro/pwa-512x512.png",
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: '/DeltaCash---Organizador-Financeiro/index.html'
      }
    })
  ],
  base: '/DeltaCash---Organizador-Financeiro/',
  build: {
    outDir: 'docs'
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
})
