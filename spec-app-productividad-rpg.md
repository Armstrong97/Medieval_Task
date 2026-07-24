# Especificación técnica: app de productividad tipo RPG

## 1. Resumen ejecutivo

Sistema de productividad personal diseñado para un perfil TDAH + Altas Capacidades. No es un to-do app: es una función ejecutiva externa con captura de fricción cero, triage guiado, kanban visual, calendario con deadlines obligatorios, y un sistema de gamification tipo RPG con clases evolutivas por categoría de vida.

Formato: PWA (Progressive Web App) — un solo código base que funciona en navegador de escritorio y se instala como app en móvil, con soporte offline y notificaciones push.

## 2. Stack tecnológico recomendado

| Capa | Tecnología | Por qué |
|---|---|---|
| Frontend | React + Vite + TypeScript | ecosistema maduro, Claude Code lo maneja muy bien, HMR rápido |
| Estilos | Tailwind CSS | velocidad de desarrollo, consistencia visual |
| Base de datos + backend | Supabase (Postgres) | capa gratuita generosa, auth incluido, realtime, row-level security, buena documentación |
| Autenticación | Supabase Auth (email/password o magic link) | integrado, sin servicios adicionales |
| Hosting PWA | Netlify o Vercel (capa gratuita, dominio personalizado con SSL) | independiente de Supabase, tú controlas el dominio |
| Notificaciones push | Web Push API + Service Worker + Supabase Edge Functions (cron) | sin costo adicional, nativo del navegador |
| Offline support | Service Worker + IndexedDB (via Workbox) | esencial para PWA real |
| Gestión de estado | Zustand o TanStack Query | simple, poco boilerplate |

**Nota sobre el dominio**: la compra y configuración del dominio (DNS apuntando a Netlify/Vercel) es un paso independiente de Supabase. No afecta el modelo de datos ni la arquitectura de la app.

## 3. Modelo de datos (Postgres / Supabase)

### `categories`
Fijas, seed inicial (el usuario podría renombrarlas pero no es prioridad de MVP):
```
id, name, color_hex, icon_name, class_name (ej. "Nigromante"), order
```
Seed: Concentrix (Nigromante), Delorean (Bárbaro), Estudios (Mago), Hobbies (Pícaro), Personal (Clérigo), Hogar (Druida).

### `class_ranks`
Los rangos evolutivos de cada clase (3-4 por clase):
```
id, category_id (fk), rank_order (1,2,3,4), rank_name (ej. "Aprendiz", "Invocador", "Señor de las sombras", "Archinigromante"), xp_threshold, icon_name
```

### `user_category_xp`
```
id, category_id (fk), current_xp, current_level, current_rank_id (fk class_ranks)
```

### `projects`
```
id, name, category_id (fk), description, status (active/archived), created_at
```

### `kanban_columns`
Columnas por defecto + custom por proyecto:
```
id, project_id (fk, nullable si es columna global), name, order, is_default (boolean)
```
Seed default por proyecto nuevo: "Por hacer", "En progreso", "Hecho".

### `tasks`
```
id, project_id (fk, nullable si es tarea suelta), parent_task_id (fk nullable, para subtareas), 
kanban_column_id (fk), title, description, deadline (timestamp, OBLIGATORIO), 
status (pending/in_progress/done/follow_up), category_id (fk),
is_follow_up (boolean), follow_up_interval_days (int, nullable), 
xp_reward (int), created_at, completed_at
```

**Regla de negocio clave**: `deadline` es NOT NULL a nivel de base de datos. Toda tarea y subtarea requiere fecha límite al crearse — sin excepción, esto es lo que alimenta el calendario y el motor de notificaciones.

### `follow_ups`
Registro de seguimientos recurrentes ligados a una tarea:
```
id, task_id (fk), last_contacted_at, next_reminder_at, interval_days, stakeholder_name (opcional), notes
```
Cuando una tarea se marca `is_follow_up = true`, el sistema calcula `next_reminder_at` automáticamente (`last_contacted_at + interval_days`) y la re-agenda cada vez que el usuario registra un nuevo contacto, sin cerrar la tarea original.

### `quests`
```
id, title, type (daily/weekly), category_id (fk, nullable si es multi-categoría), 
linked_task_ids (array o tabla puente), xp_reward, week_start_date, completed (boolean)
```

### `streaks`
```
id, current_streak_days, longest_streak, shields_available, last_active_date
```

### `loot`
```
id, name, description, icon_name, category_id (fk, nullable), unlocked_at, trigger_type (streak/quest_complete/level_up)
```

### `notifications`
```
id, task_id (fk), scheduled_at, type (upcoming/due_today/overdue/follow_up), sent (boolean), message
```

## 4. Módulos funcionales

### 4.1 Captura (Inbox)
- Input único de texto + opción de dictado por voz (Web Speech API)
- Todo cae a `tasks` con `kanban_column_id = null` y `project_id = null` hasta que se procese
- **Excepción a la regla de deadline obligatorio**: en captura rápida se permite crear sin deadline, pero el item queda bloqueado en el inbox y no puede pasar a un proyecto/kanban hasta que se le asigne fecha — el triage es donde se fuerza el campo.

