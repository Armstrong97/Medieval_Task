// Validación pura (sin Deno ni red) de lo que entra y sale de la función
// `assistant`. La salida del modelo es texto no confiable: aquí se comprueba
// todo (ids contra listas permitidas, enums, longitudes) antes de devolverla.

export const MAX_TITLE = 200
export const MAX_DESCRIPTION = 1000
const MAX_REASON = 160
const MAX_CLEAN_TITLE = 120
const MAX_STEP = 120
const MAX_STEPS = 7
const MAX_STAGES = 5
const MAX_STAGE_STEPS = 4
const SIZES = ['small', 'medium', 'large'] as const
const DAY = /^\d{4}-\d{2}-\d{2}$/
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export type TriageRequest = { action: 'triage'; title: string; description: string; today: string }
export type ChainRequest = { action: 'chain'; title: string; description: string; today: string }
// `description` opcional: el texto que el usuario tiene en pantalla (aunque no lo haya guardado) manda sobre el guardado.
export type MicrostepsRequest = { action: 'microsteps'; taskId: string; description?: string }
export type InsightsRequest = { action: 'insights'; tz: string }
export type AssistantRequest = TriageRequest | ChainRequest | MicrostepsRequest | InsightsRequest

// Lo que la persona ESCRIBIÓ sobre cuándo, sin interpretar. La fecha real la calcula el cliente
// con reglas fijas (la más cercana), no el modelo.
export interface When {
  relative_days: number | null
  weekday: number | null
  day_of_month: number | null
  month: number | null
  hour: number | null
  minute: number | null
  period: 'am' | 'pm' | null
}

