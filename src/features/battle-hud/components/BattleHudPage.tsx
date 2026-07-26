import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, ScrollText, Zap } from 'lucide-react'
import { useHudTasks } from '@/features/battle-hud/hooks'
import { useCategories } from '@/features/projects/hooks'
import { useCategoryXp, useClassRanks, useStreak } from '@/features/gamification/hooks'
import { CategoryIcon } from '@/utils/categoryIcon'
import { CombatSlotCard } from '@/features/battle-hud/components/CombatSlotCard'
import { EmptySlotCard } from '@/features/battle-hud/components/EmptySlotCard'
import { GrimorioDrawer } from '@/features/battle-hud/components/GrimorioDrawer'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

const SLOTS = [1, 2, 3];

function PlayerSummary() {
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
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="font-display text-xl font-bold tracking-wide text-fg">
          Dashboard de Enfrentamiento
        </h1>
        {dominantCategory && dominant && (
          <p className="mt-1 flex items-center gap-1.5 text-sm">
            <CategoryIcon
              iconName={dominantCategory.icon_name}
              className="h-4 w-4"
              style={{ color: dominantCategory.color_hex }}
            />
            <span className="font-display font-medium" style={{ color: dominantCategory.color_hex }}>
              {dominantRank?.rank_name ?? dominantCategory.class_name}
            </span>
            <span className="font-mono text-xs text-fg-muted">· Nv. {dominant.current_level}</span>
          </p>
        )}
      </div>
      <span className="flex items-center gap-1.5 font-mono text-sm text-fg-muted">
        <Flame className="h-4 w-4 text-accent" />
        {streak?.current_streak_days ?? 0} <span className="text-xs">días</span>
      </span>
    </div>
  )
}

export function BattleHudPage() {
  const { data: hudTasks, isLoading } = useHudTasks()
  const [drawerSlot, setDrawerSlot] = useState<number | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  return (
    <div className="mx-auto max-w-5xl p-6">
      <PlayerSummary />

      {isLoading ? (
        <p className="mt-6 text-sm text-fg-muted">Cargando…</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {SLOTS.map((slot) => {
            const task = hudTasks?.find((t) => t.hud_slot === slot)
            return task ? (
              <CombatSlotCard key={slot} task={task} onOpenTask={setEditingTask} />
            ) : (
              <EmptySlotCard key={slot} slot={slot} onEquip={() => setDrawerSlot(slot)} />
            )
          })}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to="/kanban"
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
        >
          <ScrollText className="h-4 w-4" /> Abrir Grimorio
        </Link>
        <Link
          to="/inbox"
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
        >
          <Zap className="h-4 w-4" /> Captura rápida
        </Link>
      </div>

      {drawerSlot !== null && (
        <GrimorioDrawer slot={drawerSlot} onClose={() => setDrawerSlot(null)} />
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
