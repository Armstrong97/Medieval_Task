import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Crosshair, Flame, Inbox, Menu, ScrollText, Shield, Swords, Wand2, type LucideIcon } from 'lucide-react'
import { useInboxTasks } from '@/features/tasks/hooks'
import { useStreak, useSyncStreakTimezone } from '@/features/gamification/hooks'
import { NotificationBell } from '@/features/notifications/components/NotificationBell'
import { FocusFloatButton } from '@/features/tasks/components/FocusFloat'
import { FocusFloatProvider } from '@/features/tasks/FocusFloatContext'
import { FocusSessionProvider } from '@/features/tasks/FocusSessionProvider'
import { useFocusSession } from '@/features/tasks/focusSessionContext'
import { formatClock, useFocusClock } from '@/features/tasks/useFocusClock'
import { ProfileMenu } from '@/features/auth/components/ProfileMenu'
import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { BrandMark } from '@/components/ui/BrandMark'
import { Vine } from '@/components/ui/Vine'
import { StatusRail, StatusSummaryCard } from '@/app/StatusRail'
import { Toaster } from '@/components/ui/Toaster'
import { QuickCaptureFab } from '@/features/inbox/components/QuickCaptureFab'
import { AchievementWatcher } from '@/features/gamification/components/AchievementWatcher'
import { NAV_ICONS, type NavIconKey } from '@/utils/rpgAssets'

interface NavItem {
  to: string
  label: string
  iconKey?: NavIconKey
  Icon?: LucideIcon
  hint: string
  end?: boolean
}

const navItems: NavItem[] = [
  { to: '/', label: 'Combate', hint: 'Tus 3 misiones activas', iconKey: 'combat', end: true },
  { to: '/inbox', label: 'Inbox', hint: 'Captura rápida de ideas', iconKey: 'inbox' },
  { to: '/triage', label: 'Estrategia', hint: 'Ordena lo capturado', iconKey: 'strategy' },
  { to: '/kanban', label: 'Grimorio', hint: 'Todas tus misiones', iconKey: 'grimoire' },
  { to: '/calendario', label: 'Calendario', hint: 'Qué vence y cuándo', iconKey: 'calendar' },
  { to: '/progreso', label: 'Progreso', hint: 'XP, clases y logros', iconKey: 'progress' },
  { to: '/follow-ups', label: 'Follow-ups', hint: 'Esperando a otros', iconKey: 'followups' },
  { to: '/proyectos', label: 'Proyectos', hint: 'Tus jefes de mazmorra', iconKey: 'projects' },
  { to: '/cadenas', label: 'Cadenas', hint: 'Pasos que se desbloquean', iconKey: 'chains' },
]

function StreakIndicator() {
  const { data: streak } = useStreak()
  const { pathname } = useLocation()
  // Combate y Progreso ya muestran la racha en grande: evitar repetirla.
  if (!streak || pathname === '/' || pathname.startsWith('/progreso')) return null

  return (
    <NavLink
      to="/progreso"
      className="hidden items-center gap-2 rounded-full border border-border bg-surface-2/80 px-3 py-1 font-mono text-xs text-fg-muted sm:flex lg:hidden"
    >
      <span className="flex items-center gap-1 font-bold text-accent">
        <Flame className="h-3.5 w-3.5 text-accent animate-pulse" />
        {streak.current_streak_days} DÍAS
      </span>
      {streak.shields_available > 0 && (
        <span className="flex items-center gap-1 text-rune">
          <Shield className="h-3 w-3 fill-rune" />
          {streak.shields_available}
        </span>
      )}
    </NavLink>
  )
}

// Barra inferior en móvil: 4 destinos de uso diario + "Más" (abre el menú
// completo). La captura vive en el botón flotante.
const bottomItems = [
  { to: '/', label: 'Combate', icon: Swords, end: true },
  { to: '/inbox', label: 'Inbox', icon: Inbox, end: false },
  { to: '/triage', label: 'Estrategia', icon: Wand2, end: false },
  { to: '/kanban', label: 'Grimorio', icon: ScrollText, end: false },
] as const

// Acceso al Modo Foco activo desde cualquier pantalla (muestra el reloj si hay bloque).
function ActiveFocusPill() {
  const { taskId, endAt } = useFocusSession()
  const remaining = useFocusClock(endAt)
  const { pathname } = useLocation()
  if (!taskId || pathname.startsWith('/foco')) return null

  return (
    <NavLink
      to={`/foco/${taskId}`}
      className="flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 font-mono text-xs font-bold text-accent"
      aria-label="Volver al Modo Foco activo"
    >
      <Crosshair className="h-3.5 w-3.5" aria-hidden="true" />
      {remaining !== null ? (remaining === 0 ? 'Bloque listo' : formatClock(remaining)) : 'Foco'}
    </NavLink>
  )
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 font-mono text-xs font-bold text-accent-fg">
      {count > 99 ? '99+' : count}
    </span>
  )
}

