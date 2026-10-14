import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { showToast } from '@/components/ui/toast-store'
import { FocusSessionContext } from '@/features/tasks/focusSessionContext'

const STORAGE_KEY = 'questly_focus_session'

interface Stored {
  taskId: string | null
  endAt: number | null
}

function read(): Stored {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Stored
  } catch {
    // sin sessionStorage: la sesión funciona igual, solo no sobrevive a recargar.
  }
  return { taskId: null, endAt: null }
}

/**
 * Sesión de foco única y global: la misión en foco y su temporizador viven acá
 * para que el Modo Foco de la página y la ventana flotante muestren lo mismo
 * (antes el estado era local de la página). Va por encima de FocusFloatProvider.
 */
export function FocusSessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Stored>(read)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } catch {
      // nada que persistir
    }
  }, [session])

  // Aviso al terminar el bloque, esté la página o solo la ventana flotante.
  useEffect(() => {
    if (!session.endAt) return
    const ms = session.endAt - Date.now()
    if (ms <= 0) return
    const id = window.setTimeout(() => {
      showToast({ title: '¡Bloque terminado!', detail: 'Descansa unos minutos o empieza otro bloque.' })
      navigator.vibrate?.([200, 100, 200])
    }, ms)
    return () => window.clearTimeout(id)
  }, [session.endAt])

  // Cambiar de misión reinicia el temporizador: un solo foco a la vez.
  // Funciones estables: las páginas las usan como dependencia de efectos.
  const begin = useCallback(
    (taskId: string) => setSession((s) => (s.taskId === taskId ? s : { taskId, endAt: null })),
    [],
  )
  const startTimer = useCallback(
    (minutes: number) => setSession((s) => ({ ...s, endAt: Date.now() + minutes * 60_000 })),
    [],
  )
  const stopTimer = useCallback(() => setSession((s) => ({ ...s, endAt: null })), [])
  const end = useCallback(() => setSession({ taskId: null, endAt: null }), [])

  const value = useMemo(
    () => ({ taskId: session.taskId, endAt: session.endAt, begin, startTimer, stopTimer, end }),
    [session, begin, startTimer, stopTimer, end],
  )

  return <FocusSessionContext.Provider value={value}>{children}</FocusSessionContext.Provider>
}
