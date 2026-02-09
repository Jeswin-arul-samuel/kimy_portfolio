import { createContext, useState, useCallback } from 'react'
import en from '../data/en.json'
import fr from '../data/fr.json'

const translations = { en, fr }

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'fr' ? 'en' : 'fr'))
  }, [])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
