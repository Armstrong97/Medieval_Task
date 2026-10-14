import { useEffect, useState } from 'react'
import { format, formatDistanceToNow, isPast } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronRight, Check, Phone, ScrollText } from 'lucide-react'
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
  const [confirmingResolve, setConfirmingResolve] = useState(false)

  // La confirmación se descarta sola para no dejar un botón "armado".
  useEffect(() => {
    if (!confirmingResolve) return
    const t = window.setTimeout(() => setConfirmingResolve(false), 4000)
    return () => window.clearTimeout(t)
  }, [confirmingResolve])

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
            <p className="mt-1 font-mono text-xs font-bold uppercase text-rune">
              <ScrollText className="mr-1 inline h-4 w-4" aria-hidden="true" />Aliado: {followUp.stakeholder_name || 'Desconocido'}
            </p>
          </div>
          <span
            className={`shrink-0 font-mono text-xs font-bold uppercase ${
              isOverdue ? 'text-warn-fg' : 'text-fg-muted/60'
            }`}
          >
            {formatDistanceToNow(new Date(followUp.next_reminder_at), { addSuffix: true, locale: es })}
          </span>
        </div>

        {/* Medidor de Insistencia */}
        <div className="flex items-center gap-4 rounded-xl border border-glass/5 bg-shade/20 p-3">
          <span className="font-mono text-xs uppercase tracking-tighter text-fg-muted/60">
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
            className="flex items-center gap-1.5 text-left font-mono text-xs uppercase text-fg-muted/60 transition-all hover:text-fg"
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
              <p className="font-mono text-xs italic text-fg-muted/40">Sin registros previos.</p>
            ) : (
              logs?.map((log) => (
                <div key={log.id} className="text-xs italic text-fg-muted">
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
            className="flex-1 rounded-lg bg-rune-deep py-3 font-display text-xs font-black uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-95"
          >
            <Phone className="mr-1.5 inline h-4 w-4" aria-hidden="true" />Registrar Contacto
          </button>
          {confirmingResolve ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmingResolve(false)
                  onResolvedLocally(followUp.id)
                  setTimeout(
                    () => resolveFollowUp.mutate({ followUpId: followUp.id, taskId: followUp.task_id }),
                    600,
                  )
                }}
                className="rounded-lg bg-accent px-3 py-3 font-mono text-xs font-black uppercase text-accent-fg"
              >
                Resolver sin bitácora
              </button>
              <button
                type="button"
                onClick={() => setConfirmingResolve(false)}
                className="rounded-lg border border-border px-3 py-3 font-mono text-xs font-bold uppercase text-fg-muted"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingResolve(true)}
              className="rounded-lg border border-glass/10 px-4 py-3 text-lg transition-all hover:bg-accent/20"
              title="Resolver sin dejar bitácora"
            >
              <Check className="h-5 w-5 text-accent" aria-label="Resolver sin dejar bitácora" />
            </button>
          )}
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
