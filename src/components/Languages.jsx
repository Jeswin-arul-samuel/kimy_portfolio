import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'
import LanguageBar from './ui/LanguageBar'

export default function Languages() {
  const { t } = useLanguage()

  return (
    <section id="languages" className="py-20 px-4 bg-warm-white">
      <div className="max-w-2xl mx-auto">
        <SectionHeading>{t.languages.title}</SectionHeading>
        <div className="reveal">
          {t.languages.items.map((lang) => (
            <LanguageBar key={lang.name} {...lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
