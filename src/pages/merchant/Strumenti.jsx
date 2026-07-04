import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { updateInventory, addCrmNote, seriesFor } from '../../store/store'
import { TOOLS } from '../../data/seed'
import { BarChart } from '../../components/BarChart'
import { IconSearch } from '../../components/Icons'
import { formatDateShort } from './helpers'

/* ---- Gestore magazzino ------------------------------------------ */
function Magazzino({ merchant, state }) {
  const rows = state.inventory.filter((i) => i.merchantId === merchant.id)
  const low = rows.filter((i) => i.qty <= i.min)
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>📦 Gestore magazzino</h2>
      </div>
      {low.length > 0 && (
        <div className="demo-hint" style={{ background: 'var(--danger-100)', color: 'var(--danger)' }}>
          ⚠️ {low.length} articol{low.length === 1 ? 'o' : 'i'} sotto la soglia di riordino.
        </div>
      )}
      {rows.map((i) => (
        <div key={i.id} className="mrow">
          <div className="r-main">
            <h3>{i.name}</h3>
            <p className="r-sub">
              <span className="mono">{i.sku}</span> · soglia minima {i.min}
            </p>
          </div>
          <span className={`status-chip ${i.qty <= i.min ? 'no' : 'ok'}`}>
            {i.qty <= i.min ? 'Scorta bassa' : 'OK'}
          </span>
          <div className="stepper" style={{ padding: '3px 6px' }}>
            <button type="button" onClick={() => updateInventory(i.id, { qty: Math.max(0, i.qty - 1) })} aria-label="Scarica">−</button>
            <span>{i.qty}</span>
            <button type="button" onClick={() => updateInventory(i.id, { qty: i.qty + 1 })} aria-label="Carica">+</button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---- Registro incassi -------------------------------------------- */
function Incassi({ merchant }) {
  const serie = seriesFor(`${merchant.id}-incassi`, 14, 420, 160)
  const today = serie[serie.length - 1].value
  const week = serie.slice(-7).reduce((s, d) => s + d.value, 0)
  const avg = Math.round(serie.reduce((s, d) => s + d.value, 0) / serie.length)
  const fmt = (v) => `€${v}`
  return (
    <>
      <div className="kpi-grid" style={{ marginTop: 0 }}>
        <div className="kpi">
          <span className="k-label">Oggi</span>
          <span className="k-value">€{today}</span>
        </div>
        <div className="kpi">
          <span className="k-label">Ultimi 7 giorni</span>
          <span className="k-value">€{week.toLocaleString('it-IT')}</span>
        </div>
        <div className="kpi">
          <span className="k-label">Media giornaliera</span>
          <span className="k-value">€{avg}</span>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">
          <h2>🧾 Incassi — ultimi 14 giorni</h2>
        </div>
        <BarChart data={serie} format={fmt} ariaLabel="Incassi giornalieri degli ultimi 14 giorni" />
        <p className="chart-note">Dati simulati per la demo. Nel prodotto reale: inserimento rapido a fine giornata o collegamento al registratore di cassa.</p>
      </div>
    </>
  )
}

/* ---- Mini-CRM ------------------------------------------------------ */
function Crm({ merchant, state }) {
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState(null)
  const [note, setNote] = useState('')
  const clients = state.crmClients
    .filter((c) => c.merchantId === merchant.id)
    .filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>👥 Mini-CRM clienti</h2>
      </div>
      <label className="esplora-search" style={{ marginBottom: 14 }}>
        <IconSearch width={16} height={16} />
        <input type="search" placeholder="Cerca cliente…" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      {clients.map((c) => (
        <div key={c.id} className="mrow" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="r-main">
            <h3>{c.name}</h3>
            <p className="r-sub">
              {c.phone} · {c.visits} visite
              {c.lastVisit ? ` · ultima: ${formatDateShort(c.lastVisit)}` : ' · mai venuto'}
            </p>
            {editing === c.id ? (
              <div style={{ marginTop: 8, width: '100%' }}>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ width: '100%', border: '1.5px solid var(--line)', borderRadius: 10, padding: 8, fontSize: '0.85rem' }}
                />
                <button
                  type="button"
                  className="btn sm"
                  style={{ marginTop: 6 }}
                  onClick={() => {
                    addCrmNote(c.id, note)
                    setEditing(null)
                  }}
                >
                  Salva nota
                </button>
              </div>
            ) : (
              <p className="r-sub" style={{ marginTop: 6, fontStyle: 'italic' }}>📝 {c.note}</p>
            )}
          </div>
          {editing !== c.id && (
            <button
              type="button"
              className="btn ghost sm"
              onClick={() => {
                setEditing(c.id)
                setNote(c.note)
              }}
            >
              Modifica nota
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

/* ---- Statistiche vetrina -------------------------------------------- */
function Statistiche({ merchant }) {
  const visits = seriesFor(`${merchant.id}-visite`, 14, 38, 26)
  const clicks = seriesFor(`${merchant.id}-click`, 14, 9, 8)
  const vToday = visits[visits.length - 1].value
  const vWeek = visits.slice(-7).reduce((s, d) => s + d.value, 0)
  const cWeek = clicks.slice(-7).reduce((s, d) => s + d.value, 0)
  return (
    <>
      <div className="kpi-grid" style={{ marginTop: 0 }}>
        <div className="kpi">
          <span className="k-label">Visite oggi</span>
          <span className="k-value">{vToday}</span>
        </div>
        <div className="kpi">
          <span className="k-label">Visite · 7 giorni</span>
          <span className="k-value">{vWeek}</span>
        </div>
        <div className="kpi">
          <span className="k-label">Click sulle offerte · 7 giorni</span>
          <span className="k-value">{cWeek}</span>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">
          <h2>📈 Visite alla vetrina — ultimi 14 giorni</h2>
        </div>
        <BarChart data={visits} ariaLabel="Visite giornaliere alla vetrina negli ultimi 14 giorni" />
        <p className="chart-note">Dati simulati per la demo. Il prodotto reale traccia visite e click in forma anonima e aggregata.</p>
      </div>
    </>
  )
}

const TOOL_VIEW = {
  magazzino: Magazzino,
  incassi: Incassi,
  crm: Crm,
  statistiche: Statistiche,
}

export default function Strumenti() {
  const { merchant: m } = useOutletContext()
  const state = useStore()
  const [active, setActive] = useState(m.tools[0] || null)
  const ActiveView = active ? TOOL_VIEW[active] : null
  const locked = Object.values(TOOLS).filter((t) => !m.tools.includes(t.id))

  return (
    <>
      <span className="eyebrow">Officina Digitale · su misura per te</span>
      <h1>I tuoi strumenti</h1>
      <p className="page-sub">
        Piccoli gestionali costruiti sulla singola attività, oltre il canone base.
      </p>

      {m.tools.length > 0 ? (
        <>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            {m.tools.map((t) => (
              <button
                key={t}
                type="button"
                className={`chip${active === t ? ' active' : ''}`}
                onClick={() => setActive(t)}
              >
                {TOOLS[t].icon} {TOOLS[t].label}
              </button>
            ))}
          </div>
          {ActiveView && <ActiveView merchant={m} state={state} />}
        </>
      ) : (
        <div className="empty" style={{ paddingBottom: 20 }}>
          <div className="big">🛠️</div>
          Nessuno strumento attivo per la tua attività, per ora.
        </div>
      )}

      {locked.length > 0 && (
        <div className="panel" style={{ background: 'linear-gradient(135deg, var(--green-50), #fff 60%)' }}>
          <div className="panel-head">
            <h2>Disponibili su richiesta</h2>
          </div>
          {locked.map((t) => (
            <div key={t.id} className="plugin-card">
              <div className="pc-main">
                <h3>
                  {t.icon} {t.label} <span className="badge brass">Su misura</span>
                </h3>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 10 }}>
            Gli strumenti dell'Officina Digitale si progettano insieme, a tariffe agevolate
            per la rete HiCom. Parlane con il tuo referente.
          </p>
        </div>
      )}
    </>
  )
}
