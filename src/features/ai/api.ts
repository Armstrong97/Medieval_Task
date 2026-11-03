import { supabase } from '@/lib/supabase'
import type { AiSettings, TaskSize } from '@/types/database.types'
import type { When } from '@/features/ai/resolveWhen'

export interface TriageSuggestion {
  // Título sin la fecha, la hora ni la clase que ya se extrajeron (null: dejar el original).
  title: string | null
  // Lo que el usuario escribió sobre cuándo; la fecha la calcula resolveWhen.
  when: When
  category_id: string
  project_id: string | null
  size: TaskSize
  deadline_days: number
  reason: string
}

type AssistantError = 'ai_disabled' | 'quota' | 'upstream_busy' | 'timeout' | 'not_configured' | 'unauthorized' | 'server'

// Mensajes sin culpa y sin detalles técnicos: la app sigue funcionando sin la IA.
const ERROR_MESSAGES: Record<AssistantError, string> = {
  ai_disabled: 'Activa el Asistente IA en tu perfil para usar sugerencias.',
  quota: 'Llegaste al límite de sugerencias de hoy. Mañana se renueva.',
  upstream_busy: 'El asistente está muy ocupado. Prueba de nuevo en un momento.',
  timeout: 'El asistente tardó demasiado en responder. Prueba de nuevo.',
  not_configured: 'El asistente todavía no está configurado.',
  unauthorized: 'Vuelve a iniciar sesión para usar el asistente.',
  server: 'El asistente no pudo responder ahora. Puedes seguir sin él.',
}

async function callAssistant<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('assistant', { body })
  if (error) {
    // Los errores no-2xx traen la respuesta de la función en error.context.
    let code: string | undefined
    try {
      code = ((await (error as { context?: Response }).context?.json()) as { error?: string } | undefined)?.error
    } catch {
      // sin cuerpo legible: se usa el mensaje genérico.
    }
    throw new Error(ERROR_MESSAGES[code as AssistantError] ?? ERROR_MESSAGES.server)
  }
  return data as T
}

export async function suggestTriage(input: { title: string; description?: string; today: string }): Promise<TriageSuggestion> {
  const res = await callAssistant<{ suggestion: TriageSuggestion }>({ action: 'triage', ...input })
  return res.suggestion
}

export async function suggestMicrosteps(input: { taskId: string; description?: string }): Promise<string[]> {
  const res = await callAssistant<{ steps: string[] }>({ action: 'microsteps', ...input })
  return res.steps
}

export async function fetchAiSettings(): Promise<AiSettings | null> {
  const { data, error } = await supabase.from('ai_settings').select('*').maybeSingle()
  if (error) throw error
  return data
}

export async function setAiEnabled(enabled: boolean): Promise<void> {
  const { error } = await supabase
    .from('ai_settings')
    .upsert({ enabled, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
  if (error) throw error
}

export interface ChainStageSuggestion {
  steps: string[]
  days: number
}

export async function suggestChain(input: { title: string; description?: string; today: string }): Promise<ChainStageSuggestion[]> {
  const res = await callAssistant<{ stages: ChainStageSuggestion[] }>({ action: 'chain', ...input })
  return res.stages
}

export async function setAiProfileContext(text: string): Promise<void> {
  const { error } = await supabase
    .from('ai_settings')
    .upsert({ profile_context: text.trim().slice(0, 1000), updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
  if (error) throw error
}

export interface InsightsResult {
  summary: string
  observations: string[]
  stuck: { task_id: string; title: string; advice: string }[]
}

// `insufficient`: todavía no hay historial suficiente (el servidor no llama a Gemini en ese caso).
export type InsightsResponse = ({ insufficient?: false } & InsightsResult) | { insufficient: true }

export async function suggestInsights(): Promise<InsightsResponse> {
  return callAssistant<InsightsResponse>({ action: 'insights', tz: Intl.DateTimeFormat().resolvedOptions().timeZone })
}
