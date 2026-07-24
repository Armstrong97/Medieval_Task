import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTask,
  deleteTask,
  fetchBoardTasks,
  fetchInboxTasks,
  fetchSubtasks,
  fetchTaskById,
  fetchTasksInRange,
  updateTask,
} from '@/features/tasks/api'

export function useTaskById(id: string | null) {
  return useQuery({
    queryKey: ['tasks', 'by-id', id],
    queryFn: () => fetchTaskById(id as string),
    enabled: id !== null,
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
