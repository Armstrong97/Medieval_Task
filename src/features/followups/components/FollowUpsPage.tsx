import { useState } from 'react'
import { format, isPast } from 'date-fns'
import { Check } from 'lucide-react'
import { useFollowUps, useRegisterFollowUpContact } from '@/features/followups/hooks'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask, useTasksByIds } from '@/features/tasks/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

export function FollowUpsPage() {
  const { data: followUps, isLoading } = useFollowUps()
  const { data: categories } = useCategories()
  const { data: tasks } = useTasksByIds(followUps?.map((f) => f.task_id) ?? [])
  const registerContact = useRegisterFollowUpContact()
  const completeTask = useCompleteTask()
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const rows = (followUps ?? [])
    .map((followUp) => ({ followUp, task: tasks?.find((t) => t.id === followUp.task_id) }))
    .filter((row) => row.task && row.task.status !== 'done')

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="font-display text-lg font-semibold tracking-tight text-fg">
        Follow-ups activos
      </h1>
      <p className="mt-1 text-sm text-fg-muted">Ordenados por próximo recordatorio.</p>

      {isLoading && <p className="mt-4 text-sm text-fg-muted">Cargando…</p>}

      {!isLoading && rows.length === 0 && (
        <p className="mt-4 text-sm text-fg-muted">
          No hay follow-ups activos. Enviá una tarea a Follow-up desde su tarjeta en el Kanban o
          desde su modal.
        </p>
      )}

      <ul className="mt-4 flex flex-col gap-2">
        {rows.map(({ followUp, task }) => {
          const category = categories?.find((c) => c.id === task!.category_id)
          const due = isPast(new Date(followUp.next_reminder_at))
          return (
            <li
              key={followUp.id}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${
                due ? 'border-warn-border bg-warn-bg' : 'border-border bg-surface'
              }`}
            >
              <button
                type="button"
                onClick={() => setEditingTask(task!)}
                className="flex-1 text-left"
              >
                <p className="text-sm font-medium text-fg">{task!.title}</p>
                <p className="mt-0.5 flex items-center gap-2 font-mono text-xs text-fg-muted">
                  {category && (
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: category.color_hex }}
                      />
                      {category.name}
                    </span>
                  )}
                  {followUp.stakeholder_name && <span>· {followUp.stakeholder_name}</span>}
                  <span>· próximo: {format(new Date(followUp.next_reminder_at), 'd MMM')}</span>
                </p>
              </button>
              <button
                type="button"
                onClick={() => registerContact.mutate(followUp.id)}
                className="shrink-0 rounded-md border border-border px-2 py-1 text-xs text-fg-muted transition-all duration-150 hover:border-accent/40 hover:bg-surface-2 hover:text-accent active:scale-95"
              >
                Registrar contacto
              </button>
              <button
                type="button"
                onClick={() =>
                  completeTask.mutate({ id: task!.id, project_id: task!.project_id })
                }
                title="Completar tarea"
                className="flex shrink-0 items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_0_14px_rgba(217,169,74,0.45)] active:scale-95"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
            </li>
          )
        })}
      </ul>

      {editingTask && (
        <TaskModal
          task={editingTask}
          defaultProjectId={editingTask.project_id}
          defaultKanbanColumnId=""
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
}
