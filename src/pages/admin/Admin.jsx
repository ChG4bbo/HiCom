import { Link } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { merchantMonthlyFee, setMerchantActive } from '../../store/store'
import { Avatar, categoryLabel } from '../../components/Cards'
import { Logo } from '../../components/Logo'
import { IconArrowLeft } from '../../components/Icons'
import { PLUGINS, CURATED, BASE_FEE } from '../../data/seed'
import '../../styles/merchant.css'

export default function Admin() {
  const state = useStore()
  const merchants = state.merchants
  const active = merchants.filter((m) => m.active)

  const fees = active.map((m) => merchantMonthlyFee(m))
  const mrr = fees.reduce((s, f) => s + f.total, 0)
  const mrrBase = active.length * BASE_FEE
  const mrrPlugins = fees.reduce((s, f) => s + f.plugins, 0)
  const mrrCurated = fees.reduce((s, f) => s + f.curated, 0)

  return (
    <div className="mshell" style={{ display: 'block' }}>
      <header className="mtop" style={{ position: 'sticky', height: 'auto', padding: '14px var(--gutter)' }}>
        <div className="mtop-row" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Logo size={26} wordColor="#fff" />
          <div className="who">
            <span>Pannello di amministrazione</span>
            <strong>Rete di Orbassano</strong>
          </div>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
            <IconArrowLeft width={15} height={15} /> App
          </Link>
        </div>
      </header>

      <main className="mbody">
        <span className="eyebrow">La rete, in numeri</span>
        <h1>Amministrazione HiCom</h1>
        <p className="page-sub">Stato degli esercenti, abbonamenti e canoni della rete.</p>

        <div className="kpi-grid">
          <div className="kpi">
            <span className="k-label">Esercenti attivi</span>
            <span className="k-value">{active.length}</span>
            <span className="k-hint">su {merchants.length} nella rete</span>
          </div>
          <div className="kpi accent">
            <span className="k-label">Canone mensile totale</span>
            <span className="k-value">€{mrr}</span>
            <span className="k-hint" style={{ color: 'var(--green-300)' }}>€{mrr * 12}/anno</span>
          </div>
          <div className="kpi">
            <span className="k-label">Da canoni base</span>
            <span className="k-value">€{mrrBase}</span>
            <span className="k-hint">{active.length} × €{BASE_FEE}</span>
          </div>
          <div className="kpi">
            <span className="k-label">Da plugin & servizi</span>
            <span className="k-value">€{mrrPlugins + mrrCurated}</span>
            <span className="k-hint">plugin €{mrrPlugins} · curata €{mrrCurated}</span>
          </div>
        </div>

        <div className="panel" style={{ overflowX: 'auto' }}>
          <div className="panel-head">
            <h2>Esercenti ({merchants.length})</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: 640 }}>
            <thead>
              <tr>
                {['Attività', 'Categoria', 'Piano', '€/mese', 'Stato'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: h === '€/mese' ? 'right' : 'left',
                      padding: '8px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      borderBottom: '1.5px solid var(--line)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {merchants.map((m) => {
                const fee = merchantMonthlyFee(m)
                return (
                  <tr key={m.id} style={{ opacity: m.active ? 1 : 0.5 }}>
                    <td style={{ padding: '10px', borderBottom: '1px solid var(--line)' }}>
                      <Link to={`/esercente/${m.id}`} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <Avatar merchant={m} size={30} />
                        <strong>{m.name}</strong>
                      </Link>
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid var(--line)', color: 'var(--muted)' }}>
                      {categoryLabel(m.category)}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid var(--line)' }}>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        <span className="badge gray">Base</span>
                        {fee.bundleApplied && <span className="badge">Bundle settore</span>}
                        {!fee.bundleApplied &&
                          m.plugins.map((p) => (
                            <span key={p} className="badge">{PLUGINS[p].label}</span>
                          ))}
                        {fee.bundleApplied && m.plugins.includes('vetrinaplus') && (
                          <span className="badge">Vetrina+</span>
                        )}
                        {m.curated !== 'none' && <span className="badge brass">{CURATED[m.curated].label}</span>}
                        {m.tools.length > 0 && <span className="badge green">{m.tools.length} strumenti</span>}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid var(--line)',
                        textAlign: 'right',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                      }}
                    >
                      €{fee.total}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid var(--line)' }}>
                      <button
                        type="button"
                        className={`switch${m.active ? ' on' : ''}`}
                        role="switch"
                        aria-checked={m.active}
                        aria-label={`${m.name} ${m.active ? 'attivo' : 'sospeso'}`}
                        onClick={() => setMerchantActive(m.id, !m.active)}
                        title={m.active ? 'Sospendi (sparisce dall’app)' : 'Riattiva'}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="chart-note">
            Sospendendo un esercente, la sua vetrina sparisce immediatamente da Home, Esplora e mappa.
          </p>
        </div>
      </main>
    </div>
  )
}
