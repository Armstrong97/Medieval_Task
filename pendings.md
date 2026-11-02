# Pendings (parking lot)

Cosas acordadas que no se hacen todavía. Revisar al retomar cada tema.

## Rediseño "Hyrule" (BotW/TotK) — Fase 5: assets verdes (hecha 2026-11-01)

- Regenerados en Gemini y integrados los 15 assets (armas, jefes, cofre y 9 íconos del menú, incluidos `projects` y `chains`). Prompts y guía de estilo en `docs/ASSET_PROMPTS.md`; originales de 2048 px en `assets-raw/` (gitignored). Sin verificar en navegador (menú lateral, Combate, Sala del Jefe).
- La barra inferior móvil sigue con íconos Lucide (24 px); decidir si se le pone el arte ilustrado.
- Mientras tanto, la UI mezcla assets morados con el fondo verde (transitorio, aceptado).

## Avatares de clase ilustrados (desbloqueado: la Fase 5 ya está hecha)

- Hoy el avatar del héroe en el Battle HUD es un ícono vectorial de la clase dominante (`src/utils/classIcons.ts`). Cuando existan los assets nuevos: 6 avatares (uno por clase, idealmente con 4 variantes por rango) y reemplazar `HeroIcon` en `BattleHudPage.tsx`.

## ESTADO AL 2026-11-01 (leer primero)

- **Fase 11 (asistente IA, fases 0 y 1) desplegada y funcionando** (probada por el usuario): ver `docs/AI_PLAN.md` y la sección 21 del HANDOFF. Siguiente: fase 2 (captura en lenguaje natural y cadenas desde un objetivo). Pendiente: nivel de pago antes de usar datos sensibles reales.

- **Todo commiteado y subido** hasta `c9602e6` (assets verdes y docs), salvo la Fase 11. Las 12 migraciones de Supabase hasta `20261017000002` están corridas y `send-notifications` desplegada (confirmado por el usuario).
- **Fase C-1 (equipar al despertar) y C-2 (bono de cadena) probadas por el usuario y funcionando.**
- Siguiente trabajo: resto de la **fase C de cadenas** (ver abajo).

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
- **Fase C-1 y C-2 hechas y verificadas (2026-11-01)**: migraciones `20261017000001_fase10c_equipar_al_despertar.sql` y `20261017000002_fase10c_bono_de_cadena.sql` corridas; casilla «Ponerla en el Combate al despertar» y bono «Cadena completada +N» probados por el usuario.
