export default function CertificationCard({ name, issuer, year, description }) {
  return (
    <div className="reveal bg-warm-white border border-cream-dark rounded-lg p-6 hover:border-gold transition-colors">
      <h3 className="font-display text-lg font-semibold text-navy mb-1">{name}</h3>
      <div className="flex items-center gap-2 mb-3 font-ui text-sm text-taupe">
        {issuer && <span>{issuer}</span>}
        {issuer && year && <span>|</span>}
        {year && <span>{year}</span>}
      </div>
      <p className="text-sm text-navy-light leading-relaxed">{description}</p>
    </div>
  )
}
