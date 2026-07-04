import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { loginMerchant } from '../../store/store'
import { Avatar, categoryLabel } from '../../components/Cards'
import { Logo } from '../../components/Logo'
import { IconArrowLeft } from '../../components/Icons'
import '../../styles/merchant.css'

export default function Login() {
  const state = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('demo@hicom.it')
  const [password, setPassword] = useState('demo')
  const [error, setError] = useState('')

  const enter = (merchantId) => {
    loginMerchant(merchantId)
    navigate('/area-esercente')
  }

  const submit = (e) => {
    e.preventDefault()
    if (email.trim() === 'demo@hicom.it' && password === 'demo') {
      enter(state.merchants[0].id)
    } else {
      setError('Credenziali non valide. Per la demo usa demo@hicom.it / demo, oppure scegli un esercente qui sotto.')
    }
  }

  return (
    <div className="login-shell">
      <div className="login-brand">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--green-300)', fontSize: '0.85rem', marginBottom: 10 }}>
          <IconArrowLeft width={16} height={16} /> Torna all'app
        </Link>
        <Logo size={34} wordColor="#fff" />
        <h1>La tua attività, gestita da qui.</h1>
        <p>
          Vetrina, offerte, prenotazioni, ordini e chat: tutto in un unico pannello,
          semplice come un social. <span className="fee">Dal canone base di €12/mese</span>,
          con plugin e servizi che crescono con te.
        </p>
      </div>

      <div className="login-form">
        <h2>Accedi alla tua area</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
          Riservata agli esercenti della rete HiCom.
        </p>
        <div className="demo-hint">
          Prototipo dimostrativo — accedi con <code>demo@hicom.it</code> / <code>demo</code> o
          scegli direttamente un esercente di prova.
        </div>
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="lg-email">Email</label>
            <input id="lg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div className="field">
            <label htmlFor="lg-pass">Password</label>
            <input id="lg-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          {error && (
            <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginBottom: 12 }}>{error}</p>
          )}
          <button type="submit" className="btn dark block">Entra</button>
        </form>

        <div style={{ marginTop: 26 }}>
          <span className="eyebrow">Demo · entra come…</span>
          <div className="enter-as">
            {state.merchants.map((m) => (
              <button key={m.id} type="button" onClick={() => enter(m.id)}>
                <Avatar merchant={m} size={38} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3>{m.name}</h3>
                  <p>
                    {categoryLabel(m.category)}
                    {m.plugins.length > 0 ? ` · ${m.plugins.length} plugin` : ' · canone base'}
                    {m.tools.length > 0 ? ' · strumenti su misura' : ''}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
