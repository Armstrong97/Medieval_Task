import { Plus } from 'lucide-react'

const SLOT_ROMAN = ['I', 'II', 'III']

export function EmptySlotCard({
  slot,
  onEquip,
}: {
  slot: number
  onEquip: () => void
}) {
  return (
    <article className="empty-slot-card group flex h-[420px] flex-col items-center justify-center rounded-2xl p-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-border transition-colors group-hover:border-accent">
        <Plus className="h-8 w-8 text-fg-muted/30 transition-all group-hover:scale-110 group-hover:text-accent" />
      </div>
      <h3 className="mb-2 font-display text-xl text-fg-muted/50 group-hover:text-fg">
        Slot {SLOT_ROMAN[slot - 1] ?? slot} Disponible
      </h3>
      <p className="mb-8 max-w-[200px] font-mono text-xs text-fg-muted/40">
        No hay misiones equipadas en este flanco táctico.
      </p>
      <button
        type="button"
        onClick={onEquip}
        className="rounded-full border border-accent px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-accent transition-all hover:bg-accent hover:text-accent-fg active:scale-95"
      >
        Equipar Misión
      </button>
    </article>
  )
}
