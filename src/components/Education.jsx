import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'

export default function Education() {
  const { t } = useLanguage()

  return (
    <section id="education" className="py-20 px-4 bg-warm-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>{t.education.title}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {t.education.degrees.map((deg, i) => (
            <div
              key={i}
              className="reveal bg-cream rounded-lg p-6 border border-cream-dark hover:border-gold transition-colors"
            >
              <h3 className="font-display text-lg font-semibold text-navy mb-2 leading-snug">
                {deg.degree}
              </h3>
              <p className="font-ui text-sm text-taupe mb-1">{deg.institution}</p>
              <p className="font-ui text-sm text-gold font-medium">{deg.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
