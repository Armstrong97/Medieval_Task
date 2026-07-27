import { useMutation, useQueryClient } from '@tanstack/react-query'
import { dispatchTriagedTask } from '@/features/triage/api'
import { useInboxTasks } from '@/features/tasks/hooks'

export function useTriageSession() {
  const { data: items, isLoading } = useInboxTasks()
  const queryClient = useQueryClient()

  const dispatch = useMutation({
    mutationFn: dispatchTriagedTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['gamification'] })
      queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
      queryClient.invalidateQueries({ queryKey: ['battle-hud'] })
    },
  })

  return {
    current: items?.[0],
    remainingCount: items?.length ?? 0,
    isLoading,
    dispatch,
  }
}
