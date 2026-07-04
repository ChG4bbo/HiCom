/* ============================================================
   HiCom — «backend finto»
   Stato applicativo persistito in localStorage, seminato da
   src/data/seed.js. Ogni mutazione salva e notifica i
   sottoscrittori: le azioni del pannello esercente si
   riflettono subito lato cittadino e viceversa.
   ============================================================ */
import { buildSeed, PLUGINS, BUNDLE, CURATED, BASE_FEE } from '../data/seed'

const KEY = 'hicom-demo'
const SESSION_KEY = 'hicom-session'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.version === buildSeed().version) return parsed
    }
  } catch {
    /* seed pulito in caso di dati corrotti */
  }
  const fresh = buildSeed()
  localStorage.setItem(KEY, JSON.stringify(fresh))
  return fresh
}

let state = load()
const listeners = new Set()

/* sincronizzazione tra schede: la demo può girare in due finestre
   affiancate (cittadino + pannello esercente) sempre allineate */
window.addEventListener('storage', (e) => {
  if (e.key === KEY && e.newValue) {
    try {
      state = JSON.parse(e.newValue)
      listeners.forEach((fn) => fn())
    } catch {
      /* ignora payload non validi */
    }
  }
})

function commit() {
  state = { ...state }
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage pieno o non disponibile: la demo continua in memoria */
  }
  listeners.forEach((fn) => fn())
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function getState() {
  return state
}

export function resetDemo() {
  localStorage.removeItem(KEY)
  localStorage.removeItem(SESSION_KEY)
  state = load()
  listeners.forEach((fn) => fn())
}

/* ---- selettori ---------------------------------------------- */

export function getMerchant(id) {
  return state.merchants.find((m) => m.id === id)
}

export function activeMerchants() {
  return state.merchants.filter((m) => m.active)
}

export function effectivePlugins(m) {
  return m.plugins
}

export function hasPlugin(m, pluginId) {
  return m.active !== false && m.plugins.includes(pluginId)
}

export function merchantMonthlyFee(m) {
  const hasAllBundle = BUNDLE.includes.every((p) => m.plugins.includes(p))
  const bundleApplied = hasAllBundle
  let pluginsFee = 0
  if (bundleApplied) {
    pluginsFee = BUNDLE.price + (m.plugins.includes('vetrinaplus') ? PLUGINS.vetrinaplus.price : 0)
  } else {
    pluginsFee = m.plugins.reduce((sum, p) => sum + (PLUGINS[p]?.price || 0), 0)
  }
  const curatedFee = CURATED[m.curated]?.price || 0
  return { base: BASE_FEE, plugins: pluginsFee, curated: curatedFee, bundleApplied, total: BASE_FEE + pluginsFee + curatedFee }
}

export function allOffers() {
  return activeMerchants().flatMap((m) => m.offers.map((o) => ({ ...o, merchant: m })))
}

export function allPosts() {
  return activeMerchants().flatMap((m) => m.posts.map((p) => ({ ...p, merchant: m })))
}

/* ---- sessione esercente ------------------------------------- */

export function currentMerchantId() {
  return localStorage.getItem(SESSION_KEY)
}

export function loginMerchant(id) {
  localStorage.setItem(SESSION_KEY, id)
  commit()
}

export function logoutMerchant() {
  localStorage.removeItem(SESSION_KEY)
  commit()
}

/* ---- mutazioni: esercente ------------------------------------ */

function patchMerchant(id, patch) {
  state.merchants = state.merchants.map((m) => (m.id === id ? { ...m, ...patch } : m))
  commit()
}

export function updateMerchant(id, patch) {
  patchMerchant(id, patch)
}

export function togglePlugin(id, pluginId) {
  const m = getMerchant(id)
  const plugins = m.plugins.includes(pluginId)
    ? m.plugins.filter((p) => p !== pluginId)
    : [...m.plugins, pluginId]
  patchMerchant(id, { plugins })
}

export function setCurated(id, tier) {
  patchMerchant(id, { curated: tier })
}

export function setMerchantActive(id, active) {
  patchMerchant(id, { active })
}

/* prodotti */
export function addProduct(merchantId, product) {
  const m = getMerchant(merchantId)
  const p = { id: `p-${Date.now()}`, tags: [], ...product }
  patchMerchant(merchantId, { products: [...m.products, p] })
  return p
}

export function updateProduct(merchantId, productId, patch) {
  const m = getMerchant(merchantId)
  patchMerchant(merchantId, {
    products: m.products.map((p) => (p.id === productId ? { ...p, ...patch } : p)),
  })
}

export function deleteProduct(merchantId, productId) {
  const m = getMerchant(merchantId)
  patchMerchant(merchantId, { products: m.products.filter((p) => p.id !== productId) })
}

/* offerte */
export function addOffer(merchantId, offer) {
  const m = getMerchant(merchantId)
  const code =
    offer.code ||
    `${m.name.replace(/[^A-Za-z]/g, '').slice(0, 5).toUpperCase()}${Math.floor(10 + Math.random() * 89)}`
  const o = { id: `of-${Date.now()}`, code, ...offer }
  patchMerchant(merchantId, { offers: [o, ...m.offers] })
  return o
}

export function updateOffer(merchantId, offerId, patch) {
  const m = getMerchant(merchantId)
  patchMerchant(merchantId, {
    offers: m.offers.map((o) => (o.id === offerId ? { ...o, ...patch } : o)),
  })
}

export function deleteOffer(merchantId, offerId) {
  const m = getMerchant(merchantId)
  patchMerchant(merchantId, { offers: m.offers.filter((o) => o.id !== offerId) })
}

