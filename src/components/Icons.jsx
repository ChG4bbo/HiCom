/* Set di icone stroke coerente (2px, terminali arrotondati). */
const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const IconHome = (p) => (
  <svg {...base} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
  </svg>
)

export const IconCompass = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </svg>
)

export const IconTicket = (p) => (
  <svg {...base} {...p}>
    <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
    <path d="M13 6v2.5M13 11v2M13 15.5V18" strokeDasharray="0.1 3.4" />
  </svg>
)

export const IconChat = (p) => (
  <svg {...base} {...p}>
    <path d="M21 12a8 8 0 0 1-8 8H4l1.6-3.2A8 8 0 1 1 21 12Z" />
  </svg>
)

export const IconSearch = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.8-3.8" />
  </svg>
)

export const IconPin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconPhone = (p) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l1.5 4L8 10a12 12 0 0 0 6 6l2-2.5 4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
)

export const IconCalendar = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
)

export const IconBag = (p) => (
  <svg {...base} {...p}>
    <path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
)

export const IconStore = (p) => (
  <svg {...base} {...p}>
    <path d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
    <path d="M3 6 5 3h14l2 3a2.5 2.5 0 0 1-4.5 1.5 2.5 2.5 0 0 1-4.5 0A2.5 2.5 0 0 1 7.5 7.5 2.5 2.5 0 0 1 3 6Z" />
    <path d="M9 20v-6h6v6" />
  </svg>
)

export const IconList = (p) => (
  <svg {...base} {...p}>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <circle cx="4" cy="6" r="0.5" /><circle cx="4" cy="12" r="0.5" /><circle cx="4" cy="18" r="0.5" />
  </svg>
)

export const IconMap = (p) => (
  <svg {...base} {...p}>
    <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
)

export const IconArrowLeft = (p) => (
  <svg {...base} {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
)

export const IconChevron = (p) => (
  <svg {...base} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const IconPlus = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const IconX = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
)

export const IconSend = (p) => (
  <svg {...base} {...p}>
    <path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" />
  </svg>
)

export const IconEdit = (p) => (
  <svg {...base} {...p}>
    <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z" />
    <path d="m14 6 3 3" />
  </svg>
)

export const IconTrash = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
  </svg>
)

export const IconGauge = (p) => (
  <svg {...base} {...p}>
    <path d="M4 14a8 8 0 1 1 16 0" />
    <path d="M12 14 15.5 9" />
    <path d="M2.5 19h19" />
  </svg>
)

export const IconPuzzle = (p) => (
  <svg {...base} {...p}>
    <path d="M9 4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4h-4a2 2 0 1 0-4 0H5v-4a2 2 0 1 0 0-4V4z" />
  </svg>
)

export const IconTool = (p) => (
  <svg {...base} {...p}>
    <path d="M14.5 6.5a4.5 4.5 0 0 0-6 5.5L3 17.5a2.1 2.1 0 0 0 3 3l5.5-5.5a4.5 4.5 0 0 0 5.5-6L14 12l-2-2z" />
  </svg>
)

export const IconLogout = (p) => (
  <svg {...base} {...p}>
    <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4" />
    <path d="M15 8l4 4-4 4M19 12H9" />
  </svg>
)

export const IconImage = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m4 18 5-5 3 3 4-4 4 4" />
  </svg>
)

export const IconMegaphone = (p) => (
  <svg {...base} {...p}>
    <path d="M3 10v4a1 1 0 0 0 1 1h2l4 4V5L6 9H4a1 1 0 0 0-1 1Z" />
    <path d="M14 8a5 5 0 0 1 0 8M17.5 5.5a9 9 0 0 1 0 13" />
  </svg>
)

export const IconInstall = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v11M8 10l4 4 4-4" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
)
