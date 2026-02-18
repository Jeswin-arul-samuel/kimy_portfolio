import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import App from './App'
import './index.css'

// Block copy, right-click, text selection, drag, and print screen on production
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  document.addEventListener('contextmenu', e => e.preventDefault())
  document.addEventListener('copy', e => e.preventDefault())
  document.addEventListener('cut', e => e.preventDefault())
  document.addEventListener('selectstart', e => e.preventDefault())
  document.addEventListener('dragstart', e => e.preventDefault())
  document.body.classList.add('no-copy')
  document.addEventListener('keydown', e => {
    if (
      (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) ||
      e.key === 'PrintScreen' ||
      e.key === 'F12'
    ) {
      e.preventDefault()
    }
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
)
