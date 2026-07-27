import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mic, Square, Trash2, WifiOff } from 'lucide-react'
import { useCaptureInboxTask, useDeleteTask, useInboxTasks } from '@/features/tasks/hooks'
import { useOnlineStatus } from '@/utils/useOnlineStatus'
import { useSpeechDictation } from '@/utils/useSpeechDictation'
import { InboxEmptyState, InboxTopBar } from '@/features/inbox/components/InboxDashboard'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

export function InboxPage() {
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: items, isLoading } = useInboxTasks()
  const captureTask = useCaptureInboxTask()
  const deleteTask = useDeleteTask()
  const online = useOnlineStatus()
  const [editingTask, setEditingTask] = useState<Task | null>(null)

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
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      {/* Indicadores Superiores */}
      <InboxTopBar onOpenTask={setEditingTask} />

      {/* Header Titular */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 font-display text-3xl font-black uppercase tracking-widest text-accent md:text-4xl">
          INBOX — PERGAMINO DE CAPTURA
        </h1>
        <p className="mx-auto max-w-lg text-sm text-fg-muted/70">
          Escribe o dicta libremente. Sin categorías ni fechas — eso se define después en{' '}
          <Link to="/triage" className="text-accent underline underline-offset-2">
            Estrategia
          </Link>
          .
        </p>
      </header>

      {/* Caja de Captura Fricción Cero (Sticky Input) */}
      <section className="sticky top-20 z-30 mb-10">
        <form onSubmit={handleSubmit} className="input-parchment-inbox flex items-center gap-3 rounded-2xl p-2 backdrop-blur-md">
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={dictation.listening ? 'Escuchando tus órdenes...' : '¿Qué nueva misión ha surgido?'}
            className="flex-1 border-none bg-transparent px-4 py-3 text-base text-fg outline-none placeholder:text-fg-muted/40 md:text-lg"
          />

          <div className="flex items-center gap-2 pr-1">
            {dictation.supported && (
              <button
                type="button"
                onClick={() => (dictation.listening ? dictation.stop() : dictation.start())}
                title={dictation.listening ? 'Detener dictado' : 'Dictar por voz'}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                  dictation.listening
                    ? 'pulse-recording bg-red-500/20 text-red-400'
                    : 'bg-white/5 text-fg-muted hover:bg-white/10 hover:text-fg'
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

        <div className="mt-2.5 flex justify-between px-3">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-fg-muted/50">
            <span className={`h-1.5 w-1.5 rounded-full ${online ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {online ? 'Conexión Estable' : 'Modo Offline Resiliente'}
          </span>
          {!online && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400">
              <WifiOff className="mr-1 inline h-3 w-3" /> Guarda localmente
            </span>
          )}
        </div>
      </section>

      {/* Lista de Capturas Pendientes */}
      <section className="mb-12 space-y-3">
        {isLoading && (
          <p className="py-6 text-center font-mono text-xs text-fg-muted">
            Cargando pergaminos...
          </p>
        )}

        {items && items.length > 0 && (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="inbox-item-card group flex items-center justify-between rounded-xl p-4 transition-all hover:border-accent"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <span className="text-lg opacity-40 transition-opacity group-hover:opacity-100 group-hover:text-accent">
                    📜
                  </span>
                  <p className="truncate font-medium text-fg">{item.title}</p>
                  {item.id.startsWith('optimistic-') && (
                    <span className="font-mono text-[10px] text-fg-muted/50">
                      (sincronizando...)
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => deleteTask.mutate(item.id)}
                  aria-label="Descartar captura"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-fg-muted/40 transition-all hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {items && items.length === 0 && !isLoading && (
          <InboxEmptyState onOpenTask={setEditingTask} />
        )}
      </section>

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
