import { useEffect, useRef, useState } from 'react'
import {
  useCategoryXp,
  useClassRanks,
  useLootDefinitions,
  useUnlockedLoot,
} from '@/features/gamification/hooks'
import { useCategories } from '@/features/projects/hooks'
import { AchievementCelebration, type Achievement } from '@/components/ui/AchievementCelebration'

const SEEN_RANKS_KEY = 'rpg_seen_rank_ids'
const SEEN_LOOT_KEY = 'rpg_seen_loot_ids'

function readSeen(key: string): Set<string> {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

function writeSeen(key: string, ids: Set<string>) {
  window.localStorage.setItem(key, JSON.stringify([...ids]))
}

/**
 * Componente sin UI propia (mas alla de la celebracion) montado una vez en Layout.
 * Compara rangos/loot actuales contra lo ultimo visto en localStorage; lo nuevo
 * dispara AchievementCelebration en cola, uno a la vez.
 */
export function AchievementWatcher() {
  const { data: categoryXp } = useCategoryXp()
  const { data: classRanks } = useClassRanks()
  const { data: categories } = useCategories()
  const { data: unlockedLoot } = useUnlockedLoot()
  const { data: lootDefinitions } = useLootDefinitions()

  const primed = useRef(false)
  const [queue, setQueue] = useState<Achievement[]>([])

  useEffect(() => {
    if (!categoryXp || !classRanks || !categories || !unlockedLoot || !lootDefinitions) return

    const seenRanks = readSeen(SEEN_RANKS_KEY)
    const seenLoot = readSeen(SEEN_LOOT_KEY)
    const newAchievements: Achievement[] = []

    for (const xp of categoryXp) {
      if (!xp.current_rank_id) continue
      if (!seenRanks.has(xp.current_rank_id)) {
        if (primed.current) {
          const rank = classRanks.find((r) => r.id === xp.current_rank_id)
          const category = categories.find((c) => c.id === xp.category_id)
          if (rank && category) {
            newAchievements.push({
              id: `rank-${xp.current_rank_id}`,
              kicker: `Nuevo rango — ${category.name}`,
              title: rank.rank_name,
              description: `Tu clase ${category.class_name} evolucionó en ${category.name}.`,
              icon: '⚔',
            })
          }
        }
        seenRanks.add(xp.current_rank_id)
      }
    }

    for (const loot of unlockedLoot) {
      if (!seenLoot.has(loot.loot_definition_id)) {
        if (primed.current) {
          const def = lootDefinitions.find((d) => d.id === loot.loot_definition_id)
          if (def) {
            newAchievements.push({
              id: `loot-${loot.id}`,
              kicker: 'Loot desbloqueado',
              title: def.name,
              description: def.description,
              icon: '🜂',
            })
          }
        }
        seenLoot.add(loot.loot_definition_id)
      }
    }

    writeSeen(SEEN_RANKS_KEY, seenRanks)
    writeSeen(SEEN_LOOT_KEY, seenLoot)
    primed.current = true

    if (newAchievements.length > 0) {
      setQueue((prev) => [...prev, ...newAchievements])
    }
  }, [categoryXp, classRanks, categories, unlockedLoot, lootDefinitions])

  if (queue.length === 0) return null

  return (
    <AchievementCelebration
      achievement={queue[0]}
      onDone={() => setQueue((prev) => prev.slice(1))}
    />
  )
}
