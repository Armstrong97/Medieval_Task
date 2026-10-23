import { Check, Landmark, Lock, Shield, Trophy, Hourglass } from 'lucide-react'
import { CLASS_ICONS } from '@/utils/classIcons'
import { useState } from 'react'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask } from '@/features/tasks/hooks'
import type { Category, Task } from '@/types/database.types'

export function GrimorioTabsView({
  tasks,
  onOpenTask,
}: {
  tasks: Task[]
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const completeTask = useCompleteTask()
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  const filteredTasks = tasks.filter((t) =>
    activeCategoryId ? t.category_id === activeCategoryId : true,
  )

  const pending = filteredTasks.filter((t) => t.status !== 'done')
  const completed = filteredTasks.filter((t) => t.status === 'done')

  return (
    <div className="space-y-8">
      {/* Navegación por Sellos de Cera (Wax Seals) */}
      <nav className="flex flex-wrap justify-center gap-3 md:gap-5">
        <button
          type="button"
          onClick={() => setActiveCategoryId(null)}
          className={`wax-seal-btn flex w-24 flex-col items-center rounded-xl border-2 border-border bg-surface p-3 text-center md:w-28 ${
            !activeCategoryId ? 'active' : ''
          }`}
        >
          <Landmark className="mb-1 h-6 w-6" aria-hidden="true" />
          <span className="font-mono text-xs font-bold uppercase tracking-tighter text-fg">
            Todas
          </span>
          <span className="mt-1 font-mono text-xs text-fg-muted/60">
            {tasks.filter((t) => t.status !== 'done').length}
          </span>
        </button>

        {categories?.map((cat) => {
          const catCount = tasks.filter((t) => t.category_id === cat.id && t.status !== 'done').length
          const CatIcon = CLASS_ICONS[cat.name] ?? Shield
          const isActive = activeCategoryId === cat.id

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={`wax-seal-btn flex w-24 flex-col items-center rounded-xl border-2 border-border bg-surface p-3 text-center md:w-28 ${
                isActive ? 'active' : ''
              }`}
            >
              <CatIcon className="mb-1 h-6 w-6" aria-hidden="true" />
              <span className="truncate font-mono text-xs font-bold uppercase tracking-tighter text-fg">
                {cat.class_name}
              </span>
              <span className="mt-1 font-mono text-xs text-fg-muted/60">{catCount}</span>
            </button>
          )
        })}
      </nav>

      {/* Grid de 2 Sub-Columnas: Pendientes & Completadas */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Pendientes */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border pb-2.5">
            <Hourglass className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="font-display text-base font-bold uppercase tracking-widest text-accent">
              Misiones Pendientes
            </h2>
            <span className="font-mono text-xs font-bold text-fg-muted">({pending.length})</span>
          </div>

          <div className="space-y-3">
            {pending.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">Sin tareas pendientes en este ámbito.</p>
            ) : (
              pending.map((task) => (
                <RenderTabCard
                  key={task.id}
                  task={task}
                  categories={categories}
                  onOpenTask={onOpenTask}
                  onComplete={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
                />
              ))
            )}
          </div>
        </section>

        {/* Completadas Recientemente */}
        <section className="space-y-4 opacity-75">
          <div className="flex items-center gap-2.5 border-b border-border pb-2.5">
            <Trophy className="h-5 w-5 text-gold" aria-hidden="true" />
            <h2 className="font-display text-base font-bold uppercase tracking-widest text-fg-muted">
              Completadas Recientemente
            </h2>
            <span className="font-mono text-xs font-bold text-fg-muted">({completed.length})</span>
          </div>

          <div className="space-y-3">
            {completed.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">Ninguna victoria registrada aquí aún.</p>
            ) : (
              completed.slice(0, 10).map((task) => (
                <RenderTabCard
                  key={task.id}
                  task={task}
                  categories={categories}
                  onOpenTask={onOpenTask}
                  onComplete={() => {}}
                  isDone
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function RenderTabCard({
  task,
  categories,
  onOpenTask,
  onComplete,
  isDone = false,
}: {
  task: Task
  categories?: Category[]
  onOpenTask: (t: Task) => void
  onComplete: () => void
  isDone?: boolean
}) {
  const category = categories?.find((c) => c.id === task.category_id)

  return (
    <div
      className={`mission-scroll-card flex items-center justify-between rounded-xl p-4 transition-all ${
        isDone ? 'opacity-60 line-through' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onOpenTask(task)}
        className="min-w-0 flex-1 text-left"
      >
        <h3 className="truncate font-display text-sm font-bold text-fg">
          {task.locked && <Lock className="mr-1.5 inline h-3.5 w-3.5 text-gold" aria-label="Dormida" />}
          {task.title}
        </h3>
        <div className="mt-1 flex items-center gap-3 font-mono text-xs">
          {category && (
            <span
              className="rounded px-2 py-0.5 uppercase"
              style={{ backgroundColor: `${category.color_hex}25`, color: category.color_hex }}
            >
              {category.name}
            </span>
          )}
          {task.size && (
            <span className="font-bold text-fg-muted/70">
              +{task.xp_reward || 10} XP
            </span>
          )}
        </div>
      </button>

      {!isDone && !task.locked && (
        <button
          type="button"
          onClick={onComplete}
          className="flex h-8 w-8 items-center justify-center rounded border border-border text-xs transition-colors hover:border-accent hover:text-accent"
        >
          <Check className="h-4 w-4" aria-label="Completar" />
        </button>
      )}
    </div>
  )
}
