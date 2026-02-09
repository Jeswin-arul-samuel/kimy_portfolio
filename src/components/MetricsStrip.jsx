import { useLanguage } from '../hooks/useLanguage'
import useCountUp from '../hooks/useCountUp'

function CounterItem({ value, suffix, label, delay }) {
  const { count, ref } = useCountUp(value)

  return (
    <div ref={ref} className={`text-center reveal-delay-${delay}`}>
      <span className="font-display text-4xl md:text-5xl font-bold text-gold">
        {count}{suffix}
      </span>
      <p className="font-ui text-sm text-taupe mt-2">{label}</p>
    </div>
  )
}

export default function MetricsStrip() {
  const { t } = useLanguage()
  const items = t.metrics?.items
  if (!items) return null

  return (
    <section className="py-16 px-4 bg-cream">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {items.map((item, i) => (
          <CounterItem
            key={item.label}
            value={item.value}
            suffix={item.suffix}
            label={item.label}
            delay={i + 1}
          />
        ))}
      </div>
    </section>
  )
}
