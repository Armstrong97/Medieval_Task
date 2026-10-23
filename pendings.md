# Pendings (parking lot)

Cosas acordadas que no se hacen todavía. Revisar al retomar cada tema.

## Rediseño "Hyrule" (BotW/TotK) — Fase 5: assets verdes

- **Bloqueado hasta el jueves**: el usuario no puede generar imágenes nuevas hasta entonces (Gemini/Imagen).
- Regenerar en paleta verde/Sheikah (hoy son morado/oro): armas (`public/assets/rpg/weapons/`), jefes (`bosses/`), cofre (`loot/`) e íconos del menú (`nav/`, 7 íconos).
- Después de generarlos: `node scripts/optimize-rpg-assets.mjs` (ajustar `TARGETS`) antes de integrarlos. Los originales de Imagen pesan MB y rompen el límite de 2 MB del precache.
- Mientras tanto, la UI mezcla assets morados con el fondo verde (transitorio, aceptado).

## Avatares de clase ilustrados (depende de la Fase 5)

- Hoy el avatar del héroe en el Battle HUD es un ícono vectorial de la clase dominante (`src/utils/classIcons.ts`). Cuando existan los assets nuevos: 6 avatares (uno por clase, idealmente con 4 variantes por rango) y reemplazar `HeroIcon` en `BattleHudPage.tsx`.

## ESTADO AL 2026-10-16 (leer primero)

- **Nada de lo nuevo está commiteado**: el último commit es `39ec301`. Pendiente de commit: edición de tareas desde Follow-ups, Cadenas de misiones (fase A, B y compositor de etapas), fix del slot del Combate, `isOverdue` sin dormidas. Revisar `git status` y proponer commits atómicos al usuario (no commitear sin que lo pida).
- **Migraciones de Supabase por correr, EN ORDEN** (SQL Editor, todas idempotentes; confirmar con el usuario cuáles ya corrió):
  1. `20261014000001_fase9_orden_subtareas.sql` (si falta)
  2. `20261015000001_fase10_cadenas_de_misiones.sql`
  3. `20261015000002_fase10_aviso_desbloqueo.sql`
  4. `20261016000001_fase10_evento_enlace.sql`
- **Deploy de la Edge Function** tras las migraciones: `npx supabase functions deploy send-notifications --project-ref dlztajgoljayfmqjdqio` (ahora ignora misiones dormidas).
- **Sin verificar en navegador**: compositor de etapas (editor y Estrategia), página `/cadenas`, aviso `unlocked` en la campana. El usuario probó "lo básico" de la fase A y funciona. Probar: A y B → C (dos pasos «a la vez» y uno después), quitar un paso del medio, Estrategia con «+ Y después…» (incl. despacho a Seguimiento), «Despertar ahora».
- Siguiente trabajo acordado: **fase C de cadenas** (ver abajo); empezar por equipar al Combate al despertar y XP por cadena completada.

## Pasos manuales de la ronda 3 (si aún no se hicieron)

- Correr `supabase/migrations/20261013000001_fase9_rescate_avisos_triage.sql` en el SQL Editor de Supabase.
- `npx supabase functions deploy send-notifications --project-ref dlztajgoljayfmqjdqio`.

## Rediseño "Hyrule" — Fase 6: verificación (pendiente)

Fases 1–4 hechas y revisadas por el usuario en pantalla (fase 3); la 4 sin revisar aún. Falta, idealmente con el navegador conectado para capturas:

- Claro y oscuro en cada pantalla (en claro puede haber superficies con tinte raro por los overlays `shade`/`glass`).
- Viewport 375px y 768px: sin scroll horizontal, sin texto desbordado (el texto mínimo pasó de 8–11px a 12px en toda la app; revisar medidor de energía y etiquetas del Oráculo, chips del editor de misiones, pestañas de clase del Grimorio).
- `prefers-reduced-motion`: fondo, luciérnagas, esquinas rúnicas, anillo de estamina quietos.
- Teclado: Tab recorre todo con el anillo de foco cian visible; modales se cierran con Escape.
- Contraste: bordes de inputs deben usar `--border-glow` (el `--border` oscuro vs fondo es 1.9:1, decorativo).
- Iconos de logros (`AchievementCelebration`) centrados en el círculo dorado.

## Restricción de IP (aplica a todo el rediseño)

- La app se publicará. **Inspirarse, no copiar**: nada de Trifuerza, Espada Maestra, logo/nombre "Sheikah", tipografía Hylian ni arte de Nintendo. Usar nombres y símbolos propios (runas genéricas, hoja/semilla, etc.).
- Antes de publicar: revisión final de nombres, iconografía y assets contra esta regla.

## Otros pendientes vigentes (ver HANDOFF.md sección 10)

- Deploy a Netlify, dominio propio, ícono maskable real, confirmar migración/Edge Function del Paso 10.

## Cadenas de misiones — ideas en parking lot

- **«¿Qué sigue?» al completar**: al hacer Golpe Final a una misión sin cadena, un aviso discreto que abra el compositor para captar el siguiente paso justo al terminar. Pospuesto a propósito (es una interrupción más); decidir con uso real.
- **Fase C pendiente**: retraso de activación, equipar al Combate / mandar a follow-up al despertar, XP extra por cadena completada, push del aviso de desbloqueo, plantillas de cadenas.
