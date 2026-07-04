import { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { addOffer, deleteOffer, getMerchant } from '../../store/store'
import { Sheet } from '../../components/Cards'
import { Img } from '../../components/Img'
import { IconPlus, IconTrash } from '../../components/Icons'
import { formatDateShort, daysFromNowLocal } from './helpers'
import { merchantGallery } from './gallery'

function OfferSheet({ merchant, onClose, onCreated }) {
  const [form, setForm] = useState({
    title: '',
    desc: '',
    discount: '',
    validUntil: daysFromNowLocal(14),
    img: merchantGallery(merchant)[0],
  })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const canSave = form.title.trim().length > 3 && form.discount.trim().length > 0

  return (
    <Sheet title="Nuova offerta" onClose={onClose}>
      <div className="field">
        <label htmlFor="of-title">Titolo</label>
        <input id="of-title" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Es. Weekend: focaccia −20%" />
      </div>
      <div className="field">
        <label htmlFor="of-desc">Descrizione</label>
        <textarea id="of-desc" value={form.desc} onChange={(e) => set('desc', e.target.value)} placeholder="Come funziona, quando vale…" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="field">
          <label htmlFor="of-disc">Sconto (etichetta)</label>
          <input id="of-disc" value={form.discount} onChange={(e) => set('discount', e.target.value)} placeholder="−20% · 3×2 · €5" />
        </div>
        <div className="field">
          <label htmlFor="of-until">Valida fino al</label>
          <input id="of-until" type="date" value={form.validUntil} onChange={(e) => set('validUntil', e.target.value)} />
        </div>
      </div>
      <ImageChoice merchant={merchant} value={form.img} onChange={(v) => set('img', v)} />
      <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '0 0 14px' }}>
        Il codice sconto viene generato automaticamente: il cittadino lo mostra in cassa.
      </p>
      <button
        type="button"
        className="btn block"
        disabled={!canSave}
        onClick={() => {
          const o = addOffer(merchant.id, {
            title: form.title.trim(),
            desc: form.desc.trim(),
            discount: form.discount.trim(),
            validUntil: form.validUntil,
            img: form.img,
          })
          onCreated(o)
          onClose()
        }}
      >
        Pubblica l'offerta
      </button>
    </Sheet>
  )
}

function ImageChoice({ merchant, value, onChange }) {
  return (
    <div className="field">
      <label>Foto</label>
      <div className="imgpick">
        {merchantGallery(merchant).map((src) => (
          <button key={src} type="button" className={value === src ? 'sel' : ''} onClick={() => onChange(src)} aria-label="Scegli foto">
            <Img src={src} alt="" accent={merchant.accent} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function OfferteMerchant() {
  const { merchant } = useOutletContext()
  useStore()
  const m = getMerchant(merchant.id)
  const [params, setParams] = useSearchParams()
  const [open, setOpen] = useState(params.get('nuova') === '1')
  const [published, setPublished] = useState(null)

  const close = () => {
    setOpen(false)
    if (params.get('nuova')) setParams({}, { replace: true })
  }

  return (
    <>
      <span className="eyebrow">Promozioni con codice in cassa</span>
      <h1>Le tue offerte</h1>
      <p className="page-sub">Appena pubblicate compaiono in home e nella tua pagina.</p>

      {published && (
        <div className="demo-hint" style={{ marginTop: 16 }}>
          🎉 Offerta pubblicata con codice <code>{published.code}</code> — è già visibile ai cittadini
          in Home e nella sezione Offerte.
        </div>
      )}

      <div className="panel">
        <div className="panel-head">
          <h2>Attive ({m.offers.length})</h2>
          <button type="button" className="btn sm" onClick={() => setOpen(true)}>
            <IconPlus width={15} height={15} /> Nuova offerta
          </button>
        </div>
        {m.offers.map((o) => (
          <div key={o.id} className="mrow">
            <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: 'var(--green-100)' }}>
              <Img src={o.img} alt="" accent={m.accent} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="r-main">
              <h3>{o.title}</h3>
              <p className="r-sub">
                Codice <span className="mono" style={{ fontWeight: 700 }}>{o.code}</span> · fino a {formatDateShort(o.validUntil)}
              </p>
            </div>
            <span className="badge">{o.discount}</span>
            <button
              type="button"
              className="btn danger sm"
              onClick={() => confirm(`Ritirare l'offerta «${o.title}»?`) && deleteOffer(m.id, o.id)}
              aria-label={`Elimina ${o.title}`}
            >
              <IconTrash width={15} height={15} />
            </button>
          </div>
        ))}
        {m.offers.length === 0 && (
          <div className="empty">
            <div className="big">🎟️</div>
            Nessuna offerta attiva: pubblicane una per farti notare in home.
          </div>
        )}
      </div>

      {open && (
        <OfferSheet
          merchant={m}
          onClose={close}
          onCreated={(o) => setPublished(o)}
        />
      )}
    </>
  )
}
