import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { getMerchant, hasPlugin } from '../../store/store'
import { OfferCoupon, PostCard, Avatar, Sheet, categoryLabel } from '../../components/Cards'
import { Img } from '../../components/Img'
import { MapView } from '../../components/MapView'
import { CATEGORIES } from '../../data/seed'
import {
  IconArrowLeft,
  IconCalendar,
  IconBag,
  IconChat,
  IconPhone,
  IconPin,
  IconClock,
} from '../../components/Icons'
import { formatPrice, isOpenNow, todayKey } from '../../utils'
import '../../styles/detail.css'

const DAYS = [
  ['lun', 'Lunedì'],
  ['mar', 'Martedì'],
  ['mer', 'Mercoledì'],
  ['gio', 'Giovedì'],
  ['ven', 'Venerdì'],
  ['sab', 'Sabato'],
  ['dom', 'Domenica'],
]

function ProductCard({ product, merchant, featured = false }) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const canOrder = hasPlugin(merchant, 'ordini') && product.orderable
  return (
    <button
      type="button"
      className={`product-card${expanded ? ' expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      style={featured ? { gridColumn: 'span 1' } : undefined}
    >
      <div className="p-media">
        <Img src={product.img} alt="" accent={merchant.accent} />
      </div>
      <div className="p-body">
        <h3>{product.name}</h3>
        <span className="p-price">
          {formatPrice(product)} {product.unit && <small>{product.unit}</small>}
        </span>
        {product.tags.length > 0 && (
          <div className="p-tags">
            {product.tags.map((t) => (
              <span key={t} className="badge green">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="p-more">
          <p className="p-desc">{product.desc}</p>
          {canOrder && (
            <span
              className="btn sm p-cta"
              role="link"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/esercente/${merchant.id}/ordina`)
              }}
            >
              <IconBag width={14} height={14} /> Ordina e ritira
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export default function MerchantDetail() {
  const { id } = useParams()
  useStore()
  const [openPost, setOpenPost] = useState(null)
  const m = getMerchant(id)

  if (!m || !m.active) {
    return (
      <div className="container section empty">
        <div className="big">🏪</div>
        Questo esercente non è al momento disponibile.
        <p style={{ marginTop: 12 }}>
          <Link to="/esplora" className="btn sm">Torna a Esplora</Link>
        </p>
      </div>
    )
  }

  const open = isOpenNow(m)
  const products = m.products
  const featured = hasPlugin(m, 'vetrinaplus') ? products.slice(0, 2) : []
  const rest = hasPlugin(m, 'vetrinaplus') ? products.slice(2) : products

  return (
    <>
      <div className="detail-cover">
        <Link to="/esplora" className="detail-back" aria-label="Torna a Esplora">
          <IconArrowLeft width={19} height={19} />
        </Link>
        <Img src={m.cover} alt="" accent={m.accent} />
      </div>

      <div className="detail-head">
        <div className="detail-head-card">
          <div className="detail-title">
            <Avatar merchant={m} size={54} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1>{m.name}</h1>
              <p className="tagline">{m.tagline}</p>
            </div>
          </div>
          <div className="detail-badges">
            <span className="badge gray">{categoryLabel(m.category)}</span>
            {hasPlugin(m, 'prenotazioni') && <span className="badge">Si prenota</span>}
            {hasPlugin(m, 'ordini') && <span className="badge">Ordina & ritira</span>}
            {hasPlugin(m, 'chat') && <span className="badge">Chat</span>}
            {m.curated !== 'none' && <span className="badge brass">Vetrina curata</span>}
          </div>
          <div className="detail-meta">
            <span>
              <IconPin width={14} height={14} /> {m.address}
            </span>
            {open !== null && (
              <span>
                <span className={`open-dot${open ? '' : ' closed'}`} />
                {open ? 'Aperto ora' : 'Chiuso ora'} · oggi {m.hours[todayKey()]}
              </span>
            )}
          </div>
          <div className="detail-actions">
            {hasPlugin(m, 'prenotazioni') && (
              <Link to={`/esercente/${m.id}/prenota`} className="btn">
                <IconCalendar width={17} height={17} />
                {m.booking?.type === 'appuntamenti' ? 'Prenota appuntamento' : 'Prenota un tavolo'}
              </Link>
            )}
            {hasPlugin(m, 'ordini') && (
              <Link to={`/esercente/${m.id}/ordina`} className="btn dark">
                <IconBag width={17} height={17} /> Ordina & ritira
              </Link>
            )}
            {hasPlugin(m, 'chat') && (
              <Link to={`/chat/${m.id}`} className="btn ghost">
                <IconChat width={17} height={17} /> Scrivici
              </Link>
            )}
            <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="btn ghost">
              <IconPhone width={17} height={17} /> Chiama
            </a>
          </div>
        </div>
      </div>

      {m.offers.length > 0 && (
        <section className="detail-section">
          <span className="eyebrow">Da usare in cassa</span>
          <h2>Offerte attive</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 12,
            }}
          >
            {m.offers.map((o) => (
              <OfferCoupon key={o.id} offer={{ ...o, merchant: m }} showMedia={false} />
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="detail-section">
          <span className="eyebrow">Vetrina+ · in evidenza</span>
          <h2>I più richiesti</h2>
          <div className="featured-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} merchant={m} featured />
            ))}
          </div>
        </section>
      )}

      <section className="detail-section">
        <span className="eyebrow">La vetrina</span>
        <h2>{m.category === 'servizi' || m.category === 'salute' ? 'Servizi' : 'Prodotti e servizi'}</h2>
        <div className="product-grid">
          {rest.map((p) => (
            <ProductCard key={p.id} product={p} merchant={m} />
          ))}
        </div>
      </section>

      <div className="detail-columns" style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div>
          {m.posts.length > 0 && (
            <section className="detail-section">
              <span className="eyebrow">Dal profilo</span>
              <h2>Post recenti</h2>
              <div className="postgrid">
                {m.posts.map((p) => (
                  <button key={p.id} type="button" onClick={() => setOpenPost(p)} aria-label="Apri post">
                    <Img src={p.img} alt="" accent={m.accent} />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <section className="detail-section">
          <span className="eyebrow">Informazioni</span>
          <h2>Orari e contatti</h2>
          <div className="card" style={{ padding: 16 }}>
            <table className="hours-table">
              <tbody>
                {DAYS.map(([key, label]) => (
                  <tr key={key} className={key === todayKey() ? 'today' : ''}>
                    <td>{label}</td>
                    <td>{m.hours[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconPhone width={15} height={15} /> {m.phone}
            </p>
          </div>
          <div style={{ marginTop: 14 }}>
            <MapView merchants={[m]} categories={CATEGORIES} className="detail-map" />
          </div>
        </section>
      </div>

      <section className="detail-section" style={{ marginBottom: 10 }}>
        <div className="owner-cta">
          <div>
            <strong>Sei il titolare di {m.name}?</strong>
            <p>Gestisci vetrina, offerte e servizi in autonomia dalla tua area personale.</p>
          </div>
          <Link to="/login" className="btn brass">Area esercente</Link>
        </div>
      </section>

      {openPost && (
        <Sheet title={m.name} onClose={() => setOpenPost(null)}>
          <PostCard post={{ ...openPost, merchant: m }} />
        </Sheet>
      )}
    </>
  )
}
