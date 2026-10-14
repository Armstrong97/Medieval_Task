import { useEffect, useState } from 'react'

/** Milisegundos que faltan para `endAt` (null si no hay temporizador). */
export function useFocusClock(endAt: number | null): number | null {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (endAt === null) return
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(id)
  }, [endAt])

  return endAt === null ? null : Math.max(0, endAt - now)
}

export function formatClock(ms: number): string {
  const total = Math.ceil(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
