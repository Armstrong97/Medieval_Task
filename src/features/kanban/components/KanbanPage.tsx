import { useNavigate, useParams } from 'react-router-dom'
import { useProjects } from '@/features/projects/hooks'
import { KanbanBoard } from '@/features/kanban/components/KanbanBoard'

export function KanbanPage() {
  const { projectId } = useParams<{ projectId?: string }>()
  const navigate = useNavigate()
  const { data: projects } = useProjects()

  const activeProjectId = projectId ?? null
  const activeProject = projects?.find((p) => p.id === activeProjectId) ?? null

  return (
    <div>
      <div className="flex items-center gap-2 overflow-x-auto border-b border-border px-6 py-3">
        <button
          type="button"
          onClick={() => navigate('/kanban')}
          className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
            !activeProjectId ? 'bg-accent text-accent-fg' : 'text-fg-muted hover:bg-surface-2'
          }`}
        >
          Tareas sueltas
        </button>
        {projects?.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => navigate(`/kanban/${project.id}`)}
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
              activeProjectId === project.id
                ? 'bg-accent text-accent-fg'
                : 'text-fg-muted hover:bg-surface-2'
            }`}
          >
            {project.name}
          </button>
        ))}
      </div>

      <KanbanBoard projectId={activeProjectId} categoryId={activeProject?.category_id ?? null} />
    </div>
  )
}
