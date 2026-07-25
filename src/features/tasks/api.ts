import { supabase } from '@/lib/supabase'
import type { Database, Task } from '@/types/database.types'

export type NewTask = Pick<
  Database['public']['Tables']['tasks']['Insert'],
  | 'title'
  | 'description'
  | 'deadline'
  | 'project_id'
  | 'category_id'
  | 'kanban_column_id'
  | 'parent_task_id'
  | 'size'
>

export type TaskPatch = Partial<
  Pick<
    Database['public']['Tables']['tasks']['Update'],
    | 'title'
    | 'description'
    | 'deadline'
    | 'project_id'
    | 'category_id'
    | 'kanban_column_id'
    | 'parent_task_id'
    | 'status'
    | 'size'
  >
>

export async function fetchTaskById(id: string): Promise<Task | null> {
  const { data, error } = await supabase.from('tasks').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

export async function fetchTasksByIds(ids: string[]): Promise<Task[]> {
  if (ids.length === 0) return []
  const { data, error } = await supabase.from('tasks').select('*').in('id', ids)
  if (error) throw error
  return data
}

export async function fetchActiveTasksWithDeadline(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .neq('status', 'done')
    .not('deadline', 'is', null)
  if (error) throw error
  return data
}

export async function fetchInboxTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .is('kanban_column_id', null)
    .is('parent_task_id', null)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function fetchBoardTasks(projectId: string | null): Promise<Task[]> {
  const query = supabase
    .from('tasks')
    .select('*')
    .is('parent_task_id', null)
    .not('kanban_column_id', 'is', null)
  const { data, error } = await (projectId
    ? query.eq('project_id', projectId)
    : query.is('project_id', null))
  if (error) throw error
  return data
}

export async function fetchSubtasks(parentTaskId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('parent_task_id', parentTaskId)
    .order('deadline', { ascending: true, nullsFirst: false })
  if (error) throw error
  return data
}

export async function fetchTasksInRange(startIso: string, endIso: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .gte('deadline', startIso)
    .lt('deadline', endIso)
    .order('deadline', { ascending: true })
  if (error) throw error
  return data
}

export async function createTask(input: NewTask): Promise<Task> {
  const { data, error } = await supabase.from('tasks').insert(input).select().single()
  if (error) throw error
  return data
}

export async function updateTask(id: string, patch: TaskPatch): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
}
