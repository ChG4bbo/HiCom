import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { activeMerchants } from '../../store/store'
import { CATEGORIES } from '../../data/seed'
import { MerchantCard } from '../../components/Cards'
import { MapView } from '../../components/MapView'
import { IconSearch, IconList, IconMap } from '../../components/Icons'
import { isOpenNow } from '../../utils'
import '../../styles/esplora.css'

const SERVICE_FILTERS = [
  { id: 'prenotazioni', label: 'Si prenota' },
  { id: 'ordini', label: 'Ordina & ritira' },
  { id: 'chat', label: 'Chat' },
]

export default function Esplora() {
  useStore()
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || ''
  const [q, setQ] = useState('')
  const [services, setServices] = useState([])
  const [openNow, setOpenNow] = useState(false)
  const [view, setView] = useState('lista')
  const [selected, setSelected] = useState(null)

  const merchants = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return activeMerchants().filter((m) => {
      if (cat && m.category !== cat) return false
      if (services.some((s) => !m.plugins.includes(s))) return false
      if (openNow && isOpenNow(m) !== true) return false
      if (needle) {
        const hay = `${m.name} ${m.tagline} ${m.description} ${m.address} ${m.products.map((p) => p.name).join(' ')}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }, [cat, q, services, openNow])

  const setCat = (id) => {
    setSelected(null)
    setParams(id ? { cat: id } : {}, { replace: true })
  }

  const toggleService = (id) => {
    setSelected(null)
    setServices((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  return (
    <>
      <div className="esplora-head">
        <span className="eyebrow">Tutta la rete di Orbassano</span>
        <h1 style={{ fontSize: '1.4rem', margin: '4px 0 14px' }}>Esplora gli esercenti</h1>
        <label className="esplora-search">
          <IconSearch width={18} height={18} />
          <input
            type="search"
            placeholder="Cerca per nome, prodotto o servizio…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Cerca esercenti"
          />
        </label>
      </div>

      <div className="esplora-filters">
        <button type="button" className={`chip${cat === '' ? ' active' : ''}`} onClick={() => setCat('')}>
          Tutti
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
        <span style={{ alignSelf: 'center', color: 'var(--line)' }}>|</span>
        {SERVICE_FILTERS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`chip${services.includes(s.id) ? ' active' : ''}`}
            onClick={() => toggleService(s.id)}
          >
            {s.label}
          </button>
        ))}
        <button type="button" className={`chip${openNow ? ' active' : ''}`} onClick={() => setOpenNow(!openNow)}>
          Aperto ora
        </button>
      </div>

      {/* mobile: viste alternate · desktop: affiancate */}
      <div className="esplora-body split">
        <div className={`esplora-pane${view === 'lista' ? ' shown' : ''}`}>
          <p className="esplora-count">
            {merchants.length} esercent{merchants.length === 1 ? 'e' : 'i'} nella rete
          </p>
          <div className="esplora-list">
            {merchants.map((m) => (
              <MerchantCard key={m.id} merchant={m} />
            ))}
            {merchants.length === 0 && (
              <div className="empty">
                <div className="big">🔍</div>
                Nessun esercente corrisponde ai filtri.
              </div>
            )}
          </div>
        </div>
        <div className={`esplora-pane${view === 'mappa' ? ' shown' : ''}`}>
          <MapView
            merchants={merchants}
            categories={CATEGORIES}
            onSelect={setSelected}
            selectedId={selected?.id}
            className="esplora-map"
          />
        </div>
      </div>

      {view === 'mappa' && selected && (
        <div className="map-selected">
          <MerchantCard merchant={selected} compact />
        </div>
      )}

      <div className="view-toggle" role="tablist" aria-label="Vista">
        <button type="button" className={view === 'lista' ? 'active' : ''} onClick={() => setView('lista')}>
          <IconList width={16} height={16} /> Lista
        </button>
        <button type="button" className={view === 'mappa' ? 'active' : ''} onClick={() => { setView('mappa'); setSelected(null) }}>
          <IconMap width={16} height={16} /> Mappa
        </button>
      </div>
    </>
  )
}
