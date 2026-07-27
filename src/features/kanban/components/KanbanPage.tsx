import { useState } from 'react'
import { useAllBoardTasks } from '@/features/tasks/hooks'
import { GrimorioAccordionView } from '@/features/kanban/components/GrimorioAccordionView'
import { GrimorioTabsView } from '@/features/kanban/components/GrimorioTabsView'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

type GrimorioMode = 'foco' | 'ambitos'

export function KanbanPage() {
  const [mode, setMode] = useState<GrimorioMode>(() => {
    return (localStorage.getItem('questly_grimorio_mode') as GrimorioMode) || 'foco'
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const { data: tasks, isLoading } = useAllBoardTasks()

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
            📜 Foco Gradual
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('ambitos')}
            className={`view-mode-btn ${mode === 'ambitos' ? 'active' : ''}`}
          >
            🛡️ Ámbitos por Clase
          </button>
        </div>
      </header>

      {/* Renderizado de la Vista Seleccionada */}
      <main>
        {isLoading ? (
          <p className="py-12 text-center font-mono text-xs text-fg-muted">
            Abriendo pergaminos del Grimorio…
          </p>
        ) : mode === 'foco' ? (
          <GrimorioAccordionView
            tasks={tasks ?? []}
            onOpenTask={setEditingTask}
          />
        ) : (
          <GrimorioTabsView
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
