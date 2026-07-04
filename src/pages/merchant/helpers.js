export function daysFromNowLocal(n) {
  return new Date(Date.now() + n * 86400000).toISOString().slice(0, 10)
}

export function formatDateShort(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatDateLong(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}
