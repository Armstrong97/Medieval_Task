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
    <div className="space-y-4">
      {/* Indicadores Numéricos */}
      <div className="flex items-end justify-between px-1">
        <span className="font-display text-lg font-bold tracking-tight text-red-500">
          VIDA DEL JEFE
        </span>
        <span className="font-mono text-xl font-black text-fg">
          {currentHp} / {totalHp} HP
        </span>
      </div>

      {/* Barra de Salud Masiva */}
      <div className="boss-hp-container relative h-10 w-full overflow-hidden rounded-xl bg-black/60">
        <div
          className="boss-hp-fill h-full"
          style={{ width: `${Math.max(0, Math.min(100, percentRemaining))}%` }}
        />
        {/* Marcas de Fase (75%, 50%, 25%) */}
        {BOSS_PHASES.filter((p) => p > 0).map((phase) => (
          <div
            key={phase}
            className="phase-mark-line"
            style={{ left: `${phase}%` }}
          />
        ))}
      </div>

      {/* Cofres de Loot de Fase */}
      <div className="flex justify-between px-2 pt-1">
        {BOSS_PHASES.map((phase) => {
          const claimed = phasesClaimed.includes(phase)
          const isReached = percentRemaining <= phase
          const isActive = claimed || isReached

          return (
            <div
              key={phase}
              className={`chest-icon-phase flex flex-col items-center gap-1.5 ${
                isActive ? 'active' : ''
              }`}
            >
              <img
                src={LOOT_ICONS.chest_phase}
                alt={phase === 0 ? 'Victoria final' : `Fase ${phase}%`}
                className="h-8 w-8 object-contain"
              />
              <span className="font-mono text-[9px] uppercase tracking-widest text-fg-muted/70">
                {phase === 0 ? 'Victoria' : `${phase}% Loot`}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
