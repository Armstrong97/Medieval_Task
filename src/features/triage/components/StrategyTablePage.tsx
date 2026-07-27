import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Link2, Swords } from 'lucide-react'
import { useCategories, useCreateProject, useProjects } from '@/features/projects/hooks'
import { useHudTasks } from '@/features/battle-hud/hooks'
import { useTriageSession } from '@/features/triage/hooks'
import { fromDatetimeLocalValue } from '@/utils/datetime'
import { WeaponSelector } from '@/features/triage/components/WeaponSelector'
import { InboxCardDeck } from '@/features/triage/components/InboxCardDeck'
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
  const [animatingOut, setAnimatingOut] = useState(false)

  // Reset del formulario cuando entra una nueva carta
  useEffect(() => {
    setTitle(current?.title ?? '')
    setCategoryId('')
    setProjectChoice(NO_PROJECT)
    setNewProjectName('')
    setDeadline('')
    setSize(null)
    setError(null)
    setAnimatingOut(false)
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
      setError('Elegí una categoría para tu clase.')
      return
    }
    if (!deadline) {
      setError('El deadline es obligatorio para despachar el pergamino.')
      return
    }
    if (!size) {
      setError('Selecciona un arma (define la dificultad y XP).')
      return
    }
    if (projectChoice === NEW_PROJECT && !newProjectName.trim()) {
      setError('Ponele nombre al nuevo proyecto.')
      return
    }

    // Iniciar física de deslizamiento
    setAnimatingOut(true)

    setTimeout(async () => {
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
        setAnimatingOut(false)
        setError(err instanceof Error ? err.message : 'No se pudo despachar la carta.')
      }
    }, 450)
  }

  if (isLoading) {
    return <p className="py-12 text-center font-mono text-sm text-fg-muted">Cargando mesa táctica…</p>
  }

  // Vista de Victoria (Inbox Vacío / Maza Limpia)
  if (!current) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-8 text-center">
        <div className="mb-6 text-7xl">🏰</div>
        <h1 className="mb-2 font-display text-4xl font-black uppercase tracking-tighter text-accent">
          Maza Limpia
        </h1>
        <p className="mb-8 font-display text-lg italic text-fg-muted">
          ¡Inbox Vacío, Comandante! Todos los pergaminos fueron asignados.
        </p>
        <Link
          to="/"
          className="btn-prime rounded-full px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest"
        >
          Ir al Battle HUD
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-6 md:px-8">
      {/* Header Contador */}
      <header className="mb-6 flex w-full max-w-xl items-center justify-between">
        <h1 className="font-display text-lg font-bold tracking-wide text-fg">
          Mesa de Estrategia
        </h1>
        <span className="rounded-full border border-border bg-black/40 px-3 py-1 font-mono text-[10px] font-bold text-accent">
          {remainingCount} PERGAMINOS PENDIENTES
        </span>
      </header>

      {/* Escenario del Mazo Táctico */}
      <main className="deck-container relative w-full max-w-xl">
        {/* Cartas Apiladas Detrás (Visual Stack) */}
        {remainingCount > 1 && <div className="card-bg-visual card-stack-1" />}
        {remainingCount > 2 && <div className="card-bg-visual card-stack-2" />}

        {/* Carta Activa */}
        <article
          className={`active-strategy-card relative z-10 flex flex-col gap-6 rounded-3xl p-6 md:p-8 ${
            animatingOut ? 'slide-out-right' : ''
          }`}
        >
          {/* Título & Deadline */}
          <InboxCardDeck
            remainingCount={remainingCount}
            title={title}
            onTitleChange={setTitle}
            deadline={deadline}
            onDeadlineChange={setDeadline}
          />

          {/* Selector de Armas / Dificultad */}
          <WeaponSelector value={size} onChange={setSize} />

          {/* Categoría y Proyecto */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] uppercase tracking-widest text-fg-muted/50">
                Categoría / Clase
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="parchment-select w-full rounded-xl p-3 font-mono text-xs font-bold uppercase tracking-wider"
              >
                <option value="" disabled>
                  Elegir Clase
                </option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.class_name})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] uppercase tracking-widest text-fg-muted/50">
                Proyecto / Destino
              </label>
              <select
                value={projectChoice}
                onChange={(e) => setProjectChoice(e.target.value)}
                className="parchment-select w-full rounded-xl p-3 font-mono text-xs font-bold uppercase tracking-wider"
              >
                <option value={NO_PROJECT}>Misiones Sueltas</option>
                {projects?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
                <option value={NEW_PROJECT}>+ Crear Proyecto…</option>
              </select>
            </div>
          </div>

          {projectChoice === NEW_PROJECT && (
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Nombre del nuevo proyecto..."
              className="input-parchment w-full rounded-xl p-3 text-sm text-fg"
            />
          )}

          {error && <p className="font-mono text-xs font-medium text-warn-fg">{error}</p>}

          {/* Botones de Despacho Inmediato */}
          <footer className="mt-2 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => void handleDispatch('grimorio')}
                disabled={dispatch.isPending}
                className="rounded-xl border border-border py-3.5 font-mono text-[10px] font-black uppercase tracking-widest text-fg transition-all hover:bg-white/5 active:scale-95 disabled:opacity-50"
              >
                Despachar al Grimorio
              </button>
              <button
                type="button"
                onClick={() => void handleDispatch('follow_up')}
                disabled={dispatch.isPending}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-sky-900/50 py-3.5 font-mono text-[10px] font-black uppercase tracking-widest text-sky-400 transition-all hover:bg-sky-400/10 active:scale-95 disabled:opacity-50"
              >
                <Link2 className="h-3.5 w-3.5" /> Seguimiento
              </button>
            </div>

            <button
              type="button"
              onClick={() => void handleDispatch('equip')}
              disabled={dispatch.isPending || firstFreeSlot === null}
              className="btn-prime flex w-full items-center justify-center gap-2 rounded-xl py-4 font-display text-sm font-black uppercase tracking-widest disabled:opacity-40"
            >
              <Swords className="h-4 w-4" /> Equipar en Combate
            </button>
          </footer>
        </article>
      </main>
    </div>
  )
}
