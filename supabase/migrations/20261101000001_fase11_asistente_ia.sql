-- Fase 11: asistente IA. Consentimiento del usuario y cuota diaria de llamadas.
-- Idempotente: se puede correr más de una vez.

create table if not exists public.ai_settings (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.ai_settings enable row level security;

drop policy if exists "ai_settings_all_own_rows" on public.ai_settings;
create policy "ai_settings_all_own_rows"
  on public.ai_settings for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default current_date,
  calls int not null default 0,
  primary key (user_id, day)
);

alter table public.ai_usage enable row level security;

-- Solo lectura propia: nadie escribe aquí desde el cliente (lo hace ai_consume_quota).
drop policy if exists "ai_usage_read_own_rows" on public.ai_usage;
create policy "ai_usage_read_own_rows"
  on public.ai_usage for select
  to authenticated
  using (auth.uid() = user_id);

-- Descuenta 1 de la cuota diaria del usuario autenticado. Devuelve false si ya
-- alcanzó el límite. El upsert condicional es atómico: dos llamadas simultáneas
-- no pueden pasarse del tope.
create or replace function public.ai_consume_quota(p_limit int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_calls int;
begin
  if auth.uid() is null then
    return false;
  end if;

  insert into public.ai_usage as u (user_id, day, calls)
  values (auth.uid(), current_date, 1)
  on conflict (user_id, day) do update
    set calls = u.calls + 1
    where u.calls < p_limit
  returning u.calls into v_calls;

  return v_calls is not null;
end;
$$;

revoke all on function public.ai_consume_quota(int) from public, anon;
grant execute on function public.ai_consume_quota(int) to authenticated;
