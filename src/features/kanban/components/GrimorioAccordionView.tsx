import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask } from '@/features/tasks/hooks'
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { Category, Task } from '@/types/database.types'

export function GrimorioAccordionView({
  tasks,
  onOpenTask,
}: {
  tasks: Task[]
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const completeTask = useCompleteTask()

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [openSections, setOpenSections] = useState({
    active: true,
    upcoming: true,
    archive: false,
  })

  function toggleSection(key: 'active' | 'upcoming' | 'archive') {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const filtered = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchesCat = !selectedCategory || t.category_id === selectedCategory
    return matchesSearch && matchesCat
  })

  const now = new Date()
  const activeTasks = filtered.filter((t) => t.hud_slot !== null && t.status !== 'done')
  const upcomingTasks = filtered.filter((t) => {
    if (t.hud_slot !== null || t.status === 'done') return false
    if (!t.deadline) return true
    const days = differenceInDays(new Date(t.deadline), now)
    return days <= 3
  })
  const archiveTasks = filtered.filter((t) => {
    if (t.hud_slot !== null || t.status === 'done') return false
    if (!t.deadline) return false
    const days = differenceInDays(new Date(t.deadline), now)
    return days > 3
  })

  return (
    <div className="space-y-6">
      {/* Buscador & Filtros Rápidos */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar misiones o pergaminos..."
            className="w-full rounded-2xl border border-border bg-black/40 py-3.5 pl-11 pr-4 text-sm text-fg outline-none transition-all focus:border-accent"
          />
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-40 text-fg" />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest transition-all ${
              !selectedCategory
                ? 'bg-accent text-accent-fg'
                : 'border border-border text-fg-muted hover:text-fg'
            }`}
          >
            Todas
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full border px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat.id
                  ? 'border-transparent text-fg'
                  : 'border-border text-fg-muted/60 hover:text-fg'
              }`}
              style={
                selectedCategory === cat.id
                  ? { backgroundColor: `${cat.color_hex}33`, borderColor: cat.color_hex }
                  : undefined
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Acordeón de 3 Secciones */}
      <div className="space-y-4">
        {/* I. Enfrentamiento Activo */}
        <section className={`accordion-section rounded-2xl border border-border bg-surface/30 ${openSections.active ? 'active' : ''}`}>
          <button
            type="button"
            onClick={() => toggleSection('active')}
            className="flex w-full items-center justify-between border-b border-accent/40 bg-surface/80 p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">⚔️</span>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-accent">
                Enfrentamiento Activo (HUD)
              </h2>
              <span className="rounded-full bg-accent px-2 font-mono text-[10px] font-bold text-accent-fg">
                {activeTasks.length}
              </span>
            </div>
            <ChevronDown className="chevron-icon h-4 w-4 text-fg-muted transition-transform" />
          </button>
          <div className="accordion-content-panel space-y-2.5 p-4">
            {activeTasks.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">Sin misiones equipadas en combate.</p>
            ) : (
              activeTasks.map((task) => (
                <RenderMissionCard
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

        {/* II. Estrategia Próxima */}
        <section className={`accordion-section rounded-2xl border border-border bg-surface/30 ${openSections.upcoming ? 'active' : ''}`}>
          <button
            type="button"
            onClick={() => toggleSection('upcoming')}
            className="flex w-full items-center justify-between border-b border-border bg-surface/80 p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📜</span>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-fg">
                Estrategia Próxima (Hoy - 3 Días)
              </h2>
              <span className="rounded-full bg-border px-2 font-mono text-[10px] font-bold text-fg">
                {upcomingTasks.length}
              </span>
            </div>
            <ChevronDown className="chevron-icon h-4 w-4 text-fg-muted transition-transform" />
          </button>
          <div className="accordion-content-panel space-y-2.5 p-4">
            {upcomingTasks.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">No hay urgencias inmediatas.</p>
            ) : (
              upcomingTasks.map((task) => (
                <RenderMissionCard
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

        {/* III. Archivos de la Orden */}
        <section className={`accordion-section rounded-2xl border border-border bg-surface/30 ${openSections.archive ? 'active' : ''}`}>
          <button
            type="button"
            onClick={() => toggleSection('archive')}
            className="flex w-full items-center justify-between border-b border-border bg-surface/80 p-4"
          >
            <div className="flex items-center gap-3 opacity-60">
              <span className="text-xl">🏛️</span>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-fg">
                Archivos de la Orden (Backlog Futuro)
              </h2>
              <span className="rounded-full bg-border px-2 font-mono text-[10px] font-bold text-fg">
                {archiveTasks.length}
              </span>
            </div>
            <ChevronDown className="chevron-icon h-4 w-4 text-fg-muted transition-transform" />
          </button>
          <div className="accordion-content-panel space-y-2.5 p-4">
            {archiveTasks.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">El archivo está vacío.</p>
            ) : (
              archiveTasks.map((task) => (
                <RenderMissionCard
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
      </div>
    </div>
  )
}

function RenderMissionCard({
  task,
  categories,
  onOpenTask,
  onComplete,
}: {
  task: Task
  categories?: Category[]
  onOpenTask: (t: Task) => void
  onComplete: () => void
}) {
  const category = categories?.find((c) => c.id === task.category_id)

  return (
    <div className="mission-scroll-card flex items-center justify-between rounded-xl p-3.5 transition-all">
      <button
        type="button"
        onClick={() => onOpenTask(task)}
        className="min-w-0 flex-1 text-left"
      >
        <div className="flex items-center gap-2">
          {task.size && (
            <img
              src={WEAPON_ICONS[task.size]}
              alt=""
              className="h-4 w-4 object-contain opacity-70"
            />
          )}
          <h3 className="truncate font-display text-sm font-bold text-fg">{task.title}</h3>
        </div>
        <div className="mt-1 flex items-center gap-2 font-mono text-[10px]">
          {category && (
            <span
              className="rounded px-1.5 py-0.5 font-black uppercase"
              style={{
                backgroundColor: `${category.color_hex}25`,
                color: category.color_hex,
              }}
            >
              {category.name}
            </span>
          )}
          {task.deadline && (
            <span className="text-fg-muted/60 uppercase">
              {format(new Date(task.deadline), 'd MMM')}
            </span>
          )}
        </div>
      </button>

      <div className="flex items-center gap-3">
        {task.hud_slot !== null && (
          <span className="animate-pulse font-mono text-[10px] font-black text-accent">
            SLOT {task.hud_slot}
          </span>
        )}
        <button
          type="button"
          onClick={onComplete}
          className="flex h-7 w-7 items-center justify-center rounded border border-border text-xs transition-colors hover:border-accent hover:text-accent"
        >
          ✓
        </button>
      </div>
    </div>
  )
}
