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
        <h1 className="font-display text-lg font-semibold tracking-tight text-fg">Inbox</h1>
        {!online && (
          <span className="flex items-center gap-1 rounded-full bg-warn-bg px-2 py-0.5 text-xs text-warn-fg">
            <WifiOff className="h-3 w-3" /> sin conexión — se guarda igual
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-fg-muted">
        Escribí y enter. Sin categoría, sin proyecto, sin fecha — eso se define después en{' '}
        <Link to="/triage" className="text-accent underline underline-offset-2">
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
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-fg outline-none focus:border-accent"
        />
        {dictation.supported && (
          <button
            type="button"
            onClick={() => (dictation.listening ? dictation.stop() : dictation.start())}
            title={dictation.listening ? 'Detener dictado' : 'Dictar por voz'}
            className={`shrink-0 rounded-md border px-3 transition-all duration-150 active:scale-95 ${
              dictation.listening
                ? 'border-accent/40 bg-accent/10 text-accent shadow-[0_0_12px_rgba(217,169,74,0.3)] animate-pulse'
                : 'border-border text-fg-muted hover:bg-surface-2'
            }`}
          >
            {dictation.listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        )}
      </form>

      <div className="mt-6">
        {isLoading && <p className="text-sm text-fg-muted">Cargando…</p>}
        {items && items.length === 0 && <p className="text-sm text-fg-muted">Inbox vacío.</p>}
        {items && items.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-all duration-150 hover:border-accent/30"
              >
                <span className="text-fg">
                  {item.title}
                  {item.id.startsWith('optimistic-') && (
                    <span className="ml-2 text-xs text-fg-muted">pendiente de sincronizar</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => deleteTask.mutate(item.id)}
                  className="shrink-0 text-fg-muted hover:text-fg"
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
