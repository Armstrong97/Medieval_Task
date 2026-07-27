import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useBossStats, useCategories, useClaimBossPhase, useProjectById } from '@/features/projects/hooks'
import { useCompleteTask, useTasksByProject } from '@/features/tasks/hooks'
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
  const completeTask = useCompleteTask()

  const [rewardModal, setRewardModal] = useState<{ phase: number; xp: number } | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const category = categories?.find((c) => c.id === project?.category_id)
  const occupiedSlots = new Set((hudTasks ?? []).map((t) => t.hud_slot))
  const firstFreeSlot = [1, 2, 3].find((s) => !occupiedSlots.has(s)) ?? null
  const missions = (tasks ?? []).filter((t) => t.status === 'pending' || t.status === 'in_progress')

  // Evaluar reclamo automático de fases alcanzadas
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
    return <p className="py-12 text-center font-mono text-sm text-fg-muted">Entrando en la mazmorra…</p>
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      {/* Botón de Retorno */}
      <nav className="mb-6">
        <Link
          to="/kanban"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al Grimorio
        </Link>
      </nav>

      {/* Header Perfil del Jefe */}
      <header className="mb-10 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="h-32 w-32 rounded-full border-4 border-border bg-surface-2 p-1 shadow-[0_0_40px_rgba(124,58,237,0.3)]">
            <img
              src={bossAvatarSrc(project.boss_avatar)}
              alt={project.boss_title}
              className="h-full w-full rounded-full object-cover bg-black/40"
            />
          </div>
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-bg px-4 py-0.5 font-mono text-[10px] font-black uppercase tracking-tighter text-fg shadow-lg"
            style={{ backgroundColor: category?.color_hex ?? '#7c3aed' }}
          >
            {category?.name ?? 'Proyecto'} / {category?.class_name ?? 'Clase'}
          </div>
        </div>

        <h1 className="mb-1 font-display text-3xl font-black tracking-widest text-fg drop-shadow-md md:text-4xl">
          {project.boss_title.toUpperCase()}
        </h1>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-accent/80">
          {project.name}
        </p>
      </header>

      {/* Barra de Salud Dinámica */}
      <section className="mb-12">
        <BossHealthBar
          totalHp={stats.totalHp}
          currentHp={stats.currentHp}
          percentRemaining={stats.percentRemaining}
          phasesClaimed={project.phases_claimed}
        />
      </section>

      {/* Secuencia de Ataques (Misiones) */}
      <section className="mb-16 space-y-4">
        <h2 className="font-display text-xs uppercase tracking-[0.3em] text-fg-muted/60">
          Misiones de Ataque Disponibles
        </h2>

        {missions.length === 0 ? (
          <p className="py-6 font-mono text-xs text-fg-muted">
            No hay ataques activos en esta mazmorra.
          </p>
        ) : (
          <div className="space-y-3">
            {missions.map((task) => (
              <article
                key={task.id}
                className="attack-card-item flex items-center justify-between rounded-xl p-4 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setEditingTask(task)}
                  className="min-w-0 flex-1 text-left"
                >
                  <h3 className="truncate font-display text-base font-bold text-fg">
                    {task.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase text-fg-muted/60">
                    Recompensa: +{task.xp_reward || 10} XP
                  </p>
                </button>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={!firstFreeSlot || task.hud_slot !== null}
                    onClick={() =>
                      firstFreeSlot && equipToHud.mutate({ taskId: task.id, slot: firstFreeSlot })
                    }
                    className={`rounded px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-all ${
                      task.hud_slot !== null
                        ? 'border border-accent/40 bg-accent/20 text-accent'
                        : 'border border-white/10 bg-white/5 text-fg-muted hover:bg-white/10 hover:text-fg disabled:opacity-40'
                    }`}
                  >
                    {task.hud_slot !== null ? 'En HUD' : '⚔️ Equipar'}
                  </button>

                  <button
                    type="button"
                    onClick={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
                    className="rounded border border-red-600/40 bg-red-600/20 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-widest text-red-400 transition-all hover:bg-red-600 hover:text-white"
                  >
                    Golpear
                  </button>
                </div>
              </article>
            ))}
          </div>
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
