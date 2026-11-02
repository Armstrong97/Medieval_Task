import { useState } from 'react'
import { Check, Lock, LockOpen, Workflow, X } from 'lucide-react'
import { ChainFlow } from '@/features/chains/components/ChainFlow'
import { StageComposer, type ComposerStage } from '@/features/chains/components/StageComposer'
import { chainComponent } from '@/features/chains/graph'
import { DEFAULT_STAGE, persistedStages, type StageSettings } from '@/features/chains/stages'
import { createChain, createStep, removeStep, updateStage } from '@/features/chains/api'
import { SuggestStages } from '@/features/chains/components/SuggestStages'
import {
  useChainEdit,
  useChainGraph,
  useCreateTaskLink,
  useDeleteTaskLink,
  useLinkCandidates,
  useTaskLinks,
} from '@/features/chains/hooks'
import { updateTask as updateTaskApi } from '@/features/tasks/api'
import { useUpdateTask } from '@/features/tasks/hooks'
import type { LinkEvent, Task, UnlockMode } from '@/types/database.types'

const EVENT_LABEL: Record<LinkEvent, string> = {
  task_done: 'al completarse',
  follow_up_resolved: 'al resolver su follow-up',
}

// Cadena de misiones de una misión ya triada: compositor de etapas (lo normal)
// y, plegado en «Avanzado», lo que no cabe en etapas (esperar a una misión
// concreta, ver la cadena completa, ajustes propios).
export function ChainSection({ task }: { task: Task }) {
  const { data: graph } = useChainGraph()
  const edit = useChainEdit()
  const updateTask = useUpdateTask()

  const stages = graph ? persistedStages(task.id, graph.links, graph.tasks) : []
  const composerStages: ComposerStage[] = stages.map((s, i) => ({
    key: s.tasks[0]?.id ?? String(i),
    settings: s.settings,
    steps: s.tasks.map((t) => ({
      key: t.id,
      title: t.title,
      state: t.status === 'done' ? 'done' : t.locked ? 'locked' : 'open',
    })),
  }))

  function handleAdd(stageIndex: number | null, title: string) {
    if (stageIndex === null) {
      const last = stages[stages.length - 1]
      const settings: StageSettings = {
        ...DEFAULT_STAGE,
        // Un paso tras una misión en seguimiento suele esperar la respuesta.
        event: !last && task.status === 'follow_up' ? 'follow_up_resolved' : DEFAULT_STAGE.event,
      }
      edit.mutate(() => createStep(task, { title, predIds: last ? last.tasks.map((t) => t.id) : [task.id], ...settings }))
    } else {
      const stage = stages[stageIndex]
      edit.mutate(() => createStep(task, { title, predIds: stage.predIds, ...stage.settings }))
    }
  }

  return (
    <div className="space-y-4 rounded-2xl border border-glass/5 bg-shade/20 p-5">
      <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-fg-muted/60">
        <Workflow className="h-3.5 w-3.5" aria-hidden="true" /> ¿Qué viene después?
      </p>

      {task.locked && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gold/30 bg-gold/10 p-3">
          <span className="flex items-center gap-1.5 font-mono text-xs text-fg">
            <Lock className="h-3.5 w-3.5 text-gold" aria-hidden="true" /> Dormida: espera a que se cumpla su cadena.
          </span>
          <button
            type="button"
            onClick={() => updateTask.mutate({ id: task.id, patch: { locked: false } })}
            className="tactile-chip flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs font-bold uppercase"
          >
            <LockOpen className="h-3.5 w-3.5" aria-hidden="true" /> Despertar ahora
          </button>
        </div>
      )}

      {graph && stages.length === 0 && (
        <SuggestStages
          rootTitle={task.title}
          rootDescription={task.description}
          onApply={(drafts) => {
            // Misma regla que al añadir a mano: tras una misión en seguimiento, la primera etapa espera la respuesta.
            const first = task.status === 'follow_up' ? [{ ...drafts[0], event: 'follow_up_resolved' as const }, ...drafts.slice(1)] : drafts
            edit.mutate(() => createChain(task, first))
          }}
        />
      )}

      <StageComposer
        rootTitle={task.title}
        stages={composerStages}
        busy={edit.isPending}
        onAdd={handleAdd}
        onRename={(_i, key, title) => edit.mutate(() => updateTaskApi(key, { title }))}
        onRemove={(_i, key) => edit.mutate(() => removeStep(key))}
        onSettings={(i, patch) => edit.mutate(() => updateStage(stages[i].tasks.map((t) => t.id), patch))}
      />

      {edit.isError && (
        <p className="font-mono text-xs text-warn-fg">
          {edit.error instanceof Error ? edit.error.message : 'No se pudo guardar la cadena.'}
        </p>
      )}

      <Advanced task={task} />
    </div>
  )
}

