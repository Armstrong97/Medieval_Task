import { addDays, format, isPast, isSameDay } from 'date-fns'

export function toDatetimeLocalValue(iso: string | null): string {
  if (!iso) return ''
  return format(new Date(iso), "yyyy-MM-dd'T'HH:mm")
}

export function fromDatetimeLocalValue(value: string): string {
  return new Date(value).toISOString()
}

// Nueva fecha límite dentro de N días conservando la hora original (18:00 si no tenía).
export function rescheduleIso(daysFromNow: number, previousIso: string | null): string {
  const target = addDays(new Date(), daysFromNow)
  const prev = previousIso ? new Date(previousIso) : null
  target.setHours(prev ? prev.getHours() : 18, prev ? prev.getMinutes() : 0, 0, 0)
  return target.toISOString()
}

export function isOverdue(task: { deadline: string | null; status: string; locked?: boolean }): boolean {
  return task.status !== 'done' && !task.locked && !!task.deadline && isPast(new Date(task.deadline))
}

// Mueve una fecha límite N días respecto a ella misma (misma hora).
export function shiftDeadlineIso(previousIso: string, days: number): string {
  return addDays(new Date(previousIso), days).toISOString()
}

// Misma hora que tenía (18:00 si no tenía) pero en otro día. Si cae hoy y esa
// hora ya pasó, 23:00 para que no nazca "por rescatar".
export function deadlineOnDay(day: Date, previousIso: string | null): string {
  const d = new Date(day)
  const prev = previousIso ? new Date(previousIso) : null
  d.setHours(prev ? prev.getHours() : 18, prev ? prev.getMinutes() : 0, 0, 0)
  if (d.getTime() <= Date.now() && isSameDay(d, new Date())) d.setHours(23, 0, 0, 0)
  return d.toISOString()
}
