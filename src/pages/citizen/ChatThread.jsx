import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { getMerchant, hasPlugin, sendMessage, markChatRead } from '../../store/store'
import { Avatar } from '../../components/Cards'
import { IconArrowLeft, IconSend } from '../../components/Icons'
import '../../styles/flows.css'

export default function ChatThread() {
  const { merchantId } = useParams()
  const state = useStore()
  const [text, setText] = useState('')
  const scrollRef = useRef(null)
  const m = getMerchant(merchantId)
  const chat = state.chats.find((c) => c.merchantId === merchantId)
  const messages = chat?.messages || []

  /* segna come letti i messaggi dell'esercente */
  useEffect(() => {
    if (chat && chat.unreadCitizen > 0) markChatRead(merchantId, 'citizen')
  }, [chat, merchantId])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length, chat?.typing])

  if (!m || (!hasPlugin(m, 'chat') && messages.length === 0)) {
    return (
      <div className="container section empty">
        <div className="big">💬</div>
        Questo esercente non ha la chat attiva.
      </div>
    )
  }

  const send = () => {
    const t = text.trim()
    if (!t) return
    sendMessage(m.id, 'citizen', t)
    setText('')
  }

  return (
    <div className="chat-page">
      <div className="chat-head">
        <Link to="/chat" aria-label="Torna alle chat" style={{ color: 'var(--green-950)' }}>
          <IconArrowLeft width={20} height={20} />
        </Link>
        <Link to={`/esercente/${m.id}`}>
          <Avatar merchant={m} size={40} />
        </Link>
        <div>
          <h1>{m.name}</h1>
          <p>{chat?.typing ? 'sta scrivendo…' : 'di solito risponde in giornata'}</p>
        </div>
      </div>

      <div className="chat-scroll" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="empty" style={{ padding: '30px 10px' }}>
            <div className="big">👋</div>
            Scrivi a {m.name}: chiedi disponibilità, orari o un consiglio.
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`bubble ${msg.from === 'citizen' ? 'me' : 'them'}`}>
            {msg.text}
            <time>{new Date(msg.at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</time>
          </div>
        ))}
        {chat?.typing && (
          <div className="typing" aria-label="L'esercente sta scrivendo">
            <i /><i /><i />
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Scrivi un messaggio…"
          aria-label="Messaggio"
        />
        <button type="button" onClick={send} disabled={!text.trim()} aria-label="Invia">
          <IconSend width={18} height={18} />
        </button>
      </div>
    </div>
  )
}
