import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { showToast } from '@/components/ui/toast-store'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteTask } from '@/features/tasks/hooks'
import { createChain } from '@/features/chains/api'
import { DraftChain } from '@/features/chains/components/DraftChain'
import type { DraftStage } from '@/features/chains/stages'
import { Castle, Link2, Swords } from 'lucide-react'
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
const LAST_CHOICE_KEY = 'questly_triage_last'

// Recordar la última clase/destino: la mayoría de capturas seguidas comparten
// contexto, y cada decisión repetida es fricción (parálisis en TDAH).
function readLastChoice(): { categoryId: string; projectChoice: string } {
  try {
    const raw = localStorage.getItem(LAST_CHOICE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as { categoryId?: string; projectChoice?: string }
      return { categoryId: parsed.categoryId ?? '', projectChoice: parsed.projectChoice ?? NO_PROJECT }
    }
  } catch {
    // localStorage no disponible: se arranca sin recuerdo.
  }
  return { categoryId: '', projectChoice: NO_PROJECT }
}

export function StrategyTablePage() {
  const { items, isLoading, dispatch } = useTriageSession()
  const deleteTask = useDeleteTask()
  const { data: categories } = useCategories()
  const { data: projects } = useProjects()
  const createProject = useCreateProject()
  const { data: hudTasks } = useHudTasks()
  const queryClient = useQueryClient()

  const [chain, setChain] = useState<DraftStage[]>([])
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState(() => readLastChoice().categoryId)
  const [projectChoice, setProjectChoice] = useState(() => readLastChoice().projectChoice)
  const [skipped, setSkipped] = useState<string[]>([])
  const [showErrors, setShowErrors] = useState(false)
  const [confirmingDiscard, setConfirmingDiscard] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [deadline, setDeadline] = useState('')
  const [size, setSize] = useState<TaskSize | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [animatingOut, setAnimatingOut] = useState(false)

  // "Saltar por ahora" manda la carta al final de la cola durante esta sesión.
  const pending = items.filter((i) => !skipped.includes(i.id))
  const current = pending[0] ?? items[0]
  const remainingCount = items.length

  // Reset del formulario cuando entra una nueva carta. Clase y destino se
  // conservan a propósito (ver readLastChoice); fecha y arma no, porque son
  // decisiones propias de cada misión.
  useEffect(() => {
    setTitle(current?.title ?? '')
    setNewProjectName('')
    setDeadline('')
    setSize(null)
    setError(null)
    setShowErrors(false)
    setConfirmingDiscard(false)
    setAnimatingOut(false)
    setChain([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  const occupiedSlots = new Set((hudTasks ?? []).map((t) => t.hud_slot))
  const firstFreeSlot = [1, 2, 3].find((s) => !occupiedSlots.has(s)) ?? null

  const problems = {
    title: !title.trim(),
    category: !categoryId,
    deadline: !deadline,
    size: !size,
    project: projectChoice === NEW_PROJECT && !newProjectName.trim(),
  }
  const missing = [
    problems.title && 'título',
    problems.category && 'clase',
    problems.deadline && 'fecha',
    problems.size && 'arma',
    problems.project && 'nombre del proyecto',
  ].filter(Boolean) as string[]

  function persistChoice() {
    try {
      localStorage.setItem(LAST_CHOICE_KEY, JSON.stringify({ categoryId, projectChoice: projectChoice === NEW_PROJECT ? NO_PROJECT : projectChoice }))
    } catch {
      // sin localStorage: solo se pierde el recuerdo.
    }
  }

  function handleSkip() {
    if (!current) return
    setSkipped((ids) => (pending.length <= 1 ? [] : [...ids, current.id]))
  }

  function handleDiscard() {
    if (!current) return
    deleteTask.mutate(current.id, { onSuccess: () => showToast({ title: 'Captura descartada' }) })
  }

  async function handleDispatch(outcome: DispatchOutcome) {
    if (!current) return
    setError(null)

    if (missing.length > 0) {
      setShowErrors(true)
      return
    }
    const chosenCategoryId = categoryId
    const chosenSize = size as TaskSize
    // Una misión que se manda a seguimiento espera la respuesta, no el cierre
    // (follow_up_resolved se cumple también si la misión se completa).
    const chosenChain = chain.map((s, i) =>
      i === 0 && outcome === 'follow_up' ? { ...s, event: 'follow_up_resolved' as const } : s,
    )

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

        const dispatched = await dispatch.mutateAsync({
          taskId: current.id,
          title: title.trim(),
          categoryId: chosenCategoryId,
          projectId,
          deadlineIso: fromDatetimeLocalValue(deadline),
          size: chosenSize,
          outcome,
          hudSlot: outcome === 'equip' ? firstFreeSlot : null,
        })
        persistChoice()
        if (chosenChain.length > 0) {
          try {
            await createChain(dispatched, chosenChain)
          } catch (chainErr) {
            showToast({
              title: 'La misión se despachó, pero no se pudo crear su cadena',
              detail: chainErr instanceof Error ? chainErr.message : undefined,
            })
          }
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
          queryClient.invalidateQueries({ queryKey: ['task-links'] })
        }
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
        <Castle className="mb-6 h-20 w-20 text-accent" aria-hidden="true" />
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
        <span className="rounded-full border border-border bg-shade/40 px-3 py-1 font-mono text-xs font-bold text-accent">
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
          <div>
            <InboxCardDeck
              remainingCount={remainingCount}
              title={title}
              onTitleChange={setTitle}
              deadline={deadline}
              onDeadlineChange={setDeadline}
            />
            {showErrors && problems.title && <FieldError>Ponle un título a la misión.</FieldError>}
            {showErrors && problems.deadline && <FieldError>Elige una fecha límite.</FieldError>}
          </div>

          {/* Selector de Armas / Dificultad */}
          <div>
            <WeaponSelector value={size} onChange={setSize} />
            {showErrors && problems.size && <FieldError>Elige un arma: define la dificultad y el XP.</FieldError>}
          </div>

          <DraftChain rootTitle={title} stages={chain} onChange={setChain} />

          {/* Categoría y Proyecto */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs uppercase tracking-widest text-fg-muted/50">
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
              {showErrors && problems.category && <FieldError>Elige una clase.</FieldError>}
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs uppercase tracking-widest text-fg-muted/50">
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
          {showErrors && problems.project && <FieldError>Ponle nombre al nuevo proyecto.</FieldError>}

          {showErrors && missing.length > 0 && (
            <p role="alert" className="rounded-lg border border-warn-border bg-warn-bg px-3 py-2 font-mono text-xs font-medium text-warn-fg">
              Falta: {missing.join(', ')}.
            </p>
          )}
          {error && <p role="alert" className="font-mono text-xs font-medium text-warn-fg">{error}</p>}

          {/* Botones de Despacho Inmediato */}
          <footer className="mt-2 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => void handleDispatch('grimorio')}
                disabled={dispatch.isPending}
                className="rounded-xl border border-border py-3.5 font-mono text-xs font-black uppercase tracking-widest text-fg transition-all hover:bg-glass/5 active:scale-95 disabled:opacity-50"
              >
                Despachar al Grimorio
              </button>
              <button
                type="button"
                onClick={() => void handleDispatch('follow_up')}
                disabled={dispatch.isPending}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-rune/30 py-3.5 font-mono text-xs font-black uppercase tracking-widest text-rune transition-all hover:bg-rune/10 active:scale-95 disabled:opacity-50"
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
            <div className="flex items-center justify-center gap-2 pt-1">
              {remainingCount > 1 && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="rounded-lg px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
                >
                  Saltar por ahora
                </button>
              )}
              {confirmingDiscard ? (
                <>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    disabled={deleteTask.isPending}
                    className="rounded-lg border border-red-600/40 bg-red-600/20 px-4 py-2.5 font-mono text-xs font-black uppercase tracking-widest text-red-400"
                  >
                    Sí, descartar
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingDiscard(false)}
                    className="rounded-lg px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmingDiscard(true)}
                  className="rounded-lg px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-red-400"
                >
                  Descartar
                </button>
              )}
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}

function FieldError({ children }: { children: string }) {
  return (
    <p role="alert" className="mt-1.5 font-mono text-xs font-medium text-warn-fg">
      {children}
    </p>
  )
}
