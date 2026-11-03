import type { CSSProperties } from 'react'

// Partículas deterministas (sin Math.random: el dibujo no cambia entre renders). La forma y el
// sentido del movimiento los da `kind` (ver world.css); aquí solo se reparten posición, tamaño,
// duración, fase y vaivén de forma pareja con la razón áurea.
type Kind = 'leaf' | 'feather' | 'wisp' | 'ember'

const frac = (n: number) => (n * 0.6180339887) % 1
const lerp = ([a, b]: [number, number], t: number) => a + (b - a) * t

export function Particles({
  kind,
  count,
  size,
  dur,
  sway,
}: {
  kind: Kind
  count: number
  size: [number, number] // px
  dur: [number, number] // segundos por vuelta
  sway: number // px de vaivén lateral
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const duration = lerp(dur, frac(i + 3))
        return (
          <span
            key={i}
            className={`world-p world-${kind}`}
            style={
              {
                '--x': `${((i + 0.2 + 0.6 * frac(i + 1)) / count) * 100}%`,
                '--s': `${lerp(size, frac(i + 2)).toFixed(1)}px`,
                '--dur': `${duration.toFixed(1)}s`,
                '--delay': `${(-frac(i + 4) * duration).toFixed(1)}s`, // negativo: ya van a medio camino
                '--sw': `${((i % 2 === 0 ? 1 : -1) * sway * (0.5 + frac(i + 5))).toFixed(0)}px`,
              } as CSSProperties
            }
          />
        )
      })}
    </>
  )
}
