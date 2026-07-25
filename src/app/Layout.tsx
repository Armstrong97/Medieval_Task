import { NavLink, Outlet } from 'react-router-dom'
import {
  Calendar,
  Columns3,
  Flame,
  Inbox as InboxIcon,
  Link2,
  ListChecks,
  LogOut,
  Shield,
  Trophy,
} from 'lucide-react'
import { useAuth } from '@/features/auth/AuthProvider'
import { useStreak } from '@/features/gamification/hooks'
import { NotificationBell } from '@/features/notifications/components/NotificationBell'
import { Logomark } from '@/components/ui/Logomark'
import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { AchievementWatcher } from '@/features/gamification/components/AchievementWatcher'

const navItems = [
  { to: '/inbox', label: 'Inbox', icon: InboxIcon },
  { to: '/triage', label: 'Triage', icon: ListChecks },
  { to: '/kanban', label: 'Kanban', icon: Columns3 },
  { to: '/calendario', label: 'Calendario', icon: Calendar },
  { to: '/progreso', label: 'Progreso', icon: Trophy },
  { to: '/follow-ups', label: 'Follow-ups', icon: Link2 },
]

function StreakIndicator() {
  const { data: streak } = useStreak()
  if (!streak) return null

  return (
    <NavLink to="/progreso" className="flex shrink-0 items-center gap-2 text-sm text-fg-muted">
      <span className="flex items-center gap-1 font-mono">
        <Flame className="h-4 w-4 text-accent" />
        {streak.current_streak_days}
      </span>
      {streak.shields_available > 0 && (
        <span className="flex items-center gap-1 font-mono">
          <Shield className="h-3.5 w-3.5 fill-sky-500 text-sky-500" />
          {streak.shields_available}
        </span>
      )}
    </NavLink>
  )
}

export function Layout() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-dvh text-fg">
      <AmbientBackground />
      <AchievementWatcher />
      <nav className="flex items-center gap-4 border-b border-border bg-surface/90 px-4 py-2.5 backdrop-blur-sm">
        <NavLink to="/inbox" className="shrink-0">
          <Logomark className="h-7 w-7" />
        </NavLink>

        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-accent/10 text-accent' : 'text-fg-muted hover:text-fg'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <NotificationBell />
          <StreakIndicator />
          <button
            type="button"
            onClick={() => void signOut()}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            className="text-fg-muted hover:text-fg"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
