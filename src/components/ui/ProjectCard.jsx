export default function ProjectCard({ name, company, year, description }) {
  return (
    <div className="reveal bg-warm-white border border-cream-dark rounded-lg p-6 hover:border-gold transition-colors">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-display text-lg font-semibold text-navy leading-snug">{name}</h3>
        <span className="font-ui text-xs text-taupe whitespace-nowrap bg-cream px-2 py-1 rounded">{year}</span>
      </div>
      <p className="font-ui text-sm text-gold font-medium mb-3">{company}</p>
      <p className="text-sm text-navy-light leading-relaxed">{description}</p>
    </div>
  )
}
