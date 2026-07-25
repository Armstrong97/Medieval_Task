import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createFollowUp,
  deleteFollowUp,
  fetchFollowUpForTask,
  fetchFollowUps,
  registerFollowUpContact,
  updateFollowUp,
} from '@/features/followups/api'

export function useFollowUps() {
  return useQuery({ queryKey: ['follow-ups'], queryFn: fetchFollowUps })
}

export function useFollowUpForTask(taskId: string | null) {
  return useQuery({
    queryKey: ['follow-ups', 'by-task', taskId],
    queryFn: () => fetchFollowUpForTask(taskId as string),
    enabled: taskId !== null,
  })
}

function useInvalidateFollowUps() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
}

export function useCreateFollowUp() {
  const invalidate = useInvalidateFollowUps()
  return useMutation({ mutationFn: createFollowUp, onSuccess: invalidate })
}

export function useUpdateFollowUp() {
  const invalidate = useInvalidateFollowUps()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof updateFollowUp>[1] }) =>
      updateFollowUp(id, patch),
    onSuccess: invalidate,
  })
}

export function useRegisterFollowUpContact() {
  const invalidate = useInvalidateFollowUps()
  return useMutation({ mutationFn: registerFollowUpContact, onSuccess: invalidate })
}

export function useDeleteFollowUp() {
  const invalidate = useInvalidateFollowUps()
  return useMutation({ mutationFn: deleteFollowUp, onSuccess: invalidate })
}
