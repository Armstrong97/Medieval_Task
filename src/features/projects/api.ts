import { supabase } from '@/lib/supabase'
import type { Category, Project, Task, TaskSize } from '@/types/database.types'

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('position')
  if (error) throw error
  return data
}

export async function fetchActiveProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createProject(input: {
  name: string
  categoryId: string
  description?: string
}): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      name: input.name,
      category_id: input.categoryId,
      description: input.description ?? null,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

// Fase 7, Módulo 2 — "Dungeon Bosses". HP = suma del valor de tamaño de las
// tareas de nivel superior del proyecto (Pequeña=10/Mediana=25/Grande=50,
// igual que xp_reward). Se calcula acá en el cliente sobre una query normal
// de `tasks` (ya protegida por RLS) en vez de una función SQL con privilegios
// elevados — ver nota en la migración de esta fase.
const BOSS_PHASE_HP: Record<TaskSize, number> = { small: 10, medium: 25, large: 50 }

function taskHp(task: Task): number {
  return task.size ? BOSS_PHASE_HP[task.size] : 10
}

export interface BossStats {
  totalHp: number
  currentHp: number
  percentRemaining: number
}

export function computeBossStats(tasks: Task[]): BossStats {
  const totalHp = tasks.reduce((sum, t) => sum + taskHp(t), 0)
  const doneHp = tasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + taskHp(t), 0)
  const currentHp = totalHp - doneHp
  const percentRemaining = totalHp > 0 ? Math.round((currentHp / totalHp) * 10000) / 100 : 100
  return { totalHp, currentHp, percentRemaining }
}

// Umbrales de fase, en % de HP restante. 0 = jefe derrotado del todo.
export const BOSS_PHASES = [75, 50, 25, 0] as const

export async function claimBossPhase(projectId: string, phase: number): Promise<Project> {
  const { data, error } = await supabase
    .rpc('claim_boss_phase', { p_project_id: projectId, p_phase: phase })
    .single()
  if (error) throw error
  return data as Project
}
