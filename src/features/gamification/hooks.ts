import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format, isToday, startOfWeek } from 'date-fns'
import {
  clearTodayPriorityTask,
  fetchCategoryXp,
  fetchClassRanks,
  fetchLootDefinitions,
  fetchStreak,
  fetchTodayQuests,
  fetchUnlockedLoot,
  fetchWeeklyQuests,
  setTodayPriorityTask,
} from '@/features/gamification/api'
import { useTasksCompletedToday } from '@/features/tasks/hooks'

export function useStreak() {
  return useQuery({ queryKey: ['gamification', 'streak'], queryFn: fetchStreak })
}

export function useClassRanks() {
  return useQuery({
    queryKey: ['gamification', 'class-ranks'],
    queryFn: fetchClassRanks,
    staleTime: Infinity,
  })
}

export function useLootDefinitions() {
  return useQuery({
    queryKey: ['gamification', 'loot-definitions'],
    queryFn: fetchLootDefinitions,
    staleTime: Infinity,
  })
}

export function useUnlockedLoot() {
  return useQuery({ queryKey: ['gamification', 'loot'], queryFn: fetchUnlockedLoot })
}

export function useCategoryXp() {
  return useQuery({ queryKey: ['gamification', 'category-xp'], queryFn: fetchCategoryXp })
}

export function useTodayQuests() {
  return useQuery({ queryKey: ['gamification', 'quests', 'today'], queryFn: fetchTodayQuests })
}

export function useWeeklyQuests(weekStartIso: string) {
  return useQuery({
    queryKey: ['gamification', 'quests', 'weekly', weekStartIso],
    queryFn: () => fetchWeeklyQuests(weekStartIso),
  })
}

// XP ganado hoy: suma el xp_reward de tareas/subtareas completadas hoy +
// el bonus de las quests diaria/semanal si se completaron hoy (la quest de
// triage no suma — su xp_reward es informativo, no toca user_category_xp).
export function useXpEarnedToday() {
  const { data: tasksToday } = useTasksCompletedToday()
  const { data: todayQuests } = useTodayQuests()
  const weekStartIso = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const { data: weeklyQuests } = useWeeklyQuests(weekStartIso)

  if (!tasksToday || !todayQuests || !weeklyQuests) return undefined

  const tasksXp = tasksToday.reduce((sum, t) => sum + t.xp_reward, 0)
  const priorityXp = todayQuests
    .filter((q) => q.type === 'daily_priority' && q.completed && q.completed_at && isToday(new Date(q.completed_at)))
    .reduce((sum, q) => sum + q.xp_reward, 0)
  const weeklyXp = weeklyQuests
    .filter((q) => q.completed && q.completed_at && isToday(new Date(q.completed_at)))
    .reduce((sum, q) => sum + q.xp_reward, 0)

  return tasksXp + priorityXp + weeklyXp
}

function useInvalidateGamification() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ['gamification'] })
}

export function useSetTodayPriority() {
  const invalidate = useInvalidateGamification()
  return useMutation({
    mutationFn: setTodayPriorityTask,
    onSuccess: invalidate,
  })
}

export function useClearTodayPriority() {
  const invalidate = useInvalidateGamification()
  return useMutation({
    mutationFn: clearTodayPriorityTask,
    onSuccess: invalidate,
  })
}
