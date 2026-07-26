import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { isPast, isToday } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Flame, Sparkles, Star, Trophy, Zap } from 'lucide-react'
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

function StatusStrip() {
  const { data: streak } = useStreak()
  const xpToday = useXpEarnedToday()
  const { data: todayQuests } = useTodayQuests()
  const triageDone = todayQuests?.find((q) => q.type === 'daily_triage')?.completed ?? false

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm">
      <span className="flex items-center gap-1.5 font-mono text-fg">
        <Flame className="h-4 w-4 text-accent" />
        {streak?.current_streak_days ?? 0} <span className="text-fg-muted">días</span>
      </span>
      <span className="flex items-center gap-1.5 font-mono text-fg">
        <Sparkles className="h-4 w-4 text-gold-bright" />+{xpToday ?? 0} <span className="text-fg-muted">XP hoy</span>
      </span>
      <span
        className={`flex items-center gap-1.5 ${triageDone ? 'text-emerald-500' : 'text-fg-muted'}`}
      >
        {triageDone ? '✓' : '○'} Triage de hoy
      </span>
    </div>
  )
}

function PriorityTodayCard({ onOpen }: { onOpen: (task: Task) => void }) {
  const { data: todayQuests } = useTodayQuests()
  const priorityQuest = todayQuests?.find((q) => q.type === 'daily_priority')
  const { data: task } = useTaskById(priorityQuest?.task_id ?? null)

  if (!priorityQuest || !task || task.status === 'done') return null

  return (
    <button
      type="button"
      onClick={() => onOpen(task)}
      className="flex w-full items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-4 py-2.5 text-left text-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
    >
      <Star className="h-4 w-4 shrink-0 text-accent" />
      <span className="text-fg-muted">Prioridad de hoy:</span>
      <span className="flex-1 truncate font-medium text-fg">{task.title}</span>
    </button>
  )
}

function DeadlineCounters() {
  const navigate = useNavigate()
  const { data: tasks } = useActiveTasksWithDeadline()

  const overdue = tasks?.filter((t) => isPast(new Date(t.deadline!))).length ?? 0
  const dueToday = tasks?.filter((t) => isToday(new Date(t.deadline!))).length ?? 0

  if (overdue === 0 && dueToday === 0) return null

  return (
    <button
      type="button"
      onClick={() =>
        navigate('/kanban', { state: { dateFilter: overdue > 0 ? 'overdue' : 'today' } })
      }
      className="flex w-full items-center justify-between gap-2 rounded-lg border border-warn-border bg-warn-bg px-4 py-2.5 text-left text-sm text-warn-fg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="flex items-center gap-1.5">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        {overdue > 0 && <span>{overdue} vencida{overdue === 1 ? '' : 's'}</span>}
        {overdue > 0 && dueToday > 0 && <span>·</span>}
        {dueToday > 0 && <span>{dueToday} vence{dueToday === 1 ? '' : 'n'} hoy</span>}
      </span>
      <span className="shrink-0 underline underline-offset-2">Ver en Kanban →</span>
    </button>
  )
}

/** Franja de estado + prioridad del día + contador de deadlines. Siempre visible. */
export function InboxTopBar({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <StatusStrip />
      <PriorityTodayCard onOpen={onOpenTask} />
      <DeadlineCounters />
    </div>
  )
}

function pickEmptyStateMessage(streakDays: number, triageDone: boolean): string {
  if (triageDone && streakDays >= 7) {
    return `🔥 Racha de ${streakDays} días y encima ya hiciste el triage de hoy. Sos una máquina.`
  }
  if (triageDone) return 'Inbox vacío y triage de hoy hecho — bien ahí.'
  if (streakDays >= 3) return `Inbox vacío. Llevás ${streakDays} días de racha, no la cortes.`
  return 'Inbox vacío. Todo tranquilo por acá.'
}

function LastWinCard() {
  const { data: task } = useLastCompletedTask()
  if (!task || !task.completed_at) return null

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm">
      <Trophy className="h-4 w-4 shrink-0 text-gold-bright" />
      <span className="text-fg-muted">Última victoria:</span>
      <span className="flex-1 truncate text-fg">{task.title}</span>
      <span className="shrink-0 font-mono text-xs text-fg-muted">
        {formatDistanceToNow(new Date(task.completed_at), { addSuffix: true, locale: es })}
      </span>
    </div>
  )
}

function QuickWinCard({ onOpen }: { onOpen: (task: Task) => void }) {
  const { data: task } = useQuickWinTask()
  if (!task) return null

  return (
    <button
      type="button"
      onClick={() => onOpen(task)}
      className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2.5 text-left text-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/40"
    >
      <Zap className="h-4 w-4 shrink-0 text-fg-muted" />
      <span className="text-fg-muted">Quick win:</span>
      <span className="flex-1 truncate text-fg">{task.title}</span>
      <span className="shrink-0 font-mono text-xs text-gold-bright">+10 XP</span>
    </button>
  )
}

/** Contenido para cuando el inbox está vacío: mensaje con personalidad + última victoria + quick win. */
export function InboxEmptyState({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  const { data: streak } = useStreak()
  const { data: todayQuests } = useTodayQuests()
  const triageDone = todayQuests?.find((q) => q.type === 'daily_triage')?.completed ?? false

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-fg-muted">
        {pickEmptyStateMessage(streak?.current_streak_days ?? 0, triageDone)}
      </p>
      <LastWinCard />
      <QuickWinCard onOpen={onOpenTask} />
    </div>
  )
}
