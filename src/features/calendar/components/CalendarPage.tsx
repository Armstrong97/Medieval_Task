import { useState } from 'react'
import { addDays, endOfDay, startOfDay, subDays } from 'date-fns'
import { useTasksInRange } from '@/features/tasks/hooks'
import { CalendarTimelineView } from '@/features/calendar/components/CalendarTimelineView'
import { CalendarHeatmapView } from '@/features/calendar/components/CalendarHeatmapView'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

type CalendarMode = 'timeline' | 'heatmap'

export function CalendarPage() {
  const [mode, setMode] = useState<CalendarMode>(() => {
    return (localStorage.getItem('questly_calendar_mode') as CalendarMode) || 'timeline'
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Rango de consulta con margen: 2 días atrás (cubre deadlines de "hoy" ya
  // pasados en la hora actual y variación de zona horaria) hasta 21 días
  // adelante, día completo en ambos extremos.
  const today = new Date()
  const rangeStart = startOfDay(subDays(today, 2))
  const rangeEnd = endOfDay(addDays(today, 21))

  const { data: tasks, isLoading } = useTasksInRange(
    rangeStart.toISOString(),
    rangeEnd.toISOString(),
  )

  function handleModeChange(nextMode: CalendarMode) {
    setMode(nextMode)
    localStorage.setItem('questly_calendar_mode', nextMode)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      {/* Header Titular & Toggle Dual */}
      <header className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-border pb-6 md:flex-row">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-widest text-accent">
            EL ORÁCULO DEL TIEMPO
          </h1>
          <p className="font-mono text-xs text-fg-muted/70">
            Alineación temporal de enfrentamientos e hitos.
          </p>
        </div>

        {/* Toggle Dual Chrono-Stream / Mapa Astral */}
        <div className="view-mode-toggle flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleModeChange('timeline')}
            className={`view-mode-btn ${mode === 'timeline' ? 'active' : ''}`}
          >
            ⏳ Chrono-Stream
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('heatmap')}
            className={`view-mode-btn ${mode === 'heatmap' ? 'active' : ''}`}
          >
            🔮 Mapa Astral
          </button>
        </div>
      </header>

      {/* Renderizado de la Vista Seleccionada */}
      <main>
        {isLoading ? (
          <p className="py-12 text-center font-mono text-xs text-fg-muted">
            Consultando al Oráculo…
          </p>
        ) : mode === 'timeline' ? (
          <CalendarTimelineView
            tasks={tasks ?? []}
            onOpenTask={setEditingTask}
          />
        ) : (
          <CalendarHeatmapView
            tasks={tasks ?? []}
            onOpenTask={setEditingTask}
          />
        )}
      </main>

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
