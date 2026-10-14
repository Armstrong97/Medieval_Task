import { isPast } from 'date-fns'
import { Inbox, LifeBuoy, Link2, Sparkles, Swords, type LucideIcon } from 'lucide-react'
import { useHudTasks } from '@/features/battle-hud/hooks'
import { useActiveFollowUps } from '@/features/followups/hooks'
import { useStreak, useXpEarnedToday } from '@/features/gamification/hooks'
import { useActiveTasksWithDeadline, useInboxTasks } from '@/features/tasks/hooks'

const HUD_SLOTS = 3

export type Tone = 'calm' | 'neutral' | 'attention' | 'warn' | 'reward'

export const TONE_CLASS: Record<Tone, string> = {
  calm: 'text-fg-muted',
  neutral: 'text-fg',
  attention: 'text-accent',
  warn: 'text-warn-fg',
  reward: 'text-gold',
}

export interface RailItem {
  key: string
  to: string
  state?: unknown
  icon: LucideIcon
  value: string
  tone: Tone
  label: string
  detail: string
}


/** Los cinco indicadores de estado (compartidos por la barra lateral y la tarjeta del menú móvil). */
export function useStatusItems(): { items: RailItem[]; allClear: boolean } {
  const { data: hudTasks } = useHudTasks()
  const { data: activeDeadlines } = useActiveTasksWithDeadline()
  const { data: inbox } = useInboxTasks()
  const { data: followUps } = useActiveFollowUps()
  const { data: streak } = useStreak()
  const xpToday = useXpEarnedToday()

  const inBattle = hudTasks?.length ?? 0
  const overdue = activeDeadlines?.filter((t) => t.deadline && isPast(new Date(t.deadline))).length ?? 0
  const unsorted = inbox?.length ?? 0
  const followTotal = followUps?.length ?? 0
  const followDue = followUps?.filter((f) => isPast(new Date(f.next_reminder_at))).length ?? 0
  const streakDays = streak?.current_streak_days ?? 0

  const items: RailItem[] = [
    {
      key: 'battle',
      to: '/',
      icon: Swords,
      value: `${inBattle}/${HUD_SLOTS}`,
      tone: inBattle > 0 ? 'neutral' : 'calm',
      label: 'En batalla',
      detail: 'slots ocupados',
    },
    {
      key: 'rescue',
      to: '/kanban',
      state: { dateFilter: 'overdue' },
      icon: LifeBuoy,
      value: String(overdue),
      tone: overdue > 0 ? 'warn' : 'calm',
      label: 'Por rescatar',
      detail: 'pasadas de fecha',
    },
    {
      key: 'unsorted',
      to: '/triage',
      icon: Inbox,
      value: String(unsorted),
      tone: unsorted > 0 ? 'attention' : 'calm',
      label: 'Sin ordenar',
      detail: 'capturas en el Inbox',
    },
    {
      key: 'progress',
      to: '/progreso',
      icon: Sparkles,
      value: xpToday === undefined ? '—' : `+${xpToday}`,
      tone: xpToday ? 'reward' : 'calm',
      label: 'XP de hoy',
      detail: `racha de ${streakDays} ${streakDays === 1 ? 'día' : 'días'}`,
    },
    {
      key: 'follow',
      to: '/follow-ups',
      icon: Link2,
      value: `${followDue}/${followTotal}`,
      tone: followDue > 0 ? 'warn' : 'calm',
      label: 'Follow-ups',
      detail: followDue > 0 ? 'esperan tu contacto' : 'sin pendientes de contacto',
    },
  ]

  const allClear = overdue === 0 && unsorted === 0 && followDue === 0
  return { items, allClear }
}
