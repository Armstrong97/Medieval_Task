// Deno Edge Function — corre periódicamente vía Cron Job de Supabase.
// Escanea deadlines próximos/vencidos y follow-ups cumplidos de TODOS los
// usuarios (por eso usa la service role key, no la anon key), guarda
// notificaciones nuevas y manda un Web Push por cada una.
//
// Deploy: supabase functions deploy send-notifications
// Secrets necesarios (supabase secrets set NOMBRE=valor):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY
// (SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY ya vienen seteados por defecto)

import { createClient } from 'npm:@supabase/supabase-js@2'
import webPush from 'npm:web-push@3'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')!
const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')!

webPush.setVapidDetails('mailto:noreply@productividad-rpg.app', vapidPublicKey, vapidPrivateKey)

const supabase = createClient(supabaseUrl, serviceRoleKey)

type NotificationType = 'upcoming' | 'due_today' | 'overdue' | 'follow_up'

interface Alert {
  user_id: string
  task_id: string
  type: NotificationType
  message: string
}

function daysBetween(deadlineIso: string, now: Date): number {
  const d = new Date(deadlineIso)
  const startOfDeadline = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((startOfDeadline.getTime() - startOfNow.getTime()) / 86_400_000)
}

Deno.serve(async () => {
  const now = new Date()
  const alerts: Alert[] = []

  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('id, user_id, title, deadline')
    .neq('status', 'done')
    .is('parent_task_id', null)
    .not('deadline', 'is', null)
  if (tasksError) throw tasksError

  for (const task of tasks ?? []) {
    const days = daysBetween(task.deadline as string, now)
    if (days < 0) {
      alerts.push({
        user_id: task.user_id,
        task_id: task.id,
        type: 'overdue',
        message: `Vencida: ${task.title}`,
      })
    } else if (days === 0) {
      alerts.push({
        user_id: task.user_id,
        task_id: task.id,
        type: 'due_today',
        message: `Vence hoy: ${task.title}`,
      })
    } else if (days <= 3) {
      const when = days === 1 ? 'mañana' : `en ${days} días`
      alerts.push({
        user_id: task.user_id,
        task_id: task.id,
        type: 'upcoming',
        message: `Vence ${when}: ${task.title}`,
      })
    }
  }

  const { data: followUps, error: followUpsError } = await supabase
    .from('follow_ups')
    .select('user_id, task_id, stakeholder_name, next_reminder_at')
    .lte('next_reminder_at', now.toISOString())
  if (followUpsError) throw followUpsError

  for (const followUp of followUps ?? []) {
    alerts.push({
      user_id: followUp.user_id,
      task_id: followUp.task_id,
      type: 'follow_up',
      message: followUp.stakeholder_name
        ? `Seguimiento pendiente con ${followUp.stakeholder_name}`
        : 'Seguimiento pendiente',
    })
  }

  if (alerts.length === 0) {
    return Response.json({ sent: 0, alerts: 0 })
  }

  const { data: existing } = await supabase
    .from('notifications')
    .select('task_id, type')
    .in(
      'task_id',
      alerts.map((a) => a.task_id),
    )
  const existingKeys = new Set((existing ?? []).map((n) => `${n.task_id}:${n.type}`))
  const newAlerts = alerts.filter((a) => !existingKeys.has(`${a.task_id}:${a.type}`))

  const { error: upsertError } = await supabase.from('notifications').upsert(
    alerts.map((a) => ({ ...a, scheduled_at: now.toISOString() })),
    { onConflict: 'task_id,type' },
  )
  if (upsertError) throw upsertError

  if (newAlerts.length === 0) {
    return Response.json({ sent: 0, alerts: alerts.length })
  }

  const userIds = [...new Set(newAlerts.map((a) => a.user_id))]
  const { data: subscriptions } = await supabase
    .from('push_subscriptions')
    .select('id, user_id, endpoint, p256dh, auth')
    .in('user_id', userIds)

  let sent = 0
  for (const alert of newAlerts) {
    const subsForUser = (subscriptions ?? []).filter((s) => s.user_id === alert.user_id)
    for (const sub of subsForUser) {
      try {
        await webPush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify({ title: 'Productividad RPG', body: alert.message, url: '/' }),
        )
        sent++
      } catch (err) {
        const statusCode = (err as { statusCode?: number }).statusCode
        if (statusCode === 404 || statusCode === 410) {
          await supabase.from('push_subscriptions').delete().eq('id', sub.id)
        }
      }
    }
  }

  return Response.json({ sent, alerts: alerts.length, newAlerts: newAlerts.length })
})
