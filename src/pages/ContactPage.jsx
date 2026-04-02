import Cal from '@calcom/embed-react'
import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from '../components/ui/SectionHeading'

const CAL_LINK = 'kimy-lr'

export default function ContactPage() {
  const { t, lang } = useLanguage()

  return (
    <section className="min-h-[60vh] py-20 px-4 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>{t.footer.contact}</SectionHeading>

        <div className="reveal grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 items-start mt-10">
          {/* Left / center — Cal.com booking widget */}
          <div>
            <h3 className="font-display text-2xl font-bold text-navy mb-2">
              {t.booking.title}
            </h3>
            <p className="font-ui text-sm text-taupe mb-6">
              {t.booking.description}
            </p>
            <div className="w-full overflow-hidden rounded-xl" style={{ minHeight: 500 }}>
              <Cal
                calLink={CAL_LINK}
                config={{ layout: 'month_view', theme: 'light', locale: lang }}
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              />
            </div>
          </div>

          {/* Right — contact details */}
          <div className="flex flex-col gap-6 font-ui text-sm text-navy-light md:pt-10">
            <a
              href={`mailto:${t.about.email}`}
              className="text-navy-light hover:text-gold transition-colors no-underline flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
              {t.about.email}
            </a>
            <a
              href={t.about.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-light hover:text-gold transition-colors no-underline flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn: {t.about.linkedin}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
