-- Fase 3: árbol de 4 rangos x 6 clases, sistema de loot.
-- Las columnas kanban custom no necesitan migración: el schema de Fase 1
-- (kanban_columns con is_default/position) ya alcanza, es trabajo de cliente.

-- ============================================================
-- class_ranks
-- Tabla de referencia fija (seed), igual que categories: de solo lectura.
-- Umbrales de XP elegidos para que el rango 4 (máximo) quede en línea con
-- unos ~20 niveles de progreso (nivel = 1 + floor(xp/100)).
-- icon_name acá es la insignia que se superpone sobre el ícono de la
-- categoría al subir de rango (null en el rango 1, sin insignia todavía).
-- ============================================================
create table public.class_ranks (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete cascade,
  rank_order integer not null check (rank_order between 1 and 4),
  rank_name text not null,
  xp_threshold integer not null,
  icon_name text,
  unique (category_id, rank_order)
);

alter table public.class_ranks enable row level security;

create policy "class_ranks_select_authenticated"
  on public.class_ranks for select
  to authenticated
  using (true);

insert into public.class_ranks (category_id, rank_order, rank_name, xp_threshold, icon_name)
select id, 1, 'Aprendiz', 0, null from public.categories where name = 'Concentrix'
union all select id, 2, 'Invocador', 300, 'chevron-up' from public.categories where name = 'Concentrix'
union all select id, 3, 'Señor de las sombras', 800, 'flame' from public.categories where name = 'Concentrix'
union all select id, 4, 'Archinigromante', 2000, 'crown' from public.categories where name = 'Concentrix'
union all select id, 1, 'Novato', 0, null from public.categories where name = 'Delorean'
union all select id, 2, 'Guerrero', 300, 'chevron-up' from public.categories where name = 'Delorean'
union all select id, 3, 'Berserker', 800, 'flame' from public.categories where name = 'Delorean'
union all select id, 4, 'Señor de la guerra', 2000, 'crown' from public.categories where name = 'Delorean'
union all select id, 1, 'Iniciado', 0, null from public.categories where name = 'Estudios'
union all select id, 2, 'Erudito', 300, 'chevron-up' from public.categories where name = 'Estudios'
union all select id, 3, 'Arcanista', 800, 'flame' from public.categories where name = 'Estudios'
union all select id, 4, 'Archimago', 2000, 'crown' from public.categories where name = 'Estudios'
union all select id, 1, 'Aprendiz', 0, null from public.categories where name = 'Hobbies'
union all select id, 2, 'Trotamundos', 300, 'chevron-up' from public.categories where name = 'Hobbies'
union all select id, 3, 'Maestro de sombras', 800, 'flame' from public.categories where name = 'Hobbies'
union all select id, 4, 'Leyenda', 2000, 'crown' from public.categories where name = 'Hobbies'
union all select id, 1, 'Novicio', 0, null from public.categories where name = 'Personal'
union all select id, 2, 'Sanador', 300, 'chevron-up' from public.categories where name = 'Personal'
union all select id, 3, 'Paladín', 800, 'flame' from public.categories where name = 'Personal'
union all select id, 4, 'Sumo sacerdote', 2000, 'crown' from public.categories where name = 'Personal'
union all select id, 1, 'Aprendiz', 0, null from public.categories where name = 'Hogar'
union all select id, 2, 'Guardabosques', 300, 'chevron-up' from public.categories where name = 'Hogar'
union all select id, 3, 'Druida ancestral', 800, 'flame' from public.categories where name = 'Hogar'
union all select id, 4, 'Avatar de la naturaleza', 2000, 'crown' from public.categories where name = 'Hogar';

-- ============================================================
-- user_category_xp: current_rank_id + trigger que lo mantiene al día
-- según current_xp.
-- ============================================================
alter table public.user_category_xp
  add column current_rank_id uuid references public.class_ranks (id);

create function public.set_current_rank()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  select id into new.current_rank_id
    from public.class_ranks
    where category_id = new.category_id and xp_threshold <= new.current_xp
    order by rank_order desc
    limit 1;
  return new;
end;
$$;

create trigger user_category_xp_set_rank
  before insert or update of current_xp on public.user_category_xp
  for each row execute function public.set_current_rank();

-- ============================================================
-- loot_definitions: catálogo fijo de insignias desbloqueables (seed).
-- loot: qué insignias desbloqueó cada usuario y cuándo.
-- Se separan en dos tablas (el documento las describe como una sola) para
-- poder mostrar insignias "bloqueadas" en la UI sin inventar una fila por
-- usuario para cada una desde el principio.
-- ============================================================
create table public.loot_definitions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  icon_name text not null,
  category_id uuid references public.categories (id) on delete cascade,
  trigger_type text not null check (trigger_type in ('streak', 'quest_complete', 'level_up', 'rank_up')),
  trigger_value integer
);

