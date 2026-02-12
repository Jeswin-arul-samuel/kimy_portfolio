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
      </div>
    </section>
  )
}
