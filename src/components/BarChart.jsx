import { useState } from 'react'

/**
 * Grafico a barre single-series (SVG inline).
 * Specifiche dataviz: hue unica validata, barre sottili con
 * estremità arrotondate ancorate alla baseline, griglia recessiva,
 * etichette dirette selettive (max + oggi), tooltip al passaggio.
 */
export function BarChart({ data, color = '#0F8E77', height = 180, format = (v) => v, ariaLabel }) {
  const [hover, setHover] = useState(null)
  const W = 560
  const H = height
  const padL = 8
  const padB = 22
  const padT = 26
  const plotH = H - padB - padT
  const step = (W - padL * 2) / data.length
  const barW = Math.min(28, step * 0.62)
  const max = Math.max(...data.map((d) => d.value), 1)
  const maxIdx = data.findIndex((d) => d.value === max)
  const y = (v) => padT + plotH - (v / max) * plotH

  const gridVals = [max, max / 2]

  return (
    <div className="chart-wrap" style={{ position: 'relative' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={ariaLabel}
        style={{ width: '100%', minWidth: 420, display: 'block' }}
        onMouseLeave={() => setHover(null)}
      >
        {/* griglia recessiva */}
        {gridVals.map((v) => (
          <g key={v}>
            <line x1={padL} x2={W - padL} y1={y(v)} y2={y(v)} stroke="var(--line)" strokeWidth="1" strokeDasharray="3 4" />
            <text x={W - padL} y={y(v) - 4} textAnchor="end" fontSize="9" fontFamily="var(--font-mono)" fill="var(--muted)">
              {format(Math.round(v))}
            </text>
          </g>
        ))}
        {/* baseline */}
        <line x1={padL} x2={W - padL} y1={padT + plotH} y2={padT + plotH} stroke="var(--line)" strokeWidth="1.5" />

        {data.map((d, i) => {
          const cx = padL + step * i + step / 2
          const barH = Math.max(2, (d.value / max) * plotH)
          const isToday = i === data.length - 1
          const showLabel = i === maxIdx || isToday || hover === i
          return (
            <g key={d.date || i}>
              {/* hit target più grande della barra */}
              <rect
                x={cx - step / 2}
                y={padT}
                width={step}
                height={plotH + padB}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />
              <path
                d={`M${cx - barW / 2},${padT + plotH} v${-(barH - 4)} q0,-4 4,-4 h${barW - 8} q4,0 4,4 v${barH - 4} z`}
                fill={color}
                opacity={hover === null || hover === i ? (isToday ? 1 : 0.82) : 0.35}
                style={{ transition: 'opacity 120ms ease' }}
                pointerEvents="none"
              />
              {showLabel && (
                <text
                  x={cx}
                  y={y(d.value) - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--ink)"
                >
                  {format(d.value)}
                </text>
              )}
              <text
                x={cx}
                y={H - 6}
                textAnchor="middle"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                fill={isToday ? 'var(--ink)' : 'var(--muted)'}
                fontWeight={isToday ? '700' : '400'}
              >
                {d.day}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
