import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/*.woff2', 'geo/*.json'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,json,webp,png,svg}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      manifest: {
        name: 'HiCom — Il commercio di Orbassano',
        short_name: 'HiCom',
        description:
          'La rete del commercio locale di Orbassano: vetrine, offerte, prenotazioni e ordini dai negozi del territorio.',
        lang: 'it',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#F6FAF8',
        theme_color: '#163832',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