export function Layout() {
  useSyncStreakTimezone()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [railPinned, setRailPinned] = useState(() => {
    try {
      return localStorage.getItem('questly_status_rail_pinned') === 'true'
    } catch {
      return false
    }
  })

  function toggleRailPinned() {
    setRailPinned((prev) => {
      try {
        localStorage.setItem('questly_status_rail_pinned', String(!prev))
      } catch {
        // sin localStorage: solo no se recuerda
      }
      return !prev
    })
  }
  const { data: inboxItems } = useInboxTasks()
  const pendingTriage = inboxItems?.length ?? 0
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
  const pageTitle = location.pathname.startsWith('/foco') ? 'Modo Foco' : (currentItem?.label ?? 'Combate')

  return (
    <FocusSessionProvider>
    <FocusFloatProvider>
      {/* --rail-w: ancho de la barra de estado; el contenido y el botón de captura lo respetan. */}
      <div
        className="min-h-dvh text-fg"
        style={{ '--rail-w': railPinned ? '14rem' : '4rem' } as React.CSSProperties}
      >
        <AmbientBackground />
        <AchievementWatcher />
        <Toaster />
        <QuickCaptureFab />

        {/* Top Header Minimalista */}
        <header className="app-header fixed top-0 left-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-bg/85 px-4 backdrop-blur-md sm:px-6">
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
              <BrandMark className="h-6 w-6 text-accent" />
              <span className="font-display text-xl font-black tracking-tight text-accent drop-shadow-[0_0_8px_rgb(var(--accent-rgb)/0.35)]">
                QUESTLY
              </span>
              <span className="select-none font-light text-border">|</span>
              <span className="font-display text-xs tracking-widest uppercase text-fg-muted">
                {pageTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ActiveFocusPill />
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
          className={`sidebar-panel fixed top-0 left-0 z-50 flex h-full flex-col overflow-y-auto pt-20 pb-6 transition-transform duration-300 ${
            sidebarOpen ? 'is-open translate-x-0' : '-translate-x-full'
          }`}
        >
          <Vine className="absolute right-0 top-16 h-[calc(100%-4rem)] w-16" />
          <div className="mb-6 flex items-center gap-3 px-6">
            <BrandMark className="h-7 w-7 shrink-0 text-accent" />
            <p className="font-display text-xs uppercase tracking-[0.25em] text-accent">
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
                  `nav-item-link flex items-center gap-3.5 rounded-r-xl px-5 py-2 text-sm font-medium transition-all ${
                    isActive ? 'active' : 'text-fg-muted'
                  }`
                }
              >
                {item.Icon ? (
                  <item.Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                ) : item.iconKey ? (
                <img
                  src={NAV_ICONS[item.iconKey]}
                  alt=""
                  className="h-11 w-11 shrink-0 object-contain drop-shadow-[0_0_4px_rgb(var(--shade-rgb)/0.5)]"
                />
                ) : null}
                <span className="flex min-w-0 flex-col">
                  <span className="nav-label font-display text-xs tracking-wider uppercase">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs font-normal normal-case tracking-normal text-fg-muted">
                    {item.hint}
                  </span>
                </span>
                {item.to === '/triage' && <CountBadge count={pendingTriage} />}
              </NavLink>
            ))}
          </nav>

          <StatusSummaryCard onNavigate={() => setSidebarOpen(false)} />

          <div className="mt-auto border-t border-border/40 px-6 pt-4">
            <p className="font-mono text-xs tracking-tight uppercase text-fg-muted">
              QUESTLY v4.0.1 · MISIONES ACTIVAS
            </p>
          </div>
        </aside>

        {/* Contenido Principal con Offset para el Header */}
        <StatusRail pinned={railPinned} onTogglePinned={toggleRailPinned} />

        <main className="pb-24 pt-16 transition-[padding] duration-150 motion-reduce:transition-none md:pb-0 lg:pr-[var(--rail-w)]">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>

        {/* Barra inferior (solo móvil) */}
        <nav
          aria-label="Navegación principal"
          className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-bg/95 backdrop-blur-md md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {bottomItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative flex min-h-16 flex-1 flex-col items-center justify-center gap-1 font-mono text-xs ${
                  isActive ? 'text-accent' : 'text-fg-muted'
                }`
              }
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
              {item.label}
              {item.to === '/triage' && pendingTriage > 0 && (
                <span className="absolute right-[22%] top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 font-mono text-xs font-bold text-accent-fg">
                  {pendingTriage > 99 ? '99+' : pendingTriage}
                </span>
              )}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex min-h-16 flex-1 flex-col items-center justify-center gap-1 font-mono text-xs text-fg-muted"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
            Más
          </button>
        </nav>
      </div>
    </FocusFloatProvider>
    </FocusSessionProvider>
  )
}
