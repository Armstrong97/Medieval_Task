import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Flame, Shield, Swords } from 'lucide-react'
import { useStreak } from '@/features/gamification/hooks'
import { NotificationBell } from '@/features/notifications/components/NotificationBell'
import { FocusFloatButton } from '@/features/tasks/components/FocusFloat'
import { FocusFloatProvider } from '@/features/tasks/FocusFloatContext'
import { ProfileMenu } from '@/features/auth/components/ProfileMenu'
import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { AchievementWatcher } from '@/features/gamification/components/AchievementWatcher'
import { NAV_ICONS, type NavIconKey } from '@/utils/rpgAssets'

interface NavItem {
  to: string
  label: string
  iconKey: NavIconKey
  end?: boolean
}

const navItems: NavItem[] = [
  { to: '/', label: 'Combate', iconKey: 'combat', end: true },
  { to: '/inbox', label: 'Inbox', iconKey: 'inbox' },
  { to: '/triage', label: 'Estrategia', iconKey: 'strategy' },
  { to: '/kanban', label: 'Grimorio', iconKey: 'grimoire' },
  { to: '/calendario', label: 'Calendario', iconKey: 'calendar' },
  { to: '/progreso', label: 'Progreso', iconKey: 'progress' },
  { to: '/follow-ups', label: 'Follow-ups', iconKey: 'followups' },
]

function StreakIndicator() {
  const { data: streak } = useStreak()
  if (!streak) return null

  return (
    <NavLink
      to="/progreso"
      className="hidden items-center gap-2 rounded-full border border-border bg-surface-2/80 px-3 py-1 font-mono text-xs text-fg-muted sm:flex"
    >
      <span className="flex items-center gap-1 font-bold text-accent">
        <Flame className="h-3.5 w-3.5 text-accent animate-pulse" />
        {streak.current_streak_days} DÍAS
      </span>
      {streak.shields_available > 0 && (
        <span className="flex items-center gap-1 text-sky-400">
          <Shield className="h-3 w-3 fill-sky-400" />
          {streak.shields_available}
        </span>
      )}
    </NavLink>
  )
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const currentItem = navItems.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to) && item.to !== '/',
  )
  const pageTitle = currentItem?.label ?? 'Combate'

  return (
    <FocusFloatProvider>
      <div className="min-h-dvh text-fg">
        <AmbientBackground />
        <AchievementWatcher />

        {/* Top Header Minimalista */}
        <header className="fixed top-0 left-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-bg/85 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            {/* Botón Hamburguesa Rúnico */}
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Abrir Menú del Héroe"
              className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/50 transition-all hover:border-accent active:scale-90"
            >
              <Swords className="h-5 w-5 text-accent transition-transform group-hover:rotate-12" />
            </button>

            {/* Identidad en Header */}
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-black tracking-tight text-accent drop-shadow-[0_0_8px_rgba(217,169,74,0.3)]">
                QUESTLY
              </span>
              <span className="select-none font-light text-border">|</span>
              <span className="font-display text-xs tracking-widest uppercase text-fg-muted">
                {pageTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StreakIndicator />
            <FocusFloatButton />
            <NotificationBell />
            <ProfileMenu />
          </div>
        </header>

        {/* Overlay con Backdrop Blur (Aislamiento TDAH) */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar Lateral Flotante */}
        <aside
          className={`sidebar-panel fixed top-0 left-0 z-50 flex h-full flex-col pt-20 pb-6 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-6 px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/60">
              Menú del Héroe
            </p>
          </div>

          <nav className="flex-1 space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-item-link flex items-center gap-3.5 rounded-r-xl px-5 py-3 text-sm font-medium transition-all ${
                    isActive ? 'active' : 'text-fg-muted'
                  }`
                }
              >
                <img
                  src={NAV_ICONS[item.iconKey]}
                  alt=""
                  className="h-6 w-6 object-contain drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                />
                <span className="nav-label font-display text-xs tracking-wider uppercase">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-border/40 px-6 pt-4">
            <p className="font-mono text-[9px] tracking-tight uppercase text-fg-muted/50">
              QUESTLY v4.0.1 · MISIONES ACTIVAS
            </p>
          </div>
        </aside>

        {/* Contenido Principal con Offset para el Header */}
        <main className="pt-16">
          <Outlet />
        </main>
      </div>
    </FocusFloatProvider>
  )
}
