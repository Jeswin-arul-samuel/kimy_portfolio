export default function SkillBadge({ children, delay = 0 }) {
  return (
    <span
      className="reveal inline-block px-4 py-2 text-sm font-ui bg-warm-white text-navy rounded-full border border-cream-dark hover:border-gold hover:bg-gold hover:text-warm-white hover:shadow-md hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-default"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </span>
  )
}
