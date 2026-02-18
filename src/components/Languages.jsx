import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'
import LevelBar from './ui/LevelBar'

export default function Languages() {
  const { t } = useLanguage()

  return (
    <section id="languages" className="py-20 px-4 bg-warm-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>{t.languages.title}</SectionHeading>
        <div className="reveal flex flex-wrap justify-center gap-12 md:gap-16 mt-8">
          {t.languages.items.map((lang) => (
            <LevelBar key={lang.name} {...lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
