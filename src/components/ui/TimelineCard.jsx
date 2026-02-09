export default function TimelineCard({ position, company, period, duration, bullets }) {
  return (
    <div className="relative pl-8 pb-12 border-l-2 border-cream-dark last:pb-0 last:border-l-0 group">
      {/* Timeline dot */}
      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gold border-2 border-warm-white" />

      <div className="reveal">
        <h3 className="font-display text-xl font-semibold text-navy">{position}</h3>
        <p className="font-ui text-sm text-taupe mt-1">
          {company} <span className="mx-2">|</span> {period} <span className="mx-2">|</span> {duration}
        </p>
        <ul className="mt-4 space-y-2">
          {bullets.map((bullet, i) => (
            <li key={i} className="text-sm leading-relaxed text-navy-light pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold">
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
