# Productividad RPG — Documento de continuidad del proyecto

> Generado el 2026-07-25 para retomar el trabajo en otra sesión. Cubre qué es la app, qué se construyó, cómo funciona por dentro, y qué falta. Leelo junto con [`spec-app-productividad-rpg.md`](spec-app-productividad-rpg.md) (el documento de especificaciones original, sin modificar, en la raíz del repo).

---

## 1. Qué es esto

Una PWA de productividad personal con gamification tipo RPG, diseñada específicamente para un perfil **TDAH + Altas Capacidades**. No es un to-do app genérico: es una función ejecutiva externa con captura de fricción cero, triage guiado, kanban visual, calendario con deadlines obligatorios, y un sistema RPG (XP, niveles, clases, rangos, loot, streaks) que motiva **sin mecánicas punitivas** — nada de alertas rojas de "fracaso", rachas que castigan al romperse, o culpa visual.

Esta restricción de diseño (no punitivo, fricción mínima) es la lente con la que hay que evaluar cualquier decisión de UX futura en este proyecto.

**Repositorio**: https://github.com/Armstrong97/Medieval_Task
**Supabase**: proyecto "Medieval Task", ref `dlztajgoljayfmqjdqio`, URL `https://dlztajgoljayfmqjdqio.supabase.co`
**Hosting**: todavía no deployado. `netlify.toml` listo en la raíz; falta que el usuario conecte su cuenta de Netlify (no puedo crear cuentas ni deployar por él).

---

## 2. Cómo se construyó (contexto de proceso)

El usuario adjuntó `spec-app-productividad-rpg.md` con el modelo de datos, stack y roadmap en 5 fases. Se construyó fase por fase, con checkpoints de confirmación antes de cada una, y una ronda de preguntas de calibración (`AskUserQuestion`) antes de cada fase para resolver ambigüedades del spec en vez de asumir. Cada fase terminó con: typecheck + lint + build limpios, verificación en browser, y un commit propio en git (el usuario pidió cada commit explícitamente, nunca automático).

Commits en orden (`git log --oneline`):
```
f94a33a Rediseno de look & feel: identidad oscura RPG-tech con tokens semanticos
f188691 Fase 5: PWA instalable, offline-first, dictado por voz y push real
a6a7616 Fase 4: follow-ups recurrentes y centro de notificaciones in-app
2c43996 Fase 3: arbol de rangos, loot, calendario dia/semana, columnas custom
74b8e55 Fase 2: gamification core (XP/nivel, insignia fija, racha+escudos, quests)
cac0941 Fase 1: auth, schema con RLS, captura, triage, kanban DnD y calendario
e2e12c3 Scaffold inicial: Vite + React + TS + Tailwind v4 + Supabase
```

Después de las 5 fases, hubo una sesión extra de rediseño visual completo (ver sección 8).

---

## 3. Stack técnico (versiones reales, ver `package.json`)

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + Vite 8 + TypeScript 6 (strict: `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`) |
| Estilos | Tailwind CSS v4 (config CSS-first vía `@theme` en `src/index.css`, sin `tailwind.config.js`) |
| Backend/DB | Supabase (Postgres, Auth, Edge Functions) |
| Data fetching | TanStack React Query v5 (no hay contexto Redux/Zustand real en uso — ver nota abajo) |
| Drag & drop | `@dnd-kit/core` (kanban), `@dnd-kit/sortable` instalado pero no usado (se optó por flechas ‹ › para reordenar columnas, más simple/robusto que drag de columnas) |
| Fechas | `date-fns` v4 |
| PWA | `vite-plugin-pwa` (estrategia `injectManifest`, service worker propio en `src/sw.ts`) |
| Offline | `@tanstack/react-query-persist-client` + `@tanstack/query-async-storage-persister` sobre IndexedDB (`idb-keyval`) |
| Push | `web-push` (Edge Function), Web Push API nativo en el cliente |
| Iconos | `lucide-react` |
| Fuentes | `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`, `@fontsource-variable/space-grotesk` (autohospedadas, no Google Fonts CDN) |
| Lint | `oxlint` |

**Nota**: `zustand` está en `package.json` (dependencia original del plan de stack) pero **nunca se usó** — toda la gestión de estado de servidor quedó en React Query, y no hubo necesidad de estado global de cliente que justificara Zustand. Si una sesión futura busca un store y no lo encuentra, es porque no existe; se puede quitar la dependencia o usarla si surge un caso real.

