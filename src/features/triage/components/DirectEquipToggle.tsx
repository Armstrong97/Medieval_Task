import { Swords } from 'lucide-react'

export function DirectEquipToggle({
  disabled,
  onClick,
}: {
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={disabled ? 'Los 3 slots de combate están ocupados' : 'Guardar y equipar de inmediato en el Battle HUD'}
      className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-accent/40 px-3 py-1.5 text-sm font-medium text-accent transition-all duration-150 hover:bg-accent/10 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-transparent"
    >
      <Swords className="h-4 w-4" /> Equipar en Combate
    </button>
  )
}
