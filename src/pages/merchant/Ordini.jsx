import { useOutletContext } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { merchantOrders, updateOrderStatus, ORDER_FLOW } from '../../store/store'

const NEXT_LABEL = {
  nuovo: 'Inizia la preparazione',
  'in-preparazione': 'Segna come pronto',
  pronto: 'Segna come ritirato',
}

const STATUS_META = {
  nuovo: ['Nuovo', 'attesa'],
  'in-preparazione': ['In preparazione', 'neutro'],
  pronto: ['Pronto', 'ok'],
  ritirato: ['Ritirato', 'neutro'],
}

export default function Ordini() {
  const { merchant: m } = useOutletContext()
  useStore()
  const orders = merchantOrders(m.id).sort((a, b) => {
    const rank = (o) => (o.status === 'ritirato' ? 1 : 0)
    if (rank(a) !== rank(b)) return rank(a) - rank(b)
    return a.pickup.time.localeCompare(b.pickup.time)
  })

  return (
    <>
      <span className="eyebrow">Plugin Ritiri & Ordini · +€5/mese</span>
      <h1>Coda ordini</h1>
      <p className="page-sub">
        Il cittadino vede lo stato aggiornarsi in tempo reale sul suo telefono.
      </p>

      <div className="panel">
        {orders.map((o) => {
          const [label, tone] = STATUS_META[o.status]
          const next = ORDER_FLOW[ORDER_FLOW.indexOf(o.status) + 1]
          return (
            <div key={o.id} className="mrow" style={{ alignItems: 'flex-start' }}>
              <div className="r-time">
                {o.pickup.time}
                <small>ritiro</small>
              </div>
              <div className="r-main">
                <h3>
                  {o.name} <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{o.code}</span>
                </h3>
                <p className="r-sub">
                  {o.items.map((i) => `${i.qty}× ${i.name}${i.note ? ` (${i.note})` : ''}`).join(' · ')}
                </p>
                <p className="r-sub">{o.phone}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'flex-end' }}>
                <span className={`status-chip ${tone}`}>{label}</span>
                {next && (
                  <button type="button" className="btn sm" onClick={() => updateOrderStatus(o.id, next)}>
                    {NEXT_LABEL[o.status]}
                  </button>
                )}
              </div>
            </div>
          )
        })}
        {orders.length === 0 && (
          <div className="empty">
            <div className="big">🛍️</div>
            Nessun ordine in coda.
          </div>
        )}
      </div>
    </>
  )
}
