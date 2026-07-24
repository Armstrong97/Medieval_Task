import { useState, type FormEvent } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useCategories } from '@/features/projects/hooks'
import { useCreateTask, useDeleteTask, useSubtasks, useUpdateTask } from '@/features/tasks/hooks'
import {
  useClearTodayPriority,
  useSetTodayPriority,
  useTodayQuests,
} from '@/features/gamification/hooks'
import { fromDatetimeLocalValue, toDatetimeLocalValue } from '@/utils/datetime'
import type { Task, TaskSize } from '@/types/database.types'

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
  const { data: subtasks } = useSubtasks(task?.id ?? null)
  const { data: todayQuests } = useTodayQuests()
  const setTodayPriority = useSetTodayPriority()
  const clearTodayPriority = useClearTodayPriority()

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [categoryId, setCategoryId] = useState(task?.category_id ?? defaultCategoryId ?? '')
  const [deadline, setDeadline] = useState(toDatetimeLocalValue(task?.deadline ?? null))
  const [size, setSize] = useState<TaskSize | null>(task?.size ?? null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

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
      <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
        {task ? 'Editar tarea' : 'Nueva tarea'}
      </h2>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          autoFocus
          className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          rows={2}
          className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        <div className="flex gap-2">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
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
            className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
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
                className={`rounded-md border px-2 py-1 text-xs ${
                  size === opt.value
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                    : 'border-neutral-300 text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900'
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
              className={`text-lg leading-none ${
                isTodayPriority
                  ? 'text-amber-500'
                  : 'text-neutral-300 hover:text-amber-400 dark:text-neutral-600'
              }`}
            >
              {isTodayPriority ? '★' : '☆'}
            </button>
          )}
        </div>

        {error && <p className="text-sm text-amber-700 dark:text-amber-400">{error}</p>}

        <div className="mt-1 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900"
          >
            Guardar
          </button>
          {task && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              Borrar
            </button>
          )}
        </div>
      </form>

      {task && (
        <div className="mt-5 border-t border-neutral-100 pt-4 dark:border-neutral-800">
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Subtareas
          </h3>
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
                />
                <span
                  className={
                    subtask.status === 'done'
                      ? 'flex-1 text-neutral-400 line-through dark:text-neutral-600'
                      : 'flex-1 text-neutral-800 dark:text-neutral-200'
                  }
                >
                  {subtask.title}
                </span>
                {subtask.deadline && (
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    {toDatetimeLocalValue(subtask.deadline).slice(0, 10)}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => deleteTask.mutate(subtask.id)}
                  className="text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
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
              className="flex-1 rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />
            <input
              type="datetime-local"
              value={newSubtaskDeadline}
              onChange={(e) => setNewSubtaskDeadline(e.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />
            <button
              type="submit"
              className="rounded-md border border-neutral-300 px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              +
            </button>
          </form>
        </div>
      )}
    </Modal>
  )
}
