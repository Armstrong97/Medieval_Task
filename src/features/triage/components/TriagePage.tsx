import { useState, type FormEvent } from 'react'
import { useCategories, useCreateProject, useProjects } from '@/features/projects/hooks'
import { fetchFirstColumnId } from '@/features/kanban/api'
import { useDeleteTask, useInboxTasks, useUpdateTask } from '@/features/tasks/hooks'
import { fromDatetimeLocalValue } from '@/utils/datetime'

const NEW_PROJECT = '__new__'
const NO_PROJECT = ''

export function TriagePage() {
  const { data: items, isLoading } = useInboxTasks()
  const { data: categories } = useCategories()
  const { data: projects } = useProjects()
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()
  const createProject = useCreateProject()

  const [categoryId, setCategoryId] = useState('')
  const [projectChoice, setProjectChoice] = useState(NO_PROJECT)
  const [newProjectName, setNewProjectName] = useState('')
  const [deadline, setDeadline] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const current = items?.[0]

  function resetForm() {
    setCategoryId('')
    setProjectChoice(NO_PROJECT)
    setNewProjectName('')
    setDeadline('')
    setError(null)
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    if (!current) return
    setError(null)

    if (!categoryId) {
      setError('Elegí una categoría.')
      return
    }
    if (!deadline) {
      setError('El deadline es obligatorio para sacarla del inbox.')
      return
    }
    if (projectChoice === NEW_PROJECT && !newProjectName.trim()) {
      setError('Ponele nombre al proyecto nuevo.')
      return
    }

    setSaving(true)
    try {
      let projectId: string | null = null
      if (projectChoice === NEW_PROJECT) {
        const project = await createProject.mutateAsync({
          name: newProjectName.trim(),
          categoryId,
        })
        projectId = project.id
      } else if (projectChoice !== NO_PROJECT) {
        projectId = projectChoice
      }

      const kanbanColumnId = await fetchFirstColumnId(projectId)

      await updateTask.mutateAsync({
        id: current.id,
        patch: {
          category_id: categoryId,
          project_id: projectId,
          kanban_column_id: kanbanColumnId,
          deadline: fromDatetimeLocalValue(deadline),
        },
      })
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar, probá de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  function handleDiscard() {
    if (!current) return
    deleteTask.mutate(current.id)
    resetForm()
  }

  if (isLoading) {
    return <p className="p-6 text-sm text-neutral-400 dark:text-neutral-500">Cargando…</p>
  }

  if (!current) {
    return (
      <div className="p-6">
        <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Triage</h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Inbox vacío — no hay nada que triar por ahora.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Triage</h1>
        <span className="text-sm text-neutral-400 dark:text-neutral-500">
          {items?.length} en el inbox
        </span>
      </div>

      <div className="mt-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
        <p className="text-base text-neutral-900 dark:text-neutral-100">{current.title}</p>

        <form onSubmit={handleSave} className="mt-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-300">
            Categoría
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            >
              <option value="" disabled>
                Elegí categoría
              </option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-300">
            Proyecto
            <select
              value={projectChoice}
              onChange={(e) => setProjectChoice(e.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            >
              <option value={NO_PROJECT}>Tareas sueltas (sin proyecto)</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
              <option value={NEW_PROJECT}>+ Crear proyecto nuevo…</option>
            </select>
          </label>

          {projectChoice === NEW_PROJECT && (
            <input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Nombre del proyecto"
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />
          )}

          <label className="flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-300">
            Deadline
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </label>

          {error && <p className="text-sm text-amber-700 dark:text-amber-400">{error}</p>}

          <div className="mt-1 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleDiscard}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              Descartar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
