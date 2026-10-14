# Questly

PWA de productividad personal con gamificación RPG, diseñada para un perfil TDAH + Altas Capacidades: captura sin fricción, triage guiado y recompensas sin mecánicas punitivas.

**Stack**: React 19 + Vite + TypeScript, Tailwind v4, Supabase (Postgres, Auth, Edge Functions), TanStack Query, PWA offline-first con Web Push.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # typecheck + build de producción
npm run lint     # oxlint
```

Requiere `.env.local` con `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` y `VITE_VAPID_PUBLIC_KEY` (ver `.env.example`).

## Documentación

[`HANDOFF.md`](HANDOFF.md) es la fuente de verdad: arquitectura, modelo de datos, decisiones de diseño y estado. `spec-app-productividad-rpg.md` es la especificación original. Las migraciones están en `supabase/migrations/` y se corren a mano en el SQL Editor de Supabase.
