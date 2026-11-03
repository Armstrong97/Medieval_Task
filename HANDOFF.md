# Productividad RPG (ahora «Questly») — Documento de continuidad del proyecto

> Generado el 2026-07-25 para retomar el trabajo en otra sesión, actualizado el 2026-07-27 (Fase 8 + Paso 10, ver sección 15; auditoría y limpieza, ver sección 16). Cubre qué es la app, qué se construyó, cómo funciona por dentro, y qué falta. Leelo junto con [`spec-app-productividad-rpg.md`](spec-app-productividad-rpg.md) (el documento de especificaciones original, sin modificar, en la raíz del repo).

---

## 1. Qué es esto

Una PWA de productividad personal con gamification tipo RPG, diseñada específicamente para un perfil **TDAH + Altas Capacidades**. No es un to-do app genérico: es una función ejecutiva externa con captura de fricción cero, triage guiado, kanban visual, calendario con deadlines obligatorios, y un sistema RPG (XP, niveles, clases, rangos, loot, streaks) que motiva **sin mecánicas punitivas** — nada de alertas rojas de "fracaso", rachas que castigan al romperse, o culpa visual.

**Rebranding (Fase 8, 2026-07-26)**: el producto se llama oficialmente **Questly** ("Maneja tus misiones. Conquista el caos.") — metadatos, PWA manifest y UI ya actualizados. Este documento conserva su nombre de archivo/título original por continuidad histórica; ver sección 15 para el detalle completo de la segunda ronda de colaboración con Gemini.

Esta restricción de diseño (no punitivo, fricción mínima) es la lente con la que hay que evaluar cualquier decisión de UX futura en este proyecto.

**Repositorio**: https://github.com/Armstrong97/Medieval_Task
**Supabase**: proyecto "Medieval Task", ref `dlztajgoljayfmqjdqio`, URL `https://dlztajgoljayfmqjdqio.supabase.co`
**Dónde está la base de datos (para no olvidarlo)**: es Supabase (Postgres hospedado), proyecto **"Medieval Task"**, ref `dlztajgoljayfmqjdqio`.
- Panel: `https://supabase.com/dashboard/project/dlztajgoljayfmqjdqio` (entrar con la cuenta de Supabase del usuario).
- **Migraciones**: se corren a mano en el panel → *SQL Editor* → pegar el contenido de `supabase/migrations/<archivo>.sql` → *Run*. Nunca se usó `supabase db push`.
- Edge Function de notificaciones: `npx supabase functions deploy send-notifications --project-ref dlztajgoljayfmqjdqio` (requiere `npx supabase login` una vez). Cron Job y secrets (`VAPID_PRIVATE_KEY`) se ven en el mismo panel.
- Claves (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) viven en `.env.local` (no versionado) y en la sección *Project Settings → API* del panel.

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
| Drag & drop | Ninguno. `@dnd-kit` se desinstaló en la auditoría (sección 16): el Grimorio Dual (Paso 6) reemplazó el Kanban de columnas arrastrables |
| Fechas | `date-fns` v4 |
| PWA | `vite-plugin-pwa` (estrategia `injectManifest`, service worker propio en `src/sw.ts`) |
| Offline | `@tanstack/react-query-persist-client` + `@tanstack/query-async-storage-persister` sobre IndexedDB (`idb-keyval`) |
| Push | `web-push` (Edge Function), Web Push API nativo en el cliente |
| Iconos | `lucide-react` |
| Fuentes | `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`, `@fontsource-variable/space-grotesk` (autohospedadas, no Google Fonts CDN) |
| Lint | `oxlint` |

**Nota**: `zustand` se desinstaló en la auditoría (sección 16) — nunca se usó; todo el estado de servidor vive en React Query. Tampoco queda `web-push` en `package.json`: solo lo usa la Edge Function (Deno, `npm:web-push@3`), y las VAPID keys se generan con `npx web-push generate-vapid-keys`.

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
│   ├── components/ui/              Modal, AmbientBackground, AchievementCelebration (compartidos, no específicos de un feature)
│   ├── utils/                      datetime, rpgAssets, useOnlineStatus, useSpeechDictation
│   └── features/                   un folder por dominio, cada uno con api.ts + hooks.ts + components/
│       ├── auth/                   AuthProvider + LoginPage (magic link + password)
│       ├── projects/                categories + projects (categorías son de solo lectura, seed fijo)
│       ├── kanban/                  El Grimorio Dual (KanbanPage + GrimorioAccordionView/TabsView); api.ts solo conserva lectura de columnas (completeTask/reopenTask/triage las usan)
│       ├── tasks/                   CRUD de tasks/subtasks, TaskModal (el componente más grande del proyecto)
│       ├── inbox/                   captura rápida + offline-first + dictado por voz
│       ├── triage/                  Mesa de Estrategia (StrategyTablePage, mazo de cartas) para vaciar el inbox
│       ├── battle-hud/              Battle HUD: 3 Combat Slots (ruta `/`)
│       ├── calendar/                vista mes/semana/día
│       ├── gamification/            XP, streaks, quests, class_ranks, loot, página Progreso
│       ├── followups/               Pacto de Custodia: follow-ups con bitácora (follow_up_logs) y resolución blanda (resolved_at)
│       └── notifications/           centro in-app + Web Push (suscripción + service worker)
├── supabase/
│   ├── config.toml
│   ├── migrations/                  5 archivos SQL, uno por fase (ver sección 6)
│   └── functions/send-notifications/index.ts   Edge Function (Deno) que escanea y manda push
└── scripts/                         optimize-rpg-assets.mjs, generate-project-snapshot.mjs
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

**Adenda — segundo rediseño visual (2026-07-25, misma sesión que Fase 6 más abajo)**: la identidad "terminal/HUD técnico" de arriba fue reemplazada por una dirección "fantasía RPG rica" a pedido explícito del usuario (no le convencía el HUD, quería más fondos e interactividad). Se armó primero como design system en Claude Design (`claude.ai/design`, proyecto "Productividad RPG — Rediseño Fantasía") con 4 piezas de referencia (tokens, fondo animado, componentes, animación de logro) y se aprobó antes de tocar código. Cambios:
- **Paleta oscura** ahora ciruela profundo (`--bg: #120c18`, `--surface: #1e1526`) con acento dorado de logro (`--gold`/`--accent: #d9a94a`) en vez del naranja anterior — mismo patrón de tokens semánticos, valores nuevos.
- **Tipografía display**: `Cinzel` (autohospedada, `@fontsource/cinzel`) reemplazó a Space Grotesk para rangos/clases/títulos de sección — más "fantasía", menos "tech". Se desinstaló `@fontsource-variable/space-grotesk` por quedar sin uso.
- **`AmbientBackground`** (`src/components/ui/AmbientBackground.tsx`): aurora rotando muy lento (40s) + motas doradas ascendiendo, montado una vez en `Layout` y en `LoginPage` (que vive fuera del Layout). Solo visible en modo oscuro, se apaga con `prefers-reduced-motion`.
- **`AchievementCelebration` + `AchievementWatcher`** (`src/features/gamification/components/AchievementWatcher.tsx`): compara rangos/loot actuales contra lo último visto en `localStorage` (`rpg_seen_rank_ids`, `rpg_seen_loot_ids`) y dispara un modal de celebración con partículas cuando hay algo nuevo — en cola si hay varios a la vez. Es puramente de cliente (detecta el resultado de los triggers de Postgres, no reemplaza su lógica).
- Micro-interacciones (hover/press/glow) agregadas de forma consistente en `TaskCard`, botones de login/triage/kanban, barra de XP, `LootShowcase`, `Modal` (ahora entra con fade+scale en vez de aparecer de golpe).

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

*(Reescrita en la auditoría del 2026-07-27; los pendientes ya resueltos viven en las secciones de cada fase.)*

