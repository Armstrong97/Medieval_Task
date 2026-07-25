import { useMemo, useState } from 'react'
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isPast,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { useCategories } from '@/features/projects/hooks'
import { useTasksInRange } from '@/features/tasks/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Category, Task } from '@/types/database.types'

type ViewMode = 'month' | 'week' | 'day'

function DayCell({
  day,
  dayTasks,
  categories,
  faded,
  onOpenTask,
}: {
  day: Date
  dayTasks: Task[]
  categories: Category[] | undefined
  faded: boolean
  onOpenTask: (task: Task) => void
}) {
  return (
    <div className={`min-h-24 bg-surface p-1.5 ${faded ? 'opacity-40' : ''}`}>
      <span
        className={`font-mono text-xs ${
          isToday(day)
            ? 'inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent font-medium text-accent-fg'
            : 'text-fg-muted'
        }`}
      >
        {format(day, 'd')}
      </span>
      <div className="mt-1 flex flex-col gap-0.5">
        {dayTasks.map((task) => {
          const category = categories?.find((c) => c.id === task.category_id)
          const done = task.status === 'done'
          const overdue = !done && isPast(new Date(task.deadline!))
          return (
            <button
              key={task.id}
              type="button"
              onClick={() => onOpenTask(task)}
              title={task.title}
              className={`truncate rounded px-1 py-0.5 text-left text-[11px] transition-colors hover:brightness-125 ${
                overdue
                  ? 'bg-warn-bg text-warn-fg'
                  : done
                    ? 'text-fg-muted/60 line-through'
                    : 'text-fg-muted'
              }`}
              style={!overdue && category ? { backgroundColor: `${category.color_hex}1a` } : undefined}
            >
              {task.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DayListView({
  dayTasks,
  categories,
  onOpenTask,
}: {
  dayTasks: Task[]
  categories: Category[] | undefined
  onOpenTask: (task: Task) => void
}) {
  if (dayTasks.length === 0) {
    return <p className="mt-4 text-sm text-fg-muted">Nada con deadline este día.</p>
  }

  return (
    <ul className="mt-4 flex flex-col gap-2">
      {dayTasks
        .slice()
        .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
        .map((task) => {
          const category = categories?.find((c) => c.id === task.category_id)
          const done = task.status === 'done'
          const overdue = !done && isPast(new Date(task.deadline!))
          return (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => onOpenTask(task)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
                  overdue ? 'border-warn-border bg-warn-bg' : 'border-border bg-surface'
                } ${done ? 'opacity-60' : ''}`}
              >
                <span className="w-12 shrink-0 font-mono text-xs text-fg-muted">
                  {format(new Date(task.deadline!), 'HH:mm')}
                </span>
                {category && (
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: category.color_hex }}
                  />
                )}
                <span className={done ? 'flex-1 text-fg-muted line-through' : 'flex-1 text-fg'}>
                  {task.title}
                </span>
              </button>
            </li>
          )
        })}
    </ul>
  )
}

export function CalendarPage() {
  const [view, setView] = useState<ViewMode>('month')
  const [anchor, setAnchor] = useState(() => new Date())
  const [hiddenCategoryIds, setHiddenCategoryIds] = useState<Set<string>>(new Set())
  const [showCompleted, setShowCompleted] = useState(true)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const { data: categories } = useCategories()

  const rangeStart =
    view === 'month'
      ? startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 })
      : view === 'week'
        ? startOfWeek(anchor, { weekStartsOn: 1 })
        : startOfDay(anchor)
  const rangeEnd =
    view === 'month'
      ? endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 })
      : view === 'week'
        ? endOfWeek(anchor, { weekStartsOn: 1 })
        : startOfDay(anchor)

  const days = useMemo(
    () => eachDayOfInterval({ start: rangeStart, end: rangeEnd }),
    [rangeStart, rangeEnd],
  )

  const { data: tasks } = useTasksInRange(
    rangeStart.toISOString(),
    view === 'day' ? addDays(rangeEnd, 1).toISOString() : rangeEnd.toISOString(),
  )

  const visibleTasks = tasks?.filter(
    (t) =>
      !hiddenCategoryIds.has(t.category_id ?? '') && (showCompleted || t.status !== 'done'),
  )

  function toggleCategory(id: string) {
    setHiddenCategoryIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function goPrev() {
    setAnchor((d) => (view === 'month' ? subMonths(d, 1) : view === 'week' ? subWeeks(d, 1) : subDays(d, 1)))
  }
  function goNext() {
    setAnchor((d) => (view === 'month' ? addMonths(d, 1) : view === 'week' ? addWeeks(d, 1) : addDays(d, 1)))
  }

  const title =
    view === 'month'
      ? format(anchor, 'MMMM yyyy', { locale: es })
      : view === 'week'
        ? `${format(rangeStart, 'd MMM', { locale: es })} – ${format(rangeEnd, 'd MMM', { locale: es })}`
        : format(anchor, "EEEE d 'de' MMMM", { locale: es })

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-md border border-border px-2 py-1 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
          >
            ‹
          </button>
          <h1 className="min-w-52 text-center font-display text-lg font-semibold capitalize tracking-tight text-fg">
            {title}
          </h1>
          <button
            type="button"
            onClick={goNext}
            className="rounded-md border border-border px-2 py-1 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => setAnchor(new Date())}
            className="ml-2 text-sm text-fg-muted hover:text-fg"
          >
            Hoy
          </button>

          <div className="ml-2 flex gap-1 rounded-md bg-surface-2 p-1">
            {(
              [
                { key: 'day', label: 'Día' },
                { key: 'week', label: 'Semana' },
                { key: 'month', label: 'Mes' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setView(tab.key)}
                className={`rounded px-2 py-1 text-xs font-medium ${
                  view === tab.key ? 'bg-surface text-fg shadow-sm' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-fg-muted">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="accent-accent"
            />
            Mostrar completadas
          </label>
          {categories?.map((cat) => {
            const active = !hiddenCategoryIds.has(cat.id)
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${
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

      {view === 'day' ? (
        <DayListView
          dayTasks={visibleTasks?.filter((t) => t.deadline && isSameDay(new Date(t.deadline), anchor)) ?? []}
          categories={categories}
          onOpenTask={setEditingTask}
        />
      ) : (
        <div className="mt-4 grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-border bg-border">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((label) => (
            <div
              key={label}
              className="bg-surface-2 px-2 py-1 text-center text-xs font-medium text-fg-muted"
            >
              {label}
            </div>
          ))}

          {days.map((day) => (
            <DayCell
              key={day.toISOString()}
              day={day}
              dayTasks={visibleTasks?.filter((t) => t.deadline && isSameDay(new Date(t.deadline), day)) ?? []}
              categories={categories}
              faded={view === 'month' && !isSameMonth(day, anchor)}
              onOpenTask={setEditingTask}
            />
          ))}
        </div>
      )}

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
