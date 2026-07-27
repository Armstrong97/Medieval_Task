-- Fase 7 — Módulo 2 "Dungeon Bosses & Epic Raids" (spec de Gemini).
--
-- Desviaciones deliberadas respecto a la spec original, explicadas al usuario
-- antes de implementar (no son cambios de diseño, son correcciones de cómo
-- construirlo de forma segura/consistente con el resto del esquema):
--
-- 1. NO se crea `get_project_boss_stats`: la spec la marcaba
--    `SECURITY DEFINER` sin filtrar por user_id, lo que permitiría a
--    cualquier usuario autenticado leer el HP de un proyecto ajeno (ningún
--    otro objeto de este esquema usa DEFINER para lógica de negocio, solo
--    para los triggers de seed en creación de cuenta). El HP se calcula en
--    el cliente a partir de una query normal de `tasks` — ya protegida por
--    la RLS existente — igual que ya hace ProgressPage con projects.
-- 2. Se agrega `claim_boss_phase` como función real (no lo hace el cliente):
--    la spec pedía que el cliente otorgue el bonus de XP directamente, lo
--    cual contradice la regla ya establecida desde Fase 2 de que toda la
--    lógica de XP vive en Postgres, nunca en el cliente (evita
--    desincronización y reclamos repetidos). Valida server-side que la fase
--    realmente se alcanzó antes de otorgar nada, y es idempotente.

alter table public.projects
  add column if not exists boss_avatar text not null default 'dragon_default',
  add column if not exists boss_title text not null default 'Señor del Caos',
  add column if not exists phases_claimed integer[] not null default '{}';

create or replace function public.claim_boss_phase(p_project_id uuid, p_phase integer)
returns public.projects
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_project public.projects;
  v_total integer;
  v_done integer;
  v_percent numeric;
  v_xp integer;
begin
  if p_phase not in (75, 50, 25, 0) then
    raise exception 'Fase inválida: %', p_phase;
  end if;

  select * into v_project from public.projects where id = p_project_id;
  if v_project.id is null then
    raise exception 'Proyecto no encontrado';
  end if;

  -- Idempotente: si ya se reclamó esta fase, no vuelve a otorgar XP.
  if p_phase = any(v_project.phases_claimed) then
    return v_project;
  end if;

  select
    coalesce(sum(case when size = 'small' then 10 when size = 'medium' then 25 when size = 'large' then 50 else 10 end), 0),
    coalesce(sum(case when status = 'done' then
      (case when size = 'small' then 10 when size = 'medium' then 25 when size = 'large' then 50 else 10 end)
      else 0 end), 0)
    into v_total, v_done
    from public.tasks
    where project_id = p_project_id and parent_task_id is null;

  v_percent := case when v_total > 0
    then round(((v_total - v_done)::numeric / v_total::numeric) * 100, 2)
    else 100
  end;

  -- Validación server-side: no se puede reclamar una fase que todavía no se
  -- alcanzó, aunque el cliente lo pida (protege contra un cliente con bugs
  -- o alguien llamando el RPC a mano).
  if v_percent > p_phase then
    raise exception 'Todavía no se alcanzó esa fase del jefe (HP restante: %)', v_percent;
  end if;

  v_xp := case when p_phase = 0 then 200 else 50 end;

  update public.projects
    set phases_claimed = array_append(phases_claimed, p_phase)
    where id = p_project_id
    returning * into v_project;

  if v_project.category_id is not null then
    insert into public.user_category_xp (user_id, category_id, current_xp, current_level)
    values (v_project.user_id, v_project.category_id, v_xp, 1 + floor(v_xp / 100.0))
    on conflict (user_id, category_id) do update
      set current_xp = public.user_category_xp.current_xp + excluded.current_xp,
          current_level = 1 + floor((public.user_category_xp.current_xp + excluded.current_xp) / 100.0);
  end if;

  return v_project;
end;
$$;
