import { useState } from 'react'
import { Check, MoreVertical, PictureInPicture2 } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask, useSubtasks } from '@/features/tasks/hooks'
import { useFocusFloat } from '@/features/tasks/FocusFloatContext'
import { useSendToFollowUp } from '@/features/followups/hooks'
import { useUnequipHudSlot } from '@/features/battle-hud/hooks'
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { Task, TaskSize } from '@/types/database.types'

const DIFFICULTY_BADGE: Record<TaskSize, { label: string; xp: number }> = {
  small: { label: 'Daga', xp: 10 },
  medium: { label: 'Espada', xp: 25 },
  large: { label: 'Mandoble', xp: 50 },
}

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

export function CombatSlotCard({
  task,
  onOpenTask,
}: {
  task: Task
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const { data: subtasks } = useSubtasks(task.id)
  const completeTask = useCompleteTask()
  const unequip = useUnequipHudSlot()
  const sendToFollowUp = useSendToFollowUp()
  const { open: openFocusFloat } = useFocusFloat()
  const [menuOpen, setMenuOpen] = useState(false)

  const category = categories?.find((c) => c.id === task.category_id)
  const difficulty = task.size ? DIFFICULTY_BADGE[task.size] : null

  const hasSubtasks = !!subtasks && subtasks.length > 0
  const hpTotal = hasSubtasks ? subtasks!.length : 1
  const hpCurrent = hasSubtasks ? subtasks!.filter((s) => s.status !== 'done').length : 1

  return (
    <div
      className="flex flex-col gap-3 rounded-lg border border-border-card bg-surface-card p-4 shadow-sm"
      style={{
        borderColor: category ? `${category.color_hex}55` : undefined,
        boxShadow: category ? `0 0 16px ${category.color_hex}22` : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenTask(task)}
          className="min-w-0 flex-1 text-left"
        >
          {category && (
            <p className="font-mono text-[11px] uppercase tracking-wide" style={{ color: category.color_hex }}>
              {category.name}
            </p>
          )}
          <p className="mt-0.5 truncate font-display text-base font-semibold text-fg">
            {task.title}
          </p>
        </button>
        {difficulty && task.size && (
          <span
            title={`${difficulty.label} · +${difficulty.xp} XP`}
            className="flex shrink-0 items-center justify-center rounded-full bg-surface-2 p-1.5"
          >
            <img src={WEAPON_ICONS[task.size]} alt={difficulty.label} className="h-5 w-5 object-contain" />
          </span>
        )}
      </div>

      <div>
        <div className="flex gap-0.5">
          {Array.from({ length: hpTotal }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-sm transition-colors ${
                i < hpCurrent ? 'bg-red-500' : 'bg-surface-2'
              }`}
            />
          ))}
        </div>
        <p className="mt-1 font-mono text-[11px] text-fg-muted">
          {hasSubtasks ? `${hpCurrent}/${hpTotal} subtareas restantes` : 'Sin subtareas'}
        </p>
      </div>

      <div className="mt-1 flex items-center gap-1.5 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => void openFocusFloat()}
          title="Atacar / Entrar en foco"
          className="flex items-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs text-fg-muted transition-all duration-150 hover:border-accent/40 hover:text-accent active:scale-95"
        >
          <PictureInPicture2 className="h-3.5 w-3.5" /> Atacar
        </button>
        <button
          type="button"
          onClick={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
          title="Asestar golpe final"
          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-accent px-2 py-1.5 text-xs font-semibold text-accent-fg transition-all duration-150 hover:shadow-[0_0_14px_rgba(217,169,74,0.45)] active:scale-95"
        >
          <Check className="h-3.5 w-3.5" /> Golpe final
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            title="Retirada táctica"
            aria-label="Retirada táctica"
            className="flex items-center rounded-md border border-border p-1.5 text-fg-muted transition-colors hover:text-fg"
          >
            <MoreVertical className="h-3.5 w-3.5" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="modal-panel absolute right-0 bottom-full z-50 mb-2 w-48 rounded-lg border border-border bg-surface p-1 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    sendToFollowUp.mutate({
                      taskId: task.id,
                      intervalDays: DEFAULT_FOLLOW_UP_INTERVAL_DAYS,
                      stakeholderName: null,
                    })
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-sky-500"
                >
                  Mover a Follow-up
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    unequip.mutate(task.id)
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  Devolver al Grimorio
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
