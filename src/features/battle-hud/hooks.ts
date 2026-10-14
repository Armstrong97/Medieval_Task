import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTodayQuests } from '@/features/gamification/hooks'
import { equipTaskToSlot, fetchEquippableTasks, fetchHudTasks, unequipTaskFromSlot } from '@/features/battle-hud/api'

export function useHudTasks() {
  return useQuery({ queryKey: ['battle-hud', 'tasks'], queryFn: fetchHudTasks })
}

export function useEquippableTasks() {
  return useQuery({ queryKey: ['battle-hud', 'equippable'], queryFn: fetchEquippableTasks })
}

function useInvalidateHud() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['battle-hud'] })
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  }
}

export function useEquipHudSlot() {
  const invalidate = useInvalidateHud()
  return useMutation({
    mutationFn: ({ taskId, slot }: { taskId: string; slot: number }) =>
      equipTaskToSlot(taskId, slot),
    onSuccess: invalidate,
  })
}

export function useUnequipHudSlot() {
  const invalidate = useInvalidateHud()
  return useMutation({
    mutationFn: unequipTaskFromSlot,
    onSuccess: invalidate,
  })
}

// Misión sugerida para un slot libre: primero la prioridad del día (si el
// usuario la marcó y no está equipada); si no, la de deadline más cercano.
// El backlog ya viene ordenado por deadline ascendente (fetchEquippableTasks).
export function useSuggestedTask() {
  const { data: tasks } = useEquippableTasks()
  const { data: todayQuests } = useTodayQuests()
  const priorityId = todayQuests?.find((q) => q.type === 'daily_priority')?.task_id
  const list = tasks ?? []
  return list.find((t) => t.id === priorityId) ?? list[0] ?? null
}