- **Deploy a Netlify**: no se hizo. `netlify.toml` está listo; falta que el usuario conecte su cuenta. Variables a cargar: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_VAPID_PUBLIC_KEY`.
- **Dominio propio**: pendiente, lo configura el usuario cuando lo tenga.
- **Paso 10 — confirmar con el usuario**: que corrió `20260727000001_fase8_followup_logs.sql` en el SQL Editor y volvió a desplegar `send-notifications` (`npx supabase functions deploy send-notifications --project-ref dlztajgoljayfmqjdqio`). No quedó registrado que se hiciera. Sin la migración, el follow-up falla (`resolved_at` y `follow_up_logs` no existen).
- **Ícono maskable real** para la PWA: el de 512 no tiene zona de seguridad; regenerar con ~20% de padding si se quiere `purpose: 'maskable'`.
- **`supabase gen types`**: nunca se corrió; `database.types.ts` sigue escrito a mano.
- **Cancelar seguimiento** (`TaskModal`) borra el `follow_up` pero no descarta sus notificaciones ya generadas (menor; `completeTask` y "Resolver Éxito" sí las descartan).
- **Warnings de oxlint** (2, fast-refresh en `AuthProvider` y `FocusFloatContext`): inofensivos, sin tocar.
- **No hay Paso 11 especificado** por Gemini al cierre de esta sesión.

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

---

## 13. Fase 6 — "Cambios menores de Experiencia" (en curso, iniciada 2026-07-25)

No es parte del spec original (ver nota al final de la sección 10) — el usuario la abrió como una lista abierta de mejoras de experiencia que se va a ir ampliando; él avisa cuándo se da por cerrada. Los primeros 4 pedidos ya implementados:

### 6.1 — Las subtareas ahora otorgan XP (antes daban 0)
Cada subtarea otorga `round(xp_reward_de_la_tarea_padre / 10)` al completarse — Pequeña(10)→1, Mediana(25)→3, Grande(50)→5, sin tamaño→0. Fomenta partir tareas grandes en pasos chicos sin perder el incentivo de XP (pedido explícito del usuario). Va a la categoría de la tarea padre (las subtareas no tienen `category_id` propio).

Implementado en la migración `20260725230823_fase6_subtask_xp_and_followup_status.sql`, modificando `tasks_set_xp_reward` (ya no fuerza `xp_reward = 0` para subtareas) y `tasks_after_done` (ya no ignora subtareas; ahora suma XP a la categoría de su padre, pero sigue sin disparar quest de prioridad del día ni quest semanal — esas siguen siendo solo de tareas de nivel superior).

**Limitación conocida, decisión mía sin confirmar con el usuario**: si el tamaño de la tarea padre cambia *después* de crear una subtarea, el `xp_reward` de esa subtarea no se recalcula solo (el trigger solo reacciona a cambios en la fila de la subtarea misma, no en la del padre). Si esto molesta en la práctica, la solución sería un trigger adicional `after update of xp_reward on tasks` que recalcule los hijos — no se implementó por no estar pedido y para no sobre-construir.

### 6.2 — "Enviar a Follow-up" como acción, no como checkbox de creación
Pivote respecto al spec original: el usuario decidió que el follow-up **no se configura en Triage** (Inbox y Triage no cambian en esto) y que el viejo checkbox "Depende de un stakeholder" del modal de tarea (Fase 4) ya no existe. En su lugar:
- Nuevo status de tarea: `'follow_up'` (antes solo `pending`/`in_progress`/`done`), agregado al check constraint de `tasks.status` en la misma migración de Fase 6.
- Acción **"Enviar a Follow-up"**: crea el registro en `follow_ups` (intervalo + stakeholder opcional) y pone `status = 'follow_up'` en un solo paso (`useSendToFollowUp` en `followups/hooks.ts`). Disponible como botón rápido en la tarjeta de Kanban (usa default de 7 días, sin stakeholder — se puede editar después) y como acción con formulario inline en `TaskModal`.
- `fetchBoardTasks` ahora excluye `status = 'follow_up'` — la tarea desaparece del Kanban activo ("libera mentalmente") pero sigue viva en la página de Follow-ups (que lee de la tabla `follow_ups`, no del status de la tarea, así que no se ve afectada).
- Las notificaciones de deadline (`fetchActiveTasksWithDeadline` en el cliente y la Edge Function `send-notifications`) también excluyen `follow_up` — una tarea en seguimiento deja de generar alertas de vencida/vence-hoy; solo genera su propia notificación tipo `follow_up` vía `next_reminder_at`, como ya funcionaba.
- Se puede "Cancelar seguimiento" (borra el `follow_up` y reabre la tarea) o completarla desde `TaskModal`. Desde el Paso 10, `FollowUpsPage` ya no tiene "Completar": ofrece "Registrar contacto" y "Resolver Éxito" (ver Paso 10 y sección 16).

**Pendiente manual del usuario**: la Edge Function `supabase/functions/send-notifications/index.ts` cambió (excluye `follow_up` del query de deadlines) y necesita `npx supabase functions deploy send-notifications` para tomar efecto en producción — no se pudo correr porque el CLI no está logueado en esta máquina (mismo motivo que siempre, ver sección 6).

> **Superado por el Paso 6 (Fase 8):** `TaskCard` y el Kanban con botones inline ya no existen (borrados en la auditoría, sección 16). Lo que sigue describe el estado de la Fase 6.

### 6.3 — Botón "Completar" en vez de checkbox, + botón en el Kanban
El checkbox "Hecha" del modal se reemplazó por un botón dorado prominente (`Completar` / `Reabrir` según el estado). Se agregó el mismo par de acciones (`Completar` + `Enviar a Follow-up`) como botones en la esquina inferior derecha de cada tarjeta de Kanban — fuera del área de drag-and-drop para no interferir con `@dnd-kit`. Nuevas funciones compartidas `completeTask`/`reopenTask` en `tasks/api.ts` (mueven la tarea a la columna "Hecho"/"Por hacer" del proyecto, igual que ya hacía el checkbox viejo) usadas desde `TaskCard`, `TaskModal` y `FollowUpsPage`.

### 6.4 — Triage ahora exige tamaño (XP) para guardar
**Contradice una decisión anterior** (sección 9: "tamaño opcional, sin fricción obligatoria") — confirmado explícitamente con el usuario antes de cambiarlo, como pide la regla de la sección 12.5. La decisión final: el Inbox no cambia (captura sigue sin fricción), pero el paso de Triage ahora exige categoría + proyecto/tareas sueltas + deadline (como ya era) **+ tamaño**, con validación de formulario (`TriagePage.tsx`) — no se puede sacar una tarea del inbox sin elegir Pequeña/Mediana/Grande. El tamaño sigue siendo opcional en cualquier otro punto de edición posterior (TaskModal).

> **Superado por el Paso 6 (Fase 8):** `KanbanBoard.tsx` y sus filtros se borraron.

### 6.5 — Filtros de Kanban (fecha + categoría)
`KanbanBoard.tsx` ahora tiene una barra de filtros: pestañas de selección única (Todas/Vencidas/Hoy/Mañana/Fin de semana/Esta semana/Este mes, default "Todas") + chips de categoría multi-toggle (mismo patrón visual que el filtro de Calendario). Filtra client-side sobre las tareas ya traídas del board, antes de repartirlas en columnas — pensado explícitamente para reducir la sobrecarga visual del Kanban con muchas tareas (mencionado como problema de TDAH por el usuario).

### Pendiente de correr manualmente antes de que todo esto funcione en producción
1. **SQL Editor de Supabase** (dashboard, como todas las migraciones anteriores): correr `supabase/migrations/20260725230823_fase6_subtask_xp_and_followup_status.sql` completo. ✅ **Ya corrido por el usuario** (2026-07-25).
2. `npx supabase functions deploy send-notifications`. ✅ **Ya desplegado por el usuario** (2026-07-25, vía `--project-ref` sin `link`).

### 6.6 — Ventana flotante de foco ("En progreso")
**Iteró dos veces**: la primera versión fue una notificación estática del sistema al minimizar (`useFocusReminder.ts`, ya borrado) — funcionaba, pero el usuario aclaró que lo que quería era una **ventana flotante siempre-encima, redimensionable y con el estilo de la app**. La versión final usa la **Document Picture-in-Picture API** (`src/features/tasks/components/FocusFloat.tsx`):
- Botón `PictureInPicture2` en el nav (junto a la campana) que abre/cierra la mini-ventana. **No puede abrirse sola al minimizar** — la API exige un gesto del usuario, por eso es un botón (restricción del navegador, explicada al usuario).
- La ventana flota por encima de cualquier app, se puede redimensionar, y muestra hasta 3 tareas `in_progress` (query `['tasks','in-progress']`, `fetchInProgressTasks` en `tasks/api.ts`) con borde del color de su categoría y un check dorado para completarlas desde ahí mismo (`useCompleteTask` compartido).
- El contenido se renderiza con `createPortal` de React hacia el `document.body` de la ventana PiP — sigue dentro del árbol de React principal, así que React Query/mutations funcionan normal. Los estilos se copian hoja por hoja (`copyStylesInto`) con un `<base>` apuntando al origin para que las fuentes autohospedadas resuelvan; hereda tokens, Cinzel y modo oscuro.
- **Solo Chrome/Edge de escritorio** — si `documentPictureInPicture` no existe (Firefox, Safari, móvil), el botón directamente no se renderiza.

> **Superado por el Paso 7 (Fase 8):** el calendario se reemplazó por el Oráculo del Tiempo; el toggle "Mostrar completadas" ya no existe.

### 6.7 — Calendario: completadas tachadas + toggle
Las tareas `done` se ven tachadas y atenuadas en las vistas mes/semana (chips de `DayCell`) y día (`DayListView`). Checkbox "Mostrar completadas" en la barra superior del calendario (default: activado) para ocultarlas del todo. Solo estado de cliente, sin persistencia de la preferencia.

### 6.8 — Menú "Mi Perfil" en el nav
Nuevo dropdown `src/features/auth/components/ProfileMenu.tsx` (ícono `CircleUserRound`, mismo patrón de panel que `NotificationBell`), junto a notificaciones y racha. Muestra el email de la sesión y contiene el botón "Cerrar sesión" — el botón suelto de logout que estaba en el nav desde Fase 1 se eliminó. Pensado como contenedor para futuras opciones de perfil/ajustes.

### 6.9 — Dashboard exploratorio del Inbox (implementado, sin commitear todavía)
El usuario sintió el Inbox "vacío" y pidió ideas para reforzar el hábito de avanzar tareas/sumar puntos; se implementaron las 6 que se propusieron, a la espera de que las pruebe en vivo y confirme qué se queda:
- **Franja de estado** (racha, XP ganado hoy, check de quest de triage) y **prioridad del día** — `src/features/inbox/components/InboxDashboard.tsx` (`InboxTopBar`).
- **Contador de vencidas/hoy** con link directo al Kanban ya filtrado — para esto `KanbanBoard.tsx` ahora lee un `dateFilter` inicial desde `location.state` (react-router), y `DateFilter` se exportó desde ahí.
- **Estado vacío con personalidad** + **última victoria** + **sugerencia "quick win"** (tarea Pequeña más urgente) — `InboxEmptyState` en el mismo archivo.
- Nuevas queries en `tasks/api.ts`: `fetchTasksCompletedToday`, `fetchLastCompletedTask`, `fetchQuickWinTask`. Nuevo hook `useXpEarnedToday` en `gamification/hooks.ts` (suma XP de tareas completadas hoy + bonus de quests diaria-prioridad/semanal completadas hoy — la quest de triage no suma porque su xp_reward nunca tocó `user_category_xp`, ver Fase 2).
- **Estado al escribir esto**: código implementado y verificado (typecheck/lint/HMR limpios), reordenado a pedido del usuario (captura primero, dashboard después, separado por un divider) — **todavía sin confirmación final del usuario ni commit**. Si otra sesión retoma esto, preguntar antes de asumir que quedó aprobado.

---

## 14. Colaboración con Gemini (Arquitecto UX/Gamificación) — a partir de 2026-07-26

Arranca una nueva fase de trabajo con un flujo de dos IAs:
- **Gemini Pro / Gemini Advanced** actúa como **Arquitecto de UX/UI, Gamificación y Diseño Neurodivergente (TDAH)** — define la visión de diseño, flujos anti-parálisis, jerarquía visual, sistemas de juego y tokens estilísticos, en conversación directa con el usuario (fuera de esta sesión).
- **Claude (yo)** actúa como **capa de ejecución e ingeniería**: implemento en código (React 19, TypeScript, Tailwind v4, Supabase, TanStack Query) lo que Gemini especifica, manteniendo las convenciones ya establecidas en este documento y en las migraciones de Postgres.
- El usuario pasa los documentos de especificación de Gemini módulo por módulo; yo los implemento.
- **Mi rol no es solo ejecutar**: si una especificación de Gemini choca con una limitación técnica real (RLS, triggers existentes, `database.types.ts`, o contradice una decisión ya tomada en la sección 9), **no improviso un parche silencioso** — se lo explico al usuario y le doy un prompt ya redactado para que se lo pase de vuelta a Gemini, para que el ajuste de diseño se decida ahí, no como un apaño mío de ingeniería.

### Plan de rediseño anunciado (pendiente de especificación detallada por módulo)
Motivación del usuario: la identidad visual se sintió demasiado "HUD técnico/terminal" (ver sección 8 y su adenda) — sobrecarga cognitiva para el perfil TDAH — y la gamificación se siente "plana" (solo números). Nueva dirección: **Fantasía Medieval Orgánica (Grimorio/Taberna)**, en 4 módulos:

1. **"The Battle HUD" — Dashboard de Enfrentamiento (anti-parálisis)**: reemplaza el Kanban masivo como pantalla principal por 1-3 "Combat Slots" de misiones activas, tareas como "enemigos" con barra de HP basada en subtareas, integración con `FocusFloat` (sección 6.6), y una forma no punitiva de mandar algo al backlog ("Retirada Táctica"). Kanban y Calendario pasan a ser vistas secundarias ("el Grimorio").
2. **Gamificación narrativa**: proyectos grandes como "Jefes de Mazmorra", recompensas visuales/interactivas al completar (no solo XP numérico) — construye sobre `AchievementCelebration`/`AchievementWatcher` (sección 8, adenda) y `class_ranks`/`loot` (Fase 3).
3. **Inbox & Triage como "Mesa de Estrategia"**: selección de tamaño con interfaz táctil tipo mazo de cartas (Pequeña=Daga, Mediana=Espada, Grande=Mandoble) — reemplazaría los botones actuales de `SIZE_OPTIONS` en `TriagePage.tsx`/`TaskModal.tsx` (Fase 6.4).
4. **Design system Fantasía Medieval**: nueva pasada de tokens en `index.css` (ya está en paleta ciruela/oro + Cinzel desde la adenda de la sección 8 — este módulo la profundiza hacia cuero/hierro/runas), sin tocar la estructura semántica de tokens ya establecida.

**Estado**: solo la visión general fue comunicada. Cada módulo se implementa cuando el usuario trae la especificación detallada de Gemini. No hay código de este plan todavía — instrucción explícita del usuario de no adivinar ni escribir nada hasta tener la spec del Módulo 1.

### Módulo 1 — "The Battle HUD" (implementado 2026-07-26)

Primera especificación real recibida de Gemini. Antes de tocar código se detectó una **inconsistencia técnica real** (no una interpretación de diseño): la spec original solo excluía `status = 'done'` de la query del HUD y del índice único de `hud_slot` — pero la app ya tenía un cuarto estado, `'follow_up'` (Fase 6.2, anterior a que Gemini entrara al proyecto), que Gemini no conocía. Sin la exclusión, una tarea "liberada mentalmente" habría seguido ocupando un Combat Slot activo, contradiciendo el objetivo mismo del módulo. Se le mandó un prompt a Gemini con el problema (ver el turno anterior de esta conversación) en vez de asumir la solución; Gemini confirmó por escrito: excluir `follow_up` igual que `done`, tanto en la query como en el índice, y liberar el slot atómicamente al mandar a follow-up. La spec quedó ajustada a v1.1 con esa corrección antes de implementar.

**Modelo de datos** — `supabase/migrations/20260726000001_fase7_battle_hud_slots.sql`:
- `tasks.hud_slot integer check (between 1 and 3)`, nullable.
- Índice único parcial `(user_id, hud_slot) where hud_slot is not null and status not in ('done', 'follow_up')` — un slot se libera automáticamente en cuanto la tarea sale de esos dos estados.
- `TaskPatch` (`tasks/api.ts`) ahora incluye `hud_slot`; `completeTask` y `sendTaskToFollowUp` lo limpian (`hud_slot: null`) como parte de la misma mutation, sin estados intermedios — igual que pidió Gemini.

**Decisión de integración no cubierta por la spec** (resuelta sin volver a Gemini, por ser un detalle de ingeniería y no de diseño): equipar una tarea a un slot (`equipTaskToSlot`) también le pone `status = 'in_progress'`. Así la ventana flotante de foco (`FocusFloat`, Fase 6.6, que lee tareas `in_progress`) siempre muestra lo mismo que está equipado en el HUD, sin duplicar el concepto de "tarea activa" en dos mecanismos separados.

**Refactor necesario de `FocusFloat`**: el botón del nav tenía su propio estado de ventana PiP aislado. Como el botón "Atacar" de cada `CombatSlotCard` necesita disparar la *misma* ventana (el navegador solo permite una ventana Document Picture-in-Picture a la vez), se extrajo el estado a `src/features/tasks/FocusFloatContext.tsx` (`FocusFloatProvider` + `useFocusFloat()`), montado una vez en `Layout`. `FocusFloatButton` ahora es un consumidor liviano del contexto; el comportamiento visible no cambió.

**Componentes** (`src/features/battle-hud/`):
- `api.ts` / `hooks.ts`: `fetchHudTasks`, `fetchEquippableTasks` (backlog triado sin slot), `equipTaskToSlot`, `unequipTaskFromSlot`.
- `BattleHudPage.tsx`: resumen del jugador (categoría "dominante" = mayor `current_level`, empate por `current_xp` — la spec no definió esta métrica, decisión mía documentada acá) + racha, grid de 3 slots, footer con accesos a Grimorio (Kanban) e Inbox.
- `CombatSlotCard.tsx`: insignia de dificultad con los emojis literales de la spec (🗡️/⚔️/🗡️✨ — mismo criterio ya usado en `AchievementCelebration` para iconos de logro, no de navegación), barra de HP segmentada (con subtareas: total/restantes: sin subtareas: barra única que desaparece al completar), y las 3 acciones: Atacar (abre `FocusFloat` compartido), Golpe final (`completeTask`), Retirada Táctica (dropdown: Mover a Follow-up con el mismo default de 7 días sin stakeholder que ya usa el botón rápido del Kanban desde Fase 6, o Devolver al Grimorio).
- `EmptySlotCard.tsx`, `GrimorioDrawer.tsx` (drawer lateral con filtro por categoría, igual patrón visual que el filtro de Calendario/Kanban).

**Simplificación respecto a la spec** (documentada, no oculta): el header de `BattleHudPage` no repite el botón de notificaciones — ya está siempre visible en el nav superior, y duplicarlo iba en contra del objetivo mismo del módulo (menos ruido visual). Si Gemini insiste en tenerlo también ahí, es un ajuste de una línea.

**Routing y nav**: `/` (index route) ahora renderiza `BattleHudPage` en vez de redirigir a `/inbox`. Se agregó "Combate" como primer ítem del nav (ícono `Swords`, `end` para que no quede marcado activo en todas las rutas) y el logomark ahora linkea a `/` en vez de `/inbox`.

**Tokens nuevos** en `index.css`: `--color-surface-card` / `--color-border-card` (valores de la spec de Gemini para dark: `#281c33` / `#3d2a4e`; fallback claro definido por mí ya que la spec solo dio valores oscuros).

### Pendiente de correr manualmente
1. **SQL Editor de Supabase**: correr `supabase/migrations/20260726000001_fase7_battle_hud_slots.sql` completo. ✅ **Ya corrido por el usuario** (2026-07-26).
2. Typecheck (`tsc -b`), `oxlint` y `npm run build` corridos y limpios.

### Módulo 2 — "Dungeon Bosses & Epic Raids" (implementado 2026-07-26)

Igual que en el Módulo 1, se encontraron problemas técnicos reales en la spec de Gemini antes de tocar código — esta vez de un tipo distinto: no eran huecos de conocimiento sobre el estado de la app (como el `follow_up` del Módulo 1), sino dos decisiones de implementación que violaban garantías ya establecidas. Se resolvieron sin necesidad de volver a Gemini (no cambian nada visible del diseño, solo *cómo* se construye) y se le avisó al usuario con la explicación en el chat:

