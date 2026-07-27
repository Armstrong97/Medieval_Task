import { addDays, format } from 'date-fns'

function getQuickDeadlineIso(daysFromNow: number): string {
  const d = addDays(new Date(), daysFromNow)
  d.setHours(18, 0, 0, 0)
  return format(d, "yyyy-MM-dd'T'HH:mm")
}

export function InboxCardDeck({
  title,
  onTitleChange,
  deadline,
  onDeadlineChange,
}: {
  remainingCount: number
  title: string
  onTitleChange: (title: string) => void
  deadline: string
  onDeadlineChange: (deadline: string) => void
}) {
  return (
    <div className="space-y-4">
      {/* Título de la Misión con Borde de Tinta */}
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Título de la misión..."
        className="w-full border-b border-white/10 bg-transparent pb-2 font-display text-2xl font-bold text-accent outline-none transition-colors focus:border-accent"
      />

      {/* Shortcuts de Fecha / Deadline */}
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => onDeadlineChange(getQuickDeadlineIso(0))}
          className="rounded-lg border border-border bg-white/5 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-fg-muted transition-all hover:bg-white/10 hover:text-fg active:scale-95"
        >
          Hoy
        </button>
        <button
          type="button"
          onClick={() => onDeadlineChange(getQuickDeadlineIso(1))}
          className="rounded-lg border border-border bg-white/5 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-fg-muted transition-all hover:bg-white/10 hover:text-fg active:scale-95"
        >
          Mañana
        </button>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => onDeadlineChange(e.target.value)}
          className="rounded-lg border border-border bg-white/5 px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-fg-muted outline-none focus:border-accent"
        />
      </div>
    </div>
  )
}
