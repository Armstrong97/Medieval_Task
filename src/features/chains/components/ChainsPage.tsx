import { useState } from 'react'
import { Workflow } from 'lucide-react'
import { ChainFlow } from '@/features/chains/components/ChainFlow'
import { useChainGraph } from '@/features/chains/hooks'
import { allChains } from '@/features/chains/graph'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

export function ChainsPage() {
  const { data, isLoading } = useChainGraph()
  const [editing, setEditing] = useState<Task | null>(null)

  const chains = data ? allChains(data.links) : []
  const isDone = (ids: Set<string>) => [...ids].every((id) => data?.tasks.get(id)?.status === 'done')
  const active = chains.filter((c) => !isDone(c))
  const finished = chains.filter(isDone)

  const renderChain = (ids: Set<string>, key: number) =>
    data && (
      <li key={key} className="rounded-2xl border border-glass/5 bg-shade/20 p-4">
        <ChainFlow ids={ids} links={data.links} tasks={data.tasks} onOpenTask={setEditing} />
      </li>
    )

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-fg">
          <Workflow className="h-6 w-6 text-accent" aria-hidden="true" /> Cadenas de misiones
        </h1>
        <p className="mt-1 text-sm text-fg-muted">
          Cada paso se despierta solo cuando se cumple el anterior. Crea una desde el editor de cualquier misión.
        </p>
      </header>

      {isLoading ? null : chains.length === 0 ? (
        <p className="font-mono text-xs text-fg-muted/60">
          Aún no tienes cadenas. Abre una misión y usa «Cadena de misiones» para añadir su siguiente paso.
        </p>
      ) : (
        <>
          <ul className="space-y-4">{active.map(renderChain)}</ul>
          {finished.length > 0 && (
            <details>
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-fg-muted/60">
                Cadenas completadas ({finished.length})
              </summary>
              <ul className="mt-3 space-y-4 opacity-70">{finished.map(renderChain)}</ul>
            </details>
          )}
        </>
      )}

      {editing && (
        <TaskModal
          task={editing}
          defaultProjectId={editing.project_id}
          defaultKanbanColumnId=""
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
