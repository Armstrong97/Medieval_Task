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
