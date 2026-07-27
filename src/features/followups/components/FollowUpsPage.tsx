import { useState } from 'react'
import { isPast } from 'date-fns'
import { Flame, Shield } from 'lucide-react'
import { useActiveFollowUps } from '@/features/followups/hooks'
import { useTasksByIds } from '@/features/tasks/hooks'
import { FollowUpCard } from '@/features/followups/components/FollowUpCard'

export function FollowUpsPage() {
  const { data: followUps, isLoading } = useActiveFollowUps()
  const { data: tasks } = useTasksByIds(followUps?.map((f) => f.task_id) ?? [])

  // Estado local para manejar las animaciones de desaparición: el follow-up
  // sigue en la lista (para que se vea el destello) hasta que la mutation
  // real invalida la query y desaparece solo en el próximo fetch.
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set())

  const rows = (followUps ?? [])
    .map((followUp) => ({ followUp, task: tasks?.find((t) => t.id === followUp.task_id) }))
    .filter((row) => row.task && row.task.status !== 'done')

  const overdueCount = rows.filter((r) => isPast(new Date(r.followUp.next_reminder_at))).length
  const waitingCount = rows.length - overdueCount

  function handleResolvedLocally(id: string) {
    setResolvingIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      {/* Header Titular y Badges */}
      <header className="mb-10">
        <h1 className="mb-2 font-display text-3xl font-black uppercase tracking-widest text-accent md:text-4xl">
          PACTO DE CUSTODIA — SEGUIMIENTOS
        </h1>
        <p className="mb-6 font-mono text-xs italic text-fg-muted/60">
          Misiones delegadas o dependientes de aliados y emisarios.
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2">
            <Flame className="h-5 w-5 text-red-500" />
            <span className="font-mono text-xs font-bold uppercase text-red-400">
              {overdueCount} Necesitan Contacto Hoy
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2">
            <Shield className="h-5 w-5 text-sky-400" />
            <span className="font-mono text-xs font-bold uppercase text-sky-400">
              {waitingCount} En Espera Paciente
            </span>
          </div>
        </div>
      </header>

      {/* Renderizado de Tarjetas (Grid 2 Columnas) */}
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {isLoading ? (
          <p className="col-span-full py-12 text-center font-mono text-xs text-fg-muted">
            Desenrollando pergaminos de custodia...
          </p>
        ) : rows.length === 0 ? (
          <div className="col-span-full py-16 text-center opacity-40">
            <span className="mb-4 block text-5xl">🕊️</span>
            <p className="font-display text-lg uppercase tracking-widest">
              No hay pactos pendientes de respuesta.
            </p>
          </div>
        ) : (
          rows.map(({ followUp, task }) => (
            <FollowUpCard
              key={followUp.id}
              followUp={followUp}
              task={task!}
              onResolvedLocally={handleResolvedLocally}
              isResolvingLocally={resolvingIds.has(followUp.id)}
            />
          ))
        )}
      </main>
    </div>
  )
}
