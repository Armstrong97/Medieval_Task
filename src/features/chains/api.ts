import { addDays } from 'date-fns'
import { supabase } from '@/lib/supabase'
import { showToast } from '@/components/ui/toast-store'
import { fetchFirstColumnId } from '@/features/kanban/api'
import { createTask, deleteTask, fetchTasksByIds } from '@/features/tasks/api'
import { DEFAULT_STAGE, type DraftStage, type StageSettings } from '@/features/chains/stages'
import type { LinkEvent, Task, TaskLink, UnlockMode } from '@/types/database.types'

// Enlaces donde la misión es predecesora (from) o sucesora (to).
export async function fetchTaskLinks(taskId: string): Promise<TaskLink[]> {
  const { data, error } = await supabase
    .from('task_links')
    .select('*')
    .or(`from_task_id.eq.${taskId},to_task_id.eq.${taskId}`)
  if (error) throw error
  return data
}

export async function fetchAllLinks(): Promise<TaskLink[]> {
  const { data, error } = await supabase.from('task_links').select('*')
  if (error) throw error
  return data
}

export async function createTaskLinks(
  rows: { from_task_id: string; to_task_id: string; on_event: LinkEvent }[],
): Promise<void> {
  if (rows.length === 0) return
  const { error } = await supabase.from('task_links').insert(rows)
  if (error) throw error
}

export async function createTaskLink(input: {
  from_task_id: string
  to_task_id: string
  on_event: LinkEvent
}): Promise<void> {
  await createTaskLinks([input])
}

export async function deleteTaskLink(id: string): Promise<void> {
  const { error } = await supabase.from('task_links').delete().eq('id', id)
  if (error) throw error
}

// Misiones que se pueden enlazar: de nivel superior, ya triadas y sin terminar
// (incluye las que están en seguimiento: suelen ser la predecesora).
export async function fetchLinkCandidates(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .is('parent_task_id', null)
    .not('kanban_column_id', 'is', null)
    .neq('status', 'done')
    .order('title')
  if (error) throw error
  return data
}

// Crea un paso ya dormido que espera a predIds. Hereda proyecto, clase y tamaño
// de `inherit`; el deadline provisional lo reemplaza el motor (ahora + days) al
// despertar. Si el enlace falla, no deja la misión huérfana.
export async function createStep(
  inherit: Task,
  input: { title: string; predIds: string[] } & StageSettings,
): Promise<Task> {
  const created = await createTask({
    title: input.title,
    project_id: inherit.project_id,
    category_id: inherit.category_id,
    size: inherit.size ?? 'small',
    kanban_column_id: await fetchFirstColumnId(inherit.project_id),
    deadline: addDays(new Date(), input.days ?? DEFAULT_STAGE.days ?? 3).toISOString(),
    locked: true,
    unlock_mode: input.mode,
    unlock_deadline_days: input.days,
  })
  try {
    await createTaskLinks(
      input.predIds.map((from) => ({ from_task_id: from, to_task_id: created.id, on_event: input.event })),
    )
  } catch (err) {
    await deleteTask(created.id)
    throw err
  }
  return created
}

// Persiste un borrador de etapas (Mesa de Estrategia) colgando de `root`.
export async function createChain(root: Task, stages: DraftStage[]): Promise<void> {
  let prev = [root.id]
  for (const stage of stages) {
    const ids: string[] = []
    for (const step of stage.steps) {
      const t = await createStep(root, { title: step.title, predIds: prev, ...stage })
      ids.push(t.id)
    }
    prev = ids
  }
}

// Quita un paso. Si algún sucesor solo dependía de él, se le enlaza a las
// predecesoras del paso quitado: borrarlo sin esto lo despertaría de golpe.
export async function removeStep(taskId: string): Promise<void> {
  const { data: links, error } = await supabase
    .from('task_links')
    .select('*')
    .or(`from_task_id.eq.${taskId},to_task_id.eq.${taskId}`)
  if (error) throw error
  const preds = links.filter((l) => l.to_task_id === taskId)
  const succs = links.filter((l) => l.from_task_id === taskId)

  if (preds.length > 0 && succs.length > 0) {
    const { data: incoming, error: inError } = await supabase
      .from('task_links')
      .select('to_task_id')
      .in(
        'to_task_id',
        succs.map((l) => l.to_task_id),
      )
    if (inError) throw inError
    const soleSuccs = succs.filter((s) => incoming.filter((i) => i.to_task_id === s.to_task_id).length === 1)
    const bridge = preds.flatMap((p) =>
      soleSuccs.map((s) => ({ from_task_id: p.from_task_id, to_task_id: s.to_task_id, on_event: s.on_event })),
    )
    if (bridge.length > 0) {
      const { error: bridgeError } = await supabase
        .from('task_links')
        .upsert(bridge, { onConflict: 'from_task_id,to_task_id', ignoreDuplicates: true })
      if (bridgeError) throw bridgeError
    }
  }
  await deleteTask(taskId)
}

// Ajustes de etapa: el disparador vive en los enlaces; modo y plazo, en las misiones.
export async function updateStage(taskIds: string[], patch: Partial<StageSettings>): Promise<void> {
  if (patch.event) {
    const { error } = await supabase.from('task_links').update({ on_event: patch.event }).in('to_task_id', taskIds)
    if (error) throw error
  }
  const taskPatch: { unlock_mode?: UnlockMode; unlock_deadline_days?: number | null } = {}
  if (patch.mode) taskPatch.unlock_mode = patch.mode
  if ('days' in patch) taskPatch.unlock_deadline_days = patch.days ?? null
  if (Object.keys(taskPatch).length > 0) {
    const { error } = await supabase.from('tasks').update(taskPatch).in('id', taskIds)
    if (error) throw error
  }
}

async function fetchLockedSuccessorIds(taskId: string): Promise<string[]> {
  const { data: links, error } = await supabase
    .from('task_links')
    .select('to_task_id')
    .eq('from_task_id', taskId)
  if (error) throw error
  const tasks = await fetchTasksByIds(links.map((l) => l.to_task_id))
  return tasks.filter((t) => t.locked).map((t) => t.id)
}

// Ejecuta una acción que puede despertar misiones (completar, resolver un
// follow-up) y avisa cuáles se desbloquearon. El aviso es un extra: nunca
// debe hacer fallar la acción.
export async function withUnlockToast<T>(taskId: string, action: () => Promise<T>): Promise<T> {
  // En paralelo con la acción para no sumarle una ida y vuelta: si la lectura
  // llegara tarde solo se pierde el aviso, nunca la acción.
  const before = fetchLockedSuccessorIds(taskId).catch((): string[] => [])
  const result = await action()
  const lockedBefore = await before
  if (lockedBefore.length > 0) {
    try {
      const after = await fetchTasksByIds(lockedBefore)
      const titles = after.filter((t) => !t.locked).map((t) => t.title)
      if (titles.length > 0) {
        showToast({ title: 'Siguiente paso desbloqueado', detail: titles.join(' · '), tone: 'reward' })
      }
    } catch {
      /* el aviso es opcional */
    }
  }
  return result
}
