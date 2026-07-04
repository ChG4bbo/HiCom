import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { currentMerchantId, getMerchant, logoutMerchant, merchantBookings, merchantOrders } from '../../store/store'
import { Avatar } from '../../components/Cards'
import { LogoMark } from '../../components/Logo'
import { IconLogout, IconStore } from '../../components/Icons'
import '../../styles/merchant.css'

const NAV = [
  { to: '', label: 'Dashboard', end: true },
  { to: 'vetrina', label: 'Vetrina' },
  { to: 'offerte', label: 'Offerte' },
  { to: 'post', label: 'Post' },
  { to: 'prenotazioni', label: 'Prenotazioni', plugin: 'prenotazioni', badge: 'bookings' },
  { to: 'ordini', label: 'Ordini', plugin: 'ordini', badge: 'orders' },
  { to: 'chat', label: 'Chat', plugin: 'chat', badge: 'chat' },
  { to: 'strumenti', label: 'Strumenti' },
  { to: 'abbonamento', label: 'Abbonamento & plugin' },
]

export function MerchantLayout() {
  const state = useStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const mid = currentMerchantId()
  const m = mid ? getMerchant(mid) : null

  useEffect(() => {
    if (!m) navigate('/login', { replace: true })
  }, [m, navigate])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (!m) return null

  const badges = {
    bookings: merchantBookings(m.id).filter((b) => b.status === 'in-attesa').length,
    orders: merchantOrders(m.id).filter((o) => o.status === 'nuovo').length,
    chat: state.chats.filter((c) => c.merchantId === m.id).reduce((n, c) => n + c.unreadMerchant, 0),
  }

  return (
    <div className="mshell">
      <header className="mtop">
        <div className="mtop-row">
          <LogoMark size={28} />
          <Avatar merchant={m} size={36} />
          <div className="who">
            <span>Area esercente</span>
            <strong>{m.name}</strong>
          </div>
          <Link to={`/esercente/${m.id}`} title="Vedi la tua pagina pubblica" aria-label="Pagina pubblica">
            <IconStore width={19} height={19} />
          </Link>
          <button
            type="button"
            title="Esci"
            aria-label="Esci"
            onClick={() => {
              logoutMerchant()
              navigate('/login')
            }}
          >
            <IconLogout width={19} height={19} />
          </button>
        </div>
        <nav className="mnav">
          {NAV.filter((n) => !n.plugin || m.plugins.includes(n.plugin)).map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              {n.label}
              {n.badge && badges[n.badge] > 0 && <span className="mnav-badge">{badges[n.badge]}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="msidebar-foot" style={{ display: undefined }}>
        </div>
      </header>
      <main className="mbody">
        <Outlet context={{ merchant: m }} />
      </main>
    </div>
  )
}
