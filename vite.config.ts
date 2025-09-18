import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// URL final: https://gc04346.github.io/DeltaCash---Organizador-Financeiro/
export default defineConfig({
  plugins: [react()],
  base: '/DeltaCash---Organizador-Financeiro/',
  build: {
    outDir: 'docs',        // build direto na pasta servida pelo Pages
    assetsDir: 'assets'    // opcional, só pra manter organizado
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
