import { useEffect, useState } from 'react'
import { LogoMark } from './Logo'
import { IconX, IconInstall } from './Icons'

/**
 * Banner «Installa HiCom»: usa beforeinstallprompt dove disponibile
 * (Android/desktop Chrome), istruzioni manuali su iOS.
 */
export function InstallBanner() {
  const [deferred, setDeferred] = useState(null)
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('hicom-install-dismissed') === '1')
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches)

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setDeferred(e)
    }
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed || dismissed || !deferred) return null

  const dismiss = () => {
    sessionStorage.setItem('hicom-install-dismissed', '1')
    setDismissed(true)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(var(--bottomnav-h) + env(safe-area-inset-bottom) + 14px)',
        left: 14,
        right: 14,
        zIndex: 80,
        maxWidth: 430,
        margin: '0 auto',
        background: 'var(--green-950)',
        color: '#fff',
        borderRadius: 'var(--r-md)',
        boxShadow: 'var(--shadow-lg)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <LogoMark size={34} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <strong style={{ fontSize: '0.9rem' }}>Porta HiCom con te</strong>
        <div style={{ fontSize: '0.75rem', color: 'var(--green-300)' }}>
          Installala sul telefono: due tocchi, niente store.
        </div>
      </div>
      <button
        type="button"
        onClick={async () => {
          deferred.prompt()
          await deferred.userChoice
          setDeferred(null)
        }}
        style={{
          background: 'var(--teal-500)',
          color: 'var(--green-950)',
          fontWeight: 700,
          fontSize: '0.8rem',
          borderRadius: 'var(--r-pill)',
          padding: '8px 14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          flexShrink: 0,
        }}
      >
        <IconInstall width={15} height={15} /> Installa
      </button>
      <button type="button" onClick={dismiss} aria-label="Chiudi" style={{ color: 'var(--green-300)', flexShrink: 0 }}>
        <IconX width={16} height={16} />
      </button>
    </div>
  )
}