1. **La función `get_project_boss_stats` de la spec original era `SECURITY DEFINER` sin filtrar por `user_id`** — cualquier usuario autenticado podría haber consultado el HP/progreso del proyecto de otro usuario, porque `SECURITY DEFINER` ignora RLS. Ningún otro objeto de este esquema usa `DEFINER` para lógica de negocio (solo los 2 triggers de seed en creación de cuenta, donde no hay contexto de usuario todavía). **No se creó esa función.** El HP del jefe se calcula en el cliente (`computeBossStats` en `projects/api.ts`) sobre una query normal de `tasks` — ya protegida por la RLS existente —, igual que ya hacía `ProgressPage` con el progreso semanal de proyectos.
2. **La spec pedía que el cliente otorgue el bonus de XP directamente** al reclamar una fase — contradice la regla de Fase 2 de que toda la lógica de XP vive en Postgres, nunca en el cliente. Se agregó `claim_boss_phase(project_id, phase)` (`SECURITY INVOKER`, migración `20260726000002_fase7_dungeon_bosses.sql`): valida server-side que la fase realmente se alcanzó (recalculando el HP adentro de la función, no confía en lo que mande el cliente), es idempotente si se reclama dos veces, y otorga el XP a la categoría del proyecto con el mismo patrón `on conflict` que ya usa `tasks_after_done`.

**Decisión de UX no cubierta por la spec** (Gemini no especificó dónde viven las tarjetas de proyecto — hoy no existe ninguna página de "lista de proyectos" en la app, solo aparecen como pestañas dentro de Kanban): se agregó una sección nueva **"Jefes de Mazmorra"** en `ProgressPage.tsx`, con una grilla de `ProjectBossCard` por cada proyecto activo. Si Gemini lo pensó en otro lugar, es fácil de mover.

**Modelo de datos**:
- `projects` gana `boss_avatar` (default `'dragon_default'`), `boss_title` (default `'Señor del Caos'`), `phases_claimed integer[]` (default `'{}'`). Sin UI para editarlos todavía — quedan en su default hasta que se pida esa función.
- `Database['public']['Functions']` en `database.types.ts` ahora tipa `claim_boss_phase` (antes era `Record<string, never>` — no había ninguna función RPC tipada en el proyecto hasta ahora).

**Componentes** (`src/features/projects/`, extendiendo el feature ya existente en vez de crear uno nuevo, como pidió la spec):
- `BossHealthBar.tsx`: barra con gradiente carmesí→dorado y 4 marcadores de fase (75/50/25/0%) con ícono de cofre que se ilumina en oro al reclamarse.
- `PhaseRewardModal.tsx`: mismo patrón visual y de partículas que `AchievementCelebration` (Fase 6) — reutiliza las clases CSS `.achievement-modal`/`.achievement-burst` en vez de duplicar la animación.
- `ProjectBossCard.tsx`: tarjeta reducida para la grilla de `ProgressPage`, mini barra de HP + emoji de avatar (mapa `boss_avatar → emoji`, con `🐲` de fallback para cualquier valor no mapeado — solo existe `dragon_default` por ahora).
- `BossEncounterPage.tsx` (ruta `/projects/:projectId/boss`): header con avatar/título/categoría, `BossHealthBar`, lista de misiones activas del proyecto con botón "Equipar" que manda la tarea al primer slot libre del Battle HUD (deshabilitado si los 3 slots están ocupados o la tarea ya está equipada). Detecta automáticamente fases nuevas cruzadas (efecto que compara `stats.percentRemaining` contra `project.phases_claimed`) y dispara `claim_boss_phase` + `PhaseRewardModal` — si de un golpe se cruzan varias fases a la vez, se reclaman una por una (cada reclamo invalida el proyecto, el efecto vuelve a correr y encuentra la siguiente fase pendiente).

**HP en tiempo real**: no hizo falta wiring nuevo — `useTasksByProject` usa la clave `['tasks', 'by-project', projectId]`, que ya cae dentro del barrido de invalidación existente (`queryClient.invalidateQueries({queryKey: ['tasks']})` en `useInvalidateTasks`). Completar una tarea desde el HUD, el Kanban o la propia página del jefe actualiza el HP solo.

### Pendiente de correr manualmente
1. **SQL Editor de Supabase**: correr `supabase/migrations/20260726000002_fase7_dungeon_bosses.sql` completo. ✅ **Ya corrido por el usuario** (2026-07-26) — tuvo un error de sintaxis en el `RAISE` (`%%` en vez de `%`, ver historial de chat), corregido en el archivo y vuelto a correr con éxito.
2. Typecheck, `oxlint` y `npm run build` corridos y limpios.

### Módulo 3 — "The Strategy Table" (implementado 2026-07-26)

No requirió migración nueva (reutiliza el `size` obligatorio ya impuesto en Fase 6.4). Reemplaza por completo `TriagePage.tsx` (se borró) por `StrategyTablePage.tsx` en la ruta `/triage` — el nav ahora dice "Estrategia" en vez de "Triage".

**Dos problemas reales encontrados antes de implementar, explicados al usuario en el chat:**

1. **La spec decía "tria directamente con `status = 'follow_up'`"** para la salida "Mover a Seguimiento" — igual que en el Módulo 1, esto por sí solo dejaría la tarea invisible en toda la app: fuera del Kanban y del HUD (excluyen `follow_up`) y **tampoco** aparecería en Follow-ups, porque esa página lee de la tabla `follow_ups`, no del status. `dispatchTriagedTask` (`triage/api.ts`) ahora también crea el registro en `follow_ups` (7 días, sin stakeholder — mismo default que ya usa el botón rápido del Kanban) en el mismo despacho.
2. **La spec de este módulo contradice una decisión explícita de la Fase 6.2** (el usuario había dicho literalmente "quiero que no tenga follow-up en el triage" al diseñar la acción de Kanban). Como pisaba una decisión tomada a propósito, se confirmó explícitamente con el usuario antes de escribir el botón — respondió que sí, agregarlo. Queda documentado acá para que quede claro que la Mesa de Estrategia **sí** tiene follow-up, a diferencia de lo que decía la sección 9 hasta ahora; if a esta altura alguien relee la tabla de decisiones, la fila de "Notificaciones Fase 4" y el punto 6.2 ya no aplican tal cual a Triage.

**Decisión de implementación sin necesidad de confirmar** (no cambia nada visible): "Equipar en Combate" pasa la tarea a `in_progress` además de asignarle `hud_slot` — la spec decía literal "(pending + hud_slot)", pero esto rompería la convención ya establecida en el Módulo 1 de que equipar un slot siempre implica `in_progress` (para que `FocusFloat` nunca se desincronice del HUD). Mismo botón, mismo resultado visual, un solo camino de código para "equipar" en toda la app.

**`dispatchTriagedTask`** (`triage/api.ts`) setea `kanban_column_id` en las **3 salidas** por igual (incluida `follow_up`) — es lo que el trigger `tasks_after_triage` usa para detectar que una tarea salió del inbox y, si llega a 0, completar la quest diaria de triage. El status no es lo que "tria" una tarea, la columna sí.

**Componentes** (`src/features/triage/`):
- `WeaponSelector.tsx`: 3 cartas (Daga/Espada/Mandoble) con resplandor de color propio por arma (tokens nuevos `--weapon-daga`/`--weapon-espada`/`--weapon-mandoble`).
- `InboxCardDeck.tsx`: la "carta activa" — título editable, deadline con atajos Hoy/Mañana, y un efecto visual de 2 cartas apiladas detrás (puramente decorativo) cuando quedan más de 1-2 tareas por triar.
- `DirectEquipToggle.tsx`: terminó siendo un botón de acción (no un checkbox modificador) — es la salida "Equipar en Combate" en sí, deshabilitado con tooltip si los 3 slots del HUD están ocupados.
- `StrategyTablePage.tsx`: orquesta todo — categoría/proyecto (mismo selector + "crear proyecto nuevo" que ya tenía el `TriagePage` viejo, la spec no los mencionó pero son necesarios para que la tarea tenga a dónde ir), `WeaponSelector`, y las 3 acciones de despacho al pie. Estado "Maza Limpia — ¡Inbox Vacío!" cuando no hay nada que triar.
- `useTriageSession` (`triage/hooks.ts`): combina `useInboxTasks` + la mutation de despacho, invalidando `tasks`/`gamification`/`follow-ups`/`battle-hud` — cualquiera de las 3 salidas puede afectar cualquiera de esos cuatro dominios.

### Módulo 4 — "Design System & Asset Studio" (implementado 2026-07-26, cierra la Fase 7)

Módulo de consolidación — no agrega features, ordena y afina los tokens que fueron saliendo ad-hoc en los Módulos 1-3. Sin migración.

**El problema real encontrado**: la spec de Gemini define los tokens de `@theme` con **hex fijos, sin distinguir claro/oscuro** (`--color-bg: #120c18` directo, etc.). Implementarlo literal habría **eliminado el modo claro por completo** — el esquema actual de `index.css` depende a propósito de una indirección (`@theme` apunta a variables que cambian entre `:root` y `@media (prefers-color-scheme: dark)`), y el modo claro es un requisito explícito desde el spec original ("modo oscuro soportado desde el inicio", con el claro como respaldo siempre mantenido — hasta hubo un bug documentado en la sección 8 sobre esto). Se mantuvo la estructura claro/oscuro intacta y se aplicaron los valores de Gemini **solo del lado oscuro**; el claro sigue con sus valores ya establecidos de sesiones anteriores.

**Dos decisiones de nomenclatura, sin necesidad de confirmar** (no cambian nada visible, evitan renombrar tokens ya usados en docenas de componentes):
- Se mantuvieron `--color-gold`/`--color-gold-bright` en vez de renombrarlos a `--color-accent-gold`/`--color-accent-gold-hover` como pedía la spec — mismo propósito, ya está en uso en `AchievementCelebration`, `CombatSlotCard`, `BossHealthBar`, `WeaponSelector`, etc. Solo se actualizó el valor de `gold-bright` (`#f0c364` → `#f0be5d`, el tono que dio Gemini para el hover).
- No se agregó `--font-body`: el token que ya existe, `--font-sans`, es el que Tailwind v4 reconoce especialmente para generar la utilidad `font-sans` (la que ya aplica por defecto a todo el texto vía `body { font-family: var(--font-sans) }`). Agregar `--font-body` habría sido un duplicado sin uso.

**Tokens nuevos agregados** (disponibles, sin forzar su uso en ningún componente específico — la spec los presenta como paleta, no pide dónde aplicarlos): `--color-border-glow` (`#63437f` oscuro / respaldo claro), `--color-accent-runic` (`#7c3aed` — mismo violeta que ya usa la categoría Concentrix, casualidad útil).

**Tabla de 4 estados aplicada** a los componentes que realmente muestran variedad de status simultánea:
- `TaskCard.tsx` (Kanban): fondo base pasó a `bg-surface-2` (antes `bg-surface`, por la tabla de Gemini); `in_progress` ahora tiene borde+glow dorado; `done` tiene el título tachado, la tarjeta al 60% de opacidad, y un pequeño "sello de cera" dorado (circulito con ✓) junto al título.
- `FollowUpsPage.tsx`: filas no vencidas pasaron a borde punteado color pergamino mudo (antes borde sólido) + badge 👁️ junto al título — las vencidas mantienen el estilo de urgencia (`warn-*`) por encima, sin cambios, porque la urgencia pisa la identidad visual de "en seguimiento".
- No se tocó `CombatSlotCard` ni el resto de las tarjetas: por diseño ya establecido en el Módulo 1, esas vistas **nunca** muestran tareas `done` o `follow_up` (se excluyen de sus queries), así que la tabla de 4 estados no aplica ahí — solo `pending`/`in_progress`, que ya tenían tratamiento visual propio desde antes.

**Verificación del checklist**: no quedan clases `dark:` sueltas — el único uso en todo el código (`AmbientBackground.tsx`, `dark:opacity-100 opacity-0`) es intencional y funcional, apaga el fondo animado en modo claro. Fuentes (`Cinzel`, `Inter`, `JetBrains Mono`) ya cargadas desde la Fase 6/adenda de la sección 8, sin cambios. `npm run build` y `oxlint` limpios.

**Con esto se cierra la Fase 7** (los 4 módulos que trajo Gemini). Cualquier trabajo nuevo a partir de acá es una fase no especificada todavía, igual que pasó entre la Fase 5 y la Fase 6.

### Integración de assets visuales (implementado 2026-07-26)

Gemini generó las imágenes de armas/jefes/loot con Imagen 3 y el usuario las guardó en `public/assets/rpg/{weapons,bosses,loot}/`. Se integraron vía `src/utils/rpgAssets.ts` (`WEAPON_ICONS` por `TaskSize`, `BOSS_AVATARS` + `bossAvatarSrc()` con fallback a dragón, `LOOT_ICONS`) en `WeaponSelector` (Módulo 3), `CombatSlotCard` (Módulo 1), `BossHealthBar`/`BossEncounterPage`/`ProjectBossCard`/`PhaseRewardModal` (Módulo 2) — reemplazando los emojis que se habían usado como placeholder hasta ahora.

**Problema real encontrado, no cosmético**: las imágenes originales venían a **2048×2048 sin comprimir, entre 4.8 y 7.7 MB cada una** (37 MB en total para 6 íconos). El build directamente **fallaba** — `vite-plugin-pwa` tiene un límite de 2 MB por archivo para precachear en el service worker. Aunque se hubiera subido ese límite a mano, meter 37 MB al cache offline de la PWA iba en contra de un requisito no funcional del spec original ("la vista de captura debe cargar en menos de 1 segundo"). Se creó `scripts/optimize-rpg-assets.mjs` (mismo patrón que `scripts/generate-icons.mjs`, usa `sharp` que ya era dependencia del proyecto) que redimensiona y recomprime los originales in-place: armas y cofre a 256×256, avatares de jefe a 512×512, PNG con paleta indexada. Resultado: de 37 MB a ~485 KB combinados. **Si en el futuro se generan más assets con Imagen 3, correr este script antes de integrarlos** (`node scripts/optimize-rpg-assets.mjs`, ajustando la lista `TARGETS` con los nuevos archivos) — no asumir que las imágenes que llegan de un generador de IA ya vienen en un tamaño usable para web.

**Nota de nomenclatura**: la spec de referencia usaba `chest_gold.png` como nombre de ejemplo; el archivo real que generó el usuario se llama `chest.png` — se usó el nombre real, no el del ejemplo.

Ya incluido en el precache del Service Worker sin tocar `vite.config.ts`: el `globPatterns` de `injectManifest` ya incluía `png` desde antes, y Vite copia todo `public/*` a la raíz de `dist/` — el build pasó de 15 a 21 entradas precacheadas (+~700 KB) apenas se agregaron las imágenes optimizadas. Verificado con `npm run build` limpio y las imágenes cargando (200 OK) en el navegador.

