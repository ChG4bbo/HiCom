/* ============================================================
   HiCom — dati demo
   11 esercenti fittizi di Orbassano che coprono tutte le
   configurazioni: canone base, plugin singoli, bundle settore,
   Vetrina Curata e strumenti Officina Digitale.
   ============================================================ */

export const CATEGORIES = [
  { id: 'ristorazione', label: 'Ristorazione', emoji: '🍕' },
  { id: 'bar', label: 'Bar & Caffè', emoji: '☕' },
  { id: 'alimentari', label: 'Alimentari', emoji: '🥖' },
  { id: 'bellezza', label: 'Bellezza & Cura', emoji: '💈' },
  { id: 'salute', label: 'Salute', emoji: '💊' },
  { id: 'servizi', label: 'Servizi & Studi', emoji: '📐' },
  { id: 'artigiani', label: 'Artigiani & Casa', emoji: '🔧' },
  { id: 'negozi', label: 'Negozi', emoji: '🛍️' },
]

export const PLUGINS = {
  prenotazioni: {
    id: 'prenotazioni',
    label: 'Prenotazioni',
    price: 6,
    desc: 'Tavoli e appuntamenti prenotabili dai cittadini, con agenda nel pannello.',
  },
  ordini: {
    id: 'ordini',
    label: 'Ritiri & Ordini',
    price: 5,
    desc: 'I clienti ordinano in anticipo e ritirano in negozio senza coda.',
  },
  chat: {
    id: 'chat',
    label: 'Chat cliente',
    price: 4,
    desc: 'Canale diretto con i clienti, dentro HiCom.',
  },
  vetrinaplus: {
    id: 'vetrinaplus',
    label: 'Vetrina+',
    price: 3,
    desc: 'Galleria foto estesa e prodotti in evidenza nella tua pagina.',
  },
}

export const BUNDLE = {
  id: 'bundle',
  label: 'Bundle settore',
  price: 10,
  includes: ['prenotazioni', 'ordini', 'chat'],
  desc: 'Prenotazioni + Ritiri & Ordini + Chat a prezzo ridotto.',
}

export const CURATED = {
  none: { id: 'none', label: 'Base — fai da te', price: 0 },
  plus: { id: 'plus', label: 'Vetrina Curata · Plus', price: 30 },
  pro: { id: 'pro', label: 'Vetrina Curata · Pro', price: 80 },
}

export const BASE_FEE = 12

export const TOOLS = {
  magazzino: {
    id: 'magazzino',
    label: 'Gestore magazzino',
    desc: 'Giacenze, soglie di riordino e avvisi scorte basse.',
    icon: '📦',
  },
  incassi: {
    id: 'incassi',
    label: 'Registro incassi',
    desc: 'Entrate giornaliere e andamento settimanale, senza fogli di calcolo.',
    icon: '🧾',
  },
  crm: {
    id: 'crm',
    label: 'Mini-CRM clienti',
    desc: 'Rubrica clienti con storico appuntamenti e note.',
    icon: '👥',
  },
  statistiche: {
    id: 'statistiche',
    label: 'Statistiche vetrina',
    desc: 'Visite alla pagina, click sulle offerte e andamento settimanale.',
    icon: '📈',
  },
}

/* ---- helper date dinamiche: la demo è sempre «di oggi» ---- */
const DAY = 86400000
export const daysFromNow = (n) => new Date(Date.now() + n * DAY).toISOString().slice(0, 10)
const todayAt = (h, m = 0) => {
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d.toISOString()
}

const HOURS_SHOP = {
  lun: '08:30–12:30 · 15:30–19:30',
  mar: '08:30–12:30 · 15:30–19:30',
  mer: '08:30–12:30 · 15:30–19:30',
  gio: '08:30–12:30 · 15:30–19:30',
  ven: '08:30–12:30 · 15:30–19:30',
  sab: '08:30–12:30',
  dom: 'Chiuso',
}

/* ============================================================
   ESERCENTI
   ============================================================ */
