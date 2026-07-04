import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { allOffers, allPosts, activeMerchants } from '../../store/store'
import { CATEGORIES } from '../../data/seed'
import { OfferCoupon, PostCard, MerchantCard, SectionHead } from '../../components/Cards'
import { Img } from '../../components/Img'
import { IconSearch } from '../../components/Icons'
import { shuffleSeeded } from '../../utils'
import '../../styles/home.css'

function HeroCarousel({ slides }) {
  const railRef = useRef(null)
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const pauseRef = useRef(false)

  /* auto-avanzamento, in pausa quando l'utente tocca */
  useEffect(() => {
    const id = setInterval(() => {
      if (pauseRef.current) return
      const rail = railRef.current
      if (!rail) return
      const next = (Math.round(rail.scrollLeft / rail.clientWidth) + 1) % slides.length
      const slide = rail.children[next]
      rail.scrollTo({ left: slide.offsetLeft - (rail.clientWidth - slide.clientWidth) / 2, behavior: 'smooth' })
    }, 5000)
    return () => clearInterval(id)
  }, [slides.length])

  const onScroll = () => {
    const rail = railRef.current
    if (!rail) return
    const mid = rail.scrollLeft + rail.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    Array.from(rail.children).forEach((el, i) => {
      const center = el.offsetLeft + el.clientWidth / 2
      const dist = Math.abs(center - mid)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setIndex(best)
  }

  return (
    <>
      <div
        className="hero-rail"
        ref={railRef}
        onScroll={onScroll}
        onPointerDown={() => (pauseRef.current = true)}
        onPointerUp={() => setTimeout(() => (pauseRef.current = false), 6000)}
      >
        {slides.map((s) => (
          <div key={s.id} className="hero-slide">
            <Img src={s.img} alt="" accent="#235347" className="ph" />
            <div className="hero-slide-content">
              <span className="eyebrow">{s.eyebrow}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <button type="button" className="btn sm" onClick={() => navigate(s.cta.to)}>
                {s.cta.label}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Slide ${i + 1}`}
            className={i === index ? 'active' : ''}
            onClick={() => {
              const rail = railRef.current
              const slide = rail.children[i]
              rail.scrollTo({ left: slide.offsetLeft - (rail.clientWidth - slide.clientWidth) / 2, behavior: 'smooth' })
            }}
          />
        ))}
      </div>
    </>
  )
}

export default function Home() {
  const state = useStore()
  const offers = allOffers()
  const posts = allPosts().sort((a, b) => (a.date < b.date ? 1 : -1))
  const merchants = activeMerchants()

  /* feed: post mescolati + card «scopri» ogni 3 elementi */
  const feedPosts = shuffleSeeded(posts)
  const feedMerchants = shuffleSeeded(merchants).filter(
    (m, i, arr) => arr.findIndex((x) => x.id === m.id) === i,
  )
  const feed = []
  let mi = 0
  feedPosts.forEach((p, i) => {
    feed.push({ type: 'post', item: p, key: p.id + p.merchant.id })
    if ((i + 1) % 3 === 0 && mi < feedMerchants.length) {
      feed.push({ type: 'merchant', item: feedMerchants[mi], key: `disc-${feedMerchants[mi].id}` })
      mi++
    }
  })

  return (
    <>
      <section className="hero">
        <div className="hero-greeting">
          <span className="eyebrow">Orbassano · la rete del commercio locale</span>
          <h1>Cosa offre il paese, oggi</h1>
        </div>
        <HeroCarousel slides={state.heroSlides} />
      </section>

      <div className="searchbar">
        <Link to="/esplora">
          <IconSearch width={18} height={18} />
          Cerca negozi, servizi, offerte…
        </Link>
      </div>

      <section className="section" aria-label="Categorie">
        <div className="cat-rail">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/esplora?cat=${c.id}`} className="cat-item">
              <span className="cat-ico">{c.emoji}</span>
              <span className="lbl">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Da usare in cassa" title="Offerte del momento" to="/offerte" />
        <div className="rail offers-rail" style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          {offers.map((o) => (
            <OfferCoupon key={o.id} offer={o} style={{ width: 272 }} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Novità dagli esercenti" title="Appena pubblicati" />
        <div className="rail news-rail" style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          {posts.slice(0, 8).map((p) => (
            <PostCard key={`${p.merchant.id}-${p.id}`} post={p} style={{ width: 272 }} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Dal territorio" title="Il feed di Orbassano" />
        <div className="feed">
          {feed.map((f) =>
            f.type === 'post' ? (
              <PostCard key={f.key} post={f.item} />
            ) : (
              <div key={f.key} className="feed-discover">
                <span className="eyebrow">Scopri un esercente</span>
                <MerchantCard merchant={f.item} />
              </div>
            ),
          )}
        </div>
      </section>
    </>
  )
}