export interface TriageSuggestion {
  title: string | null
  category_id: string
  project_id: string | null
  size: (typeof SIZES)[number]
  deadline_days: number
  when: When
  reason: string
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function parseRequest(body: unknown): AssistantRequest | null {
  if (!isRecord(body)) return null
  if (body.action === 'triage' || body.action === 'chain') {
    const title = typeof body.title === 'string' ? body.title.trim() : ''
    const description = typeof body.description === 'string' ? body.description.trim() : ''
    if (!title || title.length > MAX_TITLE || description.length > MAX_DESCRIPTION) return null
    // Fecha local del usuario (el servidor no conoce su zona horaria); sirve para entender «el viernes».
    const today = typeof body.today === 'string' && DAY.test(body.today) ? body.today : new Date().toISOString().slice(0, 10)
    return { action: body.action, title, description, today }
  }
  if (body.action === 'insights') {
    // Zona horaria IANA (p. ej. America/Bogota); la base de datos la comprueba y cae a UTC si no existe.
    const tz = typeof body.tz === 'string' && /^[A-Za-z0-9_+\-/]{1,64}$/.test(body.tz) ? body.tz : 'UTC'
    return { action: 'insights', tz }
  }
  if (body.action === 'microsteps') {
    if (typeof body.taskId !== 'string' || !UUID.test(body.taskId)) return null
    const description = typeof body.description === 'string' ? body.description.trim() : undefined
    if (description !== undefined && description.length > MAX_DESCRIPTION) return null
    return { action: 'microsteps', taskId: body.taskId, ...(description !== undefined && { description }) }
  }
  return null
}

function intIn(v: unknown, min: number, max: number): number | null {
  if (typeof v !== 'number' || !Number.isFinite(v)) return null
  const n = Math.round(v)
  return n >= min && n <= max ? n : null
}

export function validateWhen(raw: unknown): When {
  const r = isRecord(raw) ? raw : {}
  const hour = intIn(r.hour, 0, 23)
  return {
    relative_days: intIn(r.relative_days, 0, 365),
    weekday: intIn(r.weekday, 1, 7),
    day_of_month: intIn(r.day_of_month, 1, 31),
    month: intIn(r.month, 1, 12),
    hour,
    // Minutos y am/pm solo tienen sentido si hay hora.
    minute: hour === null ? null : (intIn(r.minute, 0, 59) ?? 0),
    period: hour !== null && (r.period === 'am' || r.period === 'pm') ? r.period : null,
  }
}

export function validateTriage(
  raw: unknown,
  allowed: { categoryIds: Set<string>; projectIds: Set<string> },
): TriageSuggestion | null {
  if (!isRecord(raw)) return null
  const { category_id, project_id, size, deadline_days, reason, title } = raw
  if (typeof category_id !== 'string' || !allowed.categoryIds.has(category_id)) return null
  // Un proyecto inventado o ajeno se descarta (null = misión suelta), no invalida el resto.
  const safeProject = typeof project_id === 'string' && allowed.projectIds.has(project_id) ? project_id : null
  if (!SIZES.includes(size as (typeof SIZES)[number])) return null
  if (typeof deadline_days !== 'number' || !Number.isFinite(deadline_days)) return null
  const cleanTitle = typeof title === 'string' ? title.trim().slice(0, MAX_CLEAN_TITLE) : ''
  return {
    title: cleanTitle || null,
    when: validateWhen(raw.when),
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

export interface ChainStageSuggestion {
  steps: string[]
  days: number
}

// Etapas de una cadena: cada una con 1-4 pasos (se hacen a la vez) y los días
// que tarda tras despertar. Se descartan vacíos y repetidos, sin invalidar el resto.
export function validateStages(raw: unknown): ChainStageSuggestion[] | null {
  if (!isRecord(raw) || !Array.isArray(raw.stages)) return null
  const seen = new Set<string>()
  const stages: ChainStageSuggestion[] = []
  for (const st of raw.stages) {
    if (!isRecord(st) || !Array.isArray(st.steps)) continue
    const steps: string[] = []
    for (const s of st.steps) {
      if (typeof s !== 'string') continue
      const step = s.trim().slice(0, MAX_STEP)
      if (!step || seen.has(step.toLowerCase())) continue
      seen.add(step.toLowerCase())
      steps.push(step)
      if (steps.length === MAX_STAGE_STEPS) break
    }
    if (steps.length === 0) continue
    const days = typeof st.days === 'number' && Number.isFinite(st.days) ? Math.min(60, Math.max(1, Math.round(st.days))) : 3
    stages.push({ steps, days })
    if (stages.length === MAX_STAGES) break
  }
  return stages.length > 0 ? stages : null
}

export interface InsightsResult {
  summary: string
  observations: string[]
  stuck: { task_id: string; advice: string }[]
}

// `stuckIds`: solo se aceptan consejos sobre misiones que de verdad venían en las estadísticas.
export function validateInsights(raw: unknown, stuckIds: Set<string>): InsightsResult | null {
  if (!isRecord(raw)) return null
  const summary = typeof raw.summary === 'string' ? raw.summary.trim().slice(0, 280) : ''
  if (!summary) return null
  const seen = new Set<string>()
  const observations: string[] = []
  if (Array.isArray(raw.observations)) {
    for (const o of raw.observations) {
      if (typeof o !== 'string') continue
      const text = o.trim().slice(0, 180)
      if (!text || seen.has(text.toLowerCase())) continue
      seen.add(text.toLowerCase())
      observations.push(text)
      if (observations.length === 4) break
    }
  }
  const stuck: InsightsResult['stuck'] = []
  if (Array.isArray(raw.stuck)) {
    for (const k of raw.stuck) {
      if (!isRecord(k) || typeof k.task_id !== 'string' || !stuckIds.has(k.task_id) || typeof k.advice !== 'string') continue
      if (stuck.some((x) => x.task_id === k.task_id)) continue
      const advice = k.advice.trim().slice(0, 160)
      if (advice) stuck.push({ task_id: k.task_id, advice })
      if (stuck.length === 3) break
    }
  }
  return { summary, observations, stuck }
}
