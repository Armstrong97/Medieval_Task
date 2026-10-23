-- Fase 10 (cadenas, fase B): aviso persistente al despertar una misión.
-- Se corre completa en el SQL Editor de Supabase. Idempotente.
-- Requiere haber corrido antes 20261015000001_fase10_cadenas_de_misiones.sql.

alter table public.notifications
  drop constraint if exists notifications_type_check;

alter table public.notifications
  add constraint notifications_type_check
  check (type in ('upcoming', 'upcoming_3d', 'upcoming_1d', 'due_today', 'overdue', 'follow_up', 'unlocked'));

-- Misma función de la migración anterior; la única diferencia es el aviso al
-- despertar. Si la misión ya tenía un aviso 'unlocked' (se durmió y despertó
-- otra vez) se reactiva en vez de chocar con unique(task_id, type).
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

    update public.tasks
      set locked = false, deadline = v_new_deadline
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
