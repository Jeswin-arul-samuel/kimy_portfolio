import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'

const ICONS = {
  yoga: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v4" />
      <path d="M8 10l4 2 4-2" />
      <path d="M12 12v4" />
      <path d="M8 20l4-4 4 4" />
    </svg>
  ),
  gastronomy: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  dance: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v3" />
      <path d="M9 9l3 3 3-3" />
      <path d="M12 12v3" />
      <path d="M9 19l3-4 3 4" />
      <path d="M6 8l3 4" />
      <path d="M18 8l-3 4" />
    </svg>
  ),
  defense: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
}

export default function Hobbies() {
  const { t } = useLanguage()

  return (
    <section id="hobbies" className="py-20 px-4 bg-cream">
      <div className="max-w-3xl mx-auto">
        <SectionHeading>{t.hobbies.title}</SectionHeading>
        <div className="reveal flex flex-wrap justify-center gap-8 md:gap-12">
          {t.hobbies.items.map((hobby) => (
            <div key={hobby.name} className="flex flex-col items-center gap-3 text-taupe hover:text-gold transition-colors">
              {ICONS[hobby.icon]}
              <span className="font-ui text-sm text-center">{hobby.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
