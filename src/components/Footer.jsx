import { useLanguage } from '../hooks/useLanguage'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-8 px-4 bg-navy text-warm-white">
      <div className="max-w-4xl mx-auto text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-block font-ui text-sm text-cream-dark hover:text-gold transition-colors mb-4 bg-transparent border-none cursor-pointer"
        >
          {t.footer.backToTop} &uarr;
        </button>

        <p className="font-ui text-xs text-cream-dark/60">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
