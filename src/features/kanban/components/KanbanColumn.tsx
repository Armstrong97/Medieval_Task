import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { TaskCard } from '@/features/tasks/components/TaskCard'
import { useDeleteColumn, useRenameColumn } from '@/features/kanban/hooks'
import type { KanbanColumn as KanbanColumnType, Task } from '@/types/database.types'

export function KanbanColumn({
  column,
  tasks,
  canMoveLeft,
  canMoveRight,
  onOpenTask,
  onAddTask,
  onMoveLeft,
  onMoveRight,
}: {
  column: KanbanColumnType
  tasks: Task[]
  canMoveLeft: boolean
  canMoveRight: boolean
  onOpenTask: (task: Task) => void
  onAddTask: (columnId: string) => void
  onMoveLeft: () => void
  onMoveRight: () => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })
  const renameColumn = useRenameColumn()
  const deleteColumn = useDeleteColumn()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(column.name)

  function handleRenameSubmit() {
    setEditing(false)
    const trimmed = name.trim()
    if (trimmed && trimmed !== column.name) {
      renameColumn.mutate({ id: column.id, name: trimmed })
    } else {
      setName(column.name)
    }
  }

  function handleDelete() {
    const warning =
      tasks.length > 0
        ? `Esta columna tiene ${tasks.length} tarjeta(s). Al eliminarla vuelven al inbox para re-triarlas. ¿Continuar?`
        : '¿Eliminar esta columna?'
    if (window.confirm(warning)) {
      deleteColumn.mutate(column.id)
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-lg border p-2 transition-colors ${
        isOver ? 'border-accent/50 bg-accent/5' : 'border-border bg-surface/40'
      }`}
    >
      <div className="flex items-center justify-between gap-1 px-1 py-1">
        <div className="flex min-w-0 items-center gap-1">
          <button
            type="button"
            onClick={onMoveLeft}
            disabled={!canMoveLeft}
            className="text-fg-muted/50 hover:text-fg disabled:opacity-0"
            aria-label="Mover columna a la izquierda"
          >
            ‹
          </button>
          {editing ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSubmit()
                if (e.key === 'Escape') {
                  setName(column.name)
                  setEditing(false)
                }
              }}
              className="w-28 rounded border border-border bg-surface px-1 text-sm text-fg"
            />
          ) : (
            <h3
              onClick={() => setEditing(true)}
              className="truncate text-sm font-medium text-fg"
              title="Click para renombrar"
            >
              {column.name} <span className="font-mono text-fg-muted">{tasks.length}</span>
            </h3>
          )}
          <button
            type="button"
            onClick={onMoveRight}
            disabled={!canMoveRight}
            className="text-fg-muted/50 hover:text-fg disabled:opacity-0"
            aria-label="Mover columna a la derecha"
          >
            ›
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onAddTask(column.id)}
            className="text-fg-muted hover:text-accent"
            aria-label="Nueva tarea"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-fg-muted/60 hover:text-warn-fg"
            aria-label="Eliminar columna"
          >
            ×
          </button>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={onOpenTask} />
        ))}
      </div>
    </div>
  )
}
