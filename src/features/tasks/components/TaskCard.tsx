import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { format, isPast } from 'date-fns'
import { useCategories } from '@/features/projects/hooks'
import { useSubtasks, useUpdateTask } from '@/features/tasks/hooks'
import type { Task } from '@/types/database.types'

export function TaskCard({ task, onOpen }: { task: Task; onOpen: (task: Task) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  })
  const { data: categories } = useCategories()
  const [showSubtasks, setShowSubtasks] = useState(false)
  const { data: subtasks } = useSubtasks(task.id)
  const updateTask = useUpdateTask()

  const category = categories?.find((c) => c.id === task.category_id)
  const overdue =
    task.status !== 'done' && task.deadline !== null && isPast(new Date(task.deadline))
  const doneCount = subtasks?.filter((s) => s.status === 'done').length ?? 0

  return (
    <div
      ref={setNodeRef}
      style={
        transform
          ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 10 }
          : undefined
      }
      className={`rounded-md border border-neutral-200 bg-white p-3 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div
        {...listeners}
        {...attributes}
        onClick={() => onOpen(task)}
        className="cursor-grab active:cursor-grabbing"
      >
        <p className="font-medium text-neutral-900 dark:text-neutral-100">{task.title}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {category && (
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: category.color_hex }}
              />
              {category.name}
            </span>
          )}
          {task.deadline && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                overdue
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
              }`}
            >
              {format(new Date(task.deadline), 'd MMM')}
            </span>
          )}
        </div>
      </div>

      {subtasks && subtasks.length > 0 && (
        <div className="mt-2 border-t border-neutral-100 pt-2 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setShowSubtasks((v) => !v)}
            className="text-xs text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
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
                    className="h-3 w-3"
                  />
                  <span
                    className={
                      subtask.status === 'done'
                        ? 'text-neutral-400 line-through dark:text-neutral-600'
                        : 'text-neutral-700 dark:text-neutral-300'
                    }
                  >
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
