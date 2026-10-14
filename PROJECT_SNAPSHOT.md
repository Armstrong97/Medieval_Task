# Project Snapshot — Productividad RPG

> Generado automáticamente con `node scripts/generate-project-snapshot.mjs` el 2026-10-14. Incluye código fuente + config; excluye node_modules/dist/.env/binarios/specs en Markdown. No editar a mano — se regenera.

## Estructura de carpetas (archivos incluidos en este snapshot)

```
├── .oxlintrc.json
├── index.html
├── netlify.toml
├── package.json
├── scripts
│   ├── generate-project-snapshot.mjs
│   └── optimize-rpg-assets.mjs
├── src
│   ├── app
│   │   ├── Layout.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── providers.tsx
│   │   ├── PwaUpdatePrompt.tsx
│   │   ├── router.tsx
│   │   ├── statusItems.ts
│   │   └── StatusRail.tsx
│   ├── App.tsx
│   ├── components
│   │   └── ui
│   │       ├── AchievementCelebration.tsx
│   │       ├── AmbientBackground.tsx
│   │       ├── BrandMark.tsx
│   │       ├── toast-store.ts
│   │       └── Toaster.tsx
│   ├── features
│   │   ├── auth
│   │   │   ├── AuthProvider.tsx
│   │   │   └── components
│   │   │       ├── LoginPage.tsx
│   │   │       └── ProfileMenu.tsx
│   │   ├── battle-hud
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   ├── BattleHudPage.tsx
│   │   │   │   ├── CombatSlotCard.tsx
│   │   │   │   ├── EmptySlotCard.tsx
│   │   │   │   ├── GrimorioDrawer.tsx
│   │   │   │   └── StaminaRing.tsx
│   │   │   └── hooks.ts
│   │   ├── calendar
│   │   │   └── components
│   │   │       ├── CalendarHeatmapView.tsx
│   │   │       ├── CalendarPage.tsx
│   │   │       ├── CalendarQuickAdd.tsx
│   │   │       └── CalendarTimelineView.tsx
│   │   ├── followups
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   ├── FollowUpCard.tsx
│   │   │   │   ├── FollowUpsPage.tsx
│   │   │   │   └── LogContactModal.tsx
│   │   │   └── hooks.ts
│   │   ├── gamification
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   ├── AchievementWatcher.tsx
│   │   │   │   ├── ClassDetailModal.tsx
│   │   │   │   ├── LootShowcase.tsx
│   │   │   │   └── ProgressPage.tsx
│   │   │   └── hooks.ts
│   │   ├── inbox
│   │   │   └── components
│   │   │       ├── InboxDashboard.tsx
│   │   │       ├── InboxPage.tsx
│   │   │       └── QuickCaptureFab.tsx
│   │   ├── kanban
│   │   │   ├── api.ts
│   │   │   └── components
│   │   │       ├── GrimorioAccordionView.tsx
│   │   │       ├── GrimorioTabsView.tsx
│   │   │       └── KanbanPage.tsx
│   │   ├── notifications
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   ├── NotificationBell.tsx
│   │   │   │   └── PushToggle.tsx
│   │   │   ├── hooks.ts
│   │   │   └── push.ts
│   │   ├── projects
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   ├── BossEncounterPage.tsx
│   │   │   │   ├── BossHealthBar.tsx
│   │   │   │   ├── PhaseRewardModal.tsx
│   │   │   │   ├── ProjectBossCard.tsx
│   │   │   │   └── ProjectsPage.tsx
│   │   │   └── hooks.ts
│   │   ├── tasks
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   ├── FocusFloat.tsx
│   │   │   │   ├── FocusModePage.tsx
│   │   │   │   ├── FocusSessionView.tsx
│   │   │   │   ├── RescheduleButtons.tsx
│   │   │   │   └── TaskModal.tsx
│   │   │   ├── FocusFloatContext.tsx
│   │   │   ├── focusSessionContext.ts
│   │   │   ├── FocusSessionProvider.tsx
│   │   │   ├── hooks.ts
│   │   │   └── useFocusClock.ts
│   │   └── triage
│   │       ├── api.ts
│   │       ├── components
│   │       │   ├── InboxCardDeck.tsx
│   │       │   ├── StrategyTablePage.tsx
│   │       │   └── WeaponSelector.tsx
│   │       └── hooks.ts
│   ├── index.css
│   ├── lib
│   │   └── supabase.ts
│   ├── main.tsx
│   ├── sw.ts
│   ├── types
│   │   └── database.types.ts
│   ├── utils
│   │   ├── classIcons.ts
│   │   ├── datetime.ts
│   │   ├── rpgAssets.ts
│   │   ├── useOnlineStatus.ts
│   │   └── useSpeechDictation.ts
│   └── vite-env.d.ts
├── supabase
│   ├── config.toml
│   ├── functions
│   │   └── send-notifications
│   │       └── index.ts
│   └── migrations
│       ├── 20260724202801_fase1_schema.sql
│       ├── 20260724223606_fase2_gamification.sql
│       ├── 20260724230130_fase3_ranks_loot.sql
│       ├── 20260725000448_fase4_followups_notifications.sql
│       ├── 20260725010828_fase5_push_subscriptions.sql
│       ├── 20260725230823_fase6_subtask_xp_and_followup_status.sql
│       ├── 20260726000001_fase7_battle_hud_slots.sql
│       ├── 20260726000002_fase7_dungeon_bosses.sql
│       ├── 20260727000001_fase8_followup_logs.sql
│       ├── 20261013000001_fase9_rescate_avisos_triage.sql
│       ├── 20261014000001_fase9_orden_subtareas.sql
│       └── 20261014000002_limpiar_avisos_microtareas.sql
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.sw.json
└── vite.config.ts
```

## Archivos

### .oxlintrc.json

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

### index.html

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#f3f1e2" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0b1410" media="(prefers-color-scheme: dark)" />
    <meta name="description" content="Questly — Sistema de productividad personal y RPG táctico amigable con TDAH." />
    <title>Questly | Maneja tus misiones</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/manifest.webmanifest"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### package.json

```json
{
  "name": "prod-app-rpg",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fontsource-variable/inter": "^5.3.0",
    "@fontsource-variable/jetbrains-mono": "^5.3.0",
    "@fontsource/cinzel": "^5.3.0",
    "@supabase/supabase-js": "^2.110.8",
    "@tailwindcss/vite": "^4.3.3",
    "@tanstack/query-async-storage-persister": "^5.101.4",
    "@tanstack/react-query": "^5.101.4",
    "@tanstack/react-query-persist-client": "^5.101.4",
    "date-fns": "^4.4.0",
    "idb-keyval": "^6.3.0",
    "lucide-react": "^1.26.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-router-dom": "^7.18.1",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "oxlint": "^1.71.0",
    "sharp": "^0.35.3",
    "supabase": "^2.109.1",
    "typescript": "~6.0.2",
    "vite": "^8.1.1",
    "vite-plugin-pwa": "^1.3.0",
    "workbox-precaching": "^7.4.1",
    "workbox-routing": "^7.4.1",
    "workbox-strategies": "^7.4.1"
  }
}
```

### scripts/generate-project-snapshot.mjs

```javascript
// Genera PROJECT_SNAPSHOT.md en la raíz del proyecto: un único archivo con
// la estructura de carpetas + todo el código fuente relevante, para
// compartir con Gemini y mantener la arquitectura alineada entre las dos
// capas (Gemini = diseño, Claude = ejecución — ver HANDOFF.md sección 14).
//
// Usa `git ls-files` (trackeados) + `git ls-files --others --exclude-standard`
// (nuevos sin commitear, pero no ignorados) como fuente de verdad de qué
// archivos existen — así hereda gratis las exclusiones de .gitignore
// (node_modules, dist, dev-dist, .env.local, etc.) sin perderse el trabajo
// que todavía no se commiteó, y le aplica un segundo filtro para sacar
// binarios, lockfiles y specs pesadas en Markdown.
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { extname } from 'node:path'

const ROOT = process.cwd()
const OUTPUT = 'PROJECT_SNAPSHOT.md'

// Extensiones de texto/código que sí queremos volcar en el snapshot.
const TEXT_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
  '.css', '.json', '.toml', '.sql', '.html',
])

// Nombres/rutas puntuales a excluir aunque tengan extensión de texto.
const EXCLUDE_EXACT = new Set([
  'package-lock.json',
  'PROJECT_SNAPSHOT.md',
])

// Prefijos de ruta a excluir por completo (config de editor/herramientas,
// no código de la app).
const EXCLUDE_PREFIXES = ['.claude/']

const LANG_BY_EXT = {
  '.ts': 'typescript',
  '.tsx': 'tsx',
  '.js': 'javascript',
  '.jsx': 'jsx',
  '.mjs': 'javascript',
  '.cjs': 'javascript',
  '.css': 'css',
  '.json': 'json',
  '.toml': 'toml',
  '.sql': 'sql',
  '.html': 'html',
}

// Combina trackeados + no-trackeados-pero-no-ignorados: con solo `git
// ls-files` se pierde cualquier archivo nuevo que todavía no se commiteó
// (en este proyecto, eso es bastante — módulos enteros de la Fase 7 seguían
// sin commit al generar esto). `--others --exclude-standard` respeta
// .gitignore igual que el tracking normal, así que node_modules/dist/etc.
// siguen afuera sin tener que reimplementar esa lógica a mano.
function listProjectFiles() {
  const tracked = execSync('git ls-files', { cwd: ROOT, encoding: 'utf-8' })
  const untracked = execSync('git ls-files --others --exclude-standard', {
    cwd: ROOT,
    encoding: 'utf-8',
  })
  const combined = new Set(
    [...tracked.split('\n'), ...untracked.split('\n')].filter(Boolean),
  )
  return [...combined]
}

function shouldInclude(relPath) {
  if (EXCLUDE_EXACT.has(relPath)) return false
  if (EXCLUDE_PREFIXES.some((prefix) => relPath.startsWith(prefix))) return false
  // .md explícitamente afuera (specs pesadas: HANDOFF.md, spec-app-*.md, etc).
  if (relPath.endsWith('.md')) return false
  return TEXT_EXTENSIONS.has(extname(relPath))
}

function buildTree(paths) {
  const root = {}
  for (const p of paths) {
    const parts = p.split('/')
    let node = root
    for (const part of parts) {
      node[part] ??= {}
      node = node[part]
    }
  }
  const lines = []
  function walk(node, prefix) {
    const entries = Object.keys(node).sort((a, b) => a.localeCompare(b))
    entries.forEach((name, i) => {
      const isLast = i === entries.length - 1
      lines.push(`${prefix}${isLast ? '└── ' : '├── '}${name}`)
      const childKeys = Object.keys(node[name])
      if (childKeys.length > 0) {
        walk(node[name], `${prefix}${isLast ? '    ' : '│   '}`)
      }
    })
  }
  walk(root, '')
  return lines.join('\n')
}

const allFiles = listProjectFiles()
const included = allFiles
  // git ls-files puede listar un archivo trackeado que se borró del disco
  // pero todavía no se commiteó la eliminación — se lo salta en silencio.
  .filter((p) => existsSync(`${ROOT}/${p}`))
  .filter(shouldInclude)
  .sort((a, b) => a.localeCompare(b))

const parts = []
parts.push('# Project Snapshot — Productividad RPG\n')
parts.push(
  `> Generado automáticamente con \`node scripts/generate-project-snapshot.mjs\` el ${new Date().toISOString().slice(0, 10)}. ` +
    'Incluye código fuente + config; excluye node_modules/dist/.env/binarios/specs en Markdown. ' +
    'No editar a mano — se regenera.\n',
)
parts.push('## Estructura de carpetas (archivos incluidos en este snapshot)\n')
parts.push('```\n' + buildTree(included) + '\n```\n')
parts.push('## Archivos\n')

for (const relPath of included) {
  const abs = `${ROOT}/${relPath}`
  const lang = LANG_BY_EXT[extname(relPath)] ?? ''
  let content
  try {
    content = readFileSync(abs, 'utf-8')
  } catch (err) {
    console.warn(`No se pudo leer ${relPath}:`, err.message)
    continue
  }
  parts.push(`### ${relPath}\n`)
  parts.push('```' + lang + '\n' + content.replace(/\n?$/, '\n') + '```\n')
}

writeFileSync(`${ROOT}/${OUTPUT}`, parts.join('\n'), 'utf-8')
console.log(`${OUTPUT} generado con ${included.length} archivos.`)
```

### scripts/optimize-rpg-assets.mjs

```javascript
// Los assets que llegaron de Imagen 3 vienen a 2048x2048 sin comprimir
// (4.8-7.7 MB cada uno) — inviable para una PWA offline-first (el build
// falla directo, el límite de precache de vite-plugin-pwa es 2 MB por
// archivo, y aunque no fallara, 37 MB de íconos rompería el requisito de
// carga rápida del spec original). Se re-comprimen acá a un tamaño real de
// uso en la UI, sobreescribiendo los originales.
import sharp from 'sharp'

const TARGETS = [
  { path: 'public/assets/rpg/weapons/dagger.png', size: 256 },
  { path: 'public/assets/rpg/weapons/sword.png', size: 256 },
  { path: 'public/assets/rpg/weapons/greatsword.png', size: 256 },
  { path: 'public/assets/rpg/bosses/dragon.png', size: 512 },
  { path: 'public/assets/rpg/bosses/lich.png', size: 512 },
  { path: 'public/assets/rpg/loot/chest.png', size: 256 },
  { path: 'public/assets/rpg/nav/combat.png', size: 256 },
  { path: 'public/assets/rpg/nav/inbox.png', size: 256 },
  { path: 'public/assets/rpg/nav/strategy.png', size: 256 },
  { path: 'public/assets/rpg/nav/grimoire.png', size: 256 },
  { path: 'public/assets/rpg/nav/calendar.png', size: 256 },
  { path: 'public/assets/rpg/nav/progress.png', size: 256 },
  { path: 'public/assets/rpg/nav/followups.png', size: 256 },
]

for (const { path, size } of TARGETS) {
  const buffer = await sharp(path)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer()
  await sharp(buffer).toFile(path)
  console.log(`${path} -> ${(buffer.length / 1024).toFixed(0)} KB`)
}
```

### src/App.tsx

```tsx
import { RouterProvider } from 'react-router-dom'
import { Providers } from '@/app/providers'
import { router } from '@/app/router'
import { PwaUpdatePrompt } from '@/app/PwaUpdatePrompt'

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
      <PwaUpdatePrompt />
    </Providers>
  )
}

export default App
```

### src/app/Layout.tsx

```tsx
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Crosshair, Flame, FolderOpen, Inbox, Menu, ScrollText, Shield, Swords, Wand2, type LucideIcon } from 'lucide-react'
import { useInboxTasks } from '@/features/tasks/hooks'
import { useStreak } from '@/features/gamification/hooks'
import { NotificationBell } from '@/features/notifications/components/NotificationBell'
import { FocusFloatButton } from '@/features/tasks/components/FocusFloat'
import { FocusFloatProvider } from '@/features/tasks/FocusFloatContext'
import { FocusSessionProvider } from '@/features/tasks/FocusSessionProvider'
import { useFocusSession } from '@/features/tasks/focusSessionContext'
import { formatClock, useFocusClock } from '@/features/tasks/useFocusClock'
import { ProfileMenu } from '@/features/auth/components/ProfileMenu'
import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { BrandMark } from '@/components/ui/BrandMark'
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
  { to: '/proyectos', label: 'Proyectos', hint: 'Tus jefes de mazmorra', Icon: FolderOpen },
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
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
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
                  `nav-item-link flex items-center gap-3.5 rounded-r-xl px-5 py-3 text-sm font-medium transition-all ${
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
                  className="h-6 w-6 object-contain drop-shadow-[0_0_4px_rgb(var(--shade-rgb)/0.5)]"
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
          <Outlet />
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
```

### src/app/ProtectedRoute.tsx

```tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'

export function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg text-sm text-fg-muted">
        Cargando…
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
```

### src/app/providers.tsx

```tsx
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { get, set, del } from 'idb-keyval'
import type { PropsWithChildren } from 'react'
import { AuthProvider } from '@/features/auth/AuthProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
})

// IndexedDB (vía idb-keyval) en vez de localStorage: más espacio y no
// bloquea el hilo principal — clave para no perder capturas offline.
const persister = createAsyncStoragePersister({
  storage: {
    getItem: (key: string) => get(key),
    setItem: (key: string, value: string) => set(key, value),
    removeItem: (key: string) => del(key),
  },
})

export function Providers({ children }: PropsWithChildren) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 * 7 }}
    >
      <AuthProvider>{children}</AuthProvider>
    </PersistQueryClientProvider>
  )
}
```

### src/app/PwaUpdatePrompt.tsx

```tsx
import { useRegisterSW } from 'virtual:pwa-register/react'

export function PwaUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh && !offlineReady) return null

  function close() {
    setNeedRefresh(false)
    setOfflineReady(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm shadow-xl">
        <span className="text-fg">
          {needRefresh ? 'Hay una versión nueva disponible.' : 'Lista para usar sin conexión.'}
        </span>
        {needRefresh && (
          <button
            type="button"
            onClick={() => updateServiceWorker(true)}
            className="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-fg"
          >
            Actualizar
          </button>
        )}
        <button
          type="button"
          onClick={close}
          className="text-fg-muted hover:text-fg"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  )
}
```

### src/app/router.tsx

```tsx
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/app/Layout'
import { ProtectedRoute } from '@/app/ProtectedRoute'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { BattleHudPage } from '@/features/battle-hud/components/BattleHudPage'
import { BossEncounterPage } from '@/features/projects/components/BossEncounterPage'
import { InboxPage } from '@/features/inbox/components/InboxPage'
import { StrategyTablePage } from '@/features/triage/components/StrategyTablePage'
import { KanbanPage } from '@/features/kanban/components/KanbanPage'
import { CalendarPage } from '@/features/calendar/components/CalendarPage'
import { ProgressPage } from '@/features/gamification/components/ProgressPage'
import { ProjectsPage } from '@/features/projects/components/ProjectsPage'
import { FocusModePage } from '@/features/tasks/components/FocusModePage'
import { FollowUpsPage } from '@/features/followups/components/FollowUpsPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <BattleHudPage /> },
          { path: 'inbox', element: <InboxPage /> },
          { path: 'triage', element: <StrategyTablePage /> },
          { path: 'kanban', element: <KanbanPage /> },
          { path: 'calendario', element: <CalendarPage /> },
          { path: 'progreso', element: <ProgressPage /> },
          { path: 'follow-ups', element: <FollowUpsPage /> },
          { path: 'proyectos', element: <ProjectsPage /> },
          { path: 'foco/:taskId', element: <FocusModePage /> },
          { path: 'projects/:projectId/boss', element: <BossEncounterPage /> },
        ],
      },
    ],
  },
])
```

### src/app/statusItems.ts

```typescript
import { isPast } from 'date-fns'
import { Inbox, LifeBuoy, Link2, Sparkles, Swords, type LucideIcon } from 'lucide-react'
import { useHudTasks } from '@/features/battle-hud/hooks'
import { useActiveFollowUps } from '@/features/followups/hooks'
import { useStreak, useXpEarnedToday } from '@/features/gamification/hooks'
import { useActiveTasksWithDeadline, useInboxTasks } from '@/features/tasks/hooks'

const HUD_SLOTS = 3

export type Tone = 'calm' | 'neutral' | 'attention' | 'warn' | 'reward'

export const TONE_CLASS: Record<Tone, string> = {
  calm: 'text-fg-muted',
  neutral: 'text-fg',
  attention: 'text-accent',
  warn: 'text-warn-fg',
  reward: 'text-gold',
}

export interface RailItem {
  key: string
  to: string
  state?: unknown
  icon: LucideIcon
  value: string
  tone: Tone
  label: string
  detail: string
}


/** Los cinco indicadores de estado (compartidos por la barra lateral y la tarjeta del menú móvil). */
export function useStatusItems(): { items: RailItem[]; allClear: boolean } {
  const { data: hudTasks } = useHudTasks()
  const { data: activeDeadlines } = useActiveTasksWithDeadline()
  const { data: inbox } = useInboxTasks()
  const { data: followUps } = useActiveFollowUps()
  const { data: streak } = useStreak()
  const xpToday = useXpEarnedToday()

  const inBattle = hudTasks?.length ?? 0
  const overdue = activeDeadlines?.filter((t) => t.deadline && isPast(new Date(t.deadline))).length ?? 0
  const unsorted = inbox?.length ?? 0
  const followTotal = followUps?.length ?? 0
  const followDue = followUps?.filter((f) => isPast(new Date(f.next_reminder_at))).length ?? 0
  const streakDays = streak?.current_streak_days ?? 0

  const items: RailItem[] = [
    {
      key: 'battle',
      to: '/',
      icon: Swords,
      value: `${inBattle}/${HUD_SLOTS}`,
      tone: inBattle > 0 ? 'neutral' : 'calm',
      label: 'En batalla',
      detail: 'slots ocupados',
    },
    {
      key: 'rescue',
      to: '/kanban',
      state: { dateFilter: 'overdue' },
      icon: LifeBuoy,
      value: String(overdue),
      tone: overdue > 0 ? 'warn' : 'calm',
      label: 'Por rescatar',
      detail: 'pasadas de fecha',
    },
    {
      key: 'unsorted',
      to: '/triage',
      icon: Inbox,
      value: String(unsorted),
      tone: unsorted > 0 ? 'attention' : 'calm',
      label: 'Sin ordenar',
      detail: 'capturas en el Inbox',
    },
    {
      key: 'progress',
      to: '/progreso',
      icon: Sparkles,
      value: xpToday === undefined ? '—' : `+${xpToday}`,
      tone: xpToday ? 'reward' : 'calm',
      label: 'XP de hoy',
      detail: `racha de ${streakDays} ${streakDays === 1 ? 'día' : 'días'}`,
    },
    {
      key: 'follow',
      to: '/follow-ups',
      icon: Link2,
      value: `${followDue}/${followTotal}`,
      tone: followDue > 0 ? 'warn' : 'calm',
      label: 'Follow-ups',
      detail: followDue > 0 ? 'esperan tu contacto' : 'sin pendientes de contacto',
    },
  ]

  const allClear = overdue === 0 && unsorted === 0 && followDue === 0
  return { items, allClear }
}
```

### src/app/StatusRail.tsx

```tsx
import { Link } from 'react-router-dom'
import { Check, Pin, PinOff } from 'lucide-react'
import { TONE_CLASS, useStatusItems } from '@/app/statusItems'

// Visible solo en reposo expandido: al pasar el mouse, con el foco del teclado o si está fijada.
const REVEAL = 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'

/**
 * Barra de estado ejecutiva (solo pantallas anchas): cinco indicadores de un
 * vistazo, cada uno lleva a su vista. Reposo calmado: lo que vale 0 se ve
 * apagado y el color solo aparece cuando algo pide atención (ámbar para lo
 * pasado de fecha, nunca rojo). Se expande al pasar el mouse o con el foco del
 * teclado; la chincheta la mantiene abierta. No hace consultas propias: usa los
 * hooks que ya mantiene React Query (ver statusItems.ts).
 */
export function StatusRail({ pinned, onTogglePinned }: { pinned: boolean; onTogglePinned: () => void }) {
  const { items, allClear } = useStatusItems()
  const labelVisibility = pinned ? 'opacity-100' : REVEAL

  return (
    <aside
      aria-label="Estado"
      className={`group fixed bottom-0 right-0 top-16 z-20 hidden flex-col overflow-hidden border-l border-border bg-bg/80 backdrop-blur-md transition-[width,box-shadow] duration-150 motion-reduce:transition-none lg:flex ${
        pinned
          ? 'w-56'
          : 'w-16 hover:w-56 hover:border-border-glow hover:bg-surface/95 hover:shadow-2xl focus-within:w-56 focus-within:bg-surface/95 focus-within:shadow-2xl'
      }`}
    >
      <div className="flex h-11 shrink-0 items-center justify-between px-3">
        <span className={`whitespace-nowrap font-mono text-xs uppercase tracking-widest text-fg-muted transition-opacity ${labelVisibility}`}>
          Estado
        </span>
        <button
          type="button"
          onClick={onTogglePinned}
          aria-pressed={pinned}
          aria-label={pinned ? 'Soltar barra de estado' : 'Mantener barra de estado expandida'}
          title={pinned ? 'Soltar' : 'Mantener expandida'}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-glass/10 ${
            pinned ? 'text-accent' : 'mx-auto text-fg-muted hover:text-fg group-hover:mx-0 group-focus-within:mx-0'
          }`}
        >
          {pinned ? <PinOff className="h-4 w-4" aria-hidden="true" /> : <Pin className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      <nav className="flex flex-col">
        {items.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            state={item.state}
            className="flex min-h-14 items-center gap-3 px-3 py-2 transition-colors hover:bg-glass/5"
          >
            <span className="flex w-10 shrink-0 flex-col items-center gap-0.5">
              <item.icon className={`h-4 w-4 ${TONE_CLASS[item.tone]}`} aria-hidden="true" />
              <span className={`font-mono text-sm font-bold leading-none tabular-nums ${TONE_CLASS[item.tone]}`}>
                {item.value}
              </span>
            </span>
            <span className={`flex min-w-0 flex-col whitespace-nowrap transition-opacity ${labelVisibility}`}>
              <span className="font-display text-xs font-bold uppercase tracking-wider text-fg">{item.label}</span>
              <span className="font-mono text-xs text-fg-muted">{item.detail}</span>
            </span>
          </Link>
        ))}
      </nav>

      {allClear && (
        <div className="mt-auto flex items-center gap-3 px-3 py-4 text-accent">
          <Check className="mx-3 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className={`whitespace-nowrap font-mono text-xs transition-opacity ${labelVisibility}`}>Todo en orden</span>
        </div>
      )}
    </aside>
  )
}

/** Mismo resumen como tarjeta dentro del menú lateral, para pantallas sin barra (móvil/tablet). */
export function StatusSummaryCard({ onNavigate }: { onNavigate: () => void }) {
  const { items, allClear } = useStatusItems()

  return (
    <section aria-label="Estado" className="mx-4 mb-4 rounded-xl border border-border bg-surface-2/60 p-3 lg:hidden">
      <p className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-fg-muted">
        Estado
        {allClear && (
          <span className="flex items-center gap-1 normal-case tracking-normal text-accent">
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> Todo en orden
          </span>
        )}
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.key}>
            <Link
              to={item.to}
              state={item.state}
              onClick={onNavigate}
              className="flex min-h-11 items-center gap-3 rounded-lg px-1 transition-colors hover:bg-glass/5"
            >
              <item.icon className={`h-4 w-4 shrink-0 ${TONE_CLASS[item.tone]}`} aria-hidden="true" />
              <span className="flex-1 font-mono text-xs text-fg-muted">{item.label}</span>
              <span className={`font-mono text-sm font-bold tabular-nums ${TONE_CLASS[item.tone]}`}>{item.value}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

### src/components/ui/AchievementCelebration.tsx

```tsx
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'

export interface Achievement {
  id: string
  kicker: string
  title: string
  description: string
  icon: LucideIcon
}

const AUTO_DISMISS_MS = 3400

interface AchievementCelebrationProps {
  achievement: Achievement
  onDone: () => void
}

/**
 * Modal de celebracion para hitos reales (subir de rango, desbloquear loot,
 * cerrar quest semanal) — nunca decorativo constante. Interrumpible (click la cierra),
 * se auto-descarta, y respeta prefers-reduced-motion.
 */
export function AchievementCelebration({ achievement, onDone }: AchievementCelebrationProps) {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(onDone, AUTO_DISMISS_MS)

    const stage = stageRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (stage && !reduceMotion) {
      const rect = { w: stage.clientWidth, h: stage.clientHeight }
      const particles: HTMLDivElement[] = []
      for (let i = 0; i < 26; i++) {
        const p = document.createElement('div')
        p.className = 'achievement-burst'
        const angle = (Math.PI * 2 * i) / 26 + Math.random() * 0.3
        const dist = 90 + Math.random() * 70
        const dx = Math.cos(angle) * dist
        const dy = Math.sin(angle) * dist
        p.style.left = `${rect.w / 2}px`
        p.style.top = `${rect.h / 2}px`
        stage.appendChild(p)
        p.animate(
          [
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 },
          ],
          { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(.16,1,.3,1)', delay: 150 },
        )
        particles.push(p)
      }
      return () => {
        window.clearTimeout(timer)
        particles.forEach((p) => p.remove())
      }
    }

    return () => window.clearTimeout(timer)
  }, [achievement.id, onDone])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-shade/40 backdrop-blur-sm"
      onClick={onDone}
      role="status"
      aria-live="polite"
    >
      <div ref={stageRef} className="relative flex h-72 w-full max-w-sm items-center justify-center">
        <div className="achievement-modal relative rounded-2xl border border-gold bg-surface px-10 py-8 text-center">
          <div className="mx-auto mb-3.5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--gold-bright),var(--gold)_60%,#7a5a1e_100%)] text-3xl shadow-[inset_0_0_12px_rgba(0,0,0,0.35)]">
            <achievement.icon className="h-9 w-9 text-bg" aria-hidden="true" />
          </div>
          <div className="mb-1.5 font-mono text-xs uppercase tracking-[0.12em] text-gold-bright">
            {achievement.kicker}
          </div>
          <div className="font-display text-2xl font-black tracking-wide text-fg">
            {achievement.title}
          </div>
          <p className="mt-1.5 text-sm text-fg-muted">{achievement.description}</p>
        </div>
      </div>
    </div>
  )
}
```

### src/components/ui/AmbientBackground.tsx

```tsx
import { useMemo } from 'react'

interface Mote {
  left: number
  top: number
  size: number
  dx: number
  dy: number
  duration: number
  delay: number
  tone: 'a' | 'b'
}

function useMotes(count: number): Mote[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        top: 10 + Math.random() * 85,
        size: 3 + Math.random() * 5,
        dx: Math.random() * 120 - 60,
        dy: Math.random() * 90 - 60,
        duration: 14 + Math.random() * 16,
        delay: -Math.random() * 20,
        tone: i % 2 === 0 ? 'a' : 'b',
      })),
    [count],
  )
}

/**
 * Fondo ambiental global "bosque vivo". De noche: aurora rúnica + luciérnagas.
 * De día: haces de luz entre el follaje + polen dorado. El tema lo resuelve el
 * CSS (prefers-color-scheme), no este componente. Se congela con
 * prefers-reduced-motion.
 */
export function AmbientBackground() {
  const motes = useMotes(16)

  return (
    <div
      aria-hidden="true"
      className="ambient-root pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="ambient-aurora absolute -inset-1/5" />
      <div className="ambient-rays" />
      {motes.map((mote, i) => (
        <div
          key={i}
          className="ambient-mote"
          style={
            {
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              width: mote.size,
              height: mote.size,
              '--dx': `${mote.dx}px`,
              '--dy': `${mote.dy}px`,
              '--dur': `${mote.duration}s`,
              '--delay': `${mote.delay}s`,
              '--mote-c': `var(--mote-${mote.tone})`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
```

### src/components/ui/BrandMark.tsx

```tsx
// Marca de Questly: brote dentro de un rombo rúnico. Trazo con currentColor
// para heredar el color del contexto (acento en header, apagado en footers).
export function BrandMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2 22 12 12 22 2 12Z" />
      <path d="M12 18v-6" />
      <path d="M12 13.5C8.5 13.5 7.5 11 7.5 8.5 10.5 8.5 12 10 12 13.5Z" />
      <path d="M12 11.5C12 8.5 13.5 7 16.5 7 16.5 9.5 15 11.5 12 11.5Z" />
    </svg>
  )
}
```

### src/components/ui/toast-store.ts

```typescript
// Avisos efímeros globales. Store mínimo a nivel de módulo (sin Context ni
// librería): showToast() se puede llamar desde hooks de mutación fuera de React.
export type ToastTone = 'reward' | 'info'

export interface Toast {
  id: number
  title: string
  detail?: string
  tone: ToastTone
}

const DISMISS_MS = 3500
const MAX_VISIBLE = 3

let toasts: Toast[] = []

export function getToasts(): Toast[] {
  return toasts
}
let nextId = 1
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

export function showToast(input: { title: string; detail?: string; tone?: ToastTone }) {
  const toast: Toast = { id: nextId++, tone: 'info', ...input }
  toasts = [...toasts, toast].slice(-MAX_VISIBLE)
  emit()
  window.setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toast.id)
    emit()
  }, DISMISS_MS)
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
```

### src/components/ui/Toaster.tsx

```tsx
import { useSyncExternalStore } from 'react'
import { getToasts, subscribe } from '@/components/ui/toast-store'

export function Toaster() {
  const items = useSyncExternalStore(subscribe, getToasts)

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4"
    >
      {items.map((toast) => (
        <div
          key={toast.id}
          className={`toast-pop rounded-xl border bg-surface px-5 py-3 text-center shadow-2xl ${
            toast.tone === 'reward' ? 'border-gold' : 'border-border-glow'
          }`}
        >
          <p
            className={`font-display text-base font-black ${
              toast.tone === 'reward' ? 'text-gold-bright' : 'text-fg'
            }`}
          >
            {toast.title}
          </p>
          {toast.detail && <p className="font-mono text-xs text-fg-muted">{toast.detail}</p>}
        </div>
      ))}
    </div>
  )
}
```

### src/features/auth/AuthProvider.tsx

```tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextValue {
  session: Session | null
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession)
        setLoading(false)
      },
    )

    return () => subscription.subscription.unsubscribe()
  }, [])

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    loading,
    signOut: async () => {
      await supabase.auth.signOut()
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
```

### src/features/auth/components/LoginPage.tsx

```tsx
import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'
import { BrandMark } from '@/components/ui/BrandMark'
import { AmbientBackground } from '@/components/ui/AmbientBackground'

type Mode = 'magic' | 'password' | 'signup'

export function LoginPage() {
  const { session, loading: sessionLoading } = useAuth()
  const [mode, setMode] = useState<Mode>('magic')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [heroName, setHeroName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ kind: 'info' | 'error'; text: string } | null>(null)

  if (!sessionLoading && session) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      if (mode === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.origin },
        })
        if (error) throw error
        setMessage({ kind: 'info', text: '¡Enlace de acceso enviado al pergamino de correo!' })
      } else if (mode === 'password') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { hero_name: heroName.trim() } },
        })
        if (error) throw error
        setMessage({
          kind: 'info',
          text: 'Tu leyenda comienza ahora. Cuenta creada — revisa tu correo si requiere confirmación.',
        })
      }
    } catch (err) {
      setMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Algo no salió bien en el hechizo, probá de nuevo.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-bg px-4 py-8 text-fg">
      <AmbientBackground />

      <main className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Header Identidad Questly */}
        <header className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <div className="h-16 w-16">
              <BrandMark className="glyph-glow h-full w-full text-accent" />
            </div>
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight text-accent drop-shadow-[0_0_10px_rgb(var(--accent-rgb)/0.35)] sm:text-5xl">
            QUESTLY
          </h1>
          <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted">
            Maneja tus misiones. Conquista el caos.
          </p>
        </header>

        {/* Grimoire Card Container */}
        <section className="grimoire-card w-full overflow-hidden rounded-xl border border-border bg-surface">
          {/* Tabs Selector */}
          <nav className="flex border-b border-border">
            {(
              [
                { key: 'magic', label: 'Enlace Mágico' },
                { key: 'password', label: 'Contraseña' },
                { key: 'signup', label: 'Crear Cuenta' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setMode(tab.key)
                  setMessage(null)
                }}
                className={`flex-1 py-3.5 font-mono text-xs uppercase tracking-widest transition-all ${
                  mode === tab.key
                    ? 'tab-active font-semibold'
                    : 'text-fg-muted/60 hover:text-fg'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {mode === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold uppercase tracking-widest text-accent/90">
                    Nombre de Héroe
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Galahad"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    className="input-parchment w-full rounded-md px-4 py-2.5 text-sm text-fg"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-bold uppercase tracking-widest text-accent/90">
                  {mode === 'password' ? 'Correo Electrónico' : 'Dirección de Correo'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="caballero@reino.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-parchment w-full rounded-md px-4 py-2.5 text-sm text-fg"
                />
              </div>

              {mode !== 'magic' && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold uppercase tracking-widest text-accent/90">
                    Palabra Secreta
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-parchment w-full rounded-md px-4 py-2.5 text-sm text-fg"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-prime mt-2 w-full rounded-md py-3.5 font-display text-base tracking-wider disabled:opacity-60"
              >
                {submitting
                  ? 'Invocando…'
                  : mode === 'magic'
                    ? 'Enviar Enlace'
                    : mode === 'password'
                      ? 'Entrar a la Taberna'
                      : 'Forjar Destino'}
              </button>

              {mode === 'magic' && (
                <p className="text-center font-mono text-xs uppercase tracking-wider text-fg-muted/50">
                  Sin contraseñas, solo magia.
                </p>
              )}
            </form>

            {message && (
              <div
                className={`mt-4 rounded-md border p-3 text-center text-xs font-medium ${
                  message.kind === 'error'
                    ? 'border-warn-border bg-warn-bg text-warn-fg'
                    : 'border-accent/40 bg-accent/10 text-accent'
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </section>

        {/* Footer info */}
        <footer className="mt-8 text-center opacity-40 transition-opacity hover:opacity-100">
          <p className="font-mono text-xs tracking-tighter text-fg-muted">
            QUESTLY v4.0.1 — SOFTWARE DE GESTIÓN ÉPICA
          </p>
        </footer>
      </main>
    </div>
  )
}
```

### src/features/auth/components/ProfileMenu.tsx

```tsx
import { useState } from 'react'
import { CircleUserRound, LogOut } from 'lucide-react'
import { useAuth } from '@/features/auth/AuthProvider'

export function ProfileMenu() {
  const { session, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Mi Perfil"
        aria-label="Mi Perfil"
        className="flex items-center text-fg-muted transition-colors hover:text-fg"
      >
        <CircleUserRound className="h-5 w-5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="modal-panel panel-rune absolute right-0 z-50 mt-2 w-64 rounded-lg border border-border bg-surface p-2 shadow-xl">
            <div className="border-b border-border px-2 pb-2">
              <p className="text-sm font-medium text-fg">Mi Perfil</p>
              {session?.user.email && (
                <p className="mt-0.5 truncate font-mono text-xs text-fg-muted">
                  {session.user.email}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => void signOut()}
              className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-warn-fg"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  )
}
```

### src/features/battle-hud/api.ts

```typescript
import { supabase } from '@/lib/supabase'
import { updateTask } from '@/features/tasks/api'
import type { Task } from '@/types/database.types'

// Tareas equipadas en el Battle HUD (hasta 3 slots). Excluye 'done' y
// 'follow_up' — confirmado con Gemini: ninguno de los dos estados debe
// ocupar un slot de combate activo (Fase 7, Módulo 1).
export async function fetchHudTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .not('hud_slot', 'is', null)
    .not('status', 'in', '(done,follow_up)')
    .order('hud_slot', { ascending: true })
  if (error) throw error
  return data
}

// Backlog "equipable" para el GrimorioDrawer: tareas ya triadas (con columna
// de kanban asignada), de nivel superior, activas y todavía sin slot.
export async function fetchEquippableTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .is('hud_slot', null)
    .is('parent_task_id', null)
    .not('kanban_column_id', 'is', null)
    .in('status', ['pending', 'in_progress'])
    .order('deadline', { ascending: true, nullsFirst: false })
  if (error) throw error
  return data
}

// Equipar una misión a un slot también la pasa a 'in_progress' — así la
// ventana flotante de foco (FocusFloat, que lee tareas in_progress) siempre
// coincide con lo que está equipado en el HUD, sin duplicar el concepto de
// "tarea activa" en dos mecanismos separados.
export async function equipTaskToSlot(taskId: string, slot: number): Promise<Task> {
  return updateTask(taskId, { hud_slot: slot, status: 'in_progress' })
}

// "Devolver al Grimorio": libera el slot manteniendo el status previo.
export async function unequipTaskFromSlot(taskId: string): Promise<Task> {
  return updateTask(taskId, { hud_slot: null })
}
```

### src/features/battle-hud/components/BattleHudPage.tsx

```tsx
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollText, Shield, Sparkles, Zap } from 'lucide-react'
import { useEquipHudSlot, useHudTasks, useSuggestedTask } from '@/features/battle-hud/hooks'
import { useCategories } from '@/features/projects/hooks'
import { useCategoryXp, useClassRanks, useStreak } from '@/features/gamification/hooks'
import { CombatSlotCard } from '@/features/battle-hud/components/CombatSlotCard'
import { EmptySlotCard } from '@/features/battle-hud/components/EmptySlotCard'
import { StaminaRing } from '@/features/battle-hud/components/StaminaRing'
import { GrimorioDrawer } from '@/features/battle-hud/components/GrimorioDrawer'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { CLASS_ICONS } from '@/utils/classIcons'
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
  const HeroIcon = (dominantCategory && CLASS_ICONS[dominantCategory.name]) || Sparkles
  const dominantRank =
    classRanks?.find((r) => r.id === dominant?.current_rank_id) ??
    classRanks?.find((r) => r.category_id === dominant?.category_id && r.rank_order === 1)

  return (
    <header className="rune-frame mb-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md md:flex-row">
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-2 border-accent bg-surface-2 p-1 shadow-[0_0_12px_rgb(var(--accent-rgb)/0.35)]">
            <div
              className="flex h-full w-full items-center justify-center rounded-full"
              style={{ color: dominantCategory?.color_hex }}
              role="img"
              aria-label={`Clase: ${dominantCategory?.name ?? 'Aventurero'}`}
            >
              <HeroIcon className="h-8 w-8" aria-hidden="true" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 rounded border border-bg bg-accent px-1.5 font-mono text-xs font-black text-accent-fg">
            NV. {dominant?.current_level ?? 1}
          </div>
        </div>

        <div>
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-accent drop-shadow-[0_0_10px_rgb(var(--accent-rgb)/0.4)]">
            {dominantRank?.rank_name ?? dominantCategory?.class_name ?? 'Héroe de Questly'}
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
              Clase: {dominantCategory?.name ?? 'Aventurero'}
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="flex items-center gap-1 font-mono text-xs font-bold text-rune">
              <Shield className="h-3.5 w-3.5 fill-rune" />
              {streak?.shields_available ?? 0} ESCUDOS
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-mono text-xs uppercase text-fg-muted">Racha Actual</p>
          <p className="font-mono text-xs text-fg-muted/80">
            Escudo cada 7 días
          </p>
        </div>
        <StaminaRing days={streak?.current_streak_days ?? 0} />
      </div>
    </header>
  )
}

export function BattleHudPage() {
  const { data: hudTasks, isLoading } = useHudTasks()
  const suggestion = useSuggestedTask()
  const equip = useEquipHudSlot()
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
                suggestion={suggestion}
                onEquipSuggestion={() => suggestion && equip.mutate({ taskId: suggestion.id, slot })}
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
```

### src/features/battle-hud/components/CombatSlotCard.tsx

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crosshair, MoreVertical, Star, Swords } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask, useSubtasks } from '@/features/tasks/hooks'
import { useSendToFollowUp } from '@/features/followups/hooks'
import { useClearTodayPriority, useSetTodayPriority, useTodayQuests } from '@/features/gamification/hooks'
import { RescheduleButtons } from '@/features/tasks/components/RescheduleButtons'
import { isOverdue } from '@/utils/datetime'
import { useUnequipHudSlot } from '@/features/battle-hud/hooks'
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { Task, TaskSize } from '@/types/database.types'

const DIFFICULTY_LABEL: Record<TaskSize, { label: string; xp: number }> = {
  small: { label: 'Daga', xp: 10 },
  medium: { label: 'Espada', xp: 25 },
  large: { label: 'Mandoble', xp: 50 },
}

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

export function CombatSlotCard({
  task,
  onOpenTask,
}: {
  task: Task
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const { data: subtasks } = useSubtasks(task.id)
  const completeTask = useCompleteTask()
  const unequip = useUnequipHudSlot()
  const sendToFollowUp = useSendToFollowUp()
  const navigate = useNavigate()
  const { data: todayQuests } = useTodayQuests()
  const setPriority = useSetTodayPriority()
  const clearPriority = useClearTodayPriority()
  const isPriority = todayQuests?.find((q) => q.type === 'daily_priority')?.task_id === task.id

  const [menuOpen, setMenuOpen] = useState(false)
  const [animatingKill, setAnimatingKill] = useState(false)
  const [shaking, setShaking] = useState(false)

  const category = categories?.find((c) => c.id === task.category_id)
  const difficulty = task.size ? DIFFICULTY_LABEL[task.size] : null

  const hasSubtasks = !!subtasks && subtasks.length > 0
  const hpTotal = hasSubtasks ? subtasks!.length : 1
  const hpCurrent = hasSubtasks ? subtasks!.filter((s) => s.status !== 'done').length : 1
  const hpPercent = Math.round((hpCurrent / hpTotal) * 100)

  // Secuencia de animación táctil TDAH al asestar golpe final
  function handleGolpeFinal() {
    setShaking(true)
    setTimeout(() => {
      setShaking(false)
      setAnimatingKill(true)
      setTimeout(() => {
        completeTask.mutate({ id: task.id, project_id: task.project_id })
      }, 550)
    }, 280)
  }

  const categoryColor = category?.color_hex ?? '#7ccf6a'

  return (
    <article
      className={`combat-card group flex h-[420px] flex-col rounded-2xl p-6 ${
        shaking ? 'shake-anim' : ''
      } ${animatingKill ? 'animate-kill' : ''}`}
      style={
        {
          '--card-theme': categoryColor,
          '--card-glow': `${categoryColor}33`,
        } as React.CSSProperties
      }
    >
      {/* Header de Categoria e Insignia de Arma */}
      <div className="mb-4 flex items-start justify-between">
        <span
          className="rounded border px-2.5 py-1 font-mono text-xs font-black uppercase tracking-widest"
          style={{
            backgroundColor: `${categoryColor}20`,
            color: categoryColor,
            borderColor: `${categoryColor}40`,
          }}
        >
          {category?.name ?? 'Misión'}
        </span>
        <button
          type="button"
          onClick={() => (isPriority ? clearPriority.mutate() : setPriority.mutate(task.id))}
          aria-pressed={isPriority}
          aria-label={isPriority ? 'Quitar prioridad de hoy' : 'Marcar como prioridad de hoy'}
          title="Prioridad de hoy (+20 XP al terminarla)"
          className="flex h-11 w-11 items-center justify-center rounded-lg transition-transform hover:scale-110 active:scale-95"
        >
          <Star className={`h-6 w-6 ${isPriority ? 'fill-gold text-gold' : 'text-fg-muted'}`} aria-hidden="true" />
        </button>
        {task.size && (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-shade/40 shadow-inner"
            title={`${difficulty?.label} (${difficulty?.xp} XP)`}
          >
            <img
              src={WEAPON_ICONS[task.size]}
              alt={difficulty?.label}
              className="h-6 w-6 object-contain drop-shadow-[0_0_4px_rgb(var(--accent-rgb)/0.4)]"
            />
          </div>
        )}
      </div>

      {/* Cuerpo Principal: Titulo & HP */}
      <div className="flex-1">
        <button
          type="button"
          onClick={() => onOpenTask(task)}
          className="w-full text-left"
        >
          <h2 className="mb-2 font-display text-2xl font-bold leading-tight text-fg transition-colors group-hover:text-accent">
            {task.title}
          </h2>
        </button>
        {isOverdue(task) && (
          <div className="mb-3">
            <p className="mb-2 font-mono text-xs text-gold">Rescate: termínala y gana XP extra, o reprográmala sin culpa.</p>
            <RescheduleButtons task={task} />
          </div>
        )}
        <p className="mb-6 font-mono text-xs text-fg-muted/70">
          {hasSubtasks
            ? `Submisiones: ${hpTotal - hpCurrent} / ${hpTotal}`
            : 'Misión Directa'}
        </p>

        {/* Barra de HP Segmentada */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between font-mono text-xs uppercase text-fg-muted">
            <span>Integridad del Enemigo</span>
            <span className={hpCurrent === 0 ? 'font-bold text-gold' : ''}>
              {hpPercent}%
            </span>
          </div>
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${Math.max(hpTotal, 1)}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: hpTotal }).map((_, i) => (
              <div
                key={i}
                className={`hp-segment ${i < hpCurrent ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Acciones de Combate en el Pie */}
      <div className="space-y-3 pt-2">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigate(`/foco/${task.id}`)}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-glass/10 bg-glass/5 py-3 font-mono text-xs font-black uppercase tracking-widest text-fg-muted transition-all hover:bg-glass/10 hover:text-fg active:scale-95"
          >
            <Crosshair className="h-3.5 w-3.5" /> Atacar
          </button>
          <button
            type="button"
            onClick={handleGolpeFinal}
            className="btn-prime flex items-center justify-center gap-1.5 rounded-lg py-3 font-mono text-xs font-black uppercase tracking-widest"
          >
            <Swords className="h-3.5 w-3.5" /> Golpe Final
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="w-full py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted/50 transition-opacity hover:text-fg"
          >
            <MoreVertical className="mr-1 inline h-3 w-3" /> Retirada Táctica
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="modal-panel panel-rune absolute bottom-full right-0 z-50 mb-2 w-52 rounded-xl border border-border bg-surface p-1.5 shadow-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    sendToFollowUp.mutate({
                      taskId: task.id,
                      intervalDays: DEFAULT_FOLLOW_UP_INTERVAL_DAYS,
                      stakeholderName: null,
                    })
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-mono text-xs text-fg-muted transition-colors hover:bg-surface-2 hover:text-rune"
                >
                  Mover a Follow-up
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    unequip.mutate(task.id)
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-mono text-xs text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  Devolver al Grimorio
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
```

### src/features/battle-hud/components/EmptySlotCard.tsx

```tsx
import { Plus, Sparkles } from 'lucide-react'
import type { Task } from '@/types/database.types'

const SLOT_ROMAN = ['I', 'II', 'III']

export function EmptySlotCard({
  slot,
  onEquip,
  suggestion,
  onEquipSuggestion,
}: {
  slot: number
  onEquip: () => void
  suggestion: Task | null
  onEquipSuggestion: () => void
}) {
  return (
    <article className="empty-slot-card group flex h-[420px] flex-col items-center justify-center rounded-2xl p-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-border transition-colors group-hover:border-accent">
        <Plus className="h-8 w-8 text-fg-muted/30 transition-all group-hover:scale-110 group-hover:text-accent" />
      </div>
      <h3 className="mb-2 font-display text-xl text-fg-muted/50 group-hover:text-fg">
        Slot {SLOT_ROMAN[slot - 1] ?? slot} Disponible
      </h3>
      <p className="mb-8 max-w-[200px] font-mono text-xs text-fg-muted/40">
        No hay misiones equipadas en este flanco táctico.
      </p>
      <div className="flex w-full max-w-[240px] flex-col gap-2.5">
        {suggestion && (
          <button
            type="button"
            onClick={onEquipSuggestion}
            className="btn-prime flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Elegir por mí
          </button>
        )}
        {suggestion && (
          <p className="truncate font-mono text-xs text-fg-muted" title={suggestion.title}>
            Sugerida: {suggestion.title}
          </p>
        )}
        <button
          type="button"
          onClick={onEquip}
          className="rounded-full border border-accent px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-accent transition-all hover:bg-accent hover:text-accent-fg active:scale-95"
        >
          {suggestion ? 'Elegir yo' : 'Equipar Misión'}
        </button>
      </div>
    </article>
  )
}
```

### src/features/battle-hud/components/GrimorioDrawer.tsx

```tsx
import { useState } from 'react'
import { format } from 'date-fns'
import { X } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useEquipHudSlot, useEquippableTasks, useSuggestedTask } from '@/features/battle-hud/hooks'

export function GrimorioDrawer({ slot, onClose }: { slot: number; onClose: () => void }) {
  const { data: tasks, isLoading } = useEquippableTasks()
  const { data: categories } = useCategories()
  const equip = useEquipHudSlot()
  const suggested = useSuggestedTask()
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  const filtered = tasks
    ?.filter((t) => !activeCategoryId || t.category_id === activeCategoryId)
    .sort((a, b) => Number(b.id === suggested?.id) - Number(a.id === suggested?.id))

  function handleEquip(taskId: string) {
    equip.mutate({ taskId, slot }, { onSuccess: onClose })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-shade/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-panel panel-rune flex h-full w-full max-w-sm flex-col border-l border-border bg-surface p-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold tracking-tight text-fg">
            Grimorio — Slot {slot}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-fg-muted transition-colors hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 text-sm text-fg-muted">Elige una misión del backlog para equipar.</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveCategoryId(null)}
            className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
              !activeCategoryId ? 'border-transparent bg-accent/15 text-accent' : 'border-border text-fg-muted'
            }`}
          >
            Todas
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                activeCategoryId === cat.id ? 'border-transparent text-fg' : 'border-border text-fg-muted/60'
              }`}
              style={activeCategoryId === cat.id ? { backgroundColor: `${cat.color_hex}22` } : undefined}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">
          {isLoading && <p className="text-sm text-fg-muted">Cargando…</p>}
          {!isLoading && (!filtered || filtered.length === 0) && (
            <p className="text-sm text-fg-muted">No hay misiones disponibles para equipar.</p>
          )}
          {filtered && filtered.length > 0 && (
            <ul className="flex flex-col gap-2">
              {filtered.map((task) => {
                const category = categories?.find((c) => c.id === task.category_id)
                return (
                  <li key={task.id}>
                    <button
                      type="button"
                      onClick={() => handleEquip(task.id)}
                      className="flex w-full items-center gap-2 rounded-md border border-border bg-surface-2 p-2.5 text-left text-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/40"
                      style={category ? { borderLeftWidth: '3px', borderLeftColor: category.color_hex } : undefined}
                    >
                      <span className="min-w-0 flex-1 truncate text-fg">{task.title}</span>
                      {task.id === suggested?.id && (
                        <span className="shrink-0 rounded-full bg-accent/20 px-2 py-0.5 font-mono text-xs font-bold uppercase text-accent">
                          Sugerida
                        </span>
                      )}
                      {task.deadline && (
                        <span className="shrink-0 font-mono text-xs text-fg-muted">
                          {format(new Date(task.deadline), 'd MMM')}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
```

### src/features/battle-hud/components/StaminaRing.tsx

```tsx
// Anillo de estamina: progreso de la racha hacia el próximo escudo (cada 7 días).
// Solo se llena; romper la racha no "vacía" nada visible aquí (diseño sin culpa).
const SHIELD_EVERY_DAYS = 7
const RADIUS = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function StaminaRing({ days }: { days: number }) {
  const inCycle = days > 0 && days % SHIELD_EVERY_DAYS === 0 ? SHIELD_EVERY_DAYS : days % SHIELD_EVERY_DAYS
  const offset = CIRCUMFERENCE * (1 - inCycle / SHIELD_EVERY_DAYS)

  return (
    <div
      className="relative h-20 w-20 shrink-0"
      role="img"
      aria-label={`Racha de ${days} días, ${inCycle} de ${SHIELD_EVERY_DAYS} para el próximo escudo`}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="var(--border)" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)', filter: 'drop-shadow(0 0 4px rgb(var(--accent-rgb) / 0.6))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-black leading-none text-accent">{days}</span>
        <span className="font-mono text-xs uppercase text-fg-muted">días</span>
      </div>
    </div>
  )
}
```

### src/features/battle-hud/hooks.ts

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTodayQuests } from '@/features/gamification/hooks'
import { equipTaskToSlot, fetchEquippableTasks, fetchHudTasks, unequipTaskFromSlot } from '@/features/battle-hud/api'

export function useHudTasks() {
  return useQuery({ queryKey: ['battle-hud', 'tasks'], queryFn: fetchHudTasks })
}

export function useEquippableTasks() {
  return useQuery({ queryKey: ['battle-hud', 'equippable'], queryFn: fetchEquippableTasks })
}

function useInvalidateHud() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['battle-hud'] })
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  }
}

export function useEquipHudSlot() {
  const invalidate = useInvalidateHud()
  return useMutation({
    mutationFn: ({ taskId, slot }: { taskId: string; slot: number }) =>
      equipTaskToSlot(taskId, slot),
    onSuccess: invalidate,
  })
}

export function useUnequipHudSlot() {
  const invalidate = useInvalidateHud()
  return useMutation({
    mutationFn: unequipTaskFromSlot,
    onSuccess: invalidate,
  })
}

// Misión sugerida para un slot libre: primero la prioridad del día (si el
// usuario la marcó y no está equipada); si no, la de deadline más cercano.
// El backlog ya viene ordenado por deadline ascendente (fetchEquippableTasks).
export function useSuggestedTask() {
  const { data: tasks } = useEquippableTasks()
  const { data: todayQuests } = useTodayQuests()
  const priorityId = todayQuests?.find((q) => q.type === 'daily_priority')?.task_id
  const list = tasks ?? []
  return list.find((t) => t.id === priorityId) ?? list[0] ?? null
}
```

### src/features/calendar/components/CalendarHeatmapView.tsx

```tsx
import { Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { addDays, format, isSameDay, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { useCategories } from '@/features/projects/hooks'
import { CalendarQuickAdd } from '@/features/calendar/components/CalendarQuickAdd'
import { RescheduleButtons } from '@/features/tasks/components/RescheduleButtons'
import type { Task } from '@/types/database.types'

export function CalendarHeatmapView({
  tasks,
  onOpenTask,
}: {
  tasks: Task[]
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [adding, setAdding] = useState(false)

  // Mostrar 21 días (3 semanas)
  const startDate = startOfDay(new Date())
  const days = Array.from({ length: 21 }, (_, i) => addDays(startDate, i))

  const selectedTasks = tasks
    .filter((t) => t.deadline && isSameDay(new Date(t.deadline), selectedDate))
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Cuadrícula Astral Principal */}
      <div className="lg:col-span-2 space-y-6">
        <header className="mb-2">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-fg-muted/60">
            Predicción de Carga y Misiones
          </p>
        </header>

        {/* Encabezados Día de la Semana */}
        <div className="grid grid-cols-7 text-center font-mono text-xs uppercase tracking-widest text-fg-muted/50">
          <div>Lun</div>
          <div>Mar</div>
          <div>Mié</div>
          <div>Jue</div>
          <div>Vie</div>
          <div className="text-amber-500/70">Sáb</div>
          <div className="text-amber-500/70">Dom</div>
        </div>

        {/* Celdas de la Cuadrícula */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((dayDate) => {
            const dayTasks = tasks.filter(
              (t) => t.deadline && isSameDay(new Date(t.deadline), dayDate),
            )
            const count = dayTasks.filter((t) => t.status !== 'done').length
            const isSelected = isSameDay(dayDate, selectedDate)

            const heatClass =
              count > 3 ? 'heat-high' : count > 1 ? 'heat-mid' : 'heat-low'

            return (
              <div
                key={format(dayDate, 'yyyy-MM-dd')}
                onClick={() => setSelectedDate(dayDate)}
                className={`grid-day-cell rounded-2xl p-2 flex flex-wrap gap-1 content-start ${heatClass} ${
                  isSelected ? 'selected' : ''
                }`}
              >
                {/* Gemas de Categoría */}
                {dayTasks.map((t) => {
                  const category = categories?.find((c) => c.id === t.category_id)
                  const gemColor = category?.color_hex ?? '#d9a94a'
                  return (
                    <div
                      key={t.id}
                      className="gem-rune"
                      style={{ backgroundColor: gemColor, color: gemColor, opacity: t.status === 'done' ? 0.3 : 1 }}
                    />
                  )
                })}

                <span className="absolute bottom-1.5 right-2 font-mono text-xs text-fg-muted/40 font-bold">
                  {format(dayDate, 'd')}
                </span>
              </div>
            )
          })}
        </div>

        {/* Leyenda de Categorías */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-border/40">
          {categories?.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: cat.color_hex }}
              />
              <span className="font-mono text-xs uppercase font-bold text-fg-muted/60">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Lateral: Jornada Escogida */}
      <aside className="rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-md flex flex-col h-[520px]">
        <div className="border-b border-border pb-4 mb-4">
          <h2 className="font-display text-lg font-bold text-accent uppercase tracking-wide">
            Jornada Escogida
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60 mt-0.5">
            {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mb-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-accent/50 py-3 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent/10"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Añadir misión a este día
        </button>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {selectedTasks.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center opacity-40">
              <Sparkles className="mb-3 h-12 w-12" aria-hidden="true" />
              <p className="font-display text-xs uppercase tracking-widest">
                Escudriña el tablero para ver el destino
              </p>
            </div>
          ) : (
            selectedTasks.map((task) => {
              const category = categories?.find((c) => c.id === task.category_id)
              return (
                <div
                  key={task.id}
                  onClick={() => onOpenTask(task)}
                  className={`cursor-pointer rounded-2xl border border-border bg-shade/30 p-3.5 transition-all hover:border-accent ${
                    task.status === 'done' ? 'opacity-60' : ''
                  }`}
                >
                  <p className="font-mono text-xs uppercase text-fg-muted/50 mb-1">
                    {format(new Date(task.deadline!), 'HH:mm')} HS
                  </p>
                  <h4
                    className={`font-display text-sm font-bold ${
                      task.status === 'done' ? 'text-fg-muted line-through' : 'text-fg'
                    }`}
                  >
                    {task.title}
                  </h4>
                  {category && (
                    <span
                      className="mt-2 inline-block rounded px-2 py-0.5 font-mono text-xs font-black uppercase"
                      style={{
                        backgroundColor: `${category.color_hex}25`,
                        color: category.color_hex,
                      }}
                    >
                      {category.name}
                    </span>
                  )}
                  {task.status !== 'done' && (
                    <div className="mt-2.5">
                      <RescheduleButtons task={task} mode="from-deadline" label="Mover:" />
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </aside>

      {adding && <CalendarQuickAdd day={selectedDate} onClose={() => setAdding(false)} />}
    </div>
  )
}
```

### src/features/calendar/components/CalendarPage.tsx

```tsx
import { Sparkles, Hourglass } from 'lucide-react'
import { useState } from 'react'
import { addDays, endOfDay, startOfDay, subDays } from 'date-fns'
import { useTasksInRange } from '@/features/tasks/hooks'
import { CalendarTimelineView } from '@/features/calendar/components/CalendarTimelineView'
import { CalendarHeatmapView } from '@/features/calendar/components/CalendarHeatmapView'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

type CalendarMode = 'timeline' | 'heatmap'

export function CalendarPage() {
  const [mode, setMode] = useState<CalendarMode>(() => {
    return (localStorage.getItem('questly_calendar_mode') as CalendarMode) || 'timeline'
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showDone, setShowDone] = useState(() => localStorage.getItem('questly_calendar_show_done') !== 'false')

  // Rango de consulta con margen: 2 días atrás (cubre deadlines de "hoy" ya
  // pasados en la hora actual y variación de zona horaria) hasta 21 días
  // adelante, día completo en ambos extremos.
  const today = new Date()
  const rangeStart = startOfDay(subDays(today, 2))
  const rangeEnd = endOfDay(addDays(today, 21))

  const { data: tasks, isLoading } = useTasksInRange(
    rangeStart.toISOString(),
    rangeEnd.toISOString(),
  )

  function handleShowDoneChange(next: boolean) {
    setShowDone(next)
    localStorage.setItem('questly_calendar_show_done', String(next))
  }

  const visibleTasks = showDone ? (tasks ?? []) : (tasks ?? []).filter((t) => t.status !== 'done')

  function handleModeChange(nextMode: CalendarMode) {
    setMode(nextMode)
    localStorage.setItem('questly_calendar_mode', nextMode)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      {/* Header Titular & Toggle Dual */}
      <header className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-border pb-6 md:flex-row">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-widest text-accent">
            EL ORÁCULO DEL TIEMPO
          </h1>
          <p className="font-mono text-xs text-fg-muted/70">
            Alineación temporal de enfrentamientos e hitos.
          </p>
        </div>

        <label className="flex min-h-11 cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted">
          <input
            type="checkbox"
            checked={showDone}
            onChange={(e) => handleShowDoneChange(e.target.checked)}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          Mostrar completadas
        </label>

        {/* Toggle Dual Chrono-Stream / Mapa Astral */}
        <div className="view-mode-toggle flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleModeChange('timeline')}
            className={`view-mode-btn ${mode === 'timeline' ? 'active' : ''}`}
          >
            <Hourglass className="mr-1.5 inline h-4 w-4" aria-hidden="true" /> Chrono-Stream
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('heatmap')}
            className={`view-mode-btn ${mode === 'heatmap' ? 'active' : ''}`}
          >
            <Sparkles className="mr-1.5 inline h-4 w-4" aria-hidden="true" /> Mapa Astral
          </button>
        </div>
      </header>

      {/* Renderizado de la Vista Seleccionada */}
      <main>
        {isLoading ? (
          <p className="py-12 text-center font-mono text-xs text-fg-muted">
            Consultando al Oráculo…
          </p>
        ) : mode === 'timeline' ? (
          <CalendarTimelineView
            tasks={visibleTasks}
            onOpenTask={setEditingTask}
          />
        ) : (
          <CalendarHeatmapView
            tasks={visibleTasks}
            onOpenTask={setEditingTask}
          />
        )}
      </main>

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
```

### src/features/calendar/components/CalendarQuickAdd.tsx

```tsx
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { X } from 'lucide-react'
import { showToast } from '@/components/ui/toast-store'
import { fetchFirstColumnId } from '@/features/kanban/api'
import { useCategories } from '@/features/projects/hooks'
import { useCreateTask } from '@/features/tasks/hooks'
import { WeaponSelector } from '@/features/triage/components/WeaponSelector'
import type { TaskSize } from '@/types/database.types'

// Hora por defecto de una misión creada desde el calendario: 18:00; si ya pasó
// (hoy), 23:00 para que no nazca ya "por rescatar".
function defaultDeadline(day: Date): Date {
  const d = new Date(day)
  d.setHours(18, 0, 0, 0)
  if (d.getTime() <= Date.now()) d.setHours(23, 0, 0, 0)
  return d
}

function lastTriageCategory(): string {
  try {
    const raw = localStorage.getItem('questly_triage_last')
    if (raw) return (JSON.parse(raw) as { categoryId?: string }).categoryId ?? ''
  } catch {
    // sin recuerdo
  }
  return ''
}

/** Alta rápida de una misión ya ordenada (clase + arma) para un día concreto. */
export function CalendarQuickAdd({ day, onClose }: { day: Date; onClose: () => void }) {
  const { data: categories } = useCategories()
  const createTask = useCreateTask()
  const inputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState(lastTriageCategory)
  const [size, setSize] = useState<TaskSize | null>(null)
  const [showErrors, setShowErrors] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    inputRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const missing = [!title.trim() && 'título', !categoryId && 'clase', !size && 'arma'].filter(Boolean) as string[]

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (missing.length > 0) {
      setShowErrors(true)
      return
    }
    setSaving(true)
    try {
      const kanbanColumnId = await fetchFirstColumnId(null)
      await createTask.mutateAsync({
        title: title.trim(),
        category_id: categoryId,
        size,
        kanban_column_id: kanbanColumnId,
        deadline: defaultDeadline(day).toISOString(),
      })
      showToast({ title: 'Misión añadida', detail: format(day, "d 'de' MMMM", { locale: es }) })
      onClose()
    } catch {
      setSaving(false)
      showToast({ title: 'No se pudo añadir', detail: 'Inténtalo de nuevo.' })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-shade/50 p-4 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="modal-panel panel-rune w-full max-w-md space-y-4 rounded-2xl border border-border bg-surface p-5"
      >
        <header className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-accent">Nueva misión</h2>
            <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
              {format(day, "EEEE d 'de' MMMM", { locale: es })}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="flex h-11 w-11 items-center justify-center rounded-lg text-fg-muted hover:text-fg">
            <X className="h-5 w-5" />
          </button>
        </header>

        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Qué hay que hacer ese día?"
          aria-label="Título de la misión"
          className="input-parchment w-full rounded-xl px-4 py-3 text-base text-fg"
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          aria-label="Clase"
          className="parchment-select w-full rounded-xl p-3 text-base"
        >
          <option value="" disabled>Elegir clase</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>{c.name} ({c.class_name})</option>
          ))}
        </select>

        <WeaponSelector value={size} onChange={setSize} />

        {showErrors && missing.length > 0 && (
          <p role="alert" className="rounded-lg border border-warn-border bg-warn-bg px-3 py-2 font-mono text-xs font-medium text-warn-fg">
            Falta: {missing.join(', ')}.
          </p>
        )}

        <button type="submit" disabled={saving} className="btn-prime w-full rounded-xl py-3.5 font-display text-sm font-black uppercase tracking-widest disabled:opacity-50">
          Añadir al día
        </button>
      </form>
    </div>
  )
}
```

### src/features/calendar/components/CalendarTimelineView.tsx

```tsx
import { useState } from 'react'
import { addDays, format, isToday, isSameDay, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { AlertTriangle, Calendar as CalendarIcon, Check, Plus } from 'lucide-react'
import { showToast } from '@/components/ui/toast-store'
import { useCategories } from '@/features/projects/hooks'
import { useMoveTaskDeadline } from '@/features/tasks/hooks'
import { deadlineOnDay } from '@/utils/datetime'
import { CalendarQuickAdd } from '@/features/calendar/components/CalendarQuickAdd'
import { RescheduleButtons } from '@/features/tasks/components/RescheduleButtons'
import type { Task, TaskSize } from '@/types/database.types'

// Carga de energía por misión según su arma (antes: 20 % fijo por misión, así
// que 5 dagas pesaban lo mismo que 5 mandobles). Sin arma: peso medio-bajo.
const ENERGY_WEIGHT: Record<TaskSize, number> = { small: 10, medium: 20, large: 35 }
const ENERGY_WEIGHT_UNSIZED = 15

export function CalendarTimelineView({
  tasks,
  onOpenTask,
}: {
  tasks: Task[]
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const [daysCount, setDaysCount] = useState<3 | 7 | 14>(7)
  const [addingDay, setAddingDay] = useState<Date | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overDay, setOverDay] = useState<string | null>(null)
  const moveTask = useMoveTaskDeadline()

  // Soltar una misión sobre otro día: mismo horario, nueva fecha.
  function handleDrop(day: Date) {
    const task = tasks.find((t) => t.id === draggingId)
    setDraggingId(null)
    setOverDay(null)
    if (!task?.deadline || isSameDay(new Date(task.deadline), day)) return
    moveTask.mutate(
      { taskId: task.id, deadlineIso: deadlineOnDay(day, task.deadline) },
      { onSuccess: () => showToast({ title: 'Misión movida', detail: format(day, "EEEE d 'de' MMMM", { locale: es }) }) },
    )
  }

  // Inicio del día: con la hora exacta de "ahora" cada render generaba claves
  // distintas por día, así que React volvía a montar todas las secciones (y la
  // tarjeta arrastrada) y el navegador cancelaba el arrastre.
  const today = startOfDay(new Date())
  const days = Array.from({ length: daysCount }, (_, i) => addDays(today, i))

  function scrollToToday() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      {/* Controles de Rango de Días & Ir a Hoy */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4">
        <button
          type="button"
          onClick={scrollToToday}
          className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs font-black uppercase text-accent transition-all hover:bg-accent hover:text-accent-fg"
        >
          Ir a Hoy
        </button>

        <div className="flex items-center gap-1 rounded-xl border border-border bg-shade/40 p-1">
          {([3, 7, 14] as const).map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setDaysCount(count)}
              className={`rounded-lg px-3 py-1 font-mono text-xs font-bold uppercase transition-all ${
                daysCount === count
                  ? 'bg-accent text-accent-fg shadow'
                  : 'text-fg-muted hover:text-fg'
              }`}
            >
              {count} Días
            </button>
          ))}
        </div>
      </div>

      {/* Stream Vertical Cronológico */}
      <p className="hidden font-mono text-xs text-fg-muted md:block">
        Arrastra una misión pendiente a otro día para moverla. En el celular, usa los botones Mover.
      </p>

      <div className="chrono-stream-line relative space-y-8 pl-4 pr-2">
        {days.map((dayDate) => {
          const isDayToday = isToday(dayDate)
          const dayTasks = tasks.filter(
            (t) => t.deadline && isSameDay(new Date(t.deadline), dayDate),
          )

          // Consumo de energía del día: suma de pesos por arma, tope 100 %.
          const energyUsage = Math.min(
            100,
            dayTasks
              .filter((t) => t.status !== 'done')
              .reduce((sum, t) => sum + (t.size ? ENERGY_WEIGHT[t.size] : ENERGY_WEIGHT_UNSIZED), 0),
          )
          const isFatigueHigh = energyUsage >= 80

          return (
            <section
              key={format(dayDate, 'yyyy-MM-dd')}
              onDragOver={(e) => {
                if (!draggingId) return
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move'
                setOverDay(format(dayDate, 'yyyy-MM-dd'))
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOverDay(null)
              }}
              onDrop={(e) => {
                e.preventDefault()
                handleDrop(dayDate)
              }}
              className={`relative rounded-xl py-3 pl-12 pr-4 transition-all ${
                isDayToday ? 'node-today-active' : ''
              } ${draggingId && overDay === format(dayDate, 'yyyy-MM-dd') ? 'bg-rune/10 ring-2 ring-rune/60' : ''}`}
            >
              {/* Punto del Nodo */}
              <div className="day-node-dot" />

              {/* Encabezado del Día */}
              <header className="mb-3 flex items-end justify-between">
                <div>
                  <h3
                    className={`font-display text-base font-bold capitalize ${
                      isDayToday ? 'text-accent' : 'text-fg-muted/80'
                    }`}
                  >
                    {isDayToday
                      ? 'Hoy'
                      : format(dayDate, 'EEEE', { locale: es })}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/50">
                    {format(dayDate, 'd MMMM', { locale: es })}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAddingDay(dayDate)}
                    className="mt-1.5 flex items-center gap-1 rounded-lg px-2 py-2 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent/10"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Añadir
                  </button>
                </div>

                {/* Medidor de Energía */}
                <div className="w-28 text-right">
                  <div className="mb-1 flex justify-between font-mono text-xs font-bold uppercase text-fg-muted/60">
                    <span>Energía</span>
                    <span className={isFatigueHigh ? 'font-black text-warn-fg' : ''}>
                      {energyUsage}%
                    </span>
                  </div>
                  <div className="energy-meter-track w-full">
                    <div
                      className={`h-full transition-all duration-700 ${
                        isFatigueHigh
                          ? 'bg-warn-dot'
                          : energyUsage > 40
                            ? 'bg-amber-500'
                            : 'bg-accent'
                      }`}
                      style={{ width: `${energyUsage}%` }}
                    />
                  </div>
                </div>
              </header>

              {/* Aviso de Fatiga */}
              {isFatigueHigh && (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-warn-border bg-warn-bg p-2 text-warn-fg">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <p className="font-mono text-xs font-bold uppercase tracking-tight">
                    Aviso de Fatiga: Carga de misiones elevada
                  </p>
                </div>
              )}

              {/* Lista de Misiones del Día */}
              <div className="space-y-2.5">
                {dayTasks.length === 0 ? (
                  <p className="font-mono text-xs italic text-fg-muted/40">
                    Sin misiones agendadas para esta fecha.
                  </p>
                ) : (
                  dayTasks.map((task) => {
                    const category = categories?.find((c) => c.id === task.category_id)
                    return (
                      <article
                        key={task.id}
                        onClick={() => onOpenTask(task)}
                        draggable={task.status !== 'done'}
                        onDragStart={(e) => {
                          e.dataTransfer.effectAllowed = 'move'
                          e.dataTransfer.setData('text/plain', task.id)
                          setDraggingId(task.id)
                        }}
                        onDragEnd={() => {
                          setDraggingId(null)
                          setOverDay(null)
                        }}
                        title={task.status !== 'done' ? 'Arrastra a otro día para moverla' : undefined}
                        className={`mission-scroll-card flex ${
                          task.status !== 'done' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                        } ${draggingId === task.id ? 'opacity-40' : ''} items-center justify-between rounded-xl p-3.5 transition-all ${
                          task.status === 'done' ? 'opacity-60' : ''
                        }`}
                        style={
                          category
                            ? { borderLeftColor: category.color_hex }
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <span className="font-mono text-xs text-fg-muted/60">
                            {format(new Date(task.deadline!), 'HH:mm')}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4
                              className={`truncate font-display text-sm font-bold ${
                                task.status === 'done' ? 'text-fg-muted line-through' : 'text-fg'
                              }`}
                            >
                              {task.title}
                            </h4>
                            {category && (
                              <span
                                className="inline-block rounded px-1.5 py-0.5 font-mono text-xs font-black uppercase"
                                style={{
                                  backgroundColor: `${category.color_hex}25`,
                                  color: category.color_hex,
                                }}
                              >
                                {category.name}
                              </span>
                            )}
                            {task.status !== 'done' && (
                              <div className="mt-2">
                                <RescheduleButtons task={task} mode="from-deadline" label="Mover:" />
                              </div>
                            )}
                          </div>
                        </div>
                        {task.status === 'done' ? (
                          <Check className="h-4 w-4 shrink-0 text-accent" aria-label="Completada" />
                        ) : (
                          <CalendarIcon className="h-4 w-4 shrink-0 opacity-20 transition-opacity hover:opacity-100 text-accent" />
                        )}
                      </article>
                    )
                  })
                )}
              </div>
            </section>
          )
        })}
      </div>

      {addingDay && <CalendarQuickAdd day={addingDay} onClose={() => setAddingDay(null)} />}
    </div>
  )
}
```

### src/features/followups/api.ts

```typescript
import { closeFollowUpForTask, reopenTask } from '@/features/tasks/api'
import { supabase } from '@/lib/supabase'
import type { Database, FollowUp, FollowUpLog } from '@/types/database.types'

// Solo follow-ups sin resolver — usada tanto por la página de Follow-ups
// como por el sync de notificaciones (no tiene sentido alertar sobre un
// seguimiento ya resuelto, ver migración 20260727000001).
export async function fetchFollowUps(): Promise<FollowUp[]> {
  const { data, error } = await supabase
    .from('follow_ups')
    .select('*')
    .is('resolved_at', null)
    .order('next_reminder_at', { ascending: true })
  if (error) throw error
  return data
}

export async function fetchFollowUpForTask(taskId: string): Promise<FollowUp | null> {
  const { data, error } = await supabase
    .from('follow_ups')
    .select('*')
    .eq('task_id', taskId)
    .is('resolved_at', null)
    .maybeSingle()
  if (error) throw error
  return data
}

export type NewFollowUp = Pick<
  Database['public']['Tables']['follow_ups']['Insert'],
  'task_id' | 'stakeholder_name' | 'interval_days' | 'notes'
>

// Upsert por task_id (unique): si la tarea ya tuvo un seguimiento resuelto, se
// reactiva conservando su bitácora; last_contacted_at reinicia el reloj del
// recordatorio (lo recalcula el trigger follow_ups_set_next_reminder).
export async function createFollowUp(input: NewFollowUp): Promise<FollowUp> {
  const { data, error } = await supabase
    .from('follow_ups')
    .upsert(
      { ...input, resolved_at: null, last_contacted_at: new Date().toISOString() },
      { onConflict: 'task_id' },
    )
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteFollowUp(id: string): Promise<void> {
  const { error } = await supabase.from('follow_ups').delete().eq('id', id)
  if (error) throw error
}

export async function fetchFollowUpLogs(followUpId: string): Promise<FollowUpLog[]> {
  const { data, error } = await supabase
    .from('follow_up_logs')
    .select('*')
    .eq('follow_up_id', followUpId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// "Registrar Contacto" (Bitácora de Custodia): deja una entrada en la
// bitácora y define el próximo aviso corto (+1/+2/+3 días) reutilizando
// interval_days — el trigger follow_ups_set_next_reminder ya recalcula
// next_reminder_at a partir de last_contacted_at + interval_days, así que
// no hace falta tocar ese trigger ni escribir next_reminder_at a mano.
export async function logFollowUpContact(input: {
  followUpId: string
  notes: string
  nextFollowUpDays: number
}): Promise<void> {
  const { error: logError } = await supabase
    .from('follow_up_logs')
    .insert({ follow_up_id: input.followUpId, notes: input.notes })
  if (logError) throw logError

  const { error: updateError } = await supabase
    .from('follow_ups')
    .update({ last_contacted_at: new Date().toISOString(), interval_days: input.nextFollowUpDays })
    .eq('id', input.followUpId)
  if (updateError) throw updateError
}

// "Resolver Éxito": libera la misión de vuelta al Grimorio (mismo mecanismo
// que reopenTask) y marca el follow-up como resuelto (resolved_at) en vez
// de borrarlo, para conservar su bitácora.
export async function resolveFollowUp(input: { followUpId: string; taskId: string }): Promise<void> {
  const { data: task, error: taskError } = await supabase
    .from('tasks')
    .select('id, project_id')
    .eq('id', input.taskId)
    .single()
  if (taskError) throw taskError

  await reopenTask(task)

  await closeFollowUpForTask(input.taskId)
}
```

### src/features/followups/components/FollowUpCard.tsx

```tsx
import { useEffect, useState } from 'react'
import { format, formatDistanceToNow, isPast } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronRight, Check, Phone, ScrollText } from 'lucide-react'
import { useFollowUpLogs, useResolveFollowUp } from '@/features/followups/hooks'
import { LogContactModal } from '@/features/followups/components/LogContactModal'
import type { FollowUp, Task } from '@/types/database.types'

export function FollowUpCard({
  followUp,
  task,
  onResolvedLocally,
  isResolvingLocally,
}: {
  followUp: FollowUp
  task: Task
  onResolvedLocally: (id: string) => void
  isResolvingLocally: boolean
}) {
  const { data: logs } = useFollowUpLogs(followUp.id)
  const resolveFollowUp = useResolveFollowUp()

  const [modalOpen, setModalOpen] = useState(false)
  const [bitacoraOpen, setBitacoraOpen] = useState(false)
  const [confirmingResolve, setConfirmingResolve] = useState(false)

  // La confirmación se descarta sola para no dejar un botón "armado".
  useEffect(() => {
    if (!confirmingResolve) return
    const t = window.setTimeout(() => setConfirmingResolve(false), 4000)
    return () => window.clearTimeout(t)
  }, [confirmingResolve])

  const isOverdue = isPast(new Date(followUp.next_reminder_at))
  const contactCount = logs?.length ?? 0

  return (
    <>
      <article
        className={`follow-up-card flex flex-col gap-5 rounded-2xl p-6 ${
          isResolvingLocally ? 'animate-success-glow' : ''
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="min-w-0 pr-4">
            <h2 className="truncate font-display text-xl font-bold text-fg">{task.title}</h2>
            <p className="mt-1 font-mono text-xs font-bold uppercase text-rune">
              <ScrollText className="mr-1 inline h-4 w-4" aria-hidden="true" />Aliado: {followUp.stakeholder_name || 'Desconocido'}
            </p>
          </div>
          <span
            className={`shrink-0 font-mono text-xs font-bold uppercase ${
              isOverdue ? 'text-warn-fg' : 'text-fg-muted/60'
            }`}
          >
            {formatDistanceToNow(new Date(followUp.next_reminder_at), { addSuffix: true, locale: es })}
          </span>
        </div>

        {/* Medidor de Insistencia */}
        <div className="flex items-center gap-4 rounded-xl border border-glass/5 bg-shade/20 p-3">
          <span className="font-mono text-xs uppercase tracking-tighter text-fg-muted/60">
            Intentos:
          </span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className={`insistence-dot ${
                  dot <= contactCount ? (dot >= 4 ? 'warning' : 'active') : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Acordeón de Bitácora Histórica */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setBitacoraOpen((v) => !v)}
            className="flex items-center gap-1.5 text-left font-mono text-xs uppercase text-fg-muted/60 transition-all hover:text-fg"
          >
            <ChevronRight
              className={`h-3.5 w-3.5 transition-transform ${bitacoraOpen ? 'rotate-90' : ''}`}
            />
            Ver Bitácora Histórica ({logs?.length ?? 0} Entradas)
          </button>

          <div
            className={`bitacora-accordion ml-1 mt-1 space-y-2 border-l border-border pl-4 ${
              bitacoraOpen ? 'open' : ''
            }`}
          >
            {logs?.length === 0 ? (
              <p className="font-mono text-xs italic text-fg-muted/40">Sin registros previos.</p>
            ) : (
              logs?.map((log) => (
                <div key={log.id} className="text-xs italic text-fg-muted">
                  <span className="mr-2 font-mono font-bold text-accent">
                    {format(new Date(log.created_at), 'd MMM').toUpperCase()}
                  </span>
                  {log.notes}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Acciones Rápidas */}
        <footer className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex-1 rounded-lg bg-rune-deep py-3 font-display text-xs font-black uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-95"
          >
            <Phone className="mr-1.5 inline h-4 w-4" aria-hidden="true" />Registrar Contacto
          </button>
          {confirmingResolve ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmingResolve(false)
                  onResolvedLocally(followUp.id)
                  setTimeout(
                    () => resolveFollowUp.mutate({ followUpId: followUp.id, taskId: followUp.task_id }),
                    600,
                  )
                }}
                className="rounded-lg bg-accent px-3 py-3 font-mono text-xs font-black uppercase text-accent-fg"
              >
                Resolver sin bitácora
              </button>
              <button
                type="button"
                onClick={() => setConfirmingResolve(false)}
                className="rounded-lg border border-border px-3 py-3 font-mono text-xs font-bold uppercase text-fg-muted"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingResolve(true)}
              className="rounded-lg border border-glass/10 px-4 py-3 text-lg transition-all hover:bg-accent/20"
              title="Resolver sin dejar bitácora"
            >
              <Check className="h-5 w-5 text-accent" aria-label="Resolver sin dejar bitácora" />
            </button>
          )}
        </footer>
      </article>

      {modalOpen && (
        <LogContactModal
          followUp={followUp}
          onClose={() => setModalOpen(false)}
          onResolvedLocally={onResolvedLocally}
        />
      )}
    </>
  )
}
```

### src/features/followups/components/FollowUpsPage.tsx

```tsx
import { useState } from 'react'
import { isPast } from 'date-fns'
import { Flame, Shield, Bird } from 'lucide-react'
import { useActiveFollowUps } from '@/features/followups/hooks'
import { useTasksByIds } from '@/features/tasks/hooks'
import { FollowUpCard } from '@/features/followups/components/FollowUpCard'

export function FollowUpsPage() {
  const { data: followUps, isLoading } = useActiveFollowUps()
  const { data: tasks } = useTasksByIds(followUps?.map((f) => f.task_id) ?? [])

  // Estado local para manejar las animaciones de desaparición: el follow-up
  // sigue en la lista (para que se vea el destello) hasta que la mutation
  // real invalida la query y desaparece solo en el próximo fetch.
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set())

  const rows = (followUps ?? [])
    .map((followUp) => ({ followUp, task: tasks?.find((t) => t.id === followUp.task_id) }))
    .filter((row) => row.task && row.task.status !== 'done')

  const overdueCount = rows.filter((r) => isPast(new Date(r.followUp.next_reminder_at))).length
  const waitingCount = rows.length - overdueCount

  function handleResolvedLocally(id: string) {
    setResolvingIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      {/* Header Titular y Badges */}
      <header className="mb-10">
        <h1 className="mb-2 font-display text-3xl font-black uppercase tracking-widest text-accent md:text-4xl">
          PACTO DE CUSTODIA — SEGUIMIENTOS
        </h1>
        <p className="mb-6 font-mono text-xs italic text-fg-muted/60">
          Misiones delegadas o dependientes de aliados y emisarios.
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-warn-border bg-warn-bg px-4 py-2">
            <Flame className="h-5 w-5 text-warn-fg" />
            <span className="font-mono text-xs font-bold uppercase text-warn-fg">
              {overdueCount} Necesitan Contacto Hoy
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-rune/30 bg-rune/10 px-4 py-2">
            <Shield className="h-5 w-5 text-rune" />
            <span className="font-mono text-xs font-bold uppercase text-rune">
              {waitingCount} En Espera Paciente
            </span>
          </div>
        </div>
      </header>

      {/* Renderizado de Tarjetas (Grid 2 Columnas) */}
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {isLoading ? (
          <p className="col-span-full py-12 text-center font-mono text-xs text-fg-muted">
            Desenrollando pergaminos de custodia...
          </p>
        ) : rows.length === 0 ? (
          <div className="col-span-full py-16 text-center opacity-40">
            <Bird className="mx-auto mb-4 h-14 w-14" aria-hidden="true" />
            <p className="font-display text-lg uppercase tracking-widest">
              No hay pactos pendientes de respuesta.
            </p>
          </div>
        ) : (
          rows.map(({ followUp, task }) => (
            <FollowUpCard
              key={followUp.id}
              followUp={followUp}
              task={task!}
              onResolvedLocally={handleResolvedLocally}
              isResolvingLocally={resolvingIds.has(followUp.id)}
            />
          ))
        )}
      </main>
    </div>
  )
}
```

### src/features/followups/components/LogContactModal.tsx

```tsx
import { useState } from 'react'
import { X, PartyPopper, Hourglass } from 'lucide-react'
import { useLogFollowUpContact, useResolveFollowUp } from '@/features/followups/hooks'
import type { FollowUp } from '@/types/database.types'

export function LogContactModal({
  followUp,
  onClose,
  onResolvedLocally,
}: {
  followUp: FollowUp
  onClose: () => void
  onResolvedLocally: (id: string) => void
}) {
  const logContact = useLogFollowUpContact()
  const resolve = useResolveFollowUp()

  const [note, setNote] = useState('')
  const [days, setDays] = useState(2)

  async function handleSaveWait() {
    if (!note.trim()) return
    await logContact.mutateAsync({
      followUpId: followUp.id,
      notes: note.trim(),
      nextFollowUpDays: days,
    })
    onClose()
  }

  async function handleResolveSuccess() {
    if (!note.trim()) return
    // Guardar la nota final
    await logContact.mutateAsync({
      followUpId: followUp.id,
      notes: `[RESUELTO] ${note.trim()}`,
      nextFollowUpDays: days,
    })
    // Ejecutar animación de tarjeta antes de disparar la mutation real
    onResolvedLocally(followUp.id)
    onClose()

    // Llamada real al backend tras la animación
    setTimeout(() => {
      resolve.mutate({ followUpId: followUp.id, taskId: followUp.task_id })
    }, 600)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-parchment-log w-full max-w-lg rounded flex flex-col"
      >
        <header className="flex items-center justify-between border-b border-parchment-ink/20 p-6">
          <h3 className="font-display text-2xl uppercase tracking-tighter text-parchment-ink">
            Bitácora de Encuentro
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-xl text-parchment-ink/60 transition-transform hover:scale-110 hover:text-parchment-ink"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold uppercase text-parchment-ink/60">
              Resumen del contacto
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="¿Qué respuesta recibiste del aliado/cliente?"
              className="h-32 w-full resize-none rounded border border-parchment-ink/20 bg-shade/5 p-4 text-sm text-parchment-ink outline-none focus:border-parchment-ink/50"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs font-bold uppercase text-parchment-ink/60">
              Próximo aviso (Foco Corto)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={`rounded border py-4 font-mono text-xs font-bold uppercase transition-all ${
                    days === d
                      ? 'border-rune-deep bg-rune-deep text-white shadow-md'
                      : 'border-parchment-ink/20 bg-shade/5 text-parchment-ink/70 hover:bg-shade/10'
                  }`}
                >
                  +{d} DÍA{d > 1 ? 'S' : ''}
                </button>
              ))}
            </div>
            <p className="mt-2 font-mono text-xs italic text-parchment-ink/50">
              * El tiempo corto evita que la misión caiga en el olvido.
            </p>
          </div>
        </div>

        <footer className="flex flex-col gap-4 bg-shade/5 p-6 sm:flex-row">
          <button
            type="button"
            disabled={!note.trim() || logContact.isPending}
            onClick={handleSaveWait}
            className="flex-1 bg-parchment-ink py-4 font-display text-sm font-black uppercase tracking-widest text-parchment transition-all hover:brightness-125 disabled:opacity-50"
          >
            Sigue en Espera <Hourglass className="ml-1.5 inline h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            disabled={!note.trim() || resolve.isPending}
            onClick={handleResolveSuccess}
            className="flex-1 border-2 border-parchment-ink py-4 font-display text-sm font-black uppercase tracking-widest text-parchment-ink transition-all hover:bg-shade/5 disabled:opacity-50"
          >
            Resolver Éxito <PartyPopper className="ml-1.5 inline h-4 w-4" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </div>
  )
}
```

### src/features/followups/hooks.ts

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createFollowUp,
  deleteFollowUp,
  fetchFollowUpForTask,
  fetchFollowUpLogs,
  fetchFollowUps,
  logFollowUpContact,
  resolveFollowUp,
} from '@/features/followups/api'
import { sendTaskToFollowUp } from '@/features/tasks/api'

export function useActiveFollowUps() {
  return useQuery({ queryKey: ['follow-ups'], queryFn: fetchFollowUps })
}

export function useFollowUpLogs(followUpId: string) {
  return useQuery({
    queryKey: ['follow-ups', 'logs', followUpId],
    queryFn: () => fetchFollowUpLogs(followUpId),
  })
}

export function useFollowUpForTask(taskId: string | null) {
  return useQuery({
    queryKey: ['follow-ups', 'by-task', taskId],
    queryFn: () => fetchFollowUpForTask(taskId as string),
    enabled: taskId !== null,
  })
}

function useInvalidateFollowUps() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
}

export function useDeleteFollowUp() {
  const invalidate = useInvalidateFollowUps()
  return useMutation({ mutationFn: deleteFollowUp, onSuccess: invalidate })
}

// Acción "Enviar a Follow-up": crea el registro de seguimiento y saca la
// tarea de la vista activa del Kanban (status -> 'follow_up') en un solo paso.
export function useSendToFollowUp() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      taskId: string
      intervalDays: number
      stakeholderName: string | null
    }) => {
      await createFollowUp({
        task_id: input.taskId,
        interval_days: input.intervalDays,
        stakeholder_name: input.stakeholderName,
        notes: null,
      })
      await sendTaskToFollowUp(input.taskId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

// "Registrar Contacto" — Pacto de Custodia (Fase 8, Paso 10).
export function useLogFollowUpContact() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logFollowUpContact,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
      queryClient.invalidateQueries({ queryKey: ['follow-ups', 'logs', variables.followUpId] })
    },
  })
}

// "Resolver Éxito" — libera la tarea al Grimorio y marca el follow-up
// como resuelto (no lo borra, conserva su bitácora).
export function useResolveFollowUp() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: resolveFollowUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
```

### src/features/gamification/api.ts

```typescript
import { supabase } from '@/lib/supabase'
import type { ClassRank, Loot, LootDefinition, Quest, Streak, UserCategoryXp } from '@/types/database.types'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function fetchStreak(): Promise<Streak | null> {
  const { data, error } = await supabase.from('streaks').select('*').maybeSingle()
  if (error) throw error
  return data
}

export async function fetchCategoryXp(): Promise<UserCategoryXp[]> {
  const { data, error } = await supabase.from('user_category_xp').select('*')
  if (error) throw error
  return data
}

export async function fetchTodayQuests(): Promise<Quest[]> {
  const { data, error } = await supabase
    .from('quests')
    .select('*')
    .in('type', ['daily_triage', 'daily_priority'])
    .eq('period_start', todayIso())
  if (error) throw error
  return data
}

export async function fetchWeeklyQuests(weekStartIso: string): Promise<Quest[]> {
  const { data, error } = await supabase
    .from('quests')
    .select('*')
    .eq('type', 'weekly_project')
    .eq('period_start', weekStartIso)
  if (error) throw error
  return data
}

export async function setTodayPriorityTask(taskId: string): Promise<Quest> {
  const today = todayIso()
  await supabase.from('quests').delete().eq('type', 'daily_priority').eq('period_start', today)
  const { data, error } = await supabase
    .from('quests')
    .insert({ type: 'daily_priority', period_start: today, task_id: taskId, xp_reward: 20 })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function clearTodayPriorityTask(): Promise<void> {
  const { error } = await supabase
    .from('quests')
    .delete()
    .eq('type', 'daily_priority')
    .eq('period_start', todayIso())
  if (error) throw error
}

export async function fetchClassRanks(): Promise<ClassRank[]> {
  const { data, error } = await supabase.from('class_ranks').select('*').order('rank_order')
  if (error) throw error
  return data
}

export async function fetchLootDefinitions(): Promise<LootDefinition[]> {
  const { data, error } = await supabase.from('loot_definitions').select('*')
  if (error) throw error
  return data
}

export async function fetchUnlockedLoot(): Promise<Loot[]> {
  const { data, error } = await supabase.from('loot').select('*')
  if (error) throw error
  return data
}
```

### src/features/gamification/components/AchievementWatcher.tsx

```tsx
import { Gem, Swords } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  useCategoryXp,
  useClassRanks,
  useLootDefinitions,
  useUnlockedLoot,
} from '@/features/gamification/hooks'
import { useCategories } from '@/features/projects/hooks'
import { AchievementCelebration, type Achievement } from '@/components/ui/AchievementCelebration'

const SEEN_RANKS_KEY = 'rpg_seen_rank_ids'
const SEEN_LOOT_KEY = 'rpg_seen_loot_ids'

function readSeen(key: string): Set<string> {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

function writeSeen(key: string, ids: Set<string>) {
  window.localStorage.setItem(key, JSON.stringify([...ids]))
}

/**
 * Componente sin UI propia (mas alla de la celebracion) montado una vez en Layout.
 * Compara rangos/loot actuales contra lo ultimo visto en localStorage; lo nuevo
 * dispara AchievementCelebration en cola, uno a la vez.
 */
export function AchievementWatcher() {
  const { data: categoryXp } = useCategoryXp()
  const { data: classRanks } = useClassRanks()
  const { data: categories } = useCategories()
  const { data: unlockedLoot } = useUnlockedLoot()
  const { data: lootDefinitions } = useLootDefinitions()

  const primed = useRef(false)
  const [queue, setQueue] = useState<Achievement[]>([])

  useEffect(() => {
    if (!categoryXp || !classRanks || !categories || !unlockedLoot || !lootDefinitions) return

    const seenRanks = readSeen(SEEN_RANKS_KEY)
    const seenLoot = readSeen(SEEN_LOOT_KEY)
    const newAchievements: Achievement[] = []

    for (const xp of categoryXp) {
      if (!xp.current_rank_id) continue
      if (!seenRanks.has(xp.current_rank_id)) {
        if (primed.current) {
          const rank = classRanks.find((r) => r.id === xp.current_rank_id)
          const category = categories.find((c) => c.id === xp.category_id)
          if (rank && category) {
            newAchievements.push({
              id: `rank-${xp.current_rank_id}`,
              kicker: `Nuevo rango — ${category.name}`,
              title: rank.rank_name,
              description: `Tu clase ${category.class_name} evolucionó en ${category.name}.`,
              icon: Swords,
            })
          }
        }
        seenRanks.add(xp.current_rank_id)
      }
    }

    for (const loot of unlockedLoot) {
      if (!seenLoot.has(loot.loot_definition_id)) {
        if (primed.current) {
          const def = lootDefinitions.find((d) => d.id === loot.loot_definition_id)
          if (def) {
            newAchievements.push({
              id: `loot-${loot.id}`,
              kicker: 'Loot desbloqueado',
              title: def.name,
              description: def.description,
              icon: Gem,
            })
          }
        }
        seenLoot.add(loot.loot_definition_id)
      }
    }

    writeSeen(SEEN_RANKS_KEY, seenRanks)
    writeSeen(SEEN_LOOT_KEY, seenLoot)
    primed.current = true

    if (newAchievements.length > 0) {
      setQueue((prev) => [...prev, ...newAchievements])
    }
  }, [categoryXp, classRanks, categories, unlockedLoot, lootDefinitions])

  if (queue.length === 0) return null

  return (
    <AchievementCelebration
      achievement={queue[0]}
      onDone={() => setQueue((prev) => prev.slice(1))}
    />
  )
}
```

### src/features/gamification/components/ClassDetailModal.tsx

```tsx
import { useState } from 'react'
import { X, Check, ScrollText, Sparkles } from 'lucide-react'
import { useTasksByCategory, useCompleteTask } from '@/features/tasks/hooks'
import type { Category, ClassRank, UserCategoryXp } from '@/types/database.types'

export function ClassDetailModal({
  category,
  categoryXp,
  rank,
  onClose,
}: {
  category: Category
  categoryXp?: UserCategoryXp
  rank?: ClassRank
  onClose: () => void
}) {
  const { data: tasks } = useTasksByCategory(category.id)
  const completeTask = useCompleteTask()

  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active')
  const [flashing, setFlashing] = useState(false)

  const activeTasks = (tasks ?? []).filter((t) => t.status !== 'done')
  const historyTasks = (tasks ?? []).filter((t) => t.status === 'done')

  const level = categoryXp?.current_level ?? 1
  const xpCurrent = categoryXp?.current_xp ?? 0
  const xpMax = 2000
  const xpPercent = Math.min(100, Math.round((xpCurrent / xpMax) * 100))

  function handleComplete(taskId: string, projectId: string | null) {
    setFlashing(true)
    completeTask.mutate({ id: taskId, project_id: projectId })
    setTimeout(() => setFlashing(false), 600)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-parchment-scroll relative w-full max-w-lg rounded-xl"
      >
        {/* Encabezado del Pergamino */}
        <div className="border-b border-parchment-ink/20 p-6 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-xl text-parchment-ink/60 transition-opacity hover:opacity-100"
          >
            <X className="h-6 w-6" />
          </button>
          <Sparkles className="mx-auto mb-2 h-12 w-12 text-parchment-ink" aria-hidden="true" />
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-parchment-ink">
            {rank?.rank_name ?? category.class_name}
          </h2>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-parchment-ink/60">
            Clase: {category.name} · Nivel {level}
          </p>
        </div>

        {/* Pestañas Internas */}
        <div className="flex border-b border-parchment-ink/20 font-mono text-xs font-black uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 transition-colors ${
              activeTab === 'active' ? 'bg-parchment-ink/10 text-parchment-ink' : 'text-parchment-ink/40'
            }`}
          >
            Misiones Activas ({activeTasks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 transition-colors ${
              activeTab === 'history' ? 'bg-parchment-ink/10 text-parchment-ink' : 'text-parchment-ink/40'
            }`}
          >
            Victorias ({historyTasks.length})
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 space-y-6">
          {/* Sección de XP */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-xs font-bold uppercase text-parchment-ink">
              <span>Experiencia de Clase</span>
              <span>
                {xpCurrent} / {xpMax} XP
              </span>
            </div>
            <div className="h-3.5 w-full overflow-hidden rounded-full border border-parchment-ink/20 bg-parchment-ink/10">
              <div
                className={`h-full bg-parchment-ink transition-all ${flashing ? 'xp-flash-anim' : ''}`}
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Lista de Misiones */}
          <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
            {activeTab === 'active' ? (
              activeTasks.length === 0 ? (
                <p className="font-mono text-xs text-parchment-ink/50 italic">Sin misiones pendientes.</p>
              ) : (
                activeTasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between rounded-lg border border-parchment-ink/10 bg-glass/50 p-3.5"
                  >
                    <div>
                      <p className="font-display text-sm font-bold text-parchment-ink">{t.title}</p>
                      <p className="font-mono text-xs uppercase text-parchment-ink/60">
                        RECOMPENSA: +{t.xp_reward || 10} XP
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleComplete(t.id, t.project_id)}
                      className="rounded bg-parchment-ink p-2 text-xs font-black text-parchment transition-transform active:scale-95"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )
            ) : historyTasks.length === 0 ? (
              <p className="font-mono text-xs text-parchment-ink/50 italic">Ninguna victoria aún.</p>
            ) : (
              historyTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-lg border border-parchment-ink/10 bg-glass/30 p-3.5 opacity-70"
                >
                  <div>
                    <p className="font-display text-sm font-bold text-parchment-ink line-through">{t.title}</p>
                    <p className="font-mono text-xs uppercase text-parchment-ink/60">
                      RECIBIDO +{t.xp_reward || 10} XP
                    </p>
                  </div>
                  <ScrollText className="h-4 w-4" aria-hidden="true" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

### src/features/gamification/components/LootShowcase.tsx

```tsx
import { Crown, Flame, Sparkles, TrendingUp, type LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import { useLootDefinitions, useUnlockedLoot } from '@/features/gamification/hooks'

const LOOT_ICONS: Record<string, ComponentType<LucideProps>> = {
  flame: Flame,
  sparkles: Sparkles,
  'trending-up': TrendingUp,
  crown: Crown,
}

export function LootShowcase() {
  const { data: definitions } = useLootDefinitions()
  const { data: unlocked } = useUnlockedLoot()

  if (!definitions || definitions.length === 0) {
    return <p className="text-sm text-fg-muted">Todavía no hay insignias.</p>
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {definitions.map((loot) => {
        const unlock = unlocked?.find((u) => u.loot_definition_id === loot.id)
        const Icon = LOOT_ICONS[loot.icon_name] ?? Sparkles

        return (
          <div
            key={loot.id}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all duration-200 ${
              unlock
                ? 'border-accent/40 bg-accent/5 shadow-[0_0_16px_rgb(var(--gold-rgb)/0.25)] hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgb(var(--accent-rgb)/0.4)]'
                : 'border-dashed border-border opacity-50'
            }`}
          >
            <Icon className={`h-6 w-6 ${unlock ? 'text-gold drop-shadow-[0_0_4px_rgb(var(--gold-rgb)/0.5)]' : 'text-fg-muted/60'}`} />
            <p className="text-xs font-medium text-fg">{loot.name}</p>
            <p className="text-xs text-fg-muted">{loot.description}</p>
          </div>
        )
      })}
    </div>
  )
}
```

### src/features/gamification/components/ProgressPage.tsx

```tsx
import { useState } from 'react'
import { Flame, Shield, Check, Sparkles } from 'lucide-react'
import { useCategories, useProjects } from '@/features/projects/hooks'
import {
  useCategoryXp,
  useClassRanks,
  useStreak,
  useTodayQuests,
} from '@/features/gamification/hooks'
import { ClassDetailModal } from '@/features/gamification/components/ClassDetailModal'
import { LootShowcase } from '@/features/gamification/components/LootShowcase'
import { ProjectBossCard } from '@/features/projects/components/ProjectBossCard'
import type { Category, QuestType } from '@/types/database.types'

// useTodayQuests solo devuelve daily_triage/daily_priority (ver fetchTodayQuests) —
// la tabla quests no tiene columna "title", así que se deriva acá.
const QUEST_TITLES: Record<QuestType, string> = {
  daily_triage: 'Vaciar el Inbox (Triage Diario)',
  daily_priority: 'Misión Prioritaria del Día',
  weekly_project: 'Proyecto Semanal',
}

export function ProgressPage() {
  const { data: streak } = useStreak()
  const { data: todayQuests } = useTodayQuests()
  const { data: categories } = useCategories()
  const { data: categoryXp } = useCategoryXp()
  const { data: classRanks } = useClassRanks()
  const { data: projects } = useProjects()

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // Cálculo de nivel global acumulado
  const globalLevel = (categoryXp ?? []).reduce((acc, curr) => acc + curr.current_level, 0) || 1

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      {/* Header Titular */}
      <header className="mb-10 flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent/70">
            Estadísticas de Héroe
          </p>
          <h1 className="font-display text-3xl font-black uppercase tracking-widest text-fg md:text-4xl">
            Salón de Héroes
          </h1>
        </div>
        <div className="text-right">
          <span className="block font-mono text-xs uppercase text-fg-muted">Nivel Global</span>
          <span className="font-display text-3xl font-black text-accent">{globalLevel}</span>
        </div>
      </header>

      {/* Grid Principal en 2 Columnas Responsivas */}
      <main className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* COLUMNA IZQUIERDA (5 Cols): Azañas & Racha */}
        <div className="space-y-6 lg:col-span-5">
          {/* Tarjeta de Racha Activa */}
          <section className="card-stone-bg streak-glow-card rounded-2xl border-2 border-accent/40 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Flame className="h-10 w-10 text-accent animate-bounce" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-accent">
                    {streak?.current_streak_days ?? 0} DÍAS
                  </h2>
                  <p className="font-mono text-xs uppercase text-fg-muted">
                    Racha de Fuego Activa
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-shade/40 px-4 py-2 text-center">
                <span className="flex items-center gap-1 font-mono text-base font-bold text-rune">
                  <Shield className="h-4 w-4 fill-rune" />
                  {streak?.shields_available ?? 0}
                </span>
                <p className="font-mono text-xs uppercase text-fg-muted/60">Escudos</p>
              </div>
            </div>
          </section>

          {/* Quests Diarias */}
          <section className="card-stone-bg rounded-2xl p-6 space-y-4">
            <h3 className="font-display text-xs uppercase tracking-widest text-fg-muted/60">
              Misiones de Reconocimiento
            </h3>

            <div className="space-y-2.5">
              {todayQuests?.map((q) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-shade/30 p-3"
                >
                  <span className="font-display text-xs text-fg">{QUEST_TITLES[q.type]}</span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      q.completed ? 'text-accent' : 'text-accent animate-pulse'
                    }`}
                  >
                    {q.completed ? (
                      <span className="inline-flex items-center gap-1"><Check className="h-3.5 w-3.5" aria-hidden="true" /> COMPLETO</span>
                    ) : (
                      'PENDIENTE'
                    )}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Jefes de Mazmorra Compactos */}
          <section className="space-y-3">
            <h3 className="font-display text-xs uppercase tracking-widest text-fg-muted/60">
              Jefes de Mazmorra (Proyectos)
            </h3>
            <div className="space-y-2">
              {projects?.slice(0, 2).map((p) => (
                <ProjectBossCard
                  key={p.id}
                  project={p}
                  category={categories?.find((c) => c.id === p.category_id)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA (7 Cols): Clases & Botín */}
        <div className="space-y-8 lg:col-span-7">
          {/* Grid de 6 Clases RPG */}
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {categories?.map((cat) => {
              const xpData = categoryXp?.find((x) => x.category_id === cat.id)
              const rank = classRanks?.find((r) => r.id === xpData?.current_rank_id)
              const level = xpData?.current_level ?? 1
              const percent = Math.min(100, Math.round(((xpData?.current_xp ?? 0) / 2000) * 100))

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="card-stone-bg card-rune-interactive cursor-pointer rounded-2xl p-4 transition-all"
                >
                  <Sparkles className="mb-2 h-6 w-6" aria-hidden="true" />
                  <h4 className="truncate font-display text-xs font-bold uppercase tracking-widest text-fg">
                    {rank?.rank_name ?? cat.class_name}
                  </h4>
                  <p className="font-mono text-xs uppercase text-fg-muted/60 mb-3">
                    Nv. {level} · {cat.name}
                  </p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-shade/40">
                    <div
                      className="h-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: cat.color_hex }}
                    />
                  </div>
                </div>
              )
            })}
          </section>

          {/* Galería de Botín */}
          <section className="card-stone-bg rounded-2xl p-6">
            <h3 className="mb-4 font-display text-xs uppercase tracking-widest text-fg-muted/60">
              Insignias de la Orden
            </h3>
            <LootShowcase />
          </section>
        </div>
      </main>

      {/* Modal Pergamino de Clase */}
      {selectedCategory && (
        <ClassDetailModal
          category={selectedCategory}
          categoryXp={categoryXp?.find((x) => x.category_id === selectedCategory.id)}
          rank={classRanks?.find(
            (r) => r.id === categoryXp?.find((x) => x.category_id === selectedCategory.id)?.current_rank_id,
          )}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  )
}
```

### src/features/gamification/hooks.ts

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format, isToday, startOfWeek } from 'date-fns'
import {
  clearTodayPriorityTask,
  fetchCategoryXp,
  fetchClassRanks,
  fetchLootDefinitions,
  fetchStreak,
  fetchTodayQuests,
  fetchUnlockedLoot,
  fetchWeeklyQuests,
  setTodayPriorityTask,
} from '@/features/gamification/api'
import { useTasksCompletedToday } from '@/features/tasks/hooks'

export function useStreak() {
  return useQuery({ queryKey: ['gamification', 'streak'], queryFn: fetchStreak })
}

export function useClassRanks() {
  return useQuery({
    queryKey: ['gamification', 'class-ranks'],
    queryFn: fetchClassRanks,
    staleTime: Infinity,
  })
}

export function useLootDefinitions() {
  return useQuery({
    queryKey: ['gamification', 'loot-definitions'],
    queryFn: fetchLootDefinitions,
    staleTime: Infinity,
  })
}

export function useUnlockedLoot() {
  return useQuery({ queryKey: ['gamification', 'loot'], queryFn: fetchUnlockedLoot })
}

export function useCategoryXp() {
  return useQuery({ queryKey: ['gamification', 'category-xp'], queryFn: fetchCategoryXp })
}

export function useTodayQuests() {
  return useQuery({ queryKey: ['gamification', 'quests', 'today'], queryFn: fetchTodayQuests })
}

export function useWeeklyQuests(weekStartIso: string) {
  return useQuery({
    queryKey: ['gamification', 'quests', 'weekly', weekStartIso],
    queryFn: () => fetchWeeklyQuests(weekStartIso),
  })
}

// XP ganado hoy: suma el xp_reward de tareas/subtareas completadas hoy +
// el bonus de las quests diaria/semanal si se completaron hoy (la quest de
// triage no suma — su xp_reward es informativo, no toca user_category_xp).
export function useXpEarnedToday() {
  const { data: tasksToday } = useTasksCompletedToday()
  const { data: todayQuests } = useTodayQuests()
  const weekStartIso = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const { data: weeklyQuests } = useWeeklyQuests(weekStartIso)

  if (!tasksToday || !todayQuests || !weeklyQuests) return undefined

  const tasksXp = tasksToday.reduce((sum, t) => sum + t.xp_reward + t.rescue_bonus, 0)
  const priorityXp = todayQuests
    .filter((q) => q.type === 'daily_priority' && q.completed && q.completed_at && isToday(new Date(q.completed_at)))
    .reduce((sum, q) => sum + q.xp_reward, 0)
  const weeklyXp = weeklyQuests
    .filter((q) => q.completed && q.completed_at && isToday(new Date(q.completed_at)))
    .reduce((sum, q) => sum + q.xp_reward, 0)

  return tasksXp + priorityXp + weeklyXp
}

function useInvalidateGamification() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ['gamification'] })
}

export function useSetTodayPriority() {
  const invalidate = useInvalidateGamification()
  return useMutation({
    mutationFn: setTodayPriorityTask,
    onSuccess: invalidate,
  })
}

export function useClearTodayPriority() {
  const invalidate = useInvalidateGamification()
  return useMutation({
    mutationFn: clearTodayPriorityTask,
    onSuccess: invalidate,
  })
}
```

### src/features/inbox/components/InboxDashboard.tsx

```tsx
import { formatDistanceToNow, isPast, isToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Castle, Check, Circle, Sparkles, Star, Trophy, Zap } from 'lucide-react'
import {
  useTodayQuests,
  useXpEarnedToday,
} from '@/features/gamification/hooks'
import {
  useActiveTasksWithDeadline,
  useLastCompletedTask,
  useQuickWinTask,
  useTaskById,
} from '@/features/tasks/hooks'
import type { Task } from '@/types/database.types'

/** Franja Superior de Resumen (InboxTopBar) */
export function InboxTopBar({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  const xpToday = useXpEarnedToday()
  const { data: todayQuests } = useTodayQuests()
  const navigate = useNavigate()
  const { data: activeDeadlines } = useActiveTasksWithDeadline()

  const triageDone = todayQuests?.find((q) => q.type === 'daily_triage')?.completed ?? false
  const priorityQuest = todayQuests?.find((q) => q.type === 'daily_priority')
  const { data: priorityTask } = useTaskById(priorityQuest?.task_id ?? null)

  const overdueCount = activeDeadlines?.filter((t) => isPast(new Date(t.deadline!))).length ?? 0
  const dueTodayCount = activeDeadlines?.filter((t) => isToday(new Date(t.deadline!))).length ?? 0

  return (
    <div className="mb-8 flex flex-col gap-3">
      {/* Grid de Métricas Tácticas */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-xl border border-border bg-shade/30 p-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-tight text-fg-muted/60">Progreso</span>
          <span className="flex items-center gap-1 font-mono text-xs font-bold text-rune">
            <Sparkles className="h-3.5 w-3.5" />
            +{xpToday ?? 0} XP
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-shade/30 p-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-tight text-fg-muted/60">Triage</span>
          <span className={`font-mono text-xs font-bold ${triageDone ? 'text-accent' : 'text-fg-muted/50'}`}>
            {triageDone ? (
              <span className="inline-flex items-center gap-1"><Check className="h-3.5 w-3.5" aria-hidden="true" /> COMPLETO</span>
            ) : (
              <span className="inline-flex items-center gap-1"><Circle className="h-3.5 w-3.5" aria-hidden="true" /> PENDIENTE</span>
            )}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate(priorityTask && priorityTask.status !== 'done' ? '/kanban' : '/')}
          className="flex items-center justify-between rounded-xl border border-gold/30 bg-gold/10 p-3 transition-colors hover:bg-gold/20"
        >
          <span className="flex items-center gap-1 font-mono text-xs font-bold uppercase text-gold">
            <Star className="h-3.5 w-3.5 fill-gold" /> Prioridad
          </span>
          <span className="font-mono text-xs font-bold text-fg-muted/80">
            {priorityTask && priorityTask.status !== 'done' ? 'DEFINIDA' : priorityTask ? 'CUMPLIDA' : 'ELEGIR EN COMBATE'}
          </span>
        </button>
      </div>

      {/* Alerta de Deadlines Urgentes */}
      {(overdueCount > 0 || dueTodayCount > 0) && (
        <button
          type="button"
          onClick={() => navigate('/kanban', { state: { dateFilter: overdueCount > 0 ? 'overdue' : 'today' } })}
          className="flex w-full items-center justify-between rounded-xl border border-warn-border bg-warn-bg px-4 py-2.5 text-xs text-warn-fg transition-transform hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2 font-mono font-medium">
            <AlertTriangle className="h-4 w-4 shrink-0 text-warn-fg" />
            {overdueCount > 0 && <span>{overdueCount} misiones por rescatar</span>}
            {overdueCount > 0 && dueTodayCount > 0 && <span>·</span>}
            {dueTodayCount > 0 && <span>{dueTodayCount} vencen hoy</span>}
          </span>
          <span className="font-mono text-xs font-bold underline">RESCATAR EN GRIMORIO →</span>
        </button>
      )}

      {/* Tarjeta de Prioridad del Día */}
      {priorityTask && priorityTask.status !== 'done' && (
        <button
          type="button"
          onClick={() => onOpenTask(priorityTask)}
          className="flex w-full items-center gap-3 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-left transition-transform hover:-translate-y-0.5"
        >
          <Star className="h-4 w-4 shrink-0 text-accent fill-accent" />
          <span className="font-mono text-xs font-bold uppercase text-accent">Misión Prioritaria:</span>
          <span className="flex-1 truncate font-display text-sm font-semibold text-fg">{priorityTask.title}</span>
        </button>
      )}
    </div>
  )
}

/** Empty State Motivacional cuando no hay pergaminos pendientes */
export function InboxEmptyState({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  const { data: lastTask } = useLastCompletedTask()
  const { data: quickWin } = useQuickWinTask()

  return (
    <section className="rounded-3xl border-2 border-dashed border-border p-8 text-center bg-surface/20">
      <Castle className="mx-auto mb-4 h-14 w-14 text-accent" aria-hidden="true" />
      <h2 className="mb-1 font-display text-xl font-bold uppercase tracking-wide text-accent">
        ¡Inbox limpio y maza lista para la batalla!
      </h2>
      <p className="mb-8 font-mono text-xs text-fg-muted/60">
        No quedan pergaminos sueltos en tu mesa de trabajo.
      </p>

      <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 text-left md:grid-cols-2">
        {/* Última Victoria */}
        {lastTask && lastTask.completed_at && (
          <div className="rounded-2xl border border-border bg-surface p-4">
            <span className="mb-2 block font-mono text-xs uppercase text-fg-muted/60">
              <Trophy className="mr-1 inline h-3.5 w-3.5 text-gold" aria-hidden="true" />
              Última Victoria
            </span>
            <p className="mb-1 truncate font-display text-sm font-bold text-fg">
              {lastTask.title}
            </p>
            <p className="font-mono text-xs text-accent">
              COMPLETADO {formatDistanceToNow(new Date(lastTask.completed_at), { addSuffix: true, locale: es }).toUpperCase()}
            </p>
          </div>
        )}

        {/* Quick Win Sugerido */}
        {quickWin && (
          <button
            type="button"
            onClick={() => onOpenTask(quickWin)}
            className="group rounded-2xl border border-border bg-surface p-4 text-left transition-all hover:border-rune"
          >
            <span className="mb-2 block font-mono text-xs uppercase text-rune">
              <Zap className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
              Quick Win
            </span>
            <p className="mb-1 truncate font-display text-sm font-bold text-fg group-hover:text-rune">
              {quickWin.title}
            </p>
            <p className="font-mono text-xs text-fg-muted/60">
              GANA +10 XP RÁPIDO
            </p>
          </button>
        )}
      </div>
    </section>
  )
}
```

### src/features/inbox/components/InboxPage.tsx

```tsx
import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mic, ScrollText, Square, Trash2, WifiOff } from 'lucide-react'
import { useCaptureInboxTask, useDeleteTask, useInboxTasks, useUpdateTask } from '@/features/tasks/hooks'
import { useOnlineStatus } from '@/utils/useOnlineStatus'
import { useSpeechDictation } from '@/utils/useSpeechDictation'
import { InboxEmptyState, InboxTopBar } from '@/features/inbox/components/InboxDashboard'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

export function InboxPage() {
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: items, isLoading } = useInboxTasks()
  const captureTask = useCaptureInboxTask()
  const deleteTask = useDeleteTask()
  const updateTask = useUpdateTask()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const online = useOnlineStatus()
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const dictation = useSpeechDictation((text) => {
    setTitle((current) => (current ? `${current} ${text}` : text))
    inputRef.current?.focus()
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    captureTask.mutate(trimmed, {
      onSuccess: () => {
        setTitle('')
        inputRef.current?.focus()
      },
    })
  }

  function startEdit(item: Task) {
    if (item.id.startsWith('optimistic-')) return
    setEditingId(item.id)
    setDraft(item.title)
  }

  function saveEdit(item: Task) {
    const next = draft.trim()
    setEditingId(null)
    if (next && next !== item.title) updateTask.mutate({ id: item.id, patch: { title: next } })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      {/* Indicadores Superiores */}
      <InboxTopBar onOpenTask={setEditingTask} />

      {/* Header Titular */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 font-display text-3xl font-black uppercase tracking-widest text-accent md:text-4xl">
          INBOX — PERGAMINO DE CAPTURA
        </h1>
        <p className="mx-auto max-w-lg text-sm text-fg-muted/70">
          Escribe o dicta libremente. Sin categorías ni fechas — eso se define después en{' '}
          <Link to="/triage" className="text-accent underline underline-offset-2">
            Estrategia
          </Link>
          .
        </p>
      </header>

      {/* Caja de Captura Fricción Cero (Sticky Input) */}
      <section className="sticky top-20 z-30 mb-10">
        <form onSubmit={handleSubmit} className="input-parchment-inbox flex items-center gap-3 rounded-2xl p-2 backdrop-blur-md">
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={dictation.listening ? 'Escuchando tus órdenes...' : '¿Qué nueva misión ha surgido?'}
            className="flex-1 border-none bg-transparent px-4 py-3 text-base text-fg outline-none placeholder:text-fg-muted/40 md:text-lg"
          />

          <div className="flex items-center gap-2 pr-1">
            {dictation.supported && (
              <button
                type="button"
                onClick={() => (dictation.listening ? dictation.stop() : dictation.start())}
                title={dictation.listening ? 'Detener dictado' : 'Dictar por voz'}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                  dictation.listening
                    ? 'pulse-recording bg-red-500/20 text-red-400'
                    : 'bg-glass/5 text-fg-muted hover:bg-glass/10 hover:text-fg'
                }`}
              >
                {dictation.listening ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            )}

            <button
              type="submit"
              disabled={!title.trim() || captureTask.isPending}
              className="btn-prime rounded-xl px-5 py-3 font-mono text-xs font-black uppercase tracking-widest disabled:opacity-50"
            >
              Capturar
            </button>
          </div>
        </form>

        <div className="mt-2.5 flex justify-between px-3">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted/50">
            <span className={`h-1.5 w-1.5 rounded-full ${online ? 'bg-accent' : 'bg-amber-500'}`} />
            {online ? 'Conexión Estable' : 'Modo Offline Resiliente'}
          </span>
          {!online && (
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
              <WifiOff className="mr-1 inline h-3 w-3" /> Guarda localmente
            </span>
          )}
        </div>
      </section>

      {/* Lista de Capturas Pendientes */}
      <section className="mb-12 space-y-3">
        {isLoading && (
          <p className="py-6 text-center font-mono text-xs text-fg-muted">
            Cargando pergaminos...
          </p>
        )}

        {items && items.length > 0 && (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="inbox-item-card group flex items-center justify-between rounded-xl p-4 transition-all hover:border-accent"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <ScrollText className="h-5 w-5 shrink-0 opacity-40 transition-opacity group-hover:text-accent group-hover:opacity-100" aria-hidden="true" />
                  {editingId === item.id ? (
                    <input
                      autoFocus
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onBlur={() => saveEdit(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(item)
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                      aria-label="Editar captura"
                      className="input-parchment min-w-0 flex-1 rounded-lg px-3 py-2 text-fg"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      title="Tocar para corregir"
                      className="min-w-0 flex-1 truncate text-left font-medium text-fg"
                    >
                      {item.title}
                    </button>
                  )}
                  {item.id.startsWith('optimistic-') && (
                    <span className="font-mono text-xs text-fg-muted/50">
                      (sincronizando...)
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => deleteTask.mutate(item.id)}
                  aria-label="Descartar captura"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-fg-muted transition-all hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {items && items.length === 0 && !isLoading && (
          <InboxEmptyState onOpenTask={setEditingTask} />
        )}
      </section>

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
```

### src/features/inbox/components/QuickCaptureFab.tsx

```tsx
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import { useCaptureInboxTask } from '@/features/tasks/hooks'

// Captura de fricción cero desde cualquier pantalla (spec 4.1 / sección 6).
// Queda abierto tras capturar para soltar varias ideas seguidas.
export function QuickCaptureFab() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [captured, setCaptured] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const capture = useCaptureInboxTask()

  useEffect(() => {
    if (open) inputRef.current?.focus()
    else setCaptured(0)
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // En el Inbox ya hay una caja de captura permanente.
  if (pathname === '/inbox') return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    capture.mutate(trimmed)
    setTitle('')
    setCaptured((n) => n + 1)
    inputRef.current?.focus()
  }

  return (
    <div
      className="fixed right-4 lg:right-[calc(var(--rail-w,4rem)+1rem)] z-40 flex flex-col items-end gap-3 bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] md:bottom-4"
    >
      {open && (
        <form
          onSubmit={handleSubmit}
          className="modal-panel panel-rune w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-border bg-surface p-3"
        >
          <label htmlFor="quick-capture" className="mb-2 block font-mono text-xs uppercase tracking-widest text-fg-muted">
            Captura rápida
          </label>
          <div className="flex gap-2">
            <input
              id="quick-capture"
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Qué se te ocurrió?"
              className="input-parchment min-w-0 flex-1 rounded-xl px-3 py-3 text-base text-fg"
            />
            <button
              type="submit"
              disabled={!title.trim()}
              className="btn-prime rounded-xl px-4 font-mono text-xs font-black uppercase tracking-widest disabled:opacity-50"
            >
              Guardar
            </button>
          </div>
          <p className="mt-2 font-mono text-xs text-fg-muted">
            {captured > 0
              ? `${captured} capturada${captured > 1 ? 's' : ''} · se ordenan luego en Estrategia`
              : 'Solo escribe. Categoría y fecha se definen después.'}
          </p>
        </form>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar captura rápida' : 'Captura rápida'}
        aria-expanded={open}
        className="btn-prime flex h-14 w-14 items-center justify-center rounded-full shadow-2xl"
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-7 w-7" />}
      </button>
    </div>
  )
}
```

### src/features/kanban/api.ts

```typescript
import { supabase } from '@/lib/supabase'
import type { KanbanColumn } from '@/types/database.types'

export async function fetchKanbanColumns(projectId: string | null): Promise<KanbanColumn[]> {
  const query = supabase.from('kanban_columns').select('*').order('position')
  const { data, error } = await (projectId
    ? query.eq('project_id', projectId)
    : query.is('project_id', null))
  if (error) throw error
  return data
}

export async function fetchFirstColumnId(projectId: string | null): Promise<string> {
  const columns = await fetchKanbanColumns(projectId)
  const first = columns.find((c) => c.position === 1) ?? columns[0]
  if (!first) {
    throw new Error('Este tablero todavía no tiene columnas por defecto.')
  }
  return first.id
}
```

### src/features/kanban/components/GrimorioAccordionView.tsx

```tsx
import { useState } from 'react'
import { ChevronDown, Search, Check, Landmark, ScrollText, Swords } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask } from '@/features/tasks/hooks'
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import { RescheduleButtons } from '@/features/tasks/components/RescheduleButtons'
import { isOverdue } from '@/utils/datetime'
import type { Category, Task } from '@/types/database.types'

export function GrimorioAccordionView({
  tasks,
  onOpenTask,
}: {
  tasks: Task[]
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const completeTask = useCompleteTask()

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [openSections, setOpenSections] = useState({
    active: true,
    upcoming: true,
    archive: false,
  })

  function toggleSection(key: 'active' | 'upcoming' | 'archive') {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const filtered = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchesCat = !selectedCategory || t.category_id === selectedCategory
    return matchesSearch && matchesCat
  })

  const now = new Date()
  const activeTasks = filtered.filter((t) => t.hud_slot !== null && t.status !== 'done')
  const upcomingTasks = filtered.filter((t) => {
    if (t.hud_slot !== null || t.status === 'done') return false
    if (!t.deadline) return true
    const days = differenceInDays(new Date(t.deadline), now)
    return days <= 3
  })
  const archiveTasks = filtered.filter((t) => {
    if (t.hud_slot !== null || t.status === 'done') return false
    if (!t.deadline) return false
    const days = differenceInDays(new Date(t.deadline), now)
    return days > 3
  })

  return (
    <div className="space-y-6">
      {/* Buscador & Filtros Rápidos */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar misiones o pergaminos..."
            className="w-full rounded-2xl border border-border bg-shade/40 py-3.5 pl-11 pr-4 text-sm text-fg outline-none transition-all focus:border-accent"
          />
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-40 text-fg" />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
              !selectedCategory
                ? 'bg-accent text-accent-fg'
                : 'border border-border text-fg-muted hover:text-fg'
            }`}
          >
            Todas
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full border px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat.id
                  ? 'border-transparent text-fg'
                  : 'border-border text-fg-muted/60 hover:text-fg'
              }`}
              style={
                selectedCategory === cat.id
                  ? { backgroundColor: `${cat.color_hex}33`, borderColor: cat.color_hex }
                  : undefined
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Acordeón de 3 Secciones */}
      <div className="space-y-4">
        {/* I. Enfrentamiento Activo */}
        <section className={`accordion-section rounded-2xl border border-border bg-surface/30 ${openSections.active ? 'active' : ''}`}>
          <button
            type="button"
            onClick={() => toggleSection('active')}
            className="flex w-full items-center justify-between border-b border-accent/40 bg-surface/80 p-4"
          >
            <div className="flex items-center gap-3">
              <Swords className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-accent">
                Enfrentamiento Activo (HUD)
              </h2>
              <span className="rounded-full bg-accent px-2 font-mono text-xs font-bold text-accent-fg">
                {activeTasks.length}
              </span>
            </div>
            <ChevronDown className="chevron-icon h-4 w-4 text-fg-muted transition-transform" />
          </button>
          <div className="accordion-content-panel space-y-2.5 p-4">
            {activeTasks.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">Sin misiones equipadas en combate.</p>
            ) : (
              activeTasks.map((task) => (
                <RenderMissionCard
                  key={task.id}
                  task={task}
                  categories={categories}
                  onOpenTask={onOpenTask}
                  onComplete={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
                />
              ))
            )}
          </div>
        </section>

        {/* II. Estrategia Próxima */}
        <section className={`accordion-section rounded-2xl border border-border bg-surface/30 ${openSections.upcoming ? 'active' : ''}`}>
          <button
            type="button"
            onClick={() => toggleSection('upcoming')}
            className="flex w-full items-center justify-between border-b border-border bg-surface/80 p-4"
          >
            <div className="flex items-center gap-3">
              <ScrollText className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-fg">
                Estrategia Próxima (Hoy - 3 Días)
              </h2>
              <span className="rounded-full bg-border px-2 font-mono text-xs font-bold text-fg">
                {upcomingTasks.length}
              </span>
            </div>
            <ChevronDown className="chevron-icon h-4 w-4 text-fg-muted transition-transform" />
          </button>
          <div className="accordion-content-panel space-y-2.5 p-4">
            {upcomingTasks.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">No hay urgencias inmediatas.</p>
            ) : (
              upcomingTasks.map((task) => (
                <RenderMissionCard
                  key={task.id}
                  task={task}
                  categories={categories}
                  onOpenTask={onOpenTask}
                  onComplete={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
                />
              ))
            )}
          </div>
        </section>

        {/* III. Archivos de la Orden */}
        <section className={`accordion-section rounded-2xl border border-border bg-surface/30 ${openSections.archive ? 'active' : ''}`}>
          <button
            type="button"
            onClick={() => toggleSection('archive')}
            className="flex w-full items-center justify-between border-b border-border bg-surface/80 p-4"
          >
            <div className="flex items-center gap-3 opacity-60">
              <Landmark className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-fg">
                Archivos de la Orden (Backlog Futuro)
              </h2>
              <span className="rounded-full bg-border px-2 font-mono text-xs font-bold text-fg">
                {archiveTasks.length}
              </span>
            </div>
            <ChevronDown className="chevron-icon h-4 w-4 text-fg-muted transition-transform" />
          </button>
          <div className="accordion-content-panel space-y-2.5 p-4">
            {archiveTasks.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">El archivo está vacío.</p>
            ) : (
              archiveTasks.map((task) => (
                <RenderMissionCard
                  key={task.id}
                  task={task}
                  categories={categories}
                  onOpenTask={onOpenTask}
                  onComplete={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function RenderMissionCard({
  task,
  categories,
  onOpenTask,
  onComplete,
}: {
  task: Task
  categories?: Category[]
  onOpenTask: (t: Task) => void
  onComplete: () => void
}) {
  const category = categories?.find((c) => c.id === task.category_id)

  return (
    <div className="mission-scroll-card rounded-xl p-3.5 transition-all">
      <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={() => onOpenTask(task)}
        className="min-w-0 flex-1 text-left"
      >
        <div className="flex items-center gap-2">
          {task.size && (
            <img
              src={WEAPON_ICONS[task.size]}
              alt=""
              className="h-4 w-4 object-contain opacity-70"
            />
          )}
          <h3 className="truncate font-display text-sm font-bold text-fg">{task.title}</h3>
        </div>
        <div className="mt-1 flex items-center gap-2 font-mono text-xs">
          {category && (
            <span
              className="rounded px-1.5 py-0.5 font-black uppercase"
              style={{
                backgroundColor: `${category.color_hex}25`,
                color: category.color_hex,
              }}
            >
              {category.name}
            </span>
          )}
          {task.deadline && (
            <span className="text-fg-muted/60 uppercase">
              {format(new Date(task.deadline), 'd MMM')}
            </span>
          )}
        </div>
      </button>

      <div className="flex items-center gap-3">
        {task.hud_slot !== null && (
          <span className="animate-pulse font-mono text-xs font-black text-accent">
            SLOT {task.hud_slot}
          </span>
        )}
        <button
          type="button"
          onClick={onComplete}
          className="flex h-7 w-7 items-center justify-center rounded border border-border text-xs transition-colors hover:border-accent hover:text-accent"
        >
          <Check className="h-4 w-4" aria-label="Completar" />
        </button>
      </div>
      </div>
      {isOverdue(task) && (
        <div className="mt-2.5 border-t border-border pt-2.5">
          <p className="mb-2 font-mono text-xs text-gold">Rescate: termínala y gana XP extra, o reprográmala sin culpa.</p>
          <RescheduleButtons task={task} />
        </div>
      )}
    </div>
  )
}
```

### src/features/kanban/components/GrimorioTabsView.tsx

```tsx
import { Check, Landmark, Shield, Trophy, Hourglass } from 'lucide-react'
import { CLASS_ICONS } from '@/utils/classIcons'
import { useState } from 'react'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask } from '@/features/tasks/hooks'
import type { Category, Task } from '@/types/database.types'

export function GrimorioTabsView({
  tasks,
  onOpenTask,
}: {
  tasks: Task[]
  onOpenTask: (task: Task) => void
}) {
  const { data: categories } = useCategories()
  const completeTask = useCompleteTask()
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  const filteredTasks = tasks.filter((t) =>
    activeCategoryId ? t.category_id === activeCategoryId : true,
  )

  const pending = filteredTasks.filter((t) => t.status !== 'done')
  const completed = filteredTasks.filter((t) => t.status === 'done')

  return (
    <div className="space-y-8">
      {/* Navegación por Sellos de Cera (Wax Seals) */}
      <nav className="flex flex-wrap justify-center gap-3 md:gap-5">
        <button
          type="button"
          onClick={() => setActiveCategoryId(null)}
          className={`wax-seal-btn flex w-24 flex-col items-center rounded-xl border-2 border-border bg-surface p-3 text-center md:w-28 ${
            !activeCategoryId ? 'active' : ''
          }`}
        >
          <Landmark className="mb-1 h-6 w-6" aria-hidden="true" />
          <span className="font-mono text-xs font-bold uppercase tracking-tighter text-fg">
            Todas
          </span>
          <span className="mt-1 font-mono text-xs text-fg-muted/60">
            {tasks.filter((t) => t.status !== 'done').length}
          </span>
        </button>

        {categories?.map((cat) => {
          const catCount = tasks.filter((t) => t.category_id === cat.id && t.status !== 'done').length
          const CatIcon = CLASS_ICONS[cat.name] ?? Shield
          const isActive = activeCategoryId === cat.id

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryId(cat.id)}
              className={`wax-seal-btn flex w-24 flex-col items-center rounded-xl border-2 border-border bg-surface p-3 text-center md:w-28 ${
                isActive ? 'active' : ''
              }`}
            >
              <CatIcon className="mb-1 h-6 w-6" aria-hidden="true" />
              <span className="truncate font-mono text-xs font-bold uppercase tracking-tighter text-fg">
                {cat.class_name}
              </span>
              <span className="mt-1 font-mono text-xs text-fg-muted/60">{catCount}</span>
            </button>
          )
        })}
      </nav>

      {/* Grid de 2 Sub-Columnas: Pendientes & Completadas */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Pendientes */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border pb-2.5">
            <Hourglass className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="font-display text-base font-bold uppercase tracking-widest text-accent">
              Misiones Pendientes
            </h2>
            <span className="font-mono text-xs font-bold text-fg-muted">({pending.length})</span>
          </div>

          <div className="space-y-3">
            {pending.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">Sin tareas pendientes en este ámbito.</p>
            ) : (
              pending.map((task) => (
                <RenderTabCard
                  key={task.id}
                  task={task}
                  categories={categories}
                  onOpenTask={onOpenTask}
                  onComplete={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
                />
              ))
            )}
          </div>
        </section>

        {/* Completadas Recientemente */}
        <section className="space-y-4 opacity-75">
          <div className="flex items-center gap-2.5 border-b border-border pb-2.5">
            <Trophy className="h-5 w-5 text-gold" aria-hidden="true" />
            <h2 className="font-display text-base font-bold uppercase tracking-widest text-fg-muted">
              Completadas Recientemente
            </h2>
            <span className="font-mono text-xs font-bold text-fg-muted">({completed.length})</span>
          </div>

          <div className="space-y-3">
            {completed.length === 0 ? (
              <p className="font-mono text-xs text-fg-muted/50">Ninguna victoria registrada aquí aún.</p>
            ) : (
              completed.slice(0, 10).map((task) => (
                <RenderTabCard
                  key={task.id}
                  task={task}
                  categories={categories}
                  onOpenTask={onOpenTask}
                  onComplete={() => {}}
                  isDone
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function RenderTabCard({
  task,
  categories,
  onOpenTask,
  onComplete,
  isDone = false,
}: {
  task: Task
  categories?: Category[]
  onOpenTask: (t: Task) => void
  onComplete: () => void
  isDone?: boolean
}) {
  const category = categories?.find((c) => c.id === task.category_id)

  return (
    <div
      className={`mission-scroll-card flex items-center justify-between rounded-xl p-4 transition-all ${
        isDone ? 'opacity-60 line-through' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onOpenTask(task)}
        className="min-w-0 flex-1 text-left"
      >
        <h3 className="truncate font-display text-sm font-bold text-fg">{task.title}</h3>
        <div className="mt-1 flex items-center gap-3 font-mono text-xs">
          {category && (
            <span
              className="rounded px-2 py-0.5 uppercase"
              style={{ backgroundColor: `${category.color_hex}25`, color: category.color_hex }}
            >
              {category.name}
            </span>
          )}
          {task.size && (
            <span className="font-bold text-fg-muted/70">
              +{task.xp_reward || 10} XP
            </span>
          )}
        </div>
      </button>

      {!isDone && (
        <button
          type="button"
          onClick={onComplete}
          className="flex h-8 w-8 items-center justify-center rounded border border-border text-xs transition-colors hover:border-accent hover:text-accent"
        >
          <Check className="h-4 w-4" aria-label="Completar" />
        </button>
      )}
    </div>
  )
}
```

### src/features/kanban/components/KanbanPage.tsx

```tsx
import { ScrollText, Shield } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isPast, isToday } from 'date-fns'
import { useAllBoardTasks } from '@/features/tasks/hooks'
import { GrimorioAccordionView } from '@/features/kanban/components/GrimorioAccordionView'
import { GrimorioTabsView } from '@/features/kanban/components/GrimorioTabsView'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

type GrimorioMode = 'foco' | 'ambitos'
type DueFilter = 'all' | 'overdue' | 'today'

export function KanbanPage() {
  const [mode, setMode] = useState<GrimorioMode>(() => {
    return (localStorage.getItem('questly_grimorio_mode') as GrimorioMode) || 'foco'
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const location = useLocation()
  const [dueFilter, setDueFilter] = useState<DueFilter>(
    () => ((location.state as { dateFilter?: DueFilter } | null)?.dateFilter ?? 'all'),
  )

  const { data: tasks, isLoading } = useAllBoardTasks()

  const open = (tasks ?? []).filter((t) => t.status !== 'done' && t.deadline)
  const overdueCount = open.filter((t) => isPast(new Date(t.deadline!))).length
  const todayCount = open.filter((t) => isToday(new Date(t.deadline!))).length
  const visibleTasks = (tasks ?? []).filter((t) => {
    if (dueFilter === 'all') return true
    if (!t.deadline || t.status === 'done') return false
    return dueFilter === 'overdue' ? isPast(new Date(t.deadline)) : isToday(new Date(t.deadline))
  })

  function handleModeChange(nextMode: GrimorioMode) {
    setMode(nextMode)
    localStorage.setItem('questly_grimorio_mode', nextMode)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      {/* Header Titular & Toggle de Modo Dual */}
      <header className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-border pb-6 md:flex-row">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-widest text-accent">
            EL GRIMORIO
          </h1>
          <p className="font-mono text-xs text-fg-muted/70">
            Registro general de misiones y decretos.
          </p>
        </div>

        {/* Toggle Dual Foco / Ámbitos */}
        <div className="view-mode-toggle flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleModeChange('foco')}
            className={`view-mode-btn ${mode === 'foco' ? 'active' : ''}`}
          >
            <ScrollText className="mr-1.5 inline h-4 w-4" aria-hidden="true" /> Foco Gradual
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('ambitos')}
            className={`view-mode-btn ${mode === 'ambitos' ? 'active' : ''}`}
          >
            <Shield className="mr-1.5 inline h-4 w-4" aria-hidden="true" /> Ámbitos por Clase
          </button>
        </div>
      </header>

      {/* Filtro rápido por vencimiento */}
      <div className="mb-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por vencimiento">
        {([
          ['all', 'Todas'],
          ['overdue', `Por rescatar (${overdueCount})`],
          ['today', `Hoy (${todayCount})`],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setDueFilter(key)}
            aria-pressed={dueFilter === key}
            className={`rounded-full px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
              dueFilter === key ? 'bg-accent text-accent-fg' : 'border border-border text-fg-muted hover:text-fg'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Renderizado de la Vista Seleccionada */}
      <main>
        {isLoading ? (
          <p className="py-12 text-center font-mono text-xs text-fg-muted">
            Abriendo pergaminos del Grimorio…
          </p>
        ) : mode === 'foco' ? (
          <GrimorioAccordionView
            tasks={visibleTasks}
            onOpenTask={setEditingTask}
          />
        ) : (
          <GrimorioTabsView
            tasks={visibleTasks}
            onOpenTask={setEditingTask}
          />
        )}
      </main>

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
```

### src/features/notifications/api.ts

```typescript
import { differenceInCalendarDays } from 'date-fns'
import { supabase } from '@/lib/supabase'
import { fetchFollowUps } from '@/features/followups/api'
import { fetchActiveTasksWithDeadline } from '@/features/tasks/api'
import type { AppNotification, NotificationType } from '@/types/database.types'

export async function fetchNotifications(): Promise<AppNotification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('scheduled_at', { ascending: false })
  if (error) throw error
  return data
}

export async function dismissNotification(id: string): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .update({ dismissed_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

// "Descartar todas": marca como descartadas todas las pendientes. No borra las
// filas a propósito: el sync usa unique(task_id, type) y un borrado haría que
// la misma alerta reapareciera como nueva en la siguiente apertura.
export async function dismissAllNotifications(): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .update({ dismissed_at: new Date().toISOString() })
    .is('dismissed_at', null)
  if (error) throw error
}

interface ComputedAlert {
  task_id: string
  type: NotificationType
  message: string
}

// Calcula qué alertas corresponden ahora mismo (deadlines próximos/vencidos,
// follow-ups con recordatorio cumplido) y las guarda. No pisa dismissed_at:
// el upsert solo manda las columnas de ComputedAlert + scheduled_at, así que
// una notificación ya descartada por el usuario se mantiene descartada
// hasta que cambie de "type" (la siguiente escalada genera una fila nueva).
export async function syncNotifications(): Promise<void> {
  const [tasks, followUps] = await Promise.all([fetchActiveTasksWithDeadline(), fetchFollowUps()])
  const now = new Date()
  const alerts: ComputedAlert[] = []

  for (const task of tasks) {
    if (!task.deadline) continue
    const days = differenceInCalendarDays(new Date(task.deadline), now)
    if (days < 0) {
      alerts.push({ task_id: task.id, type: 'overdue', message: `Por rescatar (XP extra): ${task.title}` })
    } else if (days === 0) {
      alerts.push({ task_id: task.id, type: 'due_today', message: `Vence hoy: ${task.title}` })
    } else if (days === 1) {
      alerts.push({ task_id: task.id, type: 'upcoming_1d', message: `Vence mañana: ${task.title}` })
    } else if (days <= 3) {
      alerts.push({ task_id: task.id, type: 'upcoming_3d', message: `Vence en ${days} días: ${task.title}` })
    }
  }

  for (const followUp of followUps) {
    if (new Date(followUp.next_reminder_at) > now) continue
    alerts.push({
      task_id: followUp.task_id,
      type: 'follow_up',
      message: followUp.stakeholder_name
        ? `Seguimiento pendiente con ${followUp.stakeholder_name}`
        : 'Seguimiento pendiente',
    })
  }

  if (alerts.length === 0) return

  const { error } = await supabase.from('notifications').upsert(
    alerts.map((a) => ({ ...a, scheduled_at: now.toISOString() })),
    { onConflict: 'task_id,type' },
  )
  if (error) throw error
}
```

### src/features/notifications/components/NotificationBell.tsx

```tsx
import { useEffect, useState } from 'react'
import { Bell, Calendar, Clock, LifeBuoy, Link2 } from 'lucide-react'
import {
  useDismissAllNotifications,
  useDismissNotification,
  useNotifications,
  useSyncNotifications,
} from '@/features/notifications/hooks'
import { useTasksByIds } from '@/features/tasks/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { PushToggle } from '@/features/notifications/components/PushToggle'
import type { NotificationType, Task } from '@/types/database.types'

const TYPE_ICON: Record<NotificationType, typeof Bell> = {
  upcoming: Clock,
  upcoming_3d: Clock,
  upcoming_1d: Clock,
  due_today: Calendar,
  overdue: LifeBuoy,
  follow_up: Link2,
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const sync = useSyncNotifications()
  const { data: notifications } = useNotifications()
  const dismiss = useDismissNotification()
  const dismissAll = useDismissAllNotifications()

  useEffect(() => {
    sync.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const unread = notifications?.filter((n) => !n.dismissed_at) ?? []
  const { data: tasks } = useTasksByIds(unread.map((n) => n.task_id))

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative text-fg-muted transition-colors hover:text-fg"
        aria-label="Notificaciones"
      >
        <Bell className="h-5 w-5" />
        {unread.length > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-xs font-medium text-accent-fg">
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="modal-panel panel-rune absolute right-0 z-50 mt-2 w-80 rounded-lg border border-border bg-surface p-2 shadow-xl">
            {unread.length === 0 ? (
              <p className="p-3 text-sm text-fg-muted">Sin notificaciones pendientes.</p>
            ) : (
              <>
              <div className="flex items-center justify-between px-2 pb-1 pt-0.5">
                <span className="font-mono text-xs text-fg-muted">{unread.length} pendientes</span>
                <button
                  type="button"
                  onClick={() => dismissAll.mutate()}
                  disabled={dismissAll.isPending}
                  className="rounded-md px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:bg-surface-2 disabled:opacity-50"
                >
                  Descartar todas
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {unread.map((notification) => {
                  const Icon = TYPE_ICON[notification.type]
                  const task = tasks?.find((t) => t.id === notification.task_id)
                  return (
                    <li
                      key={notification.id}
                      className="flex items-start gap-2 rounded-md p-2 transition-colors hover:bg-surface-2"
                    >
                      <Icon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          notification.type === 'overdue' ? 'text-warn-fg' : 'text-fg-muted'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (task) setEditingTask(task)
                          setOpen(false)
                        }}
                        className="flex-1 text-left text-sm text-fg"
                      >
                        {notification.message}
                      </button>
                      <button
                        type="button"
                        onClick={() => dismiss.mutate(notification.id)}
                        className="shrink-0 text-fg-muted/60 hover:text-fg"
                        aria-label="Descartar"
                      >
                        ×
                      </button>
                    </li>
                  )
                })}
              </ul>
              </>
            )}
            <PushToggle />
          </div>
        </>
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
```

### src/features/notifications/components/PushToggle.tsx

```tsx
import { useEffect, useState } from 'react'
import { BellRing, BellOff } from 'lucide-react'
import {
  getPushSubscriptionState,
  isPushSupported,
  subscribeToPush,
  unsubscribeFromPush,
} from '@/features/notifications/push'

export function PushToggle() {
  const [subscribed, setSubscribed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supported = isPushSupported()

  useEffect(() => {
    if (supported) getPushSubscriptionState().then(setSubscribed)
  }, [supported])

  if (!supported) return null

  async function toggle() {
    setBusy(true)
    setError(null)
    try {
      if (subscribed) {
        await unsubscribeFromPush()
        setSubscribed(false)
      } else {
        await subscribeToPush()
        setSubscribed(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cambiar el estado del push.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="border-t border-border p-2">
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-fg-muted transition-colors hover:bg-surface-2 disabled:opacity-60"
      >
        {subscribed ? <BellOff className="h-3.5 w-3.5" /> : <BellRing className="h-3.5 w-3.5" />}
        {subscribed ? 'Desactivar notificaciones push' : 'Activar notificaciones push'}
      </button>
      {error && <p className="px-2 text-xs text-warn-fg">{error}</p>}
    </div>
  )
}
```

### src/features/notifications/hooks.ts

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { dismissAllNotifications, dismissNotification, fetchNotifications, syncNotifications } from '@/features/notifications/api'

export function useNotifications() {
  return useQuery({ queryKey: ['notifications'], queryFn: fetchNotifications })
}

export function useSyncNotifications() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: syncNotifications,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })
}

export function useDismissNotification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: dismissNotification,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })
}

export function useDismissAllNotifications() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: dismissAllNotifications,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })
}
```

### src/features/notifications/push.ts

```typescript
import { supabase } from '@/lib/supabase'

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(new ArrayBuffer(rawData.length))
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function isPushSupported(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window
}

async function saveSubscription(subscription: PushSubscription): Promise<void> {
  const json = subscription.toJSON()
  if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
    throw new Error('Suscripción de push inválida.')
  }
  const { error } = await supabase
    .from('push_subscriptions')
    .upsert(
      { endpoint: json.endpoint, p256dh: json.keys.p256dh, auth: json.keys.auth },
      { onConflict: 'endpoint' },
    )
  if (error) throw error
}

export async function subscribeToPush(): Promise<void> {
  if (!isPushSupported()) {
    throw new Error('Este navegador no soporta notificaciones push.')
  }
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    throw new Error('Permiso de notificaciones denegado.')
  }

  const registration = await navigator.serviceWorker.ready
  const existing = await registration.pushManager.getSubscription()
  const subscription =
    existing ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
    }))
  await saveSubscription(subscription)
}

export async function unsubscribeFromPush(): Promise<void> {
  if (!isPushSupported()) return
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.getSubscription()
  if (!subscription) return
  const { error } = await supabase
    .from('push_subscriptions')
    .delete()
    .eq('endpoint', subscription.endpoint)
  if (error) throw error
  await subscription.unsubscribe()
}

export async function getPushSubscriptionState(): Promise<boolean> {
  if (!isPushSupported()) return false
  const registration = await navigator.serviceWorker.getRegistration()
  if (!registration) return false
  const subscription = await registration.pushManager.getSubscription()
  return !!subscription
}
```

### src/features/projects/api.ts

```typescript
import { supabase } from '@/lib/supabase'
import type { Category, Project, Task, TaskSize } from '@/types/database.types'

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('position')
  if (error) throw error
  return data
}

export async function fetchActiveProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function fetchArchivedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'archived')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createProject(input: {
  name: string
  categoryId: string
  description?: string
}): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      name: input.name,
      category_id: input.categoryId,
      description: input.description ?? null,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProject(
  id: string,
  patch: Partial<Pick<Project, 'name' | 'boss_title' | 'boss_avatar' | 'status'>>,
): Promise<Project> {
  const { data, error } = await supabase.from('projects').update(patch).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

// Fase 7, Módulo 2 — "Dungeon Bosses". HP = suma del valor de tamaño de las
// tareas de nivel superior del proyecto (Pequeña=10/Mediana=25/Grande=50,
// igual que xp_reward). Se calcula acá en el cliente sobre una query normal
// de `tasks` (ya protegida por RLS) en vez de una función SQL con privilegios
// elevados — ver nota en la migración de esta fase.
const BOSS_PHASE_HP: Record<TaskSize, number> = { small: 10, medium: 25, large: 50 }

function taskHp(task: Task): number {
  return task.size ? BOSS_PHASE_HP[task.size] : 10
}

export interface BossStats {
  totalHp: number
  currentHp: number
  percentRemaining: number
}

export function computeBossStats(tasks: Task[]): BossStats {
  const totalHp = tasks.reduce((sum, t) => sum + taskHp(t), 0)
  const doneHp = tasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + taskHp(t), 0)
  const currentHp = totalHp - doneHp
  const percentRemaining = totalHp > 0 ? Math.round((currentHp / totalHp) * 10000) / 100 : 100
  return { totalHp, currentHp, percentRemaining }
}

// Umbrales de fase, en % de HP restante. 0 = jefe derrotado del todo.
export const BOSS_PHASES = [75, 50, 25, 0] as const

export async function claimBossPhase(projectId: string, phase: number): Promise<Project> {
  const { data, error } = await supabase
    .rpc('claim_boss_phase', { p_project_id: projectId, p_phase: phase })
    .single()
  if (error) throw error
  return data as Project
}
```

### src/features/projects/components/BossEncounterPage.tsx

```tsx
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Swords } from 'lucide-react'
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
              className="h-full w-full rounded-full object-cover bg-shade/40"
            />
          </div>
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-bg px-4 py-0.5 font-mono text-xs font-black uppercase tracking-tighter text-fg shadow-lg"
            style={{ backgroundColor: category?.color_hex ?? '#4a8f5a' }}
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
                  <p className="font-mono text-xs uppercase text-fg-muted/60">
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
                    className={`rounded px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                      task.hud_slot !== null
                        ? 'border border-accent/40 bg-accent/20 text-accent'
                        : 'border border-glass/10 bg-glass/5 text-fg-muted hover:bg-glass/10 hover:text-fg disabled:opacity-40'
                    }`}
                  >
                    {task.hud_slot !== null ? (
                      'En HUD'
                    ) : (
                      <span className="inline-flex items-center gap-1"><Swords className="h-3.5 w-3.5" aria-hidden="true" /> Equipar</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
                    className="rounded border border-red-600/40 bg-red-600/20 px-4 py-2 font-mono text-xs font-black uppercase tracking-widest text-red-400 transition-all hover:bg-red-600 hover:text-white"
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
```

### src/features/projects/components/BossHealthBar.tsx

```tsx
import { BOSS_PHASES } from '@/features/projects/api'
import { LOOT_ICONS } from '@/utils/rpgAssets'

export function BossHealthBar({
  totalHp,
  currentHp,
  percentRemaining,
  phasesClaimed,
}: {
  totalHp: number
  currentHp: number
  percentRemaining: number
  phasesClaimed: number[]
}) {
  return (
    <div className="space-y-4">
      {/* Indicadores Numéricos */}
      <div className="flex items-end justify-between px-1">
        <span className="font-display text-lg font-bold tracking-tight text-red-500">
          VIDA DEL JEFE
        </span>
        <span className="font-mono text-xl font-black text-fg">
          {currentHp} / {totalHp} HP
        </span>
      </div>

      {/* Barra de Salud Masiva */}
      <div className="boss-hp-container relative h-10 w-full overflow-hidden rounded-xl bg-shade/60">
        <div
          className="boss-hp-fill h-full"
          style={{ width: `${Math.max(0, Math.min(100, percentRemaining))}%` }}
        />
        {/* Marcas de Fase (75%, 50%, 25%) */}
        {BOSS_PHASES.filter((p) => p > 0).map((phase) => (
          <div
            key={phase}
            className="phase-mark-line"
            style={{ left: `${phase}%` }}
          />
        ))}
      </div>

      {/* Cofres de Loot de Fase */}
      <div className="flex justify-between px-2 pt-1">
        {BOSS_PHASES.map((phase) => {
          const claimed = phasesClaimed.includes(phase)
          const isReached = percentRemaining <= phase
          const isActive = claimed || isReached

          return (
            <div
              key={phase}
              className={`chest-icon-phase flex flex-col items-center gap-1.5 ${
                isActive ? 'active' : ''
              }`}
            >
              <img
                src={LOOT_ICONS.chest_phase}
                alt={phase === 0 ? 'Victoria final' : `Fase ${phase}%`}
                className="h-8 w-8 object-contain"
              />
              <span className="font-mono text-xs uppercase tracking-widest text-fg-muted/70">
                {phase === 0 ? 'Victoria' : `${phase}% Loot`}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

### src/features/projects/components/PhaseRewardModal.tsx

```tsx
import { Trophy } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { LOOT_ICONS } from '@/utils/rpgAssets'

const AUTO_DISMISS_MS = 4000

export function PhaseRewardModal({
  phase,
  xp,
  onDone,
}: {
  phase: number
  xp: number
  onDone: () => void
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const isDefeat = phase === 0

  useEffect(() => {
    const timer = window.setTimeout(onDone, AUTO_DISMISS_MS)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/85 p-6 backdrop-blur-md"
      onClick={onDone}
      role="status"
    >
      <div
        ref={stageRef}
        onClick={(e) => e.stopPropagation()}
        className="modal-panel relative w-full max-w-sm rounded-3xl border-2 border-accent bg-surface p-8 text-center shadow-[0_0_100px_rgb(var(--accent-rgb)/0.35)]"
      >
        <div className="gold-shimmer-bg pointer-events-none absolute inset-0 rounded-3xl opacity-30" />

        <div className="mb-4 flex justify-center">
          {isDefeat ? (
            <Trophy className="h-16 w-16 animate-bounce text-gold" aria-hidden="true" />
          ) : (
            <img
              src={LOOT_ICONS.chest_phase}
              alt="Cofre de fase"
              className="h-16 w-16 animate-bounce object-contain drop-shadow-[0_0_12px_rgb(var(--gold-rgb)/0.6)]"
            />
          )}
        </div>

        <h2 className="mb-1 font-display text-2xl font-black uppercase tracking-tighter text-accent">
          {isDefeat ? '¡JEFE DERROTADO!' : '¡GOLPE CRÍTICO!'}
        </h2>
        <p className="mb-6 font-display text-xs tracking-widest text-fg-muted uppercase">
          {isDefeat ? 'PROYECTO CONQUISTADO' : `FASE ${phase}% ROTA`}
        </p>

        <div className="mb-6 rounded-2xl border border-border bg-shade/40 p-4">
          <p className="mb-1 font-mono text-xs uppercase text-fg-muted/60">
            Tesoro Desbloqueado
          </p>
          <p className="font-mono text-xl font-black text-rune">+{xp} XP EXTRA</p>
        </div>

        <button
          type="button"
          onClick={onDone}
          className="btn-prime w-full rounded-xl py-3.5 font-display text-xs font-black uppercase tracking-widest"
        >
          Reclamar Botín
        </button>
      </div>
    </div>
  )
}
```

### src/features/projects/components/ProjectBossCard.tsx

```tsx
import { Trophy } from 'lucide-react'
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
          {defeated ? <Trophy className="h-4 w-4 text-gold" aria-label="Derrotado" /> : `${stats.currentHp}/${stats.totalHp}`}
        </span>
      )}
    </Link>
  )
}
```

### src/features/projects/components/ProjectsPage.tsx

```tsx
import { useState, type FormEvent } from 'react'
import { ArchiveRestore, FolderOpen, Pencil } from 'lucide-react'
import { showToast } from '@/components/ui/toast-store'
import { useArchivedProjects, useCategories, useCreateProject, useProjects, useUpdateProject } from '@/features/projects/hooks'
import { ProjectBossCard } from '@/features/projects/components/ProjectBossCard'
import { BOSS_AVATARS } from '@/utils/rpgAssets'
import type { Category, Project } from '@/types/database.types'

const BOSS_LABELS: Record<keyof typeof BOSS_AVATARS, string> = {
  dragon_default: 'Dragón',
  lich_default: 'Liche',
}

function ProjectRow({ project, category }: { project: Project; category?: Category }) {
  const update = useUpdateProject()
  const [editing, setEditing] = useState(false)
  const [confirmArchive, setConfirmArchive] = useState(false)
  const [name, setName] = useState(project.name)
  const [bossTitle, setBossTitle] = useState(project.boss_title)
  const [bossAvatar, setBossAvatar] = useState(project.boss_avatar)

  function save() {
    const trimmed = name.trim()
    if (!trimmed) return
    update.mutate(
      { id: project.id, patch: { name: trimmed, boss_title: bossTitle.trim() || project.boss_title, boss_avatar: bossAvatar } },
      { onSuccess: () => { setEditing(false); showToast({ title: 'Proyecto actualizado' }) } },
    )
  }

  function archive() {
    update.mutate(
      { id: project.id, patch: { status: 'archived' } },
      { onSuccess: () => showToast({ title: 'Proyecto archivado', detail: project.name }) },
    )
  }

  return (
    <li className="space-y-2">
      <ProjectBossCard project={project} category={category} />

      {editing ? (
        <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
          <label className="block font-mono text-xs uppercase tracking-widest text-fg-muted">
            Nombre
            <input value={name} onChange={(e) => setName(e.target.value)} className="input-parchment mt-1 w-full rounded-lg px-3 py-2.5 text-base normal-case text-fg" />
          </label>
          <label className="block font-mono text-xs uppercase tracking-widest text-fg-muted">
            Título del jefe
            <input value={bossTitle} onChange={(e) => setBossTitle(e.target.value)} className="input-parchment mt-1 w-full rounded-lg px-3 py-2.5 text-base normal-case text-fg" />
          </label>
          <label className="block font-mono text-xs uppercase tracking-widest text-fg-muted">
            Jefe
            <select value={bossAvatar} onChange={(e) => setBossAvatar(e.target.value)} className="parchment-select mt-1 w-full rounded-lg p-2.5 text-base normal-case">
              {Object.entries(BOSS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={save} disabled={!name.trim() || update.isPending} className="btn-prime flex-1 rounded-lg py-3 font-mono text-xs font-black uppercase tracking-widest disabled:opacity-50">
              Guardar
            </button>
            <button type="button" onClick={() => setEditing(false)} className="rounded-lg border border-border px-4 py-3 font-mono text-xs font-bold uppercase text-fg-muted">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={() => setEditing(true)} className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg">
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Editar
          </button>
          {confirmArchive ? (
            <>
              <button type="button" onClick={archive} disabled={update.isPending} className="rounded-lg bg-accent px-3 py-2.5 font-mono text-xs font-black uppercase text-accent-fg">
                Sí, archivar
              </button>
              <button type="button" onClick={() => setConfirmArchive(false)} className="rounded-lg px-3 py-2.5 font-mono text-xs font-bold uppercase text-fg-muted">
                No
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setConfirmArchive(true)} className="rounded-lg px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg">
              Archivar
            </button>
          )}
        </div>
      )}
    </li>
  )
}

export function ProjectsPage() {
  const { data: projects, isLoading } = useProjects()
  const { data: categories } = useCategories()
  const createProject = useCreateProject()
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [showArchived, setShowArchived] = useState(false)
  const { data: archived } = useArchivedProjects(showArchived)
  const restore = useUpdateProject()

  function handleCreate(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !categoryId) return
    createProject.mutate(
      { name: name.trim(), categoryId },
      { onSuccess: () => { setName(''); showToast({ title: 'Proyecto creado' }) } },
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <header className="mb-8">
        <h1 className="flex items-center gap-3 font-display text-3xl font-black uppercase tracking-widest text-accent">
          <FolderOpen className="h-8 w-8" aria-hidden="true" /> Proyectos
        </h1>
        <p className="mt-1 font-mono text-xs text-fg-muted">
          Cada proyecto es un jefe: terminar sus misiones baja su vida. Toca uno para entrar a su sala.
        </p>
      </header>

      <form onSubmit={handleCreate} className="mb-8 grid gap-3 rounded-2xl border border-border bg-surface/60 p-4 sm:grid-cols-[1fr_auto_auto]">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del nuevo proyecto" aria-label="Nombre del nuevo proyecto" className="input-parchment rounded-xl px-4 py-3 text-base text-fg" />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} aria-label="Clase del proyecto" className="parchment-select rounded-xl p-3 text-base">
          <option value="" disabled>Clase</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit" disabled={!name.trim() || !categoryId || createProject.isPending} className="btn-prime rounded-xl px-6 py-3 font-mono text-xs font-black uppercase tracking-widest disabled:opacity-50">
          Crear
        </button>
      </form>

      {isLoading ? (
        <p className="py-8 text-center font-mono text-xs text-fg-muted">Cargando proyectos…</p>
      ) : !projects || projects.length === 0 ? (
        <p className="py-8 text-center font-mono text-sm text-fg-muted">
          Aún no tienes proyectos. Crea uno arriba, o desde la Mesa de Estrategia al ordenar una captura.
        </p>
      ) : (
        <ul className="space-y-5">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} category={categories?.find((c) => c.id === project.category_id)} />
          ))}
        </ul>
      )}

      <section className="mt-10">
        <button
          type="button"
          onClick={() => setShowArchived((v) => !v)}
          aria-expanded={showArchived}
          className="rounded-lg px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
        >
          {showArchived ? 'Ocultar archivados' : 'Ver archivados'}
        </button>
        {showArchived && (
          <ul className="mt-3 space-y-2">
            {!archived || archived.length === 0 ? (
              <li className="font-mono text-xs text-fg-muted">No hay proyectos archivados.</li>
            ) : (
              archived.map((project) => (
                <li key={project.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3">
                  <span className="min-w-0 truncate text-sm text-fg-muted">{project.name}</span>
                  <button
                    type="button"
                    disabled={restore.isPending}
                    onClick={() =>
                      restore.mutate(
                        { id: project.id, patch: { status: 'active' } },
                        { onSuccess: () => showToast({ title: 'Proyecto restaurado', detail: project.name }) },
                      )
                    }
                    className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-accent hover:bg-accent/10"
                  >
                    <ArchiveRestore className="h-4 w-4" aria-hidden="true" /> Restaurar
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </section>
    </div>
  )
}
```

### src/features/projects/hooks.ts

```typescript
import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  claimBossPhase,
  computeBossStats,
  createProject,
  fetchActiveProjects,
  fetchArchivedProjects,
  fetchCategories,
  fetchProjectById,
  updateProject,
} from '@/features/projects/api'
import { useTasksByProject } from '@/features/tasks/hooks'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  })
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchActiveProjects,
  })
}

export function useArchivedProjects(enabled: boolean) {
  return useQuery({
    queryKey: ['projects', 'archived'],
    queryFn: fetchArchivedProjects,
    enabled,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof updateProject>[1] }) =>
      updateProject(id, patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })
}

export function useProjectById(id: string) {
  return useQuery({
    queryKey: ['projects', 'by-id', id],
    queryFn: () => fetchProjectById(id),
  })
}

// HP del "Jefe de Mazmorra" del proyecto — se recalcula solo cuando cambian
// las tareas del proyecto (misma clave de cache que useTasksByProject).
export function useBossStats(projectId: string) {
  const { data: tasks } = useTasksByProject(projectId)
  return useMemo(() => (tasks ? computeBossStats(tasks) : undefined), [tasks])
}

export function useClaimBossPhase() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ projectId, phase }: { projectId: string; phase: number }) =>
      claimBossPhase(projectId, phase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['gamification'] })
    },
  })
}
```

### src/features/tasks/api.ts

```typescript
import { supabase } from '@/lib/supabase'
import { fetchKanbanColumns } from '@/features/kanban/api'
import type { Database, Task } from '@/types/database.types'

export type NewTask = Pick<
  Database['public']['Tables']['tasks']['Insert'],
  | 'title'
  | 'description'
  | 'deadline'
  | 'project_id'
  | 'category_id'
  | 'kanban_column_id'
  | 'parent_task_id'
  | 'size'
>

export type TaskPatch = Partial<
  Pick<
    Database['public']['Tables']['tasks']['Update'],
    | 'title'
    | 'description'
    | 'deadline'
    | 'project_id'
    | 'category_id'
    | 'kanban_column_id'
    | 'parent_task_id'
    | 'status'
    | 'size'
    | 'hud_slot'
    | 'position'
  >
>

export async function fetchTaskById(id: string): Promise<Task | null> {
  const { data, error } = await supabase.from('tasks').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

export async function fetchTasksByIds(ids: string[]): Promise<Task[]> {
  if (ids.length === 0) return []
  const { data, error } = await supabase.from('tasks').select('*').in('id', ids)
  if (error) throw error
  return data
}

// Solo misiones de nivel superior. Los micro-pasos heredan el deadline de su
// misión y, si se completa la misión con pasos sin tildar, quedan 'pending' con
// una fecha ya pasada: contarlos inflaba "vencidas" (y generaba avisos de
// micro-pasos). Mismo criterio que la Edge Function de notificaciones.
export async function fetchActiveTasksWithDeadline(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .is('parent_task_id', null)
    .not('status', 'in', '(done,follow_up)')
    .not('deadline', 'is', null)
  if (error) throw error
  return data
}

export async function fetchInProgressTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'in_progress')
    .is('parent_task_id', null)
    .order('deadline', { ascending: true, nullsFirst: false })
  if (error) throw error
  return data
}

// Todas las tareas de nivel superior de un proyecto, sin filtrar por status
// ni columna — usada para calcular el HP del "Jefe de Mazmorra" (Fase 7,
// Módulo 2). A propósito NO excluye 'follow_up': mientras no esté 'done'
// sigue representando daño pendiente al jefe.
export async function fetchTasksByProject(projectId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .is('parent_task_id', null)
  if (error) throw error
  return data
}

// Todas las tareas de nivel superior de una categoría, sin filtrar por
// status — usada por ClassDetailModal (Fase 7, Módulo 8) para listar
// misiones activas/completadas de esa clase.
export async function fetchTasksByCategory(categoryId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('category_id', categoryId)
    .is('parent_task_id', null)
  if (error) throw error
  return data
}

export async function fetchInboxTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .is('kanban_column_id', null)
    .is('parent_task_id', null)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

// Trae TODAS las misiones trianas sin importar proyecto — la usa El Grimorio
// (Fase 7, Módulo 6), que unifica proyectos y tareas sueltas en una sola vista.
export async function fetchAllBoardTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .is('parent_task_id', null)
    .not('kanban_column_id', 'is', null)
    .neq('status', 'follow_up')
  if (error) throw error
  return data
}

export async function fetchSubtasks(parentTaskId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('parent_task_id', parentTaskId)
    .order('position', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

// Misiones de nivel superior, hechas o pendientes (las hechas se muestran
// tachadas en el calendario). Excluye las que están en seguimiento (liberadas
// de la vista activa, igual que en el Grimorio y las notificaciones) y los
// micro-pasos, que heredan el deadline de su misión y la duplicarían.
// Orden manual de los micro-pasos: la posición es el índice en la lista dada.
export async function reorderSubtasks(orderedIds: string[]): Promise<void> {
  await Promise.all(orderedIds.map((id, index) => updateTask(id, { position: index + 1 })))
}

export async function fetchTasksInRange(startIso: string, endIso: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .is('parent_task_id', null)
    .neq('status', 'follow_up')
    .gte('deadline', startIso)
    .lt('deadline', endIso)
    .order('deadline', { ascending: true })
  if (error) throw error
  return data
}

export async function createTask(input: NewTask): Promise<Task> {
  const { data, error } = await supabase.from('tasks').insert(input).select().single()
  if (error) throw error
  return data
}

export async function updateTask(id: string, patch: TaskPatch): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// Mueve el deadline de una misión. El trigger tasks_before_write prohíbe que el
// padre quede antes que alguna subtarea, así que primero se recortan al nuevo
// deadline las subtareas que lo superen (los micro-pasos heredan la fecha del
// padre); al mover hacia adelante ese UPDATE no toca nada.
export async function moveTaskDeadline(taskId: string, deadlineIso: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .update({ deadline: deadlineIso })
    .eq('parent_task_id', taskId)
    .gt('deadline', deadlineIso)
  if (error) throw error
  await updateTask(taskId, { deadline: deadlineIso })
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
}

// Marca la tarea como hecha y la mueve a la columna "Hecho" del tablero al
// que pertenece (mismo patrón que ya usaba el checkbox del modal). Libera
// también el slot del Battle HUD si estaba equipada ahí (Fase 7).
export async function completeTask(task: Pick<Task, 'id' | 'project_id'>): Promise<Task> {
  const columns = await fetchKanbanColumns(task.project_id)
  const doneColumn = columns.find((c) => c.name === 'Hecho')
  await closeFollowUpForTask(task.id)
  return updateTask(task.id, {
    status: 'done',
    hud_slot: null,
    ...(doneColumn ? { kanban_column_id: doneColumn.id } : {}),
  })
}

// Cierra el seguimiento activo de la tarea (si existe) y descarta sus
// notificaciones pendientes, para que no sigan llegando avisos de algo ya
// resuelto. Idempotente: sin follow-up activo no toca nada.
export async function closeFollowUpForTask(taskId: string): Promise<void> {
  const now = new Date().toISOString()
  const { error } = await supabase
    .from('follow_ups')
    .update({ resolved_at: now })
    .eq('task_id', taskId)
    .is('resolved_at', null)
  if (error) throw error
  const { error: notifError } = await supabase
    .from('notifications')
    .update({ dismissed_at: now })
    .eq('task_id', taskId)
    .eq('type', 'follow_up')
    .is('dismissed_at', null)
  if (notifError) throw notifError
}

// Revierte una tarea "Hecha" de vuelta a activa, moviéndola a "Por hacer".
export async function reopenTask(task: Pick<Task, 'id' | 'project_id'>): Promise<Task> {
  const columns = await fetchKanbanColumns(task.project_id)
  const todoColumn = columns.find((c) => c.name === 'Por hacer')
  return updateTask(task.id, {
    status: 'pending',
    ...(todoColumn ? { kanban_column_id: todoColumn.id } : {}),
  })
}

// "Enviar a Follow-up": libera la tarea de la vista activa del Kanban sin
// cerrarla — status pasa a 'follow_up', queda fuera del tablero pero visible
// en la página de Follow-ups hasta que se registre contacto y se complete.
// También libera el slot del Battle HUD atómicamente si estaba equipada ahí
// (confirmado con Gemini en la spec del Módulo 1 — sin estado intermedio).
export async function sendTaskToFollowUp(taskId: string): Promise<Task> {
  return updateTask(taskId, { status: 'follow_up', hud_slot: null })
}

// Tareas (y subtareas) completadas hoy — para calcular el XP ganado en el día
// en el resumen del Inbox. `completed_at` lo pone el trigger `tasks_before_write`.
export async function fetchTasksCompletedToday(): Promise<Task[]> {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'done')
    .gte('completed_at', startOfToday.toISOString())
  if (error) throw error
  return data
}

// Última tarea completada (de nivel superior) — para el "última victoria" del Inbox.
export async function fetchLastCompletedTask(): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'done')
    .is('parent_task_id', null)
    .order('completed_at', { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data
}

// Tarea "Pequeña" activa más urgente — sugerencia de "quick win" en el Inbox.
export async function fetchQuickWinTask(): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('size', 'small')
    .in('status', ['pending', 'in_progress'])
    .is('parent_task_id', null)
    .order('deadline', { ascending: true, nullsFirst: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data
}
```

### src/features/tasks/components/FocusFloat.tsx

```tsx
import { createPortal } from 'react-dom'
import { Check, PictureInPicture2 } from 'lucide-react'
import { useCompleteTask, useInProgressTasks } from '@/features/tasks/hooks'
import { useCategories } from '@/features/projects/hooks'
import { useFocusFloat } from '@/features/tasks/FocusFloatContext'
import { useFocusSession } from '@/features/tasks/focusSessionContext'
import { FocusSessionView } from '@/features/tasks/components/FocusSessionView'

const MAX_TASKS = 3

function InProgressList() {
  const { data: inProgress } = useInProgressTasks()
  const { data: categories } = useCategories()
  const completeTask = useCompleteTask()

  const tasks = (inProgress ?? []).slice(0, MAX_TASKS)

  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <p className="font-display text-xs font-semibold uppercase tracking-wide text-fg-muted">
        En progreso
      </p>
      {tasks.length === 0 ? (
        <p className="text-sm text-fg-muted">Nada en progreso. ¡Bien ahí!</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {tasks.map((task) => {
            const category = categories?.find((c) => c.id === task.category_id)
            return (
              <li
                key={task.id}
                className="flex items-center gap-2 rounded-md border border-border bg-surface p-2"
                style={
                  category ? { borderLeft: `3px solid ${category.color_hex}` } : undefined
                }
              >
                <span className="min-w-0 flex-1 truncate text-sm text-fg" title={task.title}>
                  {task.title}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    completeTask.mutate({ id: task.id, project_id: task.project_id })
                  }
                  title="Completar"
                  aria-label={`Completar ${task.title}`}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-all duration-150 hover:shadow-[0_0_10px_rgb(var(--accent-rgb)/0.5)] active:scale-90"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// Si hay un Modo Foco activo, la ventana flotante lo replica (misión, temporizador
// y micro-pasos); si no, muestra la lista de tareas "En progreso".
function FocusFloatContent() {
  const { taskId } = useFocusSession()
  return taskId ? (
    <div className="h-full overflow-y-auto">
      <FocusSessionView taskId={taskId} compact fallback={<InProgressList />} />
    </div>
  ) : (
    <InProgressList />
  )
}

/**
 * Botón del nav para la ventana flotante de foco (Document Picture-in-Picture):
 * mini-ventana siempre-encima y redimensionable con las tareas "En progreso"
 * (máx. 3) y su check de completar. Persiste al cambiar de app/ventana; el
 * navegador exige un gesto del usuario para abrirla, por eso es un botón y no
 * automática al minimizar. Solo disponible en Chrome/Edge de escritorio — el
 * botón no se renderiza si la API no existe. El estado real vive en
 * `FocusFloatContext` (compartido con `CombatSlotCard`); acá solo se renderiza
 * el toggle y el portal del contenido.
 */
export function FocusFloatButton() {
  const { pipWindow, supported, open, close } = useFocusFloat()

  if (!supported) return null

  return (
    <>
      <button
        type="button"
        onClick={() => void (pipWindow ? close() : open())}
        title={pipWindow ? 'Cerrar ventana de foco' : 'Ventana flotante de foco'}
        aria-label="Ventana flotante de foco"
        className={`transition-colors ${
          pipWindow
            ? 'text-accent drop-shadow-[0_0_6px_rgb(var(--accent-rgb)/0.5)]'
            : 'text-fg-muted hover:text-fg'
        }`}
      >
        <PictureInPicture2 className="h-5 w-5" />
      </button>
      {pipWindow && createPortal(<FocusFloatContent />, pipWindow.document.body)}
    </>
  )
}
```

### src/features/tasks/components/FocusModePage.tsx

```tsx
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, LogOut, PictureInPicture2 } from 'lucide-react'
import { useFocusFloat } from '@/features/tasks/FocusFloatContext'
import { useFocusSession } from '@/features/tasks/focusSessionContext'
import { FocusSessionView } from '@/features/tasks/components/FocusSessionView'

// Modo Foco dentro de la app: una sola misión, sus micro-pasos y un
// temporizador OPCIONAL (ceguera de tiempo). Funciona en móvil, a diferencia
// de la ventana flotante (solo Chrome/Edge de escritorio), que muestra esta
// misma sesión cuando está abierta. El botón de captura rápida sigue visible
// a propósito: anotar la idea que te distrae sin salir del foco.
export function FocusModePage() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { supported: pipSupported, open: openPip } = useFocusFloat()
  const { begin, end } = useFocusSession()

  useEffect(() => {
    if (taskId) begin(taskId)
  }, [taskId, begin])

  if (!taskId) return null

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8 px-4 py-8">
      <Link
        to="/"
        className="flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al Combate (el foco sigue activo)
      </Link>

      <FocusSessionView
        taskId={taskId}
        onCompleted={() => navigate('/')}
        fallback={
          <div className="py-12 text-center">
            <p className="mb-6 font-display text-lg text-fg">Esta misión ya no está activa.</p>
            <Link
              to="/"
              className="btn-prime inline-block rounded-full px-8 py-3 font-display text-xs font-bold uppercase tracking-widest"
            >
              Volver al Combate
            </Link>
          </div>
        }
      />

      <footer className="flex flex-col gap-3">
        {pipSupported && (
          <button
            type="button"
            onClick={() => void openPip()}
            className="flex items-center justify-center gap-2 rounded-xl border border-border py-3 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
          >
            <PictureInPicture2 className="h-4 w-4" aria-hidden="true" /> Ventana flotante
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            end()
            navigate('/')
          }}
          className="flex items-center justify-center gap-2 rounded-xl py-3 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" /> Salir del foco
        </button>
      </footer>
    </div>
  )
}
```

### src/features/tasks/components/FocusSessionView.tsx

```tsx
import { useEffect, type ReactNode } from 'react'
import { Check, Timer } from 'lucide-react'
import { useCompleteTask, useSubtasks, useTaskById, useUpdateTask } from '@/features/tasks/hooks'
import { useFocusSession } from '@/features/tasks/focusSessionContext'
import { formatClock, useFocusClock } from '@/features/tasks/useFocusClock'

const PRESET_MINUTES = [15, 25, 45]
const COMPACT_SCALE = 0.8

/**
 * Contenido del Modo Foco: título, temporizador opcional, micro-pasos y
 * "Terminé". Lo comparten la página `/foco/:taskId` y la ventana flotante
 * (`compact`), que leen la misma sesión (`useFocusSession`).
 */
export function FocusSessionView({
  taskId,
  compact = false,
  onCompleted,
  fallback = null,
}: {
  taskId: string
  compact?: boolean
  onCompleted?: () => void
  fallback?: ReactNode
}) {
  const { data: task, isLoading } = useTaskById(taskId)
  const { data: subtasks } = useSubtasks(taskId)
  const updateTask = useUpdateTask()
  const completeTask = useCompleteTask()
  const { endAt, startTimer, stopTimer, end } = useFocusSession()
  const remaining = useFocusClock(endAt)
  const finished = remaining === 0

  // Si la misión se completó por otra vía, la sesión de foco deja de tener sentido.
  const isDone = task?.status === 'done'
  useEffect(() => {
    if (isDone) end()
  }, [isDone, end])

  if (isLoading) {
    return <p className="p-3 font-mono text-xs text-fg-muted">Preparando el foco…</p>
  }
  if (!task || isDone) return <>{fallback}</>

  const steps = subtasks ?? []
  const doneSteps = steps.filter((s) => s.status === 'done').length

  return (
    // zoom 0.8: la ventana flotante es solo Chromium (Document PiP), que lo soporta.
    <div
      className={compact ? 'flex h-full flex-col gap-3 p-3' : 'flex flex-col gap-8'}
      style={compact ? { zoom: COMPACT_SCALE } : undefined}
    >
      <header className="text-center">
        {!compact && (
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">Ahora solo esto</p>
        )}
        <h1
          className={
            compact
              ? 'border-b border-accent/30 pb-2 font-display text-xl font-black leading-snug text-accent drop-shadow-[0_0_8px_rgb(var(--accent-rgb)/0.35)]'
              : 'font-display text-3xl font-black leading-tight text-fg md:text-4xl'
          }
        >
          {task.title}
        </h1>
      </header>

      <section
        aria-label="Temporizador"
        className={`rounded-2xl border border-border bg-surface/60 text-center ${
          compact ? 'p-3' : 'rune-frame p-6'
        }`}
      >
        {remaining === null ? (
          <>
            <p className="mb-3 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted">
              <Timer className="h-4 w-4" aria-hidden="true" /> Bloque de foco (opcional)
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {PRESET_MINUTES.map((min) => (
                <button
                  key={min}
                  type="button"
                  onClick={() => startTimer(min)}
                  className="tactile-chip rounded-full px-5 py-2.5 font-mono text-sm font-bold"
                >
                  {min} min
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p
              role="timer"
              aria-live="off"
              className={`font-mono font-black tabular-nums ${compact ? 'text-4xl' : 'text-6xl'} ${
                finished ? 'text-gold' : 'text-fg'
              }`}
            >
              {formatClock(remaining)}
            </p>
            <p
              className={`mt-1 font-mono uppercase tracking-widest text-fg-muted ${
                compact ? 'text-[10px] leading-tight' : 'text-xs'
              }`}
            >
              {finished ? 'Bloque terminado' : 'Concéntrate solo en el siguiente paso'}
            </p>
            <button
              type="button"
              onClick={stopTimer}
              className={`mt-2 rounded-lg px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                finished
                  ? 'text-fg-muted hover:text-fg'
                  : 'border border-red-600/40 bg-red-600/20 text-red-400 hover:bg-red-600/30'
              }`}
            >
              {finished ? 'Nuevo bloque' : 'Detener'}
            </button>
          </>
        )}
      </section>

      {steps.length > 0 && (
        <section aria-label="Micro-pasos">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-fg-muted">
            Micro-pasos · {doneSteps}/{steps.length}
          </h2>
          <ul className="space-y-2">
            {steps.map((step) => {
              const done = step.status === 'done'
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() =>
                      updateTask.mutate({ id: step.id, patch: { status: done ? 'pending' : 'done' } })
                    }
                    aria-pressed={done}
                    className={`flex w-full items-center gap-3 rounded-xl border border-border bg-surface text-left transition-colors hover:border-accent ${
                      compact ? 'min-h-11 px-3 py-2 text-sm' : 'min-h-12 px-4 py-3'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border ${
                        done ? 'border-accent bg-accent text-accent-fg' : 'border-glass/30'
                      }`}
                    >
                      {done && <Check className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <span className={done ? 'text-fg-muted line-through' : 'text-fg'}>{step.title}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <button
        type="button"
        disabled={completeTask.isPending}
        onClick={() =>
          completeTask.mutate(
            { id: task.id, project_id: task.project_id },
            {
              onSuccess: () => {
                end()
                onCompleted?.()
              },
            },
          )
        }
        className={`btn-prime flex items-center justify-center gap-2 rounded-xl font-display font-black uppercase tracking-widest disabled:opacity-50 ${
          compact ? 'py-1.5 text-[11px]' : 'py-4 text-sm'
        }`}
      >
        <Check className={compact ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden="true" /> Terminé la misión
      </button>
    </div>
  )
}
```

### src/features/tasks/components/RescheduleButtons.tsx

```tsx
import { CalendarClock } from 'lucide-react'
import { showToast } from '@/components/ui/toast-store'
import { useUpdateTask } from '@/features/tasks/hooks'
import { rescheduleIso, shiftDeadlineIso } from '@/utils/datetime'
import type { Task } from '@/types/database.types'

const FROM_NOW = [
  { label: 'Mañana', days: 1, toast: 'Reprogramada para mañana' },
  { label: '+1 semana', days: 7, toast: 'Reprogramada para dentro de una semana' },
] as const

const FROM_DEADLINE = [
  { label: '+1 día', days: 1, toast: 'Movida un día' },
  { label: '+1 semana', days: 7, toast: 'Movida una semana' },
] as const

// Reprogramar de un toque. Mantiene la hora original; el tono es de
// "reagendar", no de fracaso (diseño sin culpa visual).
// mode "from-now": para vencidas (a partir de hoy). "from-deadline": para
// el calendario (a partir de la fecha que ya tiene).
export function RescheduleButtons({
  task,
  mode = 'from-now',
  label = 'Reprogramar:',
}: {
  task: Pick<Task, 'id' | 'deadline'>
  mode?: 'from-now' | 'from-deadline'
  label?: string
}) {
  const update = useUpdateTask()
  const options = mode === 'from-now' ? FROM_NOW : FROM_DEADLINE

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 font-mono text-xs text-fg-muted">
        <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt.label}
          type="button"
          disabled={update.isPending}
          onClick={(e) => {
            e.stopPropagation()
            update.mutate(
              { id: task.id, patch: {
                  deadline:
                    mode === 'from-deadline' && task.deadline
                      ? shiftDeadlineIso(task.deadline, opt.days)
                      : rescheduleIso(opt.days, task.deadline),
                } },
              { onSuccess: () => showToast({ title: opt.toast }) },
            )
          }}
          className="rounded-full border border-border-glow px-3 py-1.5 font-mono text-xs font-bold uppercase text-rune transition-colors hover:bg-rune/10 disabled:opacity-50"
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
```

### src/features/tasks/components/TaskModal.tsx

```tsx
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, GripVertical, X, Trash2, Swords, Check, Undo2, Link2, ChevronRight, ScrollText, Star } from 'lucide-react'
import { addDays } from 'date-fns'
import { useCategories, useProjects } from '@/features/projects/hooks'
import {
  useCompleteTask,
  useCreateTask,
  useDeleteTask,
  useReopenTask,
  useReorderSubtasks,
  useSubtasks,
  useUpdateTask,
} from '@/features/tasks/hooks'
import { useEquipHudSlot, useHudTasks } from '@/features/battle-hud/hooks'
import {
  useClearTodayPriority,
  useSetTodayPriority,
  useTodayQuests,
} from '@/features/gamification/hooks'
import {
  useDeleteFollowUp,
  useFollowUpForTask,
  useSendToFollowUp,
} from '@/features/followups/hooks'
import { fromDatetimeLocalValue, toDatetimeLocalValue } from '@/utils/datetime'
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { Task, TaskSize } from '@/types/database.types'

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

export function TaskModal({
  task,
  defaultProjectId,
  defaultKanbanColumnId,
  onClose,
}: {
  task?: Task | null
  defaultProjectId?: string | null
  defaultKanbanColumnId?: string
  onClose: () => void
}) {
  const isEditing = !!task
  const { data: categories } = useCategories()
  const { data: projects } = useProjects()
  const { data: hudTasks } = useHudTasks()

  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()
  const completeTask = useCompleteTask()
  const reopenTask = useReopenTask()
  const equipToHud = useEquipHudSlot()

  // Subtareas de la misión (micro-pasos)
  const { data: subtasks } = useSubtasks(task?.id ?? null)
  const reorderSubtasks = useReorderSubtasks(task?.id ?? '')
  const [dragSubId, setDragSubId] = useState<string | null>(null)
  const [overSubId, setOverSubId] = useState<string | null>(null)

  // Prioridad del día
  const { data: todayQuests } = useTodayQuests()
  const setTodayPriority = useSetTodayPriority()
  const clearTodayPriority = useClearTodayPriority()
  const priorityQuest = todayQuests?.find((q) => q.type === 'daily_priority')
  const isTodayPriority = !!task && priorityQuest?.task_id === task.id
  const canBePriority = !!task && task.parent_task_id === null

  // Follow-up
  const { data: existingFollowUp } = useFollowUpForTask(task?.id ?? null)
  const sendToFollowUp = useSendToFollowUp()
  const deleteFollowUp = useDeleteFollowUp()
  const [showFollowUpForm, setShowFollowUpForm] = useState(false)
  const [followUpIntervalDays, setFollowUpIntervalDays] = useState(DEFAULT_FOLLOW_UP_INTERVAL_DAYS)
  const [followUpStakeholder, setFollowUpStakeholder] = useState('')

  // Estados del Formulario
  const [title, setTitle] = useState(task?.title ?? '')
  const [size, setSize] = useState<TaskSize>(task?.size ?? 'small')
  const [categoryId, setCategoryId] = useState<string>(task?.category_id ?? '')
  const [projectId, setProjectId] = useState<string | null>(task?.project_id ?? defaultProjectId ?? null)
  const [deadline, setDeadline] = useState<string>(toDatetimeLocalValue(task?.deadline ?? null))
  const [description, setDescription] = useState<string>(task?.description ?? '')
  const [newSubtaskText, setNewSubtaskText] = useState('')
  const [sealing, setSealing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Asignar primer categoría por defecto si está vacía
  useEffect(() => {
    if (!categoryId && categories && categories.length > 0) {
      setCategoryId(categories[0].id)
    }
  }, [categories, categoryId])

  // Cálculo de porcentaje de HP/Integridad por subtareas
  const totalSub = subtasks?.length ?? 0
  const doneSub = subtasks?.filter((s) => s.status === 'done').length ?? 0
  const hpPercent = totalSub > 0 ? Math.round((doneSub / totalSub) * 100) : 0

  const occupiedSlots = new Set((hudTasks ?? []).map((t) => t.hud_slot))
  const firstFreeSlot = [1, 2, 3].find((s) => !occupiedSlots.has(s)) ?? null

  function setQuickDeadline(daysFromNow: number) {
    const d = addDays(new Date(), daysFromNow)
    d.setHours(18, 0, 0, 0)
    setDeadline(toDatetimeLocalValue(d.toISOString()))
  }

  function handleComplete() {
    if (!task) return
    // La misión ya está hecha: se cierra el editor (el aviso de XP confirma el logro).
    completeTask.mutate({ id: task.id, project_id: task.project_id }, { onSuccess: onClose })
  }

  function handleReopen() {
    if (!task) return
    reopenTask.mutate({ id: task.id, project_id: task.project_id })
  }

  function handleConfirmFollowUp() {
    if (!task) return
    sendToFollowUp.mutate(
      {
        taskId: task.id,
        intervalDays: followUpIntervalDays,
        stakeholderName: followUpStakeholder.trim() || null,
      },
      { onSuccess: () => setShowFollowUpForm(false) },
    )
  }

  function handleCancelFollowUp() {
    if (!task || !existingFollowUp) return
    deleteFollowUp.mutate(existingFollowUp.id)
    reopenTask.mutate({ id: task.id, project_id: task.project_id })
  }

  // Los micro-pasos son un paso a paso: el orden lo decide el usuario.
  function moveSubtask(index: number, delta: -1 | 1) {
    if (!subtasks || !task) return
    const target = index + delta
    if (target < 0 || target >= subtasks.length) return
    const ids = subtasks.map((s) => s.id)
    ;[ids[index], ids[target]] = [ids[target], ids[index]]
    reorderSubtasks.mutate(ids)
  }

  // Arrastrar un micro-paso sobre otro lo deja en esa posición (arrastre nativo,
  // solo mouse; en celular quedan las flechas).
  function dropSubtask(targetId: string) {
    const fromId = dragSubId
    setDragSubId(null)
    setOverSubId(null)
    if (!subtasks || !task || !fromId || fromId === targetId) return
    const ids = subtasks.map((s) => s.id)
    ids.splice(ids.indexOf(targetId), 0, ids.splice(ids.indexOf(fromId), 1)[0])
    reorderSubtasks.mutate(ids)
  }

  function handleAddSubtask() {
    if (!newSubtaskText.trim() || !task) return
    // Las subtareas siempre requieren deadline (constraint de la DB) — se
    // hereda el de la tarea padre para no agregarle fricción al micro-paso.
    createTask.mutate({
      title: newSubtaskText.trim(),
      parent_task_id: task.id,
      project_id: task.project_id,
      deadline: task.deadline,
    })
    setNewSubtaskText('')
  }

  function handleSubmit() {
    if (!title.trim() || !categoryId) return
    if (!deadline) {
      setError('El deadline es obligatorio para sellar el decreto.')
      return
    }
    setError(null)
    setSealing(true)

    const payload = {
      title: title.trim(),
      size,
      category_id: categoryId,
      project_id: projectId,
      deadline: fromDatetimeLocalValue(deadline),
      description: description.trim() || null,
    }

    setTimeout(async () => {
      setSaving(true)
      try {
        if (isEditing && task) {
          await updateTask.mutateAsync({ id: task.id, patch: payload })
        } else {
          await createTask.mutateAsync({ ...payload, kanban_column_id: defaultKanbanColumnId ?? '' })
        }
        onClose()
      } catch (err) {
        setSealing(false)
        setError(err instanceof Error ? err.message : 'No se pudo sellar el decreto.')
      } finally {
        setSaving(false)
      }
    }, 450)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className={`grimoire-editor-modal relative flex w-full max-w-2xl flex-col rounded-3xl ${
          sealing ? 'animate-seal-flash' : ''
        }`}
      >
        {/* Encabezado con Estado y Acciones Rápidas */}
        <header className="flex items-center justify-between gap-3 border-b border-glass/5 p-6">
          <span className="rounded-full border border-glass/10 bg-glass/5 px-3 py-1 font-mono text-xs font-bold text-fg-muted">
            {task?.hud_slot !== null && task?.hud_slot !== undefined
              ? (<><Swords className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />EQUIPADO EN HUD SLOT {task.hud_slot}</>)
              : (<><ScrollText className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />EN EL GRIMORIO</>)}
          </span>

          <div className="flex items-center gap-2">
            {isEditing &&
              task &&
              (task.status === 'done' ? (
                <button
                  type="button"
                  onClick={handleReopen}
                  className="flex items-center gap-1.5 rounded-full border border-glass/10 bg-glass/5 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
                >
                  <Undo2 className="h-3.5 w-3.5" /> Reabrir
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="btn-prime flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs font-black uppercase tracking-widest"
                >
                  <Check className="h-3.5 w-3.5" /> Completar
                </button>
              ))}
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-glass/5 hover:text-fg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Cuerpo Principal del Formulario */}
        <div className="space-y-8 p-6 md:p-8">
          {/* Título Principal */}
          <div className="space-y-1.5">
            <label className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent/70">
              Decreto de Misión
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Cuál es la nueva misión?"
              className="w-full border-none bg-transparent p-0 font-display text-2xl font-bold text-fg outline-none placeholder:text-fg-muted/30 md:text-3xl"
            />
          </div>

          {/* Grid: Envergadura (XP) & Plazo de Entrega */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Chips de Envergadura (XP / Arma) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
                  Envergadura (Dificultad & XP)
                </p>
                {canBePriority && task && (
                  <button
                    type="button"
                    onClick={() =>
                      isTodayPriority ? clearTodayPriority.mutate() : setTodayPriority.mutate(task.id)
                    }
                    title="Prioridad de hoy"
                    aria-label="Prioridad de hoy"
                    className={`text-base leading-none transition-all duration-150 hover:scale-110 active:scale-95 ${
                      isTodayPriority
                        ? 'text-gold drop-shadow-[0_0_6px_rgb(var(--gold-rgb)/0.6)]'
                        : 'text-fg-muted/40 hover:text-gold/60'
                    }`}
                  >
                    <Star className={`h-5 w-5 ${isTodayPriority ? 'fill-gold' : ''}`} aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {(
                  [
                    { key: 'small', icon: WEAPON_ICONS.small, xp: '+10', cls: 'active-weapon-small' },
                    { key: 'medium', icon: WEAPON_ICONS.medium, xp: '+25', cls: 'active-weapon-medium' },
                    { key: 'large', icon: WEAPON_ICONS.large, xp: '+50', cls: 'active-weapon-large' },
                  ] as const
                ).map((w) => {
                  const isActive = size === w.key
                  return (
                    <button
                      key={w.key}
                      type="button"
                      onClick={() => setSize(w.key)}
                      className={`tactile-chip flex flex-1 flex-col items-center gap-1 rounded-xl py-3 ${
                        isActive ? w.cls : ''
                      }`}
                    >
                      <img src={w.icon} alt="" className="h-6 w-6 object-contain" />
                      <span className="font-mono text-xs font-black uppercase">{w.xp} XP</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Chips de Plazo Rápidos */}
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
                Plazo de Entrega
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setQuickDeadline(0)}
                  className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase active-gold"
                >
                  Hoy
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDeadline(1)}
                  className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                >
                  Mañana
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDeadline(3)}
                  className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                >
                  Finde
                </button>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="tactile-chip rounded-full px-3 py-1.5 font-mono text-xs text-fg outline-none"
                />
              </div>
            </div>
          </div>

          {/* Chips de Clase / Ámbitos */}
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
              Ámbito de la Orden (Clase)
            </p>
            <div className="flex flex-wrap gap-2">
              {categories?.map((cat) => {
                const isActive = categoryId === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryId(cat.id)}
                    className={`tactile-chip rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase ${
                      isActive ? 'active-gold' : ''
                    }`}
                  >
                    {cat.name} ({cat.class_name})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Seguimiento (Follow-up) */}
          {isEditing && task && task.status !== 'done' && (
            <div className="space-y-3 rounded-2xl border border-glass/5 bg-shade/20 p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
                Seguimiento (Follow-up)
              </p>

              {existingFollowUp ? (
                <div className="space-y-2.5">
                  <p className="font-mono text-xs text-fg">
                    En seguimiento
                    {existingFollowUp.stakeholder_name ? ` con ${existingFollowUp.stakeholder_name}` : ''} · cada{' '}
                    {existingFollowUp.interval_days} días
                  </p>
                  <p className="font-mono text-xs text-fg-muted/60">
                    Próximo recordatorio: {toDatetimeLocalValue(existingFollowUp.next_reminder_at).slice(0, 10)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleCancelFollowUp}
                      className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                    >
                      Cancelar seguimiento
                    </button>
                  </div>
                </div>
              ) : task.status !== 'follow_up' ? (
                showFollowUpForm ? (
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-1.5 font-mono text-xs text-fg-muted">
                        Cada
                        <input
                          type="number"
                          min={1}
                          value={followUpIntervalDays}
                          onChange={(e) => setFollowUpIntervalDays(Number(e.target.value) || 1)}
                          className="w-14 rounded-lg border border-glass/10 bg-shade/30 px-2 py-1 font-mono text-xs text-fg outline-none focus:border-accent"
                        />
                        días
                      </label>
                      <input
                        value={followUpStakeholder}
                        onChange={(e) => setFollowUpStakeholder(e.target.value)}
                        placeholder="Nombre del stakeholder (opcional)"
                        className="flex-1 rounded-lg border border-glass/10 bg-shade/30 px-3 py-1.5 font-mono text-xs text-fg outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleConfirmFollowUp}
                        className="tactile-chip active-gold rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                      >
                        Confirmar seguimiento
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowFollowUpForm(false)}
                        className="tactile-chip rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowFollowUpForm(true)}
                    className="tactile-chip flex w-fit items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-bold uppercase"
                  >
                    <Link2 className="h-3.5 w-3.5" /> Enviar a Follow-up
                  </button>
                )
              ) : null}
            </div>
          )}

          {/* Micro-Stepping (Submisiones & Integridad HP) */}
          {isEditing && task && (
            <div className="space-y-4 rounded-2xl border border-glass/5 bg-shade/20 p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">
                  Integridad de la Quest (Submisiones)
                </p>
                <span className="font-mono text-xs font-bold text-accent">{hpPercent}%</span>
              </div>

              <div className="quest-hp-track">
                <div className="quest-hp-fill" style={{ width: `${hpPercent}%` }} />
              </div>

              {/* Lista de Submisiones Existentes */}
              <div className="space-y-2 pt-1">
                {subtasks?.map((st, index) => (
                  <div
                    key={st.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'move'
                      e.dataTransfer.setData('text/plain', st.id)
                      setDragSubId(st.id)
                    }}
                    onDragOver={(e) => {
                      if (!dragSubId) return
                      e.preventDefault()
                      e.dataTransfer.dropEffect = 'move'
                      setOverSubId(st.id)
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      dropSubtask(st.id)
                    }}
                    onDragEnd={() => {
                      setDragSubId(null)
                      setOverSubId(null)
                    }}
                    className={`flex items-center justify-between gap-2 rounded ${
                      dragSubId === st.id ? 'opacity-40' : ''
                    } ${overSubId === st.id && dragSubId !== st.id ? 'border-t-2 border-rune' : 'border-t-2 border-transparent'}`}
                  >
                    <GripVertical
                      className="h-4 w-4 shrink-0 cursor-grab text-fg-muted active:cursor-grabbing"
                      aria-hidden="true"
                    />
                    <span className="w-4 shrink-0 text-right font-mono text-xs text-fg-muted">{index + 1}.</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateTask.mutate({
                          id: st.id,
                          patch: { status: st.status === 'done' ? 'pending' : 'done' },
                        })
                      }
                      className={`flex h-5 w-5 items-center justify-center rounded border font-mono text-xs transition-all ${
                        st.status === 'done' ? 'border-accent bg-accent text-accent-fg' : 'border-glass/20'
                      }`}
                    >
                      {st.status === 'done' ? <Check className="h-3 w-3" aria-hidden="true" /> : null}
                    </button>
                    <span
                      className={`flex-1 text-xs text-fg ${
                        st.status === 'done' ? 'line-through opacity-40' : ''
                      }`}
                    >
                      {st.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => moveSubtask(index, -1)}
                      disabled={index === 0}
                      aria-label={`Subir micro-paso: ${st.title}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-fg-muted transition-colors hover:text-fg disabled:opacity-25"
                    >
                      <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSubtask(index, 1)}
                      disabled={index === subtasks.length - 1}
                      aria-label={`Bajar micro-paso: ${st.title}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-fg-muted transition-colors hover:text-fg disabled:opacity-25"
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTask.mutate(st.id)}
                      className="text-fg-muted/40 transition-colors hover:text-red-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Agregar nueva Submisión */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newSubtaskText}
                  onChange={(e) => setNewSubtaskText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                  placeholder="+ Añadir Micro-paso (2 min)..."
                  className="flex-1 rounded-lg border border-dashed border-glass/10 bg-transparent px-3 py-2 font-mono text-xs text-fg outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={handleAddSubtask}
                  className="rounded-lg border border-border bg-glass/5 px-3 py-2 font-mono text-xs font-bold text-fg hover:bg-glass/10"
                >
                  Añadir
                </button>
              </div>
            </div>
          )}

          {/* Acordeón Oculto de Notas y Proyecto Complejo */}
          <details className="group">
            <summary className="flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted/40 transition-all hover:text-fg group-open:text-accent">
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-open:rotate-90" aria-hidden="true" /> Notas y Detalles Arcanos
            </summary>
            <div className="space-y-4 pt-4">
              {/* Selección de Proyecto */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-fg-muted/50">
                  Proyecto Asociado (Mazmorra)
                </label>
                <select
                  value={projectId ?? ''}
                  onChange={(e) => setProjectId(e.target.value || null)}
                  className="w-full rounded-xl border border-border bg-shade/40 p-3 font-mono text-xs font-bold uppercase text-fg"
                >
                  <option value="">Sin Proyecto (Misión Suelta)</option>
                  {projects?.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Textarea de Notas */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe aquí los detalles del hechizo, links o instrucciones..."
                className="h-24 w-full resize-none rounded-xl border border-glass/5 bg-shade/30 p-4 text-sm text-fg outline-none focus:border-accent/30"
              />
            </div>
          </details>

          {error && <p className="font-mono text-xs font-medium text-warn-fg">{error}</p>}
        </div>

        {/* Footer de Acciones Principales */}
        <footer className="flex flex-col gap-3 border-t border-glass/5 bg-shade/20 p-6 md:flex-row md:p-8">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim() || !categoryId || saving}
            className="btn-prime flex-1 rounded-xl py-4 font-display text-sm font-black uppercase tracking-widest disabled:opacity-40"
          >
            <ScrollText className="mr-2 inline h-4 w-4" aria-hidden="true" /> Sellar Decreto
          </button>

          <div className="flex gap-2">
            {isEditing && task && firstFreeSlot !== null && task.hud_slot === null && (
              <button
                type="button"
                onClick={() => {
                  equipToHud.mutate({ taskId: task.id, slot: firstFreeSlot })
                  onClose()
                }}
                className="flex items-center gap-1.5 rounded-xl border border-glass/10 bg-glass/5 px-5 py-4 font-mono text-xs font-black uppercase tracking-widest text-fg hover:bg-glass/10"
              >
                <Swords className="h-4 w-4" /> Equipar
              </button>
            )}

            {isEditing && task && (
              <button
                type="button"
                onClick={() => {
                  if (!window.confirm('¿Borrar esta tarea?')) return
                  deleteTask.mutate(task.id)
                  onClose()
                }}
                className="rounded-xl border border-red-900/30 bg-red-950/20 px-5 py-4 text-red-500 hover:bg-red-900/40"
                title="Descartar Misión"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  )
}
```

### src/features/tasks/FocusFloatContext.tsx

```tsx
import { useFocusSession } from '@/features/tasks/focusSessionContext'
import { createContext, useContext, useState, type PropsWithChildren } from 'react'

// La Document Picture-in-Picture API todavía no está en los tipos de DOM de TS.
interface DocumentPictureInPictureApi {
  requestWindow(options?: { width?: number; height?: number }): Promise<Window>
}

function getPipApi(): DocumentPictureInPictureApi | undefined {
  return (window as { documentPictureInPicture?: DocumentPictureInPictureApi })
    .documentPictureInPicture
}

// El documento de la ventana PiP nace vacío: se le copian todas las hojas de
// estilo de la app (tokens de index.css incluidos, así hereda paleta, fuentes
// y modo oscuro vía prefers-color-scheme) y un <base> para que las URLs
// relativas de assets (fuentes autohospedadas) sigan resolviendo.
function copyStylesInto(pipWindow: Window) {
  const base = pipWindow.document.createElement('base')
  base.href = window.location.origin + '/'
  pipWindow.document.head.appendChild(base)

  for (const styleSheet of Array.from(document.styleSheets)) {
    try {
      const cssText = Array.from(styleSheet.cssRules)
        .map((rule) => rule.cssText)
        .join('\n')
      const style = pipWindow.document.createElement('style')
      style.textContent = cssText
      pipWindow.document.head.appendChild(style)
    } catch {
      if (styleSheet.href) {
        const link = pipWindow.document.createElement('link')
        link.rel = 'stylesheet'
        link.href = styleSheet.href
        pipWindow.document.head.appendChild(link)
      }
    }
  }
}

interface FocusFloatContextValue {
  pipWindow: Window | null
  supported: boolean
  open: () => Promise<void>
  close: () => void
}

const FocusFloatContext = createContext<FocusFloatContextValue | null>(null)

/**
 * Estado compartido de la ventana flotante de foco (Document Picture-in-Picture).
 * Vive una sola vez en Layout — así tanto el botón del nav como el botón
 * "Atacar / Entrar en Foco" de cada CombatSlotCard controlan la misma ventana
 * en vez de intentar abrir instancias separadas (el navegador solo permite
 * una ventana PiP de documento a la vez).
 */
export function FocusFloatProvider({ children }: PropsWithChildren) {
  const [pipWindow, setPipWindow] = useState<Window | null>(null)
  const { taskId: focusTaskId } = useFocusSession()
  const supported = !!getPipApi()

  async function open() {
    if (pipWindow) return
    const api = getPipApi()
    if (!api) return
    const win = await api.requestWindow({ width: 272, height: focusTaskId ? 352 : 220 })
    copyStylesInto(win)
    win.addEventListener('pagehide', () => setPipWindow(null))
    setPipWindow(win)
  }

  function close() {
    pipWindow?.close()
    setPipWindow(null)
  }

  return (
    <FocusFloatContext.Provider value={{ pipWindow, supported, open, close }}>
      {children}
    </FocusFloatContext.Provider>
  )
}

export function useFocusFloat() {
  const ctx = useContext(FocusFloatContext)
  if (!ctx) throw new Error('useFocusFloat debe usarse dentro de FocusFloatProvider')
  return ctx
}
```

### src/features/tasks/focusSessionContext.ts

```typescript
import { createContext, useContext } from 'react'

export interface FocusSessionValue {
  /** Misión en foco (null = no hay sesión activa). */
  taskId: string | null
  /** Marca de tiempo (ms) en que termina el bloque; null = sin temporizador. */
  endAt: number | null
  begin: (taskId: string) => void
  startTimer: (minutes: number) => void
  stopTimer: () => void
  end: () => void
}

export const FocusSessionContext = createContext<FocusSessionValue | null>(null)

export function useFocusSession(): FocusSessionValue {
  const ctx = useContext(FocusSessionContext)
  if (!ctx) throw new Error('useFocusSession debe usarse dentro de FocusSessionProvider')
  return ctx
}
```

### src/features/tasks/FocusSessionProvider.tsx

```tsx
import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { showToast } from '@/components/ui/toast-store'
import { FocusSessionContext } from '@/features/tasks/focusSessionContext'

const STORAGE_KEY = 'questly_focus_session'

interface Stored {
  taskId: string | null
  endAt: number | null
}

function read(): Stored {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Stored
  } catch {
    // sin sessionStorage: la sesión funciona igual, solo no sobrevive a recargar.
  }
  return { taskId: null, endAt: null }
}

/**
 * Sesión de foco única y global: la misión en foco y su temporizador viven acá
 * para que el Modo Foco de la página y la ventana flotante muestren lo mismo
 * (antes el estado era local de la página). Va por encima de FocusFloatProvider.
 */
export function FocusSessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Stored>(read)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } catch {
      // nada que persistir
    }
  }, [session])

  // Aviso al terminar el bloque, esté la página o solo la ventana flotante.
  useEffect(() => {
    if (!session.endAt) return
    const ms = session.endAt - Date.now()
    if (ms <= 0) return
    const id = window.setTimeout(() => {
      showToast({ title: '¡Bloque terminado!', detail: 'Descansa unos minutos o empieza otro bloque.' })
      navigator.vibrate?.([200, 100, 200])
    }, ms)
    return () => window.clearTimeout(id)
  }, [session.endAt])

  // Cambiar de misión reinicia el temporizador: un solo foco a la vez.
  // Funciones estables: las páginas las usan como dependencia de efectos.
  const begin = useCallback(
    (taskId: string) => setSession((s) => (s.taskId === taskId ? s : { taskId, endAt: null })),
    [],
  )
  const startTimer = useCallback(
    (minutes: number) => setSession((s) => ({ ...s, endAt: Date.now() + minutes * 60_000 })),
    [],
  )
  const stopTimer = useCallback(() => setSession((s) => ({ ...s, endAt: null })), [])
  const end = useCallback(() => setSession({ taskId: null, endAt: null }), [])

  const value = useMemo(
    () => ({ taskId: session.taskId, endAt: session.endAt, begin, startTimer, stopTimer, end }),
    [session, begin, startTimer, stopTimer, end],
  )

  return <FocusSessionContext.Provider value={value}>{children}</FocusSessionContext.Provider>
}
```

### src/features/tasks/hooks.ts

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  completeTask,
  createTask,
  deleteTask,
  fetchActiveTasksWithDeadline,
  fetchAllBoardTasks,
  fetchInboxTasks,
  fetchInProgressTasks,
  fetchLastCompletedTask,
  moveTaskDeadline,
  reorderSubtasks,
  fetchQuickWinTask,
  fetchSubtasks,
  fetchTaskById,
  fetchTasksByCategory,
  fetchTasksByIds,
  fetchTasksByProject,
  fetchTasksCompletedToday,
  fetchTasksInRange,
  reopenTask,
  updateTask,
} from '@/features/tasks/api'
import { showToast } from '@/components/ui/toast-store'
import type { Category, Task } from '@/types/database.types'

export function useTaskById(id: string | null) {
  return useQuery({
    queryKey: ['tasks', 'by-id', id],
    queryFn: () => fetchTaskById(id as string),
    enabled: id !== null,
  })
}

export function useTasksByIds(ids: string[]) {
  return useQuery({
    queryKey: ['tasks', 'by-ids', ids],
    queryFn: () => fetchTasksByIds(ids),
  })
}

export function useTasksByProject(projectId: string) {
  return useQuery({
    queryKey: ['tasks', 'by-project', projectId],
    queryFn: () => fetchTasksByProject(projectId),
  })
}

export function useTasksByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['tasks', 'by-category', categoryId],
    queryFn: () => fetchTasksByCategory(categoryId),
  })
}

export function useActiveTasksWithDeadline() {
  return useQuery({
    queryKey: ['tasks', 'active-with-deadline'],
    queryFn: fetchActiveTasksWithDeadline,
  })
}

export function useInProgressTasks() {
  return useQuery({
    queryKey: ['tasks', 'in-progress'],
    queryFn: fetchInProgressTasks,
  })
}

export function useTasksCompletedToday() {
  return useQuery({
    queryKey: ['tasks', 'completed-today'],
    queryFn: fetchTasksCompletedToday,
  })
}

export function useLastCompletedTask() {
  return useQuery({
    queryKey: ['tasks', 'last-completed'],
    queryFn: fetchLastCompletedTask,
  })
}

export function useQuickWinTask() {
  return useQuery({
    queryKey: ['tasks', 'quick-win'],
    queryFn: fetchQuickWinTask,
  })
}

export function useInboxTasks() {
  return useQuery({
    queryKey: ['tasks', 'inbox'],
    queryFn: fetchInboxTasks,
  })
}

export function useAllBoardTasks() {
  return useQuery({
    queryKey: ['tasks', 'board', 'all'],
    queryFn: fetchAllBoardTasks,
  })
}

export function useSubtasks(parentTaskId: string | null) {
  return useQuery({
    queryKey: ['tasks', 'subtasks', parentTaskId],
    queryFn: () => fetchSubtasks(parentTaskId as string),
    enabled: parentTaskId !== null,
  })
}

export function useTasksInRange(startIso: string, endIso: string) {
  return useQuery({
    queryKey: ['tasks', 'range', startIso, endIso],
    queryFn: () => fetchTasksInRange(startIso, endIso),
  })
}

function useInvalidateTasks() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    // Completar/triar tareas dispara triggers de XP, racha y quests en la DB.
    queryClient.invalidateQueries({ queryKey: ['gamification'] })
  }
}

export function useCreateTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: createTask,
    onSuccess: invalidate,
  })
}

export function useUpdateTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof updateTask>[1] }) =>
      updateTask(id, patch),
    onSuccess: invalidate,
  })
}

// Arrastrar una misión a otro día: la tarjeta se mueve al instante (cache del
// calendario) y vuelve a su lugar si el guardado falla.
export function useMoveTaskDeadline() {
  const queryClient = useQueryClient()
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: ({ taskId, deadlineIso }: { taskId: string; deadlineIso: string }) =>
      moveTaskDeadline(taskId, deadlineIso),
    onMutate: async ({ taskId, deadlineIso }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', 'range'] })
      const previous = queryClient.getQueriesData<Task[]>({ queryKey: ['tasks', 'range'] })
      queryClient.setQueriesData<Task[]>({ queryKey: ['tasks', 'range'] }, (old) =>
        old?.map((t) => (t.id === taskId ? { ...t, deadline: deadlineIso } : t)),
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      context?.previous.forEach(([key, data]) => queryClient.setQueryData(key, data))
      showToast({ title: 'No se pudo mover la misión', detail: 'Inténtalo de nuevo.' })
    },
    onSettled: invalidate,
  })
}

// Reordenar micro-pasos: la lista cambia al instante y vuelve atrás si falla.
export function useReorderSubtasks(parentTaskId: string) {
  const queryClient = useQueryClient()
  const key = ['tasks', 'subtasks', parentTaskId]
  return useMutation({
    mutationFn: (orderedIds: string[]) => reorderSubtasks(orderedIds),
    onMutate: async (orderedIds) => {
      await queryClient.cancelQueries({ queryKey: key })
      const previous = queryClient.getQueryData<Task[]>(key)
      queryClient.setQueryData<Task[]>(key, (old) =>
        old ? orderedIds.map((id) => old.find((t) => t.id === id)).filter((t): t is Task => !!t) : old,
      )
      return { previous }
    },
    onError: (_err, _ids, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous)
      showToast({ title: 'No se pudo reordenar', detail: 'Inténtalo de nuevo.' })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  })
}

export function useDeleteTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: invalidate,
  })
}

export function useCompleteTask() {
  const invalidate = useInvalidateTasks()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: completeTask,
    onSuccess: (task) => {
      invalidate()
      // Recompensa inmediata: el XP real lo calcula el trigger de Postgres
      // (tasks.xp_reward); acá solo se muestra.
      const category = queryClient
        .getQueryData<Category[]>(['categories'])
        ?.find((c) => c.id === task.category_id)
      const bonus = task.rescue_bonus
      const total = task.xp_reward + bonus
      const where = category?.name ?? task.title
      showToast(
        total > 0
          ? {
              title: `+${total} XP`,
              detail: bonus > 0 ? `Rescate +${bonus} · ${where}` : where,
              tone: 'reward',
            }
          : { title: 'Misión completada', detail: task.title, tone: 'reward' },
      )
    },
  })
}

export function useReopenTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({ mutationFn: reopenTask, onSuccess: invalidate })
}

// Captura del Inbox: actualiza el cache al toque (antes de que la mutación
// termine, incluso offline) para que la tarea capturada se vea al instante
// y no se pierda de vista mientras espera conexión para sincronizar.
export function useCaptureInboxTask() {
  const queryClient = useQueryClient()
  const invalidate = useInvalidateTasks()

  return useMutation({
    mutationFn: (title: string) => createTask({ title }),
    onMutate: async (title) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', 'inbox'] })
      const previous = queryClient.getQueryData<Task[]>(['tasks', 'inbox'])
      const optimisticTask: Task = {
        id: `optimistic-${crypto.randomUUID()}`,
        user_id: '',
        project_id: null,
        parent_task_id: null,
        kanban_column_id: null,
        category_id: null,
        title,
        description: null,
        deadline: null,
        status: 'pending',
        size: null,
        xp_reward: 0,
        rescue_bonus: 0,
        hud_slot: null,
        position: null,
        created_at: new Date().toISOString(),
        completed_at: null,
      }
      queryClient.setQueryData<Task[]>(['tasks', 'inbox'], (old = []) => [...old, optimisticTask])
      return { previous }
    },
    onError: (_err, _title, context) => {
      if (context?.previous) queryClient.setQueryData(['tasks', 'inbox'], context.previous)
    },
    onSettled: invalidate,
  })
}
```

### src/features/tasks/useFocusClock.ts

```typescript
import { useEffect, useState } from 'react'

/** Milisegundos que faltan para `endAt` (null si no hay temporizador). */
export function useFocusClock(endAt: number | null): number | null {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (endAt === null) return
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(id)
  }, [endAt])

  return endAt === null ? null : Math.max(0, endAt - now)
}

export function formatClock(ms: number): string {
  const total = Math.ceil(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
```

### src/features/triage/api.ts

```typescript
import { fetchFirstColumnId } from '@/features/kanban/api'
import { updateTask } from '@/features/tasks/api'
import { createFollowUp } from '@/features/followups/api'
import type { Task, TaskSize } from '@/types/database.types'

export type DispatchOutcome = 'grimorio' | 'equip' | 'follow_up'

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

export interface DispatchInput {
  taskId: string
  title: string
  categoryId: string
  projectId: string | null
  deadlineIso: string
  size: TaskSize
  outcome: DispatchOutcome
  hudSlot: number | null
}

// Despacho de la Mesa de Estrategia: cubre las 3 salidas de la spec del
// Módulo 3. Siempre setea kanban_column_id (eso es lo que el trigger
// tasks_after_triage de Postgres usa para saber que la tarea salió del
// inbox y, si el inbox llega a 0, completar la quest diaria de triage) —
// aplica igual para las 3 salidas, incluida 'follow_up', porque lo que
// "tria" una tarea es tener columna, no el status.
export async function dispatchTriagedTask(input: DispatchInput): Promise<Task> {
  const kanbanColumnId = await fetchFirstColumnId(input.projectId)

  const task = await updateTask(input.taskId, {
    title: input.title,
    category_id: input.categoryId,
    project_id: input.projectId,
    kanban_column_id: kanbanColumnId,
    deadline: input.deadlineIso,
    size: input.size,
    // "Equipar en Combate" también pasa a in_progress, igual que
    // equipTaskToSlot del Battle HUD (Módulo 1) — mismo mecanismo, un solo
    // camino para pasar a esa combinación de estado en toda la app.
    status: input.outcome === 'follow_up' ? 'follow_up' : input.outcome === 'equip' ? 'in_progress' : 'pending',
    hud_slot: input.outcome === 'equip' ? input.hudSlot : null,
  })

  if (input.outcome === 'follow_up') {
    await createFollowUp({
      task_id: input.taskId,
      interval_days: DEFAULT_FOLLOW_UP_INTERVAL_DAYS,
      stakeholder_name: null,
      notes: null,
    })
  }

  return task
}
```

### src/features/triage/components/InboxCardDeck.tsx

```tsx
import { addDays, format, nextSaturday } from 'date-fns'

function toLocalValue(d: Date): string {
  d.setHours(18, 0, 0, 0)
  return format(d, "yyyy-MM-dd'T'HH:mm")
}

const QUICK_DEADLINES = [
  { label: 'Hoy', value: () => toLocalValue(new Date()) },
  { label: 'Mañana', value: () => toLocalValue(addDays(new Date(), 1)) },
  { label: 'Fin de semana', value: () => toLocalValue(nextSaturday(new Date())) },
  { label: '+1 semana', value: () => toLocalValue(addDays(new Date(), 7)) },
]

export function InboxCardDeck({
  title,
  onTitleChange,
  deadline,
  onDeadlineChange,
}: {
  remainingCount: number
  title: string
  onTitleChange: (title: string) => void
  deadline: string
  onDeadlineChange: (deadline: string) => void
}) {
  return (
    <div className="space-y-4">
      {/* Título de la Misión con Borde de Tinta */}
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Título de la misión..."
        className="w-full border-b border-glass/10 bg-transparent pb-2 font-display text-2xl font-bold text-accent outline-none transition-colors focus:border-accent"
      />

      {/* Shortcuts de Fecha / Deadline */}
      <div className="flex flex-wrap gap-2.5">
        {QUICK_DEADLINES.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onDeadlineChange(opt.value())}
            className="rounded-lg border border-border bg-glass/5 px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-all hover:bg-glass/10 hover:text-fg active:scale-95"
          >
            {opt.label}
          </button>
        ))}
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => onDeadlineChange(e.target.value)}
          className="rounded-lg border border-border bg-glass/5 px-3 py-1.5 font-mono text-xs font-bold uppercase text-fg-muted outline-none focus:border-accent"
        />
      </div>
    </div>
  )
}
```

### src/features/triage/components/StrategyTablePage.tsx

```tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { showToast } from '@/components/ui/toast-store'
import { useDeleteTask } from '@/features/tasks/hooks'
import { Castle, Link2, Swords } from 'lucide-react'
import { useCategories, useCreateProject, useProjects } from '@/features/projects/hooks'
import { useHudTasks } from '@/features/battle-hud/hooks'
import { useTriageSession } from '@/features/triage/hooks'
import { fromDatetimeLocalValue } from '@/utils/datetime'
import { WeaponSelector } from '@/features/triage/components/WeaponSelector'
import { InboxCardDeck } from '@/features/triage/components/InboxCardDeck'
import type { TaskSize } from '@/types/database.types'
import type { DispatchOutcome } from '@/features/triage/api'

const NEW_PROJECT = '__new__'
const NO_PROJECT = ''
const LAST_CHOICE_KEY = 'questly_triage_last'

// Recordar la última clase/destino: la mayoría de capturas seguidas comparten
// contexto, y cada decisión repetida es fricción (parálisis en TDAH).
function readLastChoice(): { categoryId: string; projectChoice: string } {
  try {
    const raw = localStorage.getItem(LAST_CHOICE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as { categoryId?: string; projectChoice?: string }
      return { categoryId: parsed.categoryId ?? '', projectChoice: parsed.projectChoice ?? NO_PROJECT }
    }
  } catch {
    // localStorage no disponible: se arranca sin recuerdo.
  }
  return { categoryId: '', projectChoice: NO_PROJECT }
}

export function StrategyTablePage() {
  const { items, isLoading, dispatch } = useTriageSession()
  const deleteTask = useDeleteTask()
  const { data: categories } = useCategories()
  const { data: projects } = useProjects()
  const createProject = useCreateProject()
  const { data: hudTasks } = useHudTasks()

  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState(() => readLastChoice().categoryId)
  const [projectChoice, setProjectChoice] = useState(() => readLastChoice().projectChoice)
  const [skipped, setSkipped] = useState<string[]>([])
  const [showErrors, setShowErrors] = useState(false)
  const [confirmingDiscard, setConfirmingDiscard] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [deadline, setDeadline] = useState('')
  const [size, setSize] = useState<TaskSize | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [animatingOut, setAnimatingOut] = useState(false)

  // "Saltar por ahora" manda la carta al final de la cola durante esta sesión.
  const pending = items.filter((i) => !skipped.includes(i.id))
  const current = pending[0] ?? items[0]
  const remainingCount = items.length

  // Reset del formulario cuando entra una nueva carta. Clase y destino se
  // conservan a propósito (ver readLastChoice); fecha y arma no, porque son
  // decisiones propias de cada misión.
  useEffect(() => {
    setTitle(current?.title ?? '')
    setNewProjectName('')
    setDeadline('')
    setSize(null)
    setError(null)
    setShowErrors(false)
    setConfirmingDiscard(false)
    setAnimatingOut(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  const occupiedSlots = new Set((hudTasks ?? []).map((t) => t.hud_slot))
  const firstFreeSlot = [1, 2, 3].find((s) => !occupiedSlots.has(s)) ?? null

  const problems = {
    title: !title.trim(),
    category: !categoryId,
    deadline: !deadline,
    size: !size,
    project: projectChoice === NEW_PROJECT && !newProjectName.trim(),
  }
  const missing = [
    problems.title && 'título',
    problems.category && 'clase',
    problems.deadline && 'fecha',
    problems.size && 'arma',
    problems.project && 'nombre del proyecto',
  ].filter(Boolean) as string[]

  function persistChoice() {
    try {
      localStorage.setItem(LAST_CHOICE_KEY, JSON.stringify({ categoryId, projectChoice: projectChoice === NEW_PROJECT ? NO_PROJECT : projectChoice }))
    } catch {
      // sin localStorage: solo se pierde el recuerdo.
    }
  }

  function handleSkip() {
    if (!current) return
    setSkipped((ids) => (pending.length <= 1 ? [] : [...ids, current.id]))
  }

  function handleDiscard() {
    if (!current) return
    deleteTask.mutate(current.id, { onSuccess: () => showToast({ title: 'Captura descartada' }) })
  }

  async function handleDispatch(outcome: DispatchOutcome) {
    if (!current) return
    setError(null)

    if (missing.length > 0) {
      setShowErrors(true)
      return
    }
    const chosenCategoryId = categoryId
    const chosenSize = size as TaskSize

    // Iniciar física de deslizamiento
    setAnimatingOut(true)

    setTimeout(async () => {
      try {
        let projectId: string | null = null
        if (projectChoice === NEW_PROJECT) {
          const project = await createProject.mutateAsync({ name: newProjectName.trim(), categoryId })
          projectId = project.id
        } else if (projectChoice !== NO_PROJECT) {
          projectId = projectChoice
        }

        await dispatch.mutateAsync({
          taskId: current.id,
          title: title.trim(),
          categoryId: chosenCategoryId,
          projectId,
          deadlineIso: fromDatetimeLocalValue(deadline),
          size: chosenSize,
          outcome,
          hudSlot: outcome === 'equip' ? firstFreeSlot : null,
        })
        persistChoice()
      } catch (err) {
        setAnimatingOut(false)
        setError(err instanceof Error ? err.message : 'No se pudo despachar la carta.')
      }
    }, 450)
  }

  if (isLoading) {
    return <p className="py-12 text-center font-mono text-sm text-fg-muted">Cargando mesa táctica…</p>
  }

  // Vista de Victoria (Inbox Vacío / Maza Limpia)
  if (!current) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-8 text-center">
        <Castle className="mb-6 h-20 w-20 text-accent" aria-hidden="true" />
        <h1 className="mb-2 font-display text-4xl font-black uppercase tracking-tighter text-accent">
          Maza Limpia
        </h1>
        <p className="mb-8 font-display text-lg italic text-fg-muted">
          ¡Inbox Vacío, Comandante! Todos los pergaminos fueron asignados.
        </p>
        <Link
          to="/"
          className="btn-prime rounded-full px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest"
        >
          Ir al Battle HUD
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-6 md:px-8">
      {/* Header Contador */}
      <header className="mb-6 flex w-full max-w-xl items-center justify-between">
        <h1 className="font-display text-lg font-bold tracking-wide text-fg">
          Mesa de Estrategia
        </h1>
        <span className="rounded-full border border-border bg-shade/40 px-3 py-1 font-mono text-xs font-bold text-accent">
          {remainingCount} PERGAMINOS PENDIENTES
        </span>
      </header>

      {/* Escenario del Mazo Táctico */}
      <main className="deck-container relative w-full max-w-xl">
        {/* Cartas Apiladas Detrás (Visual Stack) */}
        {remainingCount > 1 && <div className="card-bg-visual card-stack-1" />}
        {remainingCount > 2 && <div className="card-bg-visual card-stack-2" />}

        {/* Carta Activa */}
        <article
          className={`active-strategy-card relative z-10 flex flex-col gap-6 rounded-3xl p-6 md:p-8 ${
            animatingOut ? 'slide-out-right' : ''
          }`}
        >
          {/* Título & Deadline */}
          <div>
            <InboxCardDeck
              remainingCount={remainingCount}
              title={title}
              onTitleChange={setTitle}
              deadline={deadline}
              onDeadlineChange={setDeadline}
            />
            {showErrors && problems.title && <FieldError>Ponle un título a la misión.</FieldError>}
            {showErrors && problems.deadline && <FieldError>Elige una fecha límite.</FieldError>}
          </div>

          {/* Selector de Armas / Dificultad */}
          <div>
            <WeaponSelector value={size} onChange={setSize} />
            {showErrors && problems.size && <FieldError>Elige un arma: define la dificultad y el XP.</FieldError>}
          </div>

          {/* Categoría y Proyecto */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs uppercase tracking-widest text-fg-muted/50">
                Categoría / Clase
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="parchment-select w-full rounded-xl p-3 font-mono text-xs font-bold uppercase tracking-wider"
              >
                <option value="" disabled>
                  Elegir Clase
                </option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.class_name})
                  </option>
                ))}
              </select>
              {showErrors && problems.category && <FieldError>Elige una clase.</FieldError>}
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs uppercase tracking-widest text-fg-muted/50">
                Proyecto / Destino
              </label>
              <select
                value={projectChoice}
                onChange={(e) => setProjectChoice(e.target.value)}
                className="parchment-select w-full rounded-xl p-3 font-mono text-xs font-bold uppercase tracking-wider"
              >
                <option value={NO_PROJECT}>Misiones Sueltas</option>
                {projects?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
                <option value={NEW_PROJECT}>+ Crear Proyecto…</option>
              </select>
            </div>
          </div>

          {projectChoice === NEW_PROJECT && (
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Nombre del nuevo proyecto..."
              className="input-parchment w-full rounded-xl p-3 text-sm text-fg"
            />
          )}
          {showErrors && problems.project && <FieldError>Ponle nombre al nuevo proyecto.</FieldError>}

          {showErrors && missing.length > 0 && (
            <p role="alert" className="rounded-lg border border-warn-border bg-warn-bg px-3 py-2 font-mono text-xs font-medium text-warn-fg">
              Falta: {missing.join(', ')}.
            </p>
          )}
          {error && <p role="alert" className="font-mono text-xs font-medium text-warn-fg">{error}</p>}

          {/* Botones de Despacho Inmediato */}
          <footer className="mt-2 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => void handleDispatch('grimorio')}
                disabled={dispatch.isPending}
                className="rounded-xl border border-border py-3.5 font-mono text-xs font-black uppercase tracking-widest text-fg transition-all hover:bg-glass/5 active:scale-95 disabled:opacity-50"
              >
                Despachar al Grimorio
              </button>
              <button
                type="button"
                onClick={() => void handleDispatch('follow_up')}
                disabled={dispatch.isPending}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-rune/30 py-3.5 font-mono text-xs font-black uppercase tracking-widest text-rune transition-all hover:bg-rune/10 active:scale-95 disabled:opacity-50"
              >
                <Link2 className="h-3.5 w-3.5" /> Seguimiento
              </button>
            </div>

            <button
              type="button"
              onClick={() => void handleDispatch('equip')}
              disabled={dispatch.isPending || firstFreeSlot === null}
              className="btn-prime flex w-full items-center justify-center gap-2 rounded-xl py-4 font-display text-sm font-black uppercase tracking-widest disabled:opacity-40"
            >
              <Swords className="h-4 w-4" /> Equipar en Combate
            </button>
            <div className="flex items-center justify-center gap-2 pt-1">
              {remainingCount > 1 && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="rounded-lg px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
                >
                  Saltar por ahora
                </button>
              )}
              {confirmingDiscard ? (
                <>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    disabled={deleteTask.isPending}
                    className="rounded-lg border border-red-600/40 bg-red-600/20 px-4 py-2.5 font-mono text-xs font-black uppercase tracking-widest text-red-400"
                  >
                    Sí, descartar
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingDiscard(false)}
                    className="rounded-lg px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmingDiscard(true)}
                  className="rounded-lg px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-red-400"
                >
                  Descartar
                </button>
              )}
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}

function FieldError({ children }: { children: string }) {
  return (
    <p role="alert" className="mt-1.5 font-mono text-xs font-medium text-warn-fg">
      {children}
    </p>
  )
}
```

### src/features/triage/components/WeaponSelector.tsx

```tsx
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { TaskSize } from '@/types/database.types'

const WEAPONS: { value: TaskSize; label: string; xp: number; type: string }[] = [
  { value: 'small', label: 'Daga', xp: 10, type: 'small' },
  { value: 'medium', label: 'Espada', xp: 25, type: 'medium' },
  { value: 'large', label: 'Mandoble', xp: 50, type: 'large' },
]

export function WeaponSelector({
  value,
  onChange,
}: {
  value: TaskSize | null
  onChange: (size: TaskSize) => void
}) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted/60">
        Seleccionar Envergadura (Dificultad)
      </p>
      <div className="grid grid-cols-3 gap-3">
        {WEAPONS.map((weapon) => {
          const selected = value === weapon.value
          return (
            <button
              key={weapon.value}
              type="button"
              data-type={weapon.type}
              onClick={() => onChange(weapon.value)}
              className={`weapon-card-btn group flex flex-col items-center gap-2 rounded-xl p-3 text-center ${
                selected ? 'active' : 'hover:border-accent/40'
              }`}
            >
              <img
                src={WEAPON_ICONS[weapon.value]}
                alt={weapon.label}
                className="h-9 w-9 object-contain transition-transform group-hover:scale-110 drop-shadow-[0_0_6px_rgba(0,0,0,0.5)]"
              />
              <span className="font-mono text-xs font-black uppercase tracking-tight text-fg">
                {weapon.label} (+{weapon.xp} XP)
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
```

### src/features/triage/hooks.ts

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { dispatchTriagedTask } from '@/features/triage/api'
import { useInboxTasks } from '@/features/tasks/hooks'

export function useTriageSession() {
  const { data: items, isLoading } = useInboxTasks()
  const queryClient = useQueryClient()

  const dispatch = useMutation({
    mutationFn: dispatchTriagedTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['gamification'] })
      queryClient.invalidateQueries({ queryKey: ['follow-ups'] })
      queryClient.invalidateQueries({ queryKey: ['battle-hud'] })
    },
  })

  return {
    items: items ?? [],
    current: items?.[0],
    remainingCount: items?.length ?? 0,
    isLoading,
    dispatch,
  }
}
```

### src/index.css

```css
@import "tailwindcss";
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";
@import "@fontsource/cinzel/500.css";
@import "@fontsource/cinzel/600.css";
@import "@fontsource/cinzel/700.css";
@import "@fontsource/cinzel/900.css";

/* Tokens de color: valores reales en :root / @media dark más abajo,
   acá solo se registran como utilidades de Tailwind (bg-bg, text-fg, etc).
   Identidad "Hyrule" (rediseño Fase 9): bosque + tecnología rúnica cian +
   oro reservado SOLO para recompensas/logros. Inspirada en el tono de la
   naturaleza y las ruinas antiguas de los juegos de aventura; sin marcas,
   símbolos ni nombres de terceros (la app se publicará). */
@theme {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent-fg: var(--accent-fg);
  --color-accent-deep: var(--accent-deep);
  --color-rune: var(--rune);
  --color-rune-deep: var(--rune-deep);
  --color-gold: var(--gold);
  --color-gold-bright: var(--gold-bright);
  --color-parchment: var(--parchment);
  --color-parchment-ink: var(--parchment-ink);
  --color-surface-card: var(--surface-card);
  --color-border-card: var(--border-card);
  --color-border-glow: var(--border-glow);
  --color-accent-runic: var(--accent-runic);
  --color-hp-full: var(--hp-full);
  --color-hp-critical: var(--hp-critical);
  --color-phase-shield: var(--phase-shield);
  --color-weapon-daga: var(--weapon-daga);
  --color-weapon-espada: var(--weapon-espada);
  --color-weapon-mandoble: var(--weapon-mandoble);
  --color-shade: rgb(var(--shade-rgb));
  --color-glass: rgb(var(--glass-rgb));
  --color-warn-dot: var(--warn-dot);
  --color-warn-bg: var(--warn-bg);
  --color-warn-fg: var(--warn-fg);
  --color-warn-border: var(--warn-border);

  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
  --font-display: "Cinzel", ui-sans-serif, serif;
}

/* Claro = "Día en el valle": crema cálida + verde bosque. Se diseña junto
   con el oscuro, no es un respaldo. Los tokens *-rgb alimentan los
   rgb(var(--x-rgb) / alpha) del CSS de componentes, para que cambien con
   el tema sin hex sueltos. */
:root {
  color-scheme: light dark;

  --bg: #f3f1e2;
  --bg-glow: #e8e6cf;
  --surface: #fffdf3;
  --surface-2: #e9e6d0;
  --fg: #1c2418;
  --fg-muted: #5b6a58;
  --border: rgba(28, 36, 24, 0.14);
  --accent: #2f6b3a;
  --accent-fg: #ffffff;
  --accent-deep: #1f4a29;
  --rune: #0e7490;
  --rune-deep: #0f766e;
  --gold: #8a5d0e;
  --gold-bright: #6e4a0a;
  --parchment: #efe6c8;
  --parchment-ink: #2b2a1e;
  --surface-card: #f7f3df;
  --border-card: rgba(28, 36, 24, 0.18);
  --border-glow: rgba(28, 36, 24, 0.28);
  --accent-runic: var(--rune);

  --bg-rgb: 243 241 226;
  --surface-rgb: 255 253 243;
  --accent-rgb: 47 107 58;
  --gold-rgb: 138 93 14;
  --rune-rgb: 14 116 144;
  --glow-rgb: 28 36 24;
  --shade-rgb: 28 36 24;
  --glass-rgb: 28 36 24;

  /* Jefes: HP del enemigo, mismo valor en claro y oscuro (es el enemigo,
     no el progreso del jugador). */
  --hp-full: #dc2626;
  --hp-critical: #991b1b;
  --phase-shield: var(--gold);
  /* Mesa de Estrategia: color de cada arma/dificultad. */
  --weapon-daga: #4fb35f;
  --weapon-espada: #2bb5aa;
  --weapon-mandoble: #d9a94a;
  --weapon-daga-rgb: 79 179 95;
  --weapon-espada-rgb: 43 181 170;
  /* Aviso cálido (ámbar): reemplaza al rojo para todo lo que no sea error
     real, por la regla de diseño sin culpa visual. */
  --warn-bg: #fdf1d8;
  --warn-fg: #7a4a08;
  --warn-border: rgba(217, 119, 6, 0.35);
  --warn-dot: #d97706;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Oscuro = "Noche en el bosque": verde profundo, luz rúnica cian. */
    --bg: #0b1410;
    --bg-glow: #14281e;
    --surface: #12211a;
    --surface-2: #1a2e24;
    --fg: #eaf1e4;
    --fg-muted: #8fa99a;
    --border: #2c4a3a;
    --border-glow: #3f6b55;
    --accent: #7ccf6a;
    --accent-fg: #07140b;
    --accent-deep: #3d7a34;
    --rune: #4fd1c5;
    --rune-deep: #0f766e;
    --gold: #d9a94a;
    --gold-bright: #f0be5d;
    --surface-card: #16291f;
    --border-card: #2c4a3a;

    --bg-rgb: 11 20 16;
    --surface-rgb: 18 33 26;
    --accent-rgb: 124 207 106;
    --gold-rgb: 217 169 74;
    --rune-rgb: 79 209 197;
    --glow-rgb: 63 107 85;
    --shade-rgb: 0 0 0;
    --glass-rgb: 255 255 255;

    --warn-bg: rgba(217, 119, 6, 0.16);
    --warn-fg: #fcd9a0;
    --warn-border: rgba(217, 119, 6, 0.4);
    --warn-dot: #fbbf24;
  }
}

body {
  margin: 0;
  font-family: var(--font-sans);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg);
  color: var(--fg);
}

@media (prefers-color-scheme: dark) {
  body {
    background: radial-gradient(circle at 20% 0%, var(--bg-glow) 0%, var(--bg) 55%);
  }
}

/* Fondo ambiental (ver AmbientBackground.tsx) */
/* Fondo ambiental "bosque vivo": de noche, luciérnagas + aurora rúnica;
   de día, haces de luz y polen. Solo transform/opacity (barato en GPU). */
.ambient-root {
  --ray-rgb: 232 190 80;
  --ray-a: 0.16;
  --mote-a: 214 160 40;
  --mote-b: 110 160 70;
}

@media (prefers-color-scheme: dark) {
  .ambient-root {
    --ray-rgb: 79 209 197;
    --ray-a: 0.07;
    --mote-a: 240 190 93;
    --mote-b: 124 207 106;
  }
}

.ambient-aurora {
  opacity: 0.5;
  filter: blur(60px);
  background: conic-gradient(
    from 0deg at 50% 50%,
    rgb(var(--accent-rgb) / 0.3),
    rgb(var(--rune-rgb) / 0.2),
    rgb(var(--gold-rgb) / 0.12),
    rgb(var(--rune-rgb) / 0.18),
    rgb(var(--accent-rgb) / 0.3)
  );
  animation: ambient-spin 40s linear infinite;
}

@media (prefers-color-scheme: light) {
  .ambient-aurora {
    display: none;
  }
}

.ambient-rays {
  position: absolute;
  inset: -25% -15% auto -15%;
  height: 100%;
  background: repeating-linear-gradient(
    105deg,
    transparent 0 90px,
    rgb(var(--ray-rgb) / var(--ray-a)) 90px 150px,
    transparent 150px 280px
  );
  mask-image: linear-gradient(to bottom, #000 0%, transparent 80%);
  filter: blur(8px);
  animation: ambient-sway 22s ease-in-out infinite alternate;
}

.ambient-mote {
  position: absolute;
  border-radius: 9999px;
  background: radial-gradient(circle, rgb(var(--mote-c)) 0%, transparent 70%);
  opacity: 0;
  animation:
    ambient-wander var(--dur) ease-in-out var(--delay) infinite,
    ambient-twinkle calc(var(--dur) / 3) ease-in-out var(--delay) infinite;
}

@keyframes ambient-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ambient-sway {
  from {
    transform: translateX(-3%) skewX(-2deg);
  }
  to {
    transform: translateX(3%) skewX(2deg);
  }
}

@keyframes ambient-wander {
  50% {
    transform: translate(var(--dx), var(--dy));
  }
}

@keyframes ambient-twinkle {
  0%,
  100% {
    opacity: 0.05;
  }
  50% {
    opacity: 0.85;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient-aurora,
  .ambient-rays,
  .ambient-mote {
    animation: none;
  }
  .ambient-mote {
    opacity: 0.3;
  }
}

/* Foco visible global (teclado): runa cian, nunca se quita sin reemplazo. */
:focus-visible {
  outline: 2px solid var(--rune);
  outline-offset: 2px;
}

/* Header y paneles flotantes con filo rúnico sutil */
.app-header {
  box-shadow: 0 1px 0 rgb(var(--rune-rgb) / 0.14), 0 8px 24px -12px rgb(var(--shade-rgb) / 0.5);
}

.panel-rune {
  border-color: var(--border-glow);
  box-shadow: 0 0 0 1px rgb(var(--rune-rgb) / 0.12), 0 18px 40px -12px rgb(var(--shade-rgb) / 0.6);
}

/* Celebracion de logros (ver AchievementCelebration.tsx) */
.achievement-burst {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold-bright);
  opacity: 0;
}

.achievement-modal {
  opacity: 0;
  transform: scale(0.6);
  animation: achievement-pop 650ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes achievement-pop {
  0% {
    opacity: 0;
    transform: scale(0.6);
    box-shadow: 0 0 0 rgb(var(--gold-rgb) / 0);
  }
  60% {
    opacity: 1;
    transform: scale(1.05);
    box-shadow: 0 0 60px rgb(var(--gold-rgb) / 0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 40px rgb(var(--gold-rgb) / 0.35);
  }
}

@media (prefers-reduced-motion: reduce) {
  .achievement-modal {
    animation: none;
    opacity: 1;
    transform: scale(1);
  }
}

/* Modal compartido (ver Modal.tsx) */
.modal-backdrop {
  animation: modal-fade 180ms ease-out;
}

.modal-panel {
  animation: modal-pop 220ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-fade {
  from {
    opacity: 0;
  }
}

@keyframes modal-pop {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-backdrop,
  .modal-panel {
    animation: none;
  }
}

/* Grimorio de Acceso (ver LoginPage.tsx) */
.grimoire-card {
  background: linear-gradient(165deg, var(--surface) 0%, var(--surface-2) 100%);
  border: 2px solid var(--border);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 20px rgb(var(--glow-rgb) / 0.3);
}

.input-parchment {
  background-color: rgb(var(--bg-rgb) / 0.7);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.input-parchment:focus {
  border-color: var(--accent);
  box-shadow: 0 0 10px rgb(var(--accent-rgb) / 0.2);
  outline: none;
  background-color: rgb(var(--surface-rgb) / 0.9);
}

.btn-prime {
  background: linear-gradient(180deg, var(--accent) 0%, var(--accent-deep) 100%);
  color: var(--accent-fg);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 0 var(--accent-deep), 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-prime:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 var(--accent-deep), 0 15px 25px rgb(var(--accent-rgb) / 0.25);
}

.btn-prime:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 var(--accent-deep);
}

.tab-active {
  color: var(--gold) !important;
  border-bottom: 2px solid var(--gold);
  text-shadow: 0 0 8px rgb(var(--accent-rgb) / 0.5);
  background: linear-gradient(to top, rgb(var(--accent-rgb) / 0.08), transparent);
}

.glyph-glow {
  filter: drop-shadow(0 0 5px var(--gold));
  animation: pulse-glyph 4s infinite ease-in-out;
}

@keyframes pulse-glyph {
  0%, 100% { filter: drop-shadow(0 0 2px var(--gold)); opacity: 0.8; }
  50% { filter: drop-shadow(0 0 12px var(--gold)); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .glyph-glow {
    animation: none;
  }
}

/* Sidebar & Navegación Lateral (ver Layout.tsx) */
.sidebar-panel {
  width: 280px;
  background: linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%);
  border-right: 2px solid var(--border);
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5), inset -1px 0 0 rgb(var(--rune-rgb) / 0.18);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto Aislamiento TDAH (Overlay de desenfoque de fondo) */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgb(var(--bg-rgb) / 0.6);
  backdrop-filter: blur(8px);
  z-index: 40;
  transition: all 0.3s ease;
}

/* Items de Navegación */
.nav-item-link {
  position: relative;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-item-link:hover {
  transform: translateX(4px);
  color: var(--accent);
  background-color: rgb(var(--accent-rgb) / 0.06);
}

.nav-item-link.active {
  border-left-color: var(--accent);
  background: linear-gradient(90deg, rgb(var(--accent-rgb) / 0.12), transparent);
  color: var(--accent);
}

.nav-item-link.active::after {
  content: '';
  position: absolute;
  right: 14px;
  top: 50%;
  width: 7px;
  height: 7px;
  background: var(--rune);
  transform: translateY(-50%) rotate(45deg);
  box-shadow: 0 0 10px rgb(var(--rune-rgb) / 0.7);
}

.nav-item-link.active .nav-label {
  text-shadow: 0 0 10px rgb(var(--accent-rgb) / 0.4);
  font-weight: 700;
}

/* Tarjeta de Combate Rúnica (ver CombatSlotCard.tsx) */
.combat-card {
  background: linear-gradient(165deg, var(--surface) 0%, var(--surface-2) 100%);
  border: 2px solid var(--border);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.combat-card:hover {
  transform: translateY(-6px);
  border-color: var(--card-theme, var(--gold));
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 0 20px var(--card-glow, rgb(var(--accent-rgb) / 0.2));
}

/* Marco rúnico: esquinas de trazo cian, se encienden al enfocar la tarjeta */
.combat-card::before,
.combat-card::after,
.empty-slot-card::before,
.empty-slot-card::after,
.rune-frame::before,
.rune-frame::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  pointer-events: none;
  border: 0 solid rgb(var(--rune-rgb) / 0.45);
  transition: border-color 0.3s ease, width 0.3s ease, height 0.3s ease;
}

.combat-card::before,
.empty-slot-card::before,
.rune-frame::before {
  top: 8px;
  left: 8px;
  border-width: 2px 0 0 2px;
  border-top-left-radius: 8px;
}

.combat-card::after,
.empty-slot-card::after,
.rune-frame::after {
  right: 8px;
  bottom: 8px;
  border-width: 0 2px 2px 0;
  border-bottom-right-radius: 8px;
}

.combat-card:hover::before,
.combat-card:hover::after,
.empty-slot-card:hover::before,
.empty-slot-card:hover::after {
  border-color: var(--rune);
  width: 26px;
  height: 26px;
}

.rune-frame {
  position: relative;
}

@media (prefers-reduced-motion: reduce) {
  .combat-card::before,
  .combat-card::after,
  .empty-slot-card::before,
  .empty-slot-card::after {
    transition: none;
  }
}

/* Barra de Salud Segmentada (HP) */
.hp-segment {
  height: 8px;
  background: rgb(var(--shade-rgb) / 0.5);
  border: 1px solid rgb(var(--glass-rgb) / 0.05);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hp-segment.active {
  background: linear-gradient(to bottom, #ef4444, #991b1b);
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
}

/* Slot Vacío Rúnico */
.empty-slot-card {
  position: relative;
  border: 2px dashed var(--border);
  background: rgb(var(--shade-rgb) / 0.2);
  transition: all 0.3s ease;
}

.empty-slot-card:hover {
  border-color: var(--accent);
  background: rgb(var(--accent-rgb) / 0.03);
}

/* Animaciones Feedback TDAH (Shake & Kill Flash) */
.shake-anim {
  animation: shake-effect 0.3s ease-in-out;
}

@keyframes shake-effect {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-kill {
  animation: kill-flash 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes kill-flash {
  0% { transform: scale(1); filter: brightness(1); }
  20% { transform: scale(1.05); filter: brightness(2.5); }
  100% { transform: scale(0.1); opacity: 0; filter: brightness(0); }
}

@media (prefers-reduced-motion: reduce) {
  .shake-anim,
  .animate-kill {
    animation: none;
  }
}

/* Input Pergamino de Captura Rápida (ver InboxPage.tsx) */
.input-parchment-inbox {
  background: rgb(var(--surface-rgb) / 0.6);
  border: 2px solid var(--border);
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.input-parchment-inbox:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 20px rgb(var(--accent-rgb) / 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
}

/* Estado Grabando (Dictado por Voz) */
.pulse-recording {
  animation: recording-pulse 1.5s infinite;
}

@keyframes recording-pulse {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

/* Animación Entrada de Pergamino */
.inbox-item-card {
  animation: slideInPergamino 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  background: linear-gradient(90deg, var(--surface) 0%, var(--surface-2) 100%);
  border-left: 4px solid var(--border);
}

@keyframes slideInPergamino {
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .pulse-recording,
  .inbox-item-card {
    animation: none;
  }
}

/* Perspectiva y Pila de Cartas de Estrategia (ver StrategyTablePage.tsx) */
.deck-container {
  perspective: 1000px;
}

.card-bg-visual {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 1.5rem;
  z-index: 0;
  transition: all 0.4s ease;
}

.card-stack-1 {
  transform: translateZ(-20px) translateY(10px) rotate(-1deg);
  opacity: 0.8;
}

.card-stack-2 {
  transform: translateZ(-40px) translateY(20px) rotate(1.5deg);
  opacity: 0.5;
}

/* Carta Activa y Deslizamiento de Despacho */
.active-strategy-card {
  background: linear-gradient(165deg, var(--surface) 0%, var(--surface-2) 100%);
  border: 2px solid var(--border);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease;
}

.slide-out-right {
  transform: translateX(120vw) rotate(20deg) !important;
  opacity: 0 !important;
}

/* Botones Selector de Armas */
.weapon-card-btn {
  border: 2px solid var(--border);
  background: rgb(var(--shade-rgb) / 0.3);
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.weapon-card-btn.active[data-type="small"] {
  border-color: var(--weapon-daga);
  box-shadow: 0 0 16px rgb(var(--weapon-daga-rgb) / 0.4);
  transform: scale(1.04);
}

.weapon-card-btn.active[data-type="medium"] {
  border-color: var(--weapon-espada);
  box-shadow: 0 0 16px rgb(var(--weapon-espada-rgb) / 0.4);
  transform: scale(1.04);
}

.weapon-card-btn.active[data-type="large"] {
  border-color: var(--weapon-mandoble);
  box-shadow: 0 0 16px rgb(var(--accent-rgb) / 0.4);
  transform: scale(1.04);
}

/* Selects con Estilo Pergamino Oscuro */
.parchment-select {
  background: rgb(var(--shade-rgb) / 0.3);
  border: 1px solid var(--border);
  color: var(--fg);
  cursor: pointer;
  transition: border-color 0.2s;
}

.parchment-select:focus {
  border-color: var(--accent);
  outline: none;
}

@media (prefers-reduced-motion: reduce) {
  .active-strategy-card {
    transition: opacity 0.4s ease;
  }
}

/* Barra de Salud del Jefe de Mazmorra (ver BossHealthBar.tsx) */
.boss-hp-container {
  box-shadow: 0 0 30px rgba(220, 38, 38, 0.25);
  border: 2px solid var(--border);
}

.boss-hp-fill {
  background: linear-gradient(90deg, #991b1b 0%, #dc2626 50%, #ef4444 100%);
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.phase-mark-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgb(var(--glass-rgb) / 0.25);
  z-index: 10;
}

/* Cofres de Loot de Fase */
.chest-icon-phase {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: grayscale(1) opacity(0.35);
}

.chest-icon-phase.active {
  filter: grayscale(0) opacity(1) drop-shadow(0 0 12px var(--gold));
  transform: scale(1.2);
}

/* Tarjetas de Ataque / Misión de Proyecto */
.attack-card-item {
  background: linear-gradient(165deg, var(--surface) 0%, var(--surface-2) 100%);
  border: 1px solid var(--border);
  transition: all 0.25s ease;
}

.attack-card-item:hover {
  border-color: var(--accent);
  transform: translateX(4px);
}

/* Modal de Recompensa con Destello de Oro */
.gold-shimmer-bg {
  background: linear-gradient(90deg, transparent, rgb(var(--gold-rgb) / 0.2), transparent);
  background-size: 200% 100%;
  animation: goldShimmer 2.2s infinite linear;
}

@keyframes goldShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .gold-shimmer-bg {
    animation: none;
  }
}

/* Toggle de Modo de Vista (Foco Gradual vs Ámbitos) — ver KanbanPage.tsx */
.view-mode-toggle {
  background: rgb(var(--shade-rgb) / 0.4);
  border: 1px solid var(--border);
  border-radius: 9999px;
  padding: 4px;
}

.view-mode-btn {
  border-radius: 9999px;
  padding: 6px 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--fg-muted);
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.view-mode-btn.active {
  background: var(--gold);
  color: var(--accent-fg);
  box-shadow: 0 0 12px rgb(var(--accent-rgb) / 0.35);
}

/* Acordeón de Foco Gradual */
.accordion-content-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-section.active .accordion-content-panel {
  max-height: 2500px;
}

.accordion-section.active .chevron-icon {
  transform: rotate(180deg);
}

/* Sellos de Cera (Wax Seals) */
.wax-seal-btn {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: grayscale(0.5) brightness(0.85);
  position: relative;
}

.wax-seal-btn:hover {
  transform: translateY(-2px) scale(1.03);
  filter: grayscale(0.1) brightness(1);
}

.wax-seal-btn.active {
  filter: grayscale(0) brightness(1.2);
  transform: translateY(-4px);
  box-shadow: 0 0 20px rgb(var(--accent-rgb) / 0.4);
  border-color: var(--gold) !important;
}

.wax-seal-btn.active::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--gold);
}

/* Tarjeta Pergamino de Misión */
.mission-scroll-card {
  background: linear-gradient(90deg, var(--surface) 0%, var(--surface-2) 100%);
  border-left: 3px solid var(--border);
  transition: all 0.25s ease;
}

.mission-scroll-card:hover {
  border-left-color: var(--accent);
  transform: translateX(4px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

@media (prefers-reduced-motion: reduce) {
  .view-mode-btn,
  .wax-seal-btn,
  .mission-scroll-card,
  .accordion-content-panel {
    transition: none;
  }
}

/* Chrono-Stream Vertical (Línea de Tiempo) — ver CalendarTimelineView.tsx */
.chrono-stream-line::before {
  content: "";
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, var(--border) 5%, var(--border) 95%, transparent);
  z-index: 0;
}

.day-node-dot {
  width: 12px;
  height: 12px;
  background: var(--surface-2);
  border: 2px solid var(--border);
  border-radius: 50%;
  position: absolute;
  left: 19px;
  top: 14px;
}

/* Destello del Nodo HOY */
.node-today-active {
  background: rgb(var(--accent-rgb) / 0.04);
  border-radius: 1rem;
  border: 1px solid rgb(var(--accent-rgb) / 0.2);
}

.node-today-active .day-node-dot {
  background: var(--gold);
  border-color: #ffffff;
  box-shadow: 0 0 15px var(--gold);
  animation: pulseRuneHalo 2s infinite;
}

@keyframes pulseRuneHalo {
  0% { transform: scale(1); box-shadow: 0 0 10px var(--gold); }
  50% { transform: scale(1.3); box-shadow: 0 0 25px var(--gold); }
  100% { transform: scale(1); box-shadow: 0 0 10px var(--gold); }
}

/* Medidor de Energía Diario */
.energy-meter-track {
  height: 5px;
  border-radius: 3px;
  background: rgb(var(--shade-rgb) / 0.4);
  overflow: hidden;
}

/* Cuadrícula de Mapa de Calor Astral */
.grid-day-cell {
  aspect-ratio: 1 / 1;
  background: rgb(var(--shade-rgb) / 0.25);
  border: 1px solid var(--border);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: pointer;
}

.grid-day-cell:hover {
  border-color: var(--gold);
  transform: scale(1.04);
  z-index: 10;
}

.grid-day-cell.selected {
  border-color: var(--gold);
  box-shadow: 0 0 15px rgb(var(--accent-rgb) / 0.4);
  background: rgb(var(--accent-rgb) / 0.08);
}

.heat-low { box-shadow: inset 0 0 10px rgb(var(--glass-rgb) / 0.03); }
.heat-mid { box-shadow: inset 0 0 15px rgb(var(--accent-rgb) / 0.25); border-color: rgb(var(--accent-rgb) / 0.4); }
.heat-high { box-shadow: inset 0 0 20px rgb(var(--gold-rgb) / 0.4); border-color: rgb(var(--gold-rgb) / 0.6); }

/* Gemas de Color por Categoría */
.gem-rune {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  filter: drop-shadow(0 0 4px currentColor);
}

@media (prefers-reduced-motion: reduce) {
  .node-today-active .day-node-dot {
    animation: none;
  }
  .grid-day-cell {
    transition: none;
  }
}

/* Tarjeta de Piedra y Borde Rúnico — ver ProgressPage.tsx */
.card-stone-bg {
  background: linear-gradient(145deg, var(--surface) 0%, var(--surface-2) 100%);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.card-rune-interactive {
  border: 2px solid var(--border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-rune-interactive:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

/* Animación de Resplandor de Racha (Glow) */
.streak-glow-card {
  animation: streakGlow 2.5s infinite ease-in-out;
}

@keyframes streakGlow {
  0%, 100% { box-shadow: 0 0 8px rgb(var(--gold-rgb) / 0.2); }
  50% { box-shadow: 0 0 22px rgb(var(--gold-rgb) / 0.45); }
}

/* Destello de XP al completar misión */
.xp-flash-anim {
  animation: xpFlash 0.6s ease-out forwards;
}

@keyframes xpFlash {
  0% { filter: brightness(1); }
  50% { filter: brightness(2) saturate(1.5); transform: scale(1.02); }
  100% { filter: brightness(1); transform: scale(1); }
}

/* Modal Pergamino de Clase */
.modal-parchment-scroll {
  background: var(--parchment);
  color: var(--parchment-ink);
  border: 12px solid var(--parchment-ink);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
}

@media (prefers-reduced-motion: reduce) {
  .card-rune-interactive,
  .streak-glow-card,
  .xp-flash-anim {
    animation: none;
    transition: none;
  }
}

/* Modal Contenedor Pergamino de Decreto — ver TaskModal.tsx */
.grimoire-editor-modal {
  background: linear-gradient(165deg, var(--surface) 0%, var(--surface-2) 100%);
  border: 2px solid var(--border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 20px rgb(var(--glow-rgb) / 0.35);
  max-height: 90vh;
  overflow-y: auto;
}

.grimoire-editor-modal::-webkit-scrollbar {
  width: 6px;
}
.grimoire-editor-modal::-webkit-scrollbar-track {
  background: transparent;
}
.grimoire-editor-modal::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}

/* Chips Táctiles */
.tactile-chip {
  background: rgb(var(--glass-rgb) / 0.03);
  border: 1px solid var(--border);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  user-select: none;
}

.tactile-chip:hover {
  border-color: rgb(var(--accent-rgb) / 0.5);
  background: rgb(var(--glass-rgb) / 0.06);
}

.tactile-chip.active-weapon-small {
  border-color: var(--weapon-daga);
  box-shadow: 0 0 10px rgb(var(--weapon-daga-rgb) / 0.35);
  color: var(--weapon-daga);
}

.tactile-chip.active-weapon-medium {
  border-color: var(--weapon-espada);
  box-shadow: 0 0 10px rgb(var(--weapon-espada-rgb) / 0.35);
  color: var(--weapon-espada);
}

.tactile-chip.active-weapon-large {
  border-color: var(--gold);
  box-shadow: 0 0 10px rgb(var(--accent-rgb) / 0.35);
  color: var(--gold);
}

.tactile-chip.active-gold {
  border-color: var(--gold);
  background: rgb(var(--gold-rgb) / 0.12);
  color: var(--gold);
}

/* Barra de Integridad HP de Submisiones */
.quest-hp-track {
  background: rgb(var(--shade-rgb) / 0.4);
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.quest-hp-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-deep), var(--accent));
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Animación Destello al Sellar Decreto */
.animate-seal-flash {
  animation: sealFlashAnim 0.6s ease-out forwards;
}

@keyframes sealFlashAnim {
  0% { box-shadow: 0 0 0px var(--gold); filter: brightness(1); }
  50% { box-shadow: 0 0 45px var(--gold); filter: brightness(1.4); }
  100% { box-shadow: 0 0 0px var(--gold); filter: brightness(1); }
}

@media (prefers-reduced-motion: reduce) {
  .tactile-chip,
  .animate-seal-flash {
    animation: none;
    transition: none;
  }
}

/* Tarjeta de Pacto de Custodia — ver FollowUpCard.tsx */
.follow-up-card {
  background: linear-gradient(165deg, var(--surface) 0%, var(--surface-2) 100%);
  border: 1px solid var(--border);
  border-left: 4px solid var(--rune);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.follow-up-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px -5px rgb(var(--rune-rgb) / 0.2);
  border-left-width: 8px;
}

/* Medidor de Insistencia (Puntos de Intento) */
.insistence-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgb(var(--glass-rgb) / 0.1);
  border: 1px solid rgb(var(--glass-rgb) / 0.2);
  transition: all 0.3s ease;
}

.insistence-dot.active {
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  border-color: var(--accent);
}

.insistence-dot.warning {
  background: var(--warn-dot);
  box-shadow: 0 0 8px var(--warn-dot);
  border-color: var(--warn-dot);
}

/* Acordeón de Bitácora Histórica */
.bitacora-accordion {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-out;
}

.bitacora-accordion.open {
  max-height: 600px;
}

/* Modal Pergamino de Registro */
.modal-parchment-log {
  background: var(--parchment);
  color: var(--parchment-ink);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
  border: 8px solid var(--parchment-ink);
}

/* Animación de Resolución de Follow-Up */
.animate-success-glow {
  animation: successFollowUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes successFollowUp {
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.05); filter: brightness(1.5) saturate(1.5); }
  100% { transform: scale(0.9); opacity: 0; filter: brightness(0); }
}

@media (prefers-reduced-motion: reduce) {
  .follow-up-card,
  .insistence-dot,
  .bitacora-accordion,
  .animate-success-glow {
    animation: none;
    transition: none;
  }
}

/* Avisos efímeros (Toaster) */
.toast-pop {
  animation: toast-pop 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes toast-pop {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }
}

@media (prefers-reduced-motion: reduce) {
  .toast-pop {
    animation: none;
  }
}
```

### src/lib/supabase.ts

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copia .env.example a .env.local y completa los valores de tu proyecto Supabase.',
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

### src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### src/sw.ts

```typescript
/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

// Lecturas a Supabase: red primero, cae a cache si no hay conexión (modo
// lectura offline para kanban/calendario/progreso con lo último cargado).
registerRoute(
  ({ url, request }) => url.hostname.endsWith('.supabase.co') && request.method === 'GET',
  new NetworkFirst({ cacheName: 'supabase-reads', networkTimeoutSeconds: 5 }),
)

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

interface PushPayload {
  title: string
  body: string
  url?: string
}

self.addEventListener('push', (event) => {
  if (!event.data) return
  const data = event.data.json() as PushPayload
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/web-app-manifest-192x192.png',
      badge: '/icons/web-app-manifest-192x192.png',
      data: { url: data.url ?? '/' },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const targetUrl = (event.notification.data as { url?: string } | undefined)?.url ?? '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      const existing = clientList.find((c) => 'focus' in c) as WindowClient | undefined
      if (existing) return existing.focus()
      return self.clients.openWindow(targetUrl)
    }),
  )
})
```

### src/types/database.types.ts

```typescript
// Tipado a mano a partir de supabase/migrations/20260724202801_fase1_schema.sql.
// Cuando el proyecto tenga acceso a `supabase login`, reemplazar por:
// `supabase gen types typescript --project-id <ref> > src/types/database.types.ts`

export type TaskStatus = 'pending' | 'in_progress' | 'done' | 'follow_up'
export type ProjectStatus = 'active' | 'archived'
export type TaskSize = 'small' | 'medium' | 'large'
export type QuestType = 'daily_triage' | 'daily_priority' | 'weekly_project'
export type LootTriggerType = 'streak' | 'quest_complete' | 'level_up' | 'rank_up'
export type NotificationType =
  | 'upcoming'
  | 'upcoming_3d'
  | 'upcoming_1d'
  | 'due_today'
  | 'overdue'
  | 'follow_up'

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          color_hex: string
          icon_name: string
          class_name: string
          position: number
          created_at: string
        }
        Insert: Record<string, never>
        Update: Record<string, never>
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          user_id: string
          category_id: string
          name: string
          description: string | null
          status: ProjectStatus
          boss_avatar: string
          boss_title: string
          phases_claimed: number[]
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          category_id: string
          name: string
          description?: string | null
          status?: ProjectStatus
          boss_avatar?: string
          boss_title?: string
          phases_claimed?: number[]
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
        Relationships: []
      }
      kanban_columns: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          name: string
          position: number
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          project_id?: string | null
          name: string
          position: number
          is_default?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['kanban_columns']['Insert']>
        Relationships: []
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          parent_task_id: string | null
          kanban_column_id: string | null
          category_id: string | null
          title: string
          description: string | null
          deadline: string | null
          status: TaskStatus
          size: TaskSize | null
          xp_reward: number
          rescue_bonus: number
          hud_slot: number | null
          position: number | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string
          project_id?: string | null
          parent_task_id?: string | null
          kanban_column_id?: string | null
          category_id?: string | null
          title: string
          description?: string | null
          deadline?: string | null
          status?: TaskStatus
          size?: TaskSize | null
          hud_slot?: number | null
          position?: number | null
          created_at?: string
          completed_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>
        Relationships: []
      }
      user_category_xp: {
        Row: {
          id: string
          user_id: string
          category_id: string
          current_xp: number
          current_level: number
          current_rank_id: string | null
        }
        Insert: {
          id?: string
          user_id?: string
          category_id: string
          current_xp?: number
          current_level?: number
          current_rank_id?: string | null
        }
        Update: Partial<Database['public']['Tables']['user_category_xp']['Insert']>
        Relationships: []
      }
      class_ranks: {
        Row: {
          id: string
          category_id: string
          rank_order: number
          rank_name: string
          xp_threshold: number
          icon_name: string | null
        }
        Insert: Record<string, never>
        Update: Record<string, never>
        Relationships: []
      }
      loot_definitions: {
        Row: {
          id: string
          slug: string
          name: string
          description: string
          icon_name: string
          category_id: string | null
          trigger_type: LootTriggerType
          trigger_value: number | null
        }
        Insert: Record<string, never>
        Update: Record<string, never>
        Relationships: []
      }
      loot: {
        Row: {
          id: string
          user_id: string
          loot_definition_id: string
          unlocked_at: string
        }
        Insert: Record<string, never>
        Update: Record<string, never>
        Relationships: []
      }
      streaks: {
        Row: {
          id: string
          user_id: string
          current_streak_days: number
          longest_streak: number
          shields_available: number
          last_active_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          current_streak_days?: number
          longest_streak?: number
          shields_available?: number
          last_active_date?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['streaks']['Insert']>
        Relationships: []
      }
      quests: {
        Row: {
          id: string
          user_id: string
          type: QuestType
          period_start: string
          project_id: string | null
          task_id: string | null
          xp_reward: number
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          type: QuestType
          period_start: string
          project_id?: string | null
          task_id?: string | null
          xp_reward?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['quests']['Insert']>
        Relationships: []
      }
      follow_ups: {
        Row: {
          id: string
          user_id: string
          task_id: string
          stakeholder_name: string | null
          interval_days: number
          last_contacted_at: string
          next_reminder_at: string
          notes: string | null
          resolved_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          task_id: string
          stakeholder_name?: string | null
          interval_days: number
          last_contacted_at?: string
          next_reminder_at?: string
          notes?: string | null
          resolved_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['follow_ups']['Insert']>
        Relationships: []
      }
      follow_up_logs: {
        Row: {
          id: string
          user_id: string
          follow_up_id: string
          notes: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          follow_up_id: string
          notes: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['follow_up_logs']['Insert']>
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          task_id: string
          type: NotificationType
          message: string
          scheduled_at: string
          dismissed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          task_id: string
          type: NotificationType
          message: string
          scheduled_at?: string
          dismissed_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          id: string
          user_id: string
          endpoint: string
          p256dh: string
          auth: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          endpoint: string
          p256dh: string
          auth: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['push_subscriptions']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      claim_boss_phase: {
        Args: { p_project_id: string; p_phase: number }
        Returns: Database['public']['Tables']['projects']['Row']
      }
    }
  }
}

export type Category = Database['public']['Tables']['categories']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type KanbanColumn = Database['public']['Tables']['kanban_columns']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type UserCategoryXp = Database['public']['Tables']['user_category_xp']['Row']
export type Streak = Database['public']['Tables']['streaks']['Row']
export type Quest = Database['public']['Tables']['quests']['Row']
export type ClassRank = Database['public']['Tables']['class_ranks']['Row']
export type LootDefinition = Database['public']['Tables']['loot_definitions']['Row']
export type Loot = Database['public']['Tables']['loot']['Row']
export type FollowUp = Database['public']['Tables']['follow_ups']['Row']
export type FollowUpLog = Database['public']['Tables']['follow_up_logs']['Row']
export type AppNotification = Database['public']['Tables']['notifications']['Row']
export type PushSubscriptionRow = Database['public']['Tables']['push_subscriptions']['Row']
```

### src/utils/classIcons.ts

```typescript
import { Axe, BookOpen, Brain, Gamepad2, Leaf, Shield, type LucideIcon } from 'lucide-react'

// Un ícono vectorial por clase (categoría). Provisional hasta que existan
// avatares de clase ilustrados (ver pendings.md).
export const CLASS_ICONS: Record<string, LucideIcon> = {
  Concentrix: Brain,
  Delorean: Axe,
  Estudios: BookOpen,
  Hobbies: Gamepad2,
  Personal: Shield,
  Hogar: Leaf,
}
```

### src/utils/datetime.ts

```typescript
import { addDays, format, isPast, isSameDay } from 'date-fns'

export function toDatetimeLocalValue(iso: string | null): string {
  if (!iso) return ''
  return format(new Date(iso), "yyyy-MM-dd'T'HH:mm")
}

export function fromDatetimeLocalValue(value: string): string {
  return new Date(value).toISOString()
}

// Nueva fecha límite dentro de N días conservando la hora original (18:00 si no tenía).
export function rescheduleIso(daysFromNow: number, previousIso: string | null): string {
  const target = addDays(new Date(), daysFromNow)
  const prev = previousIso ? new Date(previousIso) : null
  target.setHours(prev ? prev.getHours() : 18, prev ? prev.getMinutes() : 0, 0, 0)
  return target.toISOString()
}

export function isOverdue(task: { deadline: string | null; status: string }): boolean {
  return task.status !== 'done' && !!task.deadline && isPast(new Date(task.deadline))
}

// Mueve una fecha límite N días respecto a ella misma (misma hora).
export function shiftDeadlineIso(previousIso: string, days: number): string {
  return addDays(new Date(previousIso), days).toISOString()
}

// Misma hora que tenía (18:00 si no tenía) pero en otro día. Si cae hoy y esa
// hora ya pasó, 23:00 para que no nazca "por rescatar".
export function deadlineOnDay(day: Date, previousIso: string | null): string {
  const d = new Date(day)
  const prev = previousIso ? new Date(previousIso) : null
  d.setHours(prev ? prev.getHours() : 18, prev ? prev.getMinutes() : 0, 0, 0)
  if (d.getTime() <= Date.now() && isSameDay(d, new Date())) d.setHours(23, 0, 0, 0)
  return d.toISOString()
}
```

### src/utils/rpgAssets.ts

```typescript
import type { TaskSize } from '@/types/database.types'

export const WEAPON_ICONS: Record<TaskSize, string> = {
  small: '/assets/rpg/weapons/dagger.png',
  medium: '/assets/rpg/weapons/sword.png',
  large: '/assets/rpg/weapons/greatsword.png',
}

export const BOSS_AVATARS = {
  dragon_default: '/assets/rpg/bosses/dragon.png',
  lich_default: '/assets/rpg/bosses/lich.png',
} as const

export function bossAvatarSrc(key: string): string {
  return (BOSS_AVATARS as Record<string, string | undefined>)[key] ?? BOSS_AVATARS.dragon_default
}

export const LOOT_ICONS = {
  chest_phase: '/assets/rpg/loot/chest.png',
} as const

export const NAV_ICONS = {
  combat: '/assets/rpg/nav/combat.png',
  inbox: '/assets/rpg/nav/inbox.png',
  strategy: '/assets/rpg/nav/strategy.png',
  grimoire: '/assets/rpg/nav/grimoire.png',
  calendar: '/assets/rpg/nav/calendar.png',
  progress: '/assets/rpg/nav/progress.png',
  followups: '/assets/rpg/nav/followups.png',
} as const

export type NavIconKey = keyof typeof NAV_ICONS
```

### src/utils/useOnlineStatus.ts

```typescript
import { useEffect, useState } from 'react'

export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return online
}
```

### src/utils/useSpeechDictation.ts

```typescript
import { useEffect, useRef, useState } from 'react'

// El API de Web Speech todavía no tiene tipos oficiales en lib.dom — se
// declara acá el mínimo necesario en vez de sumar una dependencia solo
// para los tipos.
interface MinimalSpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } }
}

interface MinimalSpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: ((event: MinimalSpeechRecognitionEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
}

type SpeechRecognitionConstructor = new () => MinimalSpeechRecognition

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

export function useSpeechDictation(onResult: (text: string) => void) {
  const recognitionRef = useRef<MinimalSpeechRecognition | null>(null)
  const [listening, setListening] = useState(false)
  const supported =
    typeof window !== 'undefined' && !!(window.SpeechRecognition ?? window.webkitSpeechRecognition)

  useEffect(() => {
    return () => recognitionRef.current?.stop()
  }, [])

  function start() {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition
    if (!Ctor) return
    const recognition = new Ctor()
    recognition.lang = 'es-ES'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onresult = (event) => {
      const text = event.results[0]?.[0]?.transcript ?? ''
      if (text) onResult(text)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  function stop() {
    recognitionRef.current?.stop()
    setListening(false)
  }

  return { supported, listening, start, stop }
}
```

### src/vite-env.d.ts

```typescript
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_VAPID_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### supabase/config.toml

```toml
# For detailed configuration reference documentation, visit:
# https://supabase.com/docs/guides/local-development/cli/config
# A string used to distinguish different Supabase projects on the same host. Defaults to the
# working directory name when running `supabase init`.
project_id = "Prod_App"

[api]
enabled = true
# Port to use for the API URL.
port = 54321
# Schemas to expose in your API. Tables, views and stored procedures in this schema will get API
# endpoints. `public` and `graphql_public` schemas are included by default.
schemas = ["public", "graphql_public"]
# Extra schemas to add to the search_path of every request.
extra_search_path = ["public", "extensions"]
# The maximum number of rows returns from a view, table, or stored procedure. Limits payload size
# for accidental or malicious requests.
max_rows = 1000
# Controls whether new tables, views, sequences and functions created in the `public` schema by
# `postgres` are reachable through the Data API roles (`anon`, `authenticated`, `service_role`)
# without explicit GRANTs. When unset, new entities are NOT auto-exposed, matching the new cloud
# default. Set to `true` to keep the legacy behaviour of auto-exposing new entities; this is
# deprecated and the field is removed on 2026-10-30 once the always-revoked behaviour is permanent.
# auto_expose_new_tables = true

[api.tls]
# Enable HTTPS endpoints locally using a self-signed certificate.
enabled = false
# Paths to self-signed certificate pair.
# cert_path = "../certs/my-cert.pem"
# key_path = "../certs/my-key.pem"

[db]
# Port to use for the local database URL.
port = 54322
# Port used by db diff command to initialize the shadow database.
shadow_port = 54320
# Maximum amount of time to wait for health check when starting the local database.
health_timeout = "2m"
# The database major version to use. This has to be the same as your remote database's. Run `SHOW
# server_version;` on the remote database to check.
major_version = 17

[db.pooler]
enabled = false
# Port to use for the local connection pooler.
port = 54329
# Specifies when a server connection can be reused by other clients.
# Configure one of the supported pooler modes: `transaction`, `session`.
pool_mode = "transaction"
# How many server connections to allow per user/database pair.
default_pool_size = 20
# Maximum number of client connections allowed.
max_client_conn = 100

# [db.vault]
# secret_key = "env(SECRET_VALUE)"

[db.migrations]
# If disabled, migrations will be skipped during a db push or reset.
enabled = true
# Specifies an ordered list of schema files, directories, or glob patterns that describe your database.
# Supports paths relative to supabase directory: "./schemas/*.sql", "./database".
schema_paths = []

[db.seed]
# If enabled, seeds the database after migrations during a db reset.
enabled = true
# Specifies an ordered list of seed files to load during db reset.
# Supports glob patterns relative to supabase directory: "./seeds/*.sql"
sql_paths = ["./seed.sql"]

[db.network_restrictions]
# Enable management of network restrictions.
enabled = false
# List of IPv4 CIDR blocks allowed to connect to the database.
# Defaults to allow all IPv4 connections. Set empty array to block all IPs.
allowed_cidrs = ["0.0.0.0/0"]
# List of IPv6 CIDR blocks allowed to connect to the database.
# Defaults to allow all IPv6 connections. Set empty array to block all IPs.
allowed_cidrs_v6 = ["::/0"]

# Uncomment to reject non-secure connections to the database.
# [db.ssl_enforcement]
# enabled = true

[realtime]
enabled = true
# Bind realtime via either IPv4 or IPv6. (default: IPv4)
# ip_version = "IPv6"
# The maximum length in bytes of HTTP request headers. (default: 4096)
# max_header_length = 4096

[studio]
enabled = true
# Port to use for Supabase Studio.
port = 54323
# External URL of the API server that frontend connects to.
api_url = "http://127.0.0.1"
# OpenAI API Key to use for Supabase AI in the Supabase Studio.
openai_api_key = "env(OPENAI_API_KEY)"

# Email testing server. Emails sent with the local dev setup are not actually sent - rather, they
# are monitored, and you can view the emails that would have been sent from the web interface.
[local_smtp]
enabled = true
# Port to use for the email testing server web interface.
port = 54324
# Uncomment to expose additional ports for testing user applications that send emails.
# smtp_port = 54325
# pop3_port = 54326
# admin_email = "admin@email.com"
# sender_name = "Admin"

[storage]
enabled = true
# The maximum file size allowed (e.g. "5MB", "500KB").
file_size_limit = "50MiB"

# Uncomment to configure local storage buckets
# [storage.buckets.images]
# public = false
# file_size_limit = "50MiB"
# allowed_mime_types = ["image/png", "image/jpeg"]
# objects_path = "./images"

# Allow connections via S3 compatible clients
[storage.s3_protocol]
enabled = true

# Image transformation API is available to Supabase Pro plan.
# [storage.image_transformation]
# enabled = true

# Store analytical data in S3 for running ETL jobs over Iceberg Catalog
# This feature is only available on the hosted platform.
[storage.analytics]
enabled = false
max_namespaces = 5
max_tables = 10
max_catalogs = 2

# Analytics Buckets is available to Supabase Pro plan.
# [storage.analytics.buckets.my-warehouse]

# Store vector embeddings in S3 for large and durable datasets
[storage.vector]
enabled = true
max_buckets = 10
max_indexes = 5

# Vector Buckets is available to Supabase Pro plan.
# [storage.vector.buckets.documents-openai]

[auth]
enabled = true
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://127.0.0.1:3000"
# The public URL that Auth serves on. Defaults to the API external URL with `/auth/v1` appended.
# external_url = ""
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://127.0.0.1:3000"]
# How long tokens are valid for, in seconds. Defaults to 3600 (1 hour), maximum 604,800 (1 week).
jwt_expiry = 3600
# JWT issuer URL. If not set, defaults to auth.external_url.
# jwt_issuer = ""
# Path to JWT signing key. DO NOT commit your signing keys file to git.
# signing_keys_path = "./signing_keys.json"
# If disabled, the refresh token will never expire.
enable_refresh_token_rotation = true
# Allows refresh tokens to be reused after expiry, up to the specified interval in seconds.
# Requires enable_refresh_token_rotation = true.
refresh_token_reuse_interval = 10
# Allow/disallow new user signups to your project.
enable_signup = true
# Allow/disallow anonymous sign-ins to your project.
enable_anonymous_sign_ins = false
# Allow/disallow testing manual linking of accounts
enable_manual_linking = false
# Passwords shorter than this value will be rejected as weak. Minimum 6, recommended 8 or more.
minimum_password_length = 6
# Passwords that do not meet the following requirements will be rejected as weak. Supported values
# are: `letters_digits`, `lower_upper_letters_digits`, `lower_upper_letters_digits_symbols`
password_requirements = ""

# Configure passkey sign-ins.
# [auth.passkey]
# enabled = false

# Configure WebAuthn relying party settings (required when passkey is enabled).
# [auth.webauthn]
# rp_display_name = "Supabase"
# rp_id = "localhost"
# rp_origins = ["http://127.0.0.1:3000"]

[auth.rate_limit]
# Number of emails that can be sent per hour. Requires auth.email.smtp to be enabled.
email_sent = 2
# Number of SMS messages that can be sent per hour. Requires auth.sms to be enabled.
sms_sent = 30
# Number of anonymous sign-ins that can be made per hour per IP address. Requires enable_anonymous_sign_ins = true.
anonymous_users = 30
# Number of sessions that can be refreshed in a 5 minute interval per IP address.
token_refresh = 150
# Number of sign up and sign-in requests that can be made in a 5 minute interval per IP address (excludes anonymous users).
sign_in_sign_ups = 30
# Number of OTP / Magic link verifications that can be made in a 5 minute interval per IP address.
token_verifications = 30
# Number of Web3 logins that can be made in a 5 minute interval per IP address.
web3 = 30

# Configure one of the supported captcha providers: `hcaptcha`, `turnstile`.
# [auth.captcha]
# enabled = true
# provider = "hcaptcha"
# secret = ""

[auth.email]
# Allow/disallow new user signups via email to your project.
enable_signup = true
# If enabled, a user will be required to confirm any email change on both the old, and new email
# addresses. If disabled, only the new email is required to confirm.
double_confirm_changes = true
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = false
# If enabled, users will need to reauthenticate or have logged in recently to change their password.
secure_password_change = false
# Controls the minimum amount of time that must pass before sending another signup confirmation or password reset email.
max_frequency = "1s"
# Number of characters used in the email OTP.
otp_length = 6
# Number of seconds before the email OTP expires (defaults to 1 hour).
otp_expiry = 3600

# Use a production-ready SMTP server
# [auth.email.smtp]
# enabled = true
# host = "smtp.sendgrid.net"
# port = 587
# user = "apikey"
# pass = "env(SENDGRID_API_KEY)"
# admin_email = "admin@email.com"
# sender_name = "Admin"

# Uncomment to customize email template
# [auth.email.template.invite]
# subject = "You have been invited"
# content_path = "./supabase/templates/invite.html"

# Uncomment to customize notification email template
# [auth.email.notification.password_changed]
# enabled = true
# subject = "Your password has been changed"
# content_path = "./templates/password_changed_notification.html"

[auth.sms]
# Allow/disallow new user signups via SMS to your project.
enable_signup = false
# If enabled, users need to confirm their phone number before signing in.
enable_confirmations = false
# Template for sending OTP to users
template = "Your code is {{ `{{ .Code }}` }}"
# Controls the minimum amount of time that must pass before sending another sms otp.
max_frequency = "5s"

# Use pre-defined map of phone number to OTP for testing.
# [auth.sms.test_otp]
# 4152127777 = "123456"

# Configure logged in session timeouts.
# [auth.sessions]
# Force log out after the specified duration.
# timebox = "24h"
# Force log out if the user has been inactive longer than the specified duration.
# inactivity_timeout = "8h"

# This hook runs before a new user is created and allows developers to reject the request based on the incoming user object.
# [auth.hook.before_user_created]
# enabled = true
# uri = "pg-functions://postgres/auth/before-user-created-hook"

# This hook runs before a token is issued and allows you to add additional claims based on the authentication method used.
# [auth.hook.custom_access_token]
# enabled = true
# uri = "pg-functions://<database>/<schema>/<hook_name>"

# Configure one of the supported SMS providers: `twilio`, `twilio_verify`, `messagebird`, `textlocal`, `vonage`.
[auth.sms.twilio]
enabled = false
account_sid = ""
message_service_sid = ""
# DO NOT commit your Twilio auth token to git. Use environment variable substitution instead:
auth_token = "env(SUPABASE_AUTH_SMS_TWILIO_AUTH_TOKEN)"

# Multi-factor-authentication is available to Supabase Pro plan.
[auth.mfa]
# Control how many MFA factors can be enrolled at once per user.
max_enrolled_factors = 10

# Control MFA via App Authenticator (TOTP)
[auth.mfa.totp]
enroll_enabled = false
verify_enabled = false

# Configure MFA via Phone Messaging
[auth.mfa.phone]
enroll_enabled = false
verify_enabled = false
otp_length = 6
template = "Your code is {{ `{{ .Code }}` }}"
max_frequency = "5s"

# Configure MFA via WebAuthn
# [auth.mfa.web_authn]
# enroll_enabled = true
# verify_enabled = true

# Use an external OAuth provider. The full list of providers are: `apple`, `azure`, `bitbucket`,
# `discord`, `facebook`, `github`, `gitlab`, `google`, `keycloak`, `linkedin_oidc`, `notion`, `twitch`,
# `twitter`, `x`, `slack`, `spotify`, `workos`, `zoom`.
[auth.external.apple]
enabled = false
client_id = ""
# DO NOT commit your OAuth provider secret to git. Use environment variable substitution instead:
secret = "env(SUPABASE_AUTH_EXTERNAL_APPLE_SECRET)"
# Overrides the default auth callback URL derived from auth.external_url.
redirect_uri = ""
# Overrides the default auth provider URL. Used to support self-hosted gitlab, single-tenant Azure,
# or any other third-party OIDC providers.
url = ""
# If enabled, the nonce check will be skipped. Required for local sign in with Google auth.
skip_nonce_check = false
# If enabled, it will allow the user to successfully authenticate when the provider does not return an email address.
email_optional = false

# Allow Solana wallet holders to sign in to your project via the Sign in with Solana (SIWS, EIP-4361) standard.
# You can configure "web3" rate limit in the [auth.rate_limit] section and set up [auth.captcha] if self-hosting.
[auth.web3.solana]
enabled = false

# Use Firebase Auth as a third-party provider alongside Supabase Auth.
[auth.third_party.firebase]
enabled = false
# project_id = "my-firebase-project"

# Use Auth0 as a third-party provider alongside Supabase Auth.
[auth.third_party.auth0]
enabled = false
# tenant = "my-auth0-tenant"
# tenant_region = "us"

# Use AWS Cognito (Amplify) as a third-party provider alongside Supabase Auth.
[auth.third_party.aws_cognito]
enabled = false
# user_pool_id = "my-user-pool-id"
# user_pool_region = "us-east-1"

# Use Clerk as a third-party provider alongside Supabase Auth.
[auth.third_party.clerk]
enabled = false
# Obtain from https://clerk.com/setup/supabase
# domain = "example.clerk.accounts.dev"

# OAuth server configuration
[auth.oauth_server]
# Enable OAuth server functionality
enabled = false
# Path for OAuth consent flow UI
authorization_url_path = "/oauth/consent"
# Allow dynamic client registration
allow_dynamic_registration = false

[edge_runtime]
enabled = true
# Supported request policies: `oneshot`, `per_worker`.
# `per_worker` (default) — enables hot reload during local development.
# `oneshot` — fallback mode if hot reload causes issues (e.g. in large repos or with symlinks).
policy = "per_worker"
# Port to attach the Chrome inspector for debugging edge functions.
inspector_port = 8083
# The Deno major version to use.
deno_version = 2

# [edge_runtime.secrets]
# secret_key = "env(SECRET_VALUE)"

[analytics]
enabled = true
port = 54327
# Configure one of the supported backends: `postgres`, `bigquery`.
backend = "postgres"

# Experimental features may be deprecated any time
[experimental]
# Configures Postgres storage engine to use OrioleDB (S3)
orioledb_version = ""
# Configures S3 bucket URL, eg. <bucket_name>.s3-<region>.amazonaws.com
s3_host = "env(S3_HOST)"
# Configures S3 bucket region, eg. us-east-1
s3_region = "env(S3_REGION)"
# Configures AWS_ACCESS_KEY_ID for S3 bucket
s3_access_key = "env(S3_ACCESS_KEY)"
# Configures AWS_SECRET_ACCESS_KEY for S3 bucket
s3_secret_key = "env(S3_SECRET_KEY)"

# pg-delta is the schema diff engine for db diff / db pull / db remote commit.
# Set enabled = false to fall back to the legacy migra engine.
[experimental.pgdelta]
enabled = true
# Directory under `supabase/` where declarative files are written.
# declarative_schema_path = "./database"
# JSON string passed through to pg-delta SQL formatting.
# format_options = "{\"keywordCase\":\"upper\",\"indent\":2,\"maxWidth\":80,\"commaStyle\":\"trailing\"}"
```

### supabase/functions/send-notifications/index.ts

```typescript
// Deno Edge Function — corre periódicamente vía Cron Job de Supabase.
// Escanea deadlines próximos/vencidos y follow-ups cumplidos de TODOS los
// usuarios (por eso usa la service role key, no la anon key), guarda
// notificaciones nuevas y manda un Web Push por cada una.
//
// Deploy: supabase functions deploy send-notifications
// Secrets necesarios (supabase secrets set NOMBRE=valor):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY
// (SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY ya vienen seteados por defecto)

import { createClient } from 'npm:@supabase/supabase-js@2'
import webPush from 'npm:web-push@3'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')!
const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')!

webPush.setVapidDetails('mailto:noreply@productividad-rpg.app', vapidPublicKey, vapidPrivateKey)

const supabase = createClient(supabaseUrl, serviceRoleKey)

type NotificationType =
  | 'upcoming'
  | 'upcoming_3d'
  | 'upcoming_1d'
  | 'due_today'
  | 'overdue'
  | 'follow_up'

interface Alert {
  user_id: string
  task_id: string
  type: NotificationType
  message: string
}

function daysBetween(deadlineIso: string, now: Date): number {
  const d = new Date(deadlineIso)
  const startOfDeadline = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((startOfDeadline.getTime() - startOfNow.getTime()) / 86_400_000)
}

Deno.serve(async () => {
  const now = new Date()
  const alerts: Alert[] = []

  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('id, user_id, title, deadline')
    .not('status', 'in', '(done,follow_up)')
    .is('parent_task_id', null)
    .not('deadline', 'is', null)
  if (tasksError) throw tasksError

  for (const task of tasks ?? []) {
    const days = daysBetween(task.deadline as string, now)
    if (days < 0) {
      alerts.push({
        user_id: task.user_id,
        task_id: task.id,
        type: 'overdue',
        message: `Por rescatar (XP extra): ${task.title}`,
      })
    } else if (days === 0) {
      alerts.push({
        user_id: task.user_id,
        task_id: task.id,
        type: 'due_today',
        message: `Vence hoy: ${task.title}`,
      })
    } else if (days === 1) {
      alerts.push({
        user_id: task.user_id,
        task_id: task.id,
        type: 'upcoming_1d',
        message: `Vence mañana: ${task.title}`,
      })
    } else if (days <= 3) {
      alerts.push({
        user_id: task.user_id,
        task_id: task.id,
        type: 'upcoming_3d',
        message: `Vence en ${days} días: ${task.title}`,
      })
    }
  }

  const { data: followUps, error: followUpsError } = await supabase
    .from('follow_ups')
    .select('user_id, task_id, stakeholder_name, next_reminder_at')
    .is('resolved_at', null)
    .lte('next_reminder_at', now.toISOString())
  if (followUpsError) throw followUpsError

  for (const followUp of followUps ?? []) {
    alerts.push({
      user_id: followUp.user_id,
      task_id: followUp.task_id,
      type: 'follow_up',
      message: followUp.stakeholder_name
        ? `Seguimiento pendiente con ${followUp.stakeholder_name}`
        : 'Seguimiento pendiente',
    })
  }

  if (alerts.length === 0) {
    return Response.json({ sent: 0, alerts: 0 })
  }

  const { data: existing } = await supabase
    .from('notifications')
    .select('task_id, type')
    .in(
      'task_id',
      alerts.map((a) => a.task_id),
    )
  const existingKeys = new Set((existing ?? []).map((n) => `${n.task_id}:${n.type}`))
  const newAlerts = alerts.filter((a) => !existingKeys.has(`${a.task_id}:${a.type}`))

  const { error: upsertError } = await supabase.from('notifications').upsert(
    alerts.map((a) => ({ ...a, scheduled_at: now.toISOString() })),
    { onConflict: 'task_id,type' },
  )
  if (upsertError) throw upsertError

  if (newAlerts.length === 0) {
    return Response.json({ sent: 0, alerts: alerts.length })
  }

  const userIds = [...new Set(newAlerts.map((a) => a.user_id))]
  const { data: subscriptions } = await supabase
    .from('push_subscriptions')
    .select('id, user_id, endpoint, p256dh, auth')
    .in('user_id', userIds)

  let sent = 0
  for (const alert of newAlerts) {
    const subsForUser = (subscriptions ?? []).filter((s) => s.user_id === alert.user_id)
    for (const sub of subsForUser) {
      try {
        await webPush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify({ title: 'Productividad RPG', body: alert.message, url: '/' }),
        )
        sent++
      } catch (err) {
        const statusCode = (err as { statusCode?: number }).statusCode
        if (statusCode === 404 || statusCode === 410) {
          await supabase.from('push_subscriptions').delete().eq('id', sub.id)
        }
      }
    }
  }

  return Response.json({ sent, alerts: alerts.length, newAlerts: newAlerts.length })
})
```

### supabase/migrations/20260724202801_fase1_schema.sql

```sql
-- Fase 1: categories, projects, kanban_columns, tasks
-- Gamification (class_ranks, user_category_xp, quests, streaks, loot),
-- follow_ups y notifications quedan para fases posteriores del roadmap.

-- ============================================================
-- categories
-- Tabla de referencia fija (seed), compartida por todos los usuarios.
-- No lleva user_id: es de solo lectura para cualquier usuario autenticado.
-- "order" es palabra reservada en SQL, se usa "position" en su lugar.
-- ============================================================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color_hex text not null,
  icon_name text not null,
  class_name text not null,
  position integer not null,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "categories_select_authenticated"
  on public.categories for select
  to authenticated
  using (true);

insert into public.categories (name, color_hex, icon_name, class_name, position) values
  ('Concentrix', '#7c3aed', 'brain',      'Nigromante', 1),
  ('Delorean',   '#ea580c', 'car',        'Bárbaro',    2),
  ('Estudios',   '#2563eb', 'book-open',  'Mago',       3),
  ('Hobbies',    '#db2777', 'gamepad-2',  'Pícaro',     4),
  ('Personal',   '#059669', 'heart',      'Clérigo',    5),
  ('Hogar',      '#b45309', 'home',       'Druida',     6);

-- ============================================================
-- projects
-- ============================================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete restrict,
  name text not null,
  description text,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now()
);

create index projects_user_id_idx on public.projects (user_id);

alter table public.projects enable row level security;

create policy "projects_all_own_rows"
  on public.projects for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- kanban_columns
-- project_id nulo = columnas del tablero global "Tareas sueltas" del usuario.
-- ============================================================
create table public.kanban_columns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete cascade,
  name text not null,
  position integer not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index kanban_columns_user_id_idx on public.kanban_columns (user_id);
create index kanban_columns_project_id_idx on public.kanban_columns (project_id);

alter table public.kanban_columns enable row level security;

create policy "kanban_columns_all_own_rows"
  on public.kanban_columns for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- tasks
-- Regla de deadline: obligatorio salvo que sea un item de inbox sin triar
-- (parent_task_id null y kanban_column_id null). Las subtareas siempre
-- requieren deadline. Misma lógica para category_id, salvo que las
-- subtareas quedan exentas (heredan la categoría de la tarea padre).
-- ============================================================
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  parent_task_id uuid references public.tasks (id) on delete cascade,
  kanban_column_id uuid references public.kanban_columns (id) on delete set null,
  category_id uuid references public.categories (id) on delete set null,
  title text not null,
  description text,
  deadline timestamptz,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'done')),
  created_at timestamptz not null default now(),
  completed_at timestamptz,

  constraint deadline_required_once_triaged check (
    deadline is not null or (parent_task_id is null and kanban_column_id is null)
  ),
  constraint category_required_once_triaged check (
    category_id is not null or parent_task_id is not null or kanban_column_id is null
  )
);

create index tasks_user_id_idx on public.tasks (user_id);
create index tasks_project_id_idx on public.tasks (project_id);
create index tasks_kanban_column_id_idx on public.tasks (kanban_column_id);
create index tasks_parent_task_id_idx on public.tasks (parent_task_id);
create index tasks_deadline_idx on public.tasks (deadline);

alter table public.tasks enable row level security;

create policy "tasks_all_own_rows"
  on public.tasks for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- Triggers
-- ============================================================

-- Seed de columnas default del tablero global "Tareas sueltas" para cada
-- usuario nuevo.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.kanban_columns (user_id, project_id, name, position, is_default)
  values
    (new.id, null, 'Por hacer', 1, true),
    (new.id, null, 'En progreso', 2, true),
    (new.id, null, 'Hecho', 3, true);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seed de columnas default para cada proyecto nuevo.
create function public.handle_new_project()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  insert into public.kanban_columns (user_id, project_id, name, position, is_default)
  values
    (new.user_id, new.id, 'Por hacer', 1, true),
    (new.user_id, new.id, 'En progreso', 2, true),
    (new.user_id, new.id, 'Hecho', 3, true);
  return new;
end;
$$;

create trigger on_project_created
  after insert on public.projects
  for each row execute function public.handle_new_project();

-- Validación cruzada de deadlines padre/subtarea (padre >= última subtarea)
-- y bookkeeping de completed_at según status.
create function public.tasks_before_write()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.parent_task_id is not null and new.deadline is not null then
    if exists (
      select 1 from public.tasks
      where id = new.parent_task_id
        and deadline is not null
        and deadline < new.deadline
    ) then
      raise exception 'El deadline de la subtarea no puede ser posterior al de la tarea padre';
    end if;
  end if;

  if tg_op = 'UPDATE' and new.deadline is not null
     and new.deadline is distinct from old.deadline then
    if exists (
      select 1 from public.tasks
      where parent_task_id = new.id
        and deadline is not null
        and deadline > new.deadline
    ) then
      raise exception 'El deadline de la tarea no puede ser anterior al de alguna de sus subtareas';
    end if;
  end if;

  if new.status = 'done' and (tg_op = 'INSERT' or old.status is distinct from 'done') then
    new.completed_at := now();
  elsif new.status <> 'done' then
    new.completed_at := null;
  end if;

  return new;
end;
$$;

create trigger tasks_before_write
  before insert or update on public.tasks
  for each row execute function public.tasks_before_write();
```

### supabase/migrations/20260724223606_fase2_gamification.sql

```sql
-- Fase 2: gamification core (XP/nivel por categoría, insignia fija por clase,
-- streaks + escudos, quests diarias y semanal automática por proyecto).
-- class_ranks y el árbol de 4 rangos por clase quedan para Fase 3.

-- ============================================================
-- tasks: tamaño (determina xp_reward) — opcional, sin fricción obligatoria.
-- Solo las tareas de nivel superior (sin parent_task_id) otorgan XP.
-- ============================================================
alter table public.tasks
  add column size text check (size in ('small', 'medium', 'large')),
  add column xp_reward integer not null default 0;

create function public.tasks_set_xp_reward()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.xp_reward := case
    when new.parent_task_id is not null then 0
    when new.size = 'small' then 10
    when new.size = 'medium' then 25
    when new.size = 'large' then 50
    else 0
  end;
  return new;
end;
$$;

create trigger tasks_set_xp_reward
  before insert or update of size, parent_task_id on public.tasks
  for each row execute function public.tasks_set_xp_reward();

-- ============================================================
-- user_category_xp
-- Nivel = 1 + floor(xp / 100). El "1 rango visual por clase" de Fase 2 es
-- una insignia fija (icon_name de categories) sin árbol de rangos todavía;
-- class_ranks / current_rank_id llegan en Fase 3.
-- ============================================================
create table public.user_category_xp (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  current_xp integer not null default 0,
  current_level integer not null default 1,
  unique (user_id, category_id)
);

alter table public.user_category_xp enable row level security;

create policy "user_category_xp_all_own_rows"
  on public.user_category_xp for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- streaks
-- Una fila por usuario. Escudo cada 7 días de racha activa (tope 3),
-- se consume automáticamente para cubrir un único día sin actividad.
-- ============================================================
create table public.streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade unique,
  current_streak_days integer not null default 0,
  longest_streak integer not null default 0,
  shields_available integer not null default 0,
  last_active_date date,
  created_at timestamptz not null default now()
);

alter table public.streaks enable row level security;

create policy "streaks_all_own_rows"
  on public.streaks for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create function public.register_daily_activity(p_user_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_last date;
  v_current integer;
  v_longest integer;
  v_shields integer;
begin
  select last_active_date, current_streak_days, longest_streak, shields_available
    into v_last, v_current, v_longest, v_shields
    from public.streaks
    where user_id = p_user_id;

  if v_last = current_date then
    return;
  elsif v_last = current_date - 1 then
    v_current := v_current + 1;
  elsif v_last = current_date - 2 and v_shields > 0 then
    v_current := v_current + 1;
    v_shields := v_shields - 1;
  else
    v_current := 1;
  end if;

  if v_current % 7 = 0 then
    v_shields := least(v_shields + 1, 3);
  end if;

  update public.streaks
    set current_streak_days = v_current,
        longest_streak = greatest(v_longest, v_current),
        shields_available = v_shields,
        last_active_date = current_date
    where user_id = p_user_id;
end;
$$;

-- ============================================================
-- quests
-- type: 'daily_triage' | 'daily_priority' | 'weekly_project'.
-- period_start: el día (diarias) o el lunes de la semana (semanal).
-- daily_priority.task_id = la tarea marcada con la estrella de "hoy".
-- weekly_project se genera sola cuando se completan todas las tareas de
-- un proyecto con deadline esa semana; no hay creación manual en Fase 2.
-- ============================================================
create table public.quests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  type text not null check (type in ('daily_triage', 'daily_priority', 'weekly_project')),
  period_start date not null,
  project_id uuid references public.projects (id) on delete cascade,
  task_id uuid references public.tasks (id) on delete set null,
  xp_reward integer not null default 0,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index quests_daily_unique_idx
  on public.quests (user_id, type, period_start)
  where project_id is null;

create unique index quests_weekly_unique_idx
  on public.quests (user_id, type, period_start, project_id)
  where project_id is not null;

create index quests_user_period_idx on public.quests (user_id, period_start);

alter table public.quests enable row level security;

create policy "quests_all_own_rows"
  on public.quests for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- Seed de user_category_xp y streaks para usuarios nuevos.
-- ============================================================
create function public.handle_new_user_gamification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_category_xp (user_id, category_id)
  select new.id, id from public.categories;

  insert into public.streaks (user_id) values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created_gamification
  after insert on auth.users
  for each row execute function public.handle_new_user_gamification();

-- ============================================================
-- Efectos al completar una tarea: XP, racha, quest de prioridad del día
-- y quest semanal automática por proyecto.
-- ============================================================
create function public.tasks_after_done()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_week_start date;
  v_project_total integer;
  v_project_done integer;
  v_project_category_id uuid;
begin
  if not (new.status = 'done' and old.status is distinct from 'done') then
    return new;
  end if;

  perform public.register_daily_activity(new.user_id);

  if new.parent_task_id is not null then
    return new;
  end if;

  if new.category_id is not null and new.xp_reward > 0 then
    insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
    values (new.user_id, new.category_id, new.xp_reward, 1 + floor(new.xp_reward / 100.0))
    on conflict (user_id, category_id) do update
      set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
          current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
  end if;

  if exists (
    select 1 from public.quests
    where user_id = new.user_id
      and type = 'daily_priority'
      and period_start = current_date
      and task_id = new.id
      and completed = false
  ) then
    update public.quests
      set completed = true, completed_at = now()
      where user_id = new.user_id
        and type = 'daily_priority'
        and period_start = current_date
        and task_id = new.id;

    if new.category_id is not null then
      update public.user_category_xp
        set current_xp = current_xp + 20,
            current_level = 1 + floor((current_xp + 20) / 100.0)
        where user_id = new.user_id and category_id = new.category_id;
    end if;
  end if;

  if new.project_id is not null and new.deadline is not null then
    v_week_start := date_trunc('week', new.deadline::date)::date;

    select count(*), count(*) filter (where status = 'done')
      into v_project_total, v_project_done
      from public.tasks
      where project_id = new.project_id
        and parent_task_id is null
        and deadline is not null
        and deadline::date >= v_week_start
        and deadline::date < v_week_start + 7;

    if v_project_total > 0 and v_project_total = v_project_done and not exists (
      select 1 from public.quests
      where user_id = new.user_id
        and type = 'weekly_project'
        and period_start = v_week_start
        and project_id = new.project_id
        and completed = true
    ) then
      insert into public.quests (user_id, type, period_start, project_id, xp_reward, completed, completed_at)
      values (new.user_id, 'weekly_project', v_week_start, new.project_id, 50, true, now())
      on conflict (user_id, type, period_start, project_id) where project_id is not null
      do update set completed = true, completed_at = now();

      select category_id into v_project_category_id from public.projects where id = new.project_id;

      if v_project_category_id is not null then
        insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
        values (new.user_id, v_project_category_id, 50, 1 + floor(50 / 100.0))
        on conflict (user_id, category_id) do update
          set current_xp = public.user_category_xp.current_xp + 50,
              current_level = 1 + floor((public.user_category_xp.current_xp + 50) / 100.0);
      end if;
    end if;
  end if;

  return new;
end;
$$;

create trigger tasks_after_done
  after update of status on public.tasks
  for each row execute function public.tasks_after_done();

-- ============================================================
-- Quest de triage diario: se completa sola cuando el inbox llega a 0
-- justo después de triar un item.
-- ============================================================
create function public.tasks_after_triage()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_remaining_inbox integer;
begin
  if new.kanban_column_id is null or old.kanban_column_id is not null then
    return new;
  end if;

  select count(*) into v_remaining_inbox
    from public.tasks
    where user_id = new.user_id and parent_task_id is null and kanban_column_id is null;

  if v_remaining_inbox = 0 and not exists (
    select 1 from public.quests
    where user_id = new.user_id
      and type = 'daily_triage'
      and period_start = current_date
      and completed = true
  ) then
    insert into public.quests (user_id, type, period_start, xp_reward, completed, completed_at)
    values (new.user_id, 'daily_triage', current_date, 15, true, now())
    on conflict (user_id, type, period_start) where project_id is null do nothing;

    perform public.register_daily_activity(new.user_id);
  end if;

  return new;
end;
$$;

create trigger tasks_after_triage
  after update of kanban_column_id on public.tasks
  for each row execute function public.tasks_after_triage();
```

### supabase/migrations/20260724230130_fase3_ranks_loot.sql

```sql
-- Fase 3: árbol de 4 rangos x 6 clases, sistema de loot.
-- Las columnas kanban custom no necesitan migración: el schema de Fase 1
-- (kanban_columns con is_default/position) ya alcanza, es trabajo de cliente.

-- ============================================================
-- class_ranks
-- Tabla de referencia fija (seed), igual que categories: de solo lectura.
-- Umbrales de XP elegidos para que el rango 4 (máximo) quede en línea con
-- unos ~20 niveles de progreso (nivel = 1 + floor(xp/100)).
-- icon_name acá es la insignia que se superpone sobre el ícono de la
-- categoría al subir de rango (null en el rango 1, sin insignia todavía).
-- ============================================================
create table public.class_ranks (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete cascade,
  rank_order integer not null check (rank_order between 1 and 4),
  rank_name text not null,
  xp_threshold integer not null,
  icon_name text,
  unique (category_id, rank_order)
);

alter table public.class_ranks enable row level security;

create policy "class_ranks_select_authenticated"
  on public.class_ranks for select
  to authenticated
  using (true);

insert into public.class_ranks (category_id, rank_order, rank_name, xp_threshold, icon_name)
select id, 1, 'Aprendiz', 0, null from public.categories where name = 'Concentrix'
union all select id, 2, 'Invocador', 300, 'chevron-up' from public.categories where name = 'Concentrix'
union all select id, 3, 'Señor de las sombras', 800, 'flame' from public.categories where name = 'Concentrix'
union all select id, 4, 'Archinigromante', 2000, 'crown' from public.categories where name = 'Concentrix'
union all select id, 1, 'Novato', 0, null from public.categories where name = 'Delorean'
union all select id, 2, 'Guerrero', 300, 'chevron-up' from public.categories where name = 'Delorean'
union all select id, 3, 'Berserker', 800, 'flame' from public.categories where name = 'Delorean'
union all select id, 4, 'Señor de la guerra', 2000, 'crown' from public.categories where name = 'Delorean'
union all select id, 1, 'Iniciado', 0, null from public.categories where name = 'Estudios'
union all select id, 2, 'Erudito', 300, 'chevron-up' from public.categories where name = 'Estudios'
union all select id, 3, 'Arcanista', 800, 'flame' from public.categories where name = 'Estudios'
union all select id, 4, 'Archimago', 2000, 'crown' from public.categories where name = 'Estudios'
union all select id, 1, 'Aprendiz', 0, null from public.categories where name = 'Hobbies'
union all select id, 2, 'Trotamundos', 300, 'chevron-up' from public.categories where name = 'Hobbies'
union all select id, 3, 'Maestro de sombras', 800, 'flame' from public.categories where name = 'Hobbies'
union all select id, 4, 'Leyenda', 2000, 'crown' from public.categories where name = 'Hobbies'
union all select id, 1, 'Novicio', 0, null from public.categories where name = 'Personal'
union all select id, 2, 'Sanador', 300, 'chevron-up' from public.categories where name = 'Personal'
union all select id, 3, 'Paladín', 800, 'flame' from public.categories where name = 'Personal'
union all select id, 4, 'Sumo sacerdote', 2000, 'crown' from public.categories where name = 'Personal'
union all select id, 1, 'Aprendiz', 0, null from public.categories where name = 'Hogar'
union all select id, 2, 'Guardabosques', 300, 'chevron-up' from public.categories where name = 'Hogar'
union all select id, 3, 'Druida ancestral', 800, 'flame' from public.categories where name = 'Hogar'
union all select id, 4, 'Avatar de la naturaleza', 2000, 'crown' from public.categories where name = 'Hogar';

-- ============================================================
-- user_category_xp: current_rank_id + trigger que lo mantiene al día
-- según current_xp.
-- ============================================================
alter table public.user_category_xp
  add column current_rank_id uuid references public.class_ranks (id);

create function public.set_current_rank()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  select id into new.current_rank_id
    from public.class_ranks
    where category_id = new.category_id and xp_threshold <= new.current_xp
    order by rank_order desc
    limit 1;
  return new;
end;
$$;

create trigger user_category_xp_set_rank
  before insert or update of current_xp on public.user_category_xp
  for each row execute function public.set_current_rank();

-- ============================================================
-- loot_definitions: catálogo fijo de insignias desbloqueables (seed).
-- loot: qué insignias desbloqueó cada usuario y cuándo.
-- Se separan en dos tablas (el documento las describe como una sola) para
-- poder mostrar insignias "bloqueadas" en la UI sin inventar una fila por
-- usuario para cada una desde el principio.
-- ============================================================
create table public.loot_definitions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  icon_name text not null,
  category_id uuid references public.categories (id) on delete cascade,
  trigger_type text not null check (trigger_type in ('streak', 'quest_complete', 'level_up', 'rank_up')),
  trigger_value integer
);

alter table public.loot_definitions enable row level security;

create policy "loot_definitions_select_authenticated"
  on public.loot_definitions for select
  to authenticated
  using (true);

create table public.loot (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  loot_definition_id uuid not null references public.loot_definitions (id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique (user_id, loot_definition_id)
);

alter table public.loot enable row level security;

create policy "loot_all_own_rows"
  on public.loot for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

insert into public.loot_definitions (slug, name, description, icon_name, trigger_type, trigger_value) values
  ('streak_7', 'Racha de una semana', '7 días seguidos de actividad.', 'flame', 'streak', 7),
  ('streak_30', 'Racha de un mes', '30 días seguidos de actividad.', 'flame', 'streak', 30),
  ('streak_100', 'Racha centenaria', '100 días seguidos de actividad.', 'flame', 'streak', 100),
  ('quest_first', 'Primera quest cumplida', 'Completaste tu primera quest.', 'sparkles', 'quest_complete', 1),
  ('quest_10', 'Cazador de quests', '10 quests completadas en total.', 'sparkles', 'quest_complete', 10),
  ('level_5_any', 'Primer ascenso', 'Nivel 5 en alguna categoría.', 'trending-up', 'level_up', 5),
  ('level_10_any', 'En racha de crecimiento', 'Nivel 10 en alguna categoría.', 'trending-up', 'level_up', 10);

insert into public.loot_definitions (slug, name, description, icon_name, category_id, trigger_type, trigger_value)
select 'rank4_' || c.id::text, 'Maestría: ' || c.class_name, 'Rango máximo en ' || c.name || '.', 'crown', c.id, 'rank_up', 4
from public.categories c;

-- ============================================================
-- Otorgamiento de loot (idempotente vía unique(user_id, loot_definition_id)).
-- ============================================================
create function public.grant_loot(p_user_id uuid, p_slug text)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_def_id uuid;
begin
  select id into v_def_id from public.loot_definitions where slug = p_slug;
  if v_def_id is not null then
    insert into public.loot (user_id, loot_definition_id)
    values (p_user_id, v_def_id)
    on conflict (user_id, loot_definition_id) do nothing;
  end if;
end;
$$;

create function public.check_quest_loot(p_user_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_count integer;
begin
  select count(*) into v_count from public.quests where user_id = p_user_id and completed = true;
  if v_count >= 1 then perform public.grant_loot(p_user_id, 'quest_first'); end if;
  if v_count >= 10 then perform public.grant_loot(p_user_id, 'quest_10'); end if;
end;
$$;

create function public.check_rank_loot(p_user_id uuid, p_category_id uuid, p_rank_order integer)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_def_id uuid;
begin
  if p_rank_order < 4 then
    return;
  end if;

  select id into v_def_id from public.loot_definitions
    where category_id = p_category_id and trigger_type = 'rank_up';

  if v_def_id is not null then
    insert into public.loot (user_id, loot_definition_id)
    values (p_user_id, v_def_id)
    on conflict (user_id, loot_definition_id) do nothing;
  end if;
end;
$$;

-- register_daily_activity ya existe desde Fase 2: se reemplaza para sumarle
-- el chequeo de loot por racha, sin duplicar la lógica de streaks/escudos.
create or replace function public.register_daily_activity(p_user_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_last date;
  v_current integer;
  v_longest integer;
  v_shields integer;
begin
  select last_active_date, current_streak_days, longest_streak, shields_available
    into v_last, v_current, v_longest, v_shields
    from public.streaks
    where user_id = p_user_id;

  if v_last = current_date then
    return;
  elsif v_last = current_date - 1 then
    v_current := v_current + 1;
  elsif v_last = current_date - 2 and v_shields > 0 then
    v_current := v_current + 1;
    v_shields := v_shields - 1;
  else
    v_current := 1;
  end if;

  if v_current % 7 = 0 then
    v_shields := least(v_shields + 1, 3);
  end if;

  update public.streaks
    set current_streak_days = v_current,
        longest_streak = greatest(v_longest, v_current),
        shields_available = v_shields,
        last_active_date = current_date
    where user_id = p_user_id;

  if v_current >= 7 then perform public.grant_loot(p_user_id, 'streak_7'); end if;
  if v_current >= 30 then perform public.grant_loot(p_user_id, 'streak_30'); end if;
  if v_current >= 100 then perform public.grant_loot(p_user_id, 'streak_100'); end if;
end;
$$;

create function public.user_category_xp_after_update()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_rank_order integer;
begin
  if new.current_level >= 5 then perform public.grant_loot(new.user_id, 'level_5_any'); end if;
  if new.current_level >= 10 then perform public.grant_loot(new.user_id, 'level_10_any'); end if;

  if new.current_rank_id is not null and old.current_rank_id is distinct from new.current_rank_id then
    select rank_order into v_rank_order from public.class_ranks where id = new.current_rank_id;
    perform public.check_rank_loot(new.user_id, new.category_id, v_rank_order);
  end if;

  return new;
end;
$$;

create trigger user_category_xp_after_update
  after update of current_level, current_rank_id on public.user_category_xp
  for each row execute function public.user_category_xp_after_update();

-- tasks_after_done y tasks_after_triage (Fase 2) marcan quests como
-- completed = true en tres puntos distintos; se reemplazan para sumar el
-- chequeo de loot por cantidad de quests ahí mismo.
create or replace function public.tasks_after_done()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_week_start date;
  v_project_total integer;
  v_project_done integer;
  v_project_category_id uuid;
begin
  if not (new.status = 'done' and old.status is distinct from 'done') then
    return new;
  end if;

  perform public.register_daily_activity(new.user_id);

  if new.parent_task_id is not null then
    return new;
  end if;

  if new.category_id is not null and new.xp_reward > 0 then
    insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
    values (new.user_id, new.category_id, new.xp_reward, 1 + floor(new.xp_reward / 100.0))
    on conflict (user_id, category_id) do update
      set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
          current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
  end if;

  if exists (
    select 1 from public.quests
    where user_id = new.user_id
      and type = 'daily_priority'
      and period_start = current_date
      and task_id = new.id
      and completed = false
  ) then
    update public.quests
      set completed = true, completed_at = now()
      where user_id = new.user_id
        and type = 'daily_priority'
        and period_start = current_date
        and task_id = new.id;

    if new.category_id is not null then
      update public.user_category_xp
        set current_xp = current_xp + 20,
            current_level = 1 + floor((current_xp + 20) / 100.0)
        where user_id = new.user_id and category_id = new.category_id;
    end if;

    perform public.check_quest_loot(new.user_id);
  end if;

  if new.project_id is not null and new.deadline is not null then
    v_week_start := date_trunc('week', new.deadline::date)::date;

    select count(*), count(*) filter (where status = 'done')
      into v_project_total, v_project_done
      from public.tasks
      where project_id = new.project_id
        and parent_task_id is null
        and deadline is not null
        and deadline::date >= v_week_start
        and deadline::date < v_week_start + 7;

    if v_project_total > 0 and v_project_total = v_project_done and not exists (
      select 1 from public.quests
      where user_id = new.user_id
        and type = 'weekly_project'
        and period_start = v_week_start
        and project_id = new.project_id
        and completed = true
    ) then
      insert into public.quests (user_id, type, period_start, project_id, xp_reward, completed, completed_at)
      values (new.user_id, 'weekly_project', v_week_start, new.project_id, 50, true, now())
      on conflict (user_id, type, period_start, project_id) where project_id is not null
      do update set completed = true, completed_at = now();

      select category_id into v_project_category_id from public.projects where id = new.project_id;

      if v_project_category_id is not null then
        insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
        values (new.user_id, v_project_category_id, 50, 1 + floor(50 / 100.0))
        on conflict (user_id, category_id) do update
          set current_xp = public.user_category_xp.current_xp + 50,
              current_level = 1 + floor((public.user_category_xp.current_xp + 50) / 100.0);
      end if;

      perform public.check_quest_loot(new.user_id);
    end if;
  end if;

  return new;
end;
$$;

create or replace function public.tasks_after_triage()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_remaining_inbox integer;
begin
  if new.kanban_column_id is null or old.kanban_column_id is not null then
    return new;
  end if;

  select count(*) into v_remaining_inbox
    from public.tasks
    where user_id = new.user_id and parent_task_id is null and kanban_column_id is null;

  if v_remaining_inbox = 0 and not exists (
    select 1 from public.quests
    where user_id = new.user_id
      and type = 'daily_triage'
      and period_start = current_date
      and completed = true
  ) then
    insert into public.quests (user_id, type, period_start, xp_reward, completed, completed_at)
    values (new.user_id, 'daily_triage', current_date, 15, true, now())
    on conflict (user_id, type, period_start) where project_id is null do nothing;

    perform public.register_daily_activity(new.user_id);
    perform public.check_quest_loot(new.user_id);
  end if;

  return new;
end;
$$;
```

### supabase/migrations/20260725000448_fase4_followups_notifications.sql

```sql
-- Fase 4: follow-ups recurrentes + centro de notificaciones in-app.
-- Sin entrega push todavía (necesita el Service Worker de Fase 5): las
-- notificaciones se calculan y se guardan desde el cliente cada vez que
-- abre la app, no vía pg_cron/Edge Function. La columna "sent" del
-- documento no aplica sin push real; se agrega cuando exista entrega.

-- ============================================================
-- follow_ups
-- Relación 1:1 con tasks (una tarea tiene a lo sumo un follow-up activo).
-- next_reminder_at se recalcula solo vía trigger cuando cambia
-- last_contacted_at o interval_days (p.ej. al "registrar contacto").
-- ============================================================
create table public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  task_id uuid not null references public.tasks (id) on delete cascade,
  stakeholder_name text,
  interval_days integer not null check (interval_days > 0),
  last_contacted_at timestamptz not null default now(),
  next_reminder_at timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now(),
  unique (task_id)
);

create index follow_ups_next_reminder_idx on public.follow_ups (next_reminder_at);

alter table public.follow_ups enable row level security;

create policy "follow_ups_all_own_rows"
  on public.follow_ups for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create function public.follow_ups_set_next_reminder()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.next_reminder_at := new.last_contacted_at + (new.interval_days || ' days')::interval;
  return new;
end;
$$;

create trigger follow_ups_set_next_reminder
  before insert or update of last_contacted_at, interval_days on public.follow_ups
  for each row execute function public.follow_ups_set_next_reminder();

-- ============================================================
-- notifications
-- Generadas/actualizadas desde el cliente (ver sync en la app), no por un
-- job en el servidor. unique(task_id, type) evita duplicar la misma
-- alerta; dismissed_at se preserva entre syncs (el cliente nunca lo pisa).
-- ============================================================
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  task_id uuid not null references public.tasks (id) on delete cascade,
  type text not null check (type in ('upcoming', 'due_today', 'overdue', 'follow_up')),
  message text not null,
  scheduled_at timestamptz not null default now(),
  dismissed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (task_id, type)
);

create index notifications_user_dismissed_idx on public.notifications (user_id, dismissed_at);

alter table public.notifications enable row level security;

create policy "notifications_all_own_rows"
  on public.notifications for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### supabase/migrations/20260725010828_fase5_push_subscriptions.sql

```sql
-- Fase 5: suscripciones a Web Push. La Edge Function que envía los push
-- (deployada aparte, ver supabase/functions/send-notifications) usa
-- service_role y por lo tanto no depende de estas políticas para leer,
-- pero igual se deja RLS activo para que el usuario gestione sus propias
-- suscripciones desde el cliente (alta al activar push, baja al desactivar).
create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

create index push_subscriptions_user_id_idx on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;

create policy "push_subscriptions_all_own_rows"
  on public.push_subscriptions for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### supabase/migrations/20260725230823_fase6_subtask_xp_and_followup_status.sql

```sql
-- Fase 6 (Cambios menores de Experiencia):
-- 1) Las subtareas ahora otorgan XP: 1/10 del xp_reward de la tarea padre
--    (redondeado), en vez de 0. Fomenta partir tareas grandes en pasos chicos
--    sin perder el incentivo de XP.
-- 2) Se agrega 'follow_up' como status válido de tasks: al "Enviar a
--    Follow-up" desde el Kanban, la tarea sale de la vista activa del
--    tablero (deja de generar presión de deadline) pero se mantiene viva
--    para seguimiento en la página de Follow-ups.

-- ============================================================
-- tasks.status: sumar 'follow_up' al check constraint existente.
-- ============================================================
alter table public.tasks
  drop constraint tasks_status_check;

alter table public.tasks
  add constraint tasks_status_check
  check (status in ('pending', 'in_progress', 'done', 'follow_up'));

-- ============================================================
-- tasks_set_xp_reward: las subtareas ya no fuerzan xp_reward = 0.
-- Ahora heredan 1/10 (redondeado) del xp_reward actual de su tarea padre.
-- Nota: si el tamaño de la tarea padre cambia después de crear la subtarea,
-- el xp_reward de la subtarea no se recalcula solo — habría que reguardarla.
-- ============================================================
create or replace function public.tasks_set_xp_reward()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_parent_xp integer;
begin
  if new.parent_task_id is not null then
    select xp_reward into v_parent_xp from public.tasks where id = new.parent_task_id;
    new.xp_reward := round(coalesce(v_parent_xp, 0) / 10.0);
  else
    new.xp_reward := case
      when new.size = 'small' then 10
      when new.size = 'medium' then 25
      when new.size = 'large' then 50
      else 0
    end;
  end if;
  return new;
end;
$$;

-- ============================================================
-- tasks_after_done: las subtareas ahora sí otorgan XP a la categoría de su
-- tarea padre al completarse (antes se ignoraban por completo). No disparan
-- quest de prioridad del día ni quest semanal — esas siguen siendo solo de
-- tareas de nivel superior.
-- ============================================================
create or replace function public.tasks_after_done()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_week_start date;
  v_project_total integer;
  v_project_done integer;
  v_project_category_id uuid;
  v_parent_category_id uuid;
begin
  if not (new.status = 'done' and old.status is distinct from 'done') then
    return new;
  end if;

  perform public.register_daily_activity(new.user_id);

  if new.parent_task_id is not null then
    if new.xp_reward > 0 then
      select category_id into v_parent_category_id
        from public.tasks where id = new.parent_task_id;

      if v_parent_category_id is not null then
        insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
        values (new.user_id, v_parent_category_id, new.xp_reward, 1 + floor(new.xp_reward / 100.0))
        on conflict (user_id, category_id) do update
          set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
              current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
      end if;
    end if;
    return new;
  end if;

  if new.category_id is not null and new.xp_reward > 0 then
    insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
    values (new.user_id, new.category_id, new.xp_reward, 1 + floor(new.xp_reward / 100.0))
    on conflict (user_id, category_id) do update
      set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
          current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
  end if;

  if exists (
    select 1 from public.quests
    where user_id = new.user_id
      and type = 'daily_priority'
      and period_start = current_date
      and task_id = new.id
      and completed = false
  ) then
    update public.quests
      set completed = true, completed_at = now()
      where user_id = new.user_id
        and type = 'daily_priority'
        and period_start = current_date
        and task_id = new.id;

    if new.category_id is not null then
      update public.user_category_xp
        set current_xp = current_xp + 20,
            current_level = 1 + floor((current_xp + 20) / 100.0)
        where user_id = new.user_id and category_id = new.category_id;
    end if;
  end if;

  if new.project_id is not null and new.deadline is not null then
    v_week_start := date_trunc('week', new.deadline::date)::date;

    select count(*), count(*) filter (where status = 'done')
      into v_project_total, v_project_done
      from public.tasks
      where project_id = new.project_id
        and parent_task_id is null
        and deadline is not null
        and deadline::date >= v_week_start
        and deadline::date < v_week_start + 7;

    if v_project_total > 0 and v_project_total = v_project_done and not exists (
      select 1 from public.quests
      where user_id = new.user_id
        and type = 'weekly_project'
        and period_start = v_week_start
        and project_id = new.project_id
        and completed = true
    ) then
      insert into public.quests (user_id, type, period_start, project_id, xp_reward, completed, completed_at)
      values (new.user_id, 'weekly_project', v_week_start, new.project_id, 50, true, now())
      on conflict (user_id, type, period_start, project_id) where project_id is not null
      do update set completed = true, completed_at = now();

      select category_id into v_project_category_id from public.projects where id = new.project_id;

      if v_project_category_id is not null then
        insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
        values (new.user_id, v_project_category_id, 50, 1 + floor(50 / 100.0))
        on conflict (user_id, category_id) do update
          set current_xp = public.user_category_xp.current_xp + 50,
              current_level = 1 + floor((public.user_category_xp.current_xp + 50) / 100.0);
      end if;
    end if;
  end if;

  return new;
end;
$$;
```

### supabase/migrations/20260726000001_fase7_battle_hud_slots.sql

```sql
-- Fase 7 — Módulo 1 "The Battle HUD" (spec de Gemini, v1.1 ajustada tras ida
-- y vuelta sobre el status 'follow_up'):
-- Agrega hud_slot (1-3) para las tareas "equipadas" en el Dashboard de
-- Enfrentamiento. Tanto 'done' como 'follow_up' quedan excluidas del índice
-- único — un slot ocupado por una tarea que pasa a cualquiera de esos dos
-- estados debe quedar disponible de inmediato para equipar otra misión.

alter table public.tasks
  add column if not exists hud_slot integer check (hud_slot between 1 and 3);

create unique index if not exists idx_unique_user_hud_slot
  on public.tasks (user_id, hud_slot)
  where hud_slot is not null and status not in ('done', 'follow_up');
```

### supabase/migrations/20260726000002_fase7_dungeon_bosses.sql

```sql
-- Fase 7 — Módulo 2 "Dungeon Bosses & Epic Raids" (spec de Gemini).
--
-- Desviaciones deliberadas respecto a la spec original, explicadas al usuario
-- antes de implementar (no son cambios de diseño, son correcciones de cómo
-- construirlo de forma segura/consistente con el resto del esquema):
--
-- 1. NO se crea `get_project_boss_stats`: la spec la marcaba
--    `SECURITY DEFINER` sin filtrar por user_id, lo que permitiría a
--    cualquier usuario autenticado leer el HP de un proyecto ajeno (ningún
--    otro objeto de este esquema usa DEFINER para lógica de negocio, solo
--    para los triggers de seed en creación de cuenta). El HP se calcula en
--    el cliente a partir de una query normal de `tasks` — ya protegida por
--    la RLS existente — igual que ya hace ProgressPage con projects.
-- 2. Se agrega `claim_boss_phase` como función real (no lo hace el cliente):
--    la spec pedía que el cliente otorgue el bonus de XP directamente, lo
--    cual contradice la regla ya establecida desde Fase 2 de que toda la
--    lógica de XP vive en Postgres, nunca en el cliente (evita
--    desincronización y reclamos repetidos). Valida server-side que la fase
--    realmente se alcanzó antes de otorgar nada, y es idempotente.

alter table public.projects
  add column if not exists boss_avatar text not null default 'dragon_default',
  add column if not exists boss_title text not null default 'Señor del Caos',
  add column if not exists phases_claimed integer[] not null default '{}';

create or replace function public.claim_boss_phase(p_project_id uuid, p_phase integer)
returns public.projects
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_project public.projects;
  v_total integer;
  v_done integer;
  v_percent numeric;
  v_xp integer;
begin
  if p_phase not in (75, 50, 25, 0) then
    raise exception 'Fase inválida: %', p_phase;
  end if;

  select * into v_project from public.projects where id = p_project_id;
  if v_project.id is null then
    raise exception 'Proyecto no encontrado';
  end if;

  -- Idempotente: si ya se reclamó esta fase, no vuelve a otorgar XP.
  if p_phase = any(v_project.phases_claimed) then
    return v_project;
  end if;

  select
    coalesce(sum(case when size = 'small' then 10 when size = 'medium' then 25 when size = 'large' then 50 else 10 end), 0),
    coalesce(sum(case when status = 'done' then
      (case when size = 'small' then 10 when size = 'medium' then 25 when size = 'large' then 50 else 10 end)
      else 0 end), 0)
    into v_total, v_done
    from public.tasks
    where project_id = p_project_id and parent_task_id is null;

  v_percent := case when v_total > 0
    then round(((v_total - v_done)::numeric / v_total::numeric) * 100, 2)
    else 100
  end;

  -- Validación server-side: no se puede reclamar una fase que todavía no se
  -- alcanzó, aunque el cliente lo pida (protege contra un cliente con bugs
  -- o alguien llamando el RPC a mano).
  if v_percent > p_phase then
    raise exception 'Todavía no se alcanzó esa fase del jefe (HP restante: %)', v_percent;
  end if;

  v_xp := case when p_phase = 0 then 200 else 50 end;

  update public.projects
    set phases_claimed = array_append(phases_claimed, p_phase)
    where id = p_project_id
    returning * into v_project;

  if v_project.category_id is not null then
    insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
    values (v_project.user_id, v_project.category_id, v_xp, 1 + floor(v_xp / 100.0))
    on conflict (user_id, category_id) do update
      set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
          current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
  end if;

  return v_project;
end;
$$;
```

### supabase/migrations/20260727000001_fase8_followup_logs.sql

```sql
-- Fase 8, Paso 10 — "Pacto de Custodia": bitácora de trazabilidad de
-- follow-ups. Antes de esto, "registrar contacto" solo pisaba
-- last_contacted_at sin dejar rastro de qué se habló ni de resoluciones
-- previas.

-- ============================================================
-- follow_ups.resolved_at
-- La spec original de Gemini resolvía un follow-up borrando la fila
-- (mismo camino que ya usa "Cancelar seguimiento" en TaskModal) — pero
-- eso se llevaría puesta la bitácora que el usuario acaba de escribir en
-- el mismo gesto de resolver, justo lo que este Paso 10 quiere preservar.
-- Se usa resolución blanda (resolved_at) en vez de borrado: la fila y su
-- historial quedan, "activo" pasa a significar resolved_at is null.
-- "Cancelar seguimiento" (Fase 6.2) sigue borrando de verdad — es una
-- acción distinta ("nunca pasó") de "Resolver Éxito" ("pasó y quedó bien").
-- ============================================================
alter table public.follow_ups
  add column resolved_at timestamptz;

-- ============================================================
-- follow_up_logs
-- Una entrada por cada "registrar contacto". contact_count de la UI se
-- deriva de count(*) de esta tabla en vez de guardarse como columna
-- aparte en follow_ups, para no tener dos fuentes de verdad que se
-- puedan desincronizar.
-- ============================================================
create table public.follow_up_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  follow_up_id uuid not null references public.follow_ups (id) on delete cascade,
  notes text not null,
  created_at timestamptz not null default now()
);

create index follow_up_logs_follow_up_id_idx on public.follow_up_logs (follow_up_id);

alter table public.follow_up_logs enable row level security;

create policy "follow_up_logs_all_own_rows"
  on public.follow_up_logs for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### supabase/migrations/20261013000001_fase9_rescate_avisos_triage.sql

```sql
-- Fase 9 (UX ronda 3): rescate de vencidas sin culpa, avisos con escalones
-- separados y quest de triage al descartar la última captura.
-- Se corre completa en el SQL Editor de Supabase (ver HANDOFF, sección 1).
-- Es idempotente: se puede volver a correr sin romper nada.

-- ============================================================
-- 1. Avisos con escalones separados
-- Antes 'upcoming' cubría 3, 2 y 1 día(s): al descartar el aviso de "en 3
-- días" (unique(task_id, type) + dismissed_at que nunca se pisa) el de
-- "mañana" quedaba silenciado. Ahora cada escalón tiene su propio tipo.
-- 'upcoming' se conserva solo para que las filas viejas sigan siendo válidas.
-- ============================================================
alter table public.notifications
  drop constraint if exists notifications_type_check;

alter table public.notifications
  add constraint notifications_type_check
  check (type in ('upcoming', 'upcoming_3d', 'upcoming_1d', 'due_today', 'overdue', 'follow_up'));

-- ============================================================
-- 2. Rescate de tareas vencidas
-- Terminar una tarea DESPUÉS de su deadline da un bonus de XP (+25 %, mínimo
-- 2). Reencuadre motivador de la spec 4.7 ("quest de rescate") en vez de
-- castigo. Se guarda en la propia tarea (rescue_bonus) en lugar de crear una
-- fila en quests: los índices únicos diarios de quests no admiten varios
-- rescates el mismo día sin romper el ON CONFLICT de los otros triggers.
-- Solo tareas de nivel superior; las subtareas no generan rescate.
-- ============================================================
alter table public.tasks
  add column if not exists rescue_bonus integer not null default 0 check (rescue_bonus >= 0);

create or replace function public.tasks_set_rescue_bonus()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.status = 'done'
     and old.status is distinct from 'done'
     and new.parent_task_id is null
     and new.deadline is not null
     and new.xp_reward > 0
     and now() > new.deadline then
    new.rescue_bonus := greatest(2, ceil(new.xp_reward * 0.25)::integer);
  else
    new.rescue_bonus := 0;
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_before_rescue on public.tasks;
create trigger tasks_before_rescue
  before update of status on public.tasks
  for each row execute function public.tasks_set_rescue_bonus();

-- Misma función de Fase 6 (XP de subtareas), con una sola diferencia: el XP de
-- una tarea de nivel superior suma también su rescue_bonus.
create or replace function public.tasks_after_done()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_week_start date;
  v_project_total integer;
  v_project_done integer;
  v_project_category_id uuid;
  v_parent_category_id uuid;
  v_xp integer;
begin
  if not (new.status = 'done' and old.status is distinct from 'done') then
    return new;
  end if;

  perform public.register_daily_activity(new.user_id);

  if new.parent_task_id is not null then
    if new.xp_reward > 0 then
      select category_id into v_parent_category_id
        from public.tasks where id = new.parent_task_id;

      if v_parent_category_id is not null then
        insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
        values (new.user_id, v_parent_category_id, new.xp_reward, 1 + floor(new.xp_reward / 100.0))
        on conflict (user_id, category_id) do update
          set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
              current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
      end if;
    end if;
    return new;
  end if;

  v_xp := new.xp_reward + new.rescue_bonus;

  if new.category_id is not null and v_xp > 0 then
    insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
    values (new.user_id, new.category_id, v_xp, 1 + floor(v_xp / 100.0))
    on conflict (user_id, category_id) do update
      set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
          current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
  end if;

  if exists (
    select 1 from public.quests
    where user_id = new.user_id
      and type = 'daily_priority'
      and period_start = current_date
      and task_id = new.id
      and completed = false
  ) then
    update public.quests
      set completed = true, completed_at = now()
      where user_id = new.user_id
        and type = 'daily_priority'
        and period_start = current_date
        and task_id = new.id;

    if new.category_id is not null then
      update public.user_category_xp
        set current_xp = current_xp + 20,
            current_level = 1 + floor((current_xp + 20) / 100.0)
        where user_id = new.user_id and category_id = new.category_id;
    end if;
  end if;

  if new.project_id is not null and new.deadline is not null then
    v_week_start := date_trunc('week', new.deadline::date)::date;

    select count(*), count(*) filter (where status = 'done')
      into v_project_total, v_project_done
      from public.tasks
      where project_id = new.project_id
        and parent_task_id is null
        and deadline is not null
        and deadline::date >= v_week_start
        and deadline::date < v_week_start + 7;

    if v_project_total > 0 and v_project_total = v_project_done and not exists (
      select 1 from public.quests
      where user_id = new.user_id
        and type = 'weekly_project'
        and period_start = v_week_start
        and project_id = new.project_id
        and completed = true
    ) then
      insert into public.quests (user_id, type, period_start, project_id, xp_reward, completed, completed_at)
      values (new.user_id, 'weekly_project', v_week_start, new.project_id, 50, true, now())
      on conflict (user_id, type, period_start, project_id) where project_id is not null
      do update set completed = true, completed_at = now();

      select category_id into v_project_category_id from public.projects where id = new.project_id;

      if v_project_category_id is not null then
        insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
        values (new.user_id, v_project_category_id, 50, 1 + floor(50 / 100.0))
        on conflict (user_id, category_id) do update
          set current_xp = public.user_category_xp.current_xp + 50,
              current_level = 1 + floor((public.user_category_xp.current_xp + 50) / 100.0);
      end if;
    end if;
  end if;

  return new;
end;
$$;

-- ============================================================
-- 3. Quest de triage al descartar la última captura
-- tasks_after_triage solo reaccionaba a un UPDATE de kanban_column_id: si la
-- última captura del inbox se descartaba (DELETE), la quest diaria no se
-- completaba. La lógica se extrae a una función y la usan ambos disparadores.
-- ============================================================
create or replace function public.complete_daily_triage_if_empty(p_user_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_remaining_inbox integer;
begin
  select count(*) into v_remaining_inbox
    from public.tasks
    where user_id = p_user_id and parent_task_id is null and kanban_column_id is null;

  if v_remaining_inbox = 0 and not exists (
    select 1 from public.quests
    where user_id = p_user_id
      and type = 'daily_triage'
      and period_start = current_date
      and completed = true
  ) then
    insert into public.quests (user_id, type, period_start, xp_reward, completed, completed_at)
    values (p_user_id, 'daily_triage', current_date, 15, true, now())
    on conflict (user_id, type, period_start) where project_id is null do nothing;

    perform public.register_daily_activity(p_user_id);
    perform public.check_quest_loot(p_user_id);
  end if;
end;
$$;

create or replace function public.tasks_after_triage()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.kanban_column_id is null or old.kanban_column_id is not null then
    return new;
  end if;

  perform public.complete_daily_triage_if_empty(new.user_id);
  return new;
end;
$$;

create or replace function public.tasks_after_discard()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  -- Solo capturas del inbox (sin columna, nivel superior).
  if old.kanban_column_id is null and old.parent_task_id is null then
    perform public.complete_daily_triage_if_empty(old.user_id);
  end if;
  return old;
end;
$$;

drop trigger if exists tasks_after_discard on public.tasks;
create trigger tasks_after_discard
  after delete on public.tasks
  for each row execute function public.tasks_after_discard();
```

### supabase/migrations/20261014000001_fase9_orden_subtareas.sql

```sql
-- Fase 9: orden manual de las subtareas (micro-pasos).
-- Hasta ahora se ordenaban por deadline y, como heredan el de su misión, el
-- orden de los empates era arbitrario. Los micro-pasos son un paso a paso, así
-- que el orden lo decide el usuario. Se corre completa en el SQL Editor de
-- Supabase (ver HANDOFF, sección 1). Idempotente.

alter table public.tasks
  add column if not exists position integer;

-- Subtareas existentes: orden de creación (el orden en que se escribieron).
with ranked as (
  select id, row_number() over (partition by parent_task_id order by created_at, id) as rn
  from public.tasks
  where parent_task_id is not null and position is null
)
update public.tasks t
   set position = r.rn
  from ranked r
 where t.id = r.id;

-- Subtareas nuevas: van al final de la lista de su misión.
create or replace function public.tasks_set_subtask_position()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.parent_task_id is not null and new.position is null then
    select coalesce(max(position), 0) + 1
      into new.position
      from public.tasks
      where parent_task_id = new.parent_task_id;
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_before_insert_position on public.tasks;
create trigger tasks_before_insert_position
  before insert on public.tasks
  for each row execute function public.tasks_set_subtask_position();
```

### supabase/migrations/20261014000002_limpiar_avisos_microtareas.sql

```sql
-- Limpieza única: descarta avisos pendientes que apuntan a micro-pasos o a
-- misiones ya hechas (los generaba el sync del cliente, que contaba subtareas).
-- Los avisos de tipo follow_up de misiones en seguimiento se conservan.
-- Opcional, idempotente. Correr en el SQL Editor de Supabase.
update public.notifications n
   set dismissed_at = now()
 where n.dismissed_at is null
   and exists (
     select 1
       from public.tasks t
      where t.id = n.task_id
        and (
          t.parent_task_id is not null
          or t.status = 'done'
          or (t.status = 'follow_up' and n.type <> 'follow_up')
        )
   );
```

### tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Path aliases */
    "paths": {
      "@/*": ["./src/*"]
    },

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "exclude": ["src/sw.ts"]
}
```

### tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.sw.json" }
  ]
}
```

### tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

### tsconfig.sw.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.sw.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "WebWorker"],
    "module": "esnext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/sw.ts"]
}
```

### vite.config.ts

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },
      includeAssets: ['favicon.ico', 'icons/favicon-96x96.png', 'icons/apple-touch-icon.png'],
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: 'Questly',
        short_name: 'Questly',
        description: 'Maneja tus misiones. Conquista el caos.',
        theme_color: '#0b1410',
        background_color: '#0b1410',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icons/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```