---

## 4. Estructura de carpetas

```
Prod App/
├── spec-app-productividad-rpg.md   ← spec original, no tocar
├── HANDOFF.md                      ← este archivo
├── netlify.toml                    ← config de deploy (build + redirect SPA + no-cache de sw.js/manifest)
├── .env.local                      ← gitignored, credenciales reales (URL/anon key/VAPID pública)
├── .env.example                    ← plantilla sin valores
├── src/
│   ├── main.tsx, App.tsx, index.css, sw.ts, vite-env.d.ts
│   ├── app/                        Layout, ProtectedRoute, router, providers, PwaUpdatePrompt
│   ├── lib/supabase.ts             cliente supabase-js tipado
│   ├── types/database.types.ts     tipos de la DB escritos a mano (no hay `supabase gen types` corrido nunca — ver sección 6)
│   ├── components/ui/              Modal, Logomark (compartidos, no específicos de un feature)
│   ├── utils/                      datetime, categoryIcon, useOnlineStatus, useSpeechDictation
│   └── features/                   un folder por dominio, cada uno con api.ts + hooks.ts + components/
│       ├── auth/                   AuthProvider + LoginPage (magic link + password)
│       ├── projects/                categories + projects (categorías son de solo lectura, seed fijo)
│       ├── kanban/                  columnas (CRUD custom) + board + card + drag-and-drop
│       ├── tasks/                   CRUD de tasks/subtasks, TaskModal (el componente más grande del proyecto)
│       ├── inbox/                   captura rápida + offline-first + dictado por voz
│       ├── triage/                  vaciar el inbox
│       ├── calendar/                vista mes/semana/día
│       ├── gamification/            XP, streaks, quests, class_ranks, loot, página Progreso
│       ├── followups/               follow-ups recurrentes
│       └── notifications/           centro in-app + Web Push (suscripción + service worker)
├── supabase/
│   ├── config.toml
│   ├── migrations/                  5 archivos SQL, uno por fase (ver sección 6)
│   └── functions/send-notifications/index.ts   Edge Function (Deno) que escanea y manda push
└── scripts/                         generate-icons.mjs + SVGs fuente de los íconos del PWA
```

**Patrón por feature**: cada `features/<nombre>/api.ts` son funciones puras que llaman a `supabase.from(...)`; `hooks.ts` envuelve esas funciones con `useQuery`/`useMutation` de React Query; `components/` son los componentes React que consumen esos hooks. Las queries entre categorías/proyectos/tareas se cruzan **del lado del cliente** (ej. `categories.find(c => c.id === task.category_id)`) en vez de usar joins de PostgREST — decisión deliberada porque el tipado manual de `database.types.ts` no modela `Relationships`, así que los embeds de PostgREST no tipan bien; las listas de referencia (categorías, columnas) son chicas y se cachean con `staleTime: Infinity`.

---

## 5. Autenticación y RLS

- Supabase Auth con **magic link + email/contraseña**, ambos habilitados (decisión del usuario en Fase 1).
- Cada tabla de usuario tiene `user_id uuid not null default auth.uid()` — el cliente nunca manda `user_id` explícito en los inserts, la DB lo autocompleta.
- RLS activo en todas las tablas. Política estándar `for all using (auth.uid() = user_id) with check (auth.uid() = user_id)` en las tablas de datos de usuario. Las tablas de referencia (`categories`, `class_ranks`, `loot_definitions`) son de **solo lectura** para cualquier autenticado (`using (true)`, sin políticas de insert/update/delete — nadie puede escribirlas desde el cliente).
- La Edge Function de notificaciones (`send-notifications`) usa la `service_role` key, así que **bypasea RLS** intencionalmente (necesita ver tareas de todos los usuarios para escanear deadlines).

---

## 6. Modelo de datos — las 5 migraciones

Todas en `supabase/migrations/`, se corrieron manualmente vía SQL Editor del dashboard de Supabase (no vía `supabase db push`, porque no tengo login del CLI del usuario). **No hay `supabase gen types` corrido nunca** — `src/types/database.types.ts` está escrito a mano y debe actualizarse manualmente si se edita el schema.

