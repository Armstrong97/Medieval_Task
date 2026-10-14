import { CalendarClock } from 'lucide-react'
import { showToast } from '@/components/ui/toast-store'
import { useUpdateTask } from '@/features/tasks/hooks'
import { rescheduleIso, shiftDeadlineIso } from '@/utils/datetime'
import type { Task } from '@/types/database.types'

const FROM_NOW = [
  { label: 'Mañana', days: 1, toast: 'Reprogramada para mañana' },
  { label: '+1 semana', days: 7, toast: 'Reprogramada para dentro de una semana' },
] as const

const FROM_DEADLINE = [
  { label: '+1 día', days: 1, toast: 'Movida un día' },
  { label: '+1 semana', days: 7, toast: 'Movida una semana' },
] as const

// Reprogramar de un toque. Mantiene la hora original; el tono es de
// "reagendar", no de fracaso (diseño sin culpa visual).
// mode "from-now": para vencidas (a partir de hoy). "from-deadline": para
// el calendario (a partir de la fecha que ya tiene).
export function RescheduleButtons({
  task,
  mode = 'from-now',
  label = 'Reprogramar:',
}: {
  task: Pick<Task, 'id' | 'deadline'>
  mode?: 'from-now' | 'from-deadline'
  label?: string
}) {
  const update = useUpdateTask()
  const options = mode === 'from-now' ? FROM_NOW : FROM_DEADLINE

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 font-mono text-xs text-fg-muted">
        <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt.label}
          type="button"
          disabled={update.isPending}
          onClick={(e) => {
            e.stopPropagation()
            update.mutate(
              { id: task.id, patch: {
                  deadline:
                    mode === 'from-deadline' && task.deadline
                      ? shiftDeadlineIso(task.deadline, opt.days)
                      : rescheduleIso(opt.days, task.deadline),
                } },
              { onSuccess: () => showToast({ title: opt.toast }) },
            )
          }}
          className="rounded-full border border-border-glow px-3 py-1.5 font-mono text-xs font-bold uppercase text-rune transition-colors hover:bg-rune/10 disabled:opacity-50"
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
