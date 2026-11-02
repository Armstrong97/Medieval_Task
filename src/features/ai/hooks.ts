import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAiSettings, setAiEnabled, suggestMicrosteps, suggestTriage } from '@/features/ai/api'

export function useAiEnabled() {
  const { data } = useQuery({ queryKey: ['ai', 'settings'], queryFn: fetchAiSettings })
  return data?.enabled ?? false
}

export function useSetAiEnabled() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: setAiEnabled,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ai', 'settings'] }),
  })
}

export function useSuggestTriage() {
  return useMutation({ mutationFn: suggestTriage })
}

export function useSuggestMicrosteps() {
  return useMutation({ mutationFn: suggestMicrosteps })
}