### Fase 1 — `20260724202801_fase1_schema.sql`
- **`categories`**: seed fijo de las 6 categorías/clases (Concentrix/Nigromante `#7c3aed`, Delorean/Bárbaro `#ea580c`, Estudios/Mago `#2563eb`, Hobbies/Pícaro `#db2777`, Personal/Clérigo `#059669`, Hogar/Druida `#b45309`). Solo lectura.
- **`projects`**: `category_id` obligatorio (todo proyecto pertenece a una categoría).
- **`kanban_columns`**: `project_id` nullable = tablero global "Tareas sueltas" del usuario (decisión del usuario en Fase 1, en vez de mezclar tareas sueltas con proyectos).
- **`tasks`**: `parent_task_id` (subtareas), `kanban_column_id`, `category_id` (hereda del proyecto al crear pero es editable por tarea — decisión del usuario).
- **Regla de negocio clave** (constraint, no solo UI): `deadline` es obligatorio **salvo** que la tarea esté sin triar (`parent_task_id is null and kanban_column_id is null`, o sea recién capturada en el Inbox). Las subtareas siempre requieren deadline. Mismo patrón para `category_id`.
- **Trigger** `tasks_before_write`: valida que el deadline de una subtarea no sea posterior al de su tarea padre (y viceversa) — decisión del usuario ("Padre >= última subtarea" en vez de auto-ajustar o no validar nada).
- **Triggers de seed**: `handle_new_user` (crea las 3 columnas default del tablero global al registrarse) y `handle_new_project` (crea las 3 columnas default de cada proyecto nuevo).
- Nota de nomenclatura: la columna `"order"` del spec original se renombró a `position` (palabra reservada en SQL).

### Fase 2 — `20260724223606_fase2_gamification.sql`
- **`tasks.size`** (`small`/`medium`/`large`, opcional — no fuerza fricción) determina `tasks.xp_reward` (10/25/50) vía trigger `tasks_set_xp_reward`. Solo las tareas de nivel superior (sin `parent_task_id`) dan XP — las subtareas no.
- **`user_category_xp`**: XP y nivel por categoría (`nivel = 1 + floor(xp/100)`), sembrado con 6 filas por usuario nuevo.
- **`streaks`**: una fila por usuario. "Actividad" = completar 1 tarea O vaciar el inbox (decisión del usuario, cualquiera de las dos). Escudo cada 7 días de racha activa, tope 3, se consume solo para cubrir 1 día sin actividad.
- **`quests`**: `type` = `daily_triage` | `daily_priority` | `weekly_project`. La quest de triage se completa sola al vaciar el inbox; la de "prioridad del día" se marca con una ★ en el modal de tarea y se completa al terminarla (+20 XP bonus); la semanal es **automática** por proyecto (no se crea a mano), se dispara cuando se completan todas las tareas de esa semana de un proyecto (+50 XP bonus).
- Toda la lógica de XP/racha/quests vive en triggers de Postgres (`tasks_after_done`, `tasks_after_triage`, `register_daily_activity`), no en el cliente — así es imposible desincronizar el estado del juego aunque el cliente tenga bugs.

### Fase 3 — `20260724230130_fase3_ranks_loot.sql`
- **`class_ranks`**: 4 rangos x 6 clases (nombres tal cual el spec: Aprendiz→Invocador→Señor de las sombras→Archinigromante, etc.), con `xp_threshold` 0/300/800/2000 (elegidos por mí, no especificados en el spec).
- **`user_category_xp.current_rank_id`**: se recalcula solo vía trigger `set_current_rank` cada vez que cambia `current_xp`.
- **`loot_definitions`** (catálogo fijo, 13 insignias) + **`loot`** (qué desbloqueó cada usuario). *Desviación del spec*: el documento describe `loot` como una sola tabla; se separó en catálogo + desbloqueos para poder mostrar insignias bloqueadas en la UI sin inventar filas por usuario desde el principio.
- Triggers de desbloqueo automático: `grant_loot`, `check_quest_loot`, `check_rank_loot`, más lógica agregada a `register_daily_activity`/`tasks_after_done`/`tasks_after_triage` (reemplazadas con `CREATE OR REPLACE` — mismo nombre/firma que en Fase 2, mismo trigger ya creado sigue apuntando a la versión nueva).

