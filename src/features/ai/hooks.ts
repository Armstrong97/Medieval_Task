import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { InsightsResponse } from '@/features/ai/api'
import { fetchAiSettings, setAiEnabled, setAiProfileContext, suggestChain, suggestInsights, suggestMicrosteps, suggestTriage } from '@/features/ai/api'

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

// El último análisis se guarda en la caché: volver a la página no gasta cuota; solo el botón vuelve a pedirlo.
export function useInsights() {
  const queryClient = useQueryClient()
  const saved = useQuery<InsightsResponse>({ queryKey: ['ai', 'insights'], queryFn: skipToken, staleTime: Infinity })
  const request = useMutation({
    mutationFn: suggestInsights,
    onSuccess: (data) => queryClient.setQueryData(['ai', 'insights'], data),
  })
  return { data: saved.data, request }
}
