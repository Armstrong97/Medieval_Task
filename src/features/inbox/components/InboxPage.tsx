import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCreateTask, useDeleteTask, useInboxTasks } from '@/features/tasks/hooks'

export function InboxPage() {
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: items, isLoading } = useInboxTasks()
  const createTask = useCreateTask()
  const deleteTask = useDeleteTask()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    createTask.mutate(
      { title: trimmed },
      {
        onSuccess: () => {
          setTitle('')
          inputRef.current?.focus()
        },
      },
    )
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Inbox</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Escribí y enter. Sin categoría, sin proyecto, sin fecha — eso se define después en{' '}
        <Link to="/triage" className="underline underline-offset-2">
          Triage
        </Link>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          ref={inputRef}
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Qué se te ocurrió?"
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
      </form>

      <div className="mt-6">
        {isLoading && (
          <p className="text-sm text-neutral-400 dark:text-neutral-500">Cargando…</p>
        )}
        {items && items.length === 0 && (
          <p className="text-sm text-neutral-400 dark:text-neutral-500">Inbox vacío.</p>
        )}
        {items && items.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800"
              >
                <span className="text-neutral-800 dark:text-neutral-200">{item.title}</span>
                <button
                  type="button"
                  onClick={() => deleteTask.mutate(item.id)}
                  className="shrink-0 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
                  aria-label="Descartar"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
