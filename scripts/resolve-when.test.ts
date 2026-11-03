// Autochequeo de src/features/ai/resolveWhen.ts. Correr con:
//   node --experimental-strip-types scripts/resolve-when.test.ts
import assert from 'node:assert/strict'
import { resolveWhen, type When } from '../src/features/ai/resolveWhen.ts'

const none: When = { relative_days: null, weekday: null, day_of_month: null, month: null, hour: null, minute: null, period: null }
const w = (p: Partial<When>): When => ({ ...none, ...p })
const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`

// Lunes 2 de noviembre de 2026, 14:00.
const monday14 = new Date(2026, 10, 2, 14, 0)
assert.equal(monday14.getDay(), 1, 'el 2-nov-2026 debe ser lunes')

// «a las 8»: la más cercana que viene (20:00 hoy si son las 14:00; 08:00 de mañana si son las 21:00).
assert.equal(fmt(resolveWhen(w({ hour: 8 }), monday14, 3)), '2026-11-02 20:00')
assert.equal(fmt(resolveWhen(w({ hour: 8 }), new Date(2026, 10, 2, 21, 0), 3)), '2026-11-03 08:00')
assert.equal(fmt(resolveWhen(w({ hour: 8 }), new Date(2026, 10, 2, 6, 0), 3)), '2026-11-02 08:00')
// con am/pm la hora es exacta (si ya pasó hoy, mañana)
assert.equal(fmt(resolveWhen(w({ hour: 8, period: 'am' }), monday14, 3)), '2026-11-03 08:00')
assert.equal(fmt(resolveWhen(w({ hour: 8, period: 'pm' }), monday14, 3)), '2026-11-02 20:00')
// 24 horas y minutos
assert.equal(fmt(resolveWhen(w({ hour: 15, minute: 30 }), monday14, 3)), '2026-11-02 15:30')
assert.equal(fmt(resolveWhen(w({ hour: 12 }), monday14, 3)), '2026-11-03 12:00') // «las 12» = mediodía; ya pasó hoy

// «viernes»: el viernes más cercano, a las 18:00 por defecto
assert.equal(fmt(resolveWhen(w({ weekday: 5 }), monday14, 3)), '2026-11-06 18:00')
// «viernes a las 8»: el 8 más cercano de ese viernes (la mañana)
assert.equal(fmt(resolveWhen(w({ weekday: 5, hour: 8 }), monday14, 3)), '2026-11-06 08:00')
assert.equal(fmt(resolveWhen(w({ weekday: 5, hour: 8, period: 'pm' }), monday14, 3)), '2026-11-06 20:00')
// hoy es lunes y dicen «lunes»: cuenta hoy si todavía hay un momento por delante
assert.equal(fmt(resolveWhen(w({ weekday: 1 }), monday14, 3)), '2026-11-02 18:00')
// …y si las 18:00 ya pasaron, 23:00 de hoy; con una hora ya pasada, el lunes siguiente
assert.equal(fmt(resolveWhen(w({ weekday: 1 }), new Date(2026, 10, 2, 19, 0), 3)), '2026-11-02 23:00')
assert.equal(fmt(resolveWhen(w({ weekday: 1, hour: 9, period: 'am' }), monday14, 3)), '2026-11-09 09:00')

// «viernes 20»: el viernes que cae en 20 más cercano
const fri20 = resolveWhen(w({ weekday: 5, day_of_month: 20 }), monday14, 3)
assert.equal(fri20.getDay(), 5)
assert.equal(fri20.getDate(), 20)
assert.ok(fri20.getTime() > monday14.getTime())
assert.equal(fmt(fri20), '2026-11-20 18:00') // el 20-nov-2026 es viernes
// «lunes 20»: comprobación independiente recorriendo el calendario día por día
let expected = ''
for (let i = 0; i < 800 && !expected; i++) {
  const d = new Date(2026, 10, 2 + i)
  if (d.getDay() === 1 && d.getDate() === 20) expected = fmt(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 0))
}
assert.equal(fmt(resolveWhen(w({ weekday: 1, day_of_month: 20 }), monday14, 3)), expected)
// «el 20» (sin día de la semana): el 20 más cercano
assert.equal(fmt(resolveWhen(w({ day_of_month: 20 }), monday14, 3)), '2026-11-20 18:00')
// «el 1» ya pasó este mes: el del mes siguiente
assert.equal(fmt(resolveWhen(w({ day_of_month: 1 }), monday14, 3)), '2026-12-01 18:00')
// «20 de diciembre»
assert.equal(fmt(resolveWhen(w({ day_of_month: 20, month: 12 }), monday14, 3)), '2026-12-20 18:00')

// relativos
assert.equal(fmt(resolveWhen(w({ relative_days: 1, hour: 3, period: 'pm' }), monday14, 3)), '2026-11-03 15:00')
assert.equal(fmt(resolveWhen(w({ relative_days: 0 }), monday14, 3)), '2026-11-02 18:00')
assert.equal(fmt(resolveWhen(w({ relative_days: 0, hour: 8 }), monday14, 3)), '2026-11-02 20:00')
assert.equal(fmt(resolveWhen(w({ relative_days: 0, hour: 9, period: 'am' }), monday14, 3)), '2026-11-02 09:00') // ya pasó, pero es lo que dijo
assert.equal(fmt(resolveWhen(w({ relative_days: 3 }), monday14, 3)), '2026-11-05 18:00')

// sin fecha ni hora: el plazo estimado por la IA
assert.equal(fmt(resolveWhen(none, monday14, 4)), '2026-11-06 18:00')
assert.equal(fmt(resolveWhen(none, new Date(2026, 10, 2, 19, 0), 0)), '2026-11-02 23:00')

console.log('resolve-when.test.ts: OK')
