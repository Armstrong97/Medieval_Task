import { supabase } from '@/lib/supabase'
import { updateTask } from '@/features/tasks/api'
import type { Task } from '@/types/database.types'

// Tareas equipadas en el Battle HUD (hasta 3 slots). Excluye 'done' y
// 'follow_up' — confirmado con Gemini: ninguno de los dos estados debe
// ocupar un slot de combate activo (Fase 7, Módulo 1).
export async function fetchHudTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .not('hud_slot', 'is', null)
    .not('status', 'in', '(done,follow_up)')
    .order('hud_slot', { ascending: true })
  if (error) throw error
  return data
}

// Backlog "equipable" para el GrimorioDrawer: tareas ya triadas (con columna
// de kanban asignada), de nivel superior, activas y todavía sin slot.
export async function fetchEquippableTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .is('hud_slot', null)
    .is('parent_task_id', null)
    .not('kanban_column_id', 'is', null)
    .in('status', ['pending', 'in_progress'])
    .order('deadline', { ascending: true, nullsFirst: false })
  if (error) throw error
  return data
}

// Equipar una misión a un slot también la pasa a 'in_progress' — así la
// ventana flotante de foco (FocusFloat, que lee tareas in_progress) siempre
// coincide con lo que está equipado en el HUD, sin duplicar el concepto de
// "tarea activa" en dos mecanismos separados.
export async function equipTaskToSlot(taskId: string, slot: number): Promise<Task> {
  return updateTask(taskId, { hud_slot: slot, status: 'in_progress' })
}

// "Devolver al Grimorio": libera el slot manteniendo el status previo.
export async function unequipTaskFromSlot(taskId: string): Promise<Task> {
  return updateTask(taskId, { hud_slot: null })
}
