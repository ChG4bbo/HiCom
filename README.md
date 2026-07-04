# HiCom

Piattaforma commerciale pensata per esercenti e cittadini — prototipo
dimostrativo della **rete del commercio locale di Orbassano**: PWA installabile
+ portale web, lato cittadino, area esercente e pannello di amministrazione.
Tutti i dati sono fittizi e vivono nel browser (localStorage) — nessun backend.

**Demo:** https://chg4bbo.github.io/HiCom/

## Cosa mostra

- **Cittadino** — home con slideshow, offerte a coupon con codice da mostrare in
  cassa, feed dei post degli esercenti, ricerca con filtri e mappa di Orbassano
  (confine comunale reale da OpenStreetMap), pagina vetrina per ogni attività,
  prenotazione tavoli/appuntamenti, ordina & ritira, chat con risposte automatiche.
- **Esercente** (`Area esercente`, credenziali demo `demo@hicom.it` / `demo` o
  selettore «entra come…») — dashboard, gestione vetrina/prodotti/offerte/post,
  agenda prenotazioni, coda ordini, chat, pagina Abbonamento & plugin con i prezzi
  reali del progetto (base €12, Prenotazioni +€6, Ritiri & Ordini +€5, Chat +€4,
  Vetrina+ +€3, bundle settore €10, Vetrina Curata Plus/Pro) e gli strumenti
  «Officina Digitale» (magazzino, incassi, mini-CRM, statistiche).
- **Amministrazione** (`/#/admin`) — esercenti, canoni, MRR, sospensione.

Ogni azione si riflette in tempo reale tra le viste (anche tra due schede
affiancate). Il pulsante «Reset demo» nel footer riporta i dati iniziali.

## Sviluppo

```bash
npm install
npm run dev       # sviluppo su http://localhost:5173
npm run build     # build di produzione in dist/
npm run preview   # anteprima della build
```

Stack: Vite + React, React Router (hash), Leaflet + OpenStreetMap,
vite-plugin-pwa (Workbox). Font: Cantarell + JetBrains Mono. Deploy automatico
su GitHub Pages ad ogni push su `main`.

---

Un progetto di **Gabriele Chibbaro** · prototipo riservato, dati dimostrativi.
