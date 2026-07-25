import { useState } from 'react'
import { format, isPast } from 'date-fns'
import { useFollowUps, useRegisterFollowUpContact } from '@/features/followups/hooks'
import { useCategories } from '@/features/projects/hooks'
import { useTasksByIds } from '@/features/tasks/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

export function FollowUpsPage() {
  const { data: followUps, isLoading } = useFollowUps()
  const { data: categories } = useCategories()
  const { data: tasks } = useTasksByIds(followUps?.map((f) => f.task_id) ?? [])
  const registerContact = useRegisterFollowUpContact()
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const rows = (followUps ?? [])
    .map((followUp) => ({ followUp, task: tasks?.find((t) => t.id === followUp.task_id) }))
    .filter((row) => row.task && row.task.status !== 'done')

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Follow-ups activos
      </h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Ordenados por próximo recordatorio.
      </p>

      {isLoading && <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-500">Cargando…</p>}

      {!isLoading && rows.length === 0 && (
        <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-500">
          No hay follow-ups activos. Marcá una tarea como dependiente de un stakeholder desde su modal.
        </p>
      )}

      <ul className="mt-4 flex flex-col gap-2">
        {rows.map(({ followUp, task }) => {
          const category = categories?.find((c) => c.id === task!.category_id)
          const due = isPast(new Date(followUp.next_reminder_at))
          return (
            <li
              key={followUp.id}
              className={`flex items-center gap-3 rounded-lg border p-3 ${
                due
                  ? 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40'
                  : 'border-neutral-200 dark:border-neutral-800'
              }`}
            >
              <button
                type="button"
                onClick={() => setEditingTask(task!)}
                className="flex-1 text-left"
              >
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {task!.title}
                </p>
                <p className="mt-0.5 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
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
                className="shrink-0 rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
              >
                Registrar contacto
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
