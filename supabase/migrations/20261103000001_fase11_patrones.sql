-- Fase 11 (fase 3): patrones del usuario para el asistente IA.
--  1) tasks.postponed_count: cuántas veces se movió la fecha límite hacia adelante.
--  2) ai_user_stats(): estadísticas agregadas del usuario autenticado (solo SQL, sin IA).
-- Idempotente: se puede correr más de una vez.

alter table public.tasks
  add column if not exists postponed_count int not null default 0;

-- Cuenta una reprogramación cuando la fecha límite se mueve hacia adelante.
-- No cuenta: asignar la primera fecha (triage), moverla antes, micro-pasos (heredan la
-- del padre), tareas dormidas ni el cambio automático al despertar una cadena
-- (locked pasa de true a false en el mismo UPDATE).
create or replace function public.tasks_count_postponed()
returns trigger
language plpgsql
as $$
begin
  if old.deadline is not null
     and new.deadline is not null
     and new.deadline > old.deadline
     and new.parent_task_id is null
     and old.locked = false
     and new.locked = false
     and new.status <> 'done' then
    new.postponed_count := old.postponed_count + 1;
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_count_postponed on public.tasks;
create trigger tasks_count_postponed
  before update of deadline on public.tasks
  for each row execute function public.tasks_count_postponed();

-- Estadísticas de los últimos 30 días. SECURITY INVOKER: corre con el JWT del
-- usuario, así que RLS limita todo a sus propias filas. p_tz decide a qué hora
-- local pertenece cada completada (día de la semana y franja del día).
create or replace function public.ai_user_stats(p_tz text default 'UTC')
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  with tz as (
    select case when exists (select 1 from pg_timezone_names where name = p_tz) then p_tz else 'UTC' end as name
  ),
  top_level as (
    select * from public.tasks
    where user_id = auth.uid() and parent_task_id is null
  ),
  done_30 as (
    select * from top_level where status = 'done' and completed_at >= now() - interval '30 days'
  ),
  open_now as (
    select * from top_level where status <> 'done' and locked = false
  )
  select jsonb_build_object(
    'completed_30d', (select count(*) from done_30),
    'completed_7d', (select count(*) from done_30 where completed_at >= now() - interval '7 days'),
    'created_30d', (select count(*) from top_level where created_at >= now() - interval '30 days'),
    'open_total', (select count(*) from open_now),
    'overdue_open', (select count(*) from open_now where deadline < now()),
    'on_time_rate_pct', (
      select round(100.0 * count(*) filter (where completed_at <= deadline) / nullif(count(*), 0))
      from done_30 where deadline is not null
    ),
    -- 1 = lunes … 7 = domingo
    'by_weekday', (
      select coalesce(jsonb_object_agg(d::text, n), '{}'::jsonb)
      from (
        select extract(isodow from completed_at at time zone (select name from tz))::int as d, count(*) as n
        from done_30 group by 1
      ) s
    ),
    'by_daypart', (
      select coalesce(jsonb_object_agg(part, n), '{}'::jsonb)
      from (
        select case
                 when h between 5 and 11 then 'manana'
                 when h between 12 and 17 then 'tarde'
                 when h between 18 and 22 then 'noche'
                 else 'madrugada'
               end as part, count(*) as n
        from (select extract(hour from completed_at at time zone (select name from tz))::int as h from done_30) x
        group by 1
      ) y
    ),
    'by_category', (
      select coalesce(jsonb_object_agg(name, n), '{}'::jsonb)
      from (
        select c.name, count(*) as n
        from done_30 d join public.categories c on c.id = d.category_id
        group by c.name
      ) z
    ),
    -- Días reales entre crear y completar, por tamaño.
    'avg_days_to_complete_by_size', (
      select coalesce(jsonb_object_agg(size, avg_days), '{}'::jsonb)
      from (
        select size, round(avg(extract(epoch from completed_at - created_at) / 86400)::numeric, 1) as avg_days
        from done_30 where size is not null group by size
      ) w
    ),
    -- Misiones que se repiten (mismo título, 3 o más veces en 180 días).
    'recurring', (
      select coalesce(jsonb_agg(jsonb_build_object('title', t, 'times', n)), '[]'::jsonb)
      from (
        select min(title) as t, count(*) as n
        from top_level
        where status = 'done' and completed_at >= now() - interval '180 days'
        group by lower(trim(title))
        having count(*) >= 3
        order by count(*) desc
        limit 5
      ) r
    ),
    -- Misiones abiertas que se han movido 3 o más veces.
    'stuck', (
      select coalesce(jsonb_agg(jsonb_build_object('id', id, 'title', title, 'postponed', postponed_count)), '[]'::jsonb)
      from (
        select id, title, postponed_count
        from open_now where postponed_count >= 3
        order by postponed_count desc
        limit 5
      ) k
    )
  );
$$;

revoke all on function public.ai_user_stats(text) from public, anon;
grant execute on function public.ai_user_stats(text) to authenticated;
