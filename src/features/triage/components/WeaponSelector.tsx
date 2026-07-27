import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { TaskSize } from '@/types/database.types'

const WEAPONS: { value: TaskSize; label: string; xp: number; color: string }[] = [
  { value: 'small', label: 'Daga', xp: 10, color: 'var(--weapon-daga)' },
  { value: 'medium', label: 'Espada', xp: 25, color: 'var(--weapon-espada)' },
  { value: 'large', label: 'Mandoble', xp: 50, color: 'var(--weapon-mandoble)' },
]

export function WeaponSelector({
  value,
  onChange,
}: {
  value: TaskSize | null
  onChange: (size: TaskSize) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {WEAPONS.map((weapon) => {
        const selected = value === weapon.value
        return (
          <button
            key={weapon.value}
            type="button"
            onClick={() => onChange(weapon.value)}
            className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all duration-150 active:scale-95"
            style={{
              borderColor: selected ? weapon.color : 'var(--border-card)',
              backgroundColor: selected ? `${weapon.color}1a` : 'var(--surface-card)',
              boxShadow: selected ? `0 0 16px ${weapon.color}55` : undefined,
            }}
          >
            <img src={WEAPON_ICONS[weapon.value]} alt={weapon.label} className="h-10 w-10 object-contain" />
            <span className="font-display text-sm font-semibold" style={{ color: selected ? weapon.color : undefined }}>
              {weapon.label}
            </span>
            <span className="font-mono text-xs text-fg-muted">+{weapon.xp} XP</span>
          </button>
        )
      })}
    </div>
  )
}
