-- Limpieza única: descarta avisos pendientes que apuntan a micro-pasos o a
-- misiones ya hechas (los generaba el sync del cliente, que contaba subtareas).
-- Los avisos de tipo follow_up de misiones en seguimiento se conservan.
-- Opcional, idempotente. Correr en el SQL Editor de Supabase.
update public.notifications n
   set dismissed_at = now()
 where n.dismissed_at is null
   and exists (
     select 1
       from public.tasks t
      where t.id = n.task_id
        and (
          t.parent_task_id is not null
          or t.status = 'done'
          or (t.status = 'follow_up' and n.type <> 'follow_up')
        )
   );
