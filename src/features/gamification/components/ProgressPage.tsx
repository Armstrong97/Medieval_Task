import type { CSSProperties } from 'react'
import { endOfWeek, format, startOfWeek } from 'date-fns'
import { es } from 'date-fns/locale'
import { Crown, Flame, Shield } from 'lucide-react'
import { useCategories, useProjects } from '@/features/projects/hooks'
import {
  useCategoryXp,
  useClassRanks,
  useStreak,
  useTodayQuests,
  useWeeklyQuests,
} from '@/features/gamification/hooks'
import { useTaskById, useTasksInRange } from '@/features/tasks/hooks'
import { CategoryIcon } from '@/utils/categoryIcon'
import { LootShowcase } from '@/features/gamification/components/LootShowcase'

const XP_PER_LEVEL = 100

function rankGlowStyle(rankOrder: number, colorHex: string): CSSProperties {
  if (rankOrder >= 4) return { boxShadow: `0 0 0 3px ${colorHex}55, 0 0 14px 2px ${colorHex}77` }
  if (rankOrder === 3) return { boxShadow: `0 0 0 2px ${colorHex}44, 0 0 8px 1px ${colorHex}44` }
  if (rankOrder === 2) return { boxShadow: `0 0 0 2px ${colorHex}33` }
  return {}
}

function PriorityQuestRow() {
  const { data: todayQuests } = useTodayQuests()
  const priorityQuest = todayQuests?.find((q) => q.type === 'daily_priority')
  const { data: priorityTask } = useTaskById(priorityQuest?.task_id ?? null)

  if (!priorityQuest) {
    return (
      <p className="text-sm text-neutral-400 dark:text-neutral-500">
        Todavía no marcaste una tarea prioritaria de hoy (con la ★ en el modal de la tarea).
      </p>
    )
  }

  return (
    <p className="flex items-center gap-2 text-sm">
      <span className={priorityQuest.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'}>
        {priorityQuest.completed ? '✓' : '☆'}
      </span>
      <span className="text-neutral-700 dark:text-neutral-300">
        {priorityTask?.title ?? 'Cargando…'}
      </span>
      {priorityQuest.completed && (
        <span className="text-xs text-emerald-600 dark:text-emerald-400">+{priorityQuest.xp_reward} XP</span>
      )}
    </p>
  )
}

function WeeklyProjectQuests() {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })
  const weekStartIso = format(weekStart, 'yyyy-MM-dd')

  const { data: projects } = useProjects()
  const { data: weekTasks } = useTasksInRange(weekStart.toISOString(), weekEnd.toISOString())
  const { data: weeklyQuests } = useWeeklyQuests(weekStartIso)

  const rows = (projects ?? [])
    .map((project) => {
      const tasks = weekTasks?.filter((t) => t.project_id === project.id && t.parent_task_id === null) ?? []
      const done = tasks.filter((t) => t.status === 'done').length
      const quest = weeklyQuests?.find((q) => q.project_id === project.id)
      return { project, total: tasks.length, done, completed: !!quest?.completed }
    })
    .filter((row) => row.total > 0)

  if (rows.length === 0) {
    return (
      <p className="text-sm text-neutral-400 dark:text-neutral-500">
        Ningún proyecto tiene tareas con deadline esta semana todavía.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {rows.map(({ project, total, done, completed }) => (
        <li key={project.id} className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-neutral-700 dark:text-neutral-300">{project.name}</span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              {done}/{total} {completed && <span className="text-emerald-600 dark:text-emerald-400">· +50 XP ✓</span>}
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div
              className="h-full rounded-full bg-neutral-900 dark:bg-neutral-100"
              style={{ width: `${total ? (done / total) * 100 : 0}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ProgressPage() {
  const { data: categories } = useCategories()
  const { data: xp } = useCategoryXp()
  const { data: streak } = useStreak()
  const { data: todayQuests } = useTodayQuests()
  const { data: classRanks } = useClassRanks()

  const triageQuest = todayQuests?.find((q) => q.type === 'daily_triage')

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Progreso</h1>

      <div className="mt-4 flex items-center gap-6 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
              {streak?.current_streak_days ?? 0} días
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              récord: {streak?.longest_streak ?? 0}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Shield
              key={i}
              className={`h-4 w-4 ${
                i < (streak?.shields_available ?? 0)
                  ? 'fill-sky-400 text-sky-400'
                  : 'text-neutral-200 dark:text-neutral-700'
              }`}
            />
          ))}
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Quests de hoy</h2>
        <div className="mt-2 flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <p className="flex items-center gap-2 text-sm">
            <span className={triageQuest?.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'}>
              {triageQuest?.completed ? '✓' : '○'}
            </span>
            <span className="text-neutral-700 dark:text-neutral-300">Vaciar el inbox (triage diario)</span>
            {triageQuest?.completed && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400">+{triageQuest.xp_reward} XP</span>
            )}
          </p>
          <PriorityQuestRow />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Quests semanales ·{' '}
          {format(startOfWeek(new Date(), { weekStartsOn: 1 }), "d MMM", { locale: es })} –{' '}
          {format(endOfWeek(new Date(), { weekStartsOn: 1 }), "d MMM", { locale: es })}
        </h2>
        <div className="mt-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <WeeklyProjectQuests />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Clases</h2>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {categories?.map((cat) => {
            const catXp = xp?.find((x) => x.category_id === cat.id)
            const currentXp = catXp?.current_xp ?? 0
            const level = catXp?.current_level ?? 1
            const progressInLevel = currentXp % XP_PER_LEVEL
            const ranksForCat = classRanks?.filter((r) => r.category_id === cat.id) ?? []
            const currentRank =
              ranksForCat.find((r) => r.id === catXp?.current_rank_id) ??
              ranksForCat.find((r) => r.rank_order === 1)
            const rankOrder = currentRank?.rank_order ?? 1

            return (
              <div
                key={cat.id}
                className="flex items-center gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800"
              >
                <div className="relative shrink-0">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: `${cat.color_hex}22`,
                      ...rankGlowStyle(rankOrder, cat.color_hex),
                    }}
                  >
                    <CategoryIcon iconName={cat.icon_name} className="h-5 w-5" style={{ color: cat.color_hex }} />
                  </div>
                  {rankOrder >= 4 && (
                    <Crown
                      className="absolute -right-1 -top-1 h-4 w-4"
                      style={{ color: cat.color_hex }}
                      fill={cat.color_hex}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {cat.name} <span className="font-normal text-neutral-400">· {currentRank?.rank_name ?? cat.class_name}</span>
                    </p>
                    <p className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">Nv. {level}</p>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progressInLevel}%`,
                        backgroundColor: cat.color_hex,
                      }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                      {progressInLevel}/{XP_PER_LEVEL} XP · {currentXp} total
                    </p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className="h-1 w-3 rounded-full bg-neutral-200 dark:bg-neutral-700"
                          style={n <= rankOrder ? { backgroundColor: cat.color_hex } : undefined}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Loot</h2>
        <div className="mt-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <LootShowcase />
        </div>
      </section>
    </div>
  )
}
