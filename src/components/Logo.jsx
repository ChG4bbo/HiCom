/** Marchio HiCom: il cerchio che si chiude. */
export function LogoMark({ size = 30, ink = 'var(--teal-500)', dot = 'var(--brass-500)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" aria-hidden="true">
      <g transform="rotate(45 48 48)">
        <circle
          cx="48"
          cy="48"
          r="30"
          fill="none"
          stroke={ink}
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray="157.6 30.9"
          strokeDashoffset="15.45"
        />
      </g>
      <circle cx="69.2" cy="26.8" r="6.5" fill={dot} />
    </svg>
  )
}

export function Logo({ size = 30, wordColor = 'var(--green-950)', ...markProps }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <LogoMark size={size} {...markProps} />
      <span
        style={{
          fontWeight: 700,
          fontSize: size * 0.72,
          letterSpacing: '-0.02em',
          color: wordColor,
          lineHeight: 1,
        }}
      >
        HiCom
      </span>
    </span>
  )
}