### Fase 4 — `20260725000448_fase4_followups_notifications.sql`
- **`follow_ups`**: relación 1:1 con `tasks` (`unique(task_id)`). `next_reminder_at` se recalcula solo (trigger) cuando cambia `last_contacted_at` o `interval_days` — "registrar contacto" es literalmente actualizar `last_contacted_at = now()`.
- **`notifications`**: `type` = `upcoming` | `due_today` | `overdue` | `follow_up`. *Decisión importante*: en Fase 4 se generan **desde el cliente** (función `syncNotifications()` que corre al abrir la app), no vía cron — decisión explícita del usuario para no construir infraestructura de push todavía. `unique(task_id, type)` evita duplicar la misma alerta; `dismissed_at` nunca se pisa en los re-syncs (el upsert solo manda las columnas que cambian).

### Fase 5 — `20260725010828_fase5_push_subscriptions.sql`
- **`push_subscriptions`**: `endpoint` (unique), `p256dh`, `auth` — lo que necesita `web-push` para mandar un push. La Edge Function las lee con `service_role`, ignorando RLS.

---

## 7. Motor de notificaciones y push real (Fase 5)

Esto tiene dos mitades que hay que entender juntas:

1. **Generación in-app** (`src/features/notifications/api.ts`, función `syncNotifications`): corre cuando el usuario abre la app (`NotificationBell` la dispara en un `useEffect` al montar). Calcula qué tareas están vencidas/vencen hoy/en ≤3 días, y qué follow-ups tienen `next_reminder_at` cumplido, y hace upsert en `notifications`.
2. **Generación server-side + push real** (`supabase/functions/send-notifications/index.ts`): la **misma lógica de bucketing** reimplementada en Deno, pero corre para **todos los usuarios** (usa `service_role`). Se dispara por un **Cron Job de Supabase** (configurado desde el dashboard, no vía SQL/`pg_cron` manual — el usuario lo activó apuntando a la URL de la función cada 30 min con el header `Authorization: Bearer <service_role_key>`). Cuando encuentra una alerta nueva (no existía antes en `notifications`), manda un Web Push real vía `web-push`.

**VAPID keys**: generadas con `npx web-push generate-vapid-keys`. La pública está en `.env.local` (`VITE_VAPID_PUBLIC_KEY`) y se commitea en `.env.example` sin valor. La privada **nunca se escribió en ningún archivo del repo** — se le pasó al usuario en el chat para que la cargue él mismo con `supabase secrets set VAPID_PRIVATE_KEY=...`. Si hace falta rotarla: `npx web-push generate-vapid-keys` de nuevo, actualizar `.env.local` + el secret de Supabase.

**Estado confirmado**: el usuario probó la Edge Function manualmente (200 OK) y el Cron Job ya está activo en el dashboard de Supabase.

---

## 8. Sistema de diseño (rediseño post-Fase-5)

Después de terminar las 5 fases, se hizo un rediseño visual completo pedido explícitamente por el usuario, usando la skill `ui-ux-pro-max` (aunque sus scripts/datos vinieron vacíos en esta instalación del plugin — se aplicó el framework de reglas que sí trae el `SKILL.md`, más criterio propio y dos referencias reales que pasó el usuario: `dragonfly.xyz` y `labs.chaingpt.org`, inspeccionadas vía DOM/CSS con el browser tool).

**Decisiones del usuario**: intensidad RPG "inmersiva" en toda la app (no solo en Progreso), paleta base "oscuro profundo tipo juego", tipografía "sans legible + acento en nombres de rango/clase".

**Resultado** (extraído de las referencias, que resultaron ser estética "terminal/HUD técnico", no fantasía medieval con pergamino):

