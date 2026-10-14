import { useEffect, type ReactNode } from 'react'
import { Check, Timer } from 'lucide-react'
import { useCompleteTask, useSubtasks, useTaskById, useUpdateTask } from '@/features/tasks/hooks'
import { useFocusSession } from '@/features/tasks/focusSessionContext'
import { formatClock, useFocusClock } from '@/features/tasks/useFocusClock'

const PRESET_MINUTES = [15, 25, 45]
const COMPACT_SCALE = 0.8

/**
 * Contenido del Modo Foco: título, temporizador opcional, micro-pasos y
 * "Terminé". Lo comparten la página `/foco/:taskId` y la ventana flotante
 * (`compact`), que leen la misma sesión (`useFocusSession`).
 */
export function FocusSessionView({
  taskId,
  compact = false,
  onCompleted,
  fallback = null,
}: {
  taskId: string
  compact?: boolean
  onCompleted?: () => void
  fallback?: ReactNode
}) {
  const { data: task, isLoading } = useTaskById(taskId)
  const { data: subtasks } = useSubtasks(taskId)
  const updateTask = useUpdateTask()
  const completeTask = useCompleteTask()
  const { endAt, startTimer, stopTimer, end } = useFocusSession()
  const remaining = useFocusClock(endAt)
  const finished = remaining === 0

  // Si la misión se completó por otra vía, la sesión de foco deja de tener sentido.
  const isDone = task?.status === 'done'
  useEffect(() => {
    if (isDone) end()
  }, [isDone, end])

  if (isLoading) {
    return <p className="p-3 font-mono text-xs text-fg-muted">Preparando el foco…</p>
  }
  if (!task || isDone) return <>{fallback}</>

  const steps = subtasks ?? []
  const doneSteps = steps.filter((s) => s.status === 'done').length

  return (
    // zoom 0.8: la ventana flotante es solo Chromium (Document PiP), que lo soporta.
    <div
      className={compact ? 'flex h-full flex-col gap-3 p-3' : 'flex flex-col gap-8'}
      style={compact ? { zoom: COMPACT_SCALE } : undefined}
    >
      <header className="text-center">
        {!compact && (
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">Ahora solo esto</p>
        )}
        <h1
          className={
            compact
              ? 'border-b border-accent/30 pb-2 font-display text-xl font-black leading-snug text-accent drop-shadow-[0_0_8px_rgb(var(--accent-rgb)/0.35)]'
              : 'font-display text-3xl font-black leading-tight text-fg md:text-4xl'
          }
        >
          {task.title}
        </h1>
      </header>

      <section
        aria-label="Temporizador"
        className={`rounded-2xl border border-border bg-surface/60 text-center ${
          compact ? 'p-3' : 'rune-frame p-6'
        }`}
      >
        {remaining === null ? (
          <>
            <p className="mb-3 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted">
              <Timer className="h-4 w-4" aria-hidden="true" /> Bloque de foco (opcional)
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {PRESET_MINUTES.map((min) => (
                <button
                  key={min}
                  type="button"
                  onClick={() => startTimer(min)}
                  className="tactile-chip rounded-full px-5 py-2.5 font-mono text-sm font-bold"
                >
                  {min} min
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p
              role="timer"
              aria-live="off"
              className={`font-mono font-black tabular-nums ${compact ? 'text-4xl' : 'text-6xl'} ${
                finished ? 'text-gold' : 'text-fg'
              }`}
            >
              {formatClock(remaining)}
            </p>
            <p
              className={`mt-1 font-mono uppercase tracking-widest text-fg-muted ${
                compact ? 'text-[10px] leading-tight' : 'text-xs'
              }`}
            >
              {finished ? 'Bloque terminado' : 'Concéntrate solo en el siguiente paso'}
            </p>
            <button
              type="button"
              onClick={stopTimer}
              className={`mt-2 rounded-lg px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                finished
                  ? 'text-fg-muted hover:text-fg'
                  : 'border border-red-600/40 bg-red-600/20 text-red-400 hover:bg-red-600/30'
              }`}
            >
              {finished ? 'Nuevo bloque' : 'Detener'}
            </button>
          </>
        )}
      </section>

      {steps.length > 0 && (
        <section aria-label="Micro-pasos">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-fg-muted">
            Micro-pasos · {doneSteps}/{steps.length}
          </h2>
          <ul className="space-y-2">
            {steps.map((step) => {
              const done = step.status === 'done'
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() =>
                      updateTask.mutate({ id: step.id, patch: { status: done ? 'pending' : 'done' } })
                    }
                    aria-pressed={done}
                    className={`flex w-full items-center gap-3 rounded-xl border border-border bg-surface text-left transition-colors hover:border-accent ${
                      compact ? 'min-h-11 px-3 py-2 text-sm' : 'min-h-12 px-4 py-3'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border ${
                        done ? 'border-accent bg-accent text-accent-fg' : 'border-glass/30'
                      }`}
                    >
                      {done && <Check className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <span className={done ? 'text-fg-muted line-through' : 'text-fg'}>{step.title}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <button
        type="button"
        disabled={completeTask.isPending}
        onClick={() =>
          completeTask.mutate(
            { id: task.id, project_id: task.project_id },
            {
              onSuccess: () => {
                end()
                onCompleted?.()
              },
            },
          )
        }
        className={`btn-prime flex items-center justify-center gap-2 rounded-xl font-display font-black uppercase tracking-widest disabled:opacity-50 ${
          compact ? 'py-1.5 text-[11px]' : 'py-4 text-sm'
        }`}
      >
        <Check className={compact ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden="true" /> Terminé la misión
      </button>
    </div>
  )
}
