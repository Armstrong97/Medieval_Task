import { supabase } from '@/lib/supabase'
import type { Category, Project } from '@/types/database.types'

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('position')
  if (error) throw error
  return data
}

export async function fetchActiveProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createProject(input: {
  name: string
  categoryId: string
  description?: string
}): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      name: input.name,
      category_id: input.categoryId,
      description: input.description ?? null,
    })
    .select()
    .single()
  if (error) throw error
  return data
}
