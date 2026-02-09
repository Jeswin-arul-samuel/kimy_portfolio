import { useEffect, useRef, useState } from 'react'

export default function LanguageBar({ name, level, percent }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-display text-lg font-medium text-navy">{name}</span>
        <span className="font-ui text-sm text-taupe">{level}</span>
      </div>
      <div className="h-2.5 bg-cream-dark rounded-full overflow-hidden">
        <div
          className="lang-bar-fill h-full bg-gold rounded-full"
          style={{ '--bar-width': `${percent}%`, width: visible ? `${percent}%` : 0 }}
        />
      </div>
    </div>
  )
}
