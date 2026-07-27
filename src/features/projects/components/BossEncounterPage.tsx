import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Swords } from 'lucide-react'
import { useBossStats, useCategories, useClaimBossPhase, useProjectById } from '@/features/projects/hooks'
import { useTasksByProject } from '@/features/tasks/hooks'
import { useEquipHudSlot, useHudTasks } from '@/features/battle-hud/hooks'
import { BOSS_PHASES } from '@/features/projects/api'
import { BossHealthBar } from '@/features/projects/components/BossHealthBar'
import { PhaseRewardModal } from '@/features/projects/components/PhaseRewardModal'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { bossAvatarSrc } from '@/utils/rpgAssets'
import type { Task } from '@/types/database.types'

export function BossEncounterPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const id = projectId as string

  const { data: project } = useProjectById(id)
  const { data: categories } = useCategories()
  const { data: tasks } = useTasksByProject(id)
  const stats = useBossStats(id)
  const claimPhase = useClaimBossPhase()
  const { data: hudTasks } = useHudTasks()
  const equipToHud = useEquipHudSlot()

  const [rewardModal, setRewardModal] = useState<{ phase: number; xp: number } | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const category = categories?.find((c) => c.id === project?.category_id)
  const occupiedSlots = new Set((hudTasks ?? []).map((t) => t.hud_slot))
  const firstFreeSlot = [1, 2, 3].find((s) => !occupiedSlots.has(s))
  const missions = (tasks ?? []).filter((t) => t.status === 'pending' || t.status === 'in_progress')

  useEffect(() => {
    if (!project || !stats || claimPhase.isPending) return
    const toClaim = BOSS_PHASES.find(
      (phase) => !project.phases_claimed.includes(phase) && stats.percentRemaining <= phase,
    )
    if (toClaim !== undefined) {
      claimPhase.mutate(
        { projectId: id, phase: toClaim },
        { onSuccess: () => setRewardModal({ phase: toClaim, xp: toClaim === 0 ? 200 : 50 }) },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, stats])

  if (!project || !stats) {
    return <p className="p-6 text-sm text-fg-muted">Cargando…</p>
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Link
        to="/kanban"
        className="flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver al Grimorio
      </Link>

      <div className="mt-4 flex items-start gap-3">
        <img
          src={bossAvatarSrc(project.boss_avatar)}
          alt={project.boss_title}
          className="h-16 w-16 shrink-0 rounded-full object-cover shadow-[0_0_16px_rgba(0,0,0,0.3)]"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-fg-muted">{project.name}</p>
          <h1 className="font-display text-xl font-bold tracking-wide text-fg">{project.boss_title}</h1>
        </div>
        {category && (
          <span
            className="shrink-0 rounded-full px-2 py-1 text-xs font-medium"
            style={{ backgroundColor: `${category.color_hex}22`, color: category.color_hex }}
          >
            {category.name}
          </span>
        )}
      </div>

      <div className="mt-5 rounded-lg border border-border-card bg-surface-card p-4">
        <BossHealthBar
          totalHp={stats.totalHp}
          currentHp={stats.currentHp}
          percentRemaining={stats.percentRemaining}
          phasesClaimed={project.phases_claimed}
        />
      </div>

      <section className="mt-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-fg-muted">
          Misiones del combate
        </h2>
        {missions.length === 0 ? (
          <p className="mt-2 text-sm text-fg-muted">No hay misiones activas en este proyecto.</p>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {missions.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 rounded-md border border-border bg-surface p-2.5 text-sm"
              >
                <button
                  type="button"
                  onClick={() => setEditingTask(task)}
                  className="min-w-0 flex-1 truncate text-left text-fg"
                >
                  {task.title}
                </button>
                <button
                  type="button"
                  disabled={!firstFreeSlot || task.hud_slot !== null}
                  onClick={() => firstFreeSlot && equipToHud.mutate({ taskId: task.id, slot: firstFreeSlot })}
                  title={
                    task.hud_slot !== null
                      ? 'Ya está equipada en el HUD'
                      : firstFreeSlot
                        ? `Equipar en Slot ${firstFreeSlot}`
                        : 'Los 3 slots de combate están ocupados'
                  }
                  className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-fg-muted transition-all duration-150 hover:border-accent/40 hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-fg-muted"
                >
                  <Swords className="h-3.5 w-3.5" />
                  {task.hud_slot !== null ? 'En HUD' : 'Equipar'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {rewardModal && (
        <PhaseRewardModal
          phase={rewardModal.phase}
          xp={rewardModal.xp}
          onDone={() => setRewardModal(null)}
        />
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
