// Tipado a mano a partir de supabase/migrations/20260724202801_fase1_schema.sql.
// Cuando el proyecto tenga acceso a `supabase login`, reemplazar por:
// `supabase gen types typescript --project-id <ref> > src/types/database.types.ts`

export type TaskStatus = 'pending' | 'in_progress' | 'done'
export type ProjectStatus = 'active' | 'archived'
export type TaskSize = 'small' | 'medium' | 'large'
export type QuestType = 'daily_triage' | 'daily_priority' | 'weekly_project'

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          color_hex: string
          icon_name: string
          class_name: string
          position: number
          created_at: string
        }
        Insert: Record<string, never>
        Update: Record<string, never>
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          user_id: string
          category_id: string
          name: string
          description: string | null
          status: ProjectStatus
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          category_id: string
          name: string
          description?: string | null
          status?: ProjectStatus
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
        Relationships: []
      }
      kanban_columns: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          name: string
          position: number
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          project_id?: string | null
          name: string
          position: number
          is_default?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['kanban_columns']['Insert']>
        Relationships: []
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          parent_task_id: string | null
          kanban_column_id: string | null
          category_id: string | null
          title: string
          description: string | null
          deadline: string | null
          status: TaskStatus
          size: TaskSize | null
          xp_reward: number
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string
          project_id?: string | null
          parent_task_id?: string | null
          kanban_column_id?: string | null
          category_id?: string | null
          title: string
          description?: string | null
          deadline?: string | null
          status?: TaskStatus
          size?: TaskSize | null
          created_at?: string
          completed_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>
        Relationships: []
      }
      user_category_xp: {
        Row: {
          id: string
          user_id: string
          category_id: string
          current_xp: number
          current_level: number
        }
        Insert: {
          id?: string
          user_id?: string
          category_id: string
          current_xp?: number
          current_level?: number
        }
        Update: Partial<Database['public']['Tables']['user_category_xp']['Insert']>
        Relationships: []
      }
      streaks: {
        Row: {
          id: string
          user_id: string
          current_streak_days: number
          longest_streak: number
          shields_available: number
          last_active_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          current_streak_days?: number
          longest_streak?: number
          shields_available?: number
          last_active_date?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['streaks']['Insert']>
        Relationships: []
      }
      quests: {
        Row: {
          id: string
          user_id: string
          type: QuestType
          period_start: string
          project_id: string | null
          task_id: string | null
          xp_reward: number
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          type: QuestType
          period_start: string
          project_id?: string | null
          task_id?: string | null
          xp_reward?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['quests']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}

export type Category = Database['public']['Tables']['categories']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type KanbanColumn = Database['public']['Tables']['kanban_columns']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type UserCategoryXp = Database['public']['Tables']['user_category_xp']['Row']
export type Streak = Database['public']['Tables']['streaks']['Row']
export type Quest = Database['public']['Tables']['quests']['Row']
