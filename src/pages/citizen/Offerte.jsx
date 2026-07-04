import { useState } from 'react'
import { useStore } from '../../store/StoreContext'
import { allOffers } from '../../store/store'
import { CATEGORIES } from '../../data/seed'
import { OfferCoupon, SectionHead } from '../../components/Cards'

export default function Offerte() {
  useStore()
  const [cat, setCat] = useState('')
  const offers = allOffers().filter((o) => !cat || o.merchant.category === cat)

  return (
    <>
      <div className="section">
        <SectionHead
          eyebrow="Mostra il codice in cassa: nessuna registrazione"
          title="Tutte le offerte del territorio"
        />
        <div className="rail" style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          <button type="button" className={`chip${cat === '' ? ' active' : ''}`} onClick={() => setCat('')}>
            Tutte
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip${cat === c.id ? ' active' : ''}`}
              onClick={() => setCat(c.id)}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
          marginTop: 8,
        }}
      >
        {offers.map((o) => (
          <OfferCoupon key={o.id} offer={o} />
        ))}
        {offers.length === 0 && (
          <div className="empty" style={{ gridColumn: '1 / -1' }}>
            <div className="big">🎟️</div>
            Nessuna offerta attiva in questa categoria, per ora.
          </div>
        )}
      </div>
    </>
  )
}
