import { useState, type FormEvent } from 'react'
import { useCategories, useCreateProject, useProjects } from '@/features/projects/hooks'
import { fetchFirstColumnId } from '@/features/kanban/api'
import { useDeleteTask, useInboxTasks, useUpdateTask } from '@/features/tasks/hooks'
import { fromDatetimeLocalValue } from '@/utils/datetime'
import type { TaskSize } from '@/types/database.types'

const NEW_PROJECT = '__new__'
const NO_PROJECT = ''

const SIZE_OPTIONS: { value: TaskSize; label: string; xp: number }[] = [
  { value: 'small', label: 'Pequeña', xp: 10 },
  { value: 'medium', label: 'Mediana', xp: 25 },
  { value: 'large', label: 'Grande', xp: 50 },
]

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
  const [size, setSize] = useState<TaskSize | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const current = items?.[0]

  function resetForm() {
    setCategoryId('')
    setProjectChoice(NO_PROJECT)
    setNewProjectName('')
    setDeadline('')
    setSize(null)
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
    if (!size) {
      setError('Elegí un tamaño para la tarea (define el XP que da).')
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
          size,
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
    return <p className="p-6 text-sm text-fg-muted">Cargando…</p>
  }

  if (!current) {
    return (
      <div className="p-6">
        <h1 className="font-display text-lg font-semibold tracking-tight text-fg">Triage</h1>
        <p className="mt-2 text-sm text-fg-muted">Inbox vacío — no hay nada que triar por ahora.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-lg font-semibold tracking-tight text-fg">Triage</h1>
        <span className="font-mono text-sm text-fg-muted">{items?.length} en el inbox</span>
      </div>

      <div className="mt-4 rounded-lg border border-border bg-surface p-4">
        <p className="text-base text-fg">{current.title}</p>

        <form onSubmit={handleSave} className="mt-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm text-fg-muted">
            Categoría
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-fg outline-none focus:border-accent"
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

          <label className="flex flex-col gap-1 text-sm text-fg-muted">
            Proyecto
            <select
              value={projectChoice}
              onChange={(e) => setProjectChoice(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-fg outline-none focus:border-accent"
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
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-fg outline-none focus:border-accent"
            />
          )}

          <label className="flex flex-col gap-1 text-sm text-fg-muted">
            Deadline
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-fg outline-none focus:border-accent"
            />
          </label>

          <div className="flex flex-col gap-1 text-sm text-fg-muted">
            Tamaño (define el XP)
            <div className="flex gap-1.5">
              {SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSize(opt.value)}
                  className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-all duration-150 active:scale-95 ${
                    size === opt.value
                      ? 'border-accent bg-accent text-accent-fg shadow-[0_0_12px_rgba(217,169,74,0.35)]'
                      : 'border-border text-fg-muted hover:bg-surface-2'
                  }`}
                >
                  {opt.label} <span className="opacity-60">+{opt.xp}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-warn-fg">{error}</p>}

          <div className="mt-1 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_4px_20px_rgba(217,169,74,0.4)] active:scale-[0.98] disabled:opacity-60 disabled:hover:shadow-none"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleDiscard}
              className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-warn-fg"
            >
              Descartar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
