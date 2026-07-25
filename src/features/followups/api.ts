import { supabase } from '@/lib/supabase'
import type { Database, FollowUp } from '@/types/database.types'

export async function fetchFollowUps(): Promise<FollowUp[]> {
  const { data, error } = await supabase
    .from('follow_ups')
    .select('*')
    .order('next_reminder_at', { ascending: true })
  if (error) throw error
  return data
}

export async function fetchFollowUpForTask(taskId: string): Promise<FollowUp | null> {
  const { data, error } = await supabase
    .from('follow_ups')
    .select('*')
    .eq('task_id', taskId)
    .maybeSingle()
  if (error) throw error
  return data
}

export type NewFollowUp = Pick<
  Database['public']['Tables']['follow_ups']['Insert'],
  'task_id' | 'stakeholder_name' | 'interval_days' | 'notes'
>

export async function createFollowUp(input: NewFollowUp): Promise<FollowUp> {
  const { data, error } = await supabase.from('follow_ups').insert(input).select().single()
  if (error) throw error
  return data
}

export async function updateFollowUp(
  id: string,
  patch: Partial<Pick<Database['public']['Tables']['follow_ups']['Update'], 'stakeholder_name' | 'interval_days' | 'notes'>>,
): Promise<FollowUp> {
  const { data, error } = await supabase
    .from('follow_ups')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function registerFollowUpContact(id: string): Promise<FollowUp> {
  const { data, error } = await supabase
    .from('follow_ups')
    .update({ last_contacted_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteFollowUp(id: string): Promise<void> {
  const { error } = await supabase.from('follow_ups').delete().eq('id', id)
  if (error) throw error
}
