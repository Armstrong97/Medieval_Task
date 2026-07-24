import { useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useCreateColumn, useKanbanColumns, useUpdateColumnPosition } from '@/features/kanban/hooks'
import { useBoardTasks, useUpdateTask } from '@/features/tasks/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { KanbanColumn } from '@/features/kanban/components/KanbanColumn'
import type { Task } from '@/types/database.types'

const COLUMN_NAME_TO_STATUS: Record<string, 'pending' | 'in_progress' | 'done'> = {
  'Por hacer': 'pending',
  'En progreso': 'in_progress',
  Hecho: 'done',
}

export function KanbanBoard({
  projectId,
  categoryId,
}: {
  projectId: string | null
  categoryId: string | null
}) {
  const { data: columns, isLoading: columnsLoading } = useKanbanColumns(projectId)
  const { data: tasks, isLoading: tasksLoading } = useBoardTasks(projectId)
  const updateTask = useUpdateTask()
  const updateColumnPosition = useUpdateColumnPosition()
  const createColumn = useCreateColumn()

  const [modal, setModal] = useState<
    { mode: 'create'; columnId: string } | { mode: 'edit'; task: Task } | null
  >(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const targetColumnId = over.id as string
    const task = tasks?.find((t) => t.id === active.id)
    if (!task || task.kanban_column_id === targetColumnId) return

    const targetColumn = columns?.find((c) => c.id === targetColumnId)
    const status = targetColumn ? COLUMN_NAME_TO_STATUS[targetColumn.name] : undefined

    updateTask.mutate({
      id: task.id,
      patch: { kanban_column_id: targetColumnId, ...(status ? { status } : {}) },
    })
  }

  function handleMoveColumn(index: number, direction: -1 | 1) {
    if (!columns) return
    const neighbor = columns[index + direction]
    const current = columns[index]
    if (!neighbor) return
    updateColumnPosition.mutate({ id: current.id, position: neighbor.position })
    updateColumnPosition.mutate({ id: neighbor.id, position: current.position })
  }

  function handleAddColumn() {
    const maxPosition = columns?.reduce((max, c) => Math.max(max, c.position), 0) ?? 0
    createColumn.mutate({ projectId, name: 'Nueva columna', position: maxPosition + 1 })
  }

  if (columnsLoading || tasksLoading) {
    return <p className="p-6 text-sm text-neutral-400 dark:text-neutral-500">Cargando…</p>
  }

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-3 overflow-x-auto p-6">
          {columns?.map((column, index) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasks?.filter((t) => t.kanban_column_id === column.id) ?? []}
              canMoveLeft={index > 0}
              canMoveRight={index < columns.length - 1}
              onOpenTask={(task) => setModal({ mode: 'edit', task })}
              onAddTask={(columnId) => setModal({ mode: 'create', columnId })}
              onMoveLeft={() => handleMoveColumn(index, -1)}
              onMoveRight={() => handleMoveColumn(index, 1)}
            />
          ))}
          <button
            type="button"
            onClick={handleAddColumn}
            className="h-fit shrink-0 rounded-lg border border-dashed border-neutral-300 px-4 py-2 text-sm text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 dark:border-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
          >
            + Columna
          </button>
        </div>
      </DndContext>

      {modal && (
        <TaskModal
          task={modal.mode === 'edit' ? modal.task : null}
          defaultProjectId={projectId}
          defaultKanbanColumnId={modal.mode === 'create' ? modal.columnId : ''}
          defaultCategoryId={categoryId}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}
