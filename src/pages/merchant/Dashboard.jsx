import { Link, useOutletContext } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import {
  merchantBookings,
  merchantOrders,
  merchantMonthlyFee,
  seriesFor,
} from '../../store/store'

export default function Dashboard() {
  const { merchant: m } = useOutletContext()
  const state = useStore()

  const today = new Date().toISOString().slice(0, 10)
  const visits = seriesFor(m.id, 14, 40, 30)
  const visitsToday = visits[visits.length - 1].value
  const bookingsToday = merchantBookings(m.id).filter((b) => b.date === today && b.status !== 'rifiutata')
  const pendingOrders = merchantOrders(m.id).filter((o) => o.status === 'nuovo' || o.status === 'in-preparazione')
  const unread = state.chats.filter((c) => c.merchantId === m.id).reduce((n, c) => n + c.unreadMerchant, 0)
  const fee = merchantMonthlyFee(m)

  const hasBookings = m.plugins.includes('prenotazioni')
  const hasOrders = m.plugins.includes('ordini')

  return (
    <>
      <span className="eyebrow">La tua giornata</span>
      <h1>Ciao, {m.name} 👋</h1>
      <p className="page-sub">Ecco come sta andando la tua vetrina su HiCom.</p>

      <div className="kpi-grid">
        <div className="kpi">
          <span className="k-label">Visite oggi</span>
          <span className="k-value">{visitsToday}</span>
          <span className="k-hint">alla tua pagina</span>
        </div>
        <div className="kpi">
          <span className="k-label">Offerte attive</span>
          <span className="k-value">{m.offers.length}</span>
          <Link to="../offerte" className="k-hint">gestisci →</Link>
        </div>
        {hasBookings && (
          <div className="kpi">
            <span className="k-label">Prenotazioni oggi</span>
            <span className="k-value">{bookingsToday.length}</span>
            <Link to="../prenotazioni" className="k-hint">agenda →</Link>
          </div>
        )}
        {hasOrders && (
          <div className="kpi">
            <span className="k-label">Ordini in coda</span>
            <span className="k-value">{pendingOrders.length}</span>
            <Link to="../ordini" className="k-hint">prepara →</Link>
          </div>
        )}
        {m.plugins.includes('chat') && (
          <div className="kpi">
            <span className="k-label">Messaggi non letti</span>
            <span className="k-value">{unread}</span>
            <Link to="../chat" className="k-hint">rispondi →</Link>
          </div>
        )}
        <div className="kpi accent">
          <span className="k-label">Canone mensile</span>
          <span className="k-value">€{fee.total}</span>
          <Link to="../abbonamento" className="k-hint" style={{ color: 'var(--green-300)' }}>dettagli →</Link>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Azioni rapide</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Link to="../offerte?nuova=1" className="btn sm">+ Nuova offerta</Link>
          <Link to="../post?nuovo=1" className="btn dark sm">+ Nuovo post</Link>
          <Link to="../vetrina" className="btn ghost sm">Modifica vetrina</Link>
          <Link to={`/esercente/${m.id}`} className="btn ghost sm">Vedi la pagina pubblica</Link>
        </div>
      </div>

      {hasBookings && bookingsToday.length > 0 && (
        <div className="panel">
          <div className="panel-head">
            <h2>Prenotazioni di oggi</h2>
            <Link to="../prenotazioni" className="see-all" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal-600)' }}>
              Tutte →
            </Link>
          </div>
          {bookingsToday
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((b) => (
              <div key={b.id} className="mrow">
                <div className="r-time">
                  {b.time}
                  <small>{b.party > 1 ? `${b.party} pers.` : ''}</small>
                </div>
                <div className="r-main">
                  <h3>{b.name}</h3>
                  <p className="r-sub">
                    {b.code}
                    {b.note ? ` · ${b.note}` : ''}
                  </p>
                </div>
                <span className={`status-chip ${b.status === 'confermata' ? 'ok' : 'attesa'}`}>
                  {b.status === 'confermata' ? 'Confermata' : 'In attesa'}
                </span>
              </div>
            ))}
        </div>
      )}

      {hasOrders && pendingOrders.length > 0 && (
        <div className="panel">
          <div className="panel-head">
            <h2>Ordini da preparare</h2>
            <Link to="../ordini" className="see-all" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal-600)' }}>
              Tutti →
            </Link>
          </div>
          {pendingOrders.map((o) => (
            <div key={o.id} className="mrow">
              <div className="r-time">
                {o.pickup.time}
                <small>ritiro</small>
              </div>
              <div className="r-main">
                <h3>{o.name}</h3>
                <p className="r-sub">
                  {o.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
                </p>
              </div>
              <span className={`status-chip ${o.status === 'nuovo' ? 'attesa' : 'neutro'}`}>
                {o.status === 'nuovo' ? 'Nuovo' : 'In preparazione'}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
