import { VINE_H, VINE_W, buildVine } from './vineGeometry'

// Enredadera decorativa para el borde del menú. Las ramas y el tallo «crecen» con stroke-dashoffset
// (pathLength=1); hojas y flores brotan escalonadas. Lo dispara la clase .is-open del contenedor.
const VINE = buildVine()

// Hoja con nervadura; el origen es la base (para que brote creciendo desde la rama).
function Leaf({ size }: { size: number }) {
  const s = size
  return (
    <>
      <path
        d={`M0 0C${0.25 * s} ${-0.42 * s} ${0.7 * s} ${-0.4 * s} ${s} 0C${0.7 * s} ${0.4 * s} ${0.25 * s} ${0.42 * s} 0 0Z`}
        fill="currentColor"
      />
      <path d={`M0 0L${0.85 * s} 0`} stroke="var(--bg)" strokeWidth="0.7" strokeLinecap="round" opacity="0.55" />
    </>
  )
}

export function Vine({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${VINE_W} ${VINE_H}`}
      preserveAspectRatio="xMaxYMin meet"
      fill="none"
      aria-hidden="true"
      className={`vine pointer-events-none text-accent ${className}`}
    >
      <path className="vine-stem" pathLength={1} d={VINE.stem} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {VINE.branches.map((b, i) => (
        <path
          key={i}
          className="vine-branch"
          pathLength={1}
          d={b.d}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transitionDelay: `${b.delay}s` }}
        />
      ))}
      {VINE.leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
          <g className="vine-leaf" style={{ transitionDelay: `${l.delay}s` }}>
            <Leaf size={l.size} />
          </g>
        </g>
      ))}
      {VINE.flowers.map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y})`}>
          <g className="vine-flower" style={{ transitionDelay: `${f.delay}s`, color: 'var(--gold)' }}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx={f.size * 0.62} cy="0" rx={f.size * 0.5} ry={f.size * 0.3} fill="currentColor" transform={`rotate(${a})`} />
            ))}
            <circle r={f.size * 0.22} fill="var(--bg)" opacity="0.8" />
          </g>
        </g>
      ))}
    </svg>
  )
}
