import { supabase } from '@/lib/supabase'
import type { KanbanColumn } from '@/types/database.types'

export async function fetchKanbanColumns(projectId: string | null): Promise<KanbanColumn[]> {
  const query = supabase.from('kanban_columns').select('*').order('position')
  const { data, error } = await (projectId
    ? query.eq('project_id', projectId)
    : query.is('project_id', null))
  if (error) throw error
  return data
}

export async function fetchFirstColumnId(projectId: string | null): Promise<string> {
  const columns = await fetchKanbanColumns(projectId)
  const first = columns.find((c) => c.position === 1) ?? columns[0]
  if (!first) {
    throw new Error('Este tablero todavía no tiene columnas por defecto.')
  }
  return first.id
}

export async function createColumn(input: {
  projectId: string | null
  name: string
  position: number
}): Promise<KanbanColumn> {
  const { data, error } = await supabase
    .from('kanban_columns')
    .insert({ project_id: input.projectId, name: input.name, position: input.position })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function renameColumn(id: string, name: string): Promise<KanbanColumn> {
  const { data, error } = await supabase
    .from('kanban_columns')
    .update({ name })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateColumnPosition(id: string, position: number): Promise<void> {
  const { error } = await supabase.from('kanban_columns').update({ position }).eq('id', id)
  if (error) throw error
}

export async function deleteColumn(id: string): Promise<void> {
  const { error } = await supabase.from('kanban_columns').delete().eq('id', id)
  if (error) throw error
}
