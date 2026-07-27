# Project Snapshot — Productividad RPG

> Generado automáticamente con `node scripts/generate-project-snapshot.mjs` el 2026-07-27. Incluye código fuente + config; excluye node_modules/dist/.env/binarios/specs en Markdown. No editar a mano — se regenera.

## Estructura de carpetas (archivos incluidos en este snapshot)

```
├── .oxlintrc.json
├── index.html
├── netlify.toml
├── package.json
├── scripts
│   ├── generate-icons.mjs
│   ├── generate-project-snapshot.mjs
│   └── optimize-rpg-assets.mjs
├── src
│   ├── app
│   │   ├── Layout.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── providers.tsx
│   │   ├── PwaUpdatePrompt.tsx
│   │   └── router.tsx
│   ├── App.tsx
│   ├── components
│   │   └── ui
│   │       ├── AchievementCelebration.tsx
│   │       ├── AmbientBackground.tsx
│   │       ├── Logomark.tsx
│   │       └── Modal.tsx
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
│   │   │   │   └── GrimorioDrawer.tsx
│   │   │   └── hooks.ts
│   │   ├── calendar
│   │   │   └── components
│   │   │       └── CalendarPage.tsx
│   │   ├── followups
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   └── FollowUpsPage.tsx
│   │   │   └── hooks.ts
│   │   ├── gamification
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   ├── AchievementWatcher.tsx
│   │   │   │   ├── LootShowcase.tsx
│   │   │   │   └── ProgressPage.tsx
│   │   │   └── hooks.ts
│   │   ├── inbox
│   │   │   └── components
│   │   │       ├── InboxDashboard.tsx
│   │   │       └── InboxPage.tsx
│   │   ├── kanban
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   ├── KanbanBoard.tsx
│   │   │   │   ├── KanbanColumn.tsx
│   │   │   │   └── KanbanPage.tsx
│   │   │   └── hooks.ts
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
│   │   │   │   └── ProjectBossCard.tsx
│   │   │   └── hooks.ts
│   │   ├── tasks
│   │   │   ├── api.ts
│   │   │   ├── components
│   │   │   │   ├── FocusFloat.tsx
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   └── TaskModal.tsx
│   │   │   ├── FocusFloatContext.tsx
│   │   │   └── hooks.ts
│   │   └── triage
│   │       ├── api.ts
│   │       ├── components
│   │       │   ├── DirectEquipToggle.tsx
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
│   │   ├── categoryIcon.tsx
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
│       └── 20260726000002_fase7_dungeon_bosses.sql
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
    <meta name="theme-color" content="#faf9f6" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)" />
    <meta name="description" content="Productividad personal con gamification tipo RPG" />
    <title>Productividad RPG</title>
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
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
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
    "tailwindcss": "^4.3.3",
    "web-push": "^3.6.7",
    "zustand": "^5.0.14"
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

### scripts/generate-icons.mjs

```javascript
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public', 'icons')
mkdirSync(publicDir, { recursive: true })

const anySvg = join(__dirname, 'icon-any.svg')
const maskableSvg = join(__dirname, 'icon-maskable.svg')

await Promise.all([
  sharp(anySvg).resize(192, 192).png().toFile(join(publicDir, 'icon-192.png')),
  sharp(anySvg).resize(512, 512).png().toFile(join(publicDir, 'icon-512.png')),
  sharp(anySvg).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png')),
  sharp(maskableSvg).resize(512, 512).png().toFile(join(publicDir, 'icon-512-maskable.png')),
])

console.log('Iconos generados en public/icons/')
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
import { NavLink, Outlet } from 'react-router-dom'
import {
  Calendar,
  Columns3,
  Flame,
  Inbox as InboxIcon,
  Link2,
  ListChecks,
  Shield,
  Swords,
  Trophy,
} from 'lucide-react'
import { useStreak } from '@/features/gamification/hooks'
import { NotificationBell } from '@/features/notifications/components/NotificationBell'
import { FocusFloatButton } from '@/features/tasks/components/FocusFloat'
import { FocusFloatProvider } from '@/features/tasks/FocusFloatContext'
import { ProfileMenu } from '@/features/auth/components/ProfileMenu'
import { Logomark } from '@/components/ui/Logomark'
import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { AchievementWatcher } from '@/features/gamification/components/AchievementWatcher'

const navItems = [
  { to: '/', label: 'Combate', icon: Swords, end: true },
  { to: '/inbox', label: 'Inbox', icon: InboxIcon },
  { to: '/triage', label: 'Estrategia', icon: ListChecks },
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
  return (
    <FocusFloatProvider>
      <div className="min-h-dvh text-fg">
        <AmbientBackground />
        <AchievementWatcher />
        <nav className="flex items-center gap-4 border-b border-border bg-surface/90 px-4 py-2.5 backdrop-blur-sm">
          <NavLink to="/" className="shrink-0">
            <Logomark className="h-7 w-7" />
          </NavLink>

          <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
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
            <FocusFloatButton />
            <NotificationBell />
            <StreakIndicator />
            <ProfileMenu />
          </div>
        </nav>
        <Outlet />
      </div>
    </FocusFloatProvider>
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
          { path: 'kanban/:projectId', element: <KanbanPage /> },
          { path: 'calendario', element: <CalendarPage /> },
          { path: 'progreso', element: <ProgressPage /> },
          { path: 'follow-ups', element: <FollowUpsPage /> },
          { path: 'projects/:projectId/boss', element: <BossEncounterPage /> },
        ],
      },
    ],
  },
])
```

### src/components/ui/AchievementCelebration.tsx

```tsx
import { useEffect, useRef } from 'react'

export interface Achievement {
  id: string
  kicker: string
  title: string
  description: string
  icon: string
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onDone}
      role="status"
      aria-live="polite"
    >
      <div ref={stageRef} className="relative flex h-72 w-full max-w-sm items-center justify-center">
        <div className="achievement-modal relative rounded-2xl border border-gold bg-surface px-10 py-8 text-center">
          <div className="mx-auto mb-3.5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--gold-bright),var(--gold)_60%,#7a5a1e_100%)] text-3xl shadow-[inset_0_0_12px_rgba(0,0,0,0.35)]">
            {achievement.icon}
          </div>
          <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-gold-bright">
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
  size: number
  drift: number
  duration: number
  delay: number
}

function useMotes(count: number): Mote[] {
  return useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        drift: Math.random() * 80 - 40,
        duration: 10 + Math.random() * 14,
        delay: Math.random() * 14,
      })),
    [count],
  )
}

/**
 * Fondo ambiental global: aurora rotando muy lento + motas doradas ascendiendo.
 * Solo visible en modo oscuro (identidad principal); en claro queda inerte para no
 * competir con la legibilidad. Se apaga con prefers-reduced-motion.
 */
export function AmbientBackground() {
  const motes = useMotes(18)

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:opacity-100 opacity-0">
      <div className="ambient-aurora absolute -inset-1/5" />
      {motes.map((mote, i) => (
        <div
          key={i}
          className="ambient-mote absolute bottom-[-5%] rounded-full"
          style={
            {
              left: `${mote.left}%`,
              width: mote.size,
              height: mote.size,
              '--drift': `${mote.drift}px`,
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
```

### src/components/ui/Logomark.tsx

```tsx
export function Logomark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" fill="none" className={className} aria-hidden="true">
      <rect width="512" height="512" rx="96" className="fill-surface-2" />
      <rect x="120" y="280" width="64" height="132" rx="14" fill="#7c3aed" />
      <rect x="224" y="210" width="64" height="202" rx="14" fill="#2563eb" />
      <rect x="328" y="120" width="64" height="292" rx="14" fill="#059669" />
    </svg>
  )
}
```

### src/components/ui/Modal.tsx

```tsx
import { useEffect, type PropsWithChildren } from 'react'

export function Modal({
  onClose,
  children,
}: PropsWithChildren<{ onClose: () => void }>) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-panel max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-surface p-5 shadow-xl"
      >
        {children}
      </div>
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
import { Logomark } from '@/components/ui/Logomark'
import { AmbientBackground } from '@/components/ui/AmbientBackground'

type Mode = 'magic-link' | 'password-in' | 'password-up'

export function LoginPage() {
  const { session, loading: sessionLoading } = useAuth()
  const [mode, setMode] = useState<Mode>('magic-link')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ kind: 'info' | 'error'; text: string } | null>(null)

  if (!sessionLoading && session) {
    return <Navigate to="/inbox" replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      if (mode === 'magic-link') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.origin },
        })
        if (error) throw error
        setMessage({ kind: 'info', text: 'Revisa tu correo — te mandamos un enlace para entrar.' })
      } else if (mode === 'password-in') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage({ kind: 'info', text: 'Cuenta creada — revisa tu correo si pide confirmación, luego inicia sesión.' })
      }
    } catch (err) {
      setMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Algo no salió bien, probá de nuevo.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg p-4">
      <AmbientBackground />
      <div className="relative w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-xl">
        <div className="flex items-center gap-2.5">
          <Logomark className="h-9 w-9" />
          <h1 className="font-display text-lg font-semibold tracking-tight text-fg">
            Productividad RPG
          </h1>
        </div>

        <div className="mt-5 flex gap-1 rounded-md bg-surface-2 p-1">
          {(
            [
              { key: 'magic-link', label: 'Enlace mágico' },
              { key: 'password-in', label: 'Contraseña' },
              { key: 'password-up', label: 'Crear cuenta' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setMode(tab.key)
                setMessage(null)
              }}
              className={`flex-1 rounded px-2 py-1.5 text-sm font-medium transition-colors ${
                mode === tab.key ? 'bg-surface text-fg shadow-sm' : 'text-fg-muted hover:text-fg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm text-fg-muted">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-fg outline-none focus:border-accent"
              placeholder="tu@email.com"
            />
          </label>

          {mode !== 'magic-link' && (
            <label className="flex flex-col gap-1 text-sm text-fg-muted">
              Contraseña
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-fg outline-none focus:border-accent"
                placeholder="••••••••"
              />
            </label>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_4px_24px_rgba(240,195,100,0.45)] hover:-translate-y-px active:scale-[0.97] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {submitting
              ? 'Un momento…'
              : mode === 'magic-link'
                ? 'Enviar enlace'
                : mode === 'password-in'
                  ? 'Entrar'
                  : 'Crear cuenta'}
          </button>
        </form>

        {message && (
          <p
            className={`mt-3 text-sm ${message.kind === 'error' ? 'text-warn-fg' : 'text-fg-muted'}`}
          >
            {message.text}
          </p>
        )}
      </div>
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
          <div className="modal-panel absolute right-0 z-50 mt-2 w-64 rounded-lg border border-border bg-surface p-2 shadow-xl">
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
```

### src/features/battle-hud/components/CombatSlotCard.tsx

```tsx
import { useState } from 'react'
import { Check, MoreVertical, PictureInPicture2 } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask, useSubtasks } from '@/features/tasks/hooks'
import { useFocusFloat } from '@/features/tasks/FocusFloatContext'
import { useSendToFollowUp } from '@/features/followups/hooks'
import { useUnequipHudSlot } from '@/features/battle-hud/hooks'
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { Task, TaskSize } from '@/types/database.types'

const DIFFICULTY_BADGE: Record<TaskSize, { label: string; xp: number }> = {
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
  const { open: openFocusFloat } = useFocusFloat()
  const [menuOpen, setMenuOpen] = useState(false)

  const category = categories?.find((c) => c.id === task.category_id)
  const difficulty = task.size ? DIFFICULTY_BADGE[task.size] : null

  const hasSubtasks = !!subtasks && subtasks.length > 0
  const hpTotal = hasSubtasks ? subtasks!.length : 1
  const hpCurrent = hasSubtasks ? subtasks!.filter((s) => s.status !== 'done').length : 1

  return (
    <div
      className="flex flex-col gap-3 rounded-lg border border-border-card bg-surface-card p-4 shadow-sm"
      style={{
        borderColor: category ? `${category.color_hex}55` : undefined,
        boxShadow: category ? `0 0 16px ${category.color_hex}22` : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenTask(task)}
          className="min-w-0 flex-1 text-left"
        >
          {category && (
            <p className="font-mono text-[11px] uppercase tracking-wide" style={{ color: category.color_hex }}>
              {category.name}
            </p>
          )}
          <p className="mt-0.5 truncate font-display text-base font-semibold text-fg">
            {task.title}
          </p>
        </button>
        {difficulty && task.size && (
          <span
            title={`${difficulty.label} · +${difficulty.xp} XP`}
            className="flex shrink-0 items-center justify-center rounded-full bg-surface-2 p-1.5"
          >
            <img src={WEAPON_ICONS[task.size]} alt={difficulty.label} className="h-5 w-5 object-contain" />
          </span>
        )}
      </div>

      <div>
        <div className="flex gap-0.5">
          {Array.from({ length: hpTotal }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-sm transition-colors ${
                i < hpCurrent ? 'bg-red-500' : 'bg-surface-2'
              }`}
            />
          ))}
        </div>
        <p className="mt-1 font-mono text-[11px] text-fg-muted">
          {hasSubtasks ? `${hpCurrent}/${hpTotal} subtareas restantes` : 'Sin subtareas'}
        </p>
      </div>

      <div className="mt-1 flex items-center gap-1.5 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => void openFocusFloat()}
          title="Atacar / Entrar en foco"
          className="flex items-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs text-fg-muted transition-all duration-150 hover:border-accent/40 hover:text-accent active:scale-95"
        >
          <PictureInPicture2 className="h-3.5 w-3.5" /> Atacar
        </button>
        <button
          type="button"
          onClick={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
          title="Asestar golpe final"
          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-accent px-2 py-1.5 text-xs font-semibold text-accent-fg transition-all duration-150 hover:shadow-[0_0_14px_rgba(217,169,74,0.45)] active:scale-95"
        >
          <Check className="h-3.5 w-3.5" /> Golpe final
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            title="Retirada táctica"
            aria-label="Retirada táctica"
            className="flex items-center rounded-md border border-border p-1.5 text-fg-muted transition-colors hover:text-fg"
          >
            <MoreVertical className="h-3.5 w-3.5" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="modal-panel absolute right-0 bottom-full z-50 mb-2 w-48 rounded-lg border border-border bg-surface p-1 shadow-xl">
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
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-sky-500"
                >
                  Mover a Follow-up
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    unequip.mutate(task.id)
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  Devolver al Grimorio
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
```

### src/features/battle-hud/components/EmptySlotCard.tsx

```tsx
import { Plus } from 'lucide-react'

const SLOT_NUMERALS = ['I', 'II', 'III']

export function EmptySlotCard({ slot, onEquip }: { slot: number; onEquip: () => void }) {
  return (
    <button
      type="button"
      onClick={onEquip}
      className="flex min-h-[176px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border p-4 text-center transition-all duration-150 hover:border-accent/40 hover:bg-surface/40"
    >
      <span className="font-display text-sm tracking-wide text-fg-muted">
        Slot {SLOT_NUMERALS[slot - 1] ?? slot} Disponible
      </span>
      <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-fg-muted transition-colors">
        <Plus className="h-3.5 w-3.5" /> Equipar Misión
      </span>
    </button>
  )
}
```

### src/features/battle-hud/components/GrimorioDrawer.tsx

```tsx
import { useState } from 'react'
import { format } from 'date-fns'
import { X } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useEquipHudSlot, useEquippableTasks } from '@/features/battle-hud/hooks'

