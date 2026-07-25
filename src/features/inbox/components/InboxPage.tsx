import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mic, Square, WifiOff } from 'lucide-react'
import { useCaptureInboxTask, useDeleteTask, useInboxTasks } from '@/features/tasks/hooks'
import { useOnlineStatus } from '@/utils/useOnlineStatus'
import { useSpeechDictation } from '@/utils/useSpeechDictation'

export function InboxPage() {
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: items, isLoading } = useInboxTasks()
  const captureTask = useCaptureInboxTask()
  const deleteTask = useDeleteTask()
  const online = useOnlineStatus()
  const dictation = useSpeechDictation((text) => {
    setTitle((current) => (current ? `${current} ${text}` : text))
    inputRef.current?.focus()
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    captureTask.mutate(trimmed, {
      onSuccess: () => {
        setTitle('')
        inputRef.current?.focus()
      },
    })
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Inbox</h1>
        {!online && (
          <span className="flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
            <WifiOff className="h-3 w-3" /> sin conexión — se guarda igual
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Escribí y enter. Sin categoría, sin proyecto, sin fecha — eso se define después en{' '}
        <Link to="/triage" className="underline underline-offset-2">
          Triage
        </Link>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Qué se te ocurrió?"
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {dictation.supported && (
          <button
            type="button"
            onClick={() => (dictation.listening ? dictation.stop() : dictation.start())}
            title={dictation.listening ? 'Detener dictado' : 'Dictar por voz'}
            className={`shrink-0 rounded-md border px-3 ${
              dictation.listening
                ? 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300'
                : 'border-neutral-300 text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900'
            }`}
          >
            {dictation.listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        )}
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
                <span className="text-neutral-800 dark:text-neutral-200">
                  {item.title}
                  {item.id.startsWith('optimistic-') && (
                    <span className="ml-2 text-xs text-neutral-400 dark:text-neutral-500">
                      pendiente de sincronizar
                    </span>
                  )}
                </span>
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
