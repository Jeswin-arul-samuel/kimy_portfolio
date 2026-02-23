import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import App from './App'
import './index.css'

// Block copy, right-click, text selection, drag, and print screen on production
// Skip restrictions when the resume page is in edit mode
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  const isResumeEditing = (e) => e.target.closest('.resume-page.is-editing, .ats-resume.is-editing, .is-editing')
  document.addEventListener('contextmenu', e => { if (!isResumeEditing(e)) e.preventDefault() })
  document.addEventListener('copy', e => { if (!isResumeEditing(e)) e.preventDefault() })
  document.addEventListener('cut', e => { if (!isResumeEditing(e)) e.preventDefault() })
  document.addEventListener('selectstart', e => { if (!isResumeEditing(e)) e.preventDefault() })
  document.addEventListener('dragstart', e => e.preventDefault())
  document.body.classList.add('no-copy')
  document.addEventListener('keydown', e => {
    if (isResumeEditing(e)) return
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
