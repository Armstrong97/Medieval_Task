import { useMemo, useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isPast,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { useCategories } from '@/features/projects/hooks'
import { useTasksInRange } from '@/features/tasks/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

export function CalendarPage() {
  const [month, setMonth] = useState(() => new Date())
  const [hiddenCategoryIds, setHiddenCategoryIds] = useState<Set<string>>(new Set())
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const { data: categories } = useCategories()

  const gridStart = startOfWeek(startOfMonth(month), { weekStartsOn: 1 })
  const gridEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
  const days = useMemo(
    () => eachDayOfInterval({ start: gridStart, end: gridEnd }),
    [gridStart, gridEnd],
  )

  const { data: tasks } = useTasksInRange(gridStart.toISOString(), gridEnd.toISOString())

  const visibleTasks = tasks?.filter((t) => !hiddenCategoryIds.has(t.category_id ?? ''))

  function toggleCategory(id: string) {
    setHiddenCategoryIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMonth((m) => subMonths(m, 1))}
            className="rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700"
          >
            ‹
          </button>
          <h1 className="w-40 text-center text-lg font-medium capitalize text-neutral-900 dark:text-neutral-100">
            {format(month, 'MMMM yyyy', { locale: es })}
          </h1>
          <button
            type="button"
            onClick={() => setMonth((m) => addMonths(m, 1))}
            className="rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => setMonth(new Date())}
            className="ml-2 text-sm text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            Hoy
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories?.map((cat) => {
            const active = !hiddenCategoryIds.has(cat.id)
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${
                  active
                    ? 'border-transparent text-neutral-700 dark:text-neutral-300'
                    : 'border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-600'
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

      <div className="mt-4 grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((label) => (
          <div
            key={label}
            className="bg-neutral-50 px-2 py-1 text-center text-xs font-medium text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400"
          >
            {label}
          </div>
        ))}

        {days.map((day) => {
          const dayTasks = visibleTasks?.filter(
            (t) => t.deadline && isSameDay(new Date(t.deadline), day),
          )
          return (
            <div
              key={day.toISOString()}
              className={`min-h-24 bg-white p-1.5 dark:bg-neutral-950 ${
                isSameMonth(day, month) ? '' : 'opacity-40'
              }`}
            >
              <span
                className={`text-xs ${
                  isToday(day)
                    ? 'inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 font-medium text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {format(day, 'd')}
              </span>
              <div className="mt-1 flex flex-col gap-0.5">
                {dayTasks?.map((task) => {
                  const category = categories?.find((c) => c.id === task.category_id)
                  const overdue = task.status !== 'done' && isPast(new Date(task.deadline!))
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => setEditingTask(task)}
                      title={task.title}
                      className={`truncate rounded px-1 py-0.5 text-left text-[11px] ${
                        overdue
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'text-neutral-700 dark:text-neutral-300'
                      }`}
                      style={
                        !overdue && category
                          ? { backgroundColor: `${category.color_hex}1a` }
                          : undefined
                      }
                    >
                      {task.title}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

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
