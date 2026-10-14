import { Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { addDays, format, isSameDay, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { useCategories } from '@/features/projects/hooks'
import { CalendarQuickAdd } from '@/features/calendar/components/CalendarQuickAdd'
import { RescheduleButtons } from '@/features/tasks/components/RescheduleButtons'
import type { Task } from '@/types/database.types'

export function CalendarHeatmapView({
  tasks,
  onOpenTask,
}: {
  tasks: Task[]
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [adding, setAdding] = useState(false)

  // Mostrar 21 días (3 semanas)
  const startDate = startOfDay(new Date())
  const days = Array.from({ length: 21 }, (_, i) => addDays(startDate, i))

  const selectedTasks = tasks
    .filter((t) => t.deadline && isSameDay(new Date(t.deadline), selectedDate))
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Cuadrícula Astral Principal */}
      <div className="lg:col-span-2 space-y-6">
        <header className="mb-2">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-fg-muted/60">
            Predicción de Carga y Misiones
          </p>
        </header>

        {/* Encabezados Día de la Semana */}
        <div className="grid grid-cols-7 text-center font-mono text-xs uppercase tracking-widest text-fg-muted/50">
          <div>Lun</div>
          <div>Mar</div>
          <div>Mié</div>
          <div>Jue</div>
          <div>Vie</div>
          <div className="text-amber-500/70">Sáb</div>
          <div className="text-amber-500/70">Dom</div>
        </div>

        {/* Celdas de la Cuadrícula */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((dayDate) => {
            const dayTasks = tasks.filter(
              (t) => t.deadline && isSameDay(new Date(t.deadline), dayDate),
            )
            const count = dayTasks.filter((t) => t.status !== 'done').length
            const isSelected = isSameDay(dayDate, selectedDate)

            const heatClass =
              count > 3 ? 'heat-high' : count > 1 ? 'heat-mid' : 'heat-low'

            return (
              <div
                key={format(dayDate, 'yyyy-MM-dd')}
                onClick={() => setSelectedDate(dayDate)}
                className={`grid-day-cell rounded-2xl p-2 flex flex-wrap gap-1 content-start ${heatClass} ${
                  isSelected ? 'selected' : ''
                }`}
              >
                {/* Gemas de Categoría */}
                {dayTasks.map((t) => {
                  const category = categories?.find((c) => c.id === t.category_id)
                  const gemColor = category?.color_hex ?? '#d9a94a'
                  return (
                    <div
                      key={t.id}
                      className="gem-rune"
                      style={{ backgroundColor: gemColor, color: gemColor, opacity: t.status === 'done' ? 0.3 : 1 }}
                    />
                  )
                })}

                <span className="absolute bottom-1.5 right-2 font-mono text-xs text-fg-muted/40 font-bold">
                  {format(dayDate, 'd')}
                </span>
              </div>
            )
          })}
        </div>

        {/* Leyenda de Categorías */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-border/40">
          {categories?.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: cat.color_hex }}
              />
              <span className="font-mono text-xs uppercase font-bold text-fg-muted/60">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Lateral: Jornada Escogida */}
      <aside className="rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-md flex flex-col h-[520px]">
        <div className="border-b border-border pb-4 mb-4">
          <h2 className="font-display text-lg font-bold text-accent uppercase tracking-wide">
            Jornada Escogida
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60 mt-0.5">
            {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mb-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-accent/50 py-3 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent/10"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Añadir misión a este día
        </button>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {selectedTasks.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center opacity-40">
              <Sparkles className="mb-3 h-12 w-12" aria-hidden="true" />
              <p className="font-display text-xs uppercase tracking-widest">
                Escudriña el tablero para ver el destino
              </p>
            </div>
          ) : (
            selectedTasks.map((task) => {
              const category = categories?.find((c) => c.id === task.category_id)
              return (
                <div
                  key={task.id}
                  onClick={() => onOpenTask(task)}
                  className={`cursor-pointer rounded-2xl border border-border bg-shade/30 p-3.5 transition-all hover:border-accent ${
                    task.status === 'done' ? 'opacity-60' : ''
                  }`}
                >
                  <p className="font-mono text-xs uppercase text-fg-muted/50 mb-1">
                    {format(new Date(task.deadline!), 'HH:mm')} HS
                  </p>
                  <h4
                    className={`font-display text-sm font-bold ${
                      task.status === 'done' ? 'text-fg-muted line-through' : 'text-fg'
                    }`}
                  >
                    {task.title}
                  </h4>
                  {category && (
                    <span
                      className="mt-2 inline-block rounded px-2 py-0.5 font-mono text-xs font-black uppercase"
                      style={{
                        backgroundColor: `${category.color_hex}25`,
                        color: category.color_hex,
                      }}
                    >
                      {category.name}
                    </span>
                  )}
                  {task.status !== 'done' && (
                    <div className="mt-2.5">
                      <RescheduleButtons task={task} mode="from-deadline" label="Mover:" />
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </aside>

      {adding && <CalendarQuickAdd day={selectedDate} onClose={() => setAdding(false)} />}
    </div>
  )
}
