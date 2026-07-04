import { useState } from 'react'

/**
 * Immagine con fallback: se il file manca mostra un riquadro
 * nella tinta dell'esercente, così la demo non si rompe mai.
 */
export function Img({ src, alt = '', accent = 'var(--green-100)', style, ...rest }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div
        aria-hidden="true"
        style={{
          background: `linear-gradient(135deg, ${accent}33, ${accent}66)`,
          display: 'grid',
          placeItems: 'center',
          color: accent,
          width: '100%',
          height: '100%',
          ...style,
        }}
        {...rest}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m4 18 5-5 3 3 4-4 4 4" />
        </svg>
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} style={style} {...rest} />
}
