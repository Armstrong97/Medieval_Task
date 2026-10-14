# Pendings (parking lot)

Cosas acordadas que no se hacen todavía. Revisar al retomar cada tema.

## Rediseño "Hyrule" (BotW/TotK) — Fase 5: assets verdes

- **Bloqueado hasta el jueves**: el usuario no puede generar imágenes nuevas hasta entonces (Gemini/Imagen).
- Regenerar en paleta verde/Sheikah (hoy son morado/oro): armas (`public/assets/rpg/weapons/`), jefes (`bosses/`), cofre (`loot/`) e íconos del menú (`nav/`, 7 íconos).
- Después de generarlos: `node scripts/optimize-rpg-assets.mjs` (ajustar `TARGETS`) antes de integrarlos. Los originales de Imagen pesan MB y rompen el límite de 2 MB del precache.
- Mientras tanto, la UI mezcla assets morados con el fondo verde (transitorio, aceptado).

## Avatares de clase ilustrados (depende de la Fase 5)

- Hoy el avatar del héroe en el Battle HUD es un ícono vectorial de la clase dominante (`src/utils/classIcons.ts`). Cuando existan los assets nuevos: 6 avatares (uno por clase, idealmente con 4 variantes por rango) y reemplazar `HeroIcon` en `BattleHudPage.tsx`.

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
