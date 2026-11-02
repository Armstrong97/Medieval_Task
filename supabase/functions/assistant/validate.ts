// Validación pura (sin Deno ni red) de lo que entra y sale de la función
// `assistant`. La salida del modelo es texto no confiable: aquí se comprueba
// todo (ids contra listas permitidas, enums, longitudes) antes de devolverla.

export const MAX_TITLE = 200
export const MAX_DESCRIPTION = 1000
const MAX_REASON = 160
const MAX_STEP = 120
const MAX_STEPS = 7
const SIZES = ['small', 'medium', 'large'] as const
const DAY = /^\d{4}-\d{2}-\d{2}$/
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export type TriageRequest = { action: 'triage'; title: string; description: string; today: string }
export type MicrostepsRequest = { action: 'microsteps'; taskId: string }
export type AssistantRequest = TriageRequest | MicrostepsRequest

export interface TriageSuggestion {
  category_id: string
  project_id: string | null
  size: (typeof SIZES)[number]
  deadline_days: number
  reason: string
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function parseRequest(body: unknown): AssistantRequest | null {
  if (!isRecord(body)) return null
  if (body.action === 'triage') {
    const title = typeof body.title === 'string' ? body.title.trim() : ''
    const description = typeof body.description === 'string' ? body.description.trim() : ''
    if (!title || title.length > MAX_TITLE || description.length > MAX_DESCRIPTION) return null
    // Fecha local del usuario (el servidor no conoce su zona horaria); sirve para entender «el viernes».
    const today = typeof body.today === 'string' && DAY.test(body.today) ? body.today : new Date().toISOString().slice(0, 10)
    return { action: 'triage', title, description, today }
  }
  if (body.action === 'microsteps') {
    if (typeof body.taskId !== 'string' || !UUID.test(body.taskId)) return null
    return { action: 'microsteps', taskId: body.taskId }
  }
  return null
}

export function validateTriage(
  raw: unknown,
  allowed: { categoryIds: Set<string>; projectIds: Set<string> },
): TriageSuggestion | null {
  if (!isRecord(raw)) return null
  const { category_id, project_id, size, deadline_days, reason } = raw
  if (typeof category_id !== 'string' || !allowed.categoryIds.has(category_id)) return null
  // Un proyecto inventado o ajeno se descarta (null = misión suelta), no invalida el resto.
  const safeProject = typeof project_id === 'string' && allowed.projectIds.has(project_id) ? project_id : null
  if (!SIZES.includes(size as (typeof SIZES)[number])) return null
  if (typeof deadline_days !== 'number' || !Number.isFinite(deadline_days)) return null
  return {
    category_id,
    project_id: safeProject,
    size: size as (typeof SIZES)[number],
    deadline_days: Math.min(365, Math.max(0, Math.round(deadline_days))),
    reason: typeof reason === 'string' ? reason.trim().slice(0, MAX_REASON) : '',
  }
}

export function validateSteps(raw: unknown): string[] | null {
  if (!isRecord(raw) || !Array.isArray(raw.steps)) return null
  const seen = new Set<string>()
  const steps: string[] = []
  for (const s of raw.steps) {
    if (typeof s !== 'string') continue
    const step = s.trim().slice(0, MAX_STEP)
    if (!step || seen.has(step.toLowerCase())) continue
    seen.add(step.toLowerCase())
    steps.push(step)
    if (steps.length === MAX_STEPS) break
  }
  return steps.length > 0 ? steps : null
}
