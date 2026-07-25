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
    return <p className="text-sm text-fg-muted">Todavía no hay insignias.</p>
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {definitions.map((loot) => {
        const unlock = unlocked?.find((u) => u.loot_definition_id === loot.id)
        const Icon = LOOT_ICONS[loot.icon_name] ?? Sparkles

        return (
          <div
            key={loot.id}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all duration-200 ${
              unlock
                ? 'border-accent/40 bg-accent/5 shadow-[0_0_16px_rgba(217,169,74,0.25)] hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(217,169,74,0.4)]'
                : 'border-dashed border-border opacity-50'
            }`}
          >
            <Icon className={`h-6 w-6 ${unlock ? 'text-accent drop-shadow-[0_0_4px_rgba(217,169,74,0.5)]' : 'text-fg-muted/60'}`} />
            <p className="text-xs font-medium text-fg">{loot.name}</p>
            <p className="text-[11px] text-fg-muted">{loot.description}</p>
          </div>
        )
      })}
    </div>
  )
}
