import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { format, isPast } from 'date-fns'
import { Check, Link2, Undo2 } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask, useReopenTask, useSubtasks, useUpdateTask } from '@/features/tasks/hooks'
import { useFollowUpForTask, useSendToFollowUp } from '@/features/followups/hooks'
import type { Task } from '@/types/database.types'

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

export function TaskCard({ task, onOpen }: { task: Task; onOpen: (task: Task) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  })
  const { data: categories } = useCategories()
  const [showSubtasks, setShowSubtasks] = useState(false)
  const { data: subtasks } = useSubtasks(task.id)
  const { data: followUp } = useFollowUpForTask(task.id)
  const updateTask = useUpdateTask()
  const completeTask = useCompleteTask()
  const reopenTask = useReopenTask()
  const sendToFollowUp = useSendToFollowUp()

  const category = categories?.find((c) => c.id === task.category_id)
  const overdue =
    task.status !== 'done' && task.deadline !== null && isPast(new Date(task.deadline))
  const doneCount = subtasks?.filter((s) => s.status === 'done').length ?? 0

  return (
    <div
      ref={setNodeRef}
      className={`rounded-md border bg-surface-2 p-3 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_12px_30px_rgba(139,92,246,0.18)] active:translate-y-0 active:scale-[0.99] ${
        task.status === 'in_progress'
          ? 'border-gold/50 shadow-[0_0_14px_rgba(217,169,74,0.25)]'
          : 'border-border'
      } ${task.status === 'done' ? 'opacity-60' : ''} ${isDragging ? 'opacity-50' : ''}`}
      style={{
        ...(transform
          ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 10 }
          : undefined),
        borderLeft: category ? `3px solid ${category.color_hex}` : undefined,
      }}
    >
      <div
        {...listeners}
        {...attributes}
        onClick={() => onOpen(task)}
        className="cursor-grab active:cursor-grabbing"
      >
        <p className={`font-medium text-fg ${task.status === 'done' ? 'line-through' : ''}`}>
          {task.title}
          {task.status === 'done' && (
            <span
              title="Completada"
              className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full align-middle text-[9px] text-accent-fg shadow-[inset_0_0_3px_rgba(0,0,0,0.4)]"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, var(--gold-bright), var(--gold) 70%, #7a5a1e 100%)',
              }}
            >
              ✓
            </span>
          )}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {category && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
              style={{ backgroundColor: `${category.color_hex}1f`, color: category.color_hex }}
            >
              {category.name}
            </span>
          )}
          {task.deadline && (
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-xs ${
                overdue ? 'bg-warn-bg text-warn-fg' : 'bg-surface-2 text-fg-muted'
              }`}
            >
              {format(new Date(task.deadline), 'd MMM')}
            </span>
          )}
          {followUp && (
            <span
              className="inline-flex items-center gap-0.5 rounded-full bg-sky-500/15 px-1.5 py-0.5 text-xs text-sky-500"
              title="Follow-up activo"
            >
              <Link2 className="h-3 w-3" />
            </span>
          )}
        </div>
      </div>

      {subtasks && subtasks.length > 0 && (
        <div className="mt-2 border-t border-border pt-2">
          <button
            type="button"
            onClick={() => setShowSubtasks((v) => !v)}
            className="font-mono text-xs text-fg-muted hover:text-fg"
          >
            {showSubtasks ? '▾' : '▸'} {doneCount}/{subtasks.length} subtareas
          </button>
          {showSubtasks && (
            <ul className="mt-1.5 flex flex-col gap-1">
              {subtasks.map((subtask) => (
                <li key={subtask.id} className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={subtask.status === 'done'}
                    onChange={(e) =>
                      updateTask.mutate({
                        id: subtask.id,
                        patch: { status: e.target.checked ? 'done' : 'pending' },
                      })
                    }
                    className="h-3 w-3 accent-accent"
                  />
                  <span className={subtask.status === 'done' ? 'text-fg-muted line-through' : 'text-fg'}>
                    {subtask.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-2 flex items-center justify-end gap-1.5 border-t border-border pt-2">
        {task.status === 'done' ? (
          <button
            type="button"
            onClick={() => reopenTask.mutate({ id: task.id, project_id: task.project_id })}
            title="Reabrir tarea"
            className="flex items-center gap-1 rounded-full px-2 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() =>
                sendToFollowUp.mutate({
                  taskId: task.id,
                  intervalDays: DEFAULT_FOLLOW_UP_INTERVAL_DAYS,
                  stakeholderName: null,
                })
              }
              title="Enviar a Follow-up (cada 7 días, editable después)"
              className="flex items-center gap-1 rounded-full border border-border px-2 py-1 text-xs text-fg-muted transition-all duration-150 hover:border-sky-500/40 hover:text-sky-500 active:scale-95"
            >
              <Link2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
              title="Completar tarea"
              className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_0_14px_rgba(217,169,74,0.45)] active:scale-95"
            >
              <Check className="h-3.5 w-3.5" /> Completar
            </button>
          </>
        )}
      </div>
    </div>
  )
}
