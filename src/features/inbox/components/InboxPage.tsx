import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { Mic, Square, Trash2, WifiOff } from 'lucide-react'
import { useCaptureInboxTask, useDeleteTask, useInboxTasks, useUpdateTask } from '@/features/tasks/hooks'
import { useOnlineStatus } from '@/utils/useOnlineStatus'
import { useSpeechDictation } from '@/utils/useSpeechDictation'
import { InboxAlert, InboxEmptyState } from '@/features/inbox/components/InboxDashboard'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

const UNDO_MS = 6000

export function InboxPage() {
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: items, isLoading } = useInboxTasks()
  const captureTask = useCaptureInboxTask()
  const deleteTask = useDeleteTask()
  const updateTask = useUpdateTask()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const online = useOnlineStatus()
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Descartar con deshacer: la captura se oculta al instante y se borra de verdad a los 6 s (o al salir
  // de la pantalla, o si se descarta otra). Si la app se cierra antes, la captura reaparece: sin pérdida.
  const [discarded, setDiscarded] = useState<Task | null>(null)
  const discardedRef = useRef<Task | null>(null)
  const timerRef = useRef<number | undefined>(undefined)
  const deleteRef = useRef(deleteTask.mutate)
  deleteRef.current = deleteTask.mutate
  // Ya borradas de verdad: se siguen ocultando hasta que la lista se recarga (evita que reaparezcan un instante).
  const [gone, setGone] = useState<ReadonlySet<string>>(new Set())

  function commitDiscard() {
    window.clearTimeout(timerRef.current)
    const task = discardedRef.current
    if (task) {
      setGone((s) => new Set(s).add(task.id))
      deleteRef.current(task.id, {
        onError: () =>
          setGone((s) => {
            const next = new Set(s)
            next.delete(task.id)
            return next
          }),
      })
    }
    discardedRef.current = null
    setDiscarded(null)
  }

  function discard(item: Task) {
    if (item.id.startsWith('optimistic-')) return
    commitDiscard()
    discardedRef.current = item
    setDiscarded(item)
    timerRef.current = window.setTimeout(commitDiscard, UNDO_MS)
  }

  function undoDiscard() {
    window.clearTimeout(timerRef.current)
    discardedRef.current = null
    setDiscarded(null)
  }

  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current)
      if (discardedRef.current) deleteRef.current(discardedRef.current.id)
    },
    [],
  )

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

  function startEdit(item: Task) {
    if (item.id.startsWith('optimistic-')) return
    setEditingId(item.id)
    setDraft(item.title)
  }

  function saveEdit(item: Task) {
    const next = draft.trim()
    setEditingId(null)
    if (next && next !== item.title) updateTask.mutate({ id: item.id, patch: { title: next } })
  }

  const visible = items?.filter((i) => i.id !== discarded?.id && !gone.has(i.id))

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <InboxAlert />

      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-widest text-accent md:text-4xl">Inbox</h1>
          <p className="mt-1 text-sm text-fg-muted">
            {visible && visible.length > 0
              ? `${visible.length} ${visible.length === 1 ? 'captura' : 'capturas'} por ordenar`
              : 'Escribe o dicta lo que se te ocurra'}
          </p>
        </div>
        {visible && visible.length > 0 && (
          <Link
            to="/triage"
            className="btn-prime shrink-0 rounded-xl px-4 py-2.5 font-mono text-xs font-black uppercase tracking-widest"
          >
            Ordenar →
          </Link>
        )}
      </header>

      {/* Caja de captura (siempre a la vista) */}
      <section className="sticky top-20 z-30 mb-8">
        <form onSubmit={handleSubmit} className="input-parchment-inbox flex items-center gap-3 rounded-2xl p-2">
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={dictation.listening ? 'Escuchando…' : '¿Qué se te ocurrió?'}
            aria-label="Nueva captura"
            className="flex-1 border-none bg-transparent px-4 py-3 text-base text-fg outline-none placeholder:text-fg-muted md:text-lg"
          />

          <div className="flex items-center gap-2 pr-1">
            {dictation.supported && (
              <button
                type="button"
                onClick={() => (dictation.listening ? dictation.stop() : dictation.start())}
                title={dictation.listening ? 'Detener dictado' : 'Dictar por voz'}
                aria-label={dictation.listening ? 'Detener dictado' : 'Dictar por voz'}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                  dictation.listening
                    ? 'pulse-recording bg-red-500/20 text-red-400'
                    : 'bg-surface-2 text-fg-muted hover:text-fg'
                }`}
              >
                {dictation.listening ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            )}

            <button
              type="submit"
              disabled={!title.trim() || captureTask.isPending}
              className="btn-prime rounded-xl px-5 py-3 font-mono text-xs font-black uppercase tracking-widest disabled:opacity-50"
            >
              Capturar
            </button>
          </div>
        </form>

        {!online && (
          <p className="mt-2 flex items-center gap-1.5 rounded-lg border border-warn-border bg-warn-bg px-3 py-1.5 font-mono text-xs text-warn-fg">
            <WifiOff className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Sin conexión: se guarda en este dispositivo.
          </p>
        )}
      </section>

      {/* Lista de capturas pendientes */}
      <section className="mb-12">
        {isLoading && <p className="py-6 text-center font-mono text-xs text-fg-muted">Cargando…</p>}

        {visible && visible.length > 0 && (
          <ul className="space-y-3">
            {visible.map((item) => (
              <li
                key={item.id}
                className="inbox-item-card group flex items-center justify-between gap-2 rounded-xl p-4 transition-all hover:border-accent"
              >
                <div className="min-w-0 flex-1">
                  {editingId === item.id ? (
                    <input
                      autoFocus
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onBlur={() => saveEdit(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(item)
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                      aria-label="Editar captura"
                      className="input-parchment w-full rounded-lg px-3 py-2 text-fg"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      title="Tocar para corregir"
                      className="block w-full break-words text-left font-medium text-fg"
                    >
                      {item.title}
                    </button>
                  )}
                  <p className="mt-0.5 font-mono text-xs text-fg-muted">
                    {item.id.startsWith('optimistic-')
                      ? 'Guardando…'
                      : formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: es })}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => discard(item)}
                  aria-label="Descartar captura"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-fg-muted transition-all hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {visible && visible.length === 0 && !isLoading && <InboxEmptyState onOpenTask={setEditingTask} />}
      </section>

      {discarded && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 md:bottom-8"
        >
          <div className="flex max-w-md items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-2xl">
            <span className="min-w-0 truncate text-sm text-fg">Descartada: «{discarded.title}»</span>
            <button
              type="button"
              onClick={undoDiscard}
              className="shrink-0 rounded-lg px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-accent hover:bg-surface-2"
            >
              Deshacer
            </button>
          </div>
        </div>
      )}

      {editingTask && (
        <TaskModal
          task={editingTask}
          defaultProjectId={editingTask.project_id}
          defaultKanbanColumnId=""
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
}
