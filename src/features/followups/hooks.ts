import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createFollowUp,
  deleteFollowUp,
  fetchFollowUpForTask,
  fetchFollowUps,
  registerFollowUpContact,
  updateFollowUp,
} from '@/features/followups/api'
import { sendTaskToFollowUp } from '@/features/tasks/api'

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

// Acción "Enviar a Follow-up": crea el registro de seguimiento y saca la
// tarea de la vista activa del Kanban (status -> 'follow_up') en un solo paso.
export function useSendToFollowUp() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      taskId: string
      intervalDays: number
      stakeholderName: string | null
    }) => {
      await createFollowUp({
        task_id: input.taskId,
        interval_days: input.intervalDays,
        stakeholder_name: input.stakeholderName,
        notes: null,
      })
      await sendTaskToFollowUp(input.taskId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
