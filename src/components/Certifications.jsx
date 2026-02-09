import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'
import CertificationCard from './ui/CertificationCard'

export default function Certifications() {
  const { t } = useLanguage()

  return (
    <section id="certifications" className="py-20 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <SectionHeading>{t.certifications.title}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {t.certifications.items.map((cert, i) => (
            <CertificationCard key={i} {...cert} />
          ))}
        </div>
      </div>
    </section>
  )
}
