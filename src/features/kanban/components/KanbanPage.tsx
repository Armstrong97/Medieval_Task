import { ScrollText, Shield } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isPast, isToday } from 'date-fns'
import { useAllBoardTasks } from '@/features/tasks/hooks'
import { GrimorioAccordionView } from '@/features/kanban/components/GrimorioAccordionView'
import { GrimorioTabsView } from '@/features/kanban/components/GrimorioTabsView'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

type GrimorioMode = 'foco' | 'ambitos'
type DueFilter = 'all' | 'overdue' | 'today'

export function KanbanPage() {
  const [mode, setMode] = useState<GrimorioMode>(() => {
    return (localStorage.getItem('questly_grimorio_mode') as GrimorioMode) || 'foco'
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const location = useLocation()
  const [dueFilter, setDueFilter] = useState<DueFilter>(
    () => ((location.state as { dateFilter?: DueFilter } | null)?.dateFilter ?? 'all'),
  )

  const { data: tasks, isLoading } = useAllBoardTasks()

  const open = (tasks ?? []).filter((t) => t.status !== 'done' && t.deadline)
  const overdueCount = open.filter((t) => isPast(new Date(t.deadline!))).length
  const todayCount = open.filter((t) => isToday(new Date(t.deadline!))).length
  const visibleTasks = (tasks ?? []).filter((t) => {
    if (dueFilter === 'all') return true
    if (!t.deadline || t.status === 'done') return false
    return dueFilter === 'overdue' ? isPast(new Date(t.deadline)) : isToday(new Date(t.deadline))
  })

  function handleModeChange(nextMode: GrimorioMode) {
    setMode(nextMode)
    localStorage.setItem('questly_grimorio_mode', nextMode)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      {/* Header Titular & Toggle de Modo Dual */}
      <header className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-border pb-6 md:flex-row">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-widest text-accent">
            EL GRIMORIO
          </h1>
          <p className="font-mono text-xs text-fg-muted/70">
            Registro general de misiones y decretos.
          </p>
        </div>

        {/* Toggle Dual Foco / Ámbitos */}
        <div className="view-mode-toggle flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleModeChange('foco')}
            className={`view-mode-btn ${mode === 'foco' ? 'active' : ''}`}
          >
            <ScrollText className="mr-1.5 inline h-4 w-4" aria-hidden="true" /> Foco Gradual
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('ambitos')}
            className={`view-mode-btn ${mode === 'ambitos' ? 'active' : ''}`}
          >
            <Shield className="mr-1.5 inline h-4 w-4" aria-hidden="true" /> Ámbitos por Clase
          </button>
        </div>
      </header>

      {/* Filtro rápido por vencimiento */}
      <div className="mb-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por vencimiento">
        {([
          ['all', 'Todas'],
          ['overdue', `Vencidas (${overdueCount})`],
          ['today', `Hoy (${todayCount})`],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setDueFilter(key)}
            aria-pressed={dueFilter === key}
            className={`rounded-full px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
              dueFilter === key ? 'bg-accent text-accent-fg' : 'border border-border text-fg-muted hover:text-fg'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Renderizado de la Vista Seleccionada */}
      <main>
        {isLoading ? (
          <p className="py-12 text-center font-mono text-xs text-fg-muted">
            Abriendo pergaminos del Grimorio…
          </p>
        ) : mode === 'foco' ? (
          <GrimorioAccordionView
            tasks={visibleTasks}
            onOpenTask={setEditingTask}
          />
        ) : (
          <GrimorioTabsView
            tasks={visibleTasks}
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
