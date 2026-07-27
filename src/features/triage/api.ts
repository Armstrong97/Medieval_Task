import { fetchFirstColumnId } from '@/features/kanban/api'
import { updateTask } from '@/features/tasks/api'
import { createFollowUp } from '@/features/followups/api'
import type { Task, TaskSize } from '@/types/database.types'

export type DispatchOutcome = 'grimorio' | 'equip' | 'follow_up'

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

export interface DispatchInput {
  taskId: string
  title: string
  categoryId: string
  projectId: string | null
  deadlineIso: string
  size: TaskSize
  outcome: DispatchOutcome
  hudSlot: number | null
}

// Despacho de la Mesa de Estrategia: cubre las 3 salidas de la spec del
// Módulo 3. Siempre setea kanban_column_id (eso es lo que el trigger
// tasks_after_triage de Postgres usa para saber que la tarea salió del
// inbox y, si el inbox llega a 0, completar la quest diaria de triage) —
// aplica igual para las 3 salidas, incluida 'follow_up', porque lo que
// "tria" una tarea es tener columna, no el status.
export async function dispatchTriagedTask(input: DispatchInput): Promise<Task> {
  const kanbanColumnId = await fetchFirstColumnId(input.projectId)

  const task = await updateTask(input.taskId, {
    title: input.title,
    category_id: input.categoryId,
    project_id: input.projectId,
    kanban_column_id: kanbanColumnId,
    deadline: input.deadlineIso,
    size: input.size,
    // "Equipar en Combate" también pasa a in_progress, igual que
    // equipTaskToSlot del Battle HUD (Módulo 1) — mismo mecanismo, un solo
    // camino para pasar a esa combinación de estado en toda la app.
    status: input.outcome === 'follow_up' ? 'follow_up' : input.outcome === 'equip' ? 'in_progress' : 'pending',
    hud_slot: input.outcome === 'equip' ? input.hudSlot : null,
  })

  if (input.outcome === 'follow_up') {
    await createFollowUp({
      task_id: input.taskId,
      interval_days: DEFAULT_FOLLOW_UP_INTERVAL_DAYS,
      stakeholder_name: null,
      notes: null,
    })
  }

  return task
}
