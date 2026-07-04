import { Link } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { getMerchant, activeMerchants } from '../../store/store'
import { Avatar, SectionHead } from '../../components/Cards'
import { timeAgo } from '../../utils'
import '../../styles/flows.css'

export default function ChatList() {
  const state = useStore()
  const convos = state.chats
    .map((c) => ({ ...c, merchant: getMerchant(c.merchantId) }))
    .filter((c) => c.merchant && c.merchant.active && c.messages.length > 0)
    .sort((a, b) => {
      const la = a.messages[a.messages.length - 1]?.at || ''
      const lb = b.messages[b.messages.length - 1]?.at || ''
      return la < lb ? 1 : -1
    })

  const chattable = activeMerchants().filter(
    (m) => m.plugins.includes('chat') && !convos.some((c) => c.merchantId === m.id),
  )

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '18px var(--gutter, 20px) 30px' }}>
      <span className="eyebrow">Filo diretto con i negozi</span>
      <h1 style={{ fontSize: '1.4rem', margin: '4px 0 18px' }}>Le tue chat</h1>

      {convos.map((c) => {
        const last = c.messages[c.messages.length - 1]
        return (
          <Link key={c.id} to={`/chat/${c.merchantId}`} className="convo">
            <Avatar merchant={c.merchant} size={46} />
            <div className="c-body">
              <h3>{c.merchant.name}</h3>
              <p>
                {last.from === 'citizen' ? 'Tu: ' : ''}
                {last.text}
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>
                {timeAgo(last.at)}
              </div>
              {c.unreadCitizen > 0 && <span className="c-unread" style={{ marginTop: 4, display: 'inline-grid' }}>{c.unreadCitizen}</span>}
            </div>
          </Link>
        )
      })}

      {convos.length === 0 && (
        <div className="empty">
          <div className="big">💬</div>
          Nessuna conversazione, per ora. Scrivi a un esercente qui sotto!
        </div>
      )}

      {chattable.length > 0 && (
        <>
          <div style={{ marginTop: 26, marginBottom: 12 }}>
            <span className="eyebrow">Rispondono in chat</span>
            <h2 style={{ fontSize: '1.1rem', marginTop: 3 }}>Inizia una conversazione</h2>
          </div>
          {chattable.map((m) => (
            <Link key={m.id} to={`/chat/${m.id}`} className="convo">
              <Avatar merchant={m} size={46} />
              <div className="c-body">
                <h3>{m.name}</h3>
                <p>{m.tagline}</p>
              </div>
              <span className="badge">Chat</span>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}
