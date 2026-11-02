import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Sparkles } from 'lucide-react'
import { useAiEnabled, useInsights } from '@/features/ai/hooks'
import { fetchTaskById } from '@/features/tasks/api'
import { TaskModal } from '@/features/tasks/components/TaskModal'

// «Tu ritmo»: lo que SQL calcula de los últimos 30 días, interpretado por la IA
// con tono sin culpa. Solo se pide al pulsar el botón (cada análisis gasta cuota).
export function RhythmCard() {
  const aiEnabled = useAiEnabled()
  const { data, request } = useInsights()
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)
  const { data: openTask } = useQuery({
    queryKey: ['tasks', 'by-id', openTaskId],
    queryFn: () => fetchTaskById(openTaskId as string),
    enabled: openTaskId !== null,
  })

  if (!aiEnabled) return null

  return (
    <section className="card-stone-bg rounded-2xl border-2 border-rune/30 p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-widest text-fg">
          <Sparkles className="h-4 w-4 text-rune" aria-hidden="true" /> Tu ritmo
        </h2>
        <button
          type="button"
          onClick={() => request.mutate()}
          disabled={request.isPending}
          className="rounded-lg border border-rune/30 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-rune transition-colors hover:bg-rune/10 disabled:opacity-50"
        >
          {request.isPending ? 'Analizando…' : data ? 'Actualizar' : 'Analizar mi ritmo'}
        </button>
      </div>

      {request.isError && (
        <p role="alert" className="mt-3 font-mono text-xs font-medium text-warn-fg">
          {request.error.message}
        </p>
      )}

      {!data && !request.isPending && (
        <p className="mt-3 font-mono text-xs text-fg-muted">
          Descubre cuándo rindes más y qué se repite, a partir de tus últimos 30 días.
        </p>
      )}

      {data?.insufficient && (
        <p className="mt-3 font-mono text-xs text-fg-muted">
          Todavía hay poco historial para ver patrones. Completa unas cuantas misiones más y vuelve a probar.
        </p>
      )}

      {data && !data.insufficient && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-fg">{data.summary}</p>

          {data.observations.length > 0 && (
            <ul className="list-disc space-y-1.5 pl-5 font-mono text-xs text-fg-muted">
              {data.observations.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          )}

          {data.stuck.length > 0 && (
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">¿Las partimos?</p>
              {data.stuck.map((k) => (
                <div key={k.task_id} className="space-y-1 rounded-xl border border-glass/10 bg-shade/20 p-3">
                  <p className="text-sm font-medium text-fg">{k.title}</p>
                  <p className="font-mono text-xs text-fg-muted">{k.advice}</p>
                  <button
                    type="button"
                    onClick={() => setOpenTaskId(k.task_id)}
                    className="rounded-lg border border-border bg-glass/5 px-3 py-1.5 font-mono text-xs font-bold text-fg hover:bg-glass/10"
                  >
                    Abrir misión
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {openTask && <TaskModal task={openTask} onClose={() => setOpenTaskId(null)} />}
    </section>
  )
}
