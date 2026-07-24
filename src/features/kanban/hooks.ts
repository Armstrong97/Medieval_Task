import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createColumn,
  deleteColumn,
  fetchKanbanColumns,
  renameColumn,
  updateColumnPosition,
} from '@/features/kanban/api'

export function useKanbanColumns(projectId: string | null) {
  return useQuery({
    queryKey: ['kanban-columns', projectId],
    queryFn: () => fetchKanbanColumns(projectId),
  })
}

function useInvalidateColumns() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ['kanban-columns'] })
}

export function useCreateColumn() {
  const invalidate = useInvalidateColumns()
  return useMutation({ mutationFn: createColumn, onSuccess: invalidate })
}

export function useRenameColumn() {
  const invalidate = useInvalidateColumns()
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => renameColumn(id, name),
    onSuccess: invalidate,
  })
}

export function useUpdateColumnPosition() {
  const invalidate = useInvalidateColumns()
  return useMutation({
    mutationFn: ({ id, position }: { id: string; position: number }) =>
      updateColumnPosition(id, position),
    onSuccess: invalidate,
  })
}

export function useDeleteColumn() {
  const invalidate = useInvalidateColumns()
  return useMutation({ mutationFn: deleteColumn, onSuccess: invalidate })
}
