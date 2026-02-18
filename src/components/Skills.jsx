import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'
import SkillBadge from './ui/SkillBadge'

export default function Skills() {
  const { t } = useLanguage()

  let techIndex = 0

  return (
    <section id="skills" className="py-20 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <SectionHeading>{t.skills.title}</SectionHeading>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h3 className="reveal font-display text-xl font-semibold text-navy mb-8">
              {t.skills.technicalTitle}
            </h3>
            {Object.entries(t.skills.technical).map(([category, skills]) => {
              const startIndex = techIndex
              techIndex += skills.length
              return (
                <div key={category} className="mb-8">
                  <h4 className="reveal font-ui text-sm font-semibold text-gold uppercase tracking-wider mb-4 pl-3 border-l-2 border-gold">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((skill, i) => (
                      <SkillBadge key={skill} delay={(startIndex + i) * 50}>
                        {skill}
                      </SkillBadge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="reveal font-display text-xl font-semibold text-navy mb-8">
              {t.skills.softTitle}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {t.skills.soft.map((skill, i) => (
                <SkillBadge key={skill} delay={i * 80}>
                  {skill}
                </SkillBadge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
