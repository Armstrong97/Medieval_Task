import { useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useKanbanColumns } from '@/features/kanban/hooks'
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

  if (columnsLoading || tasksLoading) {
    return <p className="p-6 text-sm text-neutral-400 dark:text-neutral-500">Cargando…</p>
  }

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-3 overflow-x-auto p-6">
          {columns?.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasks?.filter((t) => t.kanban_column_id === column.id) ?? []}
              onOpenTask={(task) => setModal({ mode: 'edit', task })}
              onAddTask={(columnId) => setModal({ mode: 'create', columnId })}
            />
          ))}
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
