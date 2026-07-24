import { supabase } from '@/lib/supabase'
import type { ClassRank, Loot, LootDefinition, Quest, Streak, UserCategoryXp } from '@/types/database.types'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function fetchStreak(): Promise<Streak | null> {
  const { data, error } = await supabase.from('streaks').select('*').maybeSingle()
  if (error) throw error
  return data
}

export async function fetchCategoryXp(): Promise<UserCategoryXp[]> {
  const { data, error } = await supabase.from('user_category_xp').select('*')
  if (error) throw error
  return data
}

export async function fetchTodayQuests(): Promise<Quest[]> {
  const { data, error } = await supabase
    .from('quests')
    .select('*')
    .in('type', ['daily_triage', 'daily_priority'])
    .eq('period_start', todayIso())
  if (error) throw error
  return data
}

export async function fetchWeeklyQuests(weekStartIso: string): Promise<Quest[]> {
  const { data, error } = await supabase
    .from('quests')
    .select('*')
    .eq('type', 'weekly_project')
    .eq('period_start', weekStartIso)
  if (error) throw error
  return data
}

export async function setTodayPriorityTask(taskId: string): Promise<Quest> {
  const today = todayIso()
  await supabase.from('quests').delete().eq('type', 'daily_priority').eq('period_start', today)
  const { data, error } = await supabase
    .from('quests')
    .insert({ type: 'daily_priority', period_start: today, task_id: taskId, xp_reward: 20 })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function clearTodayPriorityTask(): Promise<void> {
  const { error } = await supabase
    .from('quests')
    .delete()
    .eq('type', 'daily_priority')
    .eq('period_start', todayIso())
  if (error) throw error
}

export async function fetchClassRanks(): Promise<ClassRank[]> {
  const { data, error } = await supabase.from('class_ranks').select('*').order('rank_order')
  if (error) throw error
  return data
}

export async function fetchLootDefinitions(): Promise<LootDefinition[]> {
  const { data, error } = await supabase.from('loot_definitions').select('*')
  if (error) throw error
  return data
}

export async function fetchUnlockedLoot(): Promise<Loot[]> {
  const { data, error } = await supabase.from('loot').select('*')
  if (error) throw error
  return data
}
