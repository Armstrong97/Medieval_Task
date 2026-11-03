// Geometría de la enredadera del menú (ver Vine.tsx). Determinista: misma semilla, mismo dibujo.
// Tallo sinuoso con ramas que se arquean, terminan en zarcillo o flor, y hojas con nervadura.
export const VINE_W = 64
export const VINE_H = 1000
const SX = 44 // eje del tallo (pegado al borde derecho del panel)
const DUR = 1.6 // segundos que tarda el tallo en bajar; las ramas brotan al pasar por su altura

export interface VineBranch {
  d: string
  delay: number
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
  stem: string
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

const stemX = (y: number) => SX + 5 * Math.sin(y / 46) + 2 * Math.sin(y / 17)
const r1 = (n: number) => Math.round(n * 10) / 10
const deg = (rad: number) => (rad * 180) / Math.PI

export function buildVine(): VineData {
  const rnd = mulberry32(7)
  const branches: VineBranch[] = []
  const leaves: VineLeaf[] = []
  const flowers: VineFlower[] = []

  let stem = `M${r1(stemX(0))} 0`
  for (let y = 6; y <= VINE_H; y += 6) stem += `L${r1(stemX(y))} ${y}`

  const count = 16
  for (let i = 0; i < count; i++) {
    const y0 = 34 + i * 62 + rnd() * 10
    const side = i % 3 === 2 ? 1 : -1 // casi todo crece hacia dentro del panel
    const len = side < 0 ? 24 + rnd() * 14 : 8 + rnd() * 5
    const x0 = stemX(y0)
    const delay = (y0 / VINE_H) * DUR + 0.1

    const p0 = [x0, y0]
    const p1 = [x0 + side * len * 0.35, y0 - 10 - rnd() * 6]
    const p2 = [x0 + side * len * 0.8, y0 - 2 + rnd() * 6]
    const p3 = [x0 + side * len, y0 + 8 + rnd() * 10]
    const bez = (t: number) => {
      const u = 1 - t
      return [0, 1].map(
        (k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k],
      )
    }
    const tan = (t: number) => {
      const u = 1 - t
      const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0])
      const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1])
      return Math.atan2(dy, dx)
    }

    let d = `M${r1(p0[0])} ${r1(p0[1])}C${r1(p1[0])} ${r1(p1[1])} ${r1(p2[0])} ${r1(p2[1])} ${r1(p3[0])} ${r1(p3[1])}`

    // Remate: flor en una de cada 4 ramas largas; zarcillo en espiral en las demás.
    if (side < 0 && i % 4 === 1) {
      flowers.push({ x: r1(p3[0]), y: r1(p3[1]), size: 5 + rnd() * 1.5, delay: delay + 0.9 })
    } else {
      const r0 = side < 0 ? 5.5 : 3.5
      const cx = p3[0]
      const cy = p3[1] + r0
      const sweep = 3 * Math.PI
      for (let s = 0.4; s <= sweep; s += 0.4) {
        const r = r0 * (1 - (s / sweep) * 0.85)
        const a = -Math.PI / 2 - (side < 0 ? s : -s)
        d += `L${r1(cx + r * Math.cos(a))} ${r1(cy + r * Math.sin(a))}`
      }
    }
    branches.push({ d, delay })

    // Hojas sobre la rama (alternando lados) y una en el tallo.
    const tList = side < 0 ? [0.35, 0.68] : [0.6]
    tList.forEach((t, k) => {
      const [bx, by] = bez(t)
      const flip = (i + k) % 2 === 0 ? -1 : 1
      leaves.push({
        x: r1(bx),
        y: r1(by),
        rot: r1(deg(tan(t)) + flip * (42 + rnd() * 14)),
        size: r1(10 + rnd() * 5),
        delay: delay + 0.35 + t * 0.6 + k * 0.1,
      })
    })
    const sy = y0 + 31
    leaves.push({
      x: r1(stemX(sy)),
      y: sy,
      rot: r1(side < 0 ? 200 + rnd() * 20 : -20 - rnd() * 20),
      size: r1(8 + rnd() * 3),
      delay: (sy / VINE_H) * DUR + 0.25,
    })
  }
  return { stem, branches, leaves, flowers }
}