### Reemplazo de favicon/íconos PWA (2026-07-26)

El usuario regeneró el favicon con una herramienta externa (por los nombres de archivo — `favicon-96x96.png`, `web-app-manifest-*.png`, `site.webmanifest` — es el patrón típico de realfavicongenerator o similar) y pidió revisar que quedara todo bien conectado. **No lo estaba**: la herramienta soltó los archivos nuevos en `public/icons/` pero no actualizó nada que los referenciara, y de paso se borraron 4 archivos que sí estaban en uso (confirmado con `git status`):

- `public/favicon.svg` (raíz) — borrado, pero `index.html` seguía apuntándole.
- `public/icons/icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — borrados, pero `vite.config.ts` seguía usándolos en `manifest.icons` → **el ícono de instalación de la PWA estaba roto** hasta este arreglo.

Se corrigió:
- `vite.config.ts`: `manifest.icons` ahora apunta a `web-app-manifest-192x192.png`/`-512x512.png` (los archivos nuevos), y `includeAssets` a los nombres reales que quedaron (`favicon.ico`, `icons/favicon-96x96.png`, `icons/apple-touch-icon.png`).
- `index.html`: favicon apuntando a `/favicon.ico` (raíz) + `/icons/favicon-96x96.png`, en vez del `/favicon.svg` roto.
- Se borró `public/icons/site.webmanifest` (boilerplate genérico sin personalizar del generador — "MyWebSite"/"MySite" — no lo usa nada, Vite genera su propio manifest desde `vite.config.ts`) y el `favicon.ico` duplicado que quedó en `icons/` (se mantiene el de la raíz, que es el que los navegadores buscan por convención sin necesidad de `<link>`).

**Dos hallazgos de calidad, no solo de wiring:**
1. **`icons/favicon.svg` pesaba 5.91 MB** — no era un SVG vectorial real, era una sola etiqueta `<image>` envolviendo un PNG de 1701×1701 en base64 (0 `<path>`). Con eso el build fallaba (mismo límite de 2 MB de precache que ya había dado problema con los assets RPG). Se sacó de la app — ya hay cobertura equivalente en raster (`favicon.ico` + `favicon-96x96.png` + `apple-touch-icon.png`), así que no se perdió nada funcional.
2. **El ícono de 512×512 no tiene zona de seguridad** (el contenido llega hasta el borde, verificado a nivel de píxel) — se lo dejó como `purpose: 'any'` en vez de `'maskable'` (el `site.webmanifest` sin usar que trajo el generador sí lo marcaba maskable, pero aplicarle la máscara circular/redondeada de Android a un ícono sin margen lo recortaría). Si más adelante se quiere un ícono maskable real, hay que regenerar con ~20% de padding alrededor del contenido.

**Nota para el futuro**: `scripts/generate-icons.mjs` + `scripts/icon-any.svg`/`icon-maskable.svg` (el generador de íconos anterior, basado en `sharp`) quedaron desactualizados respecto al nuevo arte — si alguien lo corre de nuevo, va a recrear los archivos viejos (`icon-192.png`, etc.) en rutas que ya no usa nada, sin romper el build pero como archivos sueltos sin conectar. No se tocó ese script por las dudas de que el usuario todavía quiera el arte vectorial original como fuente.

Sin la migración de Fase 6 corrida, el código del cliente asume que existe el status `'follow_up'` y que las subtareas dan XP — crear una tarea con status `'follow_up'` fallaría el check constraint en la base real (ya no aplica: la migración está corrida, se deja como advertencia para entornos nuevos).

---

## 15. Fase 8 — Rediseño "Questly", segunda ronda con Gemini (Pasos 1-9, 2026-07-26)

Continuación de la colaboración descrita en la sección 14, después de cerrarse la Fase 7 (Módulos 1-4). Esta ronda Gemini mandó specs numeradas **"Paso"** (no "Módulo") en archivos sueltos (`PASO_1_...md` a `PASO_9_...md`, fuera del repo, en `Backup Prod App/Gemini Specs/`). Mismo flujo que antes: Gemini especifica, Claude audita la spec contra el estado real del código *antes* de escribir nada, y cualquier conflicto con una decisión ya tomada o con el schema real se lleva de vuelta al usuario en vez de improvisar.

**Patrón que se repitió en casi todos los pasos**: el código de las specs venía copiado de un prototipo de Google AI Studio que no conocía el estado real del repo — nombres de hooks/tipos inventados que no existen, imports sin usar que rompen el build (`noUnusedLocals`), y en un par de casos bugs de lógica reales (no solo de nomenclatura). Se corrigieron todos antes de dar cada paso por cerrado; quedan documentados abajo.

### Paso 1 — Rebranding "Questly" & Login Grimorio
- Metadatos de marca (`index.html`, `vite.config.ts` → `manifest`) actualizados a **Questly** / "Maneja tus misiones. Conquista el caos.".
- `LoginPage.tsx` reescrito con el look "Grimorio de Acceso" (pestañas oro/ciruela). `hero_name` se captura en `user_metadata` de Supabase Auth vía `signUp`, sin mostrarse todavía en ningún lado de la UI.
- Corrección: el redirect post-login apuntaba a `/inbox`; se cambió a `/` porque el índice ya renderiza `BattleHudPage` desde la Fase 7 Módulo 1 — la spec ya traía `/` bien, era el código viejo el desactualizado.

### Paso 1.5 — Sidebar Plegable & App Shell
- `Layout.tsx` reemplazado: sidebar lateral con overlay de `backdrop-blur` ("aislamiento TDAH"), header fijo, cierre con Escape/cambio de ruta.
- Los 7 íconos de nav (`public/assets/rpg/nav/*.png`) llegaron sin comprimir de Imagen 3 (~46 MB combinados, mismo problema que los assets RPG de la Fase 7 Módulo 4) — se extendió `scripts/optimize-rpg-assets.mjs` con esos 7 archivos (256px) y se corrió antes de integrarlos (quedaron en ~272 KB).
- `Logomark.tsx` quedó sin ningún import en toda la app después de este paso y del Paso 1 — no se borró, candidato a limpieza si se confirma que no hace falta.

### Paso 2 — Battle HUD inmersivo
- `CombatSlotCard`, `EmptySlotCard`, `BattleHudPage` rediseñados: barra de HP segmentada por subtarea, secuencia `shake → kill-flash → completeTask` al asestar el golpe final, tema de color dinámico por categoría.
- Corrección: la spec importaba el ícono `Check` de lucide sin usarlo en el JSX (el botón de menú era solo texto "⋯") — se sacó del import y se usó `MoreVertical` (que sí estaba importado) en su lugar.

### Paso 3 — Inbox "Pergamino de Captura"
- `InboxDashboard.tsx`/`InboxPage.tsx` reescritos con el dashboard de métricas (racha/XP/triage/prioridad/alertas) y el cuadro de captura fricción-cero.
- **Decisión confirmada con el usuario**: el dashboard de métricas queda arriba y la captura abajo — esto revierte el orden que se había pedido explícitamente en la Fase 6.9 (captura primero, dashboard después). Este es el orden vigente ahora.
- Corrección: la spec tenía un typo de import (`'react me-router-dom'`) con un `Link` duplicado sin usar, y dos íconos (`Trophy`, `Zap`) importados sin renderizarse (el nuevo Empty State usa emojis en vez de esos íconos).

### Paso 4 — Mesa de Estrategia (mazo de cartas 3D)
- `StrategyTablePage`/`WeaponSelector`/`InboxCardDeck` reescritos con mazo apilado en perspectiva 3D y física de despacho `slide-out` de 450ms antes de la mutation.
- `DirectEquipToggle.tsx` quedó absorbido como el tercer botón del footer directamente en la página (así lo definió la nueva spec, ya no como componente aparte) — se borró por completo en vez de dejarlo como código muerto, porque solo se usaba ahí.

### Paso 5 — Sala del Jefe de Mazmorra
- `BossHealthBar`, `PhaseRewardModal`, `BossEncounterPage` con barra de HP masiva, cofres de loot por fase (75/50/25/0%) y modal de recompensa con destello dorado.
- **Bug real de CSS corregido**: `.chest-icon-phase.active` traía `drop-shadow: ...` como propiedad CSS suelta — eso no existe, `drop-shadow` solo es válido como función dentro de `filter`. El navegador la habría ignorado en silencio y el resplandor dorado del cofre activo nunca se vería. Se integró al `filter` que ya estaba en la misma regla.
- Mismo patrón de import sin usar (`Swords`, ícono no renderizado) que en el Paso 2.

### Paso 6 — El Grimorio Dual (Kanban)
- Reemplaza el Kanban de columnas por dos vistas de lista: `GrimorioAccordionView.tsx` (Foco Gradual — acordeón de 3 niveles: Enfrentamiento Activo/Estrategia Próxima/Archivos de la Orden) y `GrimorioTabsView.tsx` (Ámbitos por Clase — sellos de cera + Pendientes/Completadas), con toggle persistido en `localStorage` (`questly_grimorio_mode`).
- **Conflicto de alcance, confirmado con el usuario → reemplazo literal**: se pierden el drag-and-drop (`@dnd-kit`), el CRUD de columnas custom (+ Columna, mover ‹ ›), la vista por proyecto (ruta `/kanban/:projectId`, eliminada del router) y el deep-link de "vencidas/hoy" que el Inbox mandaba vía `location.state` (Fase 6.9).
- **Bug real corregido antes de implementar**: la spec llamaba `useBoardTasks(null)`, que en la API existente significa "solo tareas sueltas sin proyecto" (`fetchBoardTasks` filtra `.is('project_id', null)`) — con la vista unificada nueva ("registro general de misiones") eso habría ocultado silenciosamente cualquier tarea que perteneciera a un proyecto. Se agregó `fetchAllBoardTasks`/`useAllBoardTasks` (`tasks/api.ts`/`hooks.ts`) que trae todo junto, sin ese filtro.
- `KanbanBoard.tsx`, `KanbanColumn.tsx` y los hooks de CRUD de columnas (`useCreateColumn`, `useKanbanColumns`, `useUpdateColumnPosition`) quedaron sin usar pero sin borrar — todo el sistema de drag-and-drop y columnas custom de las Fases 1 y 3. El bundle JS bajó ~36 KB porque ya no se bundlean (nada los importa).

### Paso 7 — El Oráculo del Tiempo Dual (Calendario)
- Reemplaza el calendario mes/semana/día por `CalendarTimelineView.tsx` (Chrono-Stream vertical, con medidor de energía/fatiga por día) y `CalendarHeatmapView.tsx` (mapa de calor + panel lateral "Jornada Escogida"), toggle persistido en `localStorage` (`questly_calendar_mode`).
- **Conflicto de alcance, confirmado con el usuario → reemplazo literal**: se pierde navegar a fechas pasadas (el nuevo Oráculo es solo-futuro: hoy + N días), el filtro de categoría y el toggle "Mostrar completadas" (decisión de la Fase 6.7). `CalendarPage.tsx` era el único consumidor de esas features y se sobreescribió entero, así que no quedó nada huérfano para limpiar acá (a diferencia del Kanban).
- **Bug post-implementación, reportado por el usuario en vivo y corregido**: `rangeStart = new Date()` usaba el instante exacto de "ahora" en vez del inicio del día; como `fetchTasksInRange` filtra con `.gte('deadline', startIso)`, cualquier tarea con deadline más temprano ese mismo día quedaba excluida. Se cambió a `startOfDay(subDays(today, 2))` / `endOfDay(addDays(today, 21))` (2 días de margen atrás por variación de zona horaria, día completo en el límite superior). Los guards `t.deadline &&` antes de cada `isSameDay` ya estaban bien puestos, no hizo falta tocarlos.

### Paso 8 — Salón de Héroes (Progreso)
- Grid de 2 columnas (5 cols racha/quests/jefes / 7 cols clases/loot) + `ClassDetailModal.tsx` nuevo (pergamino de clase, tabs Misiones Activas/Victorias, barra de XP con destello `.xp-flash-anim`).
- Varios bugs reales corregidos antes de compilar: `useTasksByCategory` no existía (se agregó en `tasks/api.ts`/`hooks.ts`, mismo patrón que `useTasksByProject`); el tipo `CategoryXp` no existe, el real es `UserCategoryXp`; `useUserAchievements` no existe (se reusó el componente `LootShowcase` ya construido, que además muestra insignias bloqueadas — la spec lo hubiera perdido); `q.title` no existe en la tabla `quests` (solo tiene `type`, no `title` — se agregó un mapa `QUEST_TITLES` derivado de `q.type`, mismo criterio que ya usaba la versión anterior de la página); la sección de Jefes de Mazmorra tenía la barra de HP hardcodeada a `width: '70%'` fijo para todos los proyectos — se reemplazó por el componente `ProjectBossCard` ya existente, que calcula el HP real vía `useBossStats`.

### Paso 9 — Editor de Misiones "Pergamino de Decreto"
- `TaskModal.tsx` reescrito con chips táctiles de un clic (envergadura/dificultad, plazo rápido, clase/categoría), micro-stepping con barra de integridad HP de subtareas, acordeón `<details>` de notas/proyecto, y sello de guardado animado (`.animate-seal-flash`).
- Varios bugs reales corregidos: `useCreateSubtask`/`useToggleSubtask`/`useDeleteSubtask` no existían (se usan los hooks genéricos `createTask`/`updateTask`/`deleteTask` ya probados, mismo patrón que la versión anterior del modal); crear un micro-paso sin deadline habría fallado siempre contra la constraint `deadline_required_once_triaged` de la DB (las subtareas la exigen siempre, sin excepción) — el nuevo micro-paso hereda el deadline de la tarea padre automáticamente, sin pedirlo en el formulario; no había validación de deadline obligatorio ni manejo de errores de guardado (si el guardado fallaba, el modal se quedaba colgado sin avisar nada) — se reintegró el estado de error + validación; el input de fecha usaba `deadlineIso.slice(0, 16)` directo sobre el ISO string, mostrando la hora en UTC en vez de la hora local del usuario — se usaron los helpers ya existentes `toDatetimeLocalValue`/`fromDatetimeLocalValue`.
- **Conflicto de alcance, confirmado con el usuario → reintegrar (no reemplazo literal)**: la spec eliminaba por completo el botón Completar/Reabrir, la estrella ★ de "Prioridad del día" (decisión de la sección 9) y toda la gestión de Follow-up (enviar a seguimiento / cancelar / registrar contacto, Fase 6.2) — las 3 se reintegraron al modal con el estilo visual nuevo de chips, en vez de perderse.
- Efecto colateral: al sacar la prop `defaultCategoryId` (ya no existe en la firma nueva del modal; solo la usaba el `KanbanBoard.tsx` huérfano del Paso 6), hubo que sacarla también de ese único caller para que el proyecto siguiera compilando — `KanbanBoard.tsx` sigue igual de muerto que antes, solo se mantuvo consistente.

### Estado y commits de la Fase 8
Los 9 pasos están implementados, verificados uno por uno (`tsc -b` + `oxlint` + `npm run build` limpios, y recarga en caliente sin errores de consola en el navegador) y ya en GitHub, en 3 commits:
```
7aa262f Grimorio Dual, Oraculo del Tiempo, Salon de Heroes y Editor de Misiones (Gemini Pasos 6-9)
da2208a Inbox pergamino, Mesa de Estrategia y Sala del Jefe (Gemini Pasos 3, 4, 5)
236c651 Rebranding Questly + Sidebar shell + Battle HUD inmersivo (Gemini Pasos 1, 1.5, 2)
```
El dev server no se cerró entre pasos en esta sesión (a pedido explícito del usuario) — quedó corriendo en `http://localhost:5173` durante toda la sesión.

### Paso 10 — Pacto de Custodia (commit `8059cee`)
- Migración `20260727000001_fase8_followup_logs.sql`: tabla `follow_up_logs` (bitácora, RLS por `user_id`) y columna `follow_ups.resolved_at`.
- **Resolución blanda**: "Resolver Éxito" pone `resolved_at` y reabre la tarea (`reopenTask`), en vez de borrar la fila como pedía la spec — borrarla se llevaría la bitácora recién escrita. "Cancelar seguimiento" (TaskModal) sigue borrando de verdad.
- `contact_count` se deriva de los logs, no se guarda. "Registrar contacto" (`LogContactModal`) inserta un log y reinicia `last_contacted_at`/`interval_days` (+1/+2/+3 días); el trigger existente recalcula `next_reminder_at`.
- UI: `FollowUpCard` (medidor de insistencia + acordeón histórico), `LogContactModal`, `FollowUpsPage` rediseñada. La Edge Function y `fetchFollowUps` excluyen follow-ups con `resolved_at`.

---

## 16. Auditoría y limpieza (2026-07-27)

Revisión completa del código tras la Fase 8 + Paso 10. Antes de tocar: `tsc -b` limpio, `oxlint` con 2 warnings de fast-refresh. Después: `tsc -b`, `oxlint` (mismos 2 warnings) y `npm run build` limpios (28 entradas de precache).

### Bugs corregidos
1. **Re-enviar a seguimiento una tarea ya resuelta fallaba**: `follow_ups` tiene `unique(task_id)` y, desde el Paso 10, resolver ya no borra la fila → el `INSERT` chocaba. `createFollowUp` ahora hace `upsert` por `task_id` con `resolved_at: null` y `last_contacted_at` reiniciado (reactiva el seguimiento conservando la bitácora).
2. **`fetchFollowUpForTask` devolvía follow-ups resueltos**, así que `TaskModal` creía que la tarea seguía en seguimiento. Ahora filtra `resolved_at is null`.
3. **Completar una tarea en seguimiento no cerraba el follow-up**: seguía generando push de "Seguimiento pendiente". `completeTask` ahora llama a `closeFollowUpForTask` (nuevo, `tasks/api.ts`), que pone `resolved_at` y descarta las notificaciones `follow_up` pendientes. `resolveFollowUp` usa el mismo helper. *Decisión del usuario: solo cliente, sin trigger de Postgres.* Limitación: completar una tarea por una vía que no pase por `completeTask` (p. ej. SQL directo) no cierra el follow-up.
4. **Ícono de push roto**: `src/sw.ts` apuntaba a `/icons/icon-192.png` (borrado al cambiar el favicon). Ahora usa `web-app-manifest-192x192.png`.
5. **"Registrar contacto ahora" en `TaskModal` esquivaba la bitácora** (solo pisaba `last_contacted_at`). Se quitó el botón; el único flujo es `LogContactModal`.

### Código borrado (sin consumidores)
`KanbanBoard.tsx`, `KanbanColumn.tsx`, `TaskCard.tsx` (solo lo usaba `KanbanColumn`; la "tabla de 4 estados" del Módulo 4 aplicada ahí ya no se veía en ningún lado), `kanban/hooks.ts`, `Logomark.tsx`, `utils/categoryIcon.tsx`, `scripts/generate-icons.mjs` + `icon-any.svg` + `icon-maskable.svg`; en `kanban/api.ts` el CRUD de columnas; `fetchBoardTasks`/`useBoardTasks`; `useCreateFollowUp`, `useUpdateFollowUp`, `useRegisterFollowUpContact`, `updateFollowUp`, `registerFollowUpContact`, `useSendTaskToFollowUp`. Dependencias quitadas: `zustand`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `web-push`.

### Se conserva a propósito
`kanban/api.ts` → `fetchKanbanColumns` y `fetchFirstColumnId` (las usan `completeTask`, `reopenTask` y `dispatchTriagedTask`). La tabla `kanban_columns` y sus triggers de seed siguen vivos: las columnas "Por hacer"/"En progreso"/"Hecho" ya no se ven en la UI, pero sostienen la lógica de `kanban_column_id` (una tarea está "triada" si tiene columna).

---

## 17. Fase 9 — Rediseño "Hyrule" (BotW/TotK), en curso desde 2026-10-13

Pedido del usuario: tonos verdes inspirados en Breath of the Wild / Tears of the Kingdom. **La app se publicará: inspirarse, no copiar** — sin Trifuerza, Espada Maestra, "Sheikah", tipografía Hylian ni arte de Nintendo; nombres y símbolos propios. Pendientes del rediseño en `pendings.md` (assets verdes bloqueados hasta que el usuario pueda generar imágenes).

**Decisiones acordadas**: dirección BotW/TotK; verde manda en la UI, **oro solo para recompensas/logros**; cian "rúnico" (`--rune`) para lo interactivo/HUD; modo claro "Día en el valle" diseñado junto con el oscuro; rojo reservado a enemigos (HP de jefes) y errores reales, nunca a avisos del usuario (se usa ámbar `--warn-*`).

### Fase 1 — Fundación de tokens (hecha, sin verificar visualmente)
- `src/index.css`: paleta nueva. Oscuro "Noche en el bosque" (`bg #0b1410`, `accent #7ccf6a`, `rune #4fd1c5`, `gold #d9a94a`), claro "Día en el valle" (`bg #f3f1e2`, `accent #2f6b3a`). Tokens nuevos: `rune`, `rune-deep`, `accent-deep`, `parchment`, `parchment-ink`, `bg-glow`, `warn-dot`, y canales `*-rgb` (`bg/surface/accent/gold/rune/glow/shade/glass`) para usar `rgb(var(--x-rgb) / alpha)` en el CSS de componentes en vez de `rgba` con hex fijos.
- ~70 clases de componente del CSS migradas a tokens: aurora de fondo (verde/cian/oro), botón primario `.btn-prime` (verde, ya no oro), menú, armas (daga = hoja, espada = runa, mandoble = oro), mapa de calor (hoja→oro, sin rojo), barra de quests (verde), puntos de insistencia (ámbar), pergaminos. Rangos de líneas "recompensa" (logros, cofre, shimmer, xp-flash, sello) conservan oro.
- `.tsx`: `sky-*`→`rune`, `emerald-*`→`accent`, `orange-*`→`gold`, `#0284c7`→`rune-deep`, `#2d241e`/`#f4e4bc`→`parchment-ink`/`parchment`. Follow-ups: rojo→`warn-*` (ámbar).
- Contraste calculado (WCAG): todos los pares de texto ≥ 4.5:1 en ambos temas, incluido el botón primario. Excepción conocida: `--border` oscuro vs `--bg` = 1.9:1 (decorativo; bordes de inputs deberían usar `--border-glow`).
- `tsc -b`, `oxlint` y `npm run build` limpios.

### Fase 2 — Shell y fondo (hecha 2026-10-13, sin verificar visualmente por mí)
- `AmbientBackground` reescrito: **noche** = aurora rúnica + luciérnagas; **día** = haces de luz + polen dorado. El tema lo decide el CSS (`prefers-color-scheme`), ya no se oculta en claro. 16 motas con vagabundeo + parpadeo (solo `transform`/`opacity`), congeladas con `prefers-reduced-motion`.
- `BrandMark.tsx` (nuevo): brote dentro de un rombo, trazo `currentColor`; usado en header y sidebar. Reemplaza al `Logomark` borrado en la auditoría.
- `Layout`: header con filo rúnico (`.app-header`), sidebar con borde cian, rombo luminoso en el ítem activo, textos mínimos subidos a 12px, sombras con tokens.
- Foco visible global (`:focus-visible`, runa cian) — antes varios inputs tenían `outline: none` sin reemplazo global.
- `.panel-rune` en menús flotantes (perfil, notificaciones, retirada táctica) y drawer del Grimorio.
- `theme-color` de `index.html` y `theme_color`/`background_color` del manifest PWA alineados a la paleta nueva (`#f3f1e2` / `#0b1410`).
- Borrado `components/ui/Modal.tsx`: nadie lo importaba (los modales reales usan sus propias clases).
- `tsc -b`, `oxlint`, `npm run build` limpios.

### Extra — "Descartar todas" en notificaciones (2026-10-13)
`NotificationBell` muestra un contador y el botón **Descartar todas** cuando hay pendientes. `dismissAllNotifications` (`notifications/api.ts`) marca `dismissed_at` en todas las no descartadas; **no borra filas** a propósito: el sync usa `unique(task_id, type)` y un borrado haría reaparecer la misma alerta como nueva en la siguiente apertura.

### Fase 3 — Pantallas estrella (hecha 2026-10-13, sin verificar visualmente por mí)
- **Battle HUD**: marco rúnico de esquinas cian en tarjetas de combate, slots vacíos y cabecera (`.rune-frame`; las esquinas se agrandan y encienden al enfocar). Nuevo `StaminaRing.tsx`: la racha es un anillo que se llena hasta el próximo escudo (cada 7 días); solo se llena, nada "se vacía" (diseño sin culpa). "Integridad del Enemigo" en 0% ahora se resalta en oro (listo para el golpe final) en vez de rojo.
- **Tokens `shade`/`glass`** en `@theme` (`bg-shade/40`, `border-glass/10`…): reemplazan los ~68 `bg-black/NN`/`bg-white/NN`/`border-white/NN` fijos de toda la app (21 archivos). En oscuro son idénticos; en claro ahora se adaptan al tema.
- **Emojis → Lucide** en Inbox, Mesa de Estrategia, Sala del Jefe y modal de fase (`Castle`, `Trophy`, `Zap`, `ScrollText`, `Swords`, `Check`/`Circle`).
- **Texto mínimo 12px** (`text-xs`) en battle-hud, inbox, triage y projects (era 8–11px). Botones de acción del HUD a `py-3`.
- `tsc -b`, `oxlint`, `npm run build` limpios.
- No hecho (decisión): HP del enemigo sigue como segmentos rojos — es el enemigo, no el jugador. Íconos de armas/jefes/menú siguen morados hasta la fase 5.

### Fase 4 — Resto de pantallas (hecha 2026-10-13, sin verificar visualmente por mí)
- **Cero emojis estructurales** en toda la app (verificado con barrido). Reemplazados por Lucide: pestañas de clase del Grimorio (`Brain/Axe/BookOpen/Gamepad2/Shield/Leaf`), secciones del acordeón, toggles de Kanban/Calendario, Follow-ups (`Phone`, `ScrollText`, `Bird`, `Check`), editor de misiones (`Star` de prioridad con `fill-gold`, `ChevronRight`), Salón de Héroes (`Sparkles`).
- `Achievement.icon` ahora es un `LucideIcon` (antes un glifo de texto); el watcher usa `Swords` (rango) y `Gem` (loot).
- **Texto mínimo 12px en toda la app** (`text-[8–11px]` → `text-xs`; cero restantes). Pestañas de clase del Grimorio ensanchadas (`w-24 md:w-28`) para que quepa. Si algún texto desborda en pantallas chicas, ajustar ahí.
- **Sin rojo punitivo**: fatiga del Oráculo (medidor y aviso) ahora usa ámbar (`warn-*`, nuevo token `bg-warn-dot`). Rojo restante, intencional: indicador de grabación de voz, acciones de borrado, y UI de jefes/enemigos.
- **Oro = recompensa**: estrella de prioridad, loot desbloqueado y destellos usan `--gold-rgb`; estados activos de UI (ventana de foco) usan `--accent-rgb`.
- Login usa `BrandMark` (antes un SVG con hex `#d9a94a`).
- `tsc -b`, `oxlint`, `npm run build` limpios.

### Falta (fases siguientes)
5. Assets verdes y 6. Verificación en navegador: **aplazadas por el usuario, viven en `pendings.md`** (la 5 bloqueada hasta que pueda generar imágenes).
- Rojo restante a revisar en fase 4: fatiga alta del Oráculo (`CalendarTimelineView`) y banner de fatiga.

---

## 18. Evaluación de UX y plan de funcionalidad (2026-10-13)

Auditoría de experiencia para el perfil TDAH (24 fricciones detectadas leyendo código y spec; no probada en vivo). Plan acordado en 4 rondas.

### Ronda 1 — hecha (sin migraciones, sin verificar visualmente por mí)
1. **Captura desde cualquier pantalla**: botón flotante `QuickCaptureFab` (se oculta en `/inbox`, que ya tiene su caja). Queda abierto tras guardar para soltar varias ideas; funciona offline (usa `useCaptureInboxTask`).
2. **Inbox**: borrar ahora es visible siempre (antes solo con hover = imposible en celular) y con área táctil de 44px; tocar el título lo edita en línea (Enter guarda, Escape cancela).
3. **Recompensa inmediata** al completar: `useCompleteTask` muestra "+N XP · Clase" (o "Misión completada") vía `Toaster` (`components/ui/toast-store.ts` + `Toaster.tsx`, store a nivel de módulo, sin librería). El XP real sigue calculándolo el trigger de Postgres; el aviso solo lo muestra.
4. **Prioridad del día descubrible**: estrella ★ en cada tarjeta del Battle HUD (`useSetTodayPriority`/`useClearTodayPriority`). El recuadro "Prioridad" del Inbox ahora dice DEFINIDA / CUMPLIDA / ELEGIR EN COMBATE (antes siempre "VER GRIMORIO").
5. **Enlace roto arreglado**: la alerta del Inbox "N vencidas · RESOLVER" mandaba un filtro que el Grimorio ignoraba desde el Paso 6. Ahora `KanbanPage` tiene chips **Todas / Vencidas (n) / Hoy (n)** que lee de `location.state.dateFilter`.
6. **Reprogramar de un toque** (`RescheduleButtons`: Mañana / +1 semana, conserva la hora original) en tareas vencidas del Grimorio (modo Foco) y del Battle HUD. Tono de "reagendar", no de fracaso.
7. **Follow-ups**: la palomita "resolver sin bitácora" ahora pide confirmación inline (se descarta sola a los 4 s).
8. Voseo restante corregido ("Elige", "Ponle").
- Nuevas utilidades en `utils/datetime.ts`: `rescheduleIso`, `isOverdue`.

### Ronda 2 — hecha (sin migraciones, sin verificar visualmente por mí)
1. **Mesa de Estrategia con menos decisiones**: clase y destino se recuerdan entre cartas (`localStorage` `questly_triage_last`, solo tras despachar con éxito); fecha y arma siguen siendo decisión por misión (el tamaño obligatorio es decisión de la sección 9/6.4, no se pre-selecciona). Fechas rápidas: Hoy / Mañana / Fin de semana / +1 semana, además del selector manual.
2. **Validación visible**: ya no es un mensaje único al fondo. Tras un intento fallido se muestra bajo cada campo lo que falta y un resumen "Falta: clase, fecha, arma." (el botón sigue activo a propósito para que el clic revele qué falta).
3. **Saltar por ahora** (manda la carta al final de la cola durante la sesión) y **Descartar** (borra la captura, con confirmación inline). Ambos faltaban respecto a la spec 4.2.
4. **Elegir por mí** en cada slot vacío del Battle HUD: equipa la sugerida (`useSuggestedTask`: primero la prioridad del día si no está equipada, luego la de deadline más cercano) y muestra su título para no ser opaco. El cajón muestra la sugerida primero con etiqueta "Sugerida".
5. **Barra inferior en móvil** (Combate, Inbox, Estrategia, Grimorio, Más → abre el menú completo) con íconos Lucide; el botón flotante de captura sube sobre ella. `main` tiene `pb-24` en móvil.
6. **Insignia con el conteo de capturas pendientes** sobre "Estrategia" (menú lateral y barra inferior).
- Limitación conocida: descartar la ÚLTIMA captura del inbox no dispara la quest diaria de triage (el trigger `tasks_after_triage` solo reacciona a un UPDATE de `kanban_column_id`, no a un DELETE). Candidato a la ronda 3 (migración).

### Ronda 3 — hecha en código, REQUIERE 2 PASOS MANUALES (2026-10-14)
**Antes de probar, correr en este orden:**
1. **SQL Editor de Supabase**: pegar y correr completo `supabase/migrations/20261013000001_fase9_rescate_avisos_triage.sql` (idempotente). Sin esto la app falla al completar tareas (el cliente lee `tasks.rescue_bonus`) y los avisos nuevos violan el check constraint.
2. `npx supabase functions deploy send-notifications --project-ref dlztajgoljayfmqjdqio` (la Edge Function ahora emite `upcoming_3d`/`upcoming_1d`).

Qué trae:
- **Avisos por escalón**: `upcoming` se separa en `upcoming_3d` ("Vence en N días") y `upcoming_1d` ("Vence mañana"). Antes descartar el de 3 días silenciaba el de mañana (comparten `unique(task_id,type)` y `dismissed_at` nunca se pisa). `upcoming` queda en el check solo para filas viejas.
- **Rescate de vencidas** (spec 4.7, "quest de rescate"): completar una tarea de nivel superior DESPUÉS de su deadline da `rescue_bonus` = +25 % del XP (mínimo 2). Decisión: se guarda en `tasks.rescue_bonus` (columna + trigger `tasks_before_rescue`) y NO como fila en `quests`, porque los índices únicos diarios de `quests` no admiten varios rescates el mismo día sin romper los `ON CONFLICT` de los otros triggers. `tasks_after_done` suma el bonus a la XP de la categoría; el toast muestra "Rescate +N"; `useXpEarnedToday` lo incluye. Reprogramar antes de completar anula el bonus (a propósito: es un empujón suave, no una mecánica a explotar). Lenguaje sin culpa: "Por rescatar" en vez de "Vencida" (avisos, chip del Grimorio, alerta del Inbox), con ícono `LifeBuoy`.
- **Quest de triage al descartar la última captura**: `tasks_after_triage` se refactoriza a `complete_daily_triage_if_empty()` y un trigger nuevo `tasks_after_discard` (AFTER DELETE) lo invoca. Efecto colateral aceptado: capturar y borrar enseguida la única captura cuenta como "vaciar el inbox" una vez al día.
- **Página Proyectos** (`/proyectos`, ítem en el menú): crear, renombrar, cambiar título/jefe y archivar (`status = 'archived'`, ya existía en el schema) con confirmación. Los archivados no se listan (no hay vista de archivados todavía).
- **Modo Foco** (`/foco/:taskId`, `FocusModePage` + `FocusSessionView`): una misión, sus micro-pasos tocables y temporizador opcional (15/25/45 min, vibra al terminar). "Atacar" del Combate abre este modo (funciona en móvil). El botón de captura rápida sigue visible a propósito (anotar la idea que distrae sin salir del foco).
- **Sesión de foco global y ventana flotante** (2026-10-14): el estado (misión + fin del bloque) vive en `FocusSessionProvider` (`focusSessionContext.ts`, persistido en `sessionStorage`), por encima de `FocusFloatProvider`. Cuando hay una sesión activa, la ventana flotante (PiP) muestra la MISMA vista compacta (`FocusSessionView compact`: título, reloj, micro-pasos, "Terminé"); sin sesión, vuelve a la lista de tareas en progreso. "Volver al Combate" NO termina la sesión (el foco y su reloj siguen); se termina con "Salir del foco", completando la misión, o al cambiar a otra (un solo foco a la vez). Una píldora en el header (`ActiveFocusPill`) vuelve al foco activo y muestra el reloj. El aviso de fin de bloque lo emite el provider, esté o no la página abierta. La ventana flotante abre más alta (440 px) si ya hay sesión.
- **Avatar del héroe**: ya no es la imagen del dragón jefe; usa el ícono vectorial de la clase dominante (`utils/classIcons.ts`, compartido con el Grimorio). Los avatares ilustrados esperan a los assets (ver `pendings.md`).
- Limitación conocida (heredada): reabrir y volver a completar una tarea vuelve a sumar su XP.

### Ronda 4 — pulido, hecha (2026-10-14, sin migraciones, sin verificar visualmente por mí)
- **Menos repetición de racha/escudos**: se quitó el recuadro "Racha" del Inbox (quedan XP de hoy, Triage y Prioridad) y el chip de racha del header se oculta en Combate y Progreso, que ya la muestran en grande (anillo de estamina / página).
- **Subtítulos funcionales en el menú lateral** (`hint` por ítem): p. ej. "Grimorio · Todas tus misiones", "Estrategia · Ordena lo capturado". Los nombres temáticos se mantienen.
- **Calendario**: botón **Añadir misión** en cada día del Chrono-Stream y en el panel "Jornada Escogida" del Mapa Astral (`CalendarQuickAdd`: título + clase + arma, como mini-triage; la clase arranca con la última usada en la Mesa de Estrategia; crea una tarea suelta a las 18:00, o 23:00 si ya pasó, para que no nazca "por rescatar"). **Mover** (+1 día / +1 semana, desde la fecha que ya tiene) en cada misión pendiente de ambas vistas (`RescheduleButtons mode="from-deadline"`).
- **Energía del día** (Chrono-Stream) ahora pesa por arma (Daga 10, Espada 20, Mandoble 35, sin arma 15; tope 100 %; ≥ 80 % = aviso ámbar). Antes era 20 % fijo por misión: 5 dagas pesaban igual que 5 mandobles.
- **Proyectos archivados**: "Ver archivados" en `/proyectos` con **Restaurar**.
- Últimos emojis ⏳ reemplazados por `Hourglass`.

- **Calendario (2026-10-14)**: `fetchTasksInRange` no filtraba nada: mostraba en-seguimiento y cada micro-paso (heredan el deadline de su misión: duplicaban entradas e inflaban la energía). Ahora trae solo misiones de nivel superior fuera de seguimiento (mismo criterio que el Grimorio y las notificaciones). Las **completadas se quedan visibles, tachadas y atenuadas** con un check (decisión del usuario, retoma la Fase 6.7), y el interruptor **Mostrar completadas** (default activado, `localStorage` `questly_calendar_show_done`) las oculta. El medidor de energía y el mapa de calor cuentan solo lo pendiente; las gemas de misiones hechas se ven al 30 %. Además, completar desde el editor (`TaskModal`) ahora lo cierra al terminar.

- **Arrastrar misiones entre días en el Chrono-Stream** (2026-10-14, arrastre NATIVO de HTML5, sin dependencias): las tarjetas pendientes son arrastrables y cada día es zona de soltado (se ilumina en cian). Conserva la hora original (`deadlineOnDay`; si cae hoy y esa hora ya pasó, 23:00). `moveTaskDeadline` (`tasks/api.ts`) primero recorta al nuevo deadline las subtareas que lo superen, porque el trigger `tasks_before_write` prohíbe que el padre quede antes que alguna subtarea (los micro-pasos heredan el deadline del padre); `useMoveTaskDeadline` actualiza el calendario de forma optimista y revierte con aviso si falla. **Solo mouse/escritorio**: el HTML5 DnD no funciona con toque; en celular y teclado quedan los botones Mover (+1 día/+1 semana). Si se quiere arrastre táctil o por teclado, migrar a `@dnd-kit` (se desinstaló en la auditoría de 2026-07-27; habría que reinstalarlo).

- **Orden manual de micro-pasos** (2026-10-14, REQUIERE MIGRACIÓN `20261014000001_fase9_orden_subtareas.sql`): antes se ordenaban por deadline y, como heredan el de su misión, el orden de los empates era arbitrario (parecía alfabético). Nueva columna `tasks.position` (rellenada por orden de creación para los existentes; las nuevas van al final vía trigger `tasks_before_insert_position`). `fetchSubtasks` ordena por `position` y luego `created_at`, así que el Combate, el Modo Foco y la ventana flotante respetan el mismo orden. En el editor (`TaskModal`) cada micro-paso tiene número, asa de arrastre (arrastre nativo, solo mouse: se suelta sobre otro micro-paso y toma su lugar, con línea cian de destino) y flechas subir/bajar para móvil y teclado (`useReorderSubtasks`, optimista). Sin la migración, las listas de micro-pasos fallan (la columna no existe).

- **Barra de estado** (2026-10-14, `StatusRail`, `statusItems.ts`): columna derecha ejecutiva en pantallas anchas (≥ lg). Cinco indicadores, cada uno enlaza a su vista: **En batalla** `n/3` → Combate; **Por rescatar** → Grimorio con filtro `overdue`; **Sin ordenar** (capturas del Inbox) → Estrategia; **XP de hoy** + racha → Progreso; **Follow-ups** `vencidos/total` → Follow-ups. Reposo calmado (ceros apagados; color solo si algo pide atención: ámbar, nunca rojo; "Todo en orden" cuando no hay nada). Colapsada (64 px, ícono + número); se expande sobre el contenido al pasar el mouse o con el foco del teclado (224 px) y una **chincheta** la deja fija (`localStorage` `questly_status_rail_pinned`). Sin consultas nuevas: `useStatusItems()` reutiliza hooks de React Query ya en caché. El ancho se publica como `--rail-w` en el Layout: el contenido (`lg:pr-[var(--rail-w)]`) y el botón de captura rápida lo respetan. En < lg no hay barra: el mismo resumen es una tarjeta dentro del menú lateral ("Más"). El chip de racha del header se oculta en ≥ lg porque la barra ya la muestra.

- **Fix "Por rescatar" inflado** (2026-10-14): `fetchActiveTasksWithDeadline` no excluía micro-pasos. Al completar una misión con pasos sin tildar, esos micro-pasos quedaban `pending` con el deadline (ya pasado) heredado y contaban como vencidos para siempre; además el sync de notificaciones del cliente generaba avisos de micro-pasos (la Edge Function ya filtraba `parent_task_id is null`). Ahora la consulta trae solo misiones de nivel superior (barra de estado, alerta del Inbox y sync alineados). Limpieza opcional de avisos viejos: `supabase/migrations/20261014000002_limpiar_avisos_microtareas.sql`.

### Pulido pendiente
- Sin pendientes de la evaluación de UX. Lo siguiente sería verificación en navegador (Fase 6, ver `pendings.md`) y los assets verdes (Fase 5).

---

## 19. Fase 10 — Cadenas de misiones (2026-10-15; fases A, B, compositor y C-1/C-2 probados por el usuario)

**REQUIERE MIGRACIÓN** `20261015000001_fase10_cadenas_de_misiones.sql` (SQL Editor, idempotente) **y** `npx supabase functions deploy send-notifications --project-ref dlztajgoljayfmqjdqio` (la función ahora ignora misiones dormidas). Sin la migración las consultas de tareas fallan (`locked`).

Idea: las misiones siguientes existen desde el inicio pero **dormidas** (`tasks.locked`); al cumplirse el disparador de sus predecesoras se **despiertan** solas. Ramas: una misión puede desbloquear a varias y esperar a varias.
- **Datos**: `task_links(from_task_id, to_task_id, on_event)` con `on_event` = `task_done` | `follow_up_resolved`. En `tasks`: `locked`, `unlock_mode` (`all` = todas las predecesoras, `any` = basta una), `unlock_deadline_days` (al despertar, deadline = ahora + N días; null conserva el suyo).
- **Motor en Postgres** (funciona sin importar desde dónde se complete): `chain_refresh_task` recalcula si una misión despierta; lo invocan triggers al pasar una tarea a `done`, al resolverse un follow-up (`resolved_at`), al crear/borrar un enlace y al cambiar `unlock_mode`. Solo crear un enlace puede dormir una misión (`p_allow_lock`), así un evento posterior nunca vuelve a dormir una despertada a mano. Validación anti-ciclos y solo misiones de nivel superior (`task_links_validate`). Red de seguridad `tasks_block_locked`: una dormida no puede completarse/equiparse.
- **Casos límite**: borrar una predecesora borra sus enlaces en cascada y despierta a la sucesora; reabrir una predecesora no vuelve a dormir; `follow_up_resolved` también se cumple si la predecesora se completa. "Despertar ahora" en el editor es la salida manual.
- **UI**: `ChainSection` en `TaskModal` (solo misiones triadas de nivel superior): "Espera a" / "Desbloquea", alta de **siguiente paso** (crea la misión dormida heredando proyecto/clase/tamaño, con plazo en días) o enlace a una misión existente en ambas direcciones, disparador por enlace, modo todas/cualquiera y plazo al despertar. Candado en el Grimorio (sin botón de completar). Aviso "Siguiente paso desbloqueado" al completar o resolver un follow-up (`withUnlockToast`, `chains/api.ts`).
- **Dormidas quedan fuera de** (`.eq('locked', false)`): Combate (equipables), Calendario, "Por rescatar"/barra de estado/sync de avisos (`fetchActiveTasksWithDeadline`), sugerencia rápida y Edge Function de avisos.
- **No hecho (fases B/C)**: vista visual de la cadena completa, retraso de activación (hoy solo se ajusta el plazo), XP extra por cadena completada, equipar/mandar a follow-up automáticamente al despertar, aviso persistente (hoy solo toast).

### Fase B (2026-10-15, sin verificar en navegador)
**REQUIERE MIGRACIÓN** `20261015000002_fase10_aviso_desbloqueo.sql` (después de la 000001; idempotente).
- **Aviso persistente**: al despertar una misión, el motor (`chain_refresh_task`) inserta una notificación `unlocked` ("Desbloqueada: …"); aparece en la campana con ícono `LockOpen`. Si la misión se duerme y despierta otra vez, se reactiva (`dismissed_at = null`). El toast de `withUnlockToast` se mantiene y ahora corre en paralelo con la acción (no suma una ida y vuelta).
- **Vista de cadena**: `ChainFlow` (un nivel por fila, ramas lado a lado, estado Hecha/Activa/Dormida/En seguimiento, "espera a todas/cualquiera (n)"). Se muestra dentro de `ChainSection` (la cadena completa de la misión, resaltada) y en la nueva página **/cadenas** (ítem "Cadenas" del menú; activas arriba, completadas en un desplegable; tocar un nodo abre el editor). Lógica de grafo en `chains/graph.ts` (componentes y niveles, sin ciclos por la DB).
- Fix relacionado: completar una tarea ahora refresca `['battle-hud']` y libera el slot al instante (antes seguía ocupado hasta el siguiente refetch).

