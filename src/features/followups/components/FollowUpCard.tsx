import { useState } from 'react'
import { format, formatDistanceToNow, isPast } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronRight } from 'lucide-react'
import { useFollowUpLogs, useResolveFollowUp } from '@/features/followups/hooks'
import { LogContactModal } from '@/features/followups/components/LogContactModal'
import type { FollowUp, Task } from '@/types/database.types'

export function FollowUpCard({
  followUp,
  task,
  onResolvedLocally,
  isResolvingLocally,
}: {
  followUp: FollowUp
  task: Task
  onResolvedLocally: (id: string) => void
  isResolvingLocally: boolean
}) {
  const { data: logs } = useFollowUpLogs(followUp.id)
  const resolveFollowUp = useResolveFollowUp()

  const [modalOpen, setModalOpen] = useState(false)
  const [bitacoraOpen, setBitacoraOpen] = useState(false)

  const isOverdue = isPast(new Date(followUp.next_reminder_at))
  const contactCount = logs?.length ?? 0

  return (
    <>
      <article
        className={`follow-up-card flex flex-col gap-5 rounded-2xl p-6 ${
          isResolvingLocally ? 'animate-success-glow' : ''
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="min-w-0 pr-4">
            <h2 className="truncate font-display text-xl font-bold text-fg">{task.title}</h2>
            <p className="mt-1 font-mono text-xs font-bold uppercase text-sky-400">
              📜 Aliado: {followUp.stakeholder_name || 'Desconocido'}
            </p>
          </div>
          <span
            className={`shrink-0 font-mono text-[10px] font-bold uppercase ${
              isOverdue ? 'text-red-400' : 'text-fg-muted/60'
            }`}
          >
            {formatDistanceToNow(new Date(followUp.next_reminder_at), { addSuffix: true, locale: es })}
          </span>
        </div>

        {/* Medidor de Insistencia */}
        <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-black/20 p-3">
          <span className="font-mono text-[10px] uppercase tracking-tighter text-fg-muted/60">
            Intentos:
          </span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className={`insistence-dot ${
                  dot <= contactCount ? (dot >= 4 ? 'warning' : 'active') : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Acordeón de Bitácora Histórica */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setBitacoraOpen((v) => !v)}
            className="flex items-center gap-1.5 text-left font-mono text-[10px] uppercase text-fg-muted/60 transition-all hover:text-fg"
          >
            <ChevronRight
              className={`h-3.5 w-3.5 transition-transform ${bitacoraOpen ? 'rotate-90' : ''}`}
            />
            Ver Bitácora Histórica ({logs?.length ?? 0} Entradas)
          </button>

          <div
            className={`bitacora-accordion ml-1 mt-1 space-y-2 border-l border-border pl-4 ${
              bitacoraOpen ? 'open' : ''
            }`}
          >
            {logs?.length === 0 ? (
              <p className="font-mono text-[10px] italic text-fg-muted/40">Sin registros previos.</p>
            ) : (
              logs?.map((log) => (
                <div key={log.id} className="text-[11px] italic text-fg-muted">
                  <span className="mr-2 font-mono font-bold text-accent">
                    {format(new Date(log.created_at), 'd MMM').toUpperCase()}
                  </span>
                  {log.notes}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Acciones Rápidas */}
        <footer className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex-1 rounded-lg bg-[#0284c7] py-3 font-display text-xs font-black uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-95"
          >
            📞 Registrar Contacto
          </button>
          <button
            type="button"
            onClick={() => {
              onResolvedLocally(followUp.id)
              setTimeout(
                () => resolveFollowUp.mutate({ followUpId: followUp.id, taskId: followUp.task_id }),
                600,
              )
            }}
            className="rounded-lg border border-white/10 px-4 py-3 text-lg transition-all hover:bg-green-500/20"
            title="Resolver Directamente"
          >
            ✅
          </button>
        </footer>
      </article>

      {modalOpen && (
        <LogContactModal
          followUp={followUp}
          onClose={() => setModalOpen(false)}
          onResolvedLocally={onResolvedLocally}
        />
      )}
    </>
  )
}