/* post */
export function addPost(merchantId, post) {
  const m = getMerchant(merchantId)
  const p = { id: `po-${Date.now()}`, date: new Date().toISOString().slice(0, 10), ...post }
  patchMerchant(merchantId, { posts: [p, ...m.posts] })
  return p
}

export function deletePost(merchantId, postId) {
  const m = getMerchant(merchantId)
  patchMerchant(merchantId, { posts: m.posts.filter((p) => p.id !== postId) })
}

/* ---- prenotazioni -------------------------------------------- */

export function addBooking(booking) {
  const code = `${booking.kind === 'appuntamenti' ? 'APP' : 'TAV'}-${Math.floor(1000 + Math.random() * 8999)}`
  const b = { id: `bk-${Date.now()}`, status: 'in-attesa', code, createdAt: new Date().toISOString(), ...booking }
  state.bookings = [b, ...state.bookings]
  commit()
  return b
}

export function updateBookingStatus(id, status) {
  state.bookings = state.bookings.map((b) => (b.id === id ? { ...b, status } : b))
  commit()
}

export function merchantBookings(merchantId) {
  return state.bookings.filter((b) => b.merchantId === merchantId)
}

/* ---- ordini --------------------------------------------------- */

export const ORDER_FLOW = ['nuovo', 'in-preparazione', 'pronto', 'ritirato']

export function addOrder(order) {
  const code = `RIT-${Math.floor(1000 + Math.random() * 8999)}`
  const o = { id: `or-${Date.now()}`, status: 'nuovo', code, createdAt: new Date().toISOString(), ...order }
  state.orders = [o, ...state.orders]
  commit()
  return o
}

export function updateOrderStatus(id, status) {
  state.orders = state.orders.map((o) => (o.id === id ? { ...o, status } : o))
  commit()
}

export function merchantOrders(merchantId) {
  return state.orders.filter((o) => o.merchantId === merchantId)
}

/* ---- chat ------------------------------------------------------ */

function findOrCreateChat(merchantId) {
  let chat = state.chats.find((c) => c.merchantId === merchantId)
  if (!chat) {
    chat = { id: `ch-${Date.now()}`, merchantId, citizenName: 'Tu', unreadMerchant: 0, unreadCitizen: 0, messages: [] }
    state.chats = [...state.chats, chat]
  }
  return chat
}

const pendingReplies = new Set()

export function sendMessage(merchantId, from, text) {
  const chat = findOrCreateChat(merchantId)
  const msg = { id: `m-${Date.now()}`, from, text, at: new Date().toISOString() }
  const patch = {
    messages: [...chat.messages, msg],
    unreadMerchant: from === 'citizen' ? chat.unreadMerchant + 1 : chat.unreadMerchant,
    unreadCitizen: from === 'merchant' ? chat.unreadCitizen + 1 : chat.unreadCitizen,
  }
  state.chats = state.chats.map((c) => (c.id === chat.id ? { ...c, ...patch } : c))
  commit()

  /* risposta automatica dell'esercente demo */
  if (from === 'citizen' && !pendingReplies.has(merchantId)) {
    pendingReplies.add(merchantId)
    setTimeout(() => {
      state.chats = state.chats.map((c) => (c.merchantId === merchantId ? { ...c, typing: true } : c))
      commit()
    }, 1200)
    setTimeout(() => {
      pendingReplies.delete(merchantId)
      const replies = state.autoReplies[merchantId] || state.autoReplies._default
      const c0 = state.chats.find((c) => c.merchantId === merchantId)
      const replyCount = c0 ? c0.messages.filter((m) => m.from === 'merchant').length : 0
      const reply = replies[replyCount % replies.length]
      const rmsg = { id: `m-${Date.now()}-r`, from: 'merchant', text: reply, at: new Date().toISOString() }
      state.chats = state.chats.map((c) =>
        c.merchantId === merchantId
          ? { ...c, typing: false, messages: [...c.messages, rmsg], unreadCitizen: c.unreadCitizen + 1 }
          : c,
      )
      commit()
    }, 3200 + Math.random() * 1500)
  }
  return msg
}

export function markChatRead(merchantId, side) {
  state.chats = state.chats.map((c) =>
    c.merchantId === merchantId
      ? { ...c, [side === 'citizen' ? 'unreadCitizen' : 'unreadMerchant']: 0 }
      : c,
  )
  commit()
}

export function citizenUnreadTotal() {
  return state.chats.reduce((n, c) => n + c.unreadCitizen, 0)
}

/* ---- Officina Digitale ---------------------------------------- */

export function updateInventory(id, patch) {
  state.inventory = state.inventory.map((i) => (i.id === id ? { ...i, ...patch } : i))
  commit()
}

export function addCrmNote(id, note) {
  state.crmClients = state.crmClients.map((c) => (c.id === id ? { ...c, note } : c))
  commit()
}

/* serie pseudo-casuali ma stabili per grafici (incassi, visite) */
export function seriesFor(seedStr, days, base, spread) {
  let h = 0
  for (const ch of seedStr) h = (h * 31 + ch.charCodeAt(0)) % 997
  const out = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    h = (h * 137 + 71) % 997
    const weekend = d.getDay() === 0 || d.getDay() === 6
    const value = Math.round(base * (weekend ? 1.35 : 1) + ((h / 997) - 0.5) * spread)
    out.push({ date: d.toISOString().slice(0, 10), day: d.toLocaleDateString('it-IT', { weekday: 'short' }), value: Math.max(0, value) })
  }
  return out
}
