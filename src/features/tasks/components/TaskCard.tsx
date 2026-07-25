import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { format, isPast } from 'date-fns'
import { Link2 } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useSubtasks, useUpdateTask } from '@/features/tasks/hooks'
import { useFollowUpForTask } from '@/features/followups/hooks'
import type { Task } from '@/types/database.types'

export function TaskCard({ task, onOpen }: { task: Task; onOpen: (task: Task) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  })
  const { data: categories } = useCategories()
  const [showSubtasks, setShowSubtasks] = useState(false)
  const { data: subtasks } = useSubtasks(task.id)
  const { data: followUp } = useFollowUpForTask(task.id)
  const updateTask = useUpdateTask()

  const category = categories?.find((c) => c.id === task.category_id)
  const overdue =
    task.status !== 'done' && task.deadline !== null && isPast(new Date(task.deadline))
  const doneCount = subtasks?.filter((s) => s.status === 'done').length ?? 0

  return (
    <div
      ref={setNodeRef}
      className={`rounded-md border border-border bg-surface p-3 text-sm shadow-sm transition-shadow hover:border-accent/40 ${
        isDragging ? 'opacity-50' : ''
      }`}
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
        <p className="font-medium text-fg">{task.title}</p>

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
    </div>
  )
}
