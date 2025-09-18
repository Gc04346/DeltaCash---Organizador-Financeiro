import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    const toast = document.createElement('div')
    toast.innerText = 'Nova versão disponível. Clique para atualizar.'
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #0f172a;
      color: white;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      z-index: 9999;
      font-family: sans-serif;
    `

    // Clique → atualiza e remove
    toast.onclick = () => {
      updateSW(true)
      document.body.removeChild(toast)
    }

    // Timeout de 15 segundos → remove sozinho
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 15000)

    document.body.appendChild(toast)
  },
  onOfflineReady() {
    console.log('App pronto para usar offline.')
  }
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
