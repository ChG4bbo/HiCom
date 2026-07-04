import { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { addPost, deletePost, getMerchant } from '../../store/store'
import { Sheet } from '../../components/Cards'
import { Img } from '../../components/Img'
import { IconPlus, IconTrash } from '../../components/Icons'
import { timeAgo } from '../../utils'
import { merchantGallery } from './gallery'

export default function Posts() {
  const { merchant } = useOutletContext()
  useStore()
  const m = getMerchant(merchant.id)
  const [params, setParams] = useSearchParams()
  const [open, setOpen] = useState(params.get('nuovo') === '1')
  const [text, setText] = useState('')
  const [img, setImg] = useState(merchantGallery(m)[0])
  const [publishedNow, setPublishedNow] = useState(false)

  const close = () => {
    setOpen(false)
    if (params.get('nuovo')) setParams({}, { replace: true })
  }

  return (
    <>
      <span className="eyebrow">Racconta la tua attività</span>
      <h1>I tuoi post</h1>
      <p className="page-sub">Compaiono nel feed della home e nella tua pagina, come su un social.</p>

      {publishedNow && (
        <div className="demo-hint" style={{ marginTop: 16 }}>
          📣 Post pubblicato! È già nel feed di Orbassano.
        </div>
      )}

      <div className="panel">
        <div className="panel-head">
          <h2>Pubblicati ({m.posts.length})</h2>
          <button type="button" className="btn sm" onClick={() => setOpen(true)}>
            <IconPlus width={15} height={15} /> Nuovo post
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {m.posts.map((p) => (
            <div key={p.id} className="card">
              <div style={{ aspectRatio: '4 / 3', background: 'var(--green-100)' }}>
                <Img src={p.img} alt="" accent={m.accent} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '10px 12px 12px' }}>
                <p style={{ fontSize: '0.83rem', lineHeight: 1.45 }}>{p.text}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>
                    {timeAgo(`${p.date}T12:00:00`)}
                  </span>
                  <button
                    type="button"
                    className="btn danger sm"
                    onClick={() => confirm('Eliminare questo post?') && deletePost(m.id, p.id)}
                    aria-label="Elimina post"
                  >
                    <IconTrash width={14} height={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {m.posts.length === 0 && (
          <div className="empty">
            <div className="big">📸</div>
            Nessun post: racconta cosa succede oggi in negozio.
          </div>
        )}
      </div>

      {open && (
        <Sheet title="Nuovo post" onClose={close}>
          <div className="field">
            <label htmlFor="ps-text">Testo</label>
            <textarea
              id="ps-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Es. Appena sfornata la focaccia del sabato… 🥖"
            />
          </div>
          <div className="field">
            <label>Foto</label>
            <div className="imgpick">
              {merchantGallery(m).map((src) => (
                <button key={src} type="button" className={img === src ? 'sel' : ''} onClick={() => setImg(src)} aria-label="Scegli foto">
                  <Img src={src} alt="" accent={m.accent} />
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="btn block"
            disabled={text.trim().length < 3}
            onClick={() => {
              addPost(m.id, { text: text.trim(), img })
              setText('')
              setPublishedNow(true)
              close()
            }}
          >
            Pubblica nel feed
          </button>
        </Sheet>
      )}
    </>
  )
}