### Compositor de etapas (2026-10-16, sin verificar en navegador)
**REQUIERE MIGRACIÓN** `20261016000001_fase10_evento_enlace.sql` (después de la 000002; idempotente): cambiar el disparador de un enlace recalcula si la misión despierta.
- **Modelo de etapas** (sin tablas nuevas): la etapa N son las misiones aguas abajo a N pasos (`stages.ts`, `persistedStages`). Cada paso de una etapa se enlaza a TODOS los de la anterior (o a la misión raíz); varios pasos en una etapa van "a la vez"; la unión "A y B → C" es una etapa que espera a todos (`unlock_mode` = `all`) o a cualquiera (`any`). Ajustes por etapa (engranaje): disparador (al completar / cuando respondan), todos/cualquiera (solo si la etapa anterior tiene más de un paso) y plazo en días.
- **UI**: `StageComposer` (presentacional) reemplaza a los formularios del `ChainSection`: escribir + Enter = etapa nueva ("Luego…"), «+ a la vez» = otro paso en la misma etapa, nombre editable en línea, ✕ quita. Lo que no cabe en etapas (esperar a una misión concreta, enlazar existentes, ver la cadena completa, ajustes propios) quedó en «Avanzado».
- **Mesa de Estrategia**: renglón plegado «+ Y después…» (`DraftChain`) bajo la carta; las etapas viven en memoria y se crean al despachar (`createChain`). Si se despacha a Seguimiento, la primera etapa usa `follow_up_resolved`. Si falla la cadena, la misión ya despachada se conserva y sale un aviso.
- **Quitar un paso** (`removeStep`) enlaza a sus predecesoras los sucesores que solo dependían de él: borrarlo sin esto los despertaría de golpe.
- Limitación: el compositor solo muestra lo que cuelga AGUAS ABAJO de la misión abierta; lo que ella espera se ve en «Avanzado».

