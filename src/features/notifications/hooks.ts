import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { dismissNotification, fetchNotifications, syncNotifications } from '@/features/notifications/api'

export function useNotifications() {
  return useQuery({ queryKey: ['notifications'], queryFn: fetchNotifications })
}

export function useSyncNotifications() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: syncNotifications,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })
}

export function useDismissNotification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: dismissNotification,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })
}
