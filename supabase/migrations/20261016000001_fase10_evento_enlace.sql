-- Fase 10 (compositor de etapas): cambiar el disparador de un enlace
-- ("al completar" <-> "cuando respondan") puede satisfacer la espera de
-- inmediato (p. ej. el follow-up ya estaba resuelto), así que se recalcula.
-- Requiere la migración 20261015000002. Idempotente.

create or replace function public.chain_on_link_event_change()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.on_event is distinct from old.on_event then
    perform public.chain_refresh_task(new.to_task_id, false);
  end if;
  return new;
end;
$$;

drop trigger if exists task_links_after_event_change on public.task_links;
create trigger task_links_after_event_change
  after update of on_event on public.task_links
  for each row execute function public.chain_on_link_event_change();
