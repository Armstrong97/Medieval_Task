import { useMemo } from 'react'

interface Mote {
  left: number
  top: number
  size: number
  dx: number
  dy: number
  duration: number
  delay: number
  tone: 'a' | 'b'
}

function useMotes(count: number): Mote[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        top: 10 + Math.random() * 85,
        size: 3 + Math.random() * 5,
        dx: Math.random() * 120 - 60,
        dy: Math.random() * 90 - 60,
        duration: 14 + Math.random() * 16,
        delay: -Math.random() * 20,
        tone: i % 2 === 0 ? 'a' : 'b',
      })),
    [count],
  )
}

/**
 * Fondo ambiental global "bosque vivo". De noche: aurora rúnica + luciérnagas.
 * De día: haces de luz entre el follaje + polen dorado. El tema lo resuelve el
 * CSS (prefers-color-scheme), no este componente. Se congela con
 * prefers-reduced-motion.
 */
export function AmbientBackground() {
  const motes = useMotes(16)

  return (
    <div
      aria-hidden="true"
      className="ambient-root pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="ambient-aurora absolute -inset-1/5" />
      <div className="ambient-rays" />
      {motes.map((mote, i) => (
        <div
          key={i}
          className="ambient-mote"
          style={
            {
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              width: mote.size,
              height: mote.size,
              '--dx': `${mote.dx}px`,
              '--dy': `${mote.dy}px`,
              '--dur': `${mote.duration}s`,
              '--delay': `${mote.delay}s`,
              '--mote-c': `var(--mote-${mote.tone})`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
