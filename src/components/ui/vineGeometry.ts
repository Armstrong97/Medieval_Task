// Geometría de la enredadera de fondo del menú (ver Vine.tsx). Una sola planta que nace abajo y se
// va ramificando por todo el panel: tronco → ramas → ramitas, con hojas, zarcillos y flores.
// Determinista (misma semilla, mismo dibujo) y con tiempos: cada rama empieza a crecer cuando la
// rama madre llega a ese punto, así que la planta se «dispersa» en el tiempo.
export const BG_W = 280
export const BG_H = 900
const SPEED = 200 // unidades que crece una rama por segundo

export interface VineBranch {
  d: string
  delay: number
  dur: number
  w: number
}
export interface VineLeaf {
  x: number
  y: number
  rot: number
  size: number
  delay: number
}
export interface VineFlower {
  x: number
  y: number
  size: number
  delay: number
}
export interface VineData {
  branches: VineBranch[]
  leaves: VineLeaf[]
  flowers: VineFlower[]
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const r1 = (n: number) => Math.round(n * 10) / 10
const deg = (rad: number) => (rad * 180) / Math.PI

// Por generación (0 = tronco): grosor y cada cuántas unidades sale una hoja / una rama hija.
const GEN = [
  { w: 3.6, leafEvery: 40, childEvery: 62 },
  { w: 2.6, leafEvery: 36, childEvery: 48 },
  { w: 1.8, leafEvery: 30, childEvery: 40 },
  { w: 1.2, leafEvery: 18, childEvery: 0 },
]

export function growVine(seed = 3): VineData {
  const rnd = mulberry32(seed)
  const out: VineData = { branches: [], leaves: [], flowers: [] }
  const STEP = 7

  function branch(x: number, y: number, heading: number, len: number, gen: number, t0: number) {
    const g = GEN[gen]
    const amp = (gen === 0 ? 0.1 : 0.35) + rnd() * 0.3 // cuánto serpentea (el tronco casi recto)
    const per = 26 + rnd() * 30
    const ph = rnd() * Math.PI * 2
    const bias = (rnd() - 0.5) * (gen === 0 ? 0.0008 : 0.003) // deriva lenta: cada rama se curva hacia un lado
    const n = Math.max(2, Math.round(len / STEP))
    const dur = len / SPEED

    const pts: { x: number; y: number; h: number }[] = [{ x, y, h: heading }]
    let px = x
    let py = y
    for (let i = 1; i <= n; i++) {
      const s = i * STEP
      const base = heading + amp * 0.5 * Math.sin(s / per + ph) + bias * s
      // Las ramas se curvan poco a poco hacia arriba, como buscando la luz.
      const h = gen === 0 ? base : base + (-Math.PI / 2 - base) * Math.min(0.45, s * 0.0012)
      px += Math.cos(h) * STEP
      py += Math.sin(h) * STEP
      pts.push({ x: px, y: py, h })
    }
    const tip = pts[n]

    // Remate: zarcillo en espiral (parte del trazo), flor dorada o nada (la hoja del extremo la pone el final).
    let curl = ''
    const end = rnd()
    if (gen >= 2 && end < 0.5) {
      const cs = rnd() < 0.5 ? 1 : -1
      const r0 = 6 + rnd() * 3
      const c = Math.PI / 2
      const cx = tip.x + r0 * Math.cos(tip.h + cs * c)
      const cy = tip.y + r0 * Math.sin(tip.h + cs * c)
      const a0 = tip.h - cs * c
      const sweep = 3 * Math.PI
      for (let s = 0.4; s <= sweep; s += 0.4) {
        const r = r0 * (1 - (s / sweep) * 0.85)
        curl += `L${r1(cx + r * Math.cos(a0 + cs * s))} ${r1(cy + r * Math.sin(a0 + cs * s))}`
      }
    } else if (gen >= 2 && end < 0.7) {
      out.flowers.push({ x: r1(tip.x), y: r1(tip.y), size: 7 + rnd() * 3, delay: t0 + dur + 0.2 })
    }
    out.branches.push({
      d: `M${r1(x)} ${r1(y)}${pts.slice(1).map((p) => `L${r1(p.x)} ${r1(p.y)}`).join('')}${curl}`,
      delay: t0,
      dur,
      w: g.w,
    })

    // Hojas (alternando lados) y ramas hijas a lo largo de la rama.
    const leafEvery = Math.round(g.leafEvery / STEP)
    const childEvery = g.childEvery ? Math.round(g.childEvery / STEP) : 0
    let side = rnd() < 0.5 ? 1 : -1
    for (let i = 2; i <= n; i++) {
      const p = pts[i]
      const t = t0 + (i / n) * dur
      if (i % leafEvery === 0 && rnd() < 0.85) {
        side = -side
        out.leaves.push({
          x: r1(p.x),
          y: r1(p.y),
          rot: r1(deg(p.h) + side * (42 + rnd() * 22)),
          size: r1((gen <= 1 ? 15 : 10) + rnd() * 8),
          delay: t + 0.3,
        })
      }
      if (childEvery && i >= 5 && i % childEvery === 0 && (gen < 2 || rnd() < 0.6)) {
        side = -side
        const childLen = gen === 0 ? 170 + rnd() * 90 : len * (0.38 + rnd() * 0.17)
        branch(p.x, p.y, p.h + side * (gen === 0 ? 0.55 + rnd() * 0.35 : 0.6 + rnd() * 0.5), childLen, gen + 1, t)
      }
    }
    // Hoja en la punta.
    out.leaves.push({ x: r1(tip.x), y: r1(tip.y), rot: r1(deg(tip.h) - 20 + rnd() * 40), size: r1(9 + rnd() * 6), delay: t0 + dur + 0.2 })
  }

  branch(BG_W / 2, BG_H + 10, -Math.PI / 2 - 0.05, BG_H + 160, 0, 0)
  return out
}