### Fase C (2026-10-22, hecha y verificada por el usuario el 2026-11-01)
**Migraciones ya corridas por el usuario**, en orden (idempotentes): `20261017000001_fase10c_equipar_al_despertar.sql` y `20261017000002_fase10c_bono_de_cadena.sql`. Sin ellas, las consultas de tareas fallan (`unlock_equip`, `chain_bonus`).
- **Equipar al despertar** (decisión: opcional, por etapa, no automático): `tasks.unlock_equip` (default false). `chain_refresh_task` busca el primer slot libre del Combate (1-3); si hay, la misión despierta ya equipada (`hud_slot` + `in_progress`); si no, despierta normal y queda en el cajón. El aviso de la campana no menciona que no cupo (sin culpa); nunca se expulsa una misión equipada. UI: casilla «Ponerla en el Combate al despertar» en el engranaje de cada etapa (`StageSettings.equip`; también en el borrador de Estrategia). «Mandar a Seguimiento al despertar» queda fuera (necesita datos del aliado).
- **Bono por cadena completada** (decisión: 25 % del XP base de la cadena, mínimo 10): `tasks.chain_bonus`. Cadena = componente conexo por `task_links` (≥ 2 misiones); completa cuando todas están `done`. Trigger BEFORE `tasks_set_chain_bonus` lo fija en la misión que cierra la cadena (así el RETURNING del cliente ya lo trae); trigger AFTER `tasks_pay_chain_bonus` lo suma a la categoría de esa misión (sin categoría no se suma). **Anti-explotación**: `chain_bonus > 0` en cualquier misión de la cadena la marca como pagada; reabrir y recompletar no repite. Mismo patrón que `rescue_bonus` (columna, no fila en `quests`). El toast muestra «Cadena completada +N»; `useXpEarnedToday` lo incluye.
- Limitación: agregar pasos a una cadena ya pagada no paga otro bono. Quedan para después: push del aviso de desbloqueo, plantillas de cadenas, retraso de activación.

