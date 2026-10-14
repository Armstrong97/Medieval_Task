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
