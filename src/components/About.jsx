import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 px-4 bg-warm-white">
      <div className="max-w-3xl mx-auto">
        <SectionHeading>{t.about.title}</SectionHeading>
        <p className="reveal text-lg leading-relaxed text-navy-light text-center">
          {t.about.text}
        </p>
        <div className="reveal mt-10 flex flex-wrap justify-center gap-6 font-ui text-sm text-taupe">
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {t.about.location}
          </span>
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
            {t.about.email}
          </span>
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            {t.about.phone}
          </span>
        </div>
      </div>
    </section>
  )
}
