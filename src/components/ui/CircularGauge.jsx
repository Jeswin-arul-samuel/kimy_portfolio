import useCountUp from '../../hooks/useCountUp'

const SIZE = 100
const STROKE = 8
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function CircularGauge({ name, level, percent }) {
  const { count, ref } = useCountUp(percent)
  const offset = CIRCUMFERENCE - (count / 100) * CIRCUMFERENCE

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg width={SIZE} height={SIZE} className="gauge-ring">
        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-cream-dark)"
          strokeWidth={STROKE}
        />
        {/* Fill */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          className="transition-[stroke-dashoffset] duration-[1.5s] ease-out"
        />
        {/* Center text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-navy font-display text-xl font-bold"
          style={{ fontSize: '1.25rem' }}
        >
          {count}%
        </text>
      </svg>
      <span className="font-display text-base font-semibold text-navy">{name}</span>
      <span className="font-ui text-xs text-taupe -mt-1">{level}</span>
    </div>
  )
}
