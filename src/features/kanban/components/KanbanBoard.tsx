import { useMemo, useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  addDays,
  endOfMonth,
  endOfWeek,
  isPast,
  isToday,
  isTomorrow,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { useCreateColumn, useKanbanColumns, useUpdateColumnPosition } from '@/features/kanban/hooks'
import { useBoardTasks, useUpdateTask } from '@/features/tasks/hooks'
import { useCategories } from '@/features/projects/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { KanbanColumn } from '@/features/kanban/components/KanbanColumn'
import type { Task } from '@/types/database.types'

const COLUMN_NAME_TO_STATUS: Record<string, 'pending' | 'in_progress' | 'done'> = {
  'Por hacer': 'pending',
  'En progreso': 'in_progress',
  Hecho: 'done',
}

type DateFilter = 'all' | 'overdue' | 'today' | 'tomorrow' | 'weekend' | 'week' | 'month'

const DATE_FILTERS: { key: DateFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'overdue', label: 'Vencidas' },
  { key: 'today', label: 'Hoy' },
  { key: 'tomorrow', label: 'Mañana' },
  { key: 'weekend', label: 'Fin de semana' },
  { key: 'week', label: 'Esta semana' },
  { key: 'month', label: 'Este mes' },
]

function matchesDateFilter(task: Task, filter: DateFilter, now: Date): boolean {
  if (filter === 'all') return true
  if (!task.deadline) return false
  const deadline = new Date(task.deadline)

  switch (filter) {
    case 'overdue':
      return task.status !== 'done' && isPast(deadline)
    case 'today':
      return isToday(deadline)
    case 'tomorrow':
      return isTomorrow(deadline)
    case 'weekend': {
      const monday = startOfWeek(now, { weekStartsOn: 1 })
      return isWithinInterval(deadline, { start: addDays(monday, 5), end: addDays(monday, 7) })
    }
    case 'week':
      return isWithinInterval(deadline, {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 }),
      })
    case 'month':
      return isWithinInterval(deadline, { start: startOfMonth(now), end: endOfMonth(now) })
    default:
      return true
  }
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
  const { data: categories } = useCategories()
  const updateTask = useUpdateTask()
  const updateColumnPosition = useUpdateColumnPosition()
  const createColumn = useCreateColumn()

  const [modal, setModal] = useState<
    { mode: 'create'; columnId: string } | { mode: 'edit'; task: Task } | null
  >(null)
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')
  const [hiddenCategoryIds, setHiddenCategoryIds] = useState<Set<string>>(new Set())

  function toggleCategory(id: string) {
    setHiddenCategoryIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const visibleTasks = useMemo(() => {
    const now = new Date()
    return tasks?.filter(
      (t) =>
        !hiddenCategoryIds.has(t.category_id ?? '') && matchesDateFilter(t, dateFilter, now),
    )
  }, [tasks, hiddenCategoryIds, dateFilter])

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
    return <p className="p-6 text-sm text-fg-muted">Cargando…</p>
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-3">
        <div className="flex flex-wrap gap-1 rounded-md bg-surface-2 p-1">
          {DATE_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setDateFilter(f.key)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                dateFilter === f.key ? 'bg-surface text-fg shadow-sm' : 'text-fg-muted hover:text-fg'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories?.map((cat) => {
            const active = !hiddenCategoryIds.has(cat.id)
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors ${
                  active ? 'border-transparent text-fg' : 'border-border text-fg-muted/50'
                }`}
                style={active ? { backgroundColor: `${cat.color_hex}1a` } : undefined}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: active ? cat.color_hex : undefined }}
                />
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-3 overflow-x-auto p-6">
          {columns?.map((column, index) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={visibleTasks?.filter((t) => t.kanban_column_id === column.id) ?? []}
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
            className="h-fit shrink-0 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-fg-muted transition-all duration-150 hover:border-accent/50 hover:text-accent active:scale-95"
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
