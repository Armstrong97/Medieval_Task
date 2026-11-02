-- Fase 10 (cadenas, fase C-1): opción de equipar al Combate al despertar.
-- Se corre completa en el SQL Editor de Supabase. Idempotente.
-- Requiere haber corrido antes 20261015000002_fase10_aviso_desbloqueo.sql.

alter table public.tasks
  add column if not exists unlock_equip boolean not null default false;

-- Misma función de la fase B; la única diferencia: si la misión pide equiparse
-- (unlock_equip) y hay un slot libre del Combate, despierta ya equipada. Sin
-- slot libre no pasa nada: despierta normal y queda disponible en el cajón.
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
  v_slot integer;
begin
  select * into v_task from public.tasks where id = p_task_id;
  if not found then
    return;
  end if;

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

    if v_new_deadline is not null then
      update public.tasks
        set deadline = v_new_deadline
        where parent_task_id = p_task_id and deadline > v_new_deadline;
    end if;

    v_slot := null;
    if v_task.unlock_equip and v_task.status = 'pending' and v_task.hud_slot is null then
      select min(s) into v_slot
        from generate_series(1, 3) s
        where not exists (
          select 1 from public.tasks t
          where t.user_id = v_task.user_id
            and t.hud_slot = s
            and t.status not in ('done', 'follow_up')
        );
    end if;

    update public.tasks
      set locked = false,
          deadline = v_new_deadline,
          hud_slot = coalesce(v_slot, hud_slot),
          status = case when v_slot is not null then 'in_progress' else status end
      where id = p_task_id;

    insert into public.notifications (user_id, task_id, type, message)
    values (v_task.user_id, p_task_id, 'unlocked', 'Desbloqueada: ' || v_task.title)
    on conflict (task_id, type) do update
      set message = excluded.message, scheduled_at = now(), dismissed_at = null;
  elsif not v_satisfied
        and not v_task.locked
        and p_allow_lock
        and v_task.status = 'pending'
        and v_task.hud_slot is null then
    update public.tasks set locked = true where id = p_task_id;
  end if;
end;
$$;
