import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const splash = document.getElementById('splash')
if (splash) {
  splash.classList.add('hiding')
  splash.addEventListener('animationend', () => splash.remove(), { once: true })
}
