import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, ScrollText, Shield, Zap } from 'lucide-react'
import { useHudTasks } from '@/features/battle-hud/hooks'
import { useCategories } from '@/features/projects/hooks'
import { useCategoryXp, useClassRanks, useStreak } from '@/features/gamification/hooks'
import { CombatSlotCard } from '@/features/battle-hud/components/CombatSlotCard'
import { EmptySlotCard } from '@/features/battle-hud/components/EmptySlotCard'
import { GrimorioDrawer } from '@/features/battle-hud/components/GrimorioDrawer'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { bossAvatarSrc } from '@/utils/rpgAssets'
import type { Task } from '@/types/database.types'

const SLOTS = [1, 2, 3]

function PlayerSummaryHeader() {
  const { data: categories } = useCategories()
  const { data: categoryXp } = useCategoryXp()
  const { data: classRanks } = useClassRanks()
  const { data: streak } = useStreak()

  const dominant = useMemo(() => {
    if (!categoryXp || categoryXp.length === 0) return null
    return [...categoryXp].sort(
      (a, b) => b.current_level - a.current_level || b.current_xp - a.current_xp,
    )[0]
  }, [categoryXp])

  const dominantCategory = categories?.find((c) => c.id === dominant?.category_id)
  const dominantRank =
    classRanks?.find((r) => r.id === dominant?.current_rank_id) ??
    classRanks?.find((r) => r.category_id === dominant?.category_id && r.rank_order === 1)

  return (
    <header className="mb-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md md:flex-row">
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-2 border-accent bg-surface-2 p-1 shadow-[0_0_12px_rgba(217,169,74,0.3)]">
            <img
              src={bossAvatarSrc('dragon_default')}
              className="h-full w-full rounded-full object-cover"
              alt="Avatar del Héroe"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 rounded border border-bg bg-accent px-1.5 font-mono text-[10px] font-black text-accent-fg">
            NV. {dominant?.current_level ?? 1}
          </div>
        </div>

        <div>
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-accent drop-shadow-[0_0_10px_rgba(217,169,74,0.4)]">
            {dominantRank?.rank_name ?? dominantCategory?.class_name ?? 'Héroe de Questly'}
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
              Clase: {dominantCategory?.name ?? 'Aventurero'}
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="flex items-center gap-1 font-mono text-xs font-bold text-sky-400">
              <Shield className="h-3.5 w-3.5 fill-sky-400" />
              {streak?.shields_available ?? 0} ESCUDOS
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="mb-1 font-mono text-[10px] uppercase text-fg-muted/60">
            Racha Actual
          </p>
          <div className="flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-2">
            <Flame className="h-5 w-5 text-accent animate-bounce" />
            <span className="font-display text-lg font-bold text-accent">
              {streak?.current_streak_days ?? 0} DÍAS
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export function BattleHudPage() {
  const { data: hudTasks, isLoading } = useHudTasks()
  const [drawerSlot, setDrawerSlot] = useState<number | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <PlayerSummaryHeader />

      {isLoading ? (
        <p className="py-12 text-center font-mono text-sm text-fg-muted">
          Cargando mesa de combate…
        </p>
      ) : (
        <main className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {SLOTS.map((slot) => {
            const task = hudTasks?.find((t) => t.hud_slot === slot)
            return task ? (
              <CombatSlotCard
                key={task.id}
                task={task}
                onOpenTask={setEditingTask}
              />
            ) : (
              <EmptySlotCard
                key={slot}
                slot={slot}
                onEquip={() => setDrawerSlot(slot)}
              />
            )
          })}
        </main>
      )}

      {/* Acceso Rápido Inferior */}
      <footer className="mx-auto flex max-w-xl justify-center gap-4">
        <Link
          to="/kanban"
          className="group flex flex-1 items-center justify-center gap-3 rounded-xl border border-border bg-surface/80 py-4 transition-all hover:border-accent"
        >
          <ScrollText className="h-5 w-5 text-fg-muted transition-colors group-hover:text-accent" />
          <span className="font-display text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors group-hover:text-fg">
            Abrir Grimorio
          </span>
        </Link>
        <Link
          to="/inbox"
          className="group flex flex-1 items-center justify-center gap-3 rounded-xl border border-border bg-surface/80 py-4 transition-all hover:border-accent"
        >
          <Zap className="h-5 w-5 text-accent" />
          <span className="font-display text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors group-hover:text-fg">
            Captura Rápida
          </span>
        </Link>
      </footer>

      {drawerSlot !== null && (
        <GrimorioDrawer
          slot={drawerSlot}
          onClose={() => setDrawerSlot(null)}
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
