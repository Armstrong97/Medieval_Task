import { Crown, Flame, Sparkles, TrendingUp, type LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import { useLootDefinitions, useUnlockedLoot } from '@/features/gamification/hooks'

const LOOT_ICONS: Record<string, ComponentType<LucideProps>> = {
  flame: Flame,
  sparkles: Sparkles,
  'trending-up': TrendingUp,
  crown: Crown,
}

export function LootShowcase() {
  const { data: definitions } = useLootDefinitions()
  const { data: unlocked } = useUnlockedLoot()

  if (!definitions || definitions.length === 0) {
    return <p className="text-sm text-neutral-400 dark:text-neutral-500">Todavía no hay insignias.</p>
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {definitions.map((loot) => {
        const unlock = unlocked?.find((u) => u.loot_definition_id === loot.id)
        const Icon = LOOT_ICONS[loot.icon_name] ?? Sparkles

        return (
          <div
            key={loot.id}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center ${
              unlock
                ? 'border-neutral-200 dark:border-neutral-800'
                : 'border-dashed border-neutral-200 opacity-50 dark:border-neutral-800'
            }`}
          >
            <Icon
              className={`h-6 w-6 ${unlock ? 'text-amber-500' : 'text-neutral-300 dark:text-neutral-700'}`}
            />
            <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{loot.name}</p>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">{loot.description}</p>
          </div>
        )
      })}
    </div>
  )
}
