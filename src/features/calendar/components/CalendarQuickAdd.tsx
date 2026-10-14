import { useEffect, useRef, useState, type FormEvent } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { X } from 'lucide-react'
import { showToast } from '@/components/ui/toast-store'
import { fetchFirstColumnId } from '@/features/kanban/api'
import { useCategories } from '@/features/projects/hooks'
import { useCreateTask } from '@/features/tasks/hooks'
import { WeaponSelector } from '@/features/triage/components/WeaponSelector'
import type { TaskSize } from '@/types/database.types'

// Hora por defecto de una misión creada desde el calendario: 18:00; si ya pasó
// (hoy), 23:00 para que no nazca ya "por rescatar".
function defaultDeadline(day: Date): Date {
  const d = new Date(day)
  d.setHours(18, 0, 0, 0)
  if (d.getTime() <= Date.now()) d.setHours(23, 0, 0, 0)
  return d
}

function lastTriageCategory(): string {
  try {
    const raw = localStorage.getItem('questly_triage_last')
    if (raw) return (JSON.parse(raw) as { categoryId?: string }).categoryId ?? ''
  } catch {
    // sin recuerdo
  }
  return ''
}

/** Alta rápida de una misión ya ordenada (clase + arma) para un día concreto. */
export function CalendarQuickAdd({ day, onClose }: { day: Date; onClose: () => void }) {
  const { data: categories } = useCategories()
  const createTask = useCreateTask()
  const inputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState(lastTriageCategory)
  const [size, setSize] = useState<TaskSize | null>(null)
  const [showErrors, setShowErrors] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    inputRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const missing = [!title.trim() && 'título', !categoryId && 'clase', !size && 'arma'].filter(Boolean) as string[]

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (missing.length > 0) {
      setShowErrors(true)
      return
    }
    setSaving(true)
    try {
      const kanbanColumnId = await fetchFirstColumnId(null)
      await createTask.mutateAsync({
        title: title.trim(),
        category_id: categoryId,
        size,
        kanban_column_id: kanbanColumnId,
        deadline: defaultDeadline(day).toISOString(),
      })
      showToast({ title: 'Misión añadida', detail: format(day, "d 'de' MMMM", { locale: es }) })
      onClose()
    } catch {
      setSaving(false)
      showToast({ title: 'No se pudo añadir', detail: 'Inténtalo de nuevo.' })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-shade/50 p-4 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="modal-panel panel-rune w-full max-w-md space-y-4 rounded-2xl border border-border bg-surface p-5"
      >
        <header className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-accent">Nueva misión</h2>
            <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
              {format(day, "EEEE d 'de' MMMM", { locale: es })}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="flex h-11 w-11 items-center justify-center rounded-lg text-fg-muted hover:text-fg">
            <X className="h-5 w-5" />
          </button>
        </header>

        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Qué hay que hacer ese día?"
          aria-label="Título de la misión"
          className="input-parchment w-full rounded-xl px-4 py-3 text-base text-fg"
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          aria-label="Clase"
          className="parchment-select w-full rounded-xl p-3 text-base"
        >
          <option value="" disabled>Elegir clase</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>{c.name} ({c.class_name})</option>
          ))}
        </select>

        <WeaponSelector value={size} onChange={setSize} />

        {showErrors && missing.length > 0 && (
          <p role="alert" className="rounded-lg border border-warn-border bg-warn-bg px-3 py-2 font-mono text-xs font-medium text-warn-fg">
            Falta: {missing.join(', ')}.
          </p>
        )}

        <button type="submit" disabled={saving} className="btn-prime w-full rounded-xl py-3.5 font-display text-sm font-black uppercase tracking-widest disabled:opacity-50">
          Añadir al día
        </button>
      </form>
    </div>
  )
}
