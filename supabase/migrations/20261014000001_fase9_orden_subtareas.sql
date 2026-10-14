-- Fase 9: orden manual de las subtareas (micro-pasos).
-- Hasta ahora se ordenaban por deadline y, como heredan el de su misión, el
-- orden de los empates era arbitrario. Los micro-pasos son un paso a paso, así
-- que el orden lo decide el usuario. Se corre completa en el SQL Editor de
-- Supabase (ver HANDOFF, sección 1). Idempotente.

alter table public.tasks
  add column if not exists position integer;

-- Subtareas existentes: orden de creación (el orden en que se escribieron).
with ranked as (
  select id, row_number() over (partition by parent_task_id order by created_at, id) as rn
  from public.tasks
  where parent_task_id is not null and position is null
)
update public.tasks t
   set position = r.rn
  from ranked r
 where t.id = r.id;

-- Subtareas nuevas: van al final de la lista de su misión.
create or replace function public.tasks_set_subtask_position()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.parent_task_id is not null and new.position is null then
    select coalesce(max(position), 0) + 1
      into new.position
      from public.tasks
      where parent_task_id = new.parent_task_id;
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_before_insert_position on public.tasks;
create trigger tasks_before_insert_position
  before insert on public.tasks
  for each row execute function public.tasks_set_subtask_position();
