import { useState, type FormEvent } from 'react'
import { Check, Link2, Undo2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useCategories } from '@/features/projects/hooks'
import {
  useCompleteTask,
  useCreateTask,
  useDeleteTask,
  useReopenTask,
  useSubtasks,
  useUpdateTask,
} from '@/features/tasks/hooks'
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
import type { Task, TaskSize } from '@/types/database.types'

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

const SIZE_OPTIONS: { value: TaskSize; label: string; xp: number }[] = [
  { value: 'small', label: 'Pequeña', xp: 10 },
  { value: 'medium', label: 'Mediana', xp: 25 },
  { value: 'large', label: 'Grande', xp: 50 },
]

export function TaskModal({
  task,
  defaultProjectId,
  defaultKanbanColumnId,
  defaultCategoryId,
  onClose,
}: {
  task: Task | null
  defaultProjectId: string | null
  defaultKanbanColumnId: string
  defaultCategoryId?: string | null
  onClose: () => void
}) {
  const { data: categories } = useCategories()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()
  const completeTask = useCompleteTask()
  const reopenTask = useReopenTask()
  const { data: subtasks } = useSubtasks(task?.id ?? null)
  const { data: todayQuests } = useTodayQuests()
  const setTodayPriority = useSetTodayPriority()
  const clearTodayPriority = useClearTodayPriority()
  const { data: existingFollowUp } = useFollowUpForTask(task?.id ?? null)
  const sendToFollowUp = useSendToFollowUp()
  const deleteFollowUp = useDeleteFollowUp()
  const registerContact = useRegisterFollowUpContact()

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [categoryId, setCategoryId] = useState(task?.category_id ?? defaultCategoryId ?? '')
  const [deadline, setDeadline] = useState(toDatetimeLocalValue(task?.deadline ?? null))
  const [size, setSize] = useState<TaskSize | null>(task?.size ?? null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showFollowUpForm, setShowFollowUpForm] = useState(false)
  const [followUpIntervalDays, setFollowUpIntervalDays] = useState(DEFAULT_FOLLOW_UP_INTERVAL_DAYS)
  const [followUpStakeholder, setFollowUpStakeholder] = useState('')

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

  const priorityQuest = todayQuests?.find((q) => q.type === 'daily_priority')
  const isTodayPriority = !!task && priorityQuest?.task_id === task.id
  const canBePriority = !!task && task.parent_task_id === null

  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [newSubtaskDeadline, setNewSubtaskDeadline] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || !deadline) {
      setError('Título y deadline son obligatorios.')
      return
    }
    setError(null)
    setSaving(true)
    try {
      if (task) {
        await updateTask.mutateAsync({
          id: task.id,
          patch: {
            title: title.trim(),
            description: description.trim() || null,
            category_id: categoryId || null,
            deadline: fromDatetimeLocalValue(deadline),
            size,
          },
        })
      } else {
        await createTask.mutateAsync({
          title: title.trim(),
          description: description.trim() || null,
          category_id: categoryId || null,
          deadline: fromDatetimeLocalValue(deadline),
          project_id: defaultProjectId,
          kanban_column_id: defaultKanbanColumnId,
          size,
        })
      }

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar.')
    } finally {
      setSaving(false)
    }
  }

  async function handleAddSubtask(event: FormEvent) {
    event.preventDefault()
    if (!task || !newSubtaskTitle.trim() || !newSubtaskDeadline) return
    try {
      await createTask.mutateAsync({
        title: newSubtaskTitle.trim(),
        parent_task_id: task.id,
        project_id: task.project_id,
        deadline: fromDatetimeLocalValue(newSubtaskDeadline),
      })
      setNewSubtaskTitle('')
      setNewSubtaskDeadline('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la subtarea.')
    }
  }

  function handleDelete() {
    if (!task) return
    if (!window.confirm('¿Borrar esta tarea?')) return
    deleteTask.mutate(task.id)
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold tracking-tight text-fg">
          {task ? 'Editar tarea' : 'Nueva tarea'}
        </h2>
        {task &&
          (task.status === 'done' ? (
            <button
              type="button"
              onClick={handleReopen}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              <Undo2 className="h-4 w-4" /> Reabrir
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-accent-fg transition-all duration-150 hover:shadow-[0_0_18px_rgba(217,169,74,0.45)] active:scale-95"
            >
              <Check className="h-4 w-4" /> Completar
            </button>
          ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          autoFocus
          className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          rows={2}
          className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
        />
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
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="flex-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSize(size === opt.value ? null : opt.value)}
                title={`+${opt.xp} XP`}
                className={`rounded-md border px-2 py-1 font-mono text-xs transition-all duration-150 active:scale-95 ${
                  size === opt.value
                    ? 'border-accent bg-accent text-accent-fg shadow-[0_0_12px_rgba(217,169,74,0.35)]'
                    : 'border-border text-fg-muted hover:bg-surface-2'
                }`}
              >
                {opt.label} <span className="opacity-60">+{opt.xp}</span>
              </button>
            ))}
          </div>

          {canBePriority && task && (
            <button
              type="button"
              onClick={() =>
                isTodayPriority ? clearTodayPriority.mutate() : setTodayPriority.mutate(task.id)
              }
              title="Prioridad de hoy"
              className={`text-lg leading-none transition-all duration-150 hover:scale-110 active:scale-95 ${
                isTodayPriority ? 'text-accent drop-shadow-[0_0_6px_rgba(217,169,74,0.6)]' : 'text-fg-muted/40 hover:text-accent/60'
              }`}
            >
              {isTodayPriority ? '★' : '☆'}
            </button>
          )}
        </div>

        {task && task.status !== 'follow_up' && task.status !== 'done' && (
          <div className="rounded-md border border-border p-2">
            {showFollowUpForm ? (
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs text-fg-muted">
                    Cada
                    <input
                      type="number"
                      min={1}
                      value={followUpIntervalDays}
                      onChange={(e) => setFollowUpIntervalDays(Number(e.target.value) || 1)}
                      className="w-14 rounded border border-border bg-surface-2 px-1.5 py-1 font-mono text-sm text-fg"
                    />
                    días
                  </label>
                  <input
                    value={followUpStakeholder}
                    onChange={(e) => setFollowUpStakeholder(e.target.value)}
                    placeholder="Nombre del stakeholder (opcional)"
                    className="flex-1 rounded border border-border bg-surface-2 px-2 py-1 text-sm text-fg"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmFollowUp}
                    className="rounded-md bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-500 transition-colors hover:bg-sky-500/25"
                  >
                    Confirmar seguimiento
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFollowUpForm(false)}
                    className="rounded-md px-3 py-1 text-xs text-fg-muted hover:bg-surface-2"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowFollowUpForm(true)}
                className="flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-sky-500"
              >
                <Link2 className="h-3.5 w-3.5" /> Enviar a Follow-up
              </button>
            )}
          </div>
        )}

        {existingFollowUp && (
          <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2">
            <p className="flex items-center gap-1.5 text-sm text-fg">
              <Link2 className="h-3.5 w-3.5 text-sky-500" />
              En seguimiento
              {existingFollowUp.stakeholder_name ? ` con ${existingFollowUp.stakeholder_name}` : ''} · cada{' '}
              {existingFollowUp.interval_days} días
            </p>
            <div className="mt-1.5 flex items-center justify-between text-xs text-fg-muted">
              <span className="font-mono">
                Próximo recordatorio:{' '}
                {toDatetimeLocalValue(existingFollowUp.next_reminder_at).slice(0, 10)}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancelFollowUp}
                  className="rounded border border-border px-2 py-0.5 text-fg-muted transition-colors hover:bg-surface-2"
                >
                  Cancelar seguimiento
                </button>
                <button
                  type="button"
                  onClick={() => registerContact.mutate(existingFollowUp.id)}
                  className="rounded border border-border px-2 py-0.5 text-fg-muted transition-colors hover:bg-surface-2"
                >
                  Registrar contacto ahora
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-warn-fg">{error}</p>}

        <div className="mt-1 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_4px_20px_rgba(217,169,74,0.4)] active:scale-[0.98] disabled:opacity-60 disabled:hover:shadow-none"
          >
            Guardar
          </button>
          {task && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-warn-fg"
            >
              Borrar
            </button>
          )}
        </div>
      </form>

      {task && (
        <div className="mt-5 border-t border-border pt-4">
          <h3 className="text-sm font-medium text-fg-muted">Subtareas</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {subtasks?.map((subtask) => (
              <li key={subtask.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={subtask.status === 'done'}
                  onChange={(e) =>
                    updateTask.mutate({
                      id: subtask.id,
                      patch: { status: e.target.checked ? 'done' : 'pending' },
                    })
                  }
                  className="accent-accent"
                />
                <span
                  className={subtask.status === 'done' ? 'flex-1 text-fg-muted line-through' : 'flex-1 text-fg'}
                >
                  {subtask.title}
                </span>
                {subtask.deadline && (
                  <span className="font-mono text-xs text-fg-muted">
                    {toDatetimeLocalValue(subtask.deadline).slice(0, 10)}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => deleteTask.mutate(subtask.id)}
                  className="text-fg-muted hover:text-fg"
                  aria-label="Borrar subtarea"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddSubtask} className="mt-2 flex gap-2">
            <input
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              placeholder="Nueva subtarea"
              className="flex-1 rounded-md border border-border bg-surface-2 px-2 py-1 text-sm text-fg outline-none focus:border-accent"
            />
            <input
              type="datetime-local"
              value={newSubtaskDeadline}
              onChange={(e) => setNewSubtaskDeadline(e.target.value)}
              className="rounded-md border border-border bg-surface-2 px-2 py-1 text-sm text-fg outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="rounded-md border border-border px-2 py-1 text-sm text-fg-muted hover:bg-surface-2"
            >
              +
            </button>
          </form>
        </div>
      )}
    </Modal>
  )
}
