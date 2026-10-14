import { useState } from 'react'
import { X, PartyPopper } from 'lucide-react'
import { useLogFollowUpContact, useResolveFollowUp } from '@/features/followups/hooks'
import type { FollowUp } from '@/types/database.types'

export function LogContactModal({
  followUp,
  onClose,
  onResolvedLocally,
}: {
  followUp: FollowUp
  onClose: () => void
  onResolvedLocally: (id: string) => void
}) {
  const logContact = useLogFollowUpContact()
  const resolve = useResolveFollowUp()

  const [note, setNote] = useState('')
  const [days, setDays] = useState(2)

  async function handleSaveWait() {
    if (!note.trim()) return
    await logContact.mutateAsync({
      followUpId: followUp.id,
      notes: note.trim(),
      nextFollowUpDays: days,
    })
    onClose()
  }

  async function handleResolveSuccess() {
    if (!note.trim()) return
    // Guardar la nota final
    await logContact.mutateAsync({
      followUpId: followUp.id,
      notes: `[RESUELTO] ${note.trim()}`,
      nextFollowUpDays: days,
    })
    // Ejecutar animación de tarjeta antes de disparar la mutation real
    onResolvedLocally(followUp.id)
    onClose()

    // Llamada real al backend tras la animación
    setTimeout(() => {
      resolve.mutate({ followUpId: followUp.id, taskId: followUp.task_id })
    }, 600)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-parchment-log w-full max-w-lg rounded flex flex-col"
      >
        <header className="flex items-center justify-between border-b border-parchment-ink/20 p-6">
          <h3 className="font-display text-2xl uppercase tracking-tighter text-parchment-ink">
            Bitácora de Encuentro
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-xl text-parchment-ink/60 transition-transform hover:scale-110 hover:text-parchment-ink"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold uppercase text-parchment-ink/60">
              Resumen del contacto
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="¿Qué respuesta recibiste del aliado/cliente?"
              className="h-32 w-full resize-none rounded border border-parchment-ink/20 bg-shade/5 p-4 text-sm text-parchment-ink outline-none focus:border-parchment-ink/50"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs font-bold uppercase text-parchment-ink/60">
              Próximo aviso (Foco Corto)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={`rounded border py-4 font-mono text-xs font-bold uppercase transition-all ${
                    days === d
                      ? 'border-rune-deep bg-rune-deep text-white shadow-md'
                      : 'border-parchment-ink/20 bg-shade/5 text-parchment-ink/70 hover:bg-shade/10'
                  }`}
                >
                  +{d} DÍA{d > 1 ? 'S' : ''}
                </button>
              ))}
            </div>
            <p className="mt-2 font-mono text-xs italic text-parchment-ink/50">
              * El tiempo corto evita que la misión caiga en el olvido.
            </p>
          </div>
        </div>

        <footer className="flex flex-col gap-4 bg-shade/5 p-6 sm:flex-row">
          <button
            type="button"
            disabled={!note.trim() || logContact.isPending}
            onClick={handleSaveWait}
            className="flex-1 bg-parchment-ink py-4 font-display text-sm font-black uppercase tracking-widest text-parchment transition-all hover:brightness-125 disabled:opacity-50"
          >
            Sigue en Espera ⏳
          </button>
          <button
            type="button"
            disabled={!note.trim() || resolve.isPending}
            onClick={handleResolveSuccess}
            className="flex-1 border-2 border-parchment-ink py-4 font-display text-sm font-black uppercase tracking-widest text-parchment-ink transition-all hover:bg-shade/5 disabled:opacity-50"
          >
            Resolver Éxito <PartyPopper className="ml-1.5 inline h-4 w-4" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </div>
  )
}
