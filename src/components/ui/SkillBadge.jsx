export default function SkillBadge({ children }) {
  return (
    <span className="inline-block px-3 py-1.5 text-sm font-ui bg-cream text-navy rounded-full border border-cream-dark hover:border-gold hover:bg-cream-dark transition-colors">
      {children}
    </span>
  )
}
