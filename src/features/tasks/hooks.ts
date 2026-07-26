import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  completeTask,
  createTask,
  deleteTask,
  fetchActiveTasksWithDeadline,
  fetchBoardTasks,
  fetchInboxTasks,
  fetchInProgressTasks,
  fetchLastCompletedTask,
  fetchQuickWinTask,
  fetchSubtasks,
  fetchTaskById,
  fetchTasksByIds,
  fetchTasksCompletedToday,
  fetchTasksInRange,
  reopenTask,
  sendTaskToFollowUp,
  updateTask,
} from '@/features/tasks/api'
import type { Task } from '@/types/database.types'

export function useTaskById(id: string | null) {
  return useQuery({
    queryKey: ['tasks', 'by-id', id],
    queryFn: () => fetchTaskById(id as string),
    enabled: id !== null,
  })
}

export function useTasksByIds(ids: string[]) {
  return useQuery({
    queryKey: ['tasks', 'by-ids', ids],
    queryFn: () => fetchTasksByIds(ids),
  })
}

export function useActiveTasksWithDeadline() {
  return useQuery({
    queryKey: ['tasks', 'active-with-deadline'],
    queryFn: fetchActiveTasksWithDeadline,
  })
}

export function useInProgressTasks() {
  return useQuery({
    queryKey: ['tasks', 'in-progress'],
    queryFn: fetchInProgressTasks,
  })
}

export function useTasksCompletedToday() {
  return useQuery({
    queryKey: ['tasks', 'completed-today'],
    queryFn: fetchTasksCompletedToday,
  })
}

export function useLastCompletedTask() {
  return useQuery({
    queryKey: ['tasks', 'last-completed'],
    queryFn: fetchLastCompletedTask,
  })
}

export function useQuickWinTask() {
  return useQuery({
    queryKey: ['tasks', 'quick-win'],
    queryFn: fetchQuickWinTask,
  })
}

export function useInboxTasks() {
  return useQuery({
    queryKey: ['tasks', 'inbox'],
    queryFn: fetchInboxTasks,
  })
}

export function useBoardTasks(projectId: string | null) {
  return useQuery({
    queryKey: ['tasks', 'board', projectId],
    queryFn: () => fetchBoardTasks(projectId),
  })
}

export function useSubtasks(parentTaskId: string | null) {
  return useQuery({
    queryKey: ['tasks', 'subtasks', parentTaskId],
    queryFn: () => fetchSubtasks(parentTaskId as string),
    enabled: parentTaskId !== null,
  })
}

export function useTasksInRange(startIso: string, endIso: string) {
  return useQuery({
    queryKey: ['tasks', 'range', startIso, endIso],
    queryFn: () => fetchTasksInRange(startIso, endIso),
  })
}

function useInvalidateTasks() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    // Completar/triar tareas dispara triggers de XP, racha y quests en la DB.
    queryClient.invalidateQueries({ queryKey: ['gamification'] })
  }
}

export function useCreateTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: createTask,
    onSuccess: invalidate,
  })
}

export function useUpdateTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof updateTask>[1] }) =>
      updateTask(id, patch),
    onSuccess: invalidate,
  })
}

export function useDeleteTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: invalidate,
  })
}

export function useCompleteTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({ mutationFn: completeTask, onSuccess: invalidate })
}

export function useReopenTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({ mutationFn: reopenTask, onSuccess: invalidate })
}

export function useSendTaskToFollowUp() {
  const invalidate = useInvalidateTasks()
  return useMutation({ mutationFn: sendTaskToFollowUp, onSuccess: invalidate })
}

// Captura del Inbox: actualiza el cache al toque (antes de que la mutación
// termine, incluso offline) para que la tarea capturada se vea al instante
// y no se pierda de vista mientras espera conexión para sincronizar.
export function useCaptureInboxTask() {
  const queryClient = useQueryClient()
  const invalidate = useInvalidateTasks()

  return useMutation({
    mutationFn: (title: string) => createTask({ title }),
    onMutate: async (title) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', 'inbox'] })
      const previous = queryClient.getQueryData<Task[]>(['tasks', 'inbox'])
      const optimisticTask: Task = {
        id: `optimistic-${crypto.randomUUID()}`,
        user_id: '',
        project_id: null,
        parent_task_id: null,
        kanban_column_id: null,
        category_id: null,
        title,
        description: null,
        deadline: null,
        status: 'pending',
        size: null,
        xp_reward: 0,
        hud_slot: null,
        created_at: new Date().toISOString(),
        completed_at: null,
      }
      queryClient.setQueryData<Task[]>(['tasks', 'inbox'], (old = []) => [...old, optimisticTask])
      return { previous }
    },
    onError: (_err, _title, context) => {
      if (context?.previous) queryClient.setQueryData(['tasks', 'inbox'], context.previous)
    },
    onSettled: invalidate,
  })
}
