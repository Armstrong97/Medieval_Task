import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'

const navItems = [
  { to: '/inbox', label: 'Inbox' },
  { to: '/triage', label: 'Triage' },
  { to: '/kanban', label: 'Kanban' },
  { to: '/calendario', label: 'Calendario' },
]

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
        <button
          type="button"
          onClick={() => void signOut()}
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Cerrar sesión
        </button>
      </nav>
      <Outlet />
    </div>
  )
}
