import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import { useCaptureInboxTask } from '@/features/tasks/hooks'

// Captura de fricción cero desde cualquier pantalla (spec 4.1 / sección 6).
// Queda abierto tras capturar para soltar varias ideas seguidas.
export function QuickCaptureFab() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [captured, setCaptured] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const capture = useCaptureInboxTask()

  useEffect(() => {
    if (open) inputRef.current?.focus()
    else setCaptured(0)
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // En el Inbox ya hay una caja de captura permanente.
  if (pathname === '/inbox') return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    capture.mutate(trimmed)
    setTitle('')
    setCaptured((n) => n + 1)
    inputRef.current?.focus()
  }

  return (
    <div
      className="fixed right-4 z-40 flex flex-col items-end gap-3 bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] md:bottom-4"
    >
      {open && (
        <form
          onSubmit={handleSubmit}
          className="modal-panel panel-rune w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-border bg-surface p-3"
        >
          <label htmlFor="quick-capture" className="mb-2 block font-mono text-xs uppercase tracking-widest text-fg-muted">
            Captura rápida
          </label>
          <div className="flex gap-2">
            <input
              id="quick-capture"
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Qué se te ocurrió?"
              className="input-parchment min-w-0 flex-1 rounded-xl px-3 py-3 text-base text-fg"
            />
            <button
              type="submit"
              disabled={!title.trim()}
              className="btn-prime rounded-xl px-4 font-mono text-xs font-black uppercase tracking-widest disabled:opacity-50"
            >
              Guardar
            </button>
          </div>
          <p className="mt-2 font-mono text-xs text-fg-muted">
            {captured > 0
              ? `${captured} capturada${captured > 1 ? 's' : ''} · se ordenan luego en Estrategia`
              : 'Solo escribe. Categoría y fecha se definen después.'}
          </p>
        </form>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar captura rápida' : 'Captura rápida'}
        aria-expanded={open}
        className="btn-prime flex h-14 w-14 items-center justify-center rounded-full shadow-2xl"
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-7 w-7" />}
      </button>
    </div>
  )
}
