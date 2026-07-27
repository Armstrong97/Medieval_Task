import { reopenTask } from '@/features/tasks/api'
import { supabase } from '@/lib/supabase'
import type { Database, FollowUp, FollowUpLog } from '@/types/database.types'

// Solo follow-ups sin resolver — usada tanto por la página de Follow-ups
// como por el sync de notificaciones (no tiene sentido alertar sobre un
// seguimiento ya resuelto, ver migración 20260727000001).
export async function fetchFollowUps(): Promise<FollowUp[]> {
  const { data, error } = await supabase
    .from('follow_ups')
    .select('*')
    .is('resolved_at', null)
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

export async function fetchFollowUpLogs(followUpId: string): Promise<FollowUpLog[]> {
  const { data, error } = await supabase
    .from('follow_up_logs')
    .select('*')
    .eq('follow_up_id', followUpId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// "Registrar Contacto" (Bitácora de Custodia): deja una entrada en la
// bitácora y define el próximo aviso corto (+1/+2/+3 días) reutilizando
// interval_days — el trigger follow_ups_set_next_reminder ya recalcula
// next_reminder_at a partir de last_contacted_at + interval_days, así que
// no hace falta tocar ese trigger ni escribir next_reminder_at a mano.
export async function logFollowUpContact(input: {
  followUpId: string
  notes: string
  nextFollowUpDays: number
}): Promise<void> {
  const { error: logError } = await supabase
    .from('follow_up_logs')
    .insert({ follow_up_id: input.followUpId, notes: input.notes })
  if (logError) throw logError

  const { error: updateError } = await supabase
    .from('follow_ups')
    .update({ last_contacted_at: new Date().toISOString(), interval_days: input.nextFollowUpDays })
    .eq('id', input.followUpId)
  if (updateError) throw updateError
}

// "Resolver Éxito": libera la misión de vuelta al Grimorio (mismo mecanismo
// que reopenTask) y marca el follow-up como resuelto (resolved_at) en vez
// de borrarlo, para conservar su bitácora.
export async function resolveFollowUp(input: { followUpId: string; taskId: string }): Promise<void> {
  const { data: task, error: taskError } = await supabase
    .from('tasks')
    .select('id, project_id')
    .eq('id', input.taskId)
    .single()
  if (taskError) throw taskError

  await reopenTask(task)

  const { error } = await supabase
    .from('follow_ups')
    .update({ resolved_at: new Date().toISOString() })
    .eq('id', input.followUpId)
  if (error) throw error
}
