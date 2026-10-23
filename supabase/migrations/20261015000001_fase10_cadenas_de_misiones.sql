-- Fase 10: Cadenas de misiones (dependencias con disparadores).
-- Una misión puede quedar "dormida" (locked) hasta que se cumpla el disparador
-- de sus predecesoras; entonces se despierta sola. Ramas: una misma misión puede
-- desbloquear a varias (A -> B y C) y una misión puede esperar a varias, con
-- unlock_mode 'all' (todas) o 'any' (basta una).
-- Se corre completa en el SQL Editor de Supabase. Idempotente.

-- ============================================================
-- 1. Columnas nuevas en tasks
-- locked: dormida, fuera de Combate/Calendario/avisos hasta despertar.
-- unlock_mode: 'all' = esperar a todas las predecesoras, 'any' = a la primera.
-- unlock_deadline_days: al despertar, deadline = ahora + N días (null = conserva).
-- ============================================================
alter table public.tasks
  add column if not exists locked boolean not null default false,
  add column if not exists unlock_mode text not null default 'all'
    check (unlock_mode in ('all', 'any')),
  add column if not exists unlock_deadline_days integer
    check (unlock_deadline_days is null or unlock_deadline_days >= 0);

-- ============================================================
-- 2. task_links: arista "from_task_id desbloquea a to_task_id"
-- on_event: qué debe pasarle a la predecesora para cumplir el enlace.
-- ============================================================
create table if not exists public.task_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  from_task_id uuid not null references public.tasks (id) on delete cascade,
  to_task_id uuid not null references public.tasks (id) on delete cascade,
  on_event text not null default 'task_done'
    check (on_event in ('task_done', 'follow_up_resolved')),
  created_at timestamptz not null default now(),
  unique (from_task_id, to_task_id),
  check (from_task_id <> to_task_id)
);

create index if not exists task_links_from_idx on public.task_links (from_task_id);
create index if not exists task_links_to_idx on public.task_links (to_task_id);

alter table public.task_links enable row level security;

drop policy if exists "task_links_all_own_rows" on public.task_links;
create policy "task_links_all_own_rows"
  on public.task_links for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Solo misiones de nivel superior, del mismo usuario, y sin ciclos.
create or replace function public.task_links_validate()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if (
    select count(*) from public.tasks
    where id in (new.from_task_id, new.to_task_id)
      and user_id = new.user_id
      and parent_task_id is null
  ) <> 2 then
    raise exception 'Las cadenas solo unen misiones propias de nivel superior';
  end if;

  -- union (no union all) corta los recorridos repetidos.
  if exists (
    with recursive downstream(id) as (
      select new.to_task_id
      union
      select l.to_task_id
        from public.task_links l
        join downstream d on l.from_task_id = d.id
    )
    select 1 from downstream where id = new.from_task_id
  ) then
    raise exception 'Esa unión crearía un ciclo en la cadena';
  end if;

  return new;
end;
$$;

drop trigger if exists task_links_before_insert on public.task_links;
create trigger task_links_before_insert
  before insert on public.task_links
  for each row execute function public.task_links_validate();

-- ============================================================
-- 3. Motor: recalcula si una misión debe despertar (o dormirse)
-- p_allow_lock solo es true al crear un enlace: así un evento posterior nunca
-- vuelve a dormir una misión que el usuario ya despertó a mano.
-- ============================================================
create or replace function public.chain_refresh_task(p_task_id uuid, p_allow_lock boolean)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_task public.tasks%rowtype;
  v_satisfied boolean;
  v_new_deadline timestamptz;
