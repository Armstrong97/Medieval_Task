import { useState } from 'react'
import { addDays, format, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { useCategories } from '@/features/projects/hooks'
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

  // Mostrar 21 días (3 semanas)
  const startDate = new Date()
  const days = Array.from({ length: 21 }, (_, i) => addDays(startDate, i))

  const selectedTasks = tasks
    .filter((t) => t.deadline && isSameDay(new Date(t.deadline), selectedDate))
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Cuadrícula Astral Principal */}
      <div className="lg:col-span-2 space-y-6">
        <header className="mb-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted/60">
            Predicción de Carga y Misiones
          </p>
        </header>

        {/* Encabezados Día de la Semana */}
        <div className="grid grid-cols-7 text-center font-mono text-[9px] uppercase tracking-widest text-fg-muted/50">
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
            const count = dayTasks.length
            const isSelected = isSameDay(dayDate, selectedDate)

            const heatClass =
              count > 3 ? 'heat-high' : count > 1 ? 'heat-mid' : 'heat-low'

            return (
              <div
                key={dayDate.toISOString()}
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
                      style={{ backgroundColor: gemColor, color: gemColor }}
                    />
                  )
                })}

                <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-fg-muted/40 font-bold">
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
              <span className="font-mono text-[9px] uppercase font-bold text-fg-muted/60">
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted/60 mt-0.5">
            {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {selectedTasks.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center opacity-40">
              <span className="text-5xl mb-3">🔮</span>
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
                  className="cursor-pointer rounded-2xl border border-border bg-black/30 p-3.5 transition-all hover:border-accent"
                >
                  <p className="font-mono text-[9px] uppercase text-fg-muted/50 mb-1">
                    {format(new Date(task.deadline!), 'HH:mm')} HS
                  </p>
                  <h4 className="font-display text-sm font-bold text-fg">
                    {task.title}
                  </h4>
                  {category && (
                    <span
                      className="mt-2 inline-block rounded px-2 py-0.5 font-mono text-[8px] font-black uppercase"
                      style={{
                        backgroundColor: `${category.color_hex}25`,
                        color: category.color_hex,
                      }}
                    >
                      {category.name}
                    </span>
                  )}
                </div>
              )
            })
          )}
        </div>
      </aside>
    </div>
  )
}
