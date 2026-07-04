import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { getMerchant, hasPlugin, addBooking } from '../../store/store'
import { Avatar } from '../../components/Cards'
import { IconArrowLeft, IconCheck } from '../../components/Icons'
import '../../styles/flows.css'

function nextDays(merchant, n = 7) {
  const out = []
  const keys = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab']
  for (let i = 0; i < n + 3 && out.length < n; i++) {
    const d = new Date(Date.now() + i * 86400000)
    const spec = merchant.hours[keys[d.getDay()]] || ''
    if (/chiuso/i.test(spec)) continue
    out.push({
      iso: d.toISOString().slice(0, 10),
      dayShort: d.toLocaleDateString('it-IT', { weekday: 'short' }),
      dayNum: d.getDate(),
      label: i === 0 ? 'Oggi' : i === 1 ? 'Domani' : null,
    })
  }
  return out
}

export default function Prenota() {
  const { id } = useParams()
  useStore()
  const m = getMerchant(id)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [party, setParty] = useState(2)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [done, setDone] = useState(null)

  if (!m || !hasPlugin(m, 'prenotazioni')) {
    return (
      <div className="container section empty">
        <div className="big">📅</div>
        Questo esercente non accetta prenotazioni online.
      </div>
    )
  }

  const isTable = m.booking?.type !== 'appuntamenti'
  const days = nextDays(m)
  const canConfirm = date && time && name.trim().length > 1 && phone.trim().length > 5

  if (done) {
    return (
      <div className="flow-page">
        <div className="confirm-card">
          <div className="check">
            <IconCheck width={30} height={30} />
          </div>
          <h2>Richiesta inviata!</h2>
          <p className="sub">
            {m.name} riceverà la tua prenotazione e la confermerà a breve.
          </p>
          <div className="confirm-code">{done.code}</div>
          <p className="confirm-note">Il tuo codice prenotazione</p>
          <div className="confirm-summary">
            <span>📅 <strong>{new Date(`${done.date}T12:00`).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</strong> alle <strong>{done.time}</strong></span>
            {isTable && <span>👥 <strong>{done.party}</strong> {done.party === 1 ? 'persona' : 'persone'}</span>}
            {done.note && <span>📝 {done.note}</span>}
            <span>📍 {m.address}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
            <Link to={`/esercente/${m.id}`} className="btn ghost sm">Torna alla vetrina</Link>
            <Link to="/" className="btn sm">Vai alla home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flow-page">
      <div className="flow-merchant">
        <Link to={`/esercente/${m.id}`} className="back" aria-label="Indietro">
          <IconArrowLeft width={18} height={18} />
        </Link>
        <Avatar merchant={m} size={42} />
        <div>
          <h1>{isTable ? 'Prenota un tavolo' : 'Prenota un appuntamento'}</h1>
          <p>{m.name} · {m.address.replace(', Orbassano', '')}</p>
        </div>
      </div>

      <div className="flow-step">
        <span className="eyebrow">1 · Scegli il giorno</span>
        <div className="slot-row">
          {days.map((d) => (
            <button
              key={d.iso}
              type="button"
              className={`slot day${date === d.iso ? ' active' : ''}`}
              onClick={() => setDate(d.iso)}
            >
              <small>{d.label || d.dayShort}</small>
              {d.dayNum}
            </button>
          ))}
        </div>
      </div>

      <div className="flow-step">
        <span className="eyebrow">2 · Scegli l'orario</span>
        <div className="slot-row">
          {m.booking.slots.map((s) => (
            <button
              key={s}
              type="button"
              className={`slot${time === s ? ' active' : ''}`}
              onClick={() => setTime(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {isTable && (
        <div className="flow-step">
          <span className="eyebrow">3 · Quante persone?</span>
          <div className="stepper">
            <button type="button" onClick={() => setParty(party - 1)} disabled={party <= 1} aria-label="Meno">−</button>
            <span>{party}</span>
            <button type="button" onClick={() => setParty(party + 1)} disabled={party >= (m.booking.maxParty || 10)} aria-label="Più">+</button>
          </div>
        </div>
      )}

      <div className="flow-step">
        <span className="eyebrow">{isTable ? '4' : '3'} · I tuoi dati</span>
        <div className="field">
          <label htmlFor="bk-name">Nome e cognome</label>
          <input id="bk-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Mario Rossi" />
        </div>
        <div className="field">
          <label htmlFor="bk-phone">Telefono</label>
          <input id="bk-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="333 1234567" />
        </div>
        <div className="field">
          <label htmlFor="bk-note">Nota (facoltativa)</label>
          <input
            id="bk-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={isTable ? 'Es. tavolo nel dehors, seggiolone…' : 'Es. motivo della visita…'}
          />
        </div>
      </div>

      <button
        type="button"
        className="btn block"
        disabled={!canConfirm}
        onClick={() => {
          const b = addBooking({
            merchantId: m.id,
            kind: m.booking.type,
            name: name.trim(),
            phone: phone.trim(),
            date,
            time,
            party: isTable ? party : 1,
            note: note.trim() || undefined,
          })
          setDone(b)
        }}
      >
        Invia la richiesta
      </button>
      <p style={{ fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', marginTop: 10 }}>
        Nessuna registrazione richiesta: ricevi il codice e mostralo all'arrivo.
      </p>
    </div>
  )
}
