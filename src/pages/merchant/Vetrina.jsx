import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { updateMerchant, addProduct, updateProduct, deleteProduct, getMerchant } from '../../store/store'
import { Sheet } from '../../components/Cards'
import { Img } from '../../components/Img'
import { IconEdit, IconTrash, IconPlus } from '../../components/Icons'
import { formatPrice } from '../../utils'
import { merchantGallery } from './gallery'

const DAYS = [
  ['lun', 'Lunedì'],
  ['mar', 'Martedì'],
  ['mer', 'Mercoledì'],
  ['gio', 'Giovedì'],
  ['ven', 'Venerdì'],
  ['sab', 'Sabato'],
  ['dom', 'Domenica'],
]

function ImagePicker({ gallery, value, onChange, accent }) {
  return (
    <div className="field">
      <label>Foto (galleria della demo)</label>
      <div className="imgpick">
        {gallery.map((src) => (
          <button
            key={src}
            type="button"
            className={value === src ? 'sel' : ''}
            onClick={() => onChange(src)}
            aria-label="Scegli foto"
          >
            <Img src={src} alt="" accent={accent} />
          </button>
        ))}
      </div>
    </div>
  )
}

function ProductSheet({ merchant, product, onClose }) {
  const editing = Boolean(product?.id)
  const [form, setForm] = useState(
    product || { name: '', price: '', unit: '', tags: [], desc: '', img: merchantGallery(merchant)[0], orderable: false },
  )
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const canSave = form.name.trim().length > 1

  return (
    <Sheet title={editing ? 'Modifica prodotto' : 'Nuovo prodotto o servizio'} onClose={onClose}>
      <div className="field">
        <label htmlFor="pr-name">Nome</label>
        <input id="pr-name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Es. Focaccia all'olio" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="field">
          <label htmlFor="pr-price">Prezzo (€)</label>
          <input
            id="pr-price"
            type="number"
            step="0.1"
            min="0"
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            placeholder="12"
          />
        </div>
        <div className="field">
          <label htmlFor="pr-unit">Unità (facolt.)</label>
          <input id="pr-unit" value={form.unit || ''} onChange={(e) => set('unit', e.target.value)} placeholder="al kg" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="pr-tags">Etichette (separate da virgola)</label>
        <input
          id="pr-tags"
          value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags}
          onChange={(e) => set('tags', e.target.value)}
          placeholder="Artigianale, Novità"
        />
      </div>
      <div className="field">
        <label htmlFor="pr-desc">Breve descrizione</label>
        <textarea id="pr-desc" value={form.desc} onChange={(e) => set('desc', e.target.value)} />
      </div>
      {merchant.plugins.includes('ordini') && (
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontSize: '0.88rem', cursor: 'pointer' }}>
          <span
            className={`switch${form.orderable ? ' on' : ''}`}
            onClick={() => set('orderable', !form.orderable)}
            role="checkbox"
            aria-checked={form.orderable}
          />
          Ordinabile online (Ritiri & Ordini)
        </label>
      )}
      <ImagePicker gallery={merchantGallery(merchant)} value={form.img} onChange={(v) => set('img', v)} accent={merchant.accent} />
      <button
        type="button"
        className="btn block"
        disabled={!canSave}
        onClick={() => {
          const tags = (Array.isArray(form.tags) ? form.tags.join(',') : form.tags)
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
          const payload = {
            name: form.name.trim(),
            price: Number(form.price) || 0,
            unit: form.unit?.trim() || undefined,
            tags,
            desc: form.desc.trim(),
            img: form.img,
            orderable: form.orderable,
          }
          if (editing) updateProduct(merchant.id, product.id, payload)
          else addProduct(merchant.id, payload)
          onClose()
        }}
      >
        {editing ? 'Salva modifiche' : 'Aggiungi alla vetrina'}
      </button>
    </Sheet>
  )
}

export default function Vetrina() {
  const { merchant } = useOutletContext()
  useStore()
  const m = getMerchant(merchant.id)
  const [info, setInfo] = useState({ tagline: m.tagline, description: m.description, phone: m.phone })
  const [hours, setHours] = useState({ ...m.hours })
  const [saved, setSaved] = useState(false)
  const [sheet, setSheet] = useState(null) // null | 'new' | product

  const save = () => {
    updateMerchant(m.id, { ...info, hours })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <>
      <span className="eyebrow">La tua pagina pubblica</span>
      <h1>Vetrina</h1>
      <p className="page-sub">Quello che scrivi qui è subito visibile ai cittadini.</p>

      <div className="panel">
        <div className="panel-head">
          <h2>La tua attività</h2>
        </div>
        <div className="field">
          <label htmlFor="vt-tag">Sottotitolo</label>
          <input id="vt-tag" value={info.tagline} onChange={(e) => setInfo({ ...info, tagline: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="vt-desc">Descrizione</label>
          <textarea id="vt-desc" value={info.description} onChange={(e) => setInfo({ ...info, description: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="vt-phone">Telefono</label>
          <input id="vt-phone" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0 16px' }}>
          {DAYS.map(([k, label]) => (
            <div className="field" key={k}>
              <label htmlFor={`h-${k}`}>{label}</label>
              <input id={`h-${k}`} value={hours[k]} onChange={(e) => setHours({ ...hours, [k]: e.target.value })} />
            </div>
          ))}
        </div>
        <button type="button" className="btn" onClick={save}>
          {saved ? '✓ Salvato — già online' : 'Salva le modifiche'}
        </button>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Prodotti e servizi ({m.products.length})</h2>
          <button type="button" className="btn sm" onClick={() => setSheet('new')}>
            <IconPlus width={15} height={15} /> Aggiungi
          </button>
        </div>
        {m.products.map((p) => (
          <div key={p.id} className="mrow">
            <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: 'var(--green-100)' }}>
              <Img src={p.img} alt="" accent={m.accent} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="r-main">
              <h3>{p.name}</h3>
              <p className="r-sub">
                {formatPrice(p)} {p.unit || ''}
                {p.orderable ? ' · ordinabile online' : ''}
              </p>
            </div>
            <div className="r-actions">
              <button type="button" className="btn ghost sm" onClick={() => setSheet(p)} aria-label={`Modifica ${p.name}`}>
                <IconEdit width={15} height={15} />
              </button>
              <button
                type="button"
                className="btn danger sm"
                onClick={() => confirm(`Rimuovere «${p.name}» dalla vetrina?`) && deleteProduct(m.id, p.id)}
                aria-label={`Elimina ${p.name}`}
              >
                <IconTrash width={15} height={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {sheet && (
        <ProductSheet merchant={m} product={sheet === 'new' ? null : sheet} onClose={() => setSheet(null)} />
      )}
    </>
  )
}
