import { Plus } from 'lucide-react'

const SLOT_NUMERALS = ['I', 'II', 'III']

export function EmptySlotCard({ slot, onEquip }: { slot: number; onEquip: () => void }) {
  return (
    <button
      type="button"
      onClick={onEquip}
      className="flex min-h-[176px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border p-4 text-center transition-all duration-150 hover:border-accent/40 hover:bg-surface/40"
    >
      <span className="font-display text-sm tracking-wide text-fg-muted">
        Slot {SLOT_NUMERALS[slot - 1] ?? slot} Disponible
      </span>
      <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-fg-muted transition-colors">
        <Plus className="h-3.5 w-3.5" /> Equipar Misión
      </span>
    </button>
  )
}
