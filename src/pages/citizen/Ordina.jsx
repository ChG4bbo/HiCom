import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { getMerchant, hasPlugin, addOrder, ORDER_FLOW } from '../../store/store'
import { Avatar } from '../../components/Cards'
import { Img } from '../../components/Img'
import { IconArrowLeft, IconCheck } from '../../components/Icons'
import { formatPrice } from '../../utils'
import '../../styles/flows.css'

const STATUS_LABEL = {
  nuovo: 'Ordine ricevuto',
  'in-preparazione': 'In preparazione',
  pronto: 'Pronto per il ritiro',
  ritirato: 'Ritirato',
}

const PICKUP_SLOTS = ['10:00', '11:00', '12:00', '12:30', '16:30', '17:30', '18:30']

export default function Ordina() {
  const { id } = useParams()
  const state = useStore()
  const m = getMerchant(id)
  const [qty, setQty] = useState({})
  const [slot, setSlot] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [doneId, setDoneId] = useState(null)

  const items = useMemo(
    () => (m ? m.products.filter((p) => p.orderable) : []),
    [m],
  )

  if (!m || !hasPlugin(m, 'ordini')) {
    return (
      <div className="container section empty">
        <div className="big">🛍️</div>
        Questo esercente non accetta ordini online.
      </div>
    )
  }

  /* schermata di stato ordine (si aggiorna live se l'esercente avanza) */
  const done = doneId ? state.orders.find((o) => o.id === doneId) : null
  if (done) {
    const currentIdx = ORDER_FLOW.indexOf(done.status)
    return (
      <div className="flow-page">
        <div className="confirm-card">
          <div className="check">
            <IconCheck width={30} height={30} />
          </div>
          <h2>Ordine inviato!</h2>
          <p className="sub">Ritira da {m.name} · {done.pickup.time} di oggi</p>
          <div className="confirm-code">{done.code}</div>
          <p className="confirm-note">Mostra questo codice al ritiro</p>
          <div className="order-status-flow">
            {ORDER_FLOW.map((s, i) => (
              <div key={s} className={`osf-step${i < currentIdx ? ' done' : ''}${i === currentIdx ? ' current' : ''}`}>
                <span className="osf-dot">{i < currentIdx && <IconCheck width={12} height={12} />}</span>
                <span className="osf-label">{STATUS_LABEL[s]}</span>
              </div>
            ))}
          </div>
          <p className="confirm-note" style={{ marginTop: 4 }}>
            Lo stato si aggiorna in tempo reale quando l'esercente prepara l'ordine.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' }}>
            <Link to={`/esercente/${m.id}`} className="btn ghost sm">Torna alla vetrina</Link>
            <Link to="/" className="btn sm">Vai alla home</Link>
          </div>
        </div>
      </div>
    )
  }

  const chosen = items.filter((p) => (qty[p.id] || 0) > 0)
  const total = chosen.reduce((sum, p) => sum + p.price * qty[p.id], 0)
  const canConfirm = chosen.length > 0 && slot && name.trim().length > 1 && phone.trim().length > 5

  const setQ = (pid, delta) =>
    setQty((q) => ({ ...q, [pid]: Math.max(0, (q[pid] || 0) + delta) }))

  return (
    <div className="flow-page">
      <div className="flow-merchant">
        <Link to={`/esercente/${m.id}`} className="back" aria-label="Indietro">
          <IconArrowLeft width={18} height={18} />
        </Link>
        <Avatar merchant={m} size={42} />
        <div>
          <h1>Ordina & ritira</h1>
          <p>{m.name} · prepara e passi a ritirare</p>
        </div>
      </div>

      <div className="flow-step">
        <span className="eyebrow">1 · Cosa vuoi ordinare?</span>
        {items.map((p) => (
          <div key={p.id} className="order-item">
            <div className="oi-img">
              <Img src={p.img} alt="" accent={m.accent} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3>{p.name}</h3>
              <span className="oi-price">
                {formatPrice(p)} {p.unit || ''}
              </span>
            </div>
            <div className="stepper" style={{ padding: '3px 6px' }}>
              <button type="button" onClick={() => setQ(p.id, -1)} disabled={!qty[p.id]} aria-label="Meno">−</button>
              <span>{qty[p.id] || 0}</span>
              <button type="button" onClick={() => setQ(p.id, 1)} aria-label="Più">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flow-step">
        <span className="eyebrow">2 · Quando passi a ritirare? (oggi)</span>
        <div className="slot-row">
          {PICKUP_SLOTS.map((s) => (
            <button key={s} type="button" className={`slot${slot === s ? ' active' : ''}`} onClick={() => setSlot(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flow-step">
        <span className="eyebrow">3 · I tuoi dati</span>
        <div className="field">
          <label htmlFor="or-name">Nome e cognome</label>
          <input id="or-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Mario Rossi" />
        </div>
        <div className="field">
          <label htmlFor="or-phone">Telefono</label>
          <input id="or-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="333 1234567" />
        </div>
      </div>

      {total > 0 && (
        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 12 }}>
          Totale indicativo: €{total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
        </p>
      )}

      <button
        type="button"
        className="btn dark block"
        disabled={!canConfirm}
        onClick={() => {
          const o = addOrder({
            merchantId: m.id,
            name: name.trim(),
            phone: phone.trim(),
            items: chosen.map((p) => ({ productId: p.id, name: p.name, qty: qty[p.id] })),
            pickup: { date: new Date().toISOString().slice(0, 10), time: slot },
          })
          setDoneId(o.id)
        }}
      >
        Invia l'ordine {chosen.length > 0 && `· ${chosen.reduce((n, p) => n + qty[p.id], 0)} articoli`}
      </button>
      <p style={{ fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', marginTop: 10 }}>
        Paghi in negozio al ritiro. L'esercente conferma la disponibilità.
      </p>
    </div>
  )
}
