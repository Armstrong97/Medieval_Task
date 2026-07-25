import { NavLink, Outlet } from 'react-router-dom'
import { Flame, Shield } from 'lucide-react'
import { useAuth } from '@/features/auth/AuthProvider'
import { useStreak } from '@/features/gamification/hooks'
import { NotificationBell } from '@/features/notifications/components/NotificationBell'

const navItems = [
  { to: '/inbox', label: 'Inbox' },
  { to: '/triage', label: 'Triage' },
  { to: '/kanban', label: 'Kanban' },
  { to: '/calendario', label: 'Calendario' },
  { to: '/progreso', label: 'Progreso' },
  { to: '/follow-ups', label: 'Follow-ups' },
]

function StreakIndicator() {
  const { data: streak } = useStreak()
  if (!streak) return null

  return (
    <NavLink
      to="/progreso"
      className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400"
    >
      <span className="flex items-center gap-1">
        <Flame className="h-4 w-4 text-orange-500" />
        {streak.current_streak_days}
      </span>
      {streak.shields_available > 0 && (
        <span className="flex items-center gap-1">
          <Shield className="h-3.5 w-3.5 fill-sky-400 text-sky-400" />
          {streak.shields_available}
        </span>
      )}
    </NavLink>
  )
}

export function Layout() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <nav className="flex items-center justify-between border-b border-neutral-200 px-6 py-3 dark:border-neutral-800">
        <div className="flex gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? 'text-neutral-900 dark:text-neutral-100'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <StreakIndicator />
          <button
            type="button"
            onClick={() => void signOut()}
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
