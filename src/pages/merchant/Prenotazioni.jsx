import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { merchantBookings, updateBookingStatus } from '../../store/store'
import { IconCheck, IconX } from '../../components/Icons'
import { formatDateLong } from './helpers'

const TABS = [
  { id: 'in-attesa', label: 'In attesa' },
  { id: 'confermata', label: 'Confermate' },
  { id: 'tutte', label: 'Tutte' },
]

export default function Prenotazioni() {
  const { merchant: m } = useOutletContext()
  useStore()
  const [tab, setTab] = useState('in-attesa')

  const all = merchantBookings(m.id).sort((a, b) =>
    `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`),
  )
  const list = all.filter((b) => (tab === 'tutte' ? true : b.status === tab))

  /* raggruppa per giorno */
  const byDate = []
  list.forEach((b) => {
    const last = byDate[byDate.length - 1]
    if (last && last.date === b.date) last.items.push(b)
    else byDate.push({ date: b.date, items: [b] })
  })

  const today = new Date().toISOString().slice(0, 10)
  const isAppointments = m.booking?.type === 'appuntamenti'

  return (
    <>
      <span className="eyebrow">Plugin Prenotazioni · +€6/mese</span>
      <h1>{isAppointments ? 'Agenda appuntamenti' : 'Prenotazioni tavoli'}</h1>
      <p className="page-sub">Le richieste dei cittadini arrivano qui in tempo reale.</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        {TABS.map((t) => (
          <button key={t.id} type="button" className={`chip${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
            {t.id === 'in-attesa' && all.filter((b) => b.status === 'in-attesa').length > 0 && (
              <span style={{ fontFamily: 'var(--font-mono)' }}>
                {all.filter((b) => b.status === 'in-attesa').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {byDate.map((group) => (
        <div key={group.date} className="panel">
          <div className="panel-head">
            <h2 style={{ textTransform: 'capitalize' }}>
              {group.date === today ? 'Oggi' : formatDateLong(group.date)}
            </h2>
          </div>
          {group.items.map((b) => (
            <div key={b.id} className="mrow">
              <div className="r-time">
                {b.time}
                {b.party > 1 && <small>{b.party} pers.</small>}
              </div>
              <div className="r-main">
                <h3>{b.name}</h3>
                <p className="r-sub">
                  <span className="mono">{b.code}</span> · {b.phone}
                  {b.note ? ` · ${b.note}` : ''}
                </p>
              </div>
              {b.status === 'in-attesa' ? (
                <div className="r-actions">
                  <button type="button" className="btn sm" onClick={() => updateBookingStatus(b.id, 'confermata')}>
                    <IconCheck width={14} height={14} /> Conferma
                  </button>
                  <button type="button" className="btn danger sm" onClick={() => updateBookingStatus(b.id, 'rifiutata')} aria-label="Rifiuta">
                    <IconX width={14} height={14} />
                  </button>
                </div>
              ) : (
                <span className={`status-chip ${b.status === 'confermata' ? 'ok' : 'no'}`}>
                  {b.status === 'confermata' ? 'Confermata' : 'Rifiutata'}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}

      {list.length === 0 && (
        <div className="empty">
          <div className="big">📅</div>
          Nessuna prenotazione {tab === 'in-attesa' ? 'in attesa' : ''} al momento.
        </div>
      )}
    </>
  )
}
