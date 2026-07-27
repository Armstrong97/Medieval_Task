import { useState } from 'react'
import { MoreVertical, PictureInPicture2, Swords } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask, useSubtasks } from '@/features/tasks/hooks'
import { useFocusFloat } from '@/features/tasks/FocusFloatContext'
import { useSendToFollowUp } from '@/features/followups/hooks'
import { useUnequipHudSlot } from '@/features/battle-hud/hooks'
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { Task, TaskSize } from '@/types/database.types'

const DIFFICULTY_LABEL: Record<TaskSize, { label: string; xp: number }> = {
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
  const [animatingKill, setAnimatingKill] = useState(false)
  const [shaking, setShaking] = useState(false)

  const category = categories?.find((c) => c.id === task.category_id)
  const difficulty = task.size ? DIFFICULTY_LABEL[task.size] : null

  const hasSubtasks = !!subtasks && subtasks.length > 0
  const hpTotal = hasSubtasks ? subtasks!.length : 1
  const hpCurrent = hasSubtasks ? subtasks!.filter((s) => s.status !== 'done').length : 1
  const hpPercent = Math.round((hpCurrent / hpTotal) * 100)

  // Secuencia de animación táctil TDAH al asestar golpe final
  function handleGolpeFinal() {
    setShaking(true)
    setTimeout(() => {
      setShaking(false)
      setAnimatingKill(true)
      setTimeout(() => {
        completeTask.mutate({ id: task.id, project_id: task.project_id })
      }, 550)
    }, 280)
  }

  const categoryColor = category?.color_hex ?? '#d9a94a'

  return (
    <article
      className={`combat-card group flex h-[420px] flex-col rounded-2xl p-6 ${
        shaking ? 'shake-anim' : ''
      } ${animatingKill ? 'animate-kill' : ''}`}
      style={
        {
          '--card-theme': categoryColor,
          '--card-glow': `${categoryColor}33`,
        } as React.CSSProperties
      }
    >
      {/* Header de Categoria e Insignia de Arma */}
      <div className="mb-4 flex items-start justify-between">
        <span
          className="rounded border px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-widest"
          style={{
            backgroundColor: `${categoryColor}20`,
            color: categoryColor,
            borderColor: `${categoryColor}40`,
          }}
        >
          {category?.name ?? 'Misión'}
        </span>
        {task.size && (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-black/40 shadow-inner"
            title={`${difficulty?.label} (${difficulty?.xp} XP)`}
          >
            <img
              src={WEAPON_ICONS[task.size]}
              alt={difficulty?.label}
              className="h-6 w-6 object-contain drop-shadow-[0_0_4px_rgba(217,169,74,0.4)]"
            />
          </div>
        )}
      </div>

      {/* Cuerpo Principal: Titulo & HP */}
      <div className="flex-1">
        <button
          type="button"
          onClick={() => onOpenTask(task)}
          className="w-full text-left"
        >
          <h2 className="mb-2 font-display text-2xl font-bold leading-tight text-fg transition-colors group-hover:text-accent">
            {task.title}
          </h2>
        </button>
        <p className="mb-6 font-mono text-xs text-fg-muted/70">
          {hasSubtasks
            ? `Submisiones: ${hpTotal - hpCurrent} / ${hpTotal}`
            : 'Misión Directa'}
        </p>

        {/* Barra de HP Segmentada */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between font-mono text-[10px] uppercase text-fg-muted">
            <span>Integridad del Enemigo</span>
            <span className={hpCurrent === 0 ? 'text-red-500 font-bold' : ''}>
              {hpPercent}%
            </span>
          </div>
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${Math.max(hpTotal, 1)}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: hpTotal }).map((_, i) => (
              <div
                key={i}
                className={`hp-segment ${i < hpCurrent ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Acciones de Combate en el Pie */}
      <div className="space-y-3 pt-2">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => void openFocusFloat()}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest text-fg-muted transition-all hover:bg-white/10 hover:text-fg active:scale-95"
          >
            <PictureInPicture2 className="h-3.5 w-3.5" /> Atacar
          </button>
          <button
            type="button"
            onClick={handleGolpeFinal}
            className="btn-prime flex items-center justify-center gap-1.5 rounded-lg py-2.5 font-mono text-[10px] font-black uppercase tracking-widest"
          >
            <Swords className="h-3.5 w-3.5" /> Golpe Final
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="w-full py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-fg-muted/50 transition-opacity hover:text-fg"
          >
            <MoreVertical className="mr-1 inline h-3 w-3" /> Retirada Táctica
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="modal-panel absolute bottom-full right-0 z-50 mb-2 w-52 rounded-xl border border-border bg-surface p-1.5 shadow-2xl">
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
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-mono text-xs text-fg-muted transition-colors hover:bg-surface-2 hover:text-sky-400"
                >
                  Mover a Follow-up
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    unequip.mutate(task.id)
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-mono text-xs text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  Devolver al Grimorio
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
