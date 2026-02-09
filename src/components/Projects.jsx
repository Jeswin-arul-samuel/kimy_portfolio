import { useLanguage } from '../hooks/useLanguage'
import SectionHeading from './ui/SectionHeading'
import ProjectCard from './ui/ProjectCard'

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-20 px-4 bg-warm-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeading>{t.projects.title}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {t.projects.items.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
