import { formatDistanceToNow, isPast, isToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Flame, Sparkles, Star } from 'lucide-react'
import {
  useStreak,
  useTodayQuests,
  useXpEarnedToday,
} from '@/features/gamification/hooks'
import {
  useActiveTasksWithDeadline,
  useLastCompletedTask,
  useQuickWinTask,
  useTaskById,
} from '@/features/tasks/hooks'
import type { Task } from '@/types/database.types'

/** Franja Superior de Resumen (InboxTopBar) */
export function InboxTopBar({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  const { data: streak } = useStreak()
  const xpToday = useXpEarnedToday()
  const { data: todayQuests } = useTodayQuests()
  const navigate = useNavigate()
  const { data: activeDeadlines } = useActiveTasksWithDeadline()

  const triageDone = todayQuests?.find((q) => q.type === 'daily_triage')?.completed ?? false
  const priorityQuest = todayQuests?.find((q) => q.type === 'daily_priority')
  const { data: priorityTask } = useTaskById(priorityQuest?.task_id ?? null)

  const overdueCount = activeDeadlines?.filter((t) => isPast(new Date(t.deadline!))).length ?? 0
  const dueTodayCount = activeDeadlines?.filter((t) => isToday(new Date(t.deadline!))).length ?? 0

  return (
    <div className="mb-8 flex flex-col gap-3">
      {/* Grid de Métricas Tácticas */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="flex items-center justify-between rounded-xl border border-border bg-black/30 p-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-tight text-fg-muted/60">Racha</span>
          <span className="flex items-center gap-1 font-display text-sm font-bold text-accent">
            <Flame className="h-4 w-4 animate-bounce text-accent" />
            {streak?.current_streak_days ?? 0} DÍAS
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-black/30 p-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-tight text-fg-muted/60">Progreso</span>
          <span className="flex items-center gap-1 font-mono text-xs font-bold text-sky-400">
            <Sparkles className="h-3.5 w-3.5" />
            +{xpToday ?? 0} XP
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-black/30 p-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-tight text-fg-muted/60">Triage</span>
          <span className={`font-mono text-xs font-bold ${triageDone ? 'text-emerald-400' : 'text-fg-muted/50'}`}>
            {triageDone ? '✓ COMPLETO' : '○ PENDIENTE'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/kanban')}
          className="flex items-center justify-between rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 transition-colors hover:bg-orange-500/20"
        >
          <span className="flex items-center gap-1 font-mono text-xs font-bold uppercase text-orange-400">
            <Star className="h-3.5 w-3.5 fill-orange-400" /> Prioridad
          </span>
          <span className="font-mono text-[10px] font-bold underline text-fg-muted/80">VER GRIMORIO</span>
        </button>
      </div>

      {/* Alerta de Deadlines Urgentes */}
      {(overdueCount > 0 || dueTodayCount > 0) && (
        <button
          type="button"
          onClick={() => navigate('/kanban', { state: { dateFilter: overdueCount > 0 ? 'overdue' : 'today' } })}
          className="flex w-full items-center justify-between rounded-xl border border-warn-border bg-warn-bg px-4 py-2.5 text-xs text-warn-fg transition-transform hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2 font-mono font-medium">
            <AlertTriangle className="h-4 w-4 shrink-0 text-warn-fg" />
            {overdueCount > 0 && <span>{overdueCount} misiones vencidas</span>}
            {overdueCount > 0 && dueTodayCount > 0 && <span>·</span>}
            {dueTodayCount > 0 && <span>{dueTodayCount} vencen hoy</span>}
          </span>
          <span className="font-mono text-[10px] font-bold underline">RESOLVER EN GRIMORIO →</span>
        </button>
      )}

      {/* Tarjeta de Prioridad del Día */}
      {priorityTask && priorityTask.status !== 'done' && (
        <button
          type="button"
          onClick={() => onOpenTask(priorityTask)}
          className="flex w-full items-center gap-3 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-left transition-transform hover:-translate-y-0.5"
        >
          <Star className="h-4 w-4 shrink-0 text-accent fill-accent" />
          <span className="font-mono text-xs font-bold uppercase text-accent">Misión Prioritaria:</span>
          <span className="flex-1 truncate font-display text-sm font-semibold text-fg">{priorityTask.title}</span>
        </button>
      )}
    </div>
  )
}

/** Empty State Motivacional cuando no hay pergaminos pendientes */
export function InboxEmptyState({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  const { data: lastTask } = useLastCompletedTask()
  const { data: quickWin } = useQuickWinTask()

  return (
    <section className="rounded-3xl border-2 border-dashed border-border p-8 text-center bg-surface/20">
      <div className="mb-4 text-5xl">🏰</div>
      <h2 className="mb-1 font-display text-xl font-bold uppercase tracking-wide text-accent">
        ¡Inbox limpio y maza lista para la batalla!
      </h2>
      <p className="mb-8 font-mono text-xs text-fg-muted/60">
        No quedan pergaminos sueltos en tu mesa de trabajo.
      </p>

      <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 text-left md:grid-cols-2">
        {/* Última Victoria */}
        {lastTask && lastTask.completed_at && (
          <div className="rounded-2xl border border-border bg-surface p-4">
            <span className="mb-2 block font-mono text-[10px] uppercase text-fg-muted/60">
              Última Victoria 🏆
            </span>
            <p className="mb-1 truncate font-display text-sm font-bold text-fg">
              {lastTask.title}
            </p>
            <p className="font-mono text-[10px] text-emerald-400">
              COMPLETADO {formatDistanceToNow(new Date(lastTask.completed_at), { addSuffix: true, locale: es }).toUpperCase()}
            </p>
          </div>
        )}

        {/* Quick Win Sugerido */}
        {quickWin && (
          <button
            type="button"
            onClick={() => onOpenTask(quickWin)}
            className="group rounded-2xl border border-border bg-surface p-4 text-left transition-all hover:border-sky-400"
          >
            <span className="mb-2 block font-mono text-[10px] uppercase text-sky-400">
              Quick Win ⚡
            </span>
            <p className="mb-1 truncate font-display text-sm font-bold text-fg group-hover:text-sky-300">
              {quickWin.title}
            </p>
            <p className="font-mono text-[10px] text-fg-muted/60">
              GANA +10 XP RÁPIDO
            </p>
          </button>
        )}
      </div>
    </section>
  )
}
