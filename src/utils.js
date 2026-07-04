/* ---- utility condivise ---------------------------------------- */

export function formatPrice(product) {
  if (product.priceLabel) return product.priceLabel
  return `€${product.price.toLocaleString('it-IT', { minimumFractionDigits: product.price % 1 ? 2 : 0 })}`
}

export function euro(n) {
  return `€${n.toLocaleString('it-IT')}`
}

const DAY_KEYS = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab']

export function todayKey() {
  return DAY_KEYS[new Date().getDay()]
}

/** true / false / null (non determinabile, es. «Su appuntamento») */
export function isOpenNow(merchant) {
  const spec = merchant.hours?.[todayKey()]
  if (!spec) return null
  if (/chiuso/i.test(spec)) return false
  const ranges = [...spec.matchAll(/(\d{1,2}):(\d{2})[–-](\d{1,2}):(\d{2})/g)]
  if (ranges.length === 0) return null
  const now = new Date()
  const mins = now.getHours() * 60 + now.getMinutes()
  return ranges.some((r) => {
    const start = +r[1] * 60 + +r[2]
    let end = +r[3] * 60 + +r[4]
    if (end <= start) end += 24 * 60
    return mins >= start && mins <= end
  })
}

export function initials(name) {
  return name
    .split(/\s+/)
    .filter((w) => w[0] === w[0]?.toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || name.slice(0, 2).toUpperCase()
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'ora'
  if (mins < 60) return `${mins} min fa`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} h fa`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'ieri'
  if (days < 7) return `${days} giorni fa`
  return new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })
}

export function formatDateShort(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

/** Mischia stabile per sessione (il feed non «salta» a ogni render) */
export function shuffleSeeded(arr, seed = sessionSeed()) {
  const out = [...arr]
  let h = seed
  for (let i = out.length - 1; i > 0; i--) {
    h = (h * 9301 + 49297) % 233280
    const j = Math.floor((h / 233280) * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

let _seed = null
function sessionSeed() {
  if (_seed === null) {
    _seed = Number(sessionStorage.getItem('hicom-feed-seed')) || Math.floor(Math.random() * 100000)
    sessionStorage.setItem('hicom-feed-seed', String(_seed))
  }
  return _seed
}
