import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  claimBossPhase,
  computeBossStats,
  createProject,
  fetchActiveProjects,
  fetchCategories,
  fetchProjectById,
} from '@/features/projects/api'
import { useTasksByProject } from '@/features/tasks/hooks'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  })
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchActiveProjects,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useProjectById(id: string) {
  return useQuery({
    queryKey: ['projects', 'by-id', id],
    queryFn: () => fetchProjectById(id),
  })
}

// HP del "Jefe de Mazmorra" del proyecto — se recalcula solo cuando cambian
// las tareas del proyecto (misma clave de cache que useTasksByProject).
export function useBossStats(projectId: string) {
  const { data: tasks } = useTasksByProject(projectId)
  return useMemo(() => (tasks ? computeBossStats(tasks) : undefined), [tasks])
}

export function useClaimBossPhase() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ projectId, phase }: { projectId: string; phase: number }) =>
      claimBossPhase(projectId, phase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['gamification'] })
    },
  })
}
