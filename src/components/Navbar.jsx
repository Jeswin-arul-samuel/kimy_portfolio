import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

const NAV_ITEMS = [
  { key: 'about', path: '/' },
  { key: 'experience', path: '/experience' },
  { key: 'education', path: '/education' },
  { key: 'skills', path: '/skills' },
  { key: 'projects', path: '/projects' },
  { key: 'certifications', path: '/certifications' },
  { key: 'languages', path: '/languages' },
  { key: 'hobbies', path: '/hobbies' },
  { key: 'contact', path: '/contact' },
  { key: 'resume', path: '/resume' },
]

export default function Navbar() {
  const { lang, t, toggleLang } = useLanguage()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-sm border-b border-cream-dark">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-semibold text-navy no-underline">
          K.H.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={`font-ui text-sm no-underline transition-colors ${
                pathname === path
                  ? 'text-gold font-medium'
                  : 'text-navy-light hover:text-gold'
              }`}
            >
              {t.nav[key]}
            </Link>
          ))}
          <button
            onClick={toggleLang}
            className="ml-2 font-ui text-sm font-medium px-3 py-1.5 rounded-full border border-gold text-gold hover:bg-gold hover:text-warm-white transition-colors cursor-pointer bg-transparent"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>

        {/* Mobile hamburger + lang toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="font-ui text-sm font-medium px-2.5 py-1 rounded-full border border-gold text-gold hover:bg-gold hover:text-warm-white transition-colors cursor-pointer bg-transparent"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-navy bg-transparent border-none cursor-pointer"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-warm-white border-t border-cream-dark px-4 py-4 space-y-3">
          {NAV_ITEMS.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              onClick={() => setOpen(false)}
              className={`block font-ui text-sm no-underline ${
                pathname === path ? 'text-gold font-medium' : 'text-navy-light'
              }`}
            >
              {t.nav[key]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
