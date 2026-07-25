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
