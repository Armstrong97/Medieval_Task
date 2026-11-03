// Convierte lo que el usuario escribió sobre cuándo («viernes», «a las 8», «el 20»)
// en una fecha concreta con reglas fijas, no con el modelo. Sin dependencias.
//
// Reglas (acordadas con el usuario):
//  - Una hora sin am/pm («a las 8») es la más cercana que viene: 8:00 u 20:00, la primera que aún no pasó.
//  - Un día de la semana («viernes») es el viernes más cercano; si hoy es viernes cuenta hoy.
//  - Con am/pm o formato de 24 h la hora es exacta. «Viernes 20» es el viernes 20 más cercano.
//  - Una fecha con hora que ya pasó hoy salta a la siguiente fecha que coincida.
//  - Sin hora: 18:00, o 23:00 si las 18:00 de hoy ya pasaron (así no nace «por rescatar»).

export interface When {
  relative_days: number | null
  weekday: number | null // 1 = lunes … 7 = domingo
  day_of_month: number | null
  month: number | null
  hour: number | null
  minute: number | null
  period: 'am' | 'pm' | null
}

const DEFAULT_HOUR = 18
const LATE_HOUR = 23
const SCAN_DAYS = 800 // para «31 de febrero»-like y fechas del año siguiente

export function hasDate(w: When): boolean {
  return w.relative_days !== null || w.weekday !== null || w.day_of_month !== null || w.month !== null
}

export function hasAnyWhen(w: When): boolean {
  return hasDate(w) || w.hour !== null
}

function isoWeekday(d: Date): number {
  return ((d.getDay() + 6) % 7) + 1
}

// Horas posibles (0-23), de menor a mayor. Sin am/pm y entre 1 y 11 hay dos: la mañana y la tarde.
export function candidateHours(hour: number, period: 'am' | 'pm' | null): number[] {
  if (period === 'am') return [hour % 12]
  if (period === 'pm') return [hour < 12 ? hour + 12 : hour]
  if (hour === 0 || hour >= 12) return [hour] // «las 12» es el mediodía; 0 y 13-23 son exactas
  return [hour, hour + 12]
}

function at(day: Date, hour: number, minute: number): Date {
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute, 0, 0)
}

function dayMatches(d: Date, w: When): boolean {
  if (w.weekday !== null && isoWeekday(d) !== w.weekday) return false
  if (w.day_of_month !== null && d.getDate() !== w.day_of_month) return false
  if (w.month !== null && d.getMonth() + 1 !== w.month) return false
  return true
}

export function resolveWhen(w: When, now: Date, fallbackDays: number): Date {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const minute = w.minute ?? 0
  const hours = w.hour === null ? [] : candidateHours(w.hour, w.period)

  // Primer momento de ese día que aún no pasó (la hora más cercana, o 18:00 / 23:00 si no hay hora).
  const upcomingOn = (day: Date): Date | null => {
    const options = hours.length > 0 ? hours.map((h) => at(day, h, minute)) : [at(day, DEFAULT_HOUR, 0), at(day, LATE_HOUR, 0)]
    return options.find((o) => o.getTime() > now.getTime()) ?? null
  }

  // «mañana», «en 3 días»: un solo día. Si la hora ya pasó se respeta igual (es lo que dijo).
  if (w.relative_days !== null) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + w.relative_days)
    return upcomingOn(day) ?? at(day, hours.length > 0 ? hours[hours.length - 1] : LATE_HOUR, hours.length > 0 ? minute : 0)
  }

  // Día de la semana / día del mes / mes: el más cercano que coincida y todavía tenga un momento por delante.
  if (w.weekday !== null || w.day_of_month !== null || w.month !== null) {
    for (let i = 0; i < SCAN_DAYS; i++) {
      const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
      if (!dayMatches(day, w)) continue
      const found = upcomingOn(day)
      if (found) return found
    }
  }

  // Solo hora («a las 8»): la próxima vez que el reloj marque esa hora.
  if (hours.length > 0) {
    for (let i = 0; i < 2; i++) {
      const found = upcomingOn(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i))
      if (found) return found
    }
  }

  // Sin fecha ni hora: plazo estimado por la IA.
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + fallbackDays)
  return upcomingOn(day) ?? at(day, LATE_HOUR, 0)
}
