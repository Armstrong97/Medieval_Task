import { CalendarClock } from 'lucide-react'
import { showToast } from '@/components/ui/toast-store'
import { useUpdateTask } from '@/features/tasks/hooks'
import { rescheduleIso } from '@/utils/datetime'
import type { Task } from '@/types/database.types'

const OPTIONS = [
  { label: 'Mañana', days: 1, toast: 'Reprogramada para mañana' },
  { label: '+1 semana', days: 7, toast: 'Reprogramada para dentro de una semana' },
] as const

// Reprogramar de un toque. Mantiene la hora original; el tono es de
// "reagendar", no de fracaso (diseño sin culpa visual).
export function RescheduleButtons({ task }: { task: Pick<Task, 'id' | 'deadline'> }) {
  const update = useUpdateTask()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 font-mono text-xs text-fg-muted">
        <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> Reprogramar:
      </span>
      {OPTIONS.map((opt) => (
        <button
          key={opt.label}
          type="button"
          disabled={update.isPending}
          onClick={(e) => {
            e.stopPropagation()
            update.mutate(
              { id: task.id, patch: { deadline: rescheduleIso(opt.days, task.deadline) } },
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
