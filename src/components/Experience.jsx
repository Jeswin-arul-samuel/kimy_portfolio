import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'
import TimelineCard from './ui/TimelineCard'

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="py-20 px-4 bg-cream">
      <div className="max-w-3xl mx-auto">
        <SectionHeading>{t.experience.title}</SectionHeading>
        <div className="mt-8">
          {t.experience.roles.map((role, i) => (
            <TimelineCard key={i} {...role} />
          ))}
        </div>
      </div>
    </section>
  )
}
