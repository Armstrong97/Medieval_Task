import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAiSettings, setAiEnabled, setAiProfileContext, suggestChain, suggestMicrosteps, suggestTriage } from '@/features/ai/api'

export function useAiEnabled() {
  const { data } = useQuery({ queryKey: ['ai', 'settings'], queryFn: fetchAiSettings })
  return data?.enabled ?? false
}

export function useAiProfileContext() {
  const { data } = useQuery({ queryKey: ['ai', 'settings'], queryFn: fetchAiSettings })
  return data?.profile_context ?? ''
}

export function useSetAiProfileContext() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: setAiProfileContext,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ai', 'settings'] }),
  })
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

export function useSuggestChain() {
  return useMutation({ mutationFn: suggestChain })
}
