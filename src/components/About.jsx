import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 px-4 bg-warm-white">
      <div className="max-w-3xl mx-auto">
        <SectionHeading>{t.about.title}</SectionHeading>
        {Array.isArray(t.about.text)
          ? t.about.text.map((paragraph, i) => (
              <p key={i} className="reveal text-lg leading-relaxed text-navy-light text-center mb-4 last:mb-0">
                {paragraph}
              </p>
            ))
          : <p className="reveal text-lg leading-relaxed text-navy-light text-center">
              {t.about.text}
            </p>
        }
      </div>
    </section>
  )
}
