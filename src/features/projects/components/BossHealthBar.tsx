import { BOSS_PHASES } from '@/features/projects/api'
import { LOOT_ICONS } from '@/utils/rpgAssets'

export function BossHealthBar({
  totalHp,
  currentHp,
  percentRemaining,
  phasesClaimed,
}: {
  totalHp: number
  currentHp: number
  percentRemaining: number
  phasesClaimed: number[]
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-sm uppercase tracking-wide text-fg-muted">HP del jefe</span>
        <span className="font-mono text-lg font-semibold text-fg">
          {currentHp} / {totalHp} HP
        </span>
      </div>
      <div className="relative mt-2 h-4 overflow-hidden rounded-full border border-border-card bg-surface-2">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{
            width: `${percentRemaining}%`,
            background: 'linear-gradient(90deg, var(--hp-critical), var(--hp-full))',
            boxShadow: '0 0 12px var(--hp-full)',
          }}
        />
        {BOSS_PHASES.filter((p) => p > 0).map((phase) => (
          <div
            key={phase}
            className="absolute top-0 h-full w-px bg-black/25"
            style={{ left: `${phase}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between px-0.5">
        {BOSS_PHASES.map((phase) => {
          const claimed = phasesClaimed.includes(phase)
          return (
            <img
              key={phase}
              src={LOOT_ICONS.chest_phase}
              alt={phase === 0 ? 'Jefe derrotado' : `Fase ${phase}% de HP`}
              title={phase === 0 ? 'Jefe derrotado' : `Fase ${phase}% de HP`}
              className={`h-6 w-6 object-contain transition-all duration-300 ${
                claimed ? 'opacity-100 drop-shadow-[0_0_6px_var(--phase-shield)]' : 'opacity-30 grayscale'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
