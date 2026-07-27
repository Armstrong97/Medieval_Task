import { useEffect, useState } from 'react'
import { X, Trash2, Swords, Check, Undo2, Link2 } from 'lucide-react'
import { addDays } from 'date-fns'
import { useCategories, useProjects } from '@/features/projects/hooks'
import {
  useCompleteTask,
  useCreateTask,
  useDeleteTask,
  useReopenTask,
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
  useRegisterFollowUpContact,
  useSendToFollowUp,
} from '@/features/followups/hooks'
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
  const registerContact = useRegisterFollowUpContact()
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
    completeTask.mutate({ id: task.id, project_id: task.project_id })
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
        <header className="flex items-center justify-between gap-3 border-b border-white/5 p-6">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] font-bold text-fg-muted">
            {task?.hud_slot !== null && task?.hud_slot !== undefined
              ? `⚔️ EQUIPADO EN HUD SLOT ${task.hud_slot}`
              : '📜 EN EL GRIMORIO'}
          </span>

          <div className="flex items-center gap-2">
            {isEditing &&
              task &&
              (task.status === 'done' ? (
                <button
                  type="button"
                  onClick={handleReopen}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
                >
                  <Undo2 className="h-3.5 w-3.5" /> Reabrir
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="btn-prime flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-[10px] font-black uppercase tracking-widest"
                >
                  <Check className="h-3.5 w-3.5" /> Completar
                </button>
              ))}
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Cuerpo Principal del Formulario */}
        <div className="space-y-8 p-6 md:p-8">
          {/* Título Principal */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent/70">
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
                <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted/60">
                  Envergadura (Dificultad & XP)
                </p>
                {canBePriority && task && (
                  <button
                    type="button"
                    onClick={() =>
                      isTodayPriority ? clearTodayPriority.mutate() : setTodayPriority.mutate(task.id)
                    }
                    title="Prioridad de hoy"
                    className={`text-base leading-none transition-all duration-150 hover:scale-110 active:scale-95 ${
                      isTodayPriority
                        ? 'text-accent drop-shadow-[0_0_6px_rgba(217,169,74,0.6)]'
                        : 'text-fg-muted/40 hover:text-accent/60'
                    }`}
                  >
                    {isTodayPriority ? '★' : '☆'}
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
                      <span className="font-mono text-[9px] font-black uppercase">{w.xp} XP</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Chips de Plazo Rápidos */}
            <div className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted/60">
                Plazo de Entrega
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setQuickDeadline(0)}
                  className="tactile-chip rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase active-gold"
                >
                  Hoy
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDeadline(1)}
                  className="tactile-chip rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase"
                >
                  Mañana
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDeadline(3)}
                  className="tactile-chip rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase"
                >
                  Finde
                </button>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="tactile-chip rounded-full px-3 py-1.5 font-mono text-[10px] text-fg outline-none"
                />
              </div>
            </div>
          </div>

          {/* Chips de Clase / Ámbitos */}
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted/60">
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
                    className={`tactile-chip rounded-xl px-4 py-2 font-mono text-[10px] font-bold uppercase ${
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
            <div className="space-y-3 rounded-2xl border border-white/5 bg-black/20 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted/60">
                Seguimiento (Follow-up)
              </p>

              {existingFollowUp ? (
                <div className="space-y-2.5">
                  <p className="font-mono text-xs text-fg">
                    En seguimiento
                    {existingFollowUp.stakeholder_name ? ` con ${existingFollowUp.stakeholder_name}` : ''} · cada{' '}
                    {existingFollowUp.interval_days} días
                  </p>
                  <p className="font-mono text-[10px] text-fg-muted/60">
                    Próximo recordatorio: {toDatetimeLocalValue(existingFollowUp.next_reminder_at).slice(0, 10)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleCancelFollowUp}
                      className="tactile-chip rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase"
                    >
                      Cancelar seguimiento
                    </button>
                    <button
                      type="button"
                      onClick={() => registerContact.mutate(existingFollowUp.id)}
                      className="tactile-chip rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase"
                    >
                      Registrar contacto ahora
                    </button>
                  </div>
                </div>
              ) : task.status !== 'follow_up' ? (
                showFollowUpForm ? (
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-1.5 font-mono text-[10px] text-fg-muted">
                        Cada
                        <input
                          type="number"
                          min={1}
                          value={followUpIntervalDays}
                          onChange={(e) => setFollowUpIntervalDays(Number(e.target.value) || 1)}
                          className="w-14 rounded-lg border border-white/10 bg-black/30 px-2 py-1 font-mono text-xs text-fg outline-none focus:border-accent"
                        />
                        días
                      </label>
                      <input
                        value={followUpStakeholder}
                        onChange={(e) => setFollowUpStakeholder(e.target.value)}
                        placeholder="Nombre del stakeholder (opcional)"
                        className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-xs text-fg outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleConfirmFollowUp}
                        className="tactile-chip active-gold rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase"
                      >
                        Confirmar seguimiento
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowFollowUpForm(false)}
                        className="tactile-chip rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowFollowUpForm(true)}
                    className="tactile-chip flex w-fit items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase"
                  >
                    <Link2 className="h-3.5 w-3.5" /> Enviar a Follow-up
                  </button>
                )
              ) : null}
            </div>
          )}

          {/* Micro-Stepping (Submisiones & Integridad HP) */}
          {isEditing && task && (
            <div className="space-y-4 rounded-2xl border border-white/5 bg-black/20 p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted/60">
                  Integridad de la Quest (Submisiones)
                </p>
                <span className="font-mono text-[10px] font-bold text-accent">{hpPercent}%</span>
              </div>

              <div className="quest-hp-track">
                <div className="quest-hp-fill" style={{ width: `${hpPercent}%` }} />
              </div>

              {/* Lista de Submisiones Existentes */}
              <div className="space-y-2 pt-1">
                {subtasks?.map((st) => (
                  <div key={st.id} className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        updateTask.mutate({
                          id: st.id,
                          patch: { status: st.status === 'done' ? 'pending' : 'done' },
                        })
                      }
                      className={`flex h-5 w-5 items-center justify-center rounded border font-mono text-[10px] transition-all ${
                        st.status === 'done' ? 'border-accent bg-accent text-accent-fg' : 'border-white/20'
                      }`}
                    >
                      {st.status === 'done' ? '✓' : ''}
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
                  className="flex-1 rounded-lg border border-dashed border-white/10 bg-transparent px-3 py-2 font-mono text-xs text-fg outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={handleAddSubtask}
                  className="rounded-lg border border-border bg-white/5 px-3 py-2 font-mono text-xs font-bold text-fg hover:bg-white/10"
                >
                  Añadir
                </button>
              </div>
            </div>
          )}

          {/* Acordeón Oculto de Notas y Proyecto Complejo */}
          <details className="group">
            <summary className="flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-fg-muted/40 transition-all hover:text-fg group-open:text-accent">
              <span className="transition-transform group-open:rotate-90">▶</span> 📜 Notas y
              Detalles Arcanos
            </summary>
            <div className="space-y-4 pt-4">
              {/* Selección de Proyecto */}
              <div className="space-y-1">
                <label className="font-mono text-[9px] uppercase text-fg-muted/50">
                  Proyecto Asociado (Mazmorra)
                </label>
                <select
                  value={projectId ?? ''}
                  onChange={(e) => setProjectId(e.target.value || null)}
                  className="w-full rounded-xl border border-border bg-black/40 p-3 font-mono text-xs font-bold uppercase text-fg"
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
                className="h-24 w-full resize-none rounded-xl border border-white/5 bg-black/30 p-4 text-sm text-fg outline-none focus:border-accent/30"
              />
            </div>
          </details>

          {error && <p className="font-mono text-xs font-medium text-warn-fg">{error}</p>}
        </div>

        {/* Footer de Acciones Principales */}
        <footer className="flex flex-col gap-3 border-t border-white/5 bg-black/20 p-6 md:flex-row md:p-8">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim() || !categoryId || saving}
            className="btn-prime flex-1 rounded-xl py-4 font-display text-sm font-black uppercase tracking-widest disabled:opacity-40"
          >
            📜 Sellar Decreto
          </button>

          <div className="flex gap-2">
            {isEditing && task && firstFreeSlot !== null && task.hud_slot === null && (
              <button
                type="button"
                onClick={() => {
                  equipToHud.mutate({ taskId: task.id, slot: firstFreeSlot })
                  onClose()
                }}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-[10px] font-black uppercase tracking-widest text-fg hover:bg-white/10"
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
