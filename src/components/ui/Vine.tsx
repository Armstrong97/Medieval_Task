import type { CSSProperties } from 'react'
import { BG_H, BG_W, growVine } from './vineGeometry'

// Fondo del menú: una sola enredadera que nace abajo y se ramifica por todo el panel, borrosa y por
// detrás de los ítems. Cada rama «crece» (stroke-dashoffset, pathLength=1) cuando la madre llega a su
// punto de origen y hojas y flores brotan después. Lo dispara la clase .is-open del contenedor.
const VINE = growVine()

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

export function VineBackdrop({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${BG_W} ${BG_H}`}
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden="true"
      className={`vine-bg pointer-events-none text-accent ${className}`}
    >
      {VINE.branches.map((b, i) => (
        <path
          key={i}
          className="vine-branch"
          pathLength={1}
          d={b.d}
          stroke="currentColor"
          strokeWidth={b.w}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ ...d(b.delay), '--t': `${b.dur}s` } as CSSProperties}
        />
      ))}
      {VINE.leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
          <g className="vine-leaf" style={d(l.delay)}>
            <path
              d={`M0 0C${0.25 * l.size} ${-0.42 * l.size} ${0.7 * l.size} ${-0.4 * l.size} ${l.size} 0C${0.7 * l.size} ${0.4 * l.size} ${0.25 * l.size} ${0.42 * l.size} 0 0Z`}
              fill="currentColor"
            />
          </g>
        </g>
      ))}
      {VINE.flowers.map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y})`}>
          <g className="vine-flower" style={{ ...d(f.delay), color: 'var(--gold)' }}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx={f.size * 0.62} cy="0" rx={f.size * 0.5} ry={f.size * 0.3} fill="currentColor" transform={`rotate(${a})`} />
            ))}
          </g>
        </g>
      ))}
    </svg>
  )
}
