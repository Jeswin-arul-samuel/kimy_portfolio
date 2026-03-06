import { useLanguage } from '../hooks/useLanguage'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 py-3 px-4 bg-navy text-warm-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-1">
        <p className="font-ui text-xs text-cream-dark/60">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-ui text-xs text-cream-dark hover:text-gold transition-colors bg-transparent border-none cursor-pointer"
        >
          {t.footer.backToTop} &uarr;
        </button>
      </div>
    </footer>
  )
}
