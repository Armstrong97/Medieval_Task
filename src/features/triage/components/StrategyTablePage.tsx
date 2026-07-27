import { useEffect, useState } from 'react'
import { Link2 } from 'lucide-react'
import { useCategories, useCreateProject, useProjects } from '@/features/projects/hooks'
import { useHudTasks } from '@/features/battle-hud/hooks'
import { useTriageSession } from '@/features/triage/hooks'
import { fromDatetimeLocalValue } from '@/utils/datetime'
import { WeaponSelector } from '@/features/triage/components/WeaponSelector'
import { InboxCardDeck } from '@/features/triage/components/InboxCardDeck'
import { DirectEquipToggle } from '@/features/triage/components/DirectEquipToggle'
import type { TaskSize } from '@/types/database.types'
import type { DispatchOutcome } from '@/features/triage/api'

const NEW_PROJECT = '__new__'
const NO_PROJECT = ''

export function StrategyTablePage() {
  const { current, remainingCount, isLoading, dispatch } = useTriageSession()
  const { data: categories } = useCategories()
  const { data: projects } = useProjects()
  const createProject = useCreateProject()
  const { data: hudTasks } = useHudTasks()

  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [projectChoice, setProjectChoice] = useState(NO_PROJECT)
  const [newProjectName, setNewProjectName] = useState('')
  const [deadline, setDeadline] = useState('')
  const [size, setSize] = useState<TaskSize | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Cada vez que cambia la carta activa, el formulario arranca de cero.
  useEffect(() => {
    setTitle(current?.title ?? '')
    setCategoryId('')
    setProjectChoice(NO_PROJECT)
    setNewProjectName('')
    setDeadline('')
    setSize(null)
    setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  const occupiedSlots = new Set((hudTasks ?? []).map((t) => t.hud_slot))
  const firstFreeSlot = [1, 2, 3].find((s) => !occupiedSlots.has(s)) ?? null

  async function handleDispatch(outcome: DispatchOutcome) {
    if (!current) return
    setError(null)

    if (!title.trim()) {
      setError('La misión necesita un título.')
      return
    }
    if (!categoryId) {
      setError('Elegí una categoría.')
      return
    }
    if (!deadline) {
      setError('El deadline es obligatorio para sacarla del inbox.')
      return
    }
    if (!size) {
      setError('Elegí un arma (define el tamaño y el XP).')
      return
    }
    if (projectChoice === NEW_PROJECT && !newProjectName.trim()) {
      setError('Ponele nombre al proyecto nuevo.')
      return
    }

    try {
      let projectId: string | null = null
      if (projectChoice === NEW_PROJECT) {
        const project = await createProject.mutateAsync({ name: newProjectName.trim(), categoryId })
        projectId = project.id
      } else if (projectChoice !== NO_PROJECT) {
        projectId = projectChoice
      }

      await dispatch.mutateAsync({
        taskId: current.id,
        title: title.trim(),
        categoryId,
        projectId,
        deadlineIso: fromDatetimeLocalValue(deadline),
        size,
        outcome,
        hudSlot: outcome === 'equip' ? firstFreeSlot : null,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo despachar la misión, probá de nuevo.')
    }
  }

  if (isLoading) {
    return <p className="p-6 text-sm text-fg-muted">Cargando…</p>
  }

  if (!current) {
    return (
      <div className="mx-auto max-w-lg p-6 text-center">
        <h1 className="font-display text-lg font-semibold tracking-tight text-fg">Mesa de Estrategia</h1>
        <p className="mt-4 font-display text-xl font-bold text-gold-bright">Maza Limpia — ¡Inbox Vacío!</p>
        <p className="mt-2 text-sm text-fg-muted">No hay misiones capturadas esperando triage.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-lg font-semibold tracking-tight text-fg">Mesa de Estrategia</h1>
        <span className="font-mono text-sm text-fg-muted">{remainingCount} en el inbox</span>
      </div>

      <div className="mt-4">
        <InboxCardDeck
          remainingCount={remainingCount}
          title={title}
          onTitleChange={setTitle}
          deadline={deadline}
          onDeadlineChange={setDeadline}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <div className="flex gap-2">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
          >
            <option value="" disabled>
              Categoría
            </option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={projectChoice}
            onChange={(e) => setProjectChoice(e.target.value)}
            className="flex-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
          >
            <option value={NO_PROJECT}>Tareas sueltas</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
            <option value={NEW_PROJECT}>+ Crear proyecto nuevo…</option>
          </select>
        </div>

        {projectChoice === NEW_PROJECT && (
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Nombre del proyecto"
            className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
          />
        )}

        <WeaponSelector value={size} onChange={setSize} />

        {error && <p className="text-sm text-warn-fg">{error}</p>}

        <div className="mt-1 flex gap-2">
          <button
            type="button"
            onClick={() => void handleDispatch('grimorio')}
            disabled={dispatch.isPending}
            className="flex-1 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_4px_20px_rgba(217,169,74,0.4)] active:scale-[0.98] disabled:opacity-60"
          >
            Despachar al Grimorio
          </button>
          <DirectEquipToggle
            disabled={dispatch.isPending || firstFreeSlot === null}
            onClick={() => void handleDispatch('equip')}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void handleDispatch('follow_up')}
            disabled={dispatch.isPending}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-sky-500/40 px-3 py-1.5 text-sm font-medium text-sky-500 transition-colors hover:bg-sky-500/10 disabled:opacity-60"
          >
            <Link2 className="h-4 w-4" /> Mover a Seguimiento
          </button>
        </div>
      </div>
    </div>
  )
}