export function buildMerchants() {
  return [
    {
      id: 'panetteria-del-borgo',
      name: 'Panetteria del Borgo',
      category: 'alimentari',
      tagline: 'Forno a legna dal 1962',
      description:
        'Pane a lievitazione naturale, focacce e dolci della tradizione piemontese, sfornati ogni mattina. Su HiCom puoi ordinare e ritirare senza coda.',
      address: 'Via Roma 24, Orbassano',
      lat: 45.0079,
      lng: 7.5368,
      phone: '011 901 2201',
      hours: { ...HOURS_SHOP, lun: '07:00–13:00 · 16:00–19:00', mar: '07:00–13:00 · 16:00–19:00', mer: '07:00–13:00 · 16:00–19:00', gio: '07:00–13:00 · 16:00–19:00', ven: '07:00–13:00 · 16:00–19:00', sab: '07:00–13:00' },
      plugins: ['ordini'],
      bundle: false,
      curated: 'none',
      tools: ['incassi'],
      active: true,
      accent: '#C69A5B',
      cover: 'img/m/panetteria-del-borgo/cover.webp',
      products: [
        { id: 'pb1', name: 'Pane di grano duro', price: 4.2, unit: 'al kg', tags: ['Lievito madre'], desc: 'Impasto a lunga lievitazione, crosta croccante e mollica profumata.', img: 'img/m/panetteria-del-borgo/p1.webp', orderable: true },
        { id: 'pb2', name: 'Focaccia all’olio', price: 12, unit: 'al kg', tags: ['Da forno'], desc: 'Alta e soffice, con olio extravergine ligure.', img: 'img/m/panetteria-del-borgo/p2.webp', orderable: true },
        { id: 'pb3', name: 'Grissini stirati a mano', price: 16, unit: 'al kg', tags: ['Artigianali'], desc: 'La tradizione torinese, tirati uno a uno.', img: 'img/m/panetteria-del-borgo/p3.webp', orderable: true },
        { id: 'pb4', name: 'Torta di nocciole', price: 18, unit: 'intera', tags: ['Piemonte', 'Senza farina'], desc: 'Con nocciola Piemonte IGP, perfetta con lo zabaione.', img: 'img/m/panetteria-del-borgo/p4.webp', orderable: true },
        { id: 'pb5', name: 'Biscotti di meliga', price: 14, unit: 'al kg', tags: ['Tradizione'], desc: 'Farina di mais macinata a pietra.', img: 'img/m/panetteria-del-borgo/p5.webp', orderable: true },
        { id: 'pb6', name: 'Pizza al padellino', price: 3.5, unit: 'a trancio', tags: ['Da forno'], desc: 'Trancio soffice, pomodoro e fior di latte.', img: 'img/m/panetteria-del-borgo/p6.webp', orderable: true },
      ],
      offers: [
        { id: 'of-pb1', title: 'Dalle 17: −30% sul pane del giorno', desc: 'Ogni sera, il pane sfornato al mattino a prezzo ridotto. Contro lo spreco, per il quartiere.', discount: '−30%', code: 'PANE30', validUntil: daysFromNow(20), img: 'img/m/panetteria-del-borgo/p1.webp' },
        { id: 'of-pb2', title: '3×2 sui grissini stirati', desc: 'Tre confezioni al prezzo di due, tutta la settimana.', discount: '3×2', code: 'GRISS3X2', validUntil: daysFromNow(12), img: 'img/m/panetteria-del-borgo/p3.webp' },
      ],
      posts: [
        { id: 'po-pb1', img: 'img/m/panetteria-del-borgo/post1.webp', text: 'Il profumo delle 7 del mattino: prima infornata del giorno. 🥖', date: daysFromNow(-1) },
        { id: 'po-pb2', img: 'img/m/panetteria-del-borgo/p4.webp', text: 'Torna la torta di nocciole della domenica — prenotala entro sabato!', date: daysFromNow(-3) },
      ],
    },

    {
      id: 'pizzeria-la-torre',
      name: 'Pizzeria La Torre',
      category: 'ristorazione',
      tagline: 'Forno a legna in piazza',
      description:
        'Impasto 48 ore, pomodoro San Marzano e vista sul campanile. Prenota il tavolo o ordina da asporto direttamente da HiCom.',
      address: 'Piazza Umberto I 3, Orbassano',
      lat: 45.0072,
      lng: 7.5359,
      phone: '011 901 3342',
      hours: { lun: 'Chiuso', mar: '18:30–23:30', mer: '18:30–23:30', gio: '18:30–23:30', ven: '18:30–24:00', sab: '12:00–14:30 · 18:30–24:00', dom: '12:00–14:30 · 18:30–23:30' },
      plugins: ['prenotazioni', 'ordini', 'chat'],
      bundle: true,
      curated: 'none',
      tools: [],
      active: true,
      accent: '#C0483A',
      cover: 'img/m/pizzeria-la-torre/cover.webp',
      booking: { type: 'tavoli', slots: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'], maxParty: 10 },
      products: [
        { id: 'pt1', name: 'Margherita', price: 6.5, tags: ['Classica'], desc: 'San Marzano, fior di latte, basilico.', img: 'img/m/pizzeria-la-torre/p1.webp', orderable: true },
        { id: 'pt2', name: 'Marinara', price: 5.5, tags: ['Vegana'], desc: 'Pomodoro, aglio, origano, olio EVO.', img: 'img/m/pizzeria-la-torre/p2.webp', orderable: true },
        { id: 'pt3', name: 'La Torre — 4 stagioni', price: 9, tags: ['La specialità'], desc: 'Prosciutto, funghi, carciofi e olive taggiasche.', img: 'img/m/pizzeria-la-torre/p3.webp', orderable: true },
        { id: 'pt4', name: 'Padellino della casa', price: 8.5, tags: ['Torinese'], desc: 'Doppia lievitazione in teglia, bordo croccante.', img: 'img/m/pizzeria-la-torre/p4.webp', orderable: true },
        { id: 'pt5', name: 'Calzone del forno', price: 8, tags: [], desc: 'Ricotta, salame piccante e fior di latte.', img: 'img/m/pizzeria-la-torre/p5.webp', orderable: true },
        { id: 'pt6', name: 'Bufala DOP', price: 9.5, tags: ['DOP'], desc: 'Con mozzarella di bufala campana aggiunta a crudo.', img: 'img/m/pizzeria-la-torre/p6.webp', orderable: true },
      ],
      offers: [
        { id: 'of-pt1', title: 'Martedì pizza: Margherita a €5', desc: 'Ogni martedì sera, al tavolo e da asporto.', discount: '€5', code: 'MARPIZZA', validUntil: daysFromNow(30), img: 'img/m/pizzeria-la-torre/p1.webp' },
        { id: 'of-pt2', title: 'Menu famiglia: 2 pizze + 2 baby €28', desc: 'Bibite incluse per i più piccoli. Sabato e domenica a pranzo.', discount: '€28', code: 'FAMIGLIA28', validUntil: daysFromNow(18), img: 'img/m/pizzeria-la-torre/cover.webp' },
      ],
      posts: [
        { id: 'po-pt1', img: 'img/m/pizzeria-la-torre/post1.webp', text: 'Il forno è acceso, il campanile è lì fuori: vi aspettiamo in piazza. 🔥', date: daysFromNow(-1) },
        { id: 'po-pt2', img: 'img/m/pizzeria-la-torre/p3.webp', text: 'La Torre di stasera: carciofi nuovi appena arrivati dal mercato.', date: daysFromNow(-4) },
        { id: 'po-pt3', img: 'img/m/pizzeria-la-torre/p4.webp', text: 'Padellino weekend: doppia lievitazione, doppia felicità.', date: daysFromNow(-7) },
      ],
    },

    {
      id: 'caffe-centrale',
      name: 'Caffè Centrale',
      category: 'bar',
      tagline: 'Il salotto della piazza',
      description:
        'Colazioni con pasticceria fresca, pranzi veloci e l’aperitivo del paese. Dehors aperto tutto l’anno sulla piazza.',
      address: 'Piazza Umberto I 12, Orbassano',
      lat: 45.0075,
      lng: 7.5363,
      phone: '011 901 4415',
      hours: { lun: '06:30–20:00', mar: '06:30–20:00', mer: '06:30–20:00', gio: '06:30–20:00', ven: '06:30–21:30', sab: '07:00–21:30', dom: '07:30–13:00' },
      plugins: ['vetrinaplus'],
      bundle: false,
      curated: 'none',
      tools: [],
      active: true,
      accent: '#9C7331',
      cover: 'img/m/caffe-centrale/cover.webp',
      products: [
        { id: 'cc1', name: 'Caffè espresso', price: 1.2, tags: ['Miscela propria'], desc: 'Tostatura media, torrefazione artigianale torinese.', img: 'img/m/caffe-centrale/p1.webp' },
        { id: 'cc2', name: 'Cappuccino e brioche', price: 2.8, tags: ['Colazione'], desc: 'Brioche sfogliata da forno locale, ogni mattina.', img: 'img/m/caffe-centrale/p2.webp' },
        { id: 'cc3', name: 'Aperitivo del Centrale', price: 7, tags: ['Dalle 18'], desc: 'Calice + tagliere di salumi e formaggi del territorio.', img: 'img/m/caffe-centrale/p3.webp' },
        { id: 'cc4', name: 'Tè e infusi', price: 3.5, tags: [], desc: 'Selezione di foglie intere, servite in teiera.', img: 'img/m/caffe-centrale/p4.webp' },
        { id: 'cc5', name: 'Torta della casa', price: 4, tags: ['Fetta'], desc: 'Cambia ogni giorno: chiedi al banco o guarda i nostri post.', img: 'img/m/caffe-centrale/p5.webp' },
      ],
      offers: [
        { id: 'of-cc1', title: 'Colazione completa €2.50 prima delle 9', desc: 'Cappuccino + brioche + spremuta piccola, dal lunedì al venerdì.', discount: '€2.50', code: 'COLAZ25', validUntil: daysFromNow(25), img: 'img/m/caffe-centrale/p2.webp' },
      ],
      posts: [
        { id: 'po-cc1', img: 'img/m/caffe-centrale/post1.webp', text: 'Latte art del lunedì: si comincia col piede giusto. ☕', date: daysFromNow(-2) },
        { id: 'po-cc2', img: 'img/m/caffe-centrale/p3.webp', text: 'Aperitivo in dehors: stasera tagliere speciale con toma di Lanzo.', date: daysFromNow(-5) },
      ],
    },

    {
      id: 'studio-dentistico-sorriso',
      name: 'Studio Dentistico Sorriso',
      category: 'salute',
      tagline: 'La cura, senza attese',
      description:
        'Studio odontoiatrico con sala dedicata ai bambini. Prenota la visita online e scrivici in chat per qualsiasi dubbio: rispondiamo in giornata.',
      address: 'Via Cavour 8, Orbassano',
      lat: 45.0106,
      lng: 7.5412,
      phone: '011 901 5560',
      hours: { lun: '09:00–19:00', mar: '09:00–19:00', mer: '09:00–19:00', gio: '09:00–19:00', ven: '09:00–17:00', sab: 'Su appuntamento', dom: 'Chiuso' },
      plugins: ['prenotazioni', 'chat'],
      bundle: false,
      curated: 'none',
      tools: ['crm'],
      active: true,
      accent: '#0F8E77',
      cover: 'img/m/studio-dentistico-sorriso/cover.webp',
      booking: { type: 'appuntamenti', slots: ['09:00', '10:00', '11:00', '12:00', '14:30', '15:30', '16:30', '17:30'], maxParty: 1 },
      products: [
        { id: 'sd1', name: 'Visita di controllo', price: 50, tags: ['Prima visita'], desc: 'Check-up completo con piano di cura personalizzato.', img: 'img/m/studio-dentistico-sorriso/p1.webp' },
        { id: 'sd2', name: 'Igiene dentale', price: 80, tags: ['Consigliata 2 volte l’anno'], desc: 'Seduta di igiene professionale con ablazione ultrasuoni.', img: 'img/m/studio-dentistico-sorriso/p2.webp' },
        { id: 'sd3', name: 'Sbiancamento LED', price: 180, tags: ['Estetica'], desc: 'Trattamento in studio, risultato visibile in una seduta.', img: 'img/m/studio-dentistico-sorriso/p3.webp' },
        { id: 'sd4', name: 'Ortodonzia trasparente', price: 1800, priceLabel: 'da €1.800', tags: ['Piani rateali'], desc: 'Allineatori invisibili con controlli mensili inclusi.', img: 'img/m/studio-dentistico-sorriso/p4.webp' },
        { id: 'sd5', name: 'Visita bambini', price: 0, priceLabel: 'Gratuita', tags: ['0–12 anni'], desc: 'Prima visita pediatrica gratuita, in sala colori.', img: 'img/m/studio-dentistico-sorriso/p5.webp' },
      ],
      offers: [
        { id: 'of-sd1', title: 'Prima visita + panoramica gratuita', desc: 'Per i nuovi pazienti della rete HiCom, fino a fine mese.', discount: 'Gratis', code: 'SORRISO', validUntil: daysFromNow(15), img: 'img/m/studio-dentistico-sorriso/p1.webp' },
      ],
      posts: [
        { id: 'po-sd1', img: 'img/m/studio-dentistico-sorriso/post1.webp', text: 'La sala bimbi si è rifatta il look: venite a scoprirla! 🦷', date: daysFromNow(-6) },
      ],
    },

    {
      id: 'stilelibero-parrucchieri',
      name: 'StileLibero Parrucchieri',
      category: 'bellezza',
      tagline: 'Head spa & colore',
      description:
        'Salone unisex con angolo head-spa. Prenota il tuo appuntamento da HiCom: niente telefonate, scegli tu il momento.',
      address: 'Via Nazario Sauro 15, Orbassano',
      lat: 45.0044,
      lng: 7.5405,
      phone: '011 901 6684',
      hours: { lun: 'Chiuso', mar: '09:00–19:00', mer: '09:00–19:00', gio: '09:00–21:00', ven: '09:00–19:00', sab: '08:30–18:00', dom: 'Chiuso' },
      plugins: ['prenotazioni'],
      bundle: false,
      curated: 'none',
      tools: [],
      active: true,
      accent: '#235347',
      cover: 'img/m/stilelibero-parrucchieri/cover.webp',
      booking: { type: 'appuntamenti', slots: ['09:00', '10:30', '12:00', '14:30', '16:00', '17:30'], maxParty: 1 },
      products: [
        { id: 'sl1', name: 'Taglio donna', price: 25, tags: [], desc: 'Consulenza, taglio e styling.', img: 'img/m/stilelibero-parrucchieri/p1.webp' },
        { id: 'sl2', name: 'Taglio uomo', price: 16, tags: [], desc: 'Taglio forbice o macchinetta, rifinitura barba inclusa.', img: 'img/m/stilelibero-parrucchieri/p2.webp' },
        { id: 'sl3', name: 'Colore', price: 45, priceLabel: 'da €45', tags: ['Ammoniaca-free'], desc: 'Colorazione professionale con trattamento protettivo.', img: 'img/m/stilelibero-parrucchieri/p3.webp' },
        { id: 'sl4', name: 'Piega', price: 18, tags: [], desc: 'Piega liscia o mossa con prodotti termoprotettivi.', img: 'img/m/stilelibero-parrucchieri/p4.webp' },
        { id: 'sl5', name: 'Rituale head spa', price: 60, tags: ['45 minuti'], desc: 'Massaggio del cuoio capelluto e trattamento alla cheratina.', img: 'img/m/stilelibero-parrucchieri/p5.webp' },
      ],
      offers: [
        { id: 'of-sl1', title: 'Giovedì sera: taglio −20% under 30', desc: 'Apertura lunga del giovedì, fino alle 21.', discount: '−20%', code: 'STILE20', validUntil: daysFromNow(22), img: 'img/m/stilelibero-parrucchieri/p1.webp' },
      ],
      posts: [
        { id: 'po-sl1', img: 'img/m/stilelibero-parrucchieri/post1.webp', text: 'Nuovo rituale head spa: 45 minuti solo per te. Da giovedì.', date: daysFromNow(-2) },
        { id: 'po-sl2', img: 'img/m/stilelibero-parrucchieri/p3.webp', text: 'I colori dell’autunno sono arrivati in salone. 🍂', date: daysFromNow(-8) },
      ],
    },

    {
      id: 'ferramenta-beltramo',
      name: 'Ferramenta Beltramo',
      category: 'artigiani',
      tagline: 'Dal 1978, tre generazioni',
      description:
        'Utensileria, colori, giardinaggio e duplicazione chiavi. Se non ce l’abbiamo, te lo ordiniamo: chiedi in negozio.',
      address: 'Strada Torino 41, Orbassano',
      lat: 45.0129,
      lng: 7.5441,
      phone: '011 901 7723',
      hours: HOURS_SHOP,
      plugins: [],
      bundle: false,
      curated: 'none',
      tools: ['magazzino'],
      active: true,
      accent: '#5E7370',
      cover: 'img/m/ferramenta-beltramo/cover.webp',
      products: [
        { id: 'fb1', name: 'Trapano avvitatore 18V', price: 89, tags: ['2 batterie'], desc: 'Kit completo con valigetta e caricatore rapido.', img: 'img/m/ferramenta-beltramo/p1.webp' },
        { id: 'fb2', name: 'Scala alluminio 6 gradini', price: 65, tags: ['EN 131'], desc: 'Uso domestico e professionale, portata 150 kg.', img: 'img/m/ferramenta-beltramo/p2.webp' },
        { id: 'fb3', name: 'Cassetta attrezzi 108 pezzi', price: 45, tags: ['Best seller'], desc: 'Tutto il necessario per la casa, in valigetta.', img: 'img/m/ferramenta-beltramo/p3.webp' },
        { id: 'fb4', name: 'Idropittura lavabile 10L', price: 39, tags: ['Bianco e tinte'], desc: 'Copertura alta, tinteggio a campione in negozio.', img: 'img/m/ferramenta-beltramo/p4.webp' },
        { id: 'fb5', name: 'Duplicazione chiavi', price: 5, priceLabel: 'da €5', tags: ['Al momento'], desc: 'Anche chiavi auto e citofono, mentre aspetti.', img: 'img/m/ferramenta-beltramo/p5.webp' },
      ],
      offers: [
        { id: 'of-fb1', title: 'Giardinaggio −10% tutto il mese', desc: 'Terricci, sementi e attrezzi per il verde di casa.', discount: '−10%', code: 'GIARDINO10', validUntil: daysFromNow(28), img: 'img/m/ferramenta-beltramo/cover.webp' },
      ],
      posts: [
        { id: 'po-fb1', img: 'img/m/ferramenta-beltramo/post1.webp', text: 'È arrivata la stagione del verde: tutto per l’orto in negozio.', date: daysFromNow(-9) },
      ],
    },

    {
      id: 'chiara-moda',
      name: 'Chiara Moda',
      category: 'negozi',
      tagline: 'Capi scelti, consigli veri',
      description:
        'Abbigliamento donna con selezione di piccoli brand italiani. Scrivici in chat per disponibilità e taglie: ti rispondiamo subito.',
      address: 'Via Roma 56, Orbassano',
      lat: 45.0091,
      lng: 7.533,
      phone: '011 901 8810',
      hours: { ...HOURS_SHOP, lun: '15:30–19:30' },
      plugins: ['chat', 'vetrinaplus'],
      bundle: false,
      curated: 'none',
      tools: ['statistiche'],
      active: true,
      accent: '#9C7331',
      cover: 'img/m/chiara-moda/cover.webp',
      products: [
        { id: 'cm1', name: 'Abito midi plissé', price: 79, tags: ['Nuova collezione'], desc: 'Tessuto fluido, vestibilità morbida. Taglie XS–XL.', img: 'img/m/chiara-moda/p1.webp' },
        { id: 'cm2', name: 'Blazer in lino', price: 95, tags: ['Made in Italy'], desc: 'Sfoderato, perfetto sulle spalle. Colore naturale o salvia.', img: 'img/m/chiara-moda/p2.webp' },
        { id: 'cm3', name: 'Jeans premium', price: 69, tags: ['Denim giapponese'], desc: 'Vita alta, gamba dritta, orlo su misura in negozio.', img: 'img/m/chiara-moda/p3.webp' },
        { id: 'cm4', name: 'Camicia in seta', price: 85, tags: [], desc: 'Seta lavabile, tre colori. Capo che non stanca mai.', img: 'img/m/chiara-moda/p4.webp' },
        { id: 'cm5', name: 'Foulard d’artista', price: 39, tags: ['Serie limitata'], desc: 'Stampe di un’illustratrice torinese, edizione numerata.', img: 'img/m/chiara-moda/p5.webp' },
      ],
      offers: [
        { id: 'of-cm1', title: 'Nuova collezione: −15% sul primo capo', desc: 'Presenta il codice in cassa al tuo primo acquisto.', discount: '−15%', code: 'CHIARA15', validUntil: daysFromNow(16), img: 'img/m/chiara-moda/p1.webp' },
      ],
      posts: [
        { id: 'po-cm1', img: 'img/m/chiara-moda/post1.webp', text: 'Vetrina nuova, collezione nuova. Passate a trovarci in via Roma. ✨', date: daysFromNow(-1) },
        { id: 'po-cm2', img: 'img/m/chiara-moda/p2.webp', text: 'Il blazer in lino che mette d’accordo tutte: naturale o salvia?', date: daysFromNow(-5) },
        { id: 'po-cm3', img: 'img/m/chiara-moda/p5.webp', text: 'Foulard d’artista: nuova serie numerata, pezzi unici.', date: daysFromNow(-11) },
      ],
    },

    {
      id: 'farmacia-san-giuseppe',
      name: 'Farmacia San Giuseppe',
      category: 'salute',
      tagline: 'Prenota e ritira senza coda',
      description:
        'Farmacia di paese con servizi di autoanalisi e dermocosmesi. Prenota i tuoi farmaci da HiCom e ritirali quando sono pronti.',
      address: 'Via Giolitti 5, Orbassano',
      lat: 45.0052,
      lng: 7.5342,
      phone: '011 901 9902',
      hours: { lun: '08:30–19:30', mar: '08:30–19:30', mer: '08:30–19:30', gio: '08:30–19:30', ven: '08:30–19:30', sab: '08:30–12:30', dom: 'Turni festivi' },
      plugins: ['ordini'],
      bundle: false,
      curated: 'none',
      tools: [],
      active: true,
      accent: '#0F8E77',
      cover: 'img/m/farmacia-san-giuseppe/cover.webp',
      products: [
        { id: 'fs1', name: 'Prenotazione farmaci', price: 0, priceLabel: 'Gratuito', tags: ['Con ricetta'], desc: 'Ordina con ricetta elettronica e ritira quando è pronto.', img: 'img/m/farmacia-san-giuseppe/p1.webp', orderable: true },
        { id: 'fs2', name: 'Autoanalisi del sangue', price: 15, tags: ['Risultato in 5 min'], desc: 'Glicemia, colesterolo e trigliceridi, senza prenotazione.', img: 'img/m/farmacia-san-giuseppe/p2.webp' },
        { id: 'fs3', name: 'Misurazione pressione', price: 0, priceLabel: 'Gratuita', tags: [], desc: 'Servizio gratuito, tutti i giorni in orario di apertura.', img: 'img/m/farmacia-san-giuseppe/p3.webp' },
        { id: 'fs4', name: 'Consulenza dermocosmesi', price: 0, priceLabel: 'Su appuntamento', tags: ['Novità'], desc: 'Analisi della pelle con consigli personalizzati.', img: 'img/m/farmacia-san-giuseppe/p4.webp' },
        { id: 'fs5', name: 'Tampone rapido', price: 15, tags: [], desc: 'Esito in 15 minuti con referto.', img: 'img/m/farmacia-san-giuseppe/p5.webp' },
      ],
      offers: [
        { id: 'of-fs1', title: 'Settimana della pelle: consulenza gratuita', desc: 'Analisi dermocosmetica gratuita su appuntamento.', discount: 'Gratis', code: 'PELLE', validUntil: daysFromNow(9), img: 'img/m/farmacia-san-giuseppe/p4.webp' },
      ],
      posts: [
        { id: 'po-fs1', img: 'img/m/farmacia-san-giuseppe/post1.webp', text: 'Da oggi puoi prenotare i farmaci da HiCom e ritirarli senza coda.', date: daysFromNow(-3) },
      ],
    },

    {
      id: 'studio-tecnico-rinaldi',
      name: 'Studio Tecnico Rinaldi',
      category: 'servizi',
      tagline: 'Geometra · pratiche edilizie',
      description:
        'Pratiche edilizie e catastali, certificazioni energetiche e perizie. Primo confronto telefonico sempre gratuito.',
      address: 'Via De Amicis 11, Orbassano',
      lat: 45.0028,
      lng: 7.5322,
      phone: '011 902 1180',
      hours: { lun: '09:00–12:30 · 14:30–18:00', mar: '09:00–12:30 · 14:30–18:00', mer: '09:00–12:30 · 14:30–18:00', gio: '09:00–12:30 · 14:30–18:00', ven: '09:00–12:30', sab: 'Chiuso', dom: 'Chiuso' },
      plugins: [],
      bundle: false,
      curated: 'none',
      tools: [],
      active: true,
      accent: '#235347',
      cover: 'img/m/studio-tecnico-rinaldi/cover.webp',
      products: [
        { id: 'st1', name: 'Pratiche edilizie', price: 0, priceLabel: 'Su preventivo', tags: ['CILA · SCIA'], desc: 'Dalla progettazione alla chiusura pratica in Comune.', img: 'img/m/studio-tecnico-rinaldi/p1.webp' },
        { id: 'st2', name: 'Certificazione APE', price: 150, tags: ['48 ore'], desc: 'Attestato di prestazione energetica con sopralluogo.', img: 'img/m/studio-tecnico-rinaldi/p2.webp' },
        { id: 'st3', name: 'Accatastamenti', price: 0, priceLabel: 'Su preventivo', tags: ['DOCFA'], desc: 'Variazioni e nuovi accatastamenti, tempi certi.', img: 'img/m/studio-tecnico-rinaldi/p3.webp' },
        { id: 'st4', name: 'Perizie e stime', price: 0, priceLabel: 'Su preventivo', tags: [], desc: 'Perizie giurate e stime immobiliari.', img: 'img/m/studio-tecnico-rinaldi/p4.webp' },
      ],
      offers: [],
      posts: [
        { id: 'po-st1', img: 'img/m/studio-tecnico-rinaldi/post1.webp', text: 'Bonus casa 2026: facciamo chiarezza. Primo confronto gratuito in studio.', date: daysFromNow(-10) },
      ],
    },

    {
      id: 'fioraio-petali',
      name: 'Fioraio Petali',
      category: 'negozi',
      tagline: 'Fiori freschi ogni martedì e venerdì',
      description:
        'Bouquet su misura, piante da interno e allestimenti per cerimonie. Diteci l’occasione, al resto pensiamo noi.',
      address: 'Via Montegrappa 2, Orbassano',
      lat: 45.011,
      lng: 7.531,
      phone: '011 902 2264',
      hours: HOURS_SHOP,
      plugins: [],
      bundle: false,
      curated: 'none',
      tools: [],
      active: true,
      accent: '#8EB69B',
      cover: 'img/m/fioraio-petali/cover.webp',
      products: [
        { id: 'fp1', name: 'Bouquet di stagione', price: 25, priceLabel: 'da €25', tags: ['Su misura'], desc: 'Composto al momento con i fiori più freschi del banco.', img: 'img/m/fioraio-petali/p1.webp' },
        { id: 'fp2', name: 'Orchidea phalaenopsis', price: 35, tags: ['Con vaso'], desc: 'Due rami, vaso in ceramica incluso.', img: 'img/m/fioraio-petali/p2.webp' },
        { id: 'fp3', name: 'Piante grasse', price: 8, priceLabel: 'da €8', tags: [], desc: 'Piccole succulente per casa e ufficio.', img: 'img/m/fioraio-petali/p3.webp' },
        { id: 'fp4', name: 'Allestimenti cerimonie', price: 0, priceLabel: 'Su preventivo', tags: ['Matrimoni'], desc: 'Chiesa, sala e bouquet sposa coordinati.', img: 'img/m/fioraio-petali/p4.webp' },
      ],
      offers: [
        { id: 'of-fp1', title: 'Bouquet di stagione −15% nel weekend', desc: 'Venerdì e sabato, sui bouquet composti al momento.', discount: '−15%', code: 'PETALI15', validUntil: daysFromNow(11), img: 'img/m/fioraio-petali/p1.webp' },
      ],
      posts: [
        { id: 'po-fp1', img: 'img/m/fioraio-petali/post1.webp', text: 'Il banco del venerdì: peonie, ranuncoli e tanta primavera. 🌸', date: daysFromNow(-1) },
        { id: 'po-fp2', img: 'img/m/fioraio-petali/p2.webp', text: 'Orchidee nuove in negozio: quale portereste a casa?', date: daysFromNow(-6) },
      ],
    },

    {
      id: 'osteria-del-parco',
      name: 'Osteria del Parco',
      category: 'ristorazione',
      tagline: 'Cucina piemontese di stagione',
      description:
        'Agnolotti del plin tirati a mano, brasato al nebbiolo e una carta vini che parla piemontese. Il menu cambia con il mercato.',
      address: 'Via Gozzano 19, Orbassano',
      lat: 45.0009,
      lng: 7.5438,
      phone: '011 902 3348',
      hours: { lun: 'Chiuso', mar: '12:15–14:30 · 19:30–22:30', mer: '12:15–14:30 · 19:30–22:30', gio: '12:15–14:30 · 19:30–22:30', ven: '12:15–14:30 · 19:30–23:00', sab: '12:15–15:00 · 19:30–23:00', dom: '12:15–15:00' },
      plugins: ['prenotazioni'],
      bundle: false,
      curated: 'plus',
      tools: [],
      active: true,
      accent: '#7A3B2E',
      cover: 'img/m/osteria-del-parco/cover.webp',
      booking: { type: 'tavoli', slots: ['12:30', '13:00', '13:30', '19:30', '20:00', '20:30', '21:00'], maxParty: 8 },
      products: [
        { id: 'op1', name: 'Menu degustazione', price: 38, tags: ['5 portate'], desc: 'Il percorso completo della nostra cucina, vini esclusi.', img: 'img/m/osteria-del-parco/p1.webp' },
        { id: 'op2', name: 'Agnolotti del plin', price: 14, tags: ['Fatti a mano'], desc: 'Al sugo d’arrosto, come da tradizione.', img: 'img/m/osteria-del-parco/p2.webp' },
        { id: 'op3', name: 'Brasato al nebbiolo', price: 18, tags: ['Piatto simbolo'], desc: 'Cottura lenta 12 ore, con purè di patate di montagna.', img: 'img/m/osteria-del-parco/p3.webp' },
        { id: 'op4', name: 'Bunet della nonna', price: 6, tags: ['Dolce'], desc: 'Amaretti e cacao, ricetta di famiglia.', img: 'img/m/osteria-del-parco/p4.webp' },
        { id: 'op5', name: 'Carta dei vini', price: 0, priceLabel: 'Alla mescita da €5', tags: ['Piemonte'], desc: 'Barbera, nebbiolo e freisa di piccoli produttori.', img: 'img/m/osteria-del-parco/p5.webp' },
      ],
      offers: [
        { id: 'of-op1', title: 'Pranzo feriale: menu del giorno €15', desc: 'Primo, secondo, acqua e caffè. Dal martedì al venerdì.', discount: '€15', code: 'PRANZO15', validUntil: daysFromNow(26), img: 'img/m/osteria-del-parco/p2.webp' },
      ],
      posts: [
        { id: 'po-op1', img: 'img/m/osteria-del-parco/post1.webp', text: 'Il plin della domenica si tira il sabato: oggi si chiude alle 15 per… mattarello. 😄', date: daysFromNow(-2) },
        { id: 'po-op2', img: 'img/m/osteria-del-parco/p3.webp', text: 'Torna il brasato: 12 ore di cottura, zero scorciatoie.', date: daysFromNow(-7) },
      ],
    },
  ]
}

/* ============================================================
   SLIDE HERO — banner, eventi e offerte in evidenza
   ============================================================ */
export function buildHeroSlides() {
  return [
    {
      id: 'h1',
      kind: 'brand',
      eyebrow: 'La rete del commercio locale',
      title: 'Il paese, nel tuo telefono',
      text: 'Vetrine, offerte ed eventi di Orbassano in un unico posto.',
      cta: { label: 'Scopri gli esercenti', to: '/esplora' },
      img: 'img/hero/piazza.webp',
    },
    {
      id: 'h2',
      kind: 'evento',
      eyebrow: 'Evento · Comune di Orbassano',
      title: 'Festa di Primavera in piazza',
      text: 'Domenica: mercatino, degustazioni e negozi aperti tutto il giorno.',
      cta: { label: 'Vedi le offerte', to: '/offerte' },
      img: 'img/hero/mercato.webp',
    },
    {
      id: 'h3',
      kind: 'offerta',
      eyebrow: 'Offerta in evidenza',
      title: 'Martedì pizza: Margherita a €5',
      text: 'Da Pizzeria La Torre, in piazza. Al tavolo e da asporto.',
      cta: { label: 'Vai alla pizzeria', to: '/esercente/pizzeria-la-torre' },
      img: 'img/hero/pizza.webp',
    },
    {
      id: 'h4',
      kind: 'novita',
      eyebrow: 'Novità dal territorio',
      title: 'La nuova collezione di Chiara Moda',
      text: 'Capi di piccoli brand italiani, scelti uno a uno. −15% sul primo acquisto.',
      cta: { label: 'Scopri la vetrina', to: '/esercente/chiara-moda' },
      img: 'img/hero/moda.webp',
    },
  ]
}

/* ============================================================
   DATI DINAMICI PRE-SEED (prenotazioni, ordini, chat, tool)
   ============================================================ */
export function buildDynamic() {
  return {
    bookings: [
      { id: 'bk1', merchantId: 'pizzeria-la-torre', name: 'Franco Ghirardi', phone: '333 4455667', date: daysFromNow(0), time: '20:00', party: 4, status: 'confermata', code: 'TAV-4821', createdAt: todayAt(10, 12) },
      { id: 'bk2', merchantId: 'pizzeria-la-torre', name: 'Elisa Martini', phone: '347 8811223', date: daysFromNow(0), time: '20:30', party: 2, status: 'in-attesa', code: 'TAV-4822', createdAt: todayAt(12, 40) },
      { id: 'bk3', merchantId: 'pizzeria-la-torre', name: 'Famiglia Ricci', phone: '340 5566778', date: daysFromNow(1), time: '19:30', party: 6, status: 'confermata', code: 'TAV-4823', createdAt: todayAt(9, 5) },
      { id: 'bk4', merchantId: 'studio-dentistico-sorriso', name: 'Paolo Vinardi', phone: '339 2233445', date: daysFromNow(0), time: '15:30', party: 1, status: 'confermata', code: 'APP-1204', note: 'Igiene dentale', createdAt: todayAt(8, 30) },
      { id: 'bk5', merchantId: 'studio-dentistico-sorriso', name: 'Miriam Costa', phone: '328 9900112', date: daysFromNow(1), time: '10:00', party: 1, status: 'in-attesa', code: 'APP-1205', note: 'Prima visita — codice SORRISO', createdAt: todayAt(11, 15) },
      { id: 'bk6', merchantId: 'stilelibero-parrucchieri', name: 'Giulia Ferrero', phone: '331 4455889', date: daysFromNow(0), time: '16:00', party: 1, status: 'confermata', code: 'APP-3310', note: 'Taglio + piega', createdAt: todayAt(9, 50) },
      { id: 'bk7', merchantId: 'osteria-del-parco', name: 'Sandro Operti', phone: '335 6677889', date: daysFromNow(0), time: '20:30', party: 2, status: 'confermata', code: 'TAV-7745', note: 'Anniversario', createdAt: todayAt(10, 0) },
    ],
    orders: [
      {
        id: 'or1', merchantId: 'panetteria-del-borgo', name: 'Marta Olivero', phone: '333 1122334',
        items: [ { productId: 'pb2', name: 'Focaccia all’olio', qty: 1, note: 'mezzo kg' }, { productId: 'pb6', name: 'Pizza al padellino', qty: 4 } ],
        pickup: { date: daysFromNow(0), time: '12:30' }, status: 'in-preparazione', code: 'RIT-2201', createdAt: todayAt(9, 20),
      },
      {
        id: 'or2', merchantId: 'panetteria-del-borgo', name: 'Luca Bonino', phone: '347 5566001',
        items: [ { productId: 'pb1', name: 'Pane di grano duro', qty: 2, note: '1 kg' } ],
        pickup: { date: daysFromNow(0), time: '18:00' }, status: 'nuovo', code: 'RIT-2202', createdAt: todayAt(11, 45),
      },
      {
        id: 'or3', merchantId: 'farmacia-san-giuseppe', name: 'Anna Peirone', phone: '338 7788990',
        items: [ { productId: 'fs1', name: 'Prenotazione farmaci', qty: 1, note: 'Ricetta n. 0442' } ],
        pickup: { date: daysFromNow(0), time: '17:30' }, status: 'pronto', code: 'RIT-8804', createdAt: todayAt(8, 55),
      },
    ],
    chats: [
      {
        id: 'ch1', merchantId: 'pizzeria-la-torre', citizenName: 'Tu',
        unreadMerchant: 0, unreadCitizen: 0,
        messages: [
          { id: 'm1', from: 'citizen', text: 'Buonasera! Per stasera avete tavoli fuori?', at: todayAt(11, 2) },
          { id: 'm2', from: 'merchant', text: 'Buonasera! Sì, il dehors è aperto: le consiglio di prenotare dalle 20 in poi. 😊', at: todayAt(11, 6) },
        ],
      },
      {
        id: 'ch2', merchantId: 'chiara-moda', citizenName: 'Tu',
        unreadMerchant: 1, unreadCitizen: 0,
        messages: [
          { id: 'm3', from: 'citizen', text: 'Ciao! Il blazer in lino salvia c’è ancora in taglia M?', at: todayAt(10, 21) },
        ],
      },
    ],
    /* risposte automatiche per la demo, per esercente */
    autoReplies: {
      'pizzeria-la-torre': ['Buonasera! Certo, le rispondo subito. 🔥', 'Per stasera abbiamo posto sia in sala che nel dehors: la aspettiamo!', 'Se preferisce può prenotare direttamente da HiCom con il pulsante «Prenota».'],
      'chiara-moda': ['Ciao! Grazie del messaggio 😊', 'Sì, è disponibile! Posso tenertelo da parte fino a domani sera.', 'Se vuoi ti mando una foto degli altri colori disponibili.'],
      'studio-dentistico-sorriso': ['Buongiorno, grazie per averci scritto.', 'Per questo tipo di richieste la segretaria la ricontatta entro la giornata.', 'Può anche prenotare direttamente una visita dal pulsante «Prenota».'],
      _default: ['Grazie del messaggio! Le rispondiamo il prima possibile.', 'Buongiorno! Sì, siamo aperti: la aspettiamo in negozio.'],
    },
    /* Officina Digitale — dati dei tool */
    inventory: [
      { id: 'inv1', merchantId: 'ferramenta-beltramo', name: 'Trapano avvitatore 18V', sku: 'UT-1804', qty: 6, min: 3 },
      { id: 'inv2', merchantId: 'ferramenta-beltramo', name: 'Scala alluminio 6 gradini', sku: 'SC-0614', qty: 2, min: 3 },
      { id: 'inv3', merchantId: 'ferramenta-beltramo', name: 'Cassetta attrezzi 108 pz', sku: 'CA-1080', qty: 11, min: 4 },
      { id: 'inv4', merchantId: 'ferramenta-beltramo', name: 'Idropittura lavabile 10L bianco', sku: 'VE-1010', qty: 1, min: 5 },
      { id: 'inv5', merchantId: 'ferramenta-beltramo', name: 'Chiavi grezze (assortite)', sku: 'CH-0001', qty: 240, min: 80 },
      { id: 'inv6', merchantId: 'ferramenta-beltramo', name: 'Terriccio universale 45L', sku: 'GA-4501', qty: 18, min: 10 },
      { id: 'inv7', merchantId: 'ferramenta-beltramo', name: 'Guanti da lavoro tg. 9', sku: 'GU-0900', qty: 4, min: 6 },
    ],
    /* incassi: ultimi 14 giorni, generati a runtime nel tool */
    incassiBase: { merchantId: 'panetteria-del-borgo', avg: 420, weekend: 610 },
    crmClients: [
      { id: 'cr1', merchantId: 'studio-dentistico-sorriso', name: 'Paolo Vinardi', phone: '339 2233445', lastVisit: daysFromNow(-40), note: 'Igiene ogni 6 mesi. Richiamare a ottobre.', visits: 6 },
      { id: 'cr2', merchantId: 'studio-dentistico-sorriso', name: 'Miriam Costa', phone: '328 9900112', lastVisit: null, note: 'Nuova paziente — codice SORRISO da HiCom.', visits: 0 },
      { id: 'cr3', merchantId: 'studio-dentistico-sorriso', name: 'Famiglia Danesi (3)', phone: '340 1122556', lastVisit: daysFromNow(-15), note: 'Bimbi 6 e 9 anni. Controllo a settembre.', visits: 4 },
      { id: 'cr4', merchantId: 'studio-dentistico-sorriso', name: 'Aldo Chiadò', phone: '336 5544332', lastVisit: daysFromNow(-90), note: 'Preventivo ortodonzia inviato, da risentire.', visits: 2 },
    ],
    /* statistiche vetrina: serie generata a runtime nel tool */
    statsBase: { merchantId: 'chiara-moda', dailyAvg: 38 },
  }
}

export function buildSeed() {
  return {
    version: 4,
    merchants: buildMerchants(),
    heroSlides: buildHeroSlides(),
    ...buildDynamic(),
  }
}
