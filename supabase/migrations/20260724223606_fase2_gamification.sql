-- Fase 2: gamification core (XP/nivel por categoría, insignia fija por clase,
-- streaks + escudos, quests diarias y semanal automática por proyecto).
-- class_ranks y el árbol de 4 rangos por clase quedan para Fase 3.

-- ============================================================
-- tasks: tamaño (determina xp_reward) — opcional, sin fricción obligatoria.
-- Solo las tareas de nivel superior (sin parent_task_id) otorgan XP.
-- ============================================================
alter table public.tasks
  add column size text check (size in ('small', 'medium', 'large')),
  add column xp_reward integer not null default 0;

create function public.tasks_set_xp_reward()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.xp_reward := case
    when new.parent_task_id is not null then 0
    when new.size = 'small' then 10
    when new.size = 'medium' then 25
    when new.size = 'large' then 50
    else 0
  end;
  return new;
end;
$$;

create trigger tasks_set_xp_reward
  before insert or update of size, parent_task_id on public.tasks
  for each row execute function public.tasks_set_xp_reward();

-- ============================================================
-- user_category_xp
-- Nivel = 1 + floor(xp / 100). El "1 rango visual por clase" de Fase 2 es
-- una insignia fija (icon_name de categories) sin árbol de rangos todavía;
-- class_ranks / current_rank_id llegan en Fase 3.
-- ============================================================
create table public.user_category_xp (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  current_xp integer not null default 0,
  current_level integer not null default 1,
  unique (user_id, category_id)
);

alter table public.user_category_xp enable row level security;

create policy "user_category_xp_all_own_rows"
  on public.user_category_xp for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- streaks
-- Una fila por usuario. Escudo cada 7 días de racha activa (tope 3),
-- se consume automáticamente para cubrir un único día sin actividad.
-- ============================================================
create table public.streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade unique,
  current_streak_days integer not null default 0,
  longest_streak integer not null default 0,
  shields_available integer not null default 0,
  last_active_date date,
  created_at timestamptz not null default now()
);

alter table public.streaks enable row level security;

create policy "streaks_all_own_rows"
  on public.streaks for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create function public.register_daily_activity(p_user_id uuid)
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
end;
$$;

-- ============================================================
-- quests
-- type: 'daily_triage' | 'daily_priority' | 'weekly_project'.
-- period_start: el día (diarias) o el lunes de la semana (semanal).
-- daily_priority.task_id = la tarea marcada con la estrella de "hoy".
-- weekly_project se genera sola cuando se completan todas las tareas de
-- un proyecto con deadline esa semana; no hay creación manual en Fase 2.
-- ============================================================
create table public.quests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  type text not null check (type in ('daily_triage', 'daily_priority', 'weekly_project')),
  period_start date not null,
  project_id uuid references public.projects (id) on delete cascade,
  task_id uuid references public.tasks (id) on delete set null,
  xp_reward integer not null default 0,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index quests_daily_unique_idx
  on public.quests (user_id, type, period_start)
  where project_id is null;

create unique index quests_weekly_unique_idx
  on public.quests (user_id, type, period_start, project_id)
  where project_id is not null;

create index quests_user_period_idx on public.quests (user_id, period_start);

alter table public.quests enable row level security;

create policy "quests_all_own_rows"
  on public.quests for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- Seed de user_category_xp y streaks para usuarios nuevos.
-- ============================================================
create function public.handle_new_user_gamification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_category_xp (user_id, category_id)
  select new.id, id from public.categories;

  insert into public.streaks (user_id) values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created_gamification
  after insert on auth.users
  for each row execute function public.handle_new_user_gamification();

-- ============================================================
-- Efectos al completar una tarea: XP, racha, quest de prioridad del día
-- y quest semanal automática por proyecto.
-- ============================================================
create function public.tasks_after_done()
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
    end if;
  end if;

  return new;
end;
$$;

create trigger tasks_after_done
  after update of status on public.tasks
  for each row execute function public.tasks_after_done();

-- ============================================================
-- Quest de triage diario: se completa sola cuando el inbox llega a 0
-- justo después de triar un item.
-- ============================================================
create function public.tasks_after_triage()
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
  end if;

  return new;
end;
$$;

create trigger tasks_after_triage
  after update of kanban_column_id on public.tasks
  for each row execute function public.tasks_after_triage();