alter table public.loot_definitions enable row level security;

create policy "loot_definitions_select_authenticated"
  on public.loot_definitions for select
  to authenticated
  using (true);

create table public.loot (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  loot_definition_id uuid not null references public.loot_definitions (id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique (user_id, loot_definition_id)
);

alter table public.loot enable row level security;

create policy "loot_all_own_rows"
  on public.loot for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

insert into public.loot_definitions (slug, name, description, icon_name, trigger_type, trigger_value) values
  ('streak_7', 'Racha de una semana', '7 días seguidos de actividad.', 'flame', 'streak', 7),
  ('streak_30', 'Racha de un mes', '30 días seguidos de actividad.', 'flame', 'streak', 30),
  ('streak_100', 'Racha centenaria', '100 días seguidos de actividad.', 'flame', 'streak', 100),
  ('quest_first', 'Primera quest cumplida', 'Completaste tu primera quest.', 'sparkles', 'quest_complete', 1),
  ('quest_10', 'Cazador de quests', '10 quests completadas en total.', 'sparkles', 'quest_complete', 10),
  ('level_5_any', 'Primer ascenso', 'Nivel 5 en alguna categoría.', 'trending-up', 'level_up', 5),
  ('level_10_any', 'En racha de crecimiento', 'Nivel 10 en alguna categoría.', 'trending-up', 'level_up', 10);

insert into public.loot_definitions (slug, name, description, icon_name, category_id, trigger_type, trigger_value)
select 'rank4_' || c.id::text, 'Maestría: ' || c.class_name, 'Rango máximo en ' || c.name || '.', 'crown', c.id, 'rank_up', 4
from public.categories c;

-- ============================================================
-- Otorgamiento de loot (idempotente vía unique(user_id, loot_definition_id)).
-- ============================================================
create function public.grant_loot(p_user_id uuid, p_slug text)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_def_id uuid;
begin
  select id into v_def_id from public.loot_definitions where slug = p_slug;
  if v_def_id is not null then
    insert into public.loot (user_id, loot_definition_id)
    values (p_user_id, v_def_id)
    on conflict (user_id, loot_definition_id) do nothing;
  end if;
end;
$$;

create function public.check_quest_loot(p_user_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_count integer;
begin
  select count(*) into v_count from public.quests where user_id = p_user_id and completed = true;
  if v_count >= 1 then perform public.grant_loot(p_user_id, 'quest_first'); end if;
  if v_count >= 10 then perform public.grant_loot(p_user_id, 'quest_10'); end if;
end;
$$;

create function public.check_rank_loot(p_user_id uuid, p_category_id uuid, p_rank_order integer)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_def_id uuid;
begin
  if p_rank_order < 4 then
    return;
  end if;

  select id into v_def_id from public.loot_definitions
    where category_id = p_category_id and trigger_type = 'rank_up';

  if v_def_id is not null then
    insert into public.loot (user_id, loot_definition_id)
    values (p_user_id, v_def_id)
    on conflict (user_id, loot_definition_id) do nothing;
  end if;
end;
$$;

-- register_daily_activity ya existe desde Fase 2: se reemplaza para sumarle
-- el chequeo de loot por racha, sin duplicar la lógica de streaks/escudos.
create or replace function public.register_daily_activity(p_user_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_last date;
  v_current integer;
  v_longest integer;
  v_shields integer;
begin
  select last_active_date, current_streak_days, longest_streak, shields_available
    into v_last, v_current, v_longest, v_shields
    from public.streaks
    where user_id = p_user_id;

  if v_last = current_date then
    return;
  elsif v_last = current_date - 1 then
    v_current := v_current + 1;
  elsif v_last = current_date - 2 and v_shields > 0 then
    v_current := v_current + 1;
    v_shields := v_shields - 1;
  else
    v_current := 1;
  end if;

  if v_current % 7 = 0 then
    v_shields := least(v_shields + 1, 3);
  end if;

  update public.streaks
    set current_streak_days = v_current,
        longest_streak = greatest(v_longest, v_current),
        shields_available = v_shields,
        last_active_date = current_date
    where user_id = p_user_id;

  if v_current >= 7 then perform public.grant_loot(p_user_id, 'streak_7'); end if;
  if v_current >= 30 then perform public.grant_loot(p_user_id, 'streak_30'); end if;
  if v_current >= 100 then perform public.grant_loot(p_user_id, 'streak_100'); end if;
end;
$$;

create function public.user_category_xp_after_update()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_rank_order integer;
begin
  if new.current_level >= 5 then perform public.grant_loot(new.user_id, 'level_5_any'); end if;
  if new.current_level >= 10 then perform public.grant_loot(new.user_id, 'level_10_any'); end if;

  if new.current_rank_id is not null and old.current_rank_id is distinct from new.current_rank_id then
    select rank_order into v_rank_order from public.class_ranks where id = new.current_rank_id;
    perform public.check_rank_loot(new.user_id, new.category_id, v_rank_order);
  end if;

  return new;
end;
$$;

create trigger user_category_xp_after_update
  after update of current_level, current_rank_id on public.user_category_xp
  for each row execute function public.user_category_xp_after_update();

-- tasks_after_done y tasks_after_triage (Fase 2) marcan quests como
-- completed = true en tres puntos distintos; se reemplazan para sumar el
-- chequeo de loot por cantidad de quests ahí mismo.
create or replace function public.tasks_after_done()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_week_start date;
  v_project_total integer;
  v_project_done integer;
  v_project_category_id uuid;
begin
  if not (new.status = 'done' and old.status is distinct from 'done') then
    return new;
  end if;

  perform public.register_daily_activity(new.user_id);

  if new.parent_task_id is not null then
    return new;
  end if;

  if new.category_id is not null and new.xp_reward > 0 then
    insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
    values (new.user_id, new.category_id, new.xp_reward, 1 + floor(new.xp_reward / 100.0))
    on conflict (user_id, category_id) do update
      set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
          current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
  end if;

  if exists (
    select 1 from public.quests
    where user_id = new.user_id
      and type = 'daily_priority'
      and period_start = current_date
      and task_id = new.id
      and completed = false
  ) then
    update public.quests
      set completed = true, completed_at = now()
      where user_id = new.user_id
        and type = 'daily_priority'
        and period_start = current_date
        and task_id = new.id;

    if new.category_id is not null then
      update public.user_category_xp
        set current_xp = current_xp + 20,
            current_level = 1 + floor((current_xp + 20) / 100.0)
        where user_id = new.user_id and category_id = new.category_id;
    end if;

    perform public.check_quest_loot(new.user_id);
  end if;

  if new.project_id is not null and new.deadline is not null then
    v_week_start := date_trunc('week', new.deadline::date)::date;

    select count(*), count(*) filter (where status = 'done')
      into v_project_total, v_project_done
      from public.tasks
      where project_id = new.project_id
        and parent_task_id is null
        and deadline is not null
        and deadline::date >= v_week_start
        and deadline::date < v_week_start + 7;

    if v_project_total > 0 and v_project_total = v_project_done and not exists (
      select 1 from public.quests
      where user_id = new.user_id
        and type = 'weekly_project'
        and period_start = v_week_start
        and project_id = new.project_id
        and completed = true
    ) then
      insert into public.quests (user_id, type, period_start, project_id, xp_reward, completed, completed_at)
      values (new.user_id, 'weekly_project', v_week_start, new.project_id, 50, true, now())
      on conflict (user_id, type, period_start, project_id) where project_id is not null
      do update set completed = true, completed_at = now();

      select category_id into v_project_category_id from public.projects where id = new.project_id;

      if v_project_category_id is not null then
        insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
        values (new.user_id, v_project_category_id, 50, 1 + floor(50 / 100.0))
        on conflict (user_id, category_id) do update
          set current_xp = public.user_category_xp.current_xp + 50,
              current_level = 1 + floor((public.user_category_xp.current_xp + 50) / 100.0);
      end if;

      perform public.check_quest_loot(new.user_id);
    end if;
  end if;

  return new;
end;
$$;

create or replace function public.tasks_after_triage()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_remaining_inbox integer;
begin
  if new.kanban_column_id is null or old.kanban_column_id is not null then
    return new;
  end if;

  select count(*) into v_remaining_inbox
    from public.tasks
    where user_id = new.user_id and parent_task_id is null and kanban_column_id is null;

  if v_remaining_inbox = 0 and not exists (
    select 1 from public.quests
    where user_id = new.user_id
      and type = 'daily_triage'
      and period_start = current_date
      and completed = true
  ) then
    insert into public.quests (user_id, type, period_start, xp_reward, completed, completed_at)
    values (new.user_id, 'daily_triage', current_date, 15, true, now())
    on conflict (user_id, type, period_start) where project_id is null do nothing;

    perform public.register_daily_activity(new.user_id);
    perform public.check_quest_loot(new.user_id);
  end if;

  return new;
end;
$$;
