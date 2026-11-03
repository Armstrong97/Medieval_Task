import type { CSSProperties } from 'react'
import { Particles } from '@/features/world/Particles'
import { SceneArt } from '@/features/world/SceneArt'

// Una escena por pantalla, según su concepto. Todas se montan dentro de WorldLayer.

// Combate: arena de duelo. Hojas, antorchas, niebla baja y un destello de acero a lo lejos.
export function CombatScene() {
  return (
    <>
      <SceneArt scene="combat" layer="back" />
      <Particles kind="ember" count={12} size={[2, 4]} dur={[9, 16]} sway={30} />
      <Particles kind="leaf" count={6} size={[14, 22]} dur={[28, 56]} sway={60} />
      <div className="world-mist" />
      <div className="world-mist world-mist-b" />
      <div className="world-torch absolute -bottom-40 -left-32 h-[26rem] w-[26rem] rounded-full" />
      <div className="world-torch world-torch-b absolute -bottom-40 -right-32 h-[26rem] w-[26rem] rounded-full" />
      <span className="world-spark" style={{ left: '14%', top: '38%', '--dur': '23s', '--delay': '-6s' } as CSSProperties} />
      <span className="world-spark" style={{ right: '16%', top: '26%', '--dur': '31s', '--delay': '-19s' } as CSSProperties} />
      <SceneArt scene="combat" layer="front" />
    </>
  )
}

// Inbox: las ideas llegan. Luces fatuas que suben como pensamientos y plumas que bajan flotando.
export function InboxScene() {
  return (
    <>
      <SceneArt scene="inbox" layer="back" />
      <Particles kind="wisp" count={8} size={[5, 9]} dur={[34, 52]} sway={40} />
      <Particles kind="feather" count={4} size={[16, 24]} dur={[30, 42]} sway={60} />
      <SceneArt scene="inbox" layer="front" />
    </>
  )
}

// Estrategia: mesa de mapas. Dos constelaciones que se dibujan y se desvanecen, y una vela.
// Coordenadas en % de la pantalla (las líneas usan un SVG sin proporción fija).
const CONSTELLATIONS: [number, number][][] = [
  [[5, 10], [13, 19], [9, 33], [19, 41], [14, 57], [24, 66]],
  [[95, 14], [87, 26], [93, 39], [83, 49], [90, 63], [80, 74]],
]

export function StrategyScene() {
  return (
    <>
      <SceneArt scene="strategy" layer="back" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
        {CONSTELLATIONS.flatMap((pts, c) =>
          pts.slice(1).map(([x, y], i) => (
            <path
              key={`${c}-${i}`}
              className="world-line"
              pathLength={1}
              d={`M${pts[i][0]} ${pts[i][1]}L${x} ${y}`}
              style={{ '--delay': `${(c * 3 + i * 1.7 - 6).toFixed(1)}s` } as CSSProperties}
            />
          )),
        )}
      </svg>
      {CONSTELLATIONS.flatMap((pts, c) =>
        pts.map(([x, y], i) => (
          <span
            key={`${c}-${i}`}
            className="world-star"
            style={{ '--x': `${x}%`, '--y': `${y}%`, '--dur': `${3 + ((i * 7 + c * 3) % 5)}s`, '--delay': `${-i * 0.9}s` } as CSSProperties}
          />
        )),
      )}
      <div className="world-torch absolute -bottom-40 left-[calc(50%-13rem)] h-[26rem] w-[26rem] rounded-full" />
      <SceneArt scene="strategy" layer="front" />
    </>
  )
}
