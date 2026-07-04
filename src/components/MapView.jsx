import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const ORBASSANO_CENTER = [45.0076, 7.5372]

function markerIcon(merchant, emoji) {
  return L.divIcon({
    className: 'hicom-pin-wrap',
    html: `<div class="hicom-pin" style="--pin:${merchant.accent}"><span>${emoji}</span></div>`,
    iconSize: [38, 44],
    iconAnchor: [19, 42],
    popupAnchor: [0, -40],
  })
}

/**
 * Mappa di Orbassano: confine comunale evidenziato e marker
 * degli esercenti filtrati (stile immobiliare.it: i filtri
 * mostrano/nascondono i marker in tempo reale).
 */
export function MapView({ merchants, categories, onSelect, selectedId, className }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef(new Map())
  const boundsRef = useRef(null)
  const fittedRef = useRef(false)

  useEffect(() => {
    if (mapRef.current) return
    const map = L.map(containerRef.current, {
      center: ORBASSANO_CENTER,
      zoom: 15,
      zoomControl: false,
      attributionControl: true,
    })
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map)

    fetch(`${import.meta.env.BASE_URL}geo/orbassano.json`)
      .then((r) => r.json())
      .then((geo) => {
        const boundary = L.geoJSON(geo, {
          style: {
            color: '#0F8E77',
            weight: 2.5,
            dashArray: '7 7',
            fillColor: '#8EB69B',
            fillOpacity: 0.07,
          },
        }).addTo(map)
        boundsRef.current = boundary.getBounds()
        map.setMaxBounds(boundsRef.current.pad(0.6))
        if (containerRef.current?.clientHeight > 0) {
          map.fitBounds(boundsRef.current.pad(0.04))
          fittedRef.current = true
        }
      })
      .catch(() => {
        /* senza confine la mappa resta comunque utilizzabile */
      })

    /* il contenitore può nascere nascosto (toggle lista/mappa):
       quando prende dimensione, ricalcola e ri-inquadra */
    const ro = new ResizeObserver(() => {
      if (!mapRef.current) return
      if (containerRef.current?.clientHeight > 0) {
        mapRef.current.invalidateSize()
        if (!fittedRef.current && boundsRef.current) {
          mapRef.current.fitBounds(boundsRef.current.pad(0.04))
          fittedRef.current = true
        }
      }
    })
    ro.observe(containerRef.current)

    mapRef.current = map
    return () => {
      ro.disconnect()
      map.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
  }, [])

  /* sincronizza i marker con la lista filtrata */
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const current = markersRef.current
    const wanted = new Set(merchants.map((m) => m.id))

    for (const [id, marker] of current) {
      if (!wanted.has(id)) {
        marker.remove()
        current.delete(id)
      }
    }

    merchants.forEach((m) => {
      if (current.has(m.id)) return
      const emoji = categories.find((c) => c.id === m.category)?.emoji || '🏪'
      const marker = L.marker([m.lat, m.lng], { icon: markerIcon(m, emoji), title: m.name })
      marker.on('click', () => onSelect?.(m))
      marker.addTo(map)
      current.set(m.id, marker)
    })
  }, [merchants, categories, onSelect])

  /* evidenzia il marker selezionato */
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement()
      if (el) el.classList.toggle('selected', id === selectedId)
    })
    if (selectedId) {
      const marker = markersRef.current.get(selectedId)
      if (marker) map.panTo(marker.getLatLng(), { animate: true })
    }
  }, [selectedId])

  return <div ref={containerRef} className={className} />
}
