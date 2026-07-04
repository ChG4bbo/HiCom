import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Logo, LogoMark } from './Logo'
import { IconHome, IconCompass, IconTicket, IconChat, IconPin, IconStore } from './Icons'
import { useStore } from '../store/StoreContext'
import { citizenUnreadTotal, resetDemo } from '../store/store'
import { InstallBanner } from './InstallBanner'
import '../styles/layout.css'

export function CitizenLayout() {
  useStore()
  const unread = citizenUnreadTotal()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="citizen-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" aria-label="HiCom — home">
            <Logo size={30} />
          </Link>
          <nav className="topbar-nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/esplora">Esplora</NavLink>
            <NavLink to="/offerte">Offerte</NavLink>
            <NavLink to="/chat">Chat{unread > 0 ? ` (${unread})` : ''}</NavLink>
          </nav>
          <span className="topbar-loc">
            <IconPin width={13} height={13} /> ORBASSANO
          </span>
          <Link to="/login" className="topbar-cta">
            <IconStore width={17} height={17} /> Area esercente
          </Link>
        </div>
      </header>

      <main className="citizen-main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <Logo size={26} wordColor="#fff" />
            <p style={{ marginTop: 10, maxWidth: 420 }}>
              La rete del commercio locale di Orbassano: ogni attività una vetrina,
              ai cittadini le offerte migliori, al territorio il valore che resta.
            </p>
          </div>
          <div>
            <h4>Per i cittadini</h4>
            <div className="footer-links">
              <Link to="/esplora">Tutti gli esercenti</Link>
              <Link to="/offerte">Offerte attive</Link>
              <Link to="/chat">Le tue chat</Link>
            </div>
          </div>
          <div>
            <h4>Per gli esercenti</h4>
            <div className="footer-links">
              <Link to="/login">Accedi alla tua area</Link>
              <Link to="/login">Entra nella rete — da €12/mese</Link>
              <Link to="/admin">Amministrazione</Link>
            </div>
          </div>
          <div className="footer-fine">
            <span>HICOM · PROTOTIPO DIMOSTRATIVO</span>
            <span>UN PROGETTO DI GABRIELE CHIBBARO</span>
            <button type="button" onClick={() => { if (confirm('Riportare i dati della demo allo stato iniziale?')) resetDemo() }}>
              RESET DEMO
            </button>
          </div>
        </div>
      </footer>

      <nav className="bottomnav" aria-label="Navigazione principale">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          <IconHome /> Home
        </NavLink>
        <NavLink to="/esplora" className={({ isActive }) => (isActive ? 'active' : '')}>
          <IconCompass /> Esplora
        </NavLink>
        <NavLink to="/offerte" className={({ isActive }) => (isActive ? 'active' : '')}>
          <IconTicket /> Offerte
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
          <IconChat /> Chat
          {unread > 0 && <span className="nav-badge">{unread}</span>}
        </NavLink>
      </nav>

      <InstallBanner />
    </div>
  )
}
