import { useState } from 'react'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask } from '@/features/tasks/hooks'
import type { Category, Task } from '@/types/database.types'

const CLASS_ICONS: Record<string, string> = {
  Concentrix: '🔮',
  Delorean: '🪓',
  Estudios: '📜',
  Hobbies: '🎮',
  Personal: '🛡️',
  Hogar: '🌿',
}

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
          className={`wax-seal-btn flex w-20 flex-col items-center rounded-xl border-2 border-border bg-surface p-3 text-center md:w-24 ${
            !activeCategoryId ? 'active' : ''
          }`}
        >
          <span className="mb-1 text-2xl">🏺</span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-tighter text-fg">
            Todas
          </span>
          <span className="mt-1 font-mono text-[10px] text-fg-muted/60">
            {tasks.filter((t) => t.status !== 'done').length}
          </span>
        </button>

        {categories?.map((cat) => {
          const catCount = tasks.filter((t) => t.category_id === cat.id && t.status !== 'done').length
          const icon = CLASS_ICONS[cat.name] ?? '🛡️'
          const isActive = activeCategoryId === cat.id

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={`wax-seal-btn flex w-20 flex-col items-center rounded-xl border-2 border-border bg-surface p-3 text-center md:w-24 ${
                isActive ? 'active' : ''
              }`}
            >
              <span className="mb-1 text-2xl">{icon}</span>
              <span className="truncate font-mono text-[9px] font-bold uppercase tracking-tighter text-fg">
                {cat.class_name}
              </span>
              <span className="mt-1 font-mono text-[10px] text-fg-muted/60">{catCount}</span>
            </button>
          )
        })}
      </nav>

      {/* Grid de 2 Sub-Columnas: Pendientes & Completadas */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Pendientes */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border pb-2.5">
            <span className="text-xl">⏳</span>
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
            <span className="text-xl">🏆</span>
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
        <h3 className="truncate font-display text-sm font-bold text-fg">{task.title}</h3>
        <div className="mt-1 flex items-center gap-3 font-mono text-[10px]">
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

      {!isDone && (
        <button
          type="button"
          onClick={onComplete}
          className="flex h-8 w-8 items-center justify-center rounded border border-border text-xs transition-colors hover:border-accent hover:text-accent"
        >
          ✓
        </button>
      )}
    </div>
  )
}
