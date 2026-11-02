import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, GripVertical, X, Trash2, Swords, Check, Undo2, Link2, ChevronRight, ScrollText, Star, Sparkles } from 'lucide-react'
import { addDays } from 'date-fns'
import { useCategories, useProjects } from '@/features/projects/hooks'
import {
  useCompleteTask,
  useCreateTask,
  useDeleteTask,
  useReopenTask,
  useReorderSubtasks,
  useSubtasks,
  useUpdateTask,
} from '@/features/tasks/hooks'
import { useEquipHudSlot, useHudTasks } from '@/features/battle-hud/hooks'
import {
  useClearTodayPriority,
  useSetTodayPriority,
  useTodayQuests,
} from '@/features/gamification/hooks'
import {
  useDeleteFollowUp,
  useFollowUpForTask,
  useSendToFollowUp,
} from '@/features/followups/hooks'
import { ChainSection } from '@/features/chains/components/ChainSection'
import { useAiEnabled, useSuggestMicrosteps } from '@/features/ai/hooks'
import { fromDatetimeLocalValue, toDatetimeLocalValue } from '@/utils/datetime'
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { Task, TaskSize } from '@/types/database.types'

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

export function TaskModal({
  task,
  defaultProjectId,
  defaultKanbanColumnId,
  onClose,
}: {
  task?: Task | null
  defaultProjectId?: string | null
  defaultKanbanColumnId?: string
  onClose: () => void
}) {
  const isEditing = !!task
  const { data: categories } = useCategories()
  const { data: projects } = useProjects()
  const { data: hudTasks } = useHudTasks()

  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()
  const completeTask = useCompleteTask()
  const reopenTask = useReopenTask()
  const equipToHud = useEquipHudSlot()

  // Subtareas de la misión (micro-pasos)
  const { data: subtasks } = useSubtasks(task?.id ?? null)
  const reorderSubtasks = useReorderSubtasks(task?.id ?? '')
  const [dragSubId, setDragSubId] = useState<string | null>(null)
  const [overSubId, setOverSubId] = useState<string | null>(null)

  // Prioridad del día
  const { data: todayQuests } = useTodayQuests()
  const setTodayPriority = useSetTodayPriority()
  const clearTodayPriority = useClearTodayPriority()
  const priorityQuest = todayQuests?.find((q) => q.type === 'daily_priority')
  const isTodayPriority = !!task && priorityQuest?.task_id === task.id
  const canBePriority = !!task && task.parent_task_id === null

  // Follow-up
  const { data: existingFollowUp } = useFollowUpForTask(task?.id ?? null)
  const sendToFollowUp = useSendToFollowUp()
  const deleteFollowUp = useDeleteFollowUp()
  const [showFollowUpForm, setShowFollowUpForm] = useState(false)
  const [followUpIntervalDays, setFollowUpIntervalDays] = useState(DEFAULT_FOLLOW_UP_INTERVAL_DAYS)
  const [followUpStakeholder, setFollowUpStakeholder] = useState('')

  // Estados del Formulario
  const [title, setTitle] = useState(task?.title ?? '')
  const [size, setSize] = useState<TaskSize>(task?.size ?? 'small')
  const [categoryId, setCategoryId] = useState<string>(task?.category_id ?? '')
  const [projectId, setProjectId] = useState<string | null>(task?.project_id ?? defaultProjectId ?? null)
  const [deadline, setDeadline] = useState<string>(toDatetimeLocalValue(task?.deadline ?? null))
  const [description, setDescription] = useState<string>(task?.description ?? '')
  const [newSubtaskText, setNewSubtaskText] = useState('')
  const aiEnabled = useAiEnabled()
  const suggestSteps = useSuggestMicrosteps()
  const [suggestedSteps, setSuggestedSteps] = useState<string[]>([])
  const [addingSteps, setAddingSteps] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [sealing, setSealing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Asignar primer categoría por defecto si está vacía
  useEffect(() => {
    if (!categoryId && categories && categories.length > 0) {
      setCategoryId(categories[0].id)
    }
  }, [categories, categoryId])

  // Cálculo de porcentaje de HP/Integridad por subtareas
  const totalSub = subtasks?.length ?? 0
  const doneSub = subtasks?.filter((s) => s.status === 'done').length ?? 0
  const hpPercent = totalSub > 0 ? Math.round((doneSub / totalSub) * 100) : 0

  const occupiedSlots = new Set((hudTasks ?? []).map((t) => t.hud_slot))
  const firstFreeSlot = [1, 2, 3].find((s) => !occupiedSlots.has(s)) ?? null

  function setQuickDeadline(daysFromNow: number) {
    const d = addDays(new Date(), daysFromNow)
    d.setHours(18, 0, 0, 0)
    setDeadline(toDatetimeLocalValue(d.toISOString()))
  }

  function handleComplete() {
    if (!task) return
    // La misión ya está hecha: se cierra el editor (el aviso de XP confirma el logro).
    completeTask.mutate({ id: task.id, project_id: task.project_id }, { onSuccess: onClose })
  }

  function handleReopen() {
    if (!task) return
    reopenTask.mutate({ id: task.id, project_id: task.project_id })
  }

  function handleConfirmFollowUp() {
    if (!task) return
    sendToFollowUp.mutate(
      {
        taskId: task.id,
        intervalDays: followUpIntervalDays,
        stakeholderName: followUpStakeholder.trim() || null,
      },
      { onSuccess: () => setShowFollowUpForm(false) },
    )
  }

  function handleCancelFollowUp() {
    if (!task || !existingFollowUp) return
    deleteFollowUp.mutate(existingFollowUp.id)
    reopenTask.mutate({ id: task.id, project_id: task.project_id })
  }

  // Los micro-pasos son un paso a paso: el orden lo decide el usuario.
  function moveSubtask(index: number, delta: -1 | 1) {
    if (!subtasks || !task) return
    const target = index + delta
    if (target < 0 || target >= subtasks.length) return
    const ids = subtasks.map((s) => s.id)
    ;[ids[index], ids[target]] = [ids[target], ids[index]]
    reorderSubtasks.mutate(ids)
  }

  // Arrastrar un micro-paso sobre otro lo deja en esa posición (arrastre nativo,
  // solo mouse; en celular quedan las flechas).
  function dropSubtask(targetId: string) {
    const fromId = dragSubId
    setDragSubId(null)
    setOverSubId(null)
    if (!subtasks || !task || !fromId || fromId === targetId) return
    const ids = subtasks.map((s) => s.id)
    ids.splice(ids.indexOf(targetId), 0, ids.splice(ids.indexOf(fromId), 1)[0])
    reorderSubtasks.mutate(ids)
  }

  function handleAddSubtask() {
    if (!newSubtaskText.trim() || !task) return
    // Las subtareas siempre requieren deadline (constraint de la DB) — se
    // hereda el de la tarea padre para no agregarle fricción al micro-paso.
    createTask.mutate({
      title: newSubtaskText.trim(),
      parent_task_id: task.id,
      project_id: task.project_id,
      deadline: task.deadline,
    })
    setNewSubtaskText('')
  }

  function handleSuggestSteps() {
    if (!task) return
    setAiError(null)
    suggestSteps.mutate(task.id, { onSuccess: setSuggestedSteps, onError: (e) => setAiError(e.message) })
  }

  // Uno a uno y en orden: el trigger asigna la posición al insertar, y en paralelo se desordenarían.
  async function addSuggestedSteps() {
    if (!task) return
    setAddingSteps(true)
    try {
      for (const stepTitle of suggestedSteps) {
        await createTask.mutateAsync({ title: stepTitle, parent_task_id: task.id, project_id: task.project_id, deadline: task.deadline })
        setSuggestedSteps((steps) => steps.slice(1))
      }
    } catch (e) {
      setAiError(e instanceof Error ? e.message : 'No se pudieron añadir los micro-pasos.')
    } finally {
      setAddingSteps(false)
    }
  }

  function handleSubmit() {
    if (!title.trim() || !categoryId) return
    if (!deadline) {
      setError('El deadline es obligatorio para sellar el decreto.')
      return
    }
    setError(null)
    setSealing(true)

    const payload = {
      title: title.trim(),
      size,
      category_id: categoryId,
      project_id: projectId,
      deadline: fromDatetimeLocalValue(deadline),
      description: description.trim() || null,
    }

    setTimeout(async () => {
      setSaving(true)
      try {
        if (isEditing && task) {
          await updateTask.mutateAsync({ id: task.id, patch: payload })
        } else {
          await createTask.mutateAsync({ ...payload, kanban_column_id: defaultKanbanColumnId ?? '' })
        }
        onClose()
      } catch (err) {
        setSealing(false)
        setError(err instanceof Error ? err.message : 'No se pudo sellar el decreto.')
      } finally {
        setSaving(false)
      }
    }, 450)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className={`grimoire-editor-modal relative flex w-full max-w-2xl flex-col rounded-3xl ${
          sealing ? 'animate-seal-flash' : ''
        }`}
      >
        {/* Encabezado con Estado y Acciones Rápidas */}
        <header className="flex items-center justify-between gap-3 border-b border-glass/5 p-6">
          <span className="rounded-full border border-glass/10 bg-glass/5 px-3 py-1 font-mono text-xs font-bold text-fg-muted">
            {task?.hud_slot !== null && task?.hud_slot !== undefined
              ? (<><Swords className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />EQUIPADO EN HUD SLOT {task.hud_slot}</>)
              : (<><ScrollText className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />EN EL GRIMORIO</>)}
          </span>

          <div className="flex items-center gap-2">
            {isEditing &&
              task &&
              (task.status === 'done' ? (
                <button
                  type="button"
                  onClick={handleReopen}
                  className="flex items-center gap-1.5 rounded-full border border-glass/10 bg-glass/5 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
                >
                  <Undo2 className="h-3.5 w-3.5" /> Reabrir
                </button>
              ) : task.locked ? null : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="btn-prime flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs font-black uppercase tracking-widest"
                >
                  <Check className="h-3.5 w-3.5" /> Completar
                </button>
              ))}
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-glass/5 hover:text-fg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Cuerpo Principal del Formulario */}
        <div className="space-y-8 p-6 md:p-8">
          {/* Título Principal */}
          <div className="space-y-1.5">
            <label className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent/70">
              Decreto de Misión
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Cuál es la nueva misión?"
              className="w-full border-none bg-transparent p-0 font-display text-2xl font-bold text-fg outline-none placeholder:text-fg-muted/30 md:text-3xl"
            />
          </div>

          {/* Grid: Envergadura (XP) & Plazo de Entrega */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Chips de Envergadura (XP / Arma) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
                  Envergadura (Dificultad & XP)
                </p>
                {canBePriority && task && (
                  <button
                    type="button"
                    onClick={() =>
                      isTodayPriority ? clearTodayPriority.mutate() : setTodayPriority.mutate(task.id)
                    }
                    title="Prioridad de hoy"
                    aria-label="Prioridad de hoy"
                    className={`text-base leading-none transition-all duration-150 hover:scale-110 active:scale-95 ${
                      isTodayPriority
                        ? 'text-gold drop-shadow-[0_0_6px_rgb(var(--gold-rgb)/0.6)]'
                        : 'text-fg-muted/40 hover:text-gold/60'
                    }`}
                  >
                    <Star className={`h-5 w-5 ${isTodayPriority ? 'fill-gold' : ''}`} aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {(
                  [
                    { key: 'small', icon: WEAPON_ICONS.small, xp: '+10', cls: 'active-weapon-small' },
                    { key: 'medium', icon: WEAPON_ICONS.medium, xp: '+25', cls: 'active-weapon-medium' },
                    { key: 'large', icon: WEAPON_ICONS.large, xp: '+50', cls: 'active-weapon-large' },
                  ] as const
                ).map((w) => {
                  const isActive = size === w.key
                  return (
                    <button
                      key={w.key}
                      type="button"
                      onClick={() => setSize(w.key)}
                      className={`tactile-chip flex flex-1 flex-col items-center gap-1 rounded-xl py-3 ${
                        isActive ? w.cls : ''
                      }`}
                    >
                      <img src={w.icon} alt="" className="h-6 w-6 object-contain" />
                      <span className="font-mono text-xs font-black uppercase">{w.xp} XP</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Chips de Plazo Rápidos */}
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
                Plazo de Entrega
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setQuickDeadline(0)}
                  className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase active-gold"
                >
                  Hoy
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDeadline(1)}
                  className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                >
                  Mañana
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDeadline(3)}
                  className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                >
                  Finde
                </button>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="tactile-chip rounded-full px-3 py-1.5 font-mono text-xs text-fg outline-none"
                />
              </div>
            </div>
          </div>

          {/* Chips de Clase / Ámbitos */}
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
              Ámbito de la Orden (Clase)
            </p>
            <div className="flex flex-wrap gap-2">
              {categories?.map((cat) => {
                const isActive = categoryId === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryId(cat.id)}
                    className={`tactile-chip rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase ${
                      isActive ? 'active-gold' : ''
                    }`}
                  >
                    {cat.name} ({cat.class_name})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Seguimiento (Follow-up) */}
          {isEditing && task && task.status !== 'done' && (
            <div className="space-y-3 rounded-2xl border border-glass/5 bg-shade/20 p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
                Seguimiento (Follow-up)
              </p>

              {existingFollowUp ? (
                <div className="space-y-2.5">
                  <p className="font-mono text-xs text-fg">
                    En seguimiento
                    {existingFollowUp.stakeholder_name ? ` con ${existingFollowUp.stakeholder_name}` : ''} · cada{' '}
                    {existingFollowUp.interval_days} días
                  </p>
                  <p className="font-mono text-xs text-fg-muted/60">
                    Próximo recordatorio: {toDatetimeLocalValue(existingFollowUp.next_reminder_at).slice(0, 10)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleCancelFollowUp}
                      className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                    >
                      Cancelar seguimiento
                    </button>
                  </div>
                </div>
              ) : task.status !== 'follow_up' ? (
                showFollowUpForm ? (
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-1.5 font-mono text-xs text-fg-muted">
                        Cada
                        <input
                          type="number"
                          min={1}
                          value={followUpIntervalDays}
                          onChange={(e) => setFollowUpIntervalDays(Number(e.target.value) || 1)}
                          className="w-14 rounded-lg border border-glass/10 bg-shade/30 px-2 py-1 font-mono text-xs text-fg outline-none focus:border-accent"
                        />
                        días
                      </label>
                      <input
                        value={followUpStakeholder}
                        onChange={(e) => setFollowUpStakeholder(e.target.value)}
                        placeholder="Nombre del stakeholder (opcional)"
                        className="flex-1 rounded-lg border border-glass/10 bg-shade/30 px-3 py-1.5 font-mono text-xs text-fg outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleConfirmFollowUp}
                        className="tactile-chip active-gold rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                      >
                        Confirmar seguimiento
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowFollowUpForm(false)}
                        className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowFollowUpForm(true)}
                    className="tactile-chip flex w-fit items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                  >
                    <Link2 className="h-3.5 w-3.5" /> Enviar a Follow-up
                  </button>
                )
              ) : null}
            </div>
          )}

          {/* Cadena de misiones (solo misiones triadas de nivel superior) */}
          {isEditing && task && task.parent_task_id === null && task.kanban_column_id && (
            <ChainSection task={task} />
          )}

          {/* Micro-Stepping (Submisiones & Integridad HP) */}
          {isEditing && task && (
            <div className="space-y-4 rounded-2xl border border-glass/5 bg-shade/20 p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
                  Integridad de la Quest (Submisiones)
                </p>
                <span className="font-mono text-xs font-bold text-accent">{hpPercent}%</span>
              </div>

              <div className="quest-hp-track">
                <div className="quest-hp-fill" style={{ width: `${hpPercent}%` }} />
              </div>

              {/* Lista de Submisiones Existentes */}
              <div className="space-y-2 pt-1">
                {subtasks?.map((st, index) => (
                  <div
                    key={st.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'move'
                      e.dataTransfer.setData('text/plain', st.id)
                      setDragSubId(st.id)
                    }}
                    onDragOver={(e) => {
                      if (!dragSubId) return
                      e.preventDefault()
                      e.dataTransfer.dropEffect = 'move'
                      setOverSubId(st.id)
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      dropSubtask(st.id)
                    }}
                    onDragEnd={() => {
                      setDragSubId(null)
                      setOverSubId(null)
                    }}
                    className={`flex items-center justify-between gap-2 rounded ${
                      dragSubId === st.id ? 'opacity-40' : ''
                    } ${overSubId === st.id && dragSubId !== st.id ? 'border-t-2 border-rune' : 'border-t-2 border-transparent'}`}
                  >
                    <GripVertical
                      className="h-4 w-4 shrink-0 cursor-grab text-fg-muted active:cursor-grabbing"
                      aria-hidden="true"
                    />
                    <span className="w-4 shrink-0 text-right font-mono text-xs text-fg-muted">{index + 1}.</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateTask.mutate({
                          id: st.id,
                          patch: { status: st.status === 'done' ? 'pending' : 'done' },
                        })
                      }
                      className={`flex h-5 w-5 items-center justify-center rounded border font-mono text-xs transition-all ${
                        st.status === 'done' ? 'border-accent bg-accent text-accent-fg' : 'border-glass/20'
                      }`}
                    >
                      {st.status === 'done' ? <Check className="h-3 w-3" aria-hidden="true" /> : null}
                    </button>
                    <span
                      className={`flex-1 text-xs text-fg ${
                        st.status === 'done' ? 'line-through opacity-40' : ''
                      }`}
                    >
                      {st.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => moveSubtask(index, -1)}
                      disabled={index === 0}
                      aria-label={`Subir micro-paso: ${st.title}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-fg-muted transition-colors hover:text-fg disabled:opacity-25"
                    >
                      <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSubtask(index, 1)}
                      disabled={index === subtasks.length - 1}
                      aria-label={`Bajar micro-paso: ${st.title}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-fg-muted transition-colors hover:text-fg disabled:opacity-25"
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTask.mutate(st.id)}
                      className="text-fg-muted/40 transition-colors hover:text-red-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Agregar nueva Submisión */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newSubtaskText}
                  onChange={(e) => setNewSubtaskText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                  placeholder="+ Añadir Micro-paso (2 min)..."
                  className="flex-1 rounded-lg border border-dashed border-glass/10 bg-transparent px-3 py-2 font-mono text-xs text-fg outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={handleAddSubtask}
                  className="rounded-lg border border-border bg-glass/5 px-3 py-2 font-mono text-xs font-bold text-fg hover:bg-glass/10"
                >
                  Añadir
                </button>
              </div>

              {aiEnabled && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleSuggestSteps}
                    disabled={suggestSteps.isPending || addingSteps}
                    className="flex items-center gap-1.5 rounded-lg border border-rune/30 px-3 py-2 font-mono text-xs font-bold text-rune transition-colors hover:bg-rune/10 disabled:opacity-50"
                  >
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {suggestSteps.isPending ? 'Pensando…' : 'Sugerir micro-pasos con IA'}
                  </button>
                  {aiError && (
                    <p role="alert" className="font-mono text-xs font-medium text-warn-fg">
                      {aiError}
                    </p>
                  )}
                  {suggestedSteps.length > 0 && (
                    <div className="space-y-2 rounded-lg border border-rune/20 bg-rune/5 p-3">
                      <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">Sugeridos</p>
                      <ul className="space-y-1">
                        {suggestedSteps.map((s) => (
                          <li key={s} className="flex items-start justify-between gap-2 font-mono text-xs text-fg">
                            <span>{s}</span>
                            <button
                              type="button"
                              onClick={() => setSuggestedSteps((steps) => steps.filter((x) => x !== s))}
                              aria-label={`Quitar sugerencia: ${s}`}
                              className="shrink-0 text-fg-muted hover:text-fg"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => void addSuggestedSteps()}
                          disabled={addingSteps}
                          className="rounded-lg border border-border bg-glass/5 px-3 py-1.5 font-mono text-xs font-bold text-fg hover:bg-glass/10 disabled:opacity-50"
                        >
                          {addingSteps ? 'Añadiendo…' : 'Añadir todos'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSuggestedSteps([])}
                          disabled={addingSteps}
                          className="rounded-lg px-3 py-1.5 font-mono text-xs font-bold text-fg-muted hover:text-fg"
                        >
                          Descartar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Acordeón Oculto de Notas y Proyecto Complejo */}
          <details className="group">
            <summary className="flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted/40 transition-all hover:text-fg group-open:text-accent">
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-open:rotate-90" aria-hidden="true" /> Notas y Detalles Arcanos
            </summary>
            <div className="space-y-4 pt-4">
              {/* Selección de Proyecto */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-fg-muted/50">
                  Proyecto Asociado (Mazmorra)
                </label>
                <select
                  value={projectId ?? ''}
                  onChange={(e) => setProjectId(e.target.value || null)}
                  className="w-full rounded-xl border border-border bg-shade/40 p-3 font-mono text-xs font-bold uppercase text-fg"
                >
                  <option value="">Sin Proyecto (Misión Suelta)</option>
                  {projects?.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Textarea de Notas */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe aquí los detalles del hechizo, links o instrucciones..."
                className="h-24 w-full resize-none rounded-xl border border-glass/5 bg-shade/30 p-4 text-sm text-fg outline-none focus:border-accent/30"
              />
            </div>
          </details>

          {error && <p className="font-mono text-xs font-medium text-warn-fg">{error}</p>}
        </div>

        {/* Footer de Acciones Principales */}
        <footer className="flex flex-col gap-3 border-t border-glass/5 bg-shade/20 p-6 md:flex-row md:p-8">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim() || !categoryId || saving}
            className="btn-prime flex-1 rounded-xl py-4 font-display text-sm font-black uppercase tracking-widest disabled:opacity-40"
          >
            <ScrollText className="mr-2 inline h-4 w-4" aria-hidden="true" /> Sellar Decreto
          </button>

          <div className="flex gap-2">
            {isEditing && task && !task.locked && firstFreeSlot !== null && task.hud_slot === null && (
              <button
                type="button"
                onClick={() => {
                  equipToHud.mutate({ taskId: task.id, slot: firstFreeSlot })
                  onClose()
                }}
                className="flex items-center gap-1.5 rounded-xl border border-glass/10 bg-glass/5 px-5 py-4 font-mono text-xs font-black uppercase tracking-widest text-fg hover:bg-glass/10"
              >
                <Swords className="h-4 w-4" /> Equipar
              </button>
            )}

            {isEditing && task && (
              <button
                type="button"
                onClick={() => {
                  if (!window.confirm('¿Borrar esta tarea?')) return
                  deleteTask.mutate(task.id)
                  onClose()
                }}
                className="rounded-xl border border-red-900/30 bg-red-950/20 px-5 py-4 text-red-500 hover:bg-red-900/40"
                title="Descartar Misión"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  )
}
