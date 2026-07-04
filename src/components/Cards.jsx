import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from './Img'
import { initials, isOpenNow, timeAgo, formatDateShort } from '../utils'
import { CATEGORIES } from '../data/seed'
import '../styles/ui.css'

export function Avatar({ merchant, size = 38 }) {
  return (
    <span
      className="avatar"
      style={{ background: merchant.accent, width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials(merchant.name)}
    </span>
  )
}

export function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label || id
}

/** Coupon offerta — l'elemento firma di HiCom. */
export function OfferCoupon({ offer, style, showMedia = true }) {
  const [revealed, setRevealed] = useState(false)
  const m = offer.merchant
  return (
    <article className="coupon" style={style}>
      {showMedia && (
        <Link to={`/esercente/${m.id}`} className="coupon-media" aria-label={m.name}>
          <Img src={offer.img} alt="" accent={m.accent} />
          <span className="coupon-discount">{offer.discount}</span>
        </Link>
      )}
      <div className="coupon-body">
        <Link to={`/esercente/${m.id}`}>
          <span className="coupon-merchant">{m.name}</span>
          <h3>{offer.title}</h3>
        </Link>
        <p className="coupon-valid">Valida fino a {formatDateShort(offer.validUntil)}</p>
      </div>
      <div className="coupon-stub">
        <span className="eyebrow">Codice sconto</span>
        {revealed ? (
          <span className="code-reveal">{offer.code}</span>
        ) : (
          <button type="button" className="code-reveal hidden-code" onClick={() => setRevealed(true)}>
            Mostra codice
          </button>
        )}
      </div>
    </article>
  )
}

/** Card esercente per liste e mappe. */
export function MerchantCard({ merchant, compact = false }) {
  const open = isOpenNow(merchant)
  return (
    <Link to={`/esercente/${merchant.id}`} className="merchant-card">
      <div className="thumb">
        <Img src={merchant.cover} alt="" accent={merchant.accent} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <h3>{merchant.name}</h3>
        <p className="meta">
          {categoryLabel(merchant.category)} · {merchant.address.replace(', Orbassano', '')}
        </p>
        {open !== null && (
          <p className="meta">
            <span className={`open-dot${open ? '' : ' closed'}`} />
            {open ? 'Aperto ora' : 'Chiuso ora'}
          </p>
        )}
        {!compact && (
          <div className="badges">
            {merchant.plugins.includes('prenotazioni') && <span className="badge">Prenota</span>}
            {merchant.plugins.includes('ordini') && <span className="badge">Ordina & ritira</span>}
            {merchant.plugins.includes('chat') && <span className="badge">Chat</span>}
            {merchant.curated !== 'none' && <span className="badge brass">Vetrina curata</span>}
            {merchant.offers.length > 0 && (
              <span className="badge green">{merchant.offers.length} offert{merchant.offers.length === 1 ? 'a' : 'e'}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

/** Post del feed (stile social). */
export function PostCard({ post, style }) {
  const m = post.merchant
  return (
    <article className="post-card" style={style}>
      <Link to={`/esercente/${m.id}`} className="post-head">
        <Avatar merchant={m} />
        <div className="who">
          <strong>{m.name}</strong>
          <span>
            {categoryLabel(m.category)} · {timeAgo(`${post.date}T12:00:00`)}
          </span>
        </div>
      </Link>
      <div className="post-media">
        <Img src={post.img} alt="" accent={m.accent} />
      </div>
      <p className="post-text">{post.text}</p>
    </article>
  )
}

export function SectionHead({ eyebrow, title, to, linkLabel = 'Vedi tutto' }) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {to && (
        <Link to={to} className="see-all">
          {linkLabel} →
        </Link>
      )}
    </div>
  )
}

export function Sheet({ title, onClose, children }) {
  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-title">
          <h3>{title}</h3>
          <button type="button" onClick={onClose} aria-label="Chiudi" style={{ color: 'var(--muted)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
