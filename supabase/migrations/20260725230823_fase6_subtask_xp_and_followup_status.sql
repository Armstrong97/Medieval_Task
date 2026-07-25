-- Fase 6 (Cambios menores de Experiencia):
-- 1) Las subtareas ahora otorgan XP: 1/10 del xp_reward de la tarea padre
--    (redondeado), en vez de 0. Fomenta partir tareas grandes en pasos chicos
--    sin perder el incentivo de XP.
-- 2) Se agrega 'follow_up' como status válido de tasks: al "Enviar a
--    Follow-up" desde el Kanban, la tarea sale de la vista activa del
--    tablero (deja de generar presión de deadline) pero se mantiene viva
--    para seguimiento en la página de Follow-ups.

-- ============================================================
-- tasks.status: sumar 'follow_up' al check constraint existente.
-- ============================================================
alter table public.tasks
  drop constraint tasks_status_check;

alter table public.tasks
  add constraint tasks_status_check
  check (status in ('pending', 'in_progress', 'done', 'follow_up'));

-- ============================================================
-- tasks_set_xp_reward: las subtareas ya no fuerzan xp_reward = 0.
-- Ahora heredan 1/10 (redondeado) del xp_reward actual de su tarea padre.
-- Nota: si el tamaño de la tarea padre cambia después de crear la subtarea,
-- el xp_reward de la subtarea no se recalcula solo — habría que reguardarla.
-- ============================================================
create or replace function public.tasks_set_xp_reward()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_parent_xp integer;
begin
  if new.parent_task_id is not null then
    select xp_reward into v_parent_xp from public.tasks where id = new.parent_task_id;
    new.xp_reward := round(coalesce(v_parent_xp, 0) / 10.0);
  else
    new.xp_reward := case
      when new.size = 'small' then 10
      when new.size = 'medium' then 25
      when new.size = 'large' then 50
      else 0
    end;
  end if;
  return new;
end;
$$;

-- ============================================================
-- tasks_after_done: las subtareas ahora sí otorgan XP a la categoría de su
-- tarea padre al completarse (antes se ignoraban por completo). No disparan
-- quest de prioridad del día ni quest semanal — esas siguen siendo solo de
-- tareas de nivel superior.
-- ============================================================
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
