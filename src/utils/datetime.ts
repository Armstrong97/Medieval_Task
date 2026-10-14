import { addDays, format, isPast } from 'date-fns'

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

export function isOverdue(task: { deadline: string | null; status: string }): boolean {
  return task.status !== 'done' && !!task.deadline && isPast(new Date(task.deadline))
}
