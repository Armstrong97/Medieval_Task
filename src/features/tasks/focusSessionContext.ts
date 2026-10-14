import { createContext, useContext } from 'react'

export interface FocusSessionValue {
  /** Misión en foco (null = no hay sesión activa). */
  taskId: string | null
  /** Marca de tiempo (ms) en que termina el bloque; null = sin temporizador. */
  endAt: number | null
  begin: (taskId: string) => void
  startTimer: (minutes: number) => void
  stopTimer: () => void
  end: () => void
}

export const FocusSessionContext = createContext<FocusSessionValue | null>(null)

export function useFocusSession(): FocusSessionValue {
  const ctx = useContext(FocusSessionContext)
  if (!ctx) throw new Error('useFocusSession debe usarse dentro de FocusSessionProvider')
  return ctx
}
