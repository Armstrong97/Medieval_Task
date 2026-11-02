-- Fase 10 (cadenas, fase C-2): bono de XP al completar una cadena entera.
-- Se corre completa en el SQL Editor de Supabase. Idempotente.
-- Requiere 20261015000001_fase10_cadenas_de_misiones.sql (task_links).
--
-- Cadena completada = todas las misiones conectadas por enlaces están en 'done'.
-- Bono = 25 % del XP base de la cadena (mínimo 10), se paga una sola vez: la
-- misión que lo recibe guarda chain_bonus > 0, y eso marca la cadena como pagada
-- (reabrir y volver a completar no lo repite).

alter table public.tasks
  add column if not exists chain_bonus integer not null default 0;

-- BEFORE: calcula el bono para que el cliente lo reciba en el RETURNING.
create or replace function public.tasks_set_chain_bonus()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_ids uuid[];
  v_total integer;
begin
  if not (new.status = 'done' and old.status is distinct from 'done')
     or new.parent_task_id is not null then
    return new;
  end if;

  with recursive comp(id) as (
    select new.id
    union
    select case when l.from_task_id = c.id then l.to_task_id else l.from_task_id end
    from comp c
    join public.task_links l on l.from_task_id = c.id or l.to_task_id = c.id
  )
  select array_agg(id) into v_ids from comp;

  if coalesce(array_length(v_ids, 1), 0) < 2 then
    return new;
  end if;

  if exists (
    select 1 from public.tasks t
    where t.id = any (v_ids) and t.id <> new.id
      and (t.status <> 'done' or t.chain_bonus > 0)
  ) then
    return new;
  end if;

  select coalesce(sum(case when t.id = new.id then new.xp_reward else t.xp_reward end), 0)
    into v_total
    from public.tasks t
    where t.id = any (v_ids);

  new.chain_bonus := greatest(10, round(v_total * 0.25)::integer);
  return new;
end;
$$;

drop trigger if exists tasks_before_chain_bonus on public.tasks;
create trigger tasks_before_chain_bonus
  before update of status on public.tasks
  for each row execute function public.tasks_set_chain_bonus();

-- AFTER: suma el bono a la categoría de la misión (solo la primera vez que se
-- fija; old.chain_bonus = 0). Sin categoría no hay a quién sumarlo.
create or replace function public.tasks_pay_chain_bonus()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.chain_bonus > 0 and old.chain_bonus = 0 and new.category_id is not null then
    insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
    values (new.user_id, new.category_id, new.chain_bonus, 1 + floor(new.chain_bonus / 100.0))
    on conflict (user_id, category_id) do update
      set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
          current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_after_chain_bonus on public.tasks;
create trigger tasks_after_chain_bonus
  after update of status on public.tasks
  for each row execute function public.tasks_pay_chain_bonus();
