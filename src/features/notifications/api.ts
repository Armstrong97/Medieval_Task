import { differenceInCalendarDays } from 'date-fns'
import { supabase } from '@/lib/supabase'
import { fetchFollowUps } from '@/features/followups/api'
import { fetchActiveTasksWithDeadline } from '@/features/tasks/api'
import type { AppNotification, NotificationType } from '@/types/database.types'

export async function fetchNotifications(): Promise<AppNotification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('scheduled_at', { ascending: false })
  if (error) throw error
  return data
}

export async function dismissNotification(id: string): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .update({ dismissed_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

interface ComputedAlert {
  task_id: string
  type: NotificationType
  message: string
}

// Calcula qué alertas corresponden ahora mismo (deadlines próximos/vencidos,
// follow-ups con recordatorio cumplido) y las guarda. No pisa dismissed_at:
// el upsert solo manda las columnas de ComputedAlert + scheduled_at, así que
// una notificación ya descartada por el usuario se mantiene descartada
// hasta que cambie de "type" (la siguiente escalada genera una fila nueva).
export async function syncNotifications(): Promise<void> {
  const [tasks, followUps] = await Promise.all([fetchActiveTasksWithDeadline(), fetchFollowUps()])
  const now = new Date()
  const alerts: ComputedAlert[] = []

  for (const task of tasks) {
    if (!task.deadline) continue
    const days = differenceInCalendarDays(new Date(task.deadline), now)
    if (days < 0) {
      alerts.push({ task_id: task.id, type: 'overdue', message: `Vencida: ${task.title}` })
    } else if (days === 0) {
      alerts.push({ task_id: task.id, type: 'due_today', message: `Vence hoy: ${task.title}` })
    } else if (days <= 3) {
      const when = days === 1 ? 'mañana' : `en ${days} días`
      alerts.push({ task_id: task.id, type: 'upcoming', message: `Vence ${when}: ${task.title}` })
    }
  }

  for (const followUp of followUps) {
    if (new Date(followUp.next_reminder_at) > now) continue
    alerts.push({
      task_id: followUp.task_id,
      type: 'follow_up',
      message: followUp.stakeholder_name
        ? `Seguimiento pendiente con ${followUp.stakeholder_name}`
        : 'Seguimiento pendiente',
    })
  }

  if (alerts.length === 0) return

  const { error } = await supabase.from('notifications').upsert(
    alerts.map((a) => ({ ...a, scheduled_at: now.toISOString() })),
    { onConflict: 'task_id,type' },
  )
  if (error) throw error
}
