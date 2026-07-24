import { useDroppable } from '@dnd-kit/core'
import { TaskCard } from '@/features/tasks/components/TaskCard'
import type { KanbanColumn as KanbanColumnType, Task } from '@/types/database.types'

export function KanbanColumn({
  column,
  tasks,
  onOpenTask,
  onAddTask,
}: {
  column: KanbanColumnType
  tasks: Task[]
  onOpenTask: (task: Task) => void
  onAddTask: (columnId: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-lg border p-2 ${
        isOver
          ? 'border-neutral-400 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900'
          : 'border-neutral-200 dark:border-neutral-800'
      }`}
    >
      <div className="flex items-center justify-between px-1 py-1">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {column.name} <span className="text-neutral-400 dark:text-neutral-600">{tasks.length}</span>
        </h3>
        <button
          type="button"
          onClick={() => onAddTask(column.id)}
          className="text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
          aria-label="Nueva tarea"
        >
          +
        </button>
      </div>
      <div className="mt-1 flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={onOpenTask} />
        ))}
      </div>
    </div>
  )
}
