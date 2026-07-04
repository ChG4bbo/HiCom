/** Immagini disponibili per l'esercente (galleria preset della demo). */
export function merchantGallery(m) {
  const set = new Set()
  if (m.cover) set.add(m.cover)
  m.products.forEach((p) => p.img && set.add(p.img))
  m.posts.forEach((p) => p.img && set.add(p.img))
  return [...set]
}
