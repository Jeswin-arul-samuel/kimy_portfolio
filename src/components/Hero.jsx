import { useLanguage } from '../hooks/useLanguage'
import useCountUp from '../hooks/useCountUp'

function CounterItem({ value, suffix, label }) {
  const { count, ref } = useCountUp(value)

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-3xl md:text-4xl font-bold text-gold">
        {count}{suffix}
      </span>
      <p className="font-ui text-xs md:text-sm text-taupe mt-1">{label}</p>
    </div>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const metrics = t.metrics?.items

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-cream">
      <div className="text-center max-w-3xl">
        <img
          src="/dp.jpeg"
          alt="Kim Hilaire"
          className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover mx-auto mb-8 border-4 border-warm-white shadow-lg"
        />
        <p className="font-ui text-sm tracking-widest uppercase text-taupe mb-4">
          {t.hero.greeting}
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-navy mb-6">
          {t.hero.name}
        </h1>
        <p className="font-body text-xl md:text-2xl text-navy-light mb-3">
          {t.hero.headline}
        </p>
        <p className="font-ui text-sm text-taupe tracking-wide mb-10">
          {t.hero.subheadline}
        </p>
        <button
          onClick={() => {
            const about = document.getElementById('about')
            if (about) about.scrollIntoView({ behavior: 'smooth' })
          }}
          className="inline-block font-ui text-sm font-medium px-8 py-3 rounded-full border-2 border-gold text-gold hover:bg-gold hover:text-warm-white transition-colors cursor-pointer bg-transparent"
        >
          {t.hero.cta}
        </button>

        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-cream-dark">
            {metrics.map((item) => (
              <CounterItem key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
