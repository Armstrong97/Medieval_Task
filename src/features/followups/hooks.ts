import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createFollowUp,
  deleteFollowUp,
  fetchFollowUpForTask,
  fetchFollowUpLogs,
  fetchFollowUps,
  logFollowUpContact,
  registerFollowUpContact,
  resolveFollowUp,
  updateFollowUp,
} from '@/features/followups/api'
import { sendTaskToFollowUp } from '@/features/tasks/api'

export function useActiveFollowUps() {
  return useQuery({ queryKey: ['follow-ups'], queryFn: fetchFollowUps })
}

export function useFollowUpLogs(followUpId: string) {
  return useQuery({
    queryKey: ['follow-ups', 'logs', followUpId],
    queryFn: () => fetchFollowUpLogs(followUpId),
  })
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

// "Registrar Contacto" — Pacto de Custodia (Fase 8, Paso 10).
export function useLogFollowUpContact() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logFollowUpContact,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
      queryClient.invalidateQueries({ queryKey: ['follow-ups', 'logs', variables.followUpId] })
    },
  })
}

// "Resolver Éxito" — libera la tarea al Grimorio y marca el follow-up
// como resuelto (no lo borra, conserva su bitácora).
export function useResolveFollowUp() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: resolveFollowUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