---

## 20. Fase 9 · Fase 5 — Assets verdes (2026-11-01)

Regenerados en Gemini (app, no API) y reemplazados los 13 assets morado/oro de `public/assets/rpg/` por versiones verde/rúnica; se añadieron `nav/projects.png` y `nav/chains.png` (claves `projects` y `chains` en `NAV_ICONS`, usadas por `Layout.tsx` en lugar de `FolderOpen`/`Workflow`).
- **Proceso**: prompts en `docs/ASSET_PROMPTS.md`; originales JPEG de 2048 px en `assets-raw/` (gitignored). Cada imagen se reescaló (256 px; jefes 512 px) y se le quitó el fondo con relleno por inundación desde los bordes sobre el color mediano del borde (tolerancia 34; 14 para dragón, liche y cofre, que tienen zonas oscuras internas). Ese script no está en el repo (vivió en un directorio temporal): si se generan más assets (avatares de clase), conviene guardarlo en `scripts/`.
- **Íconos del menú**: recortados a su caja visible y mostrados a 44 px (`h-11 w-11`) en el Menú del Héroe; a 24 px no se entendían. La barra inferior móvil sigue con Lucide.
- **Ideas anotadas** (no comprometidas) en `IDEAS.md`: generación de imágenes por API, menú tipo tableta rúnica, más movimiento y carácter gráfico.
- Sin verificar en navegador.

---

## 21. Fase 11 — Asistente IA (2026-11-01, fases 0 y 1 hechas, desplegadas y probadas por el usuario)

Plan completo, seguridad y fases 2-4 en [`docs/AI_PLAN.md`](docs/AI_PLAN.md). Resumen:
- **Arquitectura**: cliente → Edge Function `assistant` (Deno) → Gemini API. La key vive solo como secret (`GEMINI_API_KEY`, opcional `GEMINI_MODEL`, por defecto `gemini-3.5-flash-lite`: verificar vigencia en AI Studio). La función lee con el JWT del usuario (RLS, sin `service_role`), exige `ai_settings.enabled` y descuenta cuota diaria con `ai_consume_quota` (60/día, atómica). La IA **solo sugiere**; escribir lo decide el usuario.
- **Migración** `20261101000001_fase11_asistente_ia.sql` (`ai_settings`, `ai_usage`, `ai_consume_quota`).
- **Función** `supabase/functions/assistant/`: `index.ts` (acciones `triage` y `microsteps`), `validate.ts` (validación pura de entrada y de la salida del modelo) y `validate.test.ts` (autochequeo: `node --experimental-strip-types supabase/functions/assistant/validate.test.ts`).
- **Cliente** `src/features/ai/` (`api.ts`, `hooks.ts`); interruptor «Asistente IA» en `ProfileMenu`; botón «Sugerir con IA» en la Mesa de Estrategia (rellena clase, proyecto, arma y plazo con un motivo; usa las últimas 15 decisiones del usuario como ejemplos) y «Sugerir micro-pasos con IA» en `TaskModal`.
- **Seguridad**: datos delimitados como datos en el prompt (sin `<` ni `>`), salida con esquema JSON validada en servidor (ids contra listas permitidas), errores de Gemini nunca devueltos al cliente. **Nivel gratuito de la API: Google puede usar lo enviado para mejorar sus productos; no usar datos sensibles reales hasta pasar a nivel de pago** (el interruptor lo avisa).
- **Pasos manuales**: correr la migración; `npx supabase secrets set GEMINI_API_KEY=<key> --project-ref dlztajgoljayfmqjdqio`; `npx supabase functions deploy assistant --project-ref dlztajgoljayfmqjdqio`; activar el interruptor en el perfil.
- **Modelo (probado 2026-11-02)**: `gemini-3.5-flash-lite` responde en < 1 s y cumple el esquema JSON. `gemini-3.8-flash` y `gemini-3.7-flash` estaban saturados/lentos (timeouts de 30-60 s, 503) y `gemini-2.5-flash` devolvía 404 («ya no disponible para usuarios nuevos»). Los modelos con razonamiento gastan segundos en tareas simples. Si vuelve a fallar: `node scripts/gemini-probe.mjs list` y comparar con `GEMINI_MODELS` (ver `scripts/gemini-probe.mjs`), luego fijar el secret `GEMINI_MODEL`. La función reintenta una vez ante 503 y corta a los 25 s por intento.

### Fase 11 · fase 2 — Cadenas desde un objetivo (2026-11-02, en código, sin desplegar ni probar)
- **Función**: nueva acción `chain` en `assistant` (no lee datos del usuario: título, notas y fecha vienen en la petición). `validateStages` limita a 5 etapas, 4 pasos por etapa y plazos de 1 a 60 días; descarta pasos vacíos o repetidos.
- **Cliente**: `suggestChain` / `useSuggestChain`; componente `chains/components/SuggestStages.tsx` (botón + vista previa «Usar estas etapas» / «Descartar»; nada se crea hasta aceptar). Se usa en `DraftChain` (Mesa de Estrategia: se añade al borrador) y en `ChainSection` (editor, solo si la misión no tiene cadena, vía `createChain`; si la misión está en seguimiento, la primera etapa espera la respuesta).
- **Decisión**: la «captura en lenguaje natural» no se hizo como función aparte; «Sugerir con IA» de la Mesa ya interpreta fechas escritas en el título.
- **Requiere** volver a desplegar: `npx supabase functions deploy assistant --project-ref dlztajgoljayfmqjdqio`.

### Fase 11 · contexto del usuario (2026-11-02, en código, sin desplegar ni probar)
**REQUIERE MIGRACIÓN** `20261102000001_fase11_contexto_perfil.sql` (`ai_settings.profile_context`, máx. 1000 caracteres) y volver a desplegar `assistant`.
- **Contexto por misión** (corregido: ya NO está plegado): campo «Contexto» visible justo bajo el título, tanto en la Mesa de Estrategia (`InboxCardDeck`) como en el editor de misiones (`TaskModal`, donde las notas salieron del acordeón y subieron junto al título). Es el mismo campo que las notas (`description`), con dictado por voz (`ai/components/ContextField.tsx`, reutiliza `useSpeechDictation`). Decisión del usuario: aunque las notas parezcan fricción, ayudan a la IA y compensan. Se envía como `description` a «Sugerir con IA» y «Sugerir etapas», y **se guarda en las notas de la misión al despachar** (`dispatchTriagedTask` ahora escribe `description`), así los micro-pasos futuros también lo leen. Parte de las notas que ya tenga la captura.
- **«Sobre mí»**: texto global guardado una vez (Perfil → «Sobre mí (para el asistente)», visible con la IA activada). La función lo lee de `ai_settings` y lo antepone a cada petición como `<perfil>` (dato, no instrucción). El aviso del interruptor menciona que el contexto y el «Sobre mí» también se envían.
- **Pendiente**: probar si `gemini-3.5-flash-lite` aprovecha bien textos largos; si no, subir de modelo con `GEMINI_MODEL`. Siguientes niveles propuestos: captura hablada con extracción de título y afinar una sugerencia con una frase.
- «Sugerir micro-pasos» envía el contexto que está en pantalla (`description` opcional en la acción `microsteps`), por lo que usa lo recién escrito aunque no se haya guardado la misión.

### Fase 11 · fase 3 — Patrones y recomendaciones (2026-11-03, en código, sin desplegar ni probar)
**REQUIERE MIGRACIÓN** `20261103000001_fase11_patrones.sql` y volver a desplegar `assistant`.
- **Principio**: los números los calcula SQL (deterministas, gratis); el LLM solo los interpreta. Si hay menos de 5 misiones completadas en 30 días, el servidor responde `insufficient` y NO llama a Gemini.
- **Base de datos**: `tasks.postponed_count` (trigger `tasks_count_postponed`: suma 1 cuando la fecha límite se mueve hacia adelante; no cuenta la primera fecha del triage, moverla antes, micro-pasos, misiones dormidas ni el despertar de una cadena). **El historial de reprogramaciones empieza desde esta migración**: no hay datos anteriores. `ai_user_stats(p_tz)` (SECURITY INVOKER, RLS del usuario) devuelve completadas 30/7 días, por día de la semana y franja del día (en la zona horaria del usuario), por clase, días reales hasta completar por tamaño, % a tiempo, misiones recurrentes (mismo título 3+ veces en 180 días) y atascadas (movidas 3+ veces).
- **Función**: acción `insights` (`handleInsights`); `validateInsights` solo acepta consejos sobre ids de misiones que venían en las estadísticas, y el título de cada misión sale de la base de datos, no del modelo.
- **Cliente**: `RhythmCard` («Tu ritmo») al inicio de Progreso, visible con la IA activada; se pide al pulsar «Analizar mi ritmo» y el último resultado queda en la caché de React Query (`useInsights`, `skipToken`). Las atascadas tienen «Abrir misión» (abre `TaskModal`, donde están los micro-pasos con IA).
- **No hecho**: «Elegir por mí» inteligente, resumen semanal automático/push y similitud por embeddings.

