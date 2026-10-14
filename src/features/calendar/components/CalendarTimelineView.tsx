import { useState } from 'react'
import { addDays, format, isToday, isSameDay, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { AlertTriangle, Calendar as CalendarIcon, Check, Plus } from 'lucide-react'
import { showToast } from '@/components/ui/toast-store'
import { useCategories } from '@/features/projects/hooks'
import { useMoveTaskDeadline } from '@/features/tasks/hooks'
import { deadlineOnDay } from '@/utils/datetime'
import { CalendarQuickAdd } from '@/features/calendar/components/CalendarQuickAdd'
import { RescheduleButtons } from '@/features/tasks/components/RescheduleButtons'
import type { Task, TaskSize } from '@/types/database.types'

// Carga de energía por misión según su arma (antes: 20 % fijo por misión, así
// que 5 dagas pesaban lo mismo que 5 mandobles). Sin arma: peso medio-bajo.
const ENERGY_WEIGHT: Record<TaskSize, number> = { small: 10, medium: 20, large: 35 }
const ENERGY_WEIGHT_UNSIZED = 15

export function CalendarTimelineView({
  tasks,
  onOpenTask,
}: {
  tasks: Task[]
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const [daysCount, setDaysCount] = useState<3 | 7 | 14>(7)
  const [addingDay, setAddingDay] = useState<Date | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overDay, setOverDay] = useState<string | null>(null)
  const moveTask = useMoveTaskDeadline()

  // Soltar una misión sobre otro día: mismo horario, nueva fecha.
  function handleDrop(day: Date) {
    const task = tasks.find((t) => t.id === draggingId)
    setDraggingId(null)
    setOverDay(null)
    if (!task?.deadline || isSameDay(new Date(task.deadline), day)) return
    moveTask.mutate(
      { taskId: task.id, deadlineIso: deadlineOnDay(day, task.deadline) },
      { onSuccess: () => showToast({ title: 'Misión movida', detail: format(day, "EEEE d 'de' MMMM", { locale: es }) }) },
    )
  }

  // Inicio del día: con la hora exacta de "ahora" cada render generaba claves
  // distintas por día, así que React volvía a montar todas las secciones (y la
  // tarjeta arrastrada) y el navegador cancelaba el arrastre.
  const today = startOfDay(new Date())
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
          className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs font-black uppercase text-accent transition-all hover:bg-accent hover:text-accent-fg"
        >
          Ir a Hoy
        </button>

        <div className="flex items-center gap-1 rounded-xl border border-border bg-shade/40 p-1">
          {([3, 7, 14] as const).map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setDaysCount(count)}
              className={`rounded-lg px-3 py-1 font-mono text-xs font-bold uppercase transition-all ${
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
      <p className="hidden font-mono text-xs text-fg-muted md:block">
        Arrastra una misión pendiente a otro día para moverla. En el celular, usa los botones Mover.
      </p>

      <div className="chrono-stream-line relative space-y-8 pl-4 pr-2">
        {days.map((dayDate) => {
          const isDayToday = isToday(dayDate)
          const dayTasks = tasks.filter(
            (t) => t.deadline && isSameDay(new Date(t.deadline), dayDate),
          )

          // Consumo de energía del día: suma de pesos por arma, tope 100 %.
          const energyUsage = Math.min(
            100,
            dayTasks
              .filter((t) => t.status !== 'done')
              .reduce((sum, t) => sum + (t.size ? ENERGY_WEIGHT[t.size] : ENERGY_WEIGHT_UNSIZED), 0),
          )
          const isFatigueHigh = energyUsage >= 80

          return (
            <section
              key={format(dayDate, 'yyyy-MM-dd')}
              onDragOver={(e) => {
                if (!draggingId) return
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move'
                setOverDay(format(dayDate, 'yyyy-MM-dd'))
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOverDay(null)
              }}
              onDrop={(e) => {
                e.preventDefault()
                handleDrop(dayDate)
              }}
              className={`relative rounded-xl py-3 pl-12 pr-4 transition-all ${
                isDayToday ? 'node-today-active' : ''
              } ${draggingId && overDay === format(dayDate, 'yyyy-MM-dd') ? 'bg-rune/10 ring-2 ring-rune/60' : ''}`}
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
                  <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/50">
                    {format(dayDate, 'd MMMM', { locale: es })}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAddingDay(dayDate)}
                    className="mt-1.5 flex items-center gap-1 rounded-lg px-2 py-2 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent/10"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Añadir
                  </button>
                </div>

                {/* Medidor de Energía */}
                <div className="w-28 text-right">
                  <div className="mb-1 flex justify-between font-mono text-xs font-bold uppercase text-fg-muted/60">
                    <span>Energía</span>
                    <span className={isFatigueHigh ? 'font-black text-warn-fg' : ''}>
                      {energyUsage}%
                    </span>
                  </div>
                  <div className="energy-meter-track w-full">
                    <div
                      className={`h-full transition-all duration-700 ${
                        isFatigueHigh
                          ? 'bg-warn-dot'
                          : energyUsage > 40
                            ? 'bg-amber-500'
                            : 'bg-accent'
                      }`}
                      style={{ width: `${energyUsage}%` }}
                    />
                  </div>
                </div>
              </header>

              {/* Aviso de Fatiga */}
              {isFatigueHigh && (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-warn-border bg-warn-bg p-2 text-warn-fg">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <p className="font-mono text-xs font-bold uppercase tracking-tight">
                    Aviso de Fatiga: Carga de misiones elevada
                  </p>
                </div>
              )}

              {/* Lista de Misiones del Día */}
              <div className="space-y-2.5">
                {dayTasks.length === 0 ? (
                  <p className="font-mono text-xs italic text-fg-muted/40">
                    Sin misiones agendadas para esta fecha.
                  </p>
                ) : (
                  dayTasks.map((task) => {
                    const category = categories?.find((c) => c.id === task.category_id)
                    return (
                      <article
                        key={task.id}
                        onClick={() => onOpenTask(task)}
                        draggable={task.status !== 'done'}
                        onDragStart={(e) => {
                          e.dataTransfer.effectAllowed = 'move'
                          e.dataTransfer.setData('text/plain', task.id)
                          setDraggingId(task.id)
                        }}
                        onDragEnd={() => {
                          setDraggingId(null)
                          setOverDay(null)
                        }}
                        title={task.status !== 'done' ? 'Arrastra a otro día para moverla' : undefined}
                        className={`mission-scroll-card flex ${
                          task.status !== 'done' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                        } ${draggingId === task.id ? 'opacity-40' : ''} items-center justify-between rounded-xl p-3.5 transition-all ${
                          task.status === 'done' ? 'opacity-60' : ''
                        }`}
                        style={
                          category
                            ? { borderLeftColor: category.color_hex }
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <span className="font-mono text-xs text-fg-muted/60">
                            {format(new Date(task.deadline!), 'HH:mm')}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4
                              className={`truncate font-display text-sm font-bold ${
                                task.status === 'done' ? 'text-fg-muted line-through' : 'text-fg'
                              }`}
                            >
                              {task.title}
                            </h4>
                            {category && (
                              <span
                                className="inline-block rounded px-1.5 py-0.5 font-mono text-xs font-black uppercase"
                                style={{
                                  backgroundColor: `${category.color_hex}25`,
                                  color: category.color_hex,
                                }}
                              >
                                {category.name}
                              </span>
                            )}
                            {task.status !== 'done' && (
                              <div className="mt-2">
                                <RescheduleButtons task={task} mode="from-deadline" label="Mover:" />
                              </div>
                            )}
                          </div>
                        </div>
                        {task.status === 'done' ? (
                          <Check className="h-4 w-4 shrink-0 text-accent" aria-label="Completada" />
                        ) : (
                          <CalendarIcon className="h-4 w-4 shrink-0 opacity-20 transition-opacity hover:opacity-100 text-accent" />
                        )}
                      </article>
                    )
                  })
                )}
              </div>
            </section>
          )
        })}
      </div>

      {addingDay && <CalendarQuickAdd day={addingDay} onClose={() => setAddingDay(null)} />}
    </div>
  )
}
