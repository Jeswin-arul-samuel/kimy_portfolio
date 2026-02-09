import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'
import SkillBadge from './ui/SkillBadge'

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-20 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <SectionHeading>{t.skills.title}</SectionHeading>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className="reveal">
            <h3 className="font-display text-xl font-semibold text-navy mb-6">
              {t.skills.technicalTitle}
            </h3>
            {Object.entries(t.skills.technical).map(([category, skills]) => (
              <div key={category} className="mb-6">
                <h4 className="font-ui text-sm font-semibold text-taupe uppercase tracking-wide mb-3">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge key={skill}>{skill}</SkillBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="reveal">
            <h3 className="font-display text-xl font-semibold text-navy mb-6">
              {t.skills.softTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {t.skills.soft.map((skill) => (
                <SkillBadge key={skill}>{skill}</SkillBadge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
