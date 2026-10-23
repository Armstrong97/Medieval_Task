import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTaskLink,
  deleteTaskLink,
  fetchAllLinks,
  fetchLinkCandidates,
  fetchTaskLinks,
} from '@/features/chains/api'
import { fetchTasksByIds } from '@/features/tasks/api'

export function useTaskLinks(taskId: string) {
  return useQuery({
    queryKey: ['task-links', taskId],
    queryFn: async () => {
      const links = await fetchTaskLinks(taskId)
      const otherIds = [...new Set(links.map((l) => (l.from_task_id === taskId ? l.to_task_id : l.from_task_id)))]
      return { links, others: await fetchTasksByIds(otherIds) }
    },
  })
}

export function useLinkCandidates() {
  return useQuery({ queryKey: ['task-links', 'candidates'], queryFn: fetchLinkCandidates })
}

// Un enlace puede dormir o despertar misiones (triggers de la DB): se refresca todo.
function useInvalidateChains() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['task-links'] })
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  }
}

export function useCreateTaskLink() {
  const invalidate = useInvalidateChains()
  return useMutation({ mutationFn: createTaskLink, onSuccess: invalidate })
}

export function useDeleteTaskLink() {
  const invalidate = useInvalidateChains()
  return useMutation({ mutationFn: deleteTaskLink, onSuccess: invalidate })
}

// Cualquier edición de la cadena (crear/quitar/renombrar un paso, ajustes de
// etapa): se pasa la operación y se refresca todo al terminar.
export function useChainEdit() {
  const invalidate = useInvalidateChains()
  return useMutation({ mutationFn: (op: () => Promise<unknown>) => op(), onSettled: invalidate })
}

// Todas las cadenas del usuario con sus misiones (la tabla de enlaces es chica).
export function useChainGraph() {
  return useQuery({
    queryKey: ['task-links', 'graph'],
    queryFn: async () => {
      const links = await fetchAllLinks()
      const ids = [...new Set(links.flatMap((l) => [l.from_task_id, l.to_task_id]))]
      const tasks = await fetchTasksByIds(ids)
      return { links, tasks }
    },
    // El Map se arma aquí y no en queryFn: el cache persistido solo guarda JSON
    // y un Map rehidratado llega como objeto vacío.
    select: (d) => ({ links: d.links, tasks: new Map(d.tasks.map((t) => [t.id, t])) }),
  })
}
