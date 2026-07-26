import { createContext, useContext, useState, type PropsWithChildren } from 'react'

// La Document Picture-in-Picture API todavía no está en los tipos de DOM de TS.
interface DocumentPictureInPictureApi {
  requestWindow(options?: { width?: number; height?: number }): Promise<Window>
}

function getPipApi(): DocumentPictureInPictureApi | undefined {
  return (window as { documentPictureInPicture?: DocumentPictureInPictureApi })
    .documentPictureInPicture
}

// El documento de la ventana PiP nace vacío: se le copian todas las hojas de
// estilo de la app (tokens de index.css incluidos, así hereda paleta, fuentes
// y modo oscuro vía prefers-color-scheme) y un <base> para que las URLs
// relativas de assets (fuentes autohospedadas) sigan resolviendo.
function copyStylesInto(pipWindow: Window) {
  const base = pipWindow.document.createElement('base')
  base.href = window.location.origin + '/'
  pipWindow.document.head.appendChild(base)

  for (const styleSheet of Array.from(document.styleSheets)) {
    try {
      const cssText = Array.from(styleSheet.cssRules)
        .map((rule) => rule.cssText)
        .join('\n')
      const style = pipWindow.document.createElement('style')
      style.textContent = cssText
      pipWindow.document.head.appendChild(style)
    } catch {
      if (styleSheet.href) {
        const link = pipWindow.document.createElement('link')
        link.rel = 'stylesheet'
        link.href = styleSheet.href
        pipWindow.document.head.appendChild(link)
      }
    }
  }
}

interface FocusFloatContextValue {
  pipWindow: Window | null
  supported: boolean
  open: () => Promise<void>
  close: () => void
}

const FocusFloatContext = createContext<FocusFloatContextValue | null>(null)

/**
 * Estado compartido de la ventana flotante de foco (Document Picture-in-Picture).
 * Vive una sola vez en Layout — así tanto el botón del nav como el botón
 * "Atacar / Entrar en Foco" de cada CombatSlotCard controlan la misma ventana
 * en vez de intentar abrir instancias separadas (el navegador solo permite
 * una ventana PiP de documento a la vez).
 */
export function FocusFloatProvider({ children }: PropsWithChildren) {
  const [pipWindow, setPipWindow] = useState<Window | null>(null)
  const supported = !!getPipApi()

  async function open() {
    if (pipWindow) return
    const api = getPipApi()
    if (!api) return
    const win = await api.requestWindow({ width: 320, height: 220 })
    copyStylesInto(win)
    win.addEventListener('pagehide', () => setPipWindow(null))
    setPipWindow(win)
  }

  function close() {
    pipWindow?.close()
    setPipWindow(null)
  }

  return (
    <FocusFloatContext.Provider value={{ pipWindow, supported, open, close }}>
      {children}
    </FocusFloatContext.Provider>
  )
}

export function useFocusFloat() {
  const ctx = useContext(FocusFloatContext)
  if (!ctx) throw new Error('useFocusFloat debe usarse dentro de FocusFloatProvider')
  return ctx
}
