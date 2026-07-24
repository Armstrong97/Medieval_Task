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
      <div className="flex items-center gap-2 border-b border-neutral-100 px-6 py-3 dark:border-neutral-900">
        <button
          type="button"
          onClick={() => navigate('/kanban')}
          className={`rounded-full px-3 py-1 text-sm ${
            !activeProjectId
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
              : 'text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900'
          }`}
        >
          Tareas sueltas
        </button>
        {projects?.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => navigate(`/kanban/${project.id}`)}
            className={`rounded-full px-3 py-1 text-sm ${
              activeProjectId === project.id
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                : 'text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900'
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
