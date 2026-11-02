import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  completeTask,
  createTask,
  deleteTask,
  fetchActiveTasksWithDeadline,
  fetchAllBoardTasks,
  fetchInboxTasks,
  fetchInProgressTasks,
  fetchLastCompletedTask,
  moveTaskDeadline,
  reorderSubtasks,
  fetchQuickWinTask,
  fetchSubtasks,
  fetchTaskById,
  fetchTasksByCategory,
  fetchTasksByIds,
  fetchTasksByProject,
  fetchTasksCompletedToday,
  fetchTasksInRange,
  reopenTask,
  updateTask,
} from '@/features/tasks/api'
import { showToast } from '@/components/ui/toast-store'
import { withUnlockToast } from '@/features/chains/api'
import type { Category, Task } from '@/types/database.types'

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

export function useTasksByProject(projectId: string) {
  return useQuery({
    queryKey: ['tasks', 'by-project', projectId],
    queryFn: () => fetchTasksByProject(projectId),
  })
}

export function useTasksByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['tasks', 'by-category', categoryId],
    queryFn: () => fetchTasksByCategory(categoryId),
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

export function useAllBoardTasks() {
  return useQuery({
    queryKey: ['tasks', 'board', 'all'],
    queryFn: fetchAllBoardTasks,
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
    queryClient.invalidateQueries({ queryKey: ['task-links'] })
    // El Combate tiene su propia clave: sin esto el slot seguía ocupado hasta el próximo refetch.
    queryClient.invalidateQueries({ queryKey: ['battle-hud'] })
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

// Arrastrar una misión a otro día: la tarjeta se mueve al instante (cache del
// calendario) y vuelve a su lugar si el guardado falla.
export function useMoveTaskDeadline() {
  const queryClient = useQueryClient()
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: ({ taskId, deadlineIso }: { taskId: string; deadlineIso: string }) =>
      moveTaskDeadline(taskId, deadlineIso),
    onMutate: async ({ taskId, deadlineIso }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', 'range'] })
      const previous = queryClient.getQueriesData<Task[]>({ queryKey: ['tasks', 'range'] })
      queryClient.setQueriesData<Task[]>({ queryKey: ['tasks', 'range'] }, (old) =>
        old?.map((t) => (t.id === taskId ? { ...t, deadline: deadlineIso } : t)),
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      context?.previous.forEach(([key, data]) => queryClient.setQueryData(key, data))
      showToast({ title: 'No se pudo mover la misión', detail: 'Inténtalo de nuevo.' })
    },
    onSettled: invalidate,
  })
}

// Reordenar micro-pasos: la lista cambia al instante y vuelve atrás si falla.
export function useReorderSubtasks(parentTaskId: string) {
  const queryClient = useQueryClient()
  const key = ['tasks', 'subtasks', parentTaskId]
  return useMutation({
    mutationFn: (orderedIds: string[]) => reorderSubtasks(orderedIds),
    onMutate: async (orderedIds) => {
      await queryClient.cancelQueries({ queryKey: key })
      const previous = queryClient.getQueryData<Task[]>(key)
      queryClient.setQueryData<Task[]>(key, (old) =>
        old ? orderedIds.map((id) => old.find((t) => t.id === id)).filter((t): t is Task => !!t) : old,
      )
      return { previous }
    },
    onError: (_err, _ids, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous)
      showToast({ title: 'No se pudo reordenar', detail: 'Inténtalo de nuevo.' })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (task: Parameters<typeof completeTask>[0]) =>
      withUnlockToast(task.id, () => completeTask(task)),
    // El slot se libera al instante; si falla, vuelve.
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ['battle-hud', 'tasks'] })
      const previousHud = queryClient.getQueryData<Task[]>(['battle-hud', 'tasks'])
      queryClient.setQueryData<Task[]>(['battle-hud', 'tasks'], (old) => old?.filter((t) => t.id !== task.id))
      return { previousHud }
    },
    onError: (_err, _task, context) => {
      if (context?.previousHud) queryClient.setQueryData(['battle-hud', 'tasks'], context.previousHud)
    },
    onSuccess: (task) => {
      invalidate()
      // Recompensa inmediata: el XP real lo calcula el trigger de Postgres
      // (tasks.xp_reward); acá solo se muestra.
      const category = queryClient
        .getQueryData<Category[]>(['categories'])
        ?.find((c) => c.id === task.category_id)
      const bonus = task.rescue_bonus
      const chain = task.chain_bonus
      const total = task.xp_reward + bonus + chain
      const where = category?.name ?? task.title
      showToast(
        total > 0
          ? {
              title: `+${total} XP`,
              detail: [chain > 0 && `Cadena completada +${chain}`, bonus > 0 && `Rescate +${bonus}`, where]
                .filter(Boolean)
                .join(' · '),
              tone: 'reward',
            }
          : { title: 'Misión completada', detail: task.title, tone: 'reward' },
      )
    },
  })
}

export function useReopenTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({ mutationFn: reopenTask, onSuccess: invalidate })
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
        rescue_bonus: 0,
        locked: false,
        unlock_mode: 'all',
        unlock_deadline_days: null,
        unlock_equip: false,
        chain_bonus: 0,
        postponed_count: 0,
        hud_slot: null,
        position: null,
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