begin
  select * into v_task from public.tasks where id = p_task_id;
  if not found then
    return;
  end if;

  -- Sin enlaces el agregado da null: no hay nada que esperar.
  select coalesce(
    case when v_task.unlock_mode = 'any' then bool_or(ok) else bool_and(ok) end,
    true
  )
  into v_satisfied
  from (
    select exists (
      select 1 from public.tasks p
      where p.id = k.from_task_id
        and (
          (k.on_event = 'task_done' and p.status = 'done')
          or (k.on_event = 'follow_up_resolved' and (
            p.status = 'done'
            or exists (
              select 1 from public.follow_ups f
              where f.task_id = p.id and f.resolved_at is not null
            )
          ))
        )
    ) as ok
    from public.task_links k
    where k.to_task_id = p_task_id
  ) l;

  if v_satisfied and v_task.locked then
    v_new_deadline := case
      when v_task.unlock_deadline_days is not null
        then now() + make_interval(days => v_task.unlock_deadline_days)
      else v_task.deadline
    end;

    -- El trigger tasks_before_write prohíbe que el padre quede antes que una
    -- subtarea: se recortan primero (los micro-pasos heredan la fecha del padre).
    if v_new_deadline is not null then
      update public.tasks
        set deadline = v_new_deadline
        where parent_task_id = p_task_id and deadline > v_new_deadline;
    end if;

    update public.tasks
      set locked = false, deadline = v_new_deadline
      where id = p_task_id;
  elsif not v_satisfied
        and not v_task.locked
        and p_allow_lock
        and v_task.status = 'pending'
        and v_task.hud_slot is null then
    update public.tasks set locked = true where id = p_task_id;
  end if;
end;
$$;

-- Disparador 1: una misión pasa a 'done'.
create or replace function public.chain_on_task_done()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_to uuid;
begin
  if new.status = 'done' and old.status is distinct from 'done' then
    for v_to in select to_task_id from public.task_links where from_task_id = new.id loop
      perform public.chain_refresh_task(v_to, false);
    end loop;
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_after_chain on public.tasks;
create trigger tasks_after_chain
  after update of status on public.tasks
  for each row execute function public.chain_on_task_done();

-- Disparador 2: un follow-up se resuelve.
create or replace function public.chain_on_follow_up_resolved()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_to uuid;
begin
  if new.resolved_at is not null and old.resolved_at is null then
    for v_to in select to_task_id from public.task_links where from_task_id = new.task_id loop
      perform public.chain_refresh_task(v_to, false);
    end loop;
  end if;
  return new;
end;
$$;

drop trigger if exists follow_ups_after_chain on public.follow_ups;
create trigger follow_ups_after_chain
  after update of resolved_at on public.follow_ups
  for each row execute function public.chain_on_follow_up_resolved();

-- Crear un enlace puede dormir a la sucesora; borrarlo (o borrar la
-- predecesora, que lo borra en cascada) puede despertarla.
create or replace function public.chain_on_link_change()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    perform public.chain_refresh_task(old.to_task_id, false);
    return old;
  end if;
  perform public.chain_refresh_task(new.to_task_id, true);
  return new;
end;
$$;

drop trigger if exists task_links_after_change on public.task_links;
create trigger task_links_after_change
  after insert or delete on public.task_links
  for each row execute function public.chain_on_link_change();

-- Cambiar 'all' <-> 'any' puede satisfacer la espera.
create or replace function public.chain_on_mode_change()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.locked and new.unlock_mode is distinct from old.unlock_mode then
    perform public.chain_refresh_task(new.id, false);
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_after_mode_change on public.tasks;
create trigger tasks_after_mode_change
  after update of unlock_mode on public.tasks
  for each row execute function public.chain_on_mode_change();

-- ============================================================
-- 4. Red de seguridad: una misión dormida no puede completarse ni equiparse.
-- La UI ya la oculta; esto cubre cualquier camino que se escape.
-- ============================================================
create or replace function public.tasks_block_locked()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if old.locked and new.locked
     and new.status in ('done', 'in_progress', 'follow_up') then
    raise exception 'Esta misión está dormida: espera a que se cumpla su cadena (o despiértala a mano)';
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_before_locked_guard on public.tasks;
create trigger tasks_before_locked_guard
  before update of status on public.tasks
  for each row execute function public.tasks_block_locked();
