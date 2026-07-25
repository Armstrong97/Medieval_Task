import { useMemo } from 'react'

interface Mote {
  left: number
  size: number
  drift: number
  duration: number
  delay: number
}

function useMotes(count: number): Mote[] {
  return useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        drift: Math.random() * 80 - 40,
        duration: 10 + Math.random() * 14,
        delay: Math.random() * 14,
      })),
    [count],
  )
}

/**
 * Fondo ambiental global: aurora rotando muy lento + motas doradas ascendiendo.
 * Solo visible en modo oscuro (identidad principal); en claro queda inerte para no
 * competir con la legibilidad. Se apaga con prefers-reduced-motion.
 */
export function AmbientBackground() {
  const motes = useMotes(18)

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:opacity-100 opacity-0">
      <div className="ambient-aurora absolute -inset-1/5" />
      {motes.map((mote, i) => (
        <div
          key={i}
          className="ambient-mote absolute bottom-[-5%] rounded-full"
          style={
            {
              left: `${mote.left}%`,
              width: mote.size,
              height: mote.size,
              '--drift': `${mote.drift}px`,
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