- **Tokens semánticos** en `src/index.css` vía `@theme` de Tailwind v4: `bg`, `surface`, `surface-2`, `fg`, `fg-muted`, `border`, `accent`, `accent-fg`, `warn-bg`, `warn-fg`, `warn-border`. Los valores reales viven en `:root` (claro) y se sobreescriben en `@media (prefers-color-scheme: dark)` (oscuro — identidad principal). Esto reemplazó el patrón anterior de `dark:` repetido en cada elemento.
- **Bug encontrado y corregido de paso**: el modo oscuro **nunca funcionó** en ninguna de las 5 fases. Había un `@custom-variant dark (&:where(.dark, .dark *))` en `index.css` que activaba `dark:` solo si existía una clase `.dark` en el DOM — pero ningún código de la app la seteaba nunca. Todo el trabajo de `dark:` de las 5 fases era código muerto. Se eliminó esa línea; ahora Tailwind usa su comportamiento default (media query `prefers-color-scheme`), que sí funciona.
- **Paleta**: oscuro `#121212`/`#1c1c1a` (identidad principal), claro `#faf9f6`/`#ffffff` (respaldo, mismo requisito de spec de siempre soportar ambos). Acento naranja `#f2600c` / `#ea580c` en claro — misma familia que el color ya fijo de Delorean/Bárbaro, cero conflicto con la paleta de categorías.
- **Tipografía** (autohospedada vía `@fontsource-variable/*`, no CDN de Google — para que el service worker las precachee y funcionen offline): **Inter** (todo el cuerpo/UI), **JetBrains Mono** (todo lo numérico: XP, niveles, racha, fechas/horas, contadores — refuerza la sensación de HUD de videojuego), **Space Grotesk** (solo nombres de rango/clase y títulos de sección, nunca párrafos largos).
- **Forma**: radio de esquina chico (4-6px, no cero total como las referencias — se mantuvo algo de calidez dado el perfil TDAH del usuario), bordes finos de 1px en vez de sombras pesadas, resplandor (`box-shadow` con color) reservado para logros reales (subir de rango, desbloquear loot) — nunca decorativo constante.
- **Nav rehecho**: antes eran 6 links de texto plano que se rompían en mobile; ahora tiene íconos + labels (Lucide) y `overflow-x-auto` para scroll horizontal en pantallas chicas — corrige un anti-patrón de navegación que venía de las fases rápidas del MVP.
- **Logomark**: `src/components/ui/Logomark.tsx`, 3 barras ascendentes en los colores Concentrix/Estudios/Hogar — mismo diseño que el ícono del PWA (`scripts/icon-any.svg` / `icon-maskable.svg`, rasterizados a PNG con `scripts/generate-icons.mjs` usando `sharp`).

Se tocaron los 20+ componentes visuales de la app. Verificado (no con captura de pantalla — el compositing del Browser pane no estuvo disponible en esa sesión, se verificó vía inspección de estilos computados con JS) en claro, oscuro, y viewport mobile (375px).

---

## 9. Decisiones de diseño clave (registro condensado, con el porqué)

Estas son las respuestas que el usuario dio en las rondas de `AskUserQuestion` a lo largo del proyecto — importan porque cualquier feature nueva debería ser consistente con ellas:

| Área | Decisión | Por qué |
|---|---|---|
| Auth | Magic link + contraseña, ambos | El usuario quiso las dos vías disponibles |
| Tareas sueltas | Tablero kanban dedicado "Tareas sueltas" (no mezcladas con proyectos) | Separación clara para tareas sin proyecto |
| Categoría de tarea | Hereda del proyecto al crear, pero editable por tarea | Flexibilidad para el reparto de XP por categoría |
| Deadline padre/subtarea | Padre >= última subtarea (validación, no auto-ajuste) | Simplicidad + consistencia de datos |
| XP por tarea | Selector manual de tamaño (Pequeña/Mediana/Grande = 10/25/50 XP) | Refleja "peso proporcional a dificultad" del spec, sin fricción obligatoria (tamaño es opcional) |
| Rango visual Fase 2 | Insignia fija + nivel numérico (sin árbol de 4 rangos todavía) | El árbol completo llegó recién en Fase 3 |
| Racha | Completar 1 tarea O vaciar inbox (cualquiera de las dos) | Menos punitivo, más flexible |
| Escudos | Automático por racha larga (cada 7 días, tope 3, se consume solo) | Cero fricción, mecánica pasiva |
| Prioridad del día | Estrella manual sobre una tarea existente | Simple, el usuario elige explícitamente |
| Quest semanal | Automática por proyecto (no creación manual) | Menos fricción que armar quests a mano |
| Notificaciones Fase 4 | Centro in-app calculado al abrir la app, sin infraestructura de cron | Evitar construir push a medias sin el Service Worker (que llegó en Fase 5) |
| Offline Fase 5 | Captura del Inbox offline-resiliente + resto de la app en modo lectura con caché | Balance esfuerzo/beneficio — no se justificaba colas de sync completas para todo |
| Hosting | Netlify | Elegido explícitamente por el usuario sobre Vercel |
| Push real Fase 5 | Sí, con Cron Job de Supabase | El usuario aceptó el paso extra de activarlo en el dashboard |
| Estilo visual | "Inmersivo" tipo videojuego en toda la app, paleta oscura, tipografía con acento en nombres de rango | Ver sección 8 |
| Idioma | Español neutro/colombiano, no argentino (voseo) | Corrección explícita del usuario — está en Colombia, no Argentina. **Guardado en memoria** para futuras sesiones |