export function GrimorioDrawer({ slot, onClose }: { slot: number; onClose: () => void }) {
  const { data: tasks, isLoading } = useEquippableTasks()
  const { data: categories } = useCategories()
  const equip = useEquipHudSlot()
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  const filtered = tasks?.filter((t) => !activeCategoryId || t.category_id === activeCategoryId)

  function handleEquip(taskId: string) {
    equip.mutate({ taskId, slot }, { onSuccess: onClose })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-panel flex h-full w-full max-w-sm flex-col border-l border-border bg-surface p-4"
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
        <p className="mt-1 text-sm text-fg-muted">Elegí una misión del backlog para equipar.</p>

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

### src/features/battle-hud/hooks.ts

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
```

### src/features/calendar/components/CalendarPage.tsx

```tsx
import { useMemo, useState } from 'react'
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isPast,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { useCategories } from '@/features/projects/hooks'
import { useTasksInRange } from '@/features/tasks/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Category, Task } from '@/types/database.types'

type ViewMode = 'month' | 'week' | 'day'

function DayCell({
  day,
  dayTasks,
  categories,
  faded,
  onOpenTask,
}: {
  day: Date
  dayTasks: Task[]
  categories: Category[] | undefined
  faded: boolean
  onOpenTask: (task: Task) => void
}) {
  return (
    <div className={`min-h-24 bg-surface p-1.5 ${faded ? 'opacity-40' : ''}`}>
      <span
        className={`font-mono text-xs ${
          isToday(day)
            ? 'inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent font-medium text-accent-fg'
            : 'text-fg-muted'
        }`}
      >
        {format(day, 'd')}
      </span>
      <div className="mt-1 flex flex-col gap-0.5">
        {dayTasks.map((task) => {
          const category = categories?.find((c) => c.id === task.category_id)
          const done = task.status === 'done'
          const overdue = !done && isPast(new Date(task.deadline!))
          return (
            <button
              key={task.id}
              type="button"
              onClick={() => onOpenTask(task)}
              title={task.title}
              className={`truncate rounded px-1 py-0.5 text-left text-[11px] transition-colors hover:brightness-125 ${
                overdue
                  ? 'bg-warn-bg text-warn-fg'
                  : done
                    ? 'text-fg-muted/60 line-through'
                    : 'text-fg-muted'
              }`}
              style={!overdue && category ? { backgroundColor: `${category.color_hex}1a` } : undefined}
            >
              {task.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DayListView({
  dayTasks,
  categories,
  onOpenTask,
}: {
  dayTasks: Task[]
  categories: Category[] | undefined
  onOpenTask: (task: Task) => void
}) {
  if (dayTasks.length === 0) {
    return <p className="mt-4 text-sm text-fg-muted">Nada con deadline este día.</p>
  }

  return (
    <ul className="mt-4 flex flex-col gap-2">
      {dayTasks
        .slice()
        .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
        .map((task) => {
          const category = categories?.find((c) => c.id === task.category_id)
          const done = task.status === 'done'
          const overdue = !done && isPast(new Date(task.deadline!))
          return (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => onOpenTask(task)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
                  overdue ? 'border-warn-border bg-warn-bg' : 'border-border bg-surface'
                } ${done ? 'opacity-60' : ''}`}
              >
                <span className="w-12 shrink-0 font-mono text-xs text-fg-muted">
                  {format(new Date(task.deadline!), 'HH:mm')}
                </span>
                {category && (
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: category.color_hex }}
                  />
                )}
                <span className={done ? 'flex-1 text-fg-muted line-through' : 'flex-1 text-fg'}>
                  {task.title}
                </span>
              </button>
            </li>
          )
        })}
    </ul>
  )
}

export function CalendarPage() {
  const [view, setView] = useState<ViewMode>('month')
  const [anchor, setAnchor] = useState(() => new Date())
  const [hiddenCategoryIds, setHiddenCategoryIds] = useState<Set<string>>(new Set())
  const [showCompleted, setShowCompleted] = useState(true)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const { data: categories } = useCategories()

  const rangeStart =
    view === 'month'
      ? startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 })
      : view === 'week'
        ? startOfWeek(anchor, { weekStartsOn: 1 })
        : startOfDay(anchor)
  const rangeEnd =
    view === 'month'
      ? endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 })
      : view === 'week'
        ? endOfWeek(anchor, { weekStartsOn: 1 })
        : startOfDay(anchor)

  const days = useMemo(
    () => eachDayOfInterval({ start: rangeStart, end: rangeEnd }),
    [rangeStart, rangeEnd],
  )

  const { data: tasks } = useTasksInRange(
    rangeStart.toISOString(),
    view === 'day' ? addDays(rangeEnd, 1).toISOString() : rangeEnd.toISOString(),
  )

  const visibleTasks = tasks?.filter(
    (t) =>
      !hiddenCategoryIds.has(t.category_id ?? '') && (showCompleted || t.status !== 'done'),
  )

  function toggleCategory(id: string) {
    setHiddenCategoryIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function goPrev() {
    setAnchor((d) => (view === 'month' ? subMonths(d, 1) : view === 'week' ? subWeeks(d, 1) : subDays(d, 1)))
  }
  function goNext() {
    setAnchor((d) => (view === 'month' ? addMonths(d, 1) : view === 'week' ? addWeeks(d, 1) : addDays(d, 1)))
  }

  const title =
    view === 'month'
      ? format(anchor, 'MMMM yyyy', { locale: es })
      : view === 'week'
        ? `${format(rangeStart, 'd MMM', { locale: es })} – ${format(rangeEnd, 'd MMM', { locale: es })}`
        : format(anchor, "EEEE d 'de' MMMM", { locale: es })

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-md border border-border px-2 py-1 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
          >
            ‹
          </button>
          <h1 className="min-w-52 text-center font-display text-lg font-semibold capitalize tracking-tight text-fg">
            {title}
          </h1>
          <button
            type="button"
            onClick={goNext}
            className="rounded-md border border-border px-2 py-1 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => setAnchor(new Date())}
            className="ml-2 text-sm text-fg-muted hover:text-fg"
          >
            Hoy
          </button>

          <div className="ml-2 flex gap-1 rounded-md bg-surface-2 p-1">
            {(
              [
                { key: 'day', label: 'Día' },
                { key: 'week', label: 'Semana' },
                { key: 'month', label: 'Mes' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setView(tab.key)}
                className={`rounded px-2 py-1 text-xs font-medium ${
                  view === tab.key ? 'bg-surface text-fg shadow-sm' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-fg-muted">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="accent-accent"
            />
            Mostrar completadas
          </label>
          {categories?.map((cat) => {
            const active = !hiddenCategoryIds.has(cat.id)
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${
                  active ? 'border-transparent text-fg' : 'border-border text-fg-muted/50'
                }`}
                style={active ? { backgroundColor: `${cat.color_hex}1a` } : undefined}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: active ? cat.color_hex : undefined }}
                />
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {view === 'day' ? (
        <DayListView
          dayTasks={visibleTasks?.filter((t) => t.deadline && isSameDay(new Date(t.deadline), anchor)) ?? []}
          categories={categories}
          onOpenTask={setEditingTask}
        />
      ) : (
        <div className="mt-4 grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-border bg-border">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((label) => (
            <div
              key={label}
              className="bg-surface-2 px-2 py-1 text-center text-xs font-medium text-fg-muted"
            >
              {label}
            </div>
          ))}

          {days.map((day) => (
            <DayCell
              key={day.toISOString()}
              day={day}
              dayTasks={visibleTasks?.filter((t) => t.deadline && isSameDay(new Date(t.deadline), day)) ?? []}
              categories={categories}
              faded={view === 'month' && !isSameMonth(day, anchor)}
              onOpenTask={setEditingTask}
            />
          ))}
        </div>
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

### src/features/followups/api.ts

```typescript
import { supabase } from '@/lib/supabase'
import type { Database, FollowUp } from '@/types/database.types'

export async function fetchFollowUps(): Promise<FollowUp[]> {
  const { data, error } = await supabase
    .from('follow_ups')
    .select('*')
    .order('next_reminder_at', { ascending: true })
  if (error) throw error
  return data
}

export async function fetchFollowUpForTask(taskId: string): Promise<FollowUp | null> {
  const { data, error } = await supabase
    .from('follow_ups')
    .select('*')
    .eq('task_id', taskId)
    .maybeSingle()
  if (error) throw error
  return data
}

export type NewFollowUp = Pick<
  Database['public']['Tables']['follow_ups']['Insert'],
  'task_id' | 'stakeholder_name' | 'interval_days' | 'notes'
>

export async function createFollowUp(input: NewFollowUp): Promise<FollowUp> {
  const { data, error } = await supabase.from('follow_ups').insert(input).select().single()
  if (error) throw error
  return data
}

export async function updateFollowUp(
  id: string,
  patch: Partial<Pick<Database['public']['Tables']['follow_ups']['Update'], 'stakeholder_name' | 'interval_days' | 'notes'>>,
): Promise<FollowUp> {
  const { data, error } = await supabase
    .from('follow_ups')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function registerFollowUpContact(id: string): Promise<FollowUp> {
  const { data, error } = await supabase
    .from('follow_ups')
    .update({ last_contacted_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteFollowUp(id: string): Promise<void> {
  const { error } = await supabase.from('follow_ups').delete().eq('id', id)
  if (error) throw error
}
```

### src/features/followups/components/FollowUpsPage.tsx

```tsx
import { useState } from 'react'
import { format, isPast } from 'date-fns'
import { Check } from 'lucide-react'
import { useFollowUps, useRegisterFollowUpContact } from '@/features/followups/hooks'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask, useTasksByIds } from '@/features/tasks/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import type { Task } from '@/types/database.types'

export function FollowUpsPage() {
  const { data: followUps, isLoading } = useFollowUps()
  const { data: categories } = useCategories()
  const { data: tasks } = useTasksByIds(followUps?.map((f) => f.task_id) ?? [])
  const registerContact = useRegisterFollowUpContact()
  const completeTask = useCompleteTask()
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const rows = (followUps ?? [])
    .map((followUp) => ({ followUp, task: tasks?.find((t) => t.id === followUp.task_id) }))
    .filter((row) => row.task && row.task.status !== 'done')

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="font-display text-lg font-semibold tracking-tight text-fg">
        Follow-ups activos
      </h1>
      <p className="mt-1 text-sm text-fg-muted">Ordenados por próximo recordatorio.</p>

      {isLoading && <p className="mt-4 text-sm text-fg-muted">Cargando…</p>}

      {!isLoading && rows.length === 0 && (
        <p className="mt-4 text-sm text-fg-muted">
          No hay follow-ups activos. Enviá una tarea a Follow-up desde su tarjeta en el Kanban o
          desde su modal.
        </p>
      )}

      <ul className="mt-4 flex flex-col gap-2">
        {rows.map(({ followUp, task }) => {
          const category = categories?.find((c) => c.id === task!.category_id)
          const due = isPast(new Date(followUp.next_reminder_at))
          return (
            <li
              key={followUp.id}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${
                due ? 'border-warn-border bg-warn-bg' : 'border-dashed border-fg-muted/40 bg-surface'
              }`}
            >
              <button
                type="button"
                onClick={() => setEditingTask(task!)}
                className="flex-1 text-left"
              >
                <p className="flex items-center gap-1.5 text-sm font-medium text-fg">
                  <span title="En seguimiento">👁️</span> {task!.title}
                </p>
                <p className="mt-0.5 flex items-center gap-2 font-mono text-xs text-fg-muted">
                  {category && (
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: category.color_hex }}
                      />
                      {category.name}
                    </span>
                  )}
                  {followUp.stakeholder_name && <span>· {followUp.stakeholder_name}</span>}
                  <span>· próximo: {format(new Date(followUp.next_reminder_at), 'd MMM')}</span>
                </p>
              </button>
              <button
                type="button"
                onClick={() => registerContact.mutate(followUp.id)}
                className="shrink-0 rounded-md border border-border px-2 py-1 text-xs text-fg-muted transition-all duration-150 hover:border-accent/40 hover:bg-surface-2 hover:text-accent active:scale-95"
              >
                Registrar contacto
              </button>
              <button
                type="button"
                onClick={() =>
                  completeTask.mutate({ id: task!.id, project_id: task!.project_id })
                }
                title="Completar tarea"
                className="flex shrink-0 items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_0_14px_rgba(217,169,74,0.45)] active:scale-95"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
            </li>
          )
        })}
      </ul>

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

### src/features/followups/hooks.ts

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createFollowUp,
  deleteFollowUp,
  fetchFollowUpForTask,
  fetchFollowUps,
  registerFollowUpContact,
  updateFollowUp,
} from '@/features/followups/api'
import { sendTaskToFollowUp } from '@/features/tasks/api'

export function useFollowUps() {
  return useQuery({ queryKey: ['follow-ups'], queryFn: fetchFollowUps })
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

export function useCreateFollowUp() {
  const invalidate = useInvalidateFollowUps()
  return useMutation({ mutationFn: createFollowUp, onSuccess: invalidate })
}

export function useUpdateFollowUp() {
  const invalidate = useInvalidateFollowUps()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof updateFollowUp>[1] }) =>
      updateFollowUp(id, patch),
    onSuccess: invalidate,
  })
}

export function useRegisterFollowUpContact() {
  const invalidate = useInvalidateFollowUps()
  return useMutation({ mutationFn: registerFollowUpContact, onSuccess: invalidate })
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
              icon: '⚔',
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
              icon: '🜂',
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
                ? 'border-accent/40 bg-accent/5 shadow-[0_0_16px_rgba(217,169,74,0.25)] hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(217,169,74,0.4)]'
                : 'border-dashed border-border opacity-50'
            }`}
          >
            <Icon className={`h-6 w-6 ${unlock ? 'text-accent drop-shadow-[0_0_4px_rgba(217,169,74,0.5)]' : 'text-fg-muted/60'}`} />
            <p className="text-xs font-medium text-fg">{loot.name}</p>
            <p className="text-[11px] text-fg-muted">{loot.description}</p>
          </div>
        )
      })}
    </div>
  )
}
```

### src/features/gamification/components/ProgressPage.tsx

```tsx
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
import { ProjectBossCard } from '@/features/projects/components/ProjectBossCard'

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
      <p className="text-sm text-fg-muted">
        Todavía no marcaste una tarea prioritaria de hoy (con la ★ en el modal de la tarea).
      </p>
    )
  }

  return (
    <p className="flex items-center gap-2 text-sm">
      <span className={priorityQuest.completed ? 'text-emerald-500' : 'text-fg-muted'}>
        {priorityQuest.completed ? '✓' : '☆'}
      </span>
      <span className="text-fg">{priorityTask?.title ?? 'Cargando…'}</span>
      {priorityQuest.completed && (
        <span className="font-mono text-xs text-emerald-500">+{priorityQuest.xp_reward} XP</span>
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
      <p className="text-sm text-fg-muted">
        Ningún proyecto tiene tareas con deadline esta semana todavía.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {rows.map(({ project, total, done, completed }) => (
        <li key={project.id} className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-fg">{project.name}</span>
            <span className="font-mono text-xs text-fg-muted">
              {done}/{total} {completed && <span className="text-emerald-500">· +50 XP ✓</span>}
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out"
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
  const { data: projects } = useProjects()

  const triageQuest = todayQuests?.find((q) => q.type === 'daily_triage')

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="font-display text-lg font-semibold tracking-tight text-fg">Progreso</h1>

      <div className="mt-4 flex items-center gap-6 rounded-lg border border-border bg-surface p-4">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-accent" />
          <div>
            <p className="font-mono text-xl font-semibold text-fg">
              {streak?.current_streak_days ?? 0} <span className="text-sm font-normal text-fg-muted">días</span>
            </p>
            <p className="font-mono text-xs text-fg-muted">récord: {streak?.longest_streak ?? 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Shield
              key={i}
              className={`h-4 w-4 ${
                i < (streak?.shields_available ?? 0) ? 'fill-sky-500 text-sky-500' : 'text-fg-muted/25'
              }`}
            />
          ))}
        </div>
      </div>

      <section className="mt-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-fg-muted">
          Quests de hoy
        </h2>
        <div className="mt-2 flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
          <p className="flex items-center gap-2 text-sm">
            <span className={triageQuest?.completed ? 'text-emerald-500' : 'text-fg-muted'}>
              {triageQuest?.completed ? '✓' : '○'}
            </span>
            <span className="text-fg">Vaciar el inbox (triage diario)</span>
            {triageQuest?.completed && (
              <span className="font-mono text-xs text-emerald-500">+{triageQuest.xp_reward} XP</span>
            )}
          </p>
          <PriorityQuestRow />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-fg-muted">
          Quests semanales ·{' '}
          <span className="font-mono normal-case tracking-normal">
            {format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'd MMM', { locale: es })} –{' '}
            {format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'd MMM', { locale: es })}
          </span>
        </h2>
        <div className="mt-2 rounded-lg border border-border bg-surface p-4">
          <WeeklyProjectQuests />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-fg-muted">
          Jefes de Mazmorra
        </h2>
        {projects && projects.length > 0 ? (
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectBossCard
                key={project.id}
                project={project}
                category={categories?.find((c) => c.id === project.category_id)}
              />
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-fg-muted">Todavía no creaste ningún proyecto.</p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-fg-muted">Clases</h2>
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
                className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 transition-transform duration-200 hover:-translate-y-0.5"
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
                    <p className="truncate text-sm text-fg">
                      <span className="font-medium">{cat.name}</span>{' '}
                      <span className="font-display font-medium text-fg-muted">
                        · {currentRank?.rank_name ?? cat.class_name}
                      </span>
                    </p>
                    <p className="shrink-0 font-mono text-xs text-fg-muted">Nv. {level}</p>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full transition-[width] duration-700 ease-out"
                      style={{
                        width: `${progressInLevel}%`,
                        backgroundColor: cat.color_hex,
                        boxShadow: `0 0 10px ${cat.color_hex}66`,
                      }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="font-mono text-xs text-fg-muted">
                      {progressInLevel}/{XP_PER_LEVEL} XP · {currentXp} total
                    </p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className="h-1 w-3 rounded-full bg-surface-2"
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
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-fg-muted">Loot</h2>
        <div className="mt-2 rounded-lg border border-border bg-surface p-4">
          <LootShowcase />
        </div>
      </section>
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

  const tasksXp = tasksToday.reduce((sum, t) => sum + t.xp_reward, 0)
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
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { isPast, isToday } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Flame, Sparkles, Star, Trophy, Zap } from 'lucide-react'
import {
  useStreak,
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

function StatusStrip() {
  const { data: streak } = useStreak()
  const xpToday = useXpEarnedToday()
  const { data: todayQuests } = useTodayQuests()
  const triageDone = todayQuests?.find((q) => q.type === 'daily_triage')?.completed ?? false

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm">
      <span className="flex items-center gap-1.5 font-mono text-fg">
        <Flame className="h-4 w-4 text-accent" />
        {streak?.current_streak_days ?? 0} <span className="text-fg-muted">días</span>
      </span>
      <span className="flex items-center gap-1.5 font-mono text-fg">
        <Sparkles className="h-4 w-4 text-gold-bright" />+{xpToday ?? 0} <span className="text-fg-muted">XP hoy</span>
      </span>
      <span
        className={`flex items-center gap-1.5 ${triageDone ? 'text-emerald-500' : 'text-fg-muted'}`}
      >
        {triageDone ? '✓' : '○'} Triage de hoy
      </span>
    </div>
  )
}

function PriorityTodayCard({ onOpen }: { onOpen: (task: Task) => void }) {
  const { data: todayQuests } = useTodayQuests()
  const priorityQuest = todayQuests?.find((q) => q.type === 'daily_priority')
  const { data: task } = useTaskById(priorityQuest?.task_id ?? null)

  if (!priorityQuest || !task || task.status === 'done') return null

  return (
    <button
      type="button"
      onClick={() => onOpen(task)}
      className="flex w-full items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-4 py-2.5 text-left text-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
    >
      <Star className="h-4 w-4 shrink-0 text-accent" />
      <span className="text-fg-muted">Prioridad de hoy:</span>
      <span className="flex-1 truncate font-medium text-fg">{task.title}</span>
    </button>
  )
}

function DeadlineCounters() {
  const navigate = useNavigate()
  const { data: tasks } = useActiveTasksWithDeadline()

  const overdue = tasks?.filter((t) => isPast(new Date(t.deadline!))).length ?? 0
  const dueToday = tasks?.filter((t) => isToday(new Date(t.deadline!))).length ?? 0

  if (overdue === 0 && dueToday === 0) return null

  return (
    <button
      type="button"
      onClick={() =>
        navigate('/kanban', { state: { dateFilter: overdue > 0 ? 'overdue' : 'today' } })
      }
      className="flex w-full items-center justify-between gap-2 rounded-lg border border-warn-border bg-warn-bg px-4 py-2.5 text-left text-sm text-warn-fg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="flex items-center gap-1.5">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        {overdue > 0 && <span>{overdue} vencida{overdue === 1 ? '' : 's'}</span>}
        {overdue > 0 && dueToday > 0 && <span>·</span>}
        {dueToday > 0 && <span>{dueToday} vence{dueToday === 1 ? '' : 'n'} hoy</span>}
      </span>
      <span className="shrink-0 underline underline-offset-2">Ver en Kanban →</span>
    </button>
  )
}

/** Franja de estado + prioridad del día + contador de deadlines. Siempre visible. */
export function InboxTopBar({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <StatusStrip />
      <PriorityTodayCard onOpen={onOpenTask} />
      <DeadlineCounters />
    </div>
  )
}

function pickEmptyStateMessage(streakDays: number, triageDone: boolean): string {
  if (triageDone && streakDays >= 7) {
    return `🔥 Racha de ${streakDays} días y encima ya hiciste el triage de hoy. Sos una máquina.`
  }
  if (triageDone) return 'Inbox vacío y triage de hoy hecho — bien ahí.'
  if (streakDays >= 3) return `Inbox vacío. Llevás ${streakDays} días de racha, no la cortes.`
  return 'Inbox vacío. Todo tranquilo por acá.'
}

function LastWinCard() {
  const { data: task } = useLastCompletedTask()
  if (!task || !task.completed_at) return null

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm">
      <Trophy className="h-4 w-4 shrink-0 text-gold-bright" />
      <span className="text-fg-muted">Última victoria:</span>
      <span className="flex-1 truncate text-fg">{task.title}</span>
      <span className="shrink-0 font-mono text-xs text-fg-muted">
        {formatDistanceToNow(new Date(task.completed_at), { addSuffix: true, locale: es })}
      </span>
    </div>
  )
}

function QuickWinCard({ onOpen }: { onOpen: (task: Task) => void }) {
  const { data: task } = useQuickWinTask()
  if (!task) return null

  return (
    <button
      type="button"
      onClick={() => onOpen(task)}
      className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2.5 text-left text-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/40"
    >
      <Zap className="h-4 w-4 shrink-0 text-fg-muted" />
      <span className="text-fg-muted">Quick win:</span>
      <span className="flex-1 truncate text-fg">{task.title}</span>
      <span className="shrink-0 font-mono text-xs text-gold-bright">+10 XP</span>
    </button>
  )
}

/** Contenido para cuando el inbox está vacío: mensaje con personalidad + última victoria + quick win. */
export function InboxEmptyState({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  const { data: streak } = useStreak()
  const { data: todayQuests } = useTodayQuests()
  const triageDone = todayQuests?.find((q) => q.type === 'daily_triage')?.completed ?? false

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-fg-muted">
        {pickEmptyStateMessage(streak?.current_streak_days ?? 0, triageDone)}
      </p>
      <LastWinCard />
      <QuickWinCard onOpen={onOpenTask} />
    </div>
  )
}
```

### src/features/inbox/components/InboxPage.tsx

```tsx
import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mic, Square, WifiOff } from 'lucide-react'
import { useCaptureInboxTask, useDeleteTask, useInboxTasks } from '@/features/tasks/hooks'
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

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-lg font-semibold tracking-tight text-fg">Inbox</h1>
        {!online && (
          <span className="flex items-center gap-1 rounded-full bg-warn-bg px-2 py-0.5 text-xs text-warn-fg">
            <WifiOff className="h-3 w-3" /> sin conexión — se guarda igual
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-fg-muted">
        Escribí y enter. Sin categoría, sin proyecto, sin fecha — eso se define después en{' '}
        <Link to="/triage" className="text-accent underline underline-offset-2">
          Triage
        </Link>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Qué se te ocurrió?"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-fg outline-none focus:border-accent"
        />
        {dictation.supported && (
          <button
            type="button"
            onClick={() => (dictation.listening ? dictation.stop() : dictation.start())}
            title={dictation.listening ? 'Detener dictado' : 'Dictar por voz'}
            className={`shrink-0 rounded-md border px-3 transition-all duration-150 active:scale-95 ${
              dictation.listening
                ? 'border-accent/40 bg-accent/10 text-accent shadow-[0_0_12px_rgba(217,169,74,0.3)] animate-pulse'
                : 'border-border text-fg-muted hover:bg-surface-2'
            }`}
          >
            {dictation.listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        )}
      </form>

      <div className="mt-6">
        {isLoading && <p className="text-sm text-fg-muted">Cargando…</p>}
        {items && items.length > 0 && (
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-all duration-150 hover:border-accent/30"
              >
                <span className="text-fg">
                  {item.title}
                  {item.id.startsWith('optimistic-') && (
                    <span className="ml-2 text-xs text-fg-muted">pendiente de sincronizar</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => deleteTask.mutate(item.id)}
                  className="shrink-0 text-fg-muted hover:text-fg"
                  aria-label="Descartar"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <InboxTopBar onOpenTask={setEditingTask} />
        {items && items.length === 0 && (
          <div className="mt-3">
            <InboxEmptyState onOpenTask={setEditingTask} />
          </div>
        )}
      </div>

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

export async function createColumn(input: {
  projectId: string | null
  name: string
  position: number
}): Promise<KanbanColumn> {
  const { data, error } = await supabase
    .from('kanban_columns')
    .insert({ project_id: input.projectId, name: input.name, position: input.position })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function renameColumn(id: string, name: string): Promise<KanbanColumn> {
  const { data, error } = await supabase
    .from('kanban_columns')
    .update({ name })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateColumnPosition(id: string, position: number): Promise<void> {
  const { error } = await supabase.from('kanban_columns').update({ position }).eq('id', id)
  if (error) throw error
}

export async function deleteColumn(id: string): Promise<void> {
  const { error } = await supabase.from('kanban_columns').delete().eq('id', id)
  if (error) throw error
}
```

### src/features/kanban/components/KanbanBoard.tsx

```tsx
import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  addDays,
  endOfMonth,
  endOfWeek,
  isPast,
  isToday,
  isTomorrow,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { useCreateColumn, useKanbanColumns, useUpdateColumnPosition } from '@/features/kanban/hooks'
import { useBoardTasks, useUpdateTask } from '@/features/tasks/hooks'
import { useCategories } from '@/features/projects/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { KanbanColumn } from '@/features/kanban/components/KanbanColumn'
import type { Task } from '@/types/database.types'

const COLUMN_NAME_TO_STATUS: Record<string, 'pending' | 'in_progress' | 'done'> = {
  'Por hacer': 'pending',
  'En progreso': 'in_progress',
  Hecho: 'done',
}

export type DateFilter = 'all' | 'overdue' | 'today' | 'tomorrow' | 'weekend' | 'week' | 'month'

const DATE_FILTERS: { key: DateFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'overdue', label: 'Vencidas' },
  { key: 'today', label: 'Hoy' },
  { key: 'tomorrow', label: 'Mañana' },
  { key: 'weekend', label: 'Fin de semana' },
  { key: 'week', label: 'Esta semana' },
  { key: 'month', label: 'Este mes' },
]

function matchesDateFilter(task: Task, filter: DateFilter, now: Date): boolean {
  if (filter === 'all') return true
  if (!task.deadline) return false
  const deadline = new Date(task.deadline)

  switch (filter) {
    case 'overdue':
      return task.status !== 'done' && isPast(deadline)
    case 'today':
      return isToday(deadline)
    case 'tomorrow':
      return isTomorrow(deadline)
    case 'weekend': {
      const monday = startOfWeek(now, { weekStartsOn: 1 })
      return isWithinInterval(deadline, { start: addDays(monday, 5), end: addDays(monday, 7) })
    }
    case 'week':
      return isWithinInterval(deadline, {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 }),
      })
    case 'month':
      return isWithinInterval(deadline, { start: startOfMonth(now), end: endOfMonth(now) })
    default:
      return true
  }
}

export function KanbanBoard({
  projectId,
  categoryId,
}: {
  projectId: string | null
  categoryId: string | null
}) {
  const { data: columns, isLoading: columnsLoading } = useKanbanColumns(projectId)
  const { data: tasks, isLoading: tasksLoading } = useBoardTasks(projectId)
  const { data: categories } = useCategories()
  const updateTask = useUpdateTask()
  const updateColumnPosition = useUpdateColumnPosition()
  const createColumn = useCreateColumn()

  const location = useLocation()
  const initialDateFilter = (location.state as { dateFilter?: DateFilter } | null)?.dateFilter

  const [modal, setModal] = useState<
    { mode: 'create'; columnId: string } | { mode: 'edit'; task: Task } | null
  >(null)
  const [dateFilter, setDateFilter] = useState<DateFilter>(initialDateFilter ?? 'all')
  const [hiddenCategoryIds, setHiddenCategoryIds] = useState<Set<string>>(new Set())

  function toggleCategory(id: string) {
    setHiddenCategoryIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const visibleTasks = useMemo(() => {
    const now = new Date()
    return tasks?.filter(
      (t) =>
        !hiddenCategoryIds.has(t.category_id ?? '') && matchesDateFilter(t, dateFilter, now),
    )
  }, [tasks, hiddenCategoryIds, dateFilter])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const targetColumnId = over.id as string
    const task = tasks?.find((t) => t.id === active.id)
    if (!task || task.kanban_column_id === targetColumnId) return

    const targetColumn = columns?.find((c) => c.id === targetColumnId)
    const status = targetColumn ? COLUMN_NAME_TO_STATUS[targetColumn.name] : undefined

    updateTask.mutate({
      id: task.id,
      patch: { kanban_column_id: targetColumnId, ...(status ? { status } : {}) },
    })
  }

  function handleMoveColumn(index: number, direction: -1 | 1) {
    if (!columns) return
    const neighbor = columns[index + direction]
    const current = columns[index]
    if (!neighbor) return
    updateColumnPosition.mutate({ id: current.id, position: neighbor.position })
    updateColumnPosition.mutate({ id: neighbor.id, position: current.position })
  }

  function handleAddColumn() {
    const maxPosition = columns?.reduce((max, c) => Math.max(max, c.position), 0) ?? 0
    createColumn.mutate({ projectId, name: 'Nueva columna', position: maxPosition + 1 })
  }

  if (columnsLoading || tasksLoading) {
    return <p className="p-6 text-sm text-fg-muted">Cargando…</p>
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-3">
        <div className="flex flex-wrap gap-1 rounded-md bg-surface-2 p-1">
          {DATE_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setDateFilter(f.key)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                dateFilter === f.key ? 'bg-surface text-fg shadow-sm' : 'text-fg-muted hover:text-fg'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories?.map((cat) => {
            const active = !hiddenCategoryIds.has(cat.id)
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors ${
                  active ? 'border-transparent text-fg' : 'border-border text-fg-muted/50'
                }`}
                style={active ? { backgroundColor: `${cat.color_hex}1a` } : undefined}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: active ? cat.color_hex : undefined }}
                />
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-3 overflow-x-auto p-6">
          {columns?.map((column, index) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={visibleTasks?.filter((t) => t.kanban_column_id === column.id) ?? []}
              canMoveLeft={index > 0}
              canMoveRight={index < columns.length - 1}
              onOpenTask={(task) => setModal({ mode: 'edit', task })}
              onAddTask={(columnId) => setModal({ mode: 'create', columnId })}
              onMoveLeft={() => handleMoveColumn(index, -1)}
              onMoveRight={() => handleMoveColumn(index, 1)}
            />
          ))}
          <button
            type="button"
            onClick={handleAddColumn}
            className="h-fit shrink-0 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-fg-muted transition-all duration-150 hover:border-accent/50 hover:text-accent active:scale-95"
          >
            + Columna
          </button>
        </div>
      </DndContext>

      {modal && (
        <TaskModal
          task={modal.mode === 'edit' ? modal.task : null}
          defaultProjectId={projectId}
          defaultKanbanColumnId={modal.mode === 'create' ? modal.columnId : ''}
          defaultCategoryId={categoryId}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}
```

### src/features/kanban/components/KanbanColumn.tsx

```tsx
import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { TaskCard } from '@/features/tasks/components/TaskCard'
import { useDeleteColumn, useRenameColumn } from '@/features/kanban/hooks'
import type { KanbanColumn as KanbanColumnType, Task } from '@/types/database.types'

export function KanbanColumn({
  column,
  tasks,
  canMoveLeft,
  canMoveRight,
  onOpenTask,
  onAddTask,
  onMoveLeft,
  onMoveRight,
}: {
  column: KanbanColumnType
  tasks: Task[]
  canMoveLeft: boolean
  canMoveRight: boolean
  onOpenTask: (task: Task) => void
  onAddTask: (columnId: string) => void
  onMoveLeft: () => void
  onMoveRight: () => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })
  const renameColumn = useRenameColumn()
  const deleteColumn = useDeleteColumn()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(column.name)

  function handleRenameSubmit() {
    setEditing(false)
    const trimmed = name.trim()
    if (trimmed && trimmed !== column.name) {
      renameColumn.mutate({ id: column.id, name: trimmed })
    } else {
      setName(column.name)
    }
  }

  function handleDelete() {
    const warning =
      tasks.length > 0
        ? `Esta columna tiene ${tasks.length} tarjeta(s). Al eliminarla vuelven al inbox para re-triarlas. ¿Continuar?`
        : '¿Eliminar esta columna?'
    if (window.confirm(warning)) {
      deleteColumn.mutate(column.id)
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-lg border p-2 transition-all duration-200 ${
        isOver
          ? 'border-accent/50 bg-accent/5 shadow-[0_0_24px_rgba(217,169,74,0.25)]'
          : 'border-border bg-surface/40'
      }`}
    >
      <div className="flex items-center justify-between gap-1 px-1 py-1">
        <div className="flex min-w-0 items-center gap-1">
          <button
            type="button"
            onClick={onMoveLeft}
            disabled={!canMoveLeft}
            className="text-fg-muted/50 transition-colors hover:text-fg disabled:opacity-0"
            aria-label="Mover columna a la izquierda"
          >
            ‹
          </button>
          {editing ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSubmit()
                if (e.key === 'Escape') {
                  setName(column.name)
                  setEditing(false)
                }
              }}
              className="w-28 rounded border border-border bg-surface px-1 text-sm text-fg"
            />
          ) : (
            <h3
              onClick={() => setEditing(true)}
              className="truncate text-sm font-medium text-fg"
              title="Click para renombrar"
            >
              {column.name} <span className="font-mono text-fg-muted">{tasks.length}</span>
            </h3>
          )}
          <button
            type="button"
            onClick={onMoveRight}
            disabled={!canMoveRight}
            className="text-fg-muted/50 transition-colors hover:text-fg disabled:opacity-0"
            aria-label="Mover columna a la derecha"
          >
            ›
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onAddTask(column.id)}
            className="text-fg-muted transition-colors hover:text-accent"
            aria-label="Nueva tarea"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-fg-muted/60 transition-colors hover:text-warn-fg"
            aria-label="Eliminar columna"
          >
            ×
          </button>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={onOpenTask} />
        ))}
      </div>
    </div>
  )
}
```

### src/features/kanban/components/KanbanPage.tsx

```tsx
import { useNavigate, useParams } from 'react-router-dom'
import { useProjects } from '@/features/projects/hooks'
import { KanbanBoard } from '@/features/kanban/components/KanbanBoard'

export function KanbanPage() {
  const { projectId } = useParams<{ projectId?: string }>()
  const navigate = useNavigate()
  const { data: projects } = useProjects()

  const activeProjectId = projectId ?? null
  const activeProject = projects?.find((p) => p.id === activeProjectId) ?? null

  return (
    <div>
      <div className="flex items-center gap-2 overflow-x-auto border-b border-border px-6 py-3">
        <button
          type="button"
          onClick={() => navigate('/kanban')}
          className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
            !activeProjectId ? 'bg-accent text-accent-fg' : 'text-fg-muted hover:bg-surface-2'
          }`}
        >
          Tareas sueltas
        </button>
        {projects?.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => navigate(`/kanban/${project.id}`)}
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
              activeProjectId === project.id
                ? 'bg-accent text-accent-fg'
                : 'text-fg-muted hover:bg-surface-2'
            }`}
          >
            {project.name}
          </button>
        ))}
      </div>

      <KanbanBoard projectId={activeProjectId} categoryId={activeProject?.category_id ?? null} />
    </div>
  )
}
```

### src/features/kanban/hooks.ts

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createColumn,
  deleteColumn,
  fetchKanbanColumns,
  renameColumn,
  updateColumnPosition,
} from '@/features/kanban/api'

export function useKanbanColumns(projectId: string | null) {
  return useQuery({
    queryKey: ['kanban-columns', projectId],
    queryFn: () => fetchKanbanColumns(projectId),
  })
}

function useInvalidateColumns() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ['kanban-columns'] })
}

export function useCreateColumn() {
  const invalidate = useInvalidateColumns()
  return useMutation({ mutationFn: createColumn, onSuccess: invalidate })
}

export function useRenameColumn() {
  const invalidate = useInvalidateColumns()
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => renameColumn(id, name),
    onSuccess: invalidate,
  })
}

export function useUpdateColumnPosition() {
  const invalidate = useInvalidateColumns()
  return useMutation({
    mutationFn: ({ id, position }: { id: string; position: number }) =>
      updateColumnPosition(id, position),
    onSuccess: invalidate,
  })
}

export function useDeleteColumn() {
  const invalidate = useInvalidateColumns()
  return useMutation({ mutationFn: deleteColumn, onSuccess: invalidate })
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
      alerts.push({ task_id: task.id, type: 'overdue', message: `Vencida: ${task.title}` })
    } else if (days === 0) {
      alerts.push({ task_id: task.id, type: 'due_today', message: `Vence hoy: ${task.title}` })
    } else if (days <= 3) {
      const when = days === 1 ? 'mañana' : `en ${days} días`
      alerts.push({ task_id: task.id, type: 'upcoming', message: `Vence ${when}: ${task.title}` })
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
import { AlertTriangle, Bell, Calendar, Clock, Link2 } from 'lucide-react'
import {
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
  due_today: Calendar,
  overdue: AlertTriangle,
  follow_up: Link2,
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const sync = useSyncNotifications()
  const { data: notifications } = useNotifications()
  const dismiss = useDismissNotification()

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
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-medium text-accent-fg">
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="modal-panel absolute right-0 z-50 mt-2 w-80 rounded-lg border border-border bg-surface p-2 shadow-xl">
            {unread.length === 0 ? (
              <p className="p-3 text-sm text-fg-muted">Sin notificaciones pendientes.</p>
            ) : (
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
import { dismissNotification, fetchNotifications, syncNotifications } from '@/features/notifications/api'

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
import { useTasksByProject } from '@/features/tasks/hooks'
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

  const [rewardModal, setRewardModal] = useState<{ phase: number; xp: number } | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const category = categories?.find((c) => c.id === project?.category_id)
  const occupiedSlots = new Set((hudTasks ?? []).map((t) => t.hud_slot))
  const firstFreeSlot = [1, 2, 3].find((s) => !occupiedSlots.has(s))
  const missions = (tasks ?? []).filter((t) => t.status === 'pending' || t.status === 'in_progress')

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
    return <p className="p-6 text-sm text-fg-muted">Cargando…</p>
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Link
        to="/kanban"
        className="flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver al Grimorio
      </Link>

      <div className="mt-4 flex items-start gap-3">
        <img
          src={bossAvatarSrc(project.boss_avatar)}
          alt={project.boss_title}
          className="h-16 w-16 shrink-0 rounded-full object-cover shadow-[0_0_16px_rgba(0,0,0,0.3)]"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-fg-muted">{project.name}</p>
          <h1 className="font-display text-xl font-bold tracking-wide text-fg">{project.boss_title}</h1>
        </div>
        {category && (
          <span
            className="shrink-0 rounded-full px-2 py-1 text-xs font-medium"
            style={{ backgroundColor: `${category.color_hex}22`, color: category.color_hex }}
          >
            {category.name}
          </span>
        )}
      </div>

      <div className="mt-5 rounded-lg border border-border-card bg-surface-card p-4">
        <BossHealthBar
          totalHp={stats.totalHp}
          currentHp={stats.currentHp}
          percentRemaining={stats.percentRemaining}
          phasesClaimed={project.phases_claimed}
        />
      </div>

      <section className="mt-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-fg-muted">
          Misiones del combate
        </h2>
        {missions.length === 0 ? (
          <p className="mt-2 text-sm text-fg-muted">No hay misiones activas en este proyecto.</p>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {missions.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 rounded-md border border-border bg-surface p-2.5 text-sm"
              >
                <button
                  type="button"
                  onClick={() => setEditingTask(task)}
                  className="min-w-0 flex-1 truncate text-left text-fg"
                >
                  {task.title}
                </button>
                <button
                  type="button"
                  disabled={!firstFreeSlot || task.hud_slot !== null}
                  onClick={() => firstFreeSlot && equipToHud.mutate({ taskId: task.id, slot: firstFreeSlot })}
                  title={
                    task.hud_slot !== null
                      ? 'Ya está equipada en el HUD'
                      : firstFreeSlot
                        ? `Equipar en Slot ${firstFreeSlot}`
                        : 'Los 3 slots de combate están ocupados'
                  }
                  className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-fg-muted transition-all duration-150 hover:border-accent/40 hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-fg-muted"
                >
                  <Swords className="h-3.5 w-3.5" />
                  {task.hud_slot !== null ? 'En HUD' : 'Equipar'}
                </button>
              </li>
            ))}
          </ul>
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
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-sm uppercase tracking-wide text-fg-muted">HP del jefe</span>
        <span className="font-mono text-lg font-semibold text-fg">
          {currentHp} / {totalHp} HP
        </span>
      </div>
      <div className="relative mt-2 h-4 overflow-hidden rounded-full border border-border-card bg-surface-2">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{
            width: `${percentRemaining}%`,
            background: 'linear-gradient(90deg, var(--hp-critical), var(--hp-full))',
            boxShadow: '0 0 12px var(--hp-full)',
          }}
        />
        {BOSS_PHASES.filter((p) => p > 0).map((phase) => (
          <div
            key={phase}
            className="absolute top-0 h-full w-px bg-black/25"
            style={{ left: `${phase}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between px-0.5">
        {BOSS_PHASES.map((phase) => {
          const claimed = phasesClaimed.includes(phase)
          return (
            <img
              key={phase}
              src={LOOT_ICONS.chest_phase}
              alt={phase === 0 ? 'Jefe derrotado' : `Fase ${phase}% de HP`}
              title={phase === 0 ? 'Jefe derrotado' : `Fase ${phase}% de HP`}
              className={`h-6 w-6 object-contain transition-all duration-300 ${
                claimed ? 'opacity-100 drop-shadow-[0_0_6px_var(--phase-shield)]' : 'opacity-30 grayscale'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
```

### src/features/projects/components/PhaseRewardModal.tsx

```tsx
import { useEffect, useRef } from 'react'
import { LOOT_ICONS } from '@/utils/rpgAssets'

const AUTO_DISMISS_MS = 3400

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
  }, [phase, onDone])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onDone}
      role="status"
      aria-live="polite"
    >
      <div ref={stageRef} className="relative flex h-72 w-full max-w-sm items-center justify-center">
        <div className="achievement-modal relative rounded-2xl border border-gold bg-surface px-10 py-8 text-center">
          <div className="mx-auto mb-3.5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--gold-bright),var(--gold)_60%,#7a5a1e_100%)] shadow-[inset_0_0_12px_rgba(0,0,0,0.35)]">
            {isDefeat ? (
              <span className="text-3xl">🏆</span>
            ) : (
              <img src={LOOT_ICONS.chest_phase} alt="Cofre de fase" className="h-11 w-11 object-contain" />
            )}
          </div>
          <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-gold-bright">
            {isDefeat ? 'Jefe derrotado' : `Fase ${phase}% rota`}
          </div>
          <div className="font-display text-2xl font-black tracking-wide text-fg">
            {isDefeat ? '¡Victoria!' : '¡Golpe crítico!'}
          </div>
          <p className="mt-1.5 text-sm text-fg-muted">+{xp} XP</p>
        </div>
      </div>
    </div>
  )
}
```

### src/features/projects/components/ProjectBossCard.tsx

```tsx
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
  fetchCategories,
  fetchProjectById,
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

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
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

export async function fetchActiveTasksWithDeadline(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
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

export async function fetchBoardTasks(projectId: string | null): Promise<Task[]> {
  const query = supabase
    .from('tasks')
    .select('*')
    .is('parent_task_id', null)
    .not('kanban_column_id', 'is', null)
    .neq('status', 'follow_up')
  const { data, error } = await (projectId
    ? query.eq('project_id', projectId)
    : query.is('project_id', null))
  if (error) throw error
  return data
}

export async function fetchSubtasks(parentTaskId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('parent_task_id', parentTaskId)
    .order('deadline', { ascending: true, nullsFirst: false })
  if (error) throw error
  return data
}

export async function fetchTasksInRange(startIso: string, endIso: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
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
  return updateTask(task.id, {
    status: 'done',
    hud_slot: null,
    ...(doneColumn ? { kanban_column_id: doneColumn.id } : {}),
  })
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

const MAX_TASKS = 3

function FocusFloatContent() {
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
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-all duration-150 hover:shadow-[0_0_10px_rgba(217,169,74,0.5)] active:scale-90"
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
            ? 'text-accent drop-shadow-[0_0_6px_rgba(217,169,74,0.5)]'
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

### src/features/tasks/components/TaskCard.tsx

```tsx
import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { format, isPast } from 'date-fns'
import { Check, Link2, Undo2 } from 'lucide-react'
import { useCategories } from '@/features/projects/hooks'
import { useCompleteTask, useReopenTask, useSubtasks, useUpdateTask } from '@/features/tasks/hooks'
import { useFollowUpForTask, useSendToFollowUp } from '@/features/followups/hooks'
import type { Task } from '@/types/database.types'

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

export function TaskCard({ task, onOpen }: { task: Task; onOpen: (task: Task) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  })
  const { data: categories } = useCategories()
  const [showSubtasks, setShowSubtasks] = useState(false)
  const { data: subtasks } = useSubtasks(task.id)
  const { data: followUp } = useFollowUpForTask(task.id)
  const updateTask = useUpdateTask()
  const completeTask = useCompleteTask()
  const reopenTask = useReopenTask()
  const sendToFollowUp = useSendToFollowUp()

  const category = categories?.find((c) => c.id === task.category_id)
  const overdue =
    task.status !== 'done' && task.deadline !== null && isPast(new Date(task.deadline))
  const doneCount = subtasks?.filter((s) => s.status === 'done').length ?? 0

  return (
    <div
      ref={setNodeRef}
      className={`rounded-md border bg-surface-2 p-3 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_12px_30px_rgba(139,92,246,0.18)] active:translate-y-0 active:scale-[0.99] ${
        task.status === 'in_progress'
          ? 'border-gold/50 shadow-[0_0_14px_rgba(217,169,74,0.25)]'
          : 'border-border'
      } ${task.status === 'done' ? 'opacity-60' : ''} ${isDragging ? 'opacity-50' : ''}`}
      style={{
        ...(transform
          ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 10 }
          : undefined),
        borderLeft: category ? `3px solid ${category.color_hex}` : undefined,
      }}
    >
      <div
        {...listeners}
        {...attributes}
        onClick={() => onOpen(task)}
        className="cursor-grab active:cursor-grabbing"
      >
        <p className={`font-medium text-fg ${task.status === 'done' ? 'line-through' : ''}`}>
          {task.title}
          {task.status === 'done' && (
            <span
              title="Completada"
              className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full align-middle text-[9px] text-accent-fg shadow-[inset_0_0_3px_rgba(0,0,0,0.4)]"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, var(--gold-bright), var(--gold) 70%, #7a5a1e 100%)',
              }}
            >
              ✓
            </span>
          )}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {category && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
              style={{ backgroundColor: `${category.color_hex}1f`, color: category.color_hex }}
            >
              {category.name}
            </span>
          )}
          {task.deadline && (
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-xs ${
                overdue ? 'bg-warn-bg text-warn-fg' : 'bg-surface-2 text-fg-muted'
              }`}
            >
              {format(new Date(task.deadline), 'd MMM')}
            </span>
          )}
          {followUp && (
            <span
              className="inline-flex items-center gap-0.5 rounded-full bg-sky-500/15 px-1.5 py-0.5 text-xs text-sky-500"
              title="Follow-up activo"
            >
              <Link2 className="h-3 w-3" />
            </span>
          )}
        </div>
      </div>

      {subtasks && subtasks.length > 0 && (
        <div className="mt-2 border-t border-border pt-2">
          <button
            type="button"
            onClick={() => setShowSubtasks((v) => !v)}
            className="font-mono text-xs text-fg-muted hover:text-fg"
          >
            {showSubtasks ? '▾' : '▸'} {doneCount}/{subtasks.length} subtareas
          </button>
          {showSubtasks && (
            <ul className="mt-1.5 flex flex-col gap-1">
              {subtasks.map((subtask) => (
                <li key={subtask.id} className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={subtask.status === 'done'}
                    onChange={(e) =>
                      updateTask.mutate({
                        id: subtask.id,
                        patch: { status: e.target.checked ? 'done' : 'pending' },
                      })
                    }
                    className="h-3 w-3 accent-accent"
                  />
                  <span className={subtask.status === 'done' ? 'text-fg-muted line-through' : 'text-fg'}>
                    {subtask.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-2 flex items-center justify-end gap-1.5 border-t border-border pt-2">
        {task.status === 'done' ? (
          <button
            type="button"
            onClick={() => reopenTask.mutate({ id: task.id, project_id: task.project_id })}
            title="Reabrir tarea"
            className="flex items-center gap-1 rounded-full px-2 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() =>
                sendToFollowUp.mutate({
                  taskId: task.id,
                  intervalDays: DEFAULT_FOLLOW_UP_INTERVAL_DAYS,
                  stakeholderName: null,
                })
              }
              title="Enviar a Follow-up (cada 7 días, editable después)"
              className="flex items-center gap-1 rounded-full border border-border px-2 py-1 text-xs text-fg-muted transition-all duration-150 hover:border-sky-500/40 hover:text-sky-500 active:scale-95"
            >
              <Link2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => completeTask.mutate({ id: task.id, project_id: task.project_id })}
              title="Completar tarea"
              className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_0_14px_rgba(217,169,74,0.45)] active:scale-95"
            >
              <Check className="h-3.5 w-3.5" /> Completar
            </button>
          </>
        )}
      </div>
    </div>
  )
}
```

### src/features/tasks/components/TaskModal.tsx

```tsx
import { useState, type FormEvent } from 'react'
import { Check, Link2, Undo2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useCategories } from '@/features/projects/hooks'
import {
  useCompleteTask,
  useCreateTask,
  useDeleteTask,
  useReopenTask,
  useSubtasks,
  useUpdateTask,
} from '@/features/tasks/hooks'
import {
  useClearTodayPriority,
  useSetTodayPriority,
  useTodayQuests,
} from '@/features/gamification/hooks'
import {
  useDeleteFollowUp,
  useFollowUpForTask,
  useRegisterFollowUpContact,
  useSendToFollowUp,
} from '@/features/followups/hooks'
import { fromDatetimeLocalValue, toDatetimeLocalValue } from '@/utils/datetime'
import type { Task, TaskSize } from '@/types/database.types'

const DEFAULT_FOLLOW_UP_INTERVAL_DAYS = 7

const SIZE_OPTIONS: { value: TaskSize; label: string; xp: number }[] = [
  { value: 'small', label: 'Pequeña', xp: 10 },
  { value: 'medium', label: 'Mediana', xp: 25 },
  { value: 'large', label: 'Grande', xp: 50 },
]

export function TaskModal({
  task,
  defaultProjectId,
  defaultKanbanColumnId,
  defaultCategoryId,
  onClose,
}: {
  task: Task | null
  defaultProjectId: string | null
  defaultKanbanColumnId: string
  defaultCategoryId?: string | null
  onClose: () => void
}) {
  const { data: categories } = useCategories()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()
  const completeTask = useCompleteTask()
  const reopenTask = useReopenTask()
  const { data: subtasks } = useSubtasks(task?.id ?? null)
  const { data: todayQuests } = useTodayQuests()
  const setTodayPriority = useSetTodayPriority()
  const clearTodayPriority = useClearTodayPriority()
  const { data: existingFollowUp } = useFollowUpForTask(task?.id ?? null)
  const sendToFollowUp = useSendToFollowUp()
  const deleteFollowUp = useDeleteFollowUp()
  const registerContact = useRegisterFollowUpContact()

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [categoryId, setCategoryId] = useState(task?.category_id ?? defaultCategoryId ?? '')
  const [deadline, setDeadline] = useState(toDatetimeLocalValue(task?.deadline ?? null))
  const [size, setSize] = useState<TaskSize | null>(task?.size ?? null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showFollowUpForm, setShowFollowUpForm] = useState(false)
  const [followUpIntervalDays, setFollowUpIntervalDays] = useState(DEFAULT_FOLLOW_UP_INTERVAL_DAYS)
  const [followUpStakeholder, setFollowUpStakeholder] = useState('')

  function handleComplete() {
    if (!task) return
    completeTask.mutate({ id: task.id, project_id: task.project_id })
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

  const priorityQuest = todayQuests?.find((q) => q.type === 'daily_priority')
  const isTodayPriority = !!task && priorityQuest?.task_id === task.id
  const canBePriority = !!task && task.parent_task_id === null

  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [newSubtaskDeadline, setNewSubtaskDeadline] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || !deadline) {
      setError('Título y deadline son obligatorios.')
      return
    }
    setError(null)
    setSaving(true)
    try {
      if (task) {
        await updateTask.mutateAsync({
          id: task.id,
          patch: {
            title: title.trim(),
            description: description.trim() || null,
            category_id: categoryId || null,
            deadline: fromDatetimeLocalValue(deadline),
            size,
          },
        })
      } else {
        await createTask.mutateAsync({
          title: title.trim(),
          description: description.trim() || null,
          category_id: categoryId || null,
          deadline: fromDatetimeLocalValue(deadline),
          project_id: defaultProjectId,
          kanban_column_id: defaultKanbanColumnId,
          size,
        })
      }

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar.')
    } finally {
      setSaving(false)
    }
  }

  async function handleAddSubtask(event: FormEvent) {
    event.preventDefault()
    if (!task || !newSubtaskTitle.trim() || !newSubtaskDeadline) return
    try {
      await createTask.mutateAsync({
        title: newSubtaskTitle.trim(),
        parent_task_id: task.id,
        project_id: task.project_id,
        deadline: fromDatetimeLocalValue(newSubtaskDeadline),
      })
      setNewSubtaskTitle('')
      setNewSubtaskDeadline('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la subtarea.')
    }
  }

  function handleDelete() {
    if (!task) return
    if (!window.confirm('¿Borrar esta tarea?')) return
    deleteTask.mutate(task.id)
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold tracking-tight text-fg">
          {task ? 'Editar tarea' : 'Nueva tarea'}
        </h2>
        {task &&
          (task.status === 'done' ? (
            <button
              type="button"
              onClick={handleReopen}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              <Undo2 className="h-4 w-4" /> Reabrir
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-accent-fg transition-all duration-150 hover:shadow-[0_0_18px_rgba(217,169,74,0.45)] active:scale-95"
            >
              <Check className="h-4 w-4" /> Completar
            </button>
          ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          autoFocus
          className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          rows={2}
          className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
        />
        <div className="flex gap-2">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
          >
            <option value="" disabled>
              Categoría
            </option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="flex-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSize(size === opt.value ? null : opt.value)}
                title={`+${opt.xp} XP`}
                className={`rounded-md border px-2 py-1 font-mono text-xs transition-all duration-150 active:scale-95 ${
                  size === opt.value
                    ? 'border-accent bg-accent text-accent-fg shadow-[0_0_12px_rgba(217,169,74,0.35)]'
                    : 'border-border text-fg-muted hover:bg-surface-2'
                }`}
              >
                {opt.label} <span className="opacity-60">+{opt.xp}</span>
              </button>
            ))}
          </div>

          {canBePriority && task && (
            <button
              type="button"
              onClick={() =>
                isTodayPriority ? clearTodayPriority.mutate() : setTodayPriority.mutate(task.id)
              }
              title="Prioridad de hoy"
              className={`text-lg leading-none transition-all duration-150 hover:scale-110 active:scale-95 ${
                isTodayPriority ? 'text-accent drop-shadow-[0_0_6px_rgba(217,169,74,0.6)]' : 'text-fg-muted/40 hover:text-accent/60'
              }`}
            >
              {isTodayPriority ? '★' : '☆'}
            </button>
          )}
        </div>

        {task && task.status !== 'follow_up' && task.status !== 'done' && (
          <div className="rounded-md border border-border p-2">
            {showFollowUpForm ? (
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs text-fg-muted">
                    Cada
                    <input
                      type="number"
                      min={1}
                      value={followUpIntervalDays}
                      onChange={(e) => setFollowUpIntervalDays(Number(e.target.value) || 1)}
                      className="w-14 rounded border border-border bg-surface-2 px-1.5 py-1 font-mono text-sm text-fg"
                    />
                    días
                  </label>
                  <input
                    value={followUpStakeholder}
                    onChange={(e) => setFollowUpStakeholder(e.target.value)}
                    placeholder="Nombre del stakeholder (opcional)"
                    className="flex-1 rounded border border-border bg-surface-2 px-2 py-1 text-sm text-fg"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmFollowUp}
                    className="rounded-md bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-500 transition-colors hover:bg-sky-500/25"
                  >
                    Confirmar seguimiento
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFollowUpForm(false)}
                    className="rounded-md px-3 py-1 text-xs text-fg-muted hover:bg-surface-2"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowFollowUpForm(true)}
                className="flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-sky-500"
              >
                <Link2 className="h-3.5 w-3.5" /> Enviar a Follow-up
              </button>
            )}
          </div>
        )}

        {existingFollowUp && (
          <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2">
            <p className="flex items-center gap-1.5 text-sm text-fg">
              <Link2 className="h-3.5 w-3.5 text-sky-500" />
              En seguimiento
              {existingFollowUp.stakeholder_name ? ` con ${existingFollowUp.stakeholder_name}` : ''} · cada{' '}
              {existingFollowUp.interval_days} días
            </p>
            <div className="mt-1.5 flex items-center justify-between text-xs text-fg-muted">
              <span className="font-mono">
                Próximo recordatorio:{' '}
                {toDatetimeLocalValue(existingFollowUp.next_reminder_at).slice(0, 10)}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancelFollowUp}
                  className="rounded border border-border px-2 py-0.5 text-fg-muted transition-colors hover:bg-surface-2"
                >
                  Cancelar seguimiento
                </button>
                <button
                  type="button"
                  onClick={() => registerContact.mutate(existingFollowUp.id)}
                  className="rounded border border-border px-2 py-0.5 text-fg-muted transition-colors hover:bg-surface-2"
                >
                  Registrar contacto ahora
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-warn-fg">{error}</p>}

        <div className="mt-1 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_4px_20px_rgba(217,169,74,0.4)] active:scale-[0.98] disabled:opacity-60 disabled:hover:shadow-none"
          >
            Guardar
          </button>
          {task && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-warn-fg"
            >
              Borrar
            </button>
          )}
        </div>
      </form>

      {task && (
        <div className="mt-5 border-t border-border pt-4">
          <h3 className="text-sm font-medium text-fg-muted">Subtareas</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {subtasks?.map((subtask) => (
              <li key={subtask.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={subtask.status === 'done'}
                  onChange={(e) =>
                    updateTask.mutate({
                      id: subtask.id,
                      patch: { status: e.target.checked ? 'done' : 'pending' },
                    })
                  }
                  className="accent-accent"
                />
                <span
                  className={subtask.status === 'done' ? 'flex-1 text-fg-muted line-through' : 'flex-1 text-fg'}
                >
                  {subtask.title}
                </span>
                {subtask.deadline && (
                  <span className="font-mono text-xs text-fg-muted">
                    {toDatetimeLocalValue(subtask.deadline).slice(0, 10)}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => deleteTask.mutate(subtask.id)}
                  className="text-fg-muted hover:text-fg"
                  aria-label="Borrar subtarea"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddSubtask} className="mt-2 flex gap-2">
            <input
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              placeholder="Nueva subtarea"
              className="flex-1 rounded-md border border-border bg-surface-2 px-2 py-1 text-sm text-fg outline-none focus:border-accent"
            />
            <input
              type="datetime-local"
              value={newSubtaskDeadline}
              onChange={(e) => setNewSubtaskDeadline(e.target.value)}
              className="rounded-md border border-border bg-surface-2 px-2 py-1 text-sm text-fg outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="rounded-md border border-border px-2 py-1 text-sm text-fg-muted hover:bg-surface-2"
            >
              +
            </button>
          </form>
        </div>
      )}
    </Modal>
  )
}
```

### src/features/tasks/FocusFloatContext.tsx

```tsx
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
  const supported = !!getPipApi()

  async function open() {
    if (pipWindow) return
    const api = getPipApi()
    if (!api) return
    const win = await api.requestWindow({ width: 320, height: 220 })
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

### src/features/tasks/hooks.ts

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  completeTask,
  createTask,
  deleteTask,
  fetchActiveTasksWithDeadline,
  fetchBoardTasks,
  fetchInboxTasks,
  fetchInProgressTasks,
  fetchLastCompletedTask,
  fetchQuickWinTask,
  fetchSubtasks,
  fetchTaskById,
  fetchTasksByIds,
  fetchTasksByProject,
  fetchTasksCompletedToday,
  fetchTasksInRange,
  reopenTask,
  sendTaskToFollowUp,
  updateTask,
} from '@/features/tasks/api'
import type { Task } from '@/types/database.types'

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

export function useBoardTasks(projectId: string | null) {
  return useQuery({
    queryKey: ['tasks', 'board', projectId],
    queryFn: () => fetchBoardTasks(projectId),
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

export function useDeleteTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: invalidate,
  })
}

export function useCompleteTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({ mutationFn: completeTask, onSuccess: invalidate })
}

export function useReopenTask() {
  const invalidate = useInvalidateTasks()
  return useMutation({ mutationFn: reopenTask, onSuccess: invalidate })
}

export function useSendTaskToFollowUp() {
  const invalidate = useInvalidateTasks()
  return useMutation({ mutationFn: sendTaskToFollowUp, onSuccess: invalidate })
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
        hud_slot: null,
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

### src/features/triage/components/DirectEquipToggle.tsx

```tsx
import { Swords } from 'lucide-react'

export function DirectEquipToggle({
  disabled,
  onClick,
}: {
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={disabled ? 'Los 3 slots de combate están ocupados' : 'Guardar y equipar de inmediato en el Battle HUD'}
      className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-accent/40 px-3 py-1.5 text-sm font-medium text-accent transition-all duration-150 hover:bg-accent/10 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-transparent"
    >
      <Swords className="h-4 w-4" /> Equipar en Combate
    </button>
  )
}
```

### src/features/triage/components/InboxCardDeck.tsx

```tsx
import { addDays, format } from 'date-fns'

function quickDeadline(daysFromNow: number): string {
  const d = addDays(new Date(), daysFromNow)
  d.setHours(18, 0, 0, 0)
  return format(d, "yyyy-MM-dd'T'HH:mm")
}

export function InboxCardDeck({
  remainingCount,
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
    <div className="relative">
      {/* Cartas apiladas detrás — sugieren cuántas misiones más esperan */}
      {remainingCount > 2 && (
        <div className="absolute inset-x-4 -top-2 h-full rounded-lg border border-border-card bg-surface-card/60" />
      )}
      {remainingCount > 1 && (
        <div className="absolute inset-x-2 -top-1 h-full rounded-lg border border-border-card bg-surface-card/80" />
      )}

      <div className="relative rounded-lg border border-border-card bg-surface-card p-4">
        <textarea
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          rows={2}
          className="w-full resize-none bg-transparent font-display text-lg font-semibold text-fg outline-none"
          placeholder="Título de la misión"
        />

        <label className="mt-3 flex flex-col gap-1 text-sm text-fg-muted">
          Deadline
          <div className="flex flex-wrap gap-1.5">
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => onDeadlineChange(e.target.value)}
              className="min-w-0 flex-1 rounded-md border border-border bg-surface px-3 py-1.5 text-fg outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => onDeadlineChange(quickDeadline(0))}
              className="rounded-md border border-border px-2.5 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => onDeadlineChange(quickDeadline(1))}
              className="rounded-md border border-border px-2.5 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              Mañana
            </button>
          </div>
        </label>
      </div>
    </div>
  )
}
```

### src/features/triage/components/StrategyTablePage.tsx

```tsx
import { useEffect, useState } from 'react'
import { Link2 } from 'lucide-react'
import { useCategories, useCreateProject, useProjects } from '@/features/projects/hooks'
import { useHudTasks } from '@/features/battle-hud/hooks'
import { useTriageSession } from '@/features/triage/hooks'
import { fromDatetimeLocalValue } from '@/utils/datetime'
import { WeaponSelector } from '@/features/triage/components/WeaponSelector'
import { InboxCardDeck } from '@/features/triage/components/InboxCardDeck'
import { DirectEquipToggle } from '@/features/triage/components/DirectEquipToggle'
import type { TaskSize } from '@/types/database.types'
import type { DispatchOutcome } from '@/features/triage/api'

const NEW_PROJECT = '__new__'
const NO_PROJECT = ''

export function StrategyTablePage() {
  const { current, remainingCount, isLoading, dispatch } = useTriageSession()
  const { data: categories } = useCategories()
  const { data: projects } = useProjects()
  const createProject = useCreateProject()
  const { data: hudTasks } = useHudTasks()

  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [projectChoice, setProjectChoice] = useState(NO_PROJECT)
  const [newProjectName, setNewProjectName] = useState('')
  const [deadline, setDeadline] = useState('')
  const [size, setSize] = useState<TaskSize | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Cada vez que cambia la carta activa, el formulario arranca de cero.
  useEffect(() => {
    setTitle(current?.title ?? '')
    setCategoryId('')
    setProjectChoice(NO_PROJECT)
    setNewProjectName('')
    setDeadline('')
    setSize(null)
    setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  const occupiedSlots = new Set((hudTasks ?? []).map((t) => t.hud_slot))
  const firstFreeSlot = [1, 2, 3].find((s) => !occupiedSlots.has(s)) ?? null

  async function handleDispatch(outcome: DispatchOutcome) {
    if (!current) return
    setError(null)

    if (!title.trim()) {
      setError('La misión necesita un título.')
      return
    }
    if (!categoryId) {
      setError('Elegí una categoría.')
      return
    }
    if (!deadline) {
      setError('El deadline es obligatorio para sacarla del inbox.')
      return
    }
    if (!size) {
      setError('Elegí un arma (define el tamaño y el XP).')
      return
    }
    if (projectChoice === NEW_PROJECT && !newProjectName.trim()) {
      setError('Ponele nombre al proyecto nuevo.')
      return
    }

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
        categoryId,
        projectId,
        deadlineIso: fromDatetimeLocalValue(deadline),
        size,
        outcome,
        hudSlot: outcome === 'equip' ? firstFreeSlot : null,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo despachar la misión, probá de nuevo.')
    }
  }

  if (isLoading) {
    return <p className="p-6 text-sm text-fg-muted">Cargando…</p>
  }

  if (!current) {
    return (
      <div className="mx-auto max-w-lg p-6 text-center">
        <h1 className="font-display text-lg font-semibold tracking-tight text-fg">Mesa de Estrategia</h1>
        <p className="mt-4 font-display text-xl font-bold text-gold-bright">Maza Limpia — ¡Inbox Vacío!</p>
        <p className="mt-2 text-sm text-fg-muted">No hay misiones capturadas esperando triage.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-lg font-semibold tracking-tight text-fg">Mesa de Estrategia</h1>
        <span className="font-mono text-sm text-fg-muted">{remainingCount} en el inbox</span>
      </div>

      <div className="mt-4">
        <InboxCardDeck
          remainingCount={remainingCount}
          title={title}
          onTitleChange={setTitle}
          deadline={deadline}
          onDeadlineChange={setDeadline}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <div className="flex gap-2">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
          >
            <option value="" disabled>
              Categoría
            </option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={projectChoice}
            onChange={(e) => setProjectChoice(e.target.value)}
            className="flex-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
          >
            <option value={NO_PROJECT}>Tareas sueltas</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
            <option value={NEW_PROJECT}>+ Crear proyecto nuevo…</option>
          </select>
        </div>

        {projectChoice === NEW_PROJECT && (
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Nombre del proyecto"
            className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg outline-none focus:border-accent"
          />
        )}

        <WeaponSelector value={size} onChange={setSize} />

        {error && <p className="text-sm text-warn-fg">{error}</p>}

        <div className="mt-1 flex gap-2">
          <button
            type="button"
            onClick={() => void handleDispatch('grimorio')}
            disabled={dispatch.isPending}
            className="flex-1 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_4px_20px_rgba(217,169,74,0.4)] active:scale-[0.98] disabled:opacity-60"
          >
            Despachar al Grimorio
          </button>
          <DirectEquipToggle
            disabled={dispatch.isPending || firstFreeSlot === null}
            onClick={() => void handleDispatch('equip')}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void handleDispatch('follow_up')}
            disabled={dispatch.isPending}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-sky-500/40 px-3 py-1.5 text-sm font-medium text-sky-500 transition-colors hover:bg-sky-500/10 disabled:opacity-60"
          >
            <Link2 className="h-4 w-4" /> Mover a Seguimiento
          </button>
        </div>
      </div>
    </div>
  )
}
```

### src/features/triage/components/WeaponSelector.tsx

```tsx
import { WEAPON_ICONS } from '@/utils/rpgAssets'
import type { TaskSize } from '@/types/database.types'

const WEAPONS: { value: TaskSize; label: string; xp: number; color: string }[] = [
  { value: 'small', label: 'Daga', xp: 10, color: 'var(--weapon-daga)' },
  { value: 'medium', label: 'Espada', xp: 25, color: 'var(--weapon-espada)' },
  { value: 'large', label: 'Mandoble', xp: 50, color: 'var(--weapon-mandoble)' },
]

export function WeaponSelector({
  value,
  onChange,
}: {
  value: TaskSize | null
  onChange: (size: TaskSize) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {WEAPONS.map((weapon) => {
        const selected = value === weapon.value
        return (
          <button
            key={weapon.value}
            type="button"
            onClick={() => onChange(weapon.value)}
            className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all duration-150 active:scale-95"
            style={{
              borderColor: selected ? weapon.color : 'var(--border-card)',
              backgroundColor: selected ? `${weapon.color}1a` : 'var(--surface-card)',
              boxShadow: selected ? `0 0 16px ${weapon.color}55` : undefined,
            }}
          >
            <img src={WEAPON_ICONS[weapon.value]} alt={weapon.label} className="h-10 w-10 object-contain" />
            <span className="font-display text-sm font-semibold" style={{ color: selected ? weapon.color : undefined }}>
              {weapon.label}
            </span>
            <span className="font-mono text-xs text-fg-muted">+{weapon.xp} XP</span>
          </button>
        )
      })}
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
   acá solo se registran como utilidades de Tailwind (bg-bg, text-fg, etc). */
@theme {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent-fg: var(--accent-fg);
  --color-gold: var(--gold);
  --color-gold-bright: var(--gold-bright);
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
  --color-warn-bg: var(--warn-bg);
  --color-warn-fg: var(--warn-fg);
  --color-warn-border: var(--warn-border);

  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
  --font-display: "Cinzel", ui-sans-serif, serif;
}

:root {
  color-scheme: light dark;

  /* claro — respaldo, mismo requisito de spec de siempre soportar ambos */
  --bg: #faf9f6;
  --surface: #ffffff;
  --surface-2: #f1efe9;
  --fg: #181814;
  --fg-muted: #6b6862;
  --border: rgba(20, 18, 14, 0.1);
  --accent: #b8791a;
  --accent-fg: #ffffff;
  --gold: #b8791a;
  --gold-bright: #8a5a10;
  --surface-card: #f5f0e6;
  --border-card: rgba(20, 18, 14, 0.16);
  --border-glow: rgba(20, 18, 14, 0.24);
  --accent-runic: #7c3aed;
  /* Dungeon Bosses (Fase 7, Módulo 2): HP del jefe, mismos valores en claro
     y oscuro (la spec de Gemini no distinguió tema para estos). */
  --hp-full: #dc2626;
  --hp-critical: #991b1b;
  --phase-shield: var(--gold);
  /* Mesa de Estrategia (Fase 7, Módulo 3): cartas de arma/dificultad,
     mismos valores en claro y oscuro. */
  --weapon-daga: #059669;
  --weapon-espada: #2563eb;
  --weapon-mandoble: #d9a94a;
  --warn-bg: #fef3e2;
  --warn-fg: #92400e;
  --warn-border: rgba(217, 119, 6, 0.3);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* oscuro — identidad principal: fantasía RPG, base ciruela profunda + acento oro.
       Valores afinados en el Módulo 4 (Design System) de Fase 7 — Gemini dio
       hex fijos sin distinguir tema; se aplican acá del lado oscuro nomás,
       preservando el respaldo claro de arriba (ver HANDOFF, Fase 7 Módulo 4). */
    --bg: #120c18;
    --surface: #1e1526;
    --surface-2: #281c33;
    --fg: #f3ece4;
    --fg-muted: #a395b0;
    --border: #3d2a4e;
    --border-glow: #63437f;
    --accent: #d9a94a;
    --accent-fg: #241705;
    --accent-runic: #7c3aed;
    --gold: #d9a94a;
    --gold-bright: #f0be5d;
    /* Battle HUD (Fase 7, Módulo 1): superficie/borde de las Combat Slot Cards. */
    --surface-card: #2d1f3b;
    --border-card: #3d2a4e;
    --warn-bg: rgba(146, 64, 14, 0.25);
    --warn-fg: #fcd9a8;
    --warn-border: rgba(217, 119, 6, 0.4);
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
    background: radial-gradient(circle at 20% 0%, #251636 0%, var(--bg) 55%);
  }
}

/* Fondo ambiental (ver AmbientBackground.tsx) */
.ambient-aurora {
  opacity: 0.5;
  filter: blur(60px);
  background: conic-gradient(
    from 0deg at 50% 50%,
    #8b5cf655,
    #f0c36433,
    #ec489944,
    #3b82f633,
    #8b5cf655
  );
  animation: ambient-spin 40s linear infinite;
}

.ambient-mote {
  background: radial-gradient(circle, var(--gold-bright), transparent 70%);
  opacity: 0.75;
  animation: ambient-float linear infinite;
}

@keyframes ambient-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ambient-float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-115vh) translateX(var(--drift, 20px));
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient-aurora,
  .ambient-mote {
    animation: none;
  }
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
    box-shadow: 0 0 0 rgba(240, 195, 100, 0);
  }
  60% {
    opacity: 1;
    transform: scale(1.05);
    box-shadow: 0 0 60px rgba(240, 195, 100, 0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 40px rgba(240, 195, 100, 0.35);
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
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
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
export type NotificationType = 'upcoming' | 'due_today' | 'overdue' | 'follow_up'

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
          hud_slot: number | null
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
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['follow_ups']['Insert']>
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
export type AppNotification = Database['public']['Tables']['notifications']['Row']
export type PushSubscriptionRow = Database['public']['Tables']['push_subscriptions']['Row']
```

### src/utils/categoryIcon.tsx

```tsx
import type { ComponentType } from 'react'
import { Brain, Car, BookOpen, Gamepad2, Heart, Home, Sparkles, type LucideProps } from 'lucide-react'

const ICONS: Record<string, ComponentType<LucideProps>> = {
  brain: Brain,
  car: Car,
  'book-open': BookOpen,
  'gamepad-2': Gamepad2,
  heart: Heart,
  home: Home,
}

export function CategoryIcon({ iconName, ...props }: { iconName: string } & LucideProps) {
  const Icon = ICONS[iconName] ?? Sparkles
  return <Icon {...props} />
}
```

### src/utils/datetime.ts

```typescript
import { format } from 'date-fns'

export function toDatetimeLocalValue(iso: string | null): string {
  if (!iso) return ''
  return format(new Date(iso), "yyyy-MM-dd'T'HH:mm")
}

export function fromDatetimeLocalValue(value: string): string {
  return new Date(value).toISOString()
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

type NotificationType = 'upcoming' | 'due_today' | 'overdue' | 'follow_up'

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
        message: `Vencida: ${task.title}`,
      })
    } else if (days === 0) {
      alerts.push({
        user_id: task.user_id,
        task_id: task.id,
        type: 'due_today',
        message: `Vence hoy: ${task.title}`,
      })
    } else if (days <= 3) {
      const when = days === 1 ? 'mañana' : `en ${days} días`
      alerts.push({
        user_id: task.user_id,
        task_id: task.id,
        type: 'upcoming',
        message: `Vence ${when}: ${task.title}`,
      })
    }
  }

  const { data: followUps, error: followUpsError } = await supabase
    .from('follow_ups')
    .select('user_id, task_id, stakeholder_name, next_reminder_at')
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
        name: 'Productividad RPG',
        short_name: 'Prod RPG',
        description: 'Productividad personal con gamification tipo RPG',
        theme_color: '#121212',
        background_color: '#121212',
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
