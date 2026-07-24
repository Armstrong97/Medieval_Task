import { useQuery } from '@tanstack/react-query'
import { fetchKanbanColumns } from '@/features/kanban/api'

export function useKanbanColumns(projectId: string | null) {
  return useQuery({
    queryKey: ['kanban-columns', projectId],
    queryFn: () => fetchKanbanColumns(projectId),
  })
}
