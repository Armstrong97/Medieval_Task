import { useState } from 'react'
import { addDays, format, isToday, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { AlertTriangle, Calendar as CalendarIcon } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import type { Task } from '@/types/database.types'

export function CalendarTimelineView({
  tasks,
  onOpenTask,
}: {
  tasks: Task[]
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const [daysCount, setDaysCount] = useState<3 | 7 | 14>(7)

  const today = new Date()
  const days = Array.from({ length: daysCount }, (_, i) => addDays(today, i))

  function scrollToToday() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      {/* Controles de Rango de Días & Ir a Hoy */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4">
        <button
          type="button"
          onClick={scrollToToday}
          className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-[10px] font-black uppercase text-accent transition-all hover:bg-accent hover:text-accent-fg"
        >
          Ir a Hoy
        </button>

        <div className="flex items-center gap-1 rounded-xl border border-border bg-black/40 p-1">
          {([3, 7, 14] as const).map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setDaysCount(count)}
              className={`rounded-lg px-3 py-1 font-mono text-[10px] font-bold uppercase transition-all ${
                daysCount === count
                  ? 'bg-accent text-accent-fg shadow'
                  : 'text-fg-muted hover:text-fg'
              }`}
            >
              {count} Días
            </button>
          ))}
        </div>
      </div>

      {/* Stream Vertical Cronológico */}
      <div className="chrono-stream-line relative space-y-8 pl-4 pr-2">
        {days.map((dayDate) => {
          const isDayToday = isToday(dayDate)
          const dayTasks = tasks.filter(
            (t) => t.deadline && isSameDay(new Date(t.deadline), dayDate),
          )

          // Cálculo de consumo de energía (20% por misión)
          const energyUsage = Math.min(100, dayTasks.length * 20)
          const isFatigueHigh = energyUsage >= 80

          return (
            <section
              key={dayDate.toISOString()}
              className={`relative py-3 pl-12 pr-4 transition-all ${
                isDayToday ? 'node-today-active' : ''
              }`}
            >
              {/* Punto del Nodo */}
              <div className="day-node-dot" />

              {/* Encabezado del Día */}
              <header className="mb-3 flex items-end justify-between">
                <div>
                  <h3
                    className={`font-display text-base font-bold capitalize ${
                      isDayToday ? 'text-accent' : 'text-fg-muted/80'
                    }`}
                  >
                    {isDayToday
                      ? 'Hoy'
                      : format(dayDate, 'EEEE', { locale: es })}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted/50">
                    {format(dayDate, 'd MMMM', { locale: es })}
                  </p>
                </div>

                {/* Medidor de Energía */}
                <div className="w-28 text-right">
                  <div className="mb-1 flex justify-between font-mono text-[8px] font-bold uppercase text-fg-muted/60">
                    <span>Energía</span>
                    <span className={isFatigueHigh ? 'text-red-400 font-black' : ''}>
                      {energyUsage}%
                    </span>
                  </div>
                  <div className="energy-meter-track w-full">
                    <div
                      className={`h-full transition-all duration-700 ${
                        isFatigueHigh
                          ? 'bg-red-500'
                          : energyUsage > 40
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                      }`}
                      style={{ width: `${energyUsage}%` }}
                    />
                  </div>
                </div>
              </header>

              {/* Aviso de Fatiga */}
              {isFatigueHigh && (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <p className="font-mono text-[9px] font-bold uppercase tracking-tight">
                    Aviso de Fatiga: Carga de misiones elevada
                  </p>
                </div>
              )}

              {/* Lista de Misiones del Día */}
              <div className="space-y-2.5">
                {dayTasks.length === 0 ? (
                  <p className="font-mono text-[11px] italic text-fg-muted/40">
                    Sin misiones agendadas para esta fecha.
                  </p>
                ) : (
                  dayTasks.map((task) => {
                    const category = categories?.find((c) => c.id === task.category_id)
                    return (
                      <article
                        key={task.id}
                        onClick={() => onOpenTask(task)}
                        className="mission-scroll-card flex cursor-pointer items-center justify-between rounded-xl p-3.5 transition-all"
                        style={
                          category
                            ? { borderLeftColor: category.color_hex }
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <span className="font-mono text-[10px] text-fg-muted/60">
                            {format(new Date(task.deadline!), 'HH:mm')}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate font-display text-sm font-bold text-fg">
                              {task.title}
                            </h4>
                            {category && (
                              <span
                                className="inline-block rounded px-1.5 py-0.5 font-mono text-[8px] font-black uppercase"
                                style={{
                                  backgroundColor: `${category.color_hex}25`,
                                  color: category.color_hex,
                                }}
                              >
                                {category.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <CalendarIcon className="h-4 w-4 shrink-0 opacity-20 transition-opacity hover:opacity-100 text-accent" />
                      </article>
                    )
                  })
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
