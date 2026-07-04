import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { sendMessage, markChatRead } from '../../store/store'
import { IconSend } from '../../components/Icons'
import { timeAgo } from '../../utils'
import '../../styles/flows.css'

export default function ChatMerchant() {
  const { merchant: m } = useOutletContext()
  const state = useStore()
  const convos = state.chats.filter((c) => c.merchantId === m.id && c.messages.length > 0)
  const [openId, setOpenId] = useState(convos[0]?.id || null)
  const [text, setText] = useState('')
  const scrollRef = useRef(null)
  const chat = convos.find((c) => c.id === openId) || convos[0]

  useEffect(() => {
    if (chat && chat.unreadMerchant > 0) markChatRead(m.id, 'merchant')
  }, [chat, m.id])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [chat?.messages.length])

  const send = () => {
    const t = text.trim()
    if (!t) return
    sendMessage(m.id, 'merchant', t)
    setText('')
  }

  return (
    <>
      <span className="eyebrow">Plugin Chat cliente · +€4/mese</span>
      <h1>Messaggi dei clienti</h1>
      <p className="page-sub">Rispondi ai cittadini direttamente da qui.</p>

      {convos.length === 0 ? (
        <div className="empty">
          <div className="big">💬</div>
          Nessuna conversazione ancora: i clienti possono scriverti dalla tua pagina.
        </div>
      ) : (
        <div className="mchat">
          <div className="panel" style={{ marginTop: 0, padding: 10 }}>
            {convos.map((c) => {
              const last = c.messages[c.messages.length - 1]
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setOpenId(c.id)}
                  style={{
                    display: 'flex',
                    width: '100%',
                    gap: 10,
                    alignItems: 'center',
                    textAlign: 'left',
                    padding: '10px 10px',
                    borderRadius: 10,
                    background: chat?.id === c.id ? 'var(--green-100)' : 'transparent',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: '0.88rem' }}>Cliente · {c.citizenName === 'Tu' ? 'dall’app' : c.citizenName}</strong>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {last.text}
                    </p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>{timeAgo(last.at)}</span>
                  {c.unreadMerchant > 0 && <span className="mnav-badge">{c.unreadMerchant}</span>}
                </button>
              )
            })}
          </div>

          {chat && (
            <div className="mchat-thread">
              <div className="chat-scroll" ref={scrollRef}>
                {chat.messages.map((msg) => (
                  <div key={msg.id} className={`bubble ${msg.from === 'merchant' ? 'me' : 'them'}`}>
                    {msg.text}
                    <time>{new Date(msg.at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</time>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Rispondi al cliente…"
                  aria-label="Risposta"
                />
                <button type="button" onClick={send} disabled={!text.trim()} aria-label="Invia">
                  <IconSend width={18} height={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
