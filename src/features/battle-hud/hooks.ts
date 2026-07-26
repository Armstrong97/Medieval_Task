import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
