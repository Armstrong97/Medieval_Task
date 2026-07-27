import { Link } from 'react-router-dom'
import { useBossStats } from '@/features/projects/hooks'
import { bossAvatarSrc } from '@/utils/rpgAssets'
import type { Category, Project } from '@/types/database.types'

export function ProjectBossCard({ project, category }: { project: Project; category?: Category }) {
  const stats = useBossStats(project.id)
  const defeated = stats?.currentHp === 0 && (stats?.totalHp ?? 0) > 0

  return (
    <Link
      to={`/projects/${project.id}/boss`}
      className="flex items-center gap-3 rounded-lg border border-border-card bg-surface-card p-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
      style={category ? { borderLeftWidth: '3px', borderLeftColor: category.color_hex } : undefined}
    >
      <img
        src={bossAvatarSrc(project.boss_avatar)}
        alt={project.boss_title}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{project.name}</p>
        <p className="truncate font-display text-xs text-fg-muted">{project.boss_title}</p>
        {stats && (
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: `${stats.percentRemaining}%`,
                background: 'linear-gradient(90deg, var(--hp-critical), var(--hp-full))',
              }}
            />
          </div>
        )}
      </div>
      {stats && (
        <span className="shrink-0 font-mono text-xs text-fg-muted">
          {defeated ? '🏆' : `${stats.currentHp}/${stats.totalHp}`}
        </span>
      )}
    </Link>
  )
}
