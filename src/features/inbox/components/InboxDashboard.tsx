import { isPast, isToday } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { AlertTriangle, Castle, Zap } from 'lucide-react'
import { useActiveTasksWithDeadline, useQuickWinTask } from '@/features/tasks/hooks'
import type { Task } from '@/types/database.types'

/** Una sola línea de aviso, solo si hay plazos vencidos o que vencen hoy. */
export function InboxAlert() {
  const navigate = useNavigate()
  const { data: activeDeadlines } = useActiveTasksWithDeadline()

  const overdueCount = activeDeadlines?.filter((t) => isPast(new Date(t.deadline!))).length ?? 0
  const dueTodayCount = activeDeadlines?.filter((t) => isToday(new Date(t.deadline!))).length ?? 0
  if (overdueCount === 0 && dueTodayCount === 0) return null

  return (
    <button
      type="button"
      onClick={() => navigate('/kanban', { state: { dateFilter: overdueCount > 0 ? 'overdue' : 'today' } })}
      className="mb-6 flex w-full items-center justify-between gap-3 rounded-xl border border-warn-border bg-warn-bg px-4 py-2.5 text-left text-sm text-warn-fg transition-transform hover:-translate-y-0.5"
    >
      <span className="flex items-center gap-2 font-medium">
        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
        {overdueCount > 0 && <span>{overdueCount} por rescatar</span>}
        {overdueCount > 0 && dueTodayCount > 0 && <span aria-hidden="true">·</span>}
        {dueTodayCount > 0 && <span>{dueTodayCount} vencen hoy</span>}
      </span>
      <span className="shrink-0 font-mono text-xs font-bold underline">Ver →</span>
    </button>
  )
}

/** Inbox vacío: una línea, el Quick Win (accionable) y el camino de vuelta a Combate. */
export function InboxEmptyState({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  const { data: quickWin } = useQuickWinTask()

  return (
    <section className="panel-solid rounded-2xl p-6 text-center">
      <Castle className="mx-auto mb-3 h-10 w-10 text-accent" aria-hidden="true" />
      <h2 className="font-display text-xl font-bold text-accent">Inbox limpio</h2>
      <p className="mt-1 text-sm text-fg-muted">No tienes nada por ordenar.</p>

      {quickWin && (
        <button
          type="button"
          onClick={() => onOpenTask(quickWin)}
          className="group mx-auto mt-5 block w-full max-w-sm rounded-xl border border-border bg-surface-2 p-4 text-left transition-colors hover:border-rune"
        >
          <span className="mb-1 flex items-center gap-1 font-mono text-xs font-bold uppercase text-rune">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" /> Quick win · +10 XP
          </span>
          <span className="block truncate font-display text-sm font-bold text-fg group-hover:text-rune">{quickWin.title}</span>
        </button>
      )}

      <Link to="/" className="mt-5 inline-block font-mono text-xs font-bold uppercase tracking-wider text-accent underline underline-offset-4">
        Ir a Combate
      </Link>
    </section>
  )
}
