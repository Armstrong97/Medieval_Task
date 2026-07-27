import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { TaskSize } from '@/types/database.types'

const WEAPONS: { value: TaskSize; label: string; xp: number; type: string }[] = [
  { value: 'small', label: 'Daga', xp: 10, type: 'small' },
  { value: 'medium', label: 'Espada', xp: 25, type: 'medium' },
  { value: 'large', label: 'Mandoble', xp: 50, type: 'large' },
]

export function WeaponSelector({
  value,
  onChange,
}: {
  value: TaskSize | null
  onChange: (size: TaskSize) => void
}) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted/60">
        Seleccionar Envergadura (Dificultad)
      </p>
      <div className="grid grid-cols-3 gap-3">
        {WEAPONS.map((weapon) => {
          const selected = value === weapon.value
          return (
            <button
              key={weapon.value}
              type="button"
              data-type={weapon.type}
              onClick={() => onChange(weapon.value)}
              className={`weapon-card-btn group flex flex-col items-center gap-2 rounded-xl p-3 text-center ${
                selected ? 'active' : 'hover:border-accent/40'
              }`}
            >
              <img
                src={WEAPON_ICONS[weapon.value]}
                alt={weapon.label}
                className="h-9 w-9 object-contain transition-transform group-hover:scale-110 drop-shadow-[0_0_6px_rgba(0,0,0,0.5)]"
              />
              <span className="font-mono text-[9px] font-black uppercase tracking-tight text-fg">
                {weapon.label} (+{weapon.xp} XP)
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
