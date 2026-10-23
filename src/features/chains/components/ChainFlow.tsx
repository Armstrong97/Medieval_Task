import { Fragment } from 'react'
import { Check, ChevronDown, Lock, Phone, Play } from 'lucide-react'
import { chainLevels } from '@/features/chains/graph'
import type { Task, TaskLink } from '@/types/database.types'

function nodeState(t: Task) {
  if (t.status === 'done') return { label: 'Hecha', Icon: Check, cls: 'text-accent' }
  if (t.locked) return { label: 'Dormida', Icon: Lock, cls: 'text-gold' }
  if (t.status === 'follow_up') return { label: 'En seguimiento', Icon: Phone, cls: 'text-rune' }
  return { label: 'Activa', Icon: Play, cls: 'text-accent' }
}

// Flujo vertical de una cadena: un nivel por fila, las ramas lado a lado.
export function ChainFlow({
  ids,
  links,
  tasks,
  focusId,
  onOpenTask,
}: {
  ids: Set<string>
  links: TaskLink[]
  tasks: Map<string, Task>
  focusId?: string
  onOpenTask?: (task: Task) => void
}) {
  const levels = chainLevels(ids, links)

  return (
    <div className="flex flex-col items-stretch gap-1">
      {levels.map((level, i) => (
        <Fragment key={i}>
          {i > 0 && <ChevronDown className="mx-auto h-4 w-4 text-fg-muted/50" aria-hidden="true" />}
          <div className="flex flex-wrap justify-center gap-2">
            {level.map((id) => {
              const t = tasks.get(id)
              if (!t) return null
              const { label, Icon, cls } = nodeState(t)
              const preds = links.filter((l) => l.to_task_id === id && ids.has(l.from_task_id))
              const body = (
                <>
                  <span className={`flex items-center gap-1 font-mono text-xs font-bold uppercase ${cls}`}>
                    <Icon className="h-3 w-3" aria-hidden="true" /> {label}
                  </span>
                  <span className={`block truncate text-sm text-fg ${t.status === 'done' ? 'line-through opacity-60' : ''}`}>
                    {t.title}
                  </span>
                  {preds.length > 1 && (
                    <span className="font-mono text-xs text-fg-muted/70">
                      espera a {t.unlock_mode === 'any' ? 'cualquiera' : 'todas'} ({preds.length})
                    </span>
                  )}
                </>
              )
              const box = `min-w-0 max-w-[16rem] flex-1 basis-40 rounded-xl border p-3 text-left ${
                id === focusId ? 'border-accent bg-accent/10' : 'border-glass/10 bg-shade/30'
              }`
              return onOpenTask ? (
                <button key={id} type="button" onClick={() => onOpenTask(t)} className={`${box} hover:border-accent/60`}>
                  {body}
                </button>
              ) : (
                <div key={id} className={box}>
                  {body}
                </div>
              )
            })}
          </div>
        </Fragment>
      ))}
    </div>
  )
}