### 4.2 Triage
- Vista dedicada para vaciar el inbox
- Por cada item: asignar categoría, proyecto (o crear uno), deadline (obligatorio en este paso), o descartar
- Gamification: completar el triage diario es en sí mismo una quest recurrente

### 4.3 Kanban
- Vista por proyecto con columnas default (Por hacer / En progreso / Hecho) + soporte para columnas custom (crear, renombrar, reordenar, eliminar)
- Drag and drop entre columnas
- Tarjetas muestran: título, badge de categoría con su color, fecha límite, indicador visual si está en estado "follow-up"
- Subtareas visibles como checklist colapsable dentro de la tarjeta, cada una con su propio deadline

### 4.4 Follow-ups
- Al crear o editar una tarea, checkbox "Depende de un stakeholder / follow-up"
- Si se activa: campo de intervalo (cada X días), nombre opcional del stakeholder
- La tarea no se marca "hecha" al dar seguimiento — se registra el contacto y el sistema reprograma el siguiente recordatorio automáticamente
- Vista dedicada "Follow-ups activos" listando todos los pendientes de este tipo, ordenados por próximo recordatorio

### 4.5 Calendario
- Vistas: día, semana, mes (toggle)
- Filtro multi-select por categoría (colores consistentes en toda la app)
- Auto-poblado desde `tasks.deadline` — cero doble captura
- Tareas vencidas se distinguen visualmente (no como "fracaso", ver sección de gamification)

### 4.6 Motor de notificaciones / reminders
- Job programado (Supabase Edge Function + cron, o `pg_cron`) que revisa deadlines próximos y genera registros en `notifications`
- Escalones sugeridos: 3 días antes, 1 día antes, el mismo día, y si se vence
- Follow-ups generan su propio tipo de notificación en `next_reminder_at`
- Entrega vía Web Push (con permiso del usuario) + badge visual en la app

### 4.7 Sistema RPG / Gamification

**XP y niveles**: cada categoría tiene su propio XP y nivel, calculado a partir de tareas completadas (peso proporcional a dificultad/tamaño, configurable).

**Clases evolutivas por categoría**:
| Categoría | Clase | Rangos sugeridos |
|---|---|---|
| Concentrix | Nigromante | Aprendiz → Invocador → Señor de las sombras → Archinigromante |
| Delorean | Bárbaro | Novato → Guerrero → Berserker → Señor de la guerra |
| Estudios | Mago | Iniciado → Erudito → Arcanista → Archimago |
| Hobbies | Pícaro | Aprendiz → Trotamundos → Maestro de sombras → Leyenda |
| Personal | Clérigo | Novicio → Sanador → Paladín → Sumo sacerdote |
| Hogar | Druida | Aprendiz → Guardabosques → Druida ancestral → Avatar de la naturaleza |

El avatar visual cambia (icono, color/aura, marco) en cada salto de rango — no es un solo avatar general, sino 6 árboles independientes.

**Quests**: diarias (triage, 1 tarea prioritaria) y semanales (agrupan varias tareas hacia un objetivo, recompensa mayor que completar tareas sueltas para incentivar el cierre real).

**Streaks y escudos**: racha de actividad diaria, con "escudos" acumulables que protegen un día sin actividad sin romper la racha — evita el efecto castigo típico de TDAH.

**Loot**: insignias simbólicas desbloqueadas por hitos (racha, quest semanal completa, subida de nivel, cierre de proyecto).

**Tareas vencidas**: en vez de solo marcar en rojo, generan automáticamente una "quest de rescate" con recompensa extra al completarla — reencuadre motivador en vez de punitivo.

## 5. Roadmap sugerido (fases para Claude Code)

**Fase 1 — MVP funcional**
- Auth + estructura de datos base en Supabase
- Captura + triage
- Kanban con columnas default (sin custom todavía)
- Tareas y subtareas con deadline obligatorio
- Calendario vista mes básica

**Fase 2 — Gamification core**
- XP por categoría, niveles, 1 rango visual por clase (sin árbol completo aún)
- Streaks y escudos
- Quests diarias/semanales

**Fase 3 — Profundidad RPG**
- Árboles de evolución completos (4 rangos x 6 clases)
- Sistema de loot
- Vistas día/semana de calendario
- Columnas kanban custom

**Fase 4 — Follow-ups y notificaciones**
- Módulo de follow-up recurrente
- Motor de notificaciones push con escalones
- Vista dedicada de follow-ups activos

**Fase 5 — Pulido**
- Modo offline robusto
- Dictado por voz en captura
- Ajustes de PWA (manifest, íconos, splash screens)
- Despliegue final con dominio propio

## 6. Requisitos no funcionales

- **Offline-first**: la captura debe funcionar sin conexión y sincronizar al reconectar (esto es crítico para no perder ideas)
- **Rendimiento**: la vista de captura debe cargar en menos de 1 segundo — cualquier fricción aquí rompe el propósito del sistema
- **Modo oscuro**: soportado desde el inicio
- **Responsive**: mobile-first, ya que la captura ocurrirá mayormente desde el celular
- **Seguridad**: Row Level Security en Supabase para que cada usuario solo acceda a sus propios datos (aunque sea de un solo usuario, dejarlo bien configurado desde el inicio)
