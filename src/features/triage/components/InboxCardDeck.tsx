import { addDays, format, nextSaturday } from 'date-fns'

function toLocalValue(d: Date): string {
  d.setHours(18, 0, 0, 0)
  return format(d, "yyyy-MM-dd'T'HH:mm")
}

const QUICK_DEADLINES = [
  { label: 'Hoy', value: () => toLocalValue(new Date()) },
  { label: 'Mañana', value: () => toLocalValue(addDays(new Date(), 1)) },
  { label: 'Fin de semana', value: () => toLocalValue(nextSaturday(new Date())) },
  { label: '+1 semana', value: () => toLocalValue(addDays(new Date(), 7)) },
]

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
        className="w-full border-b border-glass/10 bg-transparent pb-2 font-display text-2xl font-bold text-accent outline-none transition-colors focus:border-accent"
      />

      {/* Shortcuts de Fecha / Deadline */}
      <div className="flex flex-wrap gap-2.5">
        {QUICK_DEADLINES.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onDeadlineChange(opt.value())}
            className="rounded-lg border border-border bg-glass/5 px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-all hover:bg-glass/10 hover:text-fg active:scale-95"
          >
            {opt.label}
          </button>
        ))}
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => onDeadlineChange(e.target.value)}
          className="rounded-lg border border-border bg-glass/5 px-3 py-1.5 font-mono text-xs font-bold uppercase text-fg-muted outline-none focus:border-accent"
        />
      </div>
    </div>
  )
}
