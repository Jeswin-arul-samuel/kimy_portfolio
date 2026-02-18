import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'

export default function Education() {
  const { t } = useLanguage()
  const degrees = [...t.education.degrees].reverse()

  return (
    <section id="education" className="py-20 px-4 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>{t.education.title}</SectionHeading>

        {/* Horizontal timeline */}
        <div className="relative mt-16">
          {/* Horizontal line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-cream-dark via-gold to-cream-dark rounded-full" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {degrees.map((deg, i) => (
              <div key={i} className="reveal relative flex flex-col items-center text-center group">
                {/* Dot with pulse */}
                <div className="relative z-10">
                  <div className="w-6 h-6 rounded-full bg-gold border-3 border-warm-white shadow-md group-hover:scale-125 transition-transform duration-300" />
                  <div className="absolute inset-0 w-6 h-6 rounded-full bg-gold opacity-0 group-hover:opacity-30 group-hover:scale-[2] transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="mt-6 w-full">
                  <p className="font-display text-lg font-bold text-gold mb-2">{deg.period}</p>
                  <h3 className="font-display text-sm font-semibold text-navy leading-snug mb-1">
                    {deg.degree.split('\n').map((line, j) => (
                      <span key={j}>{j > 0 && <br />}{line}</span>
                    ))}
                  </h3>
                  <p className="font-ui text-xs text-taupe">
                    {deg.institution.split('\n').map((line, j) => (
                      <span key={j}>{j > 0 && <br />}{line}</span>
                    ))}
                  </p>
                  {deg.note && (
                    <p className="font-ui text-xs text-gold italic mt-1">{deg.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
