import { chainDescendants, chainLevels } from '@/features/chains/graph'
import type { LinkEvent, Task, TaskLink, UnlockMode } from '@/types/database.types'

// Ajustes comunes de una etapa: todas sus misiones se despiertan igual.
export interface StageSettings {
  mode: UnlockMode
  event: LinkEvent
  days: number | null
}

export const DEFAULT_STAGE: StageSettings = { mode: 'all', event: 'task_done', days: 3 }

export interface DraftStage extends StageSettings {
  id: string
  steps: { id: string; title: string }[]
}

export interface PersistedStage {
  tasks: Task[]
  predIds: string[]
  settings: StageSettings
}

// Etapas aguas abajo de una misión: la etapa N son las que quedan N pasos
// después (camino más largo). Una etapa espera a la anterior.
export function persistedStages(rootId: string, links: TaskLink[], tasks: Map<string, Task>): PersistedStage[] {
  const ids = new Set([rootId, ...chainDescendants(rootId, links)])
  const levels = chainLevels(ids, links)
  return levels.slice(1).map((level, i) => {
    const stageTasks = level.map((id) => tasks.get(id)).filter((t): t is Task => !!t)
    const first = stageTasks[0]
    const incoming = links.filter((l) => l.to_task_id === first?.id && levels[i].includes(l.from_task_id))
    return {
      tasks: stageTasks,
      predIds: incoming.map((l) => l.from_task_id),
      settings: {
        mode: first?.unlock_mode ?? DEFAULT_STAGE.mode,
        event: incoming[0]?.on_event ?? DEFAULT_STAGE.event,
        days: first?.unlock_deadline_days ?? null,
      },
    }
  })
}
