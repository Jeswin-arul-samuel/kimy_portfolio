import { useState } from 'react'

const TOTAL = 6
const LABELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const FLAGS = {
  'Français': '\u{1F1EB}\u{1F1F7}',
  'French': '\u{1F1EB}\u{1F1F7}',
  'Anglais': '\u{1F1EC}\u{1F1E7}',
  'English': '\u{1F1EC}\u{1F1E7}',
  'Vietnamien': '\u{1F1FB}\u{1F1F3}',
  'Vietnamese': '\u{1F1FB}\u{1F1F3}',
}

export default function LevelBar({ name, level, blocks, tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const flag = FLAGS[name]

  return (
    <div className="flex flex-col items-center gap-3 w-64">
      {/* Language name */}
      <h3 className="font-display text-xl font-semibold text-navy">
        {flag && <span className="mr-2">{flag}</span>}{name}
      </h3>

      {/* Level label */}
      <span className="font-ui text-sm text-gold font-medium">{level}</span>

      {/* Blocks row */}
      <div
        className="relative flex gap-2 cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          const isFull = i < Math.floor(blocks)
          const isHalf = i === Math.floor(blocks) && blocks % 1 !== 0
          const isActive = isFull || isHalf

          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full transition-all duration-500 ${
                  isFull
                    ? 'bg-gold shadow-md scale-100'
                    : isHalf
                      ? 'shadow-md scale-100'
                      : 'bg-cream-dark scale-90'
                }`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  ...(isHalf && {
                    background: 'linear-gradient(to right, var(--color-gold) 50%, var(--color-cream-dark) 50%)',
                  }),
                }}
              />
              <span className={`font-ui text-[10px] ${
                isActive ? 'text-gold font-medium' : 'text-cream-dark'
              }`}>
                {LABELS[i]}
              </span>
            </div>
          )
        })}

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-navy text-warm-white text-xs font-ui px-4 py-2 rounded-lg shadow-lg z-10">
            {tooltip}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-navy rotate-45" />
          </div>
        )}
      </div>
    </div>
  )
}