### Fase 11 · triage con título limpio, fecha y hora (2026-11-03, en código, sin desplegar ni probar)
**Requiere volver a desplegar** `assistant` (sin migración).
- **Opción B acordada**: al abrir una carta en la Mesa de Estrategia con la IA activada, se rellena sola (una vez por carta: `autoAsked`; saltar y volver no repite) y el usuario revisa antes de despachar. El botón «Sugerir con IA» sigue para repetirlo con lo que hay en pantalla. En modo automático no pisa un título que el usuario ya editó. No se llama sin conexión.
- **Qué extrae**: título limpio (sin fecha, hora ni clase ni muletillas), clase, tamaño y lo que el usuario escribió sobre cuándo (`when`: `relative_days`, `weekday`, `day_of_month`, `month`, `hour`, `minute`, `period`). El texto original se conserva en el contexto («Captura original: …») si el título cambió.
- **La fecha NO la calcula el modelo**: `src/features/ai/resolveWhen.ts` la resuelve con reglas fijas acordadas con el usuario: «a las 8» = la 8:00/20:00 más cercana que aún no pasó; «viernes» = el viernes más cercano (hoy cuenta); con am/pm o formato 24 h la hora es exacta; «viernes 20» = el viernes 20 más cercano; si la hora ya pasó hoy, salta a la siguiente fecha que coincida; sin hora, 18:00 (o 23:00 si ya pasaron). Sin fecha ni hora se usa el plazo estimado por la IA (`deadline_days`). «Las 12» sin am/pm es el mediodía.
- **Pruebas**: `node --experimental-strip-types scripts/resolve-when.test.ts` (reglas de fecha) y `supabase/functions/assistant/validate.test.ts`.
- **Cuota diaria subió de 60 a 120** por usuario (`DAILY_LIMIT`): con una llamada por carta, un inbox grande agotaba 60. Ojo con los límites globales de la API gratuita (15 RPM, 1500 RPD).
- **Lección**: `tsc` no revisa la Edge Function (es Deno); un backtick dentro de la plantilla del prompt la rompió y solo lo detectó `oxlint`. Correr `npx oxlint` tras tocar `supabase/functions/`.

## 22. Recuperación de contraseña (2026-11-03, probada por el usuario)
- **Flujo**: login → pestaña «Contraseña» → «¿Olvidaste tu contraseña?» → `resetPasswordForEmail(email, { redirectTo: <origen>/restablecer })` → el enlace del correo abre `/restablecer` (`ResetPasswordPage`, fuera de `ProtectedRoute`), Supabase abre una sesión temporal desde la URL y se elige la contraseña nueva con `updateUser({ password })` (mínimo 8 caracteres, confirmación). Mensaje neutro exista o no la cuenta (no revela qué correos están registrados). Enlace vencido/inválido: aviso y vuelta al login.
- **«Cambiar contraseña»** en el menú de perfil abre la misma pantalla: sirve también para fijar una contraseña a quien entra solo por enlace mágico.
- **Pasos manuales en Supabase** (Authentication → URL Configuration): la *Site URL* debe ser la URL real de la app, y `https://<tu-dominio>/restablecer` (y `http://localhost:5173/restablecer` para desarrollo) debe estar en *Redirect URLs*; si no, el correo redirige al Site URL y el flujo falla. Lo mismo vale para el enlace mágico (`emailRedirectTo` usa el origen actual). El correo de «Reset Password» usa la plantilla por defecto de Supabase (editable en Authentication → Email Templates).
- **Límite**: el SMTP integrado de Supabase envía muy pocos correos por hora; si se agota, configurar un SMTP propio.

## 23. Arreglo de la racha (2026-11-04, migración corrida y probada por el usuario)
**REQUIERE MIGRACIÓN** `20261104000001_fix_racha.sql` (idempotente).
- **Causa 1 (la más grave)**: la fila de `streaks` solo se creaba para usuarios NUEVOS (trigger `on_auth_user_created_gamification`); la migración de la Fase 2 no rellenó las cuentas existentes. Para una cuenta anterior, `register_daily_activity` no encontraba fila y su `UPDATE` no afectaba nada: la racha nunca avanzaba, sin error. La migración rellena las filas faltantes y la función ahora se auto-repara (inserta la fila si falta).
- **Causa 2**: «hoy» se calculaba con `current_date` (UTC en Supabase). Para Colombia (UTC-5) el día cambiaba a las 7 p. m. Ahora `streaks.tz` guarda la zona del usuario (el cliente la sincroniza al abrir la app: `useSyncStreakTimezone` en `Layout`) y la función cambia de día en esa zona.
- **No cubierto**: (a) la racha de quien nunca tuvo fila arranca de nuevo en 1 (no se reconstruye desde `completed_at`); (b) las quests diarias (`period_start = current_date`) y otros usos de `current_date` siguen en UTC; (c) la UI muestra `current_streak_days` guardado: si pasan más de 2 días sin actividad, sigue mostrando la racha vieja hasta la próxima actividad (se reinicia entonces).
- Comprobar en el SQL Editor: `select * from public.streaks;` (debe haber una fila por usuario, con `tz` y `last_active_date`).

## 24. Efectos y movimiento (IDEAS #3, 2026-11-04, probado por el usuario)
Sin migración. Primeras tres piezas de «Más carácter gráfico y movimiento»; commits `ca81d24` y `1396c03`.
- **Interruptores de «Efectos» por grupo** (menú de perfil → «Efectos · N de 5 activos»): `src/utils/effects.ts`. Cinco grupos independientes: `transitions` (cambio de pantalla y entradas del login), `vine` (enredadera del menú), `world` (mundo vivo y fondo ambiental), `art` (deriva y parallax de los fondos ilustrados) y `game` (golpe final, HP y jefe). Preferencia por dispositivo (`localStorage` `questly_fx_off`, lista de grupos apagados; migra el antiguo `questly_fx`), aplicada como `data-fx-off="<grupos>"` en `<html>` (`initEffects()` en `main.tsx`); el CSS apaga cada grupo con `html[data-fx-off~='<grupo>'] .clase`. En JS, `groupOff('<grupo>')` (usado por el parallax y por el golpe final). `prefers-reduced-motion` apaga todo sin importar los interruptores. Toda animación nueva debe asignarse a un grupo y respetarlo.
- **Enredadera de fondo del menú**: una sola planta (`Vine.tsx` + `vineGeometry.ts`, `growVine(seed)`) que nace abajo en el centro y se ramifica por todo el panel (tronco → ramas → ramitas; ~170 ramas, ~630 hojas, flores doradas y zarcillos). Va detrás de los ítems (`-z-10` en el `<aside>`), borrosa y tenue (`.vine-bg`: `blur(2.5px) brightness(.8)`, opacidad .26). Cada rama «crece» con `stroke-dashoffset` (`pathLength=1`) cuando la rama madre llega a su punto de origen (variables CSS `--d` retraso y `--t` duración; ~6.6 s en total) y hojas/flores brotan después. Lo dispara `.is-open` del `<aside>` en `Layout.tsx`; al cerrar se retrae rápido. Quieta una vez crecida (sin balanceo: repintar una capa con blur cada cuadro es caro). Se ajusta con `GEN` (densidad: `leafEvery`/`childEvery`), `SPEED` y `seed`; para verla sin abrir la app, renderizar el SVG a PNG con `sharp`. Contraste del menú: ítems inactivos en `text-fg`, descripciones `text-fg/75` y halo `text-shadow` del color de fondo en `.nav-item-link`. Ojo: ~800 elementos animados con blur al abrir; si se traba en móviles modestos, reducir hojas.
- **Transición de pantalla**: `<div key={pathname} className="page-enter">` alrededor del `<Outlet />` (fundido + 8 px, solo `opacity`/`transform`). Un `transform` en un ancestro cambia el bloque contenedor de los `position: fixed` mientras dura (0.28 s); no se vio ningún problema, pero tenerlo presente al añadir overlays.
- **Combate reactivo** (`CombatSlotCard.tsx`, CSS en `index.css`): «Golpe Final» = el arma de la misión embiste + tajo + destello y sacudida + 10 chispas + los segmentos de HP se rompen en cascada, y a los ~1070 ms se completa la misión (antes ~830 ms; sin efectos se completa al instante). Un segmento de HP perdido por terminar una submisión destella (`hp-lost`); la barra del jefe (`BossHealthBar`) destella y se sacude cuando baja `currentHp` mientras está montada. Las distancias del arma son píxeles fijos (`strike-lunge`).
- **Pendiente de la idea**: enredaderas en marcos de tarjetas y login, tableta rúnica (A/B), personajes peleando en el inicio (el costo es el arte), sonidos.

## 25. Mundo vivo por pantalla, login y rework del Inbox (2026-11-04, probado por el usuario)
Sin migración. Commits `d61c01b`, `1d79f52`, `ed388b9`, `a50030d`. Prompts de arte en `docs/WORLD_PROMPTS.md`.
- **Mundo vivo** (`src/features/world/`): `WorldLayer` (montado en `Layout`) elige una escena de fondo por ruta (fija, `-z-10`, sin interacción); `scenes.tsx` (Combate, Inbox, Estrategia), `Particles.tsx` (partículas deterministas: `leaf`, `feather`, `wisp`, `ember`; forma y movimiento en `world.css`), `SceneArt.tsx` (capa ilustrada), `world.css` (todo el CSS `.world-*`). El Modo Foco y las pantallas sin escena no montan nada (a propósito: menos estímulo). La escena nueva aparece con fundido; la anterior se quita al instante. Pendientes: tandas 2 (Grimorio, Calendario, Progreso) y 3 (Follow-ups, Proyectos, Cadenas): faltan sus imágenes y escenas.
  - **Combate**: hojas, brasas, niebla baja, antorchas y dos destellos de acero lejanos. **Inbox**: luces fatuas cian y plumas. **Estrategia**: dos constelaciones que se dibujan/desvanecen y una vela.
- **Arte en capas** (`public/assets/world/<escena>-<capa>.webp`, originales en `new_assets/world/`, no versionados): `back` = paisaje completo, opaco, mostrado tenue (`opacity` .28); `front` = marco con transparencia real (alfa a partir de la luminosidad **conservando el color original**, para que lo oscuro sea sólido y no se mezcle con el `back`), `opacity` .9 y `brightness(.55)`. Los marcos se generan con un script de `sharp` (los jpeg de Gemini → webp con alfa; ramp `(m-6)*5`); `back` solo se redimensiona a 1920 px / calidad 72. Si el `.webp` no existe, `SceneArt` no muestra nada. Solo en tema oscuro (en claro se ocultan). Parallax con el puntero (`--px/--py`, solo `pointer: fine`) y deriva lenta; `SceneArt still` los desactiva (login). **Lección**: un modo `screen` sobre la escena no sirve (el `back` es un paisaje luminoso, no una capa sobre negro) y un `transform` en el contenedor aísla la mezcla; por eso se usa alfa real.
- **Enredadera del menú** (`Vine.tsx` + `vineGeometry.ts`, `growVine(seed)`): una sola planta de fondo en el Menú del Héroe, nace abajo y se ramifica por todo el panel (cada rama crece cuando la madre llega a su punto; `--d`/`--t`). `VineShapes` es el dibujo reutilizable. Detalles de ajuste en §24. El follaje colgante en Combate y las enredaderas en el login se probaron y se descartaron (no gustaron).
- **Login** (`LoginPage.tsx`, CSS «Pantalla de acceso» en `index.css`): fondo `login-back` (portón rúnico) fijo y exactamente centrado (`SceneArt still`, sin deriva ni parallax), brasas (`Particles ember`), marca que se dibuja sola (`BrandMark draw`), título con revelado, línea con rombo, saludo según la hora, pestañas con indicador deslizante, esquinas de la tarjeta (`rune-frame login-card`) que se encienden con el foco, barrido de luz y spinner con la marca en el botón, y un pergamino dorado que sube al enviar el enlace mágico (`sentKey`). Grupo de efectos `transitions` (el revelado del título anima `letter-spacing`: excepción puntual a «solo transform/opacity»). Posible fallo preexistente (no verificado): el `AmbientBackground` del login podría quedar tapado por el `bg-bg` de la página.
- **Inbox (rework)** (`InboxPage.tsx`, `InboxDashboard.tsx`): causa de la ilegibilidad = texto atenuado dos veces (`text-fg-muted/40…70`, contraste 2.2–3.3:1) sobre contenedores translúcidos con el fondo ilustrado detrás. Ahora: panel casi opaco `.panel-solid` (clase reutilizable), texto en `fg`/`fg-muted` sin opacidad, cabecera «Inbox · N por ordenar» con botón «Ordenar →», una sola línea de aviso de plazos (`InboxAlert`) y estado vacío corto (Quick Win + enlace a Combate). Se eliminaron las métricas, la tarjeta de prioridad, el párrafo explicativo y «Conexión Estable» (solo se muestra sin conexión). **Deshacer al descartar**: la captura se oculta, se borra a los 6 s, al salir de la pantalla o al descartar otra; si la app se cierra antes, reaparece (sin pérdida); si el borrado falla, vuelve. **Regla para todas las pantallas con escena**: superficies sólidas (`.panel-solid`) y nunca atenuar texto con opacidad. Pendiente: aplicarla a Estrategia, Grimorio y el resto.
- **Notas**: `useLastCompletedTask` quedó sin uso (exportado). Los `.webp` no están en el precache del PWA (sin conexión, la escena queda solo con partículas). Rendimiento sin medir en móviles modestos (menú y mundo vivo con desenfoque). `IDEAS.md` tiene el catálogo «Movimiento con propósito» con el orden sugerido (orbe de XP y enredadera de la racha → cadenas y fases del jefe → sello de lacre → compañero).
