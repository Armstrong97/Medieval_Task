import type { TaskLink } from '@/types/database.types'

// Misiones conectadas (en cualquier dirección) a la de partida, incluida ella.
export function chainComponent(startId: string, links: TaskLink[]): Set<string> {
  const seen = new Set([startId])
  const queue = [startId]
  while (queue.length > 0) {
    const id = queue.shift() as string
    for (const l of links) {
      const other = l.from_task_id === id ? l.to_task_id : l.to_task_id === id ? l.from_task_id : null
      if (other && !seen.has(other)) {
        seen.add(other)
        queue.push(other)
      }
    }
  }
  return seen
}

// Todas las cadenas (componentes conexos con al menos un enlace).
export function allChains(links: TaskLink[]): Set<string>[] {
  const chains: Set<string>[] = []
  const covered = new Set<string>()
  for (const l of links) {
    if (covered.has(l.from_task_id)) continue
    const comp = chainComponent(l.from_task_id, links)
    comp.forEach((id) => covered.add(id))
    chains.push(comp)
  }
  return chains
}

// Nivel de cada misión: 0 si no espera a nadie, si no 1 + el mayor de sus
// predecesoras. La DB garantiza que no hay ciclos (task_links_validate).
export function chainLevels(ids: Set<string>, links: TaskLink[]): string[][] {
  const memo = new Map<string, number>()
  const level = (id: string): number => {
    const cached = memo.get(id)
    if (cached !== undefined) return cached
    const preds = links.filter((l) => l.to_task_id === id && ids.has(l.from_task_id))
    const value = preds.length === 0 ? 0 : 1 + Math.max(...preds.map((l) => level(l.from_task_id)))
    memo.set(id, value)
    return value
  }
  const levels: string[][] = []
  for (const id of ids) {
    const n = level(id)
    ;(levels[n] ??= []).push(id)
  }
  return levels
}

// Misiones que dependen (directa o indirectamente) de la de partida, sin ella.
export function chainDescendants(startId: string, links: TaskLink[]): Set<string> {
  const seen = new Set<string>()
  const queue = [startId]
  while (queue.length > 0) {
    const id = queue.shift() as string
    for (const l of links) {
      if (l.from_task_id === id && !seen.has(l.to_task_id)) {
        seen.add(l.to_task_id)
        queue.push(l.to_task_id)
      }
    }
  }
  return seen
}
