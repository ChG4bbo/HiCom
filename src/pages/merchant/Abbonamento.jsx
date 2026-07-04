import { Link, useOutletContext } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { getMerchant, togglePlugin, setCurated, merchantMonthlyFee } from '../../store/store'
import { PLUGINS, BUNDLE, CURATED, BASE_FEE } from '../../data/seed'

export default function Abbonamento() {
  const { merchant } = useOutletContext()
  useStore()
  const m = getMerchant(merchant.id)
  const fee = merchantMonthlyFee(m)

  return (
    <>
      <span className="eyebrow">Il tuo piano HiCom</span>
      <h1>Abbonamento & plugin</h1>
      <p className="page-sub">
        Attivi e disattivi quando vuoi: le funzioni si sbloccano subito nel pannello.
      </p>

      <div className="plan-total">
        <span className="eyebrow" style={{ color: 'var(--teal-300)' }}>Il tuo canone mensile</span>
        <div className="pt-rows">
          <div>
            <span>Canone base — vetrina, offerte, post, hosting e assistenza</span>
            <strong>€{BASE_FEE}</strong>
          </div>
          {fee.bundleApplied ? (
            <>
              <div>
                <span>Bundle settore (Prenotazioni + Ordini + Chat)</span>
                <strong>+€{BUNDLE.price}</strong>
              </div>
              {m.plugins.includes('vetrinaplus') && (
                <div>
                  <span>Vetrina+</span>
                  <strong>+€{PLUGINS.vetrinaplus.price}</strong>
                </div>
              )}
            </>
          ) : (
            m.plugins.map((p) => (
              <div key={p}>
                <span>{PLUGINS[p].label}</span>
                <strong>+€{PLUGINS[p].price}</strong>
              </div>
            ))
          )}
          {m.curated !== 'none' && (
            <div>
              <span>{CURATED[m.curated].label}</span>
              <strong>+€{CURATED[m.curated].price}</strong>
            </div>
          )}
        </div>
        <div className="pt-sum">
          <span>Totale al mese</span>
          <span className="tot">€{fee.total}</span>
        </div>
        {fee.bundleApplied && (
          <p style={{ fontSize: '0.75rem', color: 'var(--teal-300)', marginTop: 8 }}>
            ✓ Bundle settore applicato automaticamente: risparmi €5 al mese rispetto ai plugin singoli.
          </p>
        )}
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Moduli di settore · plugin</h2>
        </div>
        {Object.values(PLUGINS).map((p) => {
          const on = m.plugins.includes(p.id)
          return (
            <div key={p.id} className="plugin-card">
              <div className="pc-main">
                <h3>
                  {p.label} <span className="pc-price">+€{p.price}/mese</span>
                  {on && <span className="badge">Attivo</span>}
                </h3>
                <p>{p.desc}</p>
              </div>
              <button
                type="button"
                className={`switch${on ? ' on' : ''}`}
                role="switch"
                aria-checked={on}
                aria-label={`${p.label} ${on ? 'attivo' : 'non attivo'}`}
                onClick={() => togglePlugin(m.id, p.id)}
              />
            </div>
          )
        })}
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 12 }}>
          💡 Attivando insieme Prenotazioni, Ritiri & Ordini e Chat si applica il{' '}
          <strong>Bundle settore a €{BUNDLE.price}/mese</strong> invece di €15.
        </p>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Vetrina Curata — ci occupiamo noi dei contenuti</h2>
        </div>
        <div className="curated-grid">
          {Object.values(CURATED).map((c) => (
            <button
              key={c.id}
              type="button"
              className={`curated-card${m.curated === c.id ? ' on' : ''}`}
              onClick={() => setCurated(m.id, c.id)}
            >
              <h3>{c.label}</h3>
              <div className="cc-price">{c.price === 0 ? 'Incluso' : `+€${c.price}/mese`}</div>
              {c.id === 'none' && <ul><li>Gestisci tutto in autonomia</li><li>Piattaforma completa</li></ul>}
              {c.id === 'plus' && (
                <ul>
                  <li>Servizio fotografico periodico</li>
                  <li>Caricamento prodotti e offerte</li>
                  <li>Cura ordinaria della pagina</li>
                </ul>
              )}
              {c.id === 'pro' && (
                <ul>
                  <li>Tutto il Plus</li>
                  <li>Gestione pagine social</li>
                  <li>Campagne sponsorizzate</li>
                </ul>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="panel" style={{ background: 'linear-gradient(135deg, var(--brass-100), #fff 70%)' }}>
        <div className="panel-head">
          <h2>Officina Digitale · strumenti su misura</h2>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
          Magazzino, incassi, clienti, statistiche: piccoli strumenti gestionali costruiti
          sulla tua attività, a tariffe agevolate per la rete HiCom.
        </p>
        <Link to="../strumenti" className="btn brass sm" style={{ marginTop: 12 }}>
          Scopri i tuoi strumenti
        </Link>
      </div>
    </>
  )
}
