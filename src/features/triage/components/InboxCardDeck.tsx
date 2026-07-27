import { addDays, format } from 'date-fns'

function quickDeadline(daysFromNow: number): string {
  const d = addDays(new Date(), daysFromNow)
  d.setHours(18, 0, 0, 0)
  return format(d, "yyyy-MM-dd'T'HH:mm")
}

export function InboxCardDeck({
  remainingCount,
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
    <div className="relative">
      {/* Cartas apiladas detrás — sugieren cuántas misiones más esperan */}
      {remainingCount > 2 && (
        <div className="absolute inset-x-4 -top-2 h-full rounded-lg border border-border-card bg-surface-card/60" />
      )}
      {remainingCount > 1 && (
        <div className="absolute inset-x-2 -top-1 h-full rounded-lg border border-border-card bg-surface-card/80" />
      )}

      <div className="relative rounded-lg border border-border-card bg-surface-card p-4">
        <textarea
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          rows={2}
          className="w-full resize-none bg-transparent font-display text-lg font-semibold text-fg outline-none"
          placeholder="Título de la misión"
        />

        <label className="mt-3 flex flex-col gap-1 text-sm text-fg-muted">
          Deadline
          <div className="flex flex-wrap gap-1.5">
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => onDeadlineChange(e.target.value)}
              className="min-w-0 flex-1 rounded-md border border-border bg-surface px-3 py-1.5 text-fg outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => onDeadlineChange(quickDeadline(0))}
              className="rounded-md border border-border px-2.5 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => onDeadlineChange(quickDeadline(1))}
              className="rounded-md border border-border px-2.5 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              Mañana
            </button>
          </div>
        </label>
      </div>
    </div>
  )
}
