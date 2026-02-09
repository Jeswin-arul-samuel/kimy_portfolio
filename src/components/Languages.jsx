import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'
import CircularGauge from './ui/CircularGauge'

export default function Languages() {
  const { t } = useLanguage()

  return (
    <section id="languages" className="py-20 px-4 bg-warm-white">
      <div className="max-w-3xl mx-auto">
        <SectionHeading>{t.languages.title}</SectionHeading>
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {t.languages.items.map((lang) => (
            <CircularGauge key={lang.name} {...lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
