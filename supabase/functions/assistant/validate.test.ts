// Autochequeo de validate.ts. Correr con:
//   node --experimental-strip-types supabase/functions/assistant/validate.test.ts
import assert from 'node:assert/strict'
import { parseRequest, validateStages, validateSteps, validateTriage } from './validate.ts'

const allowed = { categoryIds: new Set(['cat-1']), projectIds: new Set(['proj-1']) }
const good = { category_id: 'cat-1', project_id: 'proj-1', size: 'medium', deadline_days: 3.4, reason: ' ok ' }

// parseRequest
assert.equal(parseRequest(null), null)
assert.equal(parseRequest({ action: 'triage', title: '   ' }), null)
assert.equal(parseRequest({ action: 'triage', title: 'x'.repeat(201) }), null)
assert.deepEqual(parseRequest({ action: 'triage', title: ' Pagar luz ', today: '2026-11-01' }), { action: 'triage', title: 'Pagar luz', description: '', today: '2026-11-01' })
assert.match((parseRequest({ action: 'triage', title: 'x', today: 'ayer' }) as { today: string }).today, /^\d{4}-\d{2}-\d{2}$/)
assert.equal(parseRequest({ action: 'microsteps', taskId: 'no-es-uuid' }), null)
assert.ok(parseRequest({ action: 'microsteps', taskId: '123e4567-e89b-12d3-a456-426614174000' }))
assert.equal(parseRequest({ action: 'borrar-todo' }), null)
assert.deepEqual(parseRequest({ action: 'microsteps', taskId: '123e4567-e89b-12d3-a456-426614174000', description: ' ctx ' }), { action: 'microsteps', taskId: '123e4567-e89b-12d3-a456-426614174000', description: 'ctx' })
assert.equal(parseRequest({ action: 'microsteps', taskId: '123e4567-e89b-12d3-a456-426614174000', description: 'x'.repeat(1001) }), null)
assert.equal('description' in (parseRequest({ action: 'microsteps', taskId: '123e4567-e89b-12d3-a456-426614174000' }) as object), false)

// validateTriage
assert.deepEqual(validateTriage(good, allowed), { category_id: 'cat-1', project_id: 'proj-1', size: 'medium', deadline_days: 3, reason: 'ok' })
assert.equal(validateTriage({ ...good, category_id: 'inventada' }, allowed), null)
assert.equal(validateTriage({ ...good, size: 'huge' }, allowed), null)
assert.equal(validateTriage({ ...good, deadline_days: 'mañana' }, allowed), null)
assert.equal(validateTriage({ ...good, project_id: 'ajeno' }, allowed)?.project_id, null)
assert.equal(validateTriage({ ...good, deadline_days: 9999 }, allowed)?.deadline_days, 365)
assert.equal(validateTriage({ ...good, deadline_days: -5 }, allowed)?.deadline_days, 0)
assert.equal(validateTriage({ ...good, reason: 'r'.repeat(500) }, allowed)?.reason.length, 160)

// validateSteps
assert.equal(validateSteps({ steps: [] }), null)
assert.equal(validateSteps('texto'), null)
assert.deepEqual(validateSteps({ steps: [' Uno ', 'uno', 5, '', 'Dos'] }), ['Uno', 'Dos'])
assert.equal(validateSteps({ steps: Array.from({ length: 20 }, (_, i) => `paso ${i}`) })?.length, 7)

// chain
assert.equal(parseRequest({ action: 'chain', title: '' }), null)
assert.equal(parseRequest({ action: 'chain', title: 'Viaje', today: '2026-11-01' })?.action, 'chain')
assert.equal(validateStages({ stages: [] }), null)
assert.equal(validateStages('x'), null)
assert.deepEqual(validateStages({ stages: [{ steps: [' Reservar ', 'reservar', 7], days: 2.6 }, { steps: [], days: 1 }, { steps: ['Empacar'], days: 'pronto' }] }), [
  { steps: ['Reservar'], days: 3 },
  { steps: ['Empacar'], days: 3 },
])
assert.equal(validateStages({ stages: [{ steps: ['a'], days: 999 }] })?.[0].days, 60)
assert.equal(validateStages({ stages: [{ steps: ['a'], days: -4 }] })?.[0].days, 1)
assert.equal(validateStages({ stages: Array.from({ length: 9 }, (_, i) => ({ steps: [`p${i}`], days: 1 })) })?.length, 5)
assert.equal(validateStages({ stages: [{ steps: ['1', '2', '3', '4', '5', '6'], days: 1 }] })?.[0].steps.length, 4)

console.log('validate.test.ts: OK')
