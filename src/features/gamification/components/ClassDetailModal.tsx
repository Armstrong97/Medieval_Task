import { useState } from 'react'
import { X, Check, ScrollText, Sparkles } from 'lucide-react'
import { useTasksByCategory, useCompleteTask } from '@/features/tasks/hooks'
import type { Category, ClassRank, UserCategoryXp } from '@/types/database.types'

export function ClassDetailModal({
  category,
  categoryXp,
  rank,
  onClose,
}: {
  category: Category
  categoryXp?: UserCategoryXp
  rank?: ClassRank
  onClose: () => void
}) {
  const { data: tasks } = useTasksByCategory(category.id)
  const completeTask = useCompleteTask()

  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active')
  const [flashing, setFlashing] = useState(false)

  const activeTasks = (tasks ?? []).filter((t) => t.status !== 'done')
  const historyTasks = (tasks ?? []).filter((t) => t.status === 'done')

  const level = categoryXp?.current_level ?? 1
  const xpCurrent = categoryXp?.current_xp ?? 0
  const xpMax = 2000
  const xpPercent = Math.min(100, Math.round((xpCurrent / xpMax) * 100))

  function handleComplete(taskId: string, projectId: string | null) {
    setFlashing(true)
    completeTask.mutate({ id: taskId, project_id: projectId })
    setTimeout(() => setFlashing(false), 600)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-parchment-scroll relative w-full max-w-lg rounded-xl"
      >
        {/* Encabezado del Pergamino */}
        <div className="border-b border-parchment-ink/20 p-6 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-xl text-parchment-ink/60 transition-opacity hover:opacity-100"
          >
            <X className="h-6 w-6" />
          </button>
          <Sparkles className="mx-auto mb-2 h-12 w-12 text-parchment-ink" aria-hidden="true" />
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-parchment-ink">
            {rank?.rank_name ?? category.class_name}
          </h2>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-parchment-ink/60">
            Clase: {category.name} · Nivel {level}
          </p>
        </div>

        {/* Pestañas Internas */}
        <div className="flex border-b border-parchment-ink/20 font-mono text-xs font-black uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 transition-colors ${
              activeTab === 'active' ? 'bg-parchment-ink/10 text-parchment-ink' : 'text-parchment-ink/40'
            }`}
          >
            Misiones Activas ({activeTasks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 transition-colors ${
              activeTab === 'history' ? 'bg-parchment-ink/10 text-parchment-ink' : 'text-parchment-ink/40'
            }`}
          >
            Victorias ({historyTasks.length})
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 space-y-6">
          {/* Sección de XP */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-xs font-bold uppercase text-parchment-ink">
              <span>Experiencia de Clase</span>
              <span>
                {xpCurrent} / {xpMax} XP
              </span>
            </div>
            <div className="h-3.5 w-full overflow-hidden rounded-full border border-parchment-ink/20 bg-parchment-ink/10">
              <div
                className={`h-full bg-parchment-ink transition-all ${flashing ? 'xp-flash-anim' : ''}`}
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Lista de Misiones */}
          <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
            {activeTab === 'active' ? (
              activeTasks.length === 0 ? (
                <p className="font-mono text-xs text-parchment-ink/50 italic">Sin misiones pendientes.</p>
              ) : (
                activeTasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between rounded-lg border border-parchment-ink/10 bg-glass/50 p-3.5"
                  >
                    <div>
                      <p className="font-display text-sm font-bold text-parchment-ink">{t.title}</p>
                      <p className="font-mono text-xs uppercase text-parchment-ink/60">
                        RECOMPENSA: +{t.xp_reward || 10} XP
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={t.locked}
                      onClick={() => handleComplete(t.id, t.project_id)}
                      className="disabled:opacity-30 rounded bg-parchment-ink p-2 text-xs font-black text-parchment transition-transform active:scale-95"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )
            ) : historyTasks.length === 0 ? (
              <p className="font-mono text-xs text-parchment-ink/50 italic">Ninguna victoria aún.</p>
            ) : (
              historyTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-lg border border-parchment-ink/10 bg-glass/30 p-3.5 opacity-70"
                >
                  <div>
                    <p className="font-display text-sm font-bold text-parchment-ink line-through">{t.title}</p>
                    <p className="font-mono text-xs uppercase text-parchment-ink/60">
                      RECIBIDO +{t.xp_reward || 10} XP
                    </p>
                  </div>
                  <ScrollText className="h-4 w-4" aria-hidden="true" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