---

## 10. Qué falta / pasos manuales pendientes

- **Deploy a Netlify**: no se hizo. `netlify.toml` está listo. Falta que el usuario conecte su cuenta (no puedo crear cuentas de terceros) — vía dashboard de Netlify conectando el repo de GitHub, o `netlify deploy` desde su CLI. Variables de entorno a cargar en Netlify: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_VAPID_PUBLIC_KEY`.
- **Dominio propio**: pendiente, lo configura el usuario cuando lo tenga (mencionado desde el spec original como paso independiente).
- **`supabase gen types`**: nunca se corrió (el CLI no estaba logueado durante la mayoría del proyecto). `database.types.ts` sigue escrito a mano. Si en algún momento se loguea el CLI (`supabase login` + `supabase link --project-ref dlztajgoljayfmqjdqio`), se puede regenerar con `supabase gen types typescript --project-id dlztajgoljayfmqjdqio > src/types/database.types.ts` — pero ojo, hay que revisar que coincida con las convenciones ya usadas (los tipos hechos a mano no incluyen `Relationships` reales, así que un regenerado real cambiaría cómo se pueden hacer los selects con joins de PostgREST; ahora mismo el código nunca usa esos joins, así que sería un cambio de tipos sin romper nada, pero vale la pena revisar el diff).
- **Zustand sin usar**: ver sección 3. Se puede quitar de `package.json` si se confirma que no hará falta, o dejarlo para cuando surja un caso real de estado de cliente compartido.
- **Código no verificado end-to-end con datos reales del usuario en todas las fases**: cada fase se verificó con typecheck/lint/build/browser (login page, estilos), pero no con screenshots visuales reales (el compositing del Browser pane no estuvo disponible en varias sesiones) — el usuario sí probó manualmente la app funcional después de cada fase y confirmó que andaba.
- **Roadmap del spec original**: las 5 fases están completas según el documento. No hay items pendientes del roadmap original — cualquier trabajo nuevo a partir de acá es "Fase 6" no especificada en el spec.

---

## 11. Cómo correr el proyecto localmente

```bash
cd "Prod App"
npm install
npm run dev        # servidor de desarrollo, PWA en modo dev habilitado (devOptions.enabled: true)
npm run build       # build de producción (typecheck + vite build + genera sw.js/manifest)
npm run preview     # sirve el build de producción localmente
npm run lint        # oxlint
```

Variables de entorno necesarias en `.env.local` (gitignored, ya cargado en la máquina de desarrollo): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_VAPID_PUBLIC_KEY`.

Para tocar la Edge Function o correr migraciones nuevas por CLI: `npx supabase login` → `npx supabase link --project-ref dlztajgoljayfmqjdqio` → `npx supabase functions deploy send-notifications` / correr SQL nuevo vía el SQL Editor del dashboard (no se usó `supabase db push` en ningún momento del proyecto, siempre SQL Editor manual).

---

## 12. Cómo seguir en otra sesión

1. Leer este archivo + `spec-app-productividad-rpg.md` completo antes de tocar código.
2. Si se va a agregar una tabla/columna nueva: seguir el patrón de las 5 migraciones existentes (RLS desde el día uno, `user_id uuid not null default auth.uid()`, triggers para lógica de negocio en vez de cliente cuando sea posible) y actualizar `database.types.ts` a mano.
3. Si se va a tocar UI: respetar los tokens semánticos de `index.css` (`bg-bg`, `text-fg`, `bg-surface`, `border-border`, `text-accent`, etc.) en vez de volver a colores `neutral-*`/`dark:` sueltos — y usar `font-mono` para cualquier número/fecha/contador, `font-display` solo para nombres de rango/clase y títulos de sección.
4. Cualquier mecánica nueva de gamification: revisar primero si el efecto debería vivir en un trigger de Postgres (patrón ya establecido) en vez de lógica de cliente.
5. Si el usuario pide algo que contradiga la tabla de decisiones de la sección 9, confirmar explícitamente antes de cambiarlo — son decisiones ya tomadas conscientemente, no default accidentales.