// Lo que no encaja en etapas: esperar a una misión concreta (o desbloquear una
// existente), ajustes propios y la cadena completa.
function Advanced({ task }: { task: Task }) {
  const { data } = useTaskLinks(task.id)
  const { data: graph } = useChainGraph()
  const { data: candidates } = useLinkCandidates()
  const createLink = useCreateTaskLink()
  const deleteLink = useDeleteTaskLink()
  const updateTask = useUpdateTask()

  const [onEvent, setOnEvent] = useState<LinkEvent>('task_done')
  const [error, setError] = useState<string | null>(null)

  const links = data?.links ?? []
  const byId = new Map((data?.others ?? []).map((t) => [t.id, t]))
  const previous = links.filter((l) => l.to_task_id === task.id)
  const linkedIds = new Set(links.flatMap((l) => [l.from_task_id, l.to_task_id]))
  const options = (candidates ?? []).filter((t) => t.id !== task.id && !linkedIds.has(t.id))

  function link(from: string, to: string) {
    setError(null)
    createLink.mutate(
      { from_task_id: from, to_task_id: to, on_event: onEvent },
      { onError: (err) => setError(err instanceof Error ? err.message : 'No se pudo enlazar.') },
    )
  }

  const selectCls =
    'w-full rounded-lg border border-glass/10 bg-shade/30 px-2 py-2 font-mono text-xs text-fg outline-none focus:border-accent'

  return (
    <details className="group">
      <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-fg-muted/40 hover:text-fg group-open:text-accent">
        Avanzado
      </summary>
      <div className="space-y-4 pt-3">
        {graph && links.length > 0 && (
          <ChainFlow
            ids={chainComponent(task.id, graph.links)}
            links={graph.links}
            tasks={graph.tasks}
            focusId={task.id}
          />
        )}

        {previous.length > 0 && (
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase text-fg-muted/50">Esta misión espera a</p>
            {previous.map((l) => {
              const p = byId.get(l.from_task_id)
              return (
                <div key={l.id} className="flex items-center gap-2 text-xs text-fg">
                  {p?.status === 'done' ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" aria-label="Hecha" />
                  ) : (
                    <Lock className="h-3.5 w-3.5 shrink-0 text-fg-muted/50" aria-hidden="true" />
                  )}
                  <span className={`flex-1 truncate ${p?.status === 'done' ? 'line-through opacity-50' : ''}`}>
                    {p?.title ?? '…'}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-fg-muted/60">{EVENT_LABEL[l.on_event]}</span>
                  <button
                    type="button"
                    onClick={() => deleteLink.mutate(l.id)}
                    aria-label="Quitar enlace"
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-fg-muted/50 hover:text-fg"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )
            })}

            <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs text-fg-muted">
              {previous.length > 1 && (
                <label className="flex items-center gap-1.5">
                  Se despierta cuando se cumpla
                  <select
                    value={task.unlock_mode}
                    onChange={(e) =>
                      updateTask.mutate({ id: task.id, patch: { unlock_mode: e.target.value as UnlockMode } })
                    }
                    className="rounded-lg border border-glass/10 bg-shade/30 px-2 py-1 text-fg"
                  >
                    <option value="all">todas</option>
                    <option value="any">cualquiera</option>
                  </select>
                </label>
              )}
              <label className="flex items-center gap-1.5">
                Plazo al despertar
                <input
                  type="number"
                  min={0}
                  defaultValue={task.unlock_deadline_days ?? ''}
                  placeholder="—"
                  onBlur={(e) =>
                    updateTask.mutate({
                      id: task.id,
                      patch: {
                        unlock_deadline_days: e.target.value === '' ? null : Math.max(0, Number(e.target.value)),
                      },
                    })
                  }
                  className="w-14 rounded-lg border border-glass/10 bg-shade/30 px-2 py-1 text-fg outline-none focus:border-accent"
                />
                días
              </label>
            </div>
          </div>
        )}

        {options.length > 0 && (
          <div className="space-y-2">
            <label className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-fg-muted">
              Enlazar con una misión existente, se cumple
              <select
                value={onEvent}
                onChange={(e) => setOnEvent(e.target.value as LinkEvent)}
                className="rounded-lg border border-glass/10 bg-shade/30 px-2 py-1 text-fg"
              >
                <option value="task_done">al completarse la anterior</option>
                <option value="follow_up_resolved">al resolverse su follow-up</option>
              </select>
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <select
                value=""
                onChange={(e) => e.target.value && link(task.id, e.target.value)}
                className={selectCls}
                aria-label="Desbloquear una misión existente"
              >
                <option value="">Desbloquea a… (misión existente)</option>
                {options.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
              <select
                value=""
                onChange={(e) => e.target.value && link(e.target.value, task.id)}
                className={selectCls}
                aria-label="Esperar a una misión existente"
              >
                <option value="">Espera a… (misión existente)</option>
                {options.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {error && <p className="font-mono text-xs text-warn-fg">{error}</p>}
      </div>
    </details>
  )
}
