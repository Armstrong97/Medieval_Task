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
