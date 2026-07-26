import { useState } from 'react'
import { format } from 'date-fns'
import { X } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useEquipHudSlot, useEquippableTasks } from '@/features/battle-hud/hooks'

export function GrimorioDrawer({ slot, onClose }: { slot: number; onClose: () => void }) {
  const { data: tasks, isLoading } = useEquippableTasks()
  const { data: categories } = useCategories()
  const equip = useEquipHudSlot()
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  const filtered = tasks?.filter((t) => !activeCategoryId || t.category_id === activeCategoryId)

  function handleEquip(taskId: string) {
    equip.mutate({ taskId, slot }, { onSuccess: onClose })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-panel flex h-full w-full max-w-sm flex-col border-l border-border bg-surface p-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold tracking-tight text-fg">
            Grimorio — Slot {slot}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-fg-muted transition-colors hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 text-sm text-fg-muted">Elegí una misión del backlog para equipar.</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveCategoryId(null)}
            className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
              !activeCategoryId ? 'border-transparent bg-accent/15 text-accent' : 'border-border text-fg-muted'
            }`}
          >
            Todas
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                activeCategoryId === cat.id ? 'border-transparent text-fg' : 'border-border text-fg-muted/60'
              }`}
              style={activeCategoryId === cat.id ? { backgroundColor: `${cat.color_hex}22` } : undefined}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">
          {isLoading && <p className="text-sm text-fg-muted">Cargando…</p>}
          {!isLoading && (!filtered || filtered.length === 0) && (
            <p className="text-sm text-fg-muted">No hay misiones disponibles para equipar.</p>
          )}
          {filtered && filtered.length > 0 && (
            <ul className="flex flex-col gap-2">
              {filtered.map((task) => {
                const category = categories?.find((c) => c.id === task.category_id)
                return (
                  <li key={task.id}>
                    <button
                      type="button"
                      onClick={() => handleEquip(task.id)}
                      className="flex w-full items-center gap-2 rounded-md border border-border bg-surface-2 p-2.5 text-left text-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/40"
                      style={category ? { borderLeftWidth: '3px', borderLeftColor: category.color_hex } : undefined}
                    >
                      <span className="min-w-0 flex-1 truncate text-fg">{task.title}</span>
                      {task.deadline && (
                        <span className="shrink-0 font-mono text-xs text-fg-muted">
                          {format(new Date(task.deadline), 'd MMM')}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
