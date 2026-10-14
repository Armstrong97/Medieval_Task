-- Fase 9 (UX ronda 3): rescate de vencidas sin culpa, avisos con escalones
-- separados y quest de triage al descartar la última captura.
-- Se corre completa en el SQL Editor de Supabase (ver HANDOFF, sección 1).
-- Es idempotente: se puede volver a correr sin romper nada.

-- ============================================================
-- 1. Avisos con escalones separados
-- Antes 'upcoming' cubría 3, 2 y 1 día(s): al descartar el aviso de "en 3
-- días" (unique(task_id, type) + dismissed_at que nunca se pisa) el de
-- "mañana" quedaba silenciado. Ahora cada escalón tiene su propio tipo.
-- 'upcoming' se conserva solo para que las filas viejas sigan siendo válidas.
-- ============================================================
alter table public.notifications
  drop constraint if exists notifications_type_check;

alter table public.notifications
  add constraint notifications_type_check
  check (type in ('upcoming', 'upcoming_3d', 'upcoming_1d', 'due_today', 'overdue', 'follow_up'));

-- ============================================================
-- 2. Rescate de tareas vencidas
-- Terminar una tarea DESPUÉS de su deadline da un bonus de XP (+25 %, mínimo
-- 2). Reencuadre motivador de la spec 4.7 ("quest de rescate") en vez de
-- castigo. Se guarda en la propia tarea (rescue_bonus) en lugar de crear una
-- fila en quests: los índices únicos diarios de quests no admiten varios
-- rescates el mismo día sin romper el ON CONFLICT de los otros triggers.
-- Solo tareas de nivel superior; las subtareas no generan rescate.
-- ============================================================
alter table public.tasks
  add column if not exists rescue_bonus integer not null default 0 check (rescue_bonus >= 0);

create or replace function public.tasks_set_rescue_bonus()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.status = 'done'
     and old.status is distinct from 'done'
     and new.parent_task_id is null
     and new.deadline is not null
     and new.xp_reward > 0
     and now() > new.deadline then
    new.rescue_bonus := greatest(2, ceil(new.xp_reward * 0.25)::integer);
  else
    new.rescue_bonus := 0;
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_before_rescue on public.tasks;
create trigger tasks_before_rescue
  before update of status on public.tasks
  for each row execute function public.tasks_set_rescue_bonus();

-- Misma función de Fase 6 (XP de subtareas), con una sola diferencia: el XP de
-- una tarea de nivel superior suma también su rescue_bonus.
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
  v_parent_category_id uuid;
  v_xp integer;
begin
  if not (new.status = 'done' and old.status is distinct from 'done') then
    return new;
  end if;

  perform public.register_daily_activity(new.user_id);

  if new.parent_task_id is not null then
    if new.xp_reward > 0 then
      select category_id into v_parent_category_id
        from public.tasks where id = new.parent_task_id;

      if v_parent_category_id is not null then
        insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
        values (new.user_id, v_parent_category_id, new.xp_reward, 1 + floor(new.xp_reward / 100.0))
        on conflict (user_id, category_id) do update
          set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
              current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
      end if;
    end if;
    return new;
  end if;

  v_xp := new.xp_reward + new.rescue_bonus;

  if new.category_id is not null and v_xp > 0 then
    insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
    values (new.user_id, new.category_id, v_xp, 1 + floor(v_xp / 100.0))
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

-- ============================================================
-- 3. Quest de triage al descartar la última captura
-- tasks_after_triage solo reaccionaba a un UPDATE de kanban_column_id: si la
-- última captura del inbox se descartaba (DELETE), la quest diaria no se
-- completaba. La lógica se extrae a una función y la usan ambos disparadores.
-- ============================================================
create or replace function public.complete_daily_triage_if_empty(p_user_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_remaining_inbox integer;
begin
  select count(*) into v_remaining_inbox
    from public.tasks
    where user_id = p_user_id and parent_task_id is null and kanban_column_id is null;

  if v_remaining_inbox = 0 and not exists (
    select 1 from public.quests
    where user_id = p_user_id
      and type = 'daily_triage'
      and period_start = current_date
      and completed = true
  ) then
    insert into public.quests (user_id, type, period_start, xp_reward, completed, completed_at)
    values (p_user_id, 'daily_triage', current_date, 15, true, now())
    on conflict (user_id, type, period_start) where project_id is null do nothing;

    perform public.register_daily_activity(p_user_id);
    perform public.check_quest_loot(p_user_id);
  end if;
end;
$$;

create or replace function public.tasks_after_triage()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.kanban_column_id is null or old.kanban_column_id is not null then
    return new;
  end if;

  perform public.complete_daily_triage_if_empty(new.user_id);
  return new;
end;
$$;

create or replace function public.tasks_after_discard()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  -- Solo capturas del inbox (sin columna, nivel superior).
  if old.kanban_column_id is null and old.parent_task_id is null then
    perform public.complete_daily_triage_if_empty(old.user_id);
  end if;
  return old;
end;
$$;

drop trigger if exists tasks_after_discard on public.tasks;
create trigger tasks_after_discard
  after delete on public.tasks
  for each row execute function public.tasks_after_discard();
