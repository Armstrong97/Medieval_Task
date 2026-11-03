-- Arreglo de la racha. Idempotente: se puede correr más de una vez.
--
-- Problemas:
--  1) La fila de streaks solo se creaba para usuarios NUEVOS (trigger on_auth_user_created_gamification);
--     las cuentas anteriores a la Fase 2 nunca la tuvieron y register_daily_activity fallaba en silencio
--     (el UPDATE no afectaba ninguna fila), así que la racha nunca avanzaba.
--  2) «Hoy» se calculaba con current_date, que en Supabase es la fecha en UTC. Para alguien en
--     Colombia (UTC-5) el día cambia a las 7 p. m., y completar una misión de noche y otra de
--     mañana podía contar como el mismo día.

-- Zona horaria del usuario (el cliente la sincroniza al abrir la app).
alter table public.streaks
  add column if not exists tz text not null default 'UTC';

-- 1) Rellenar la fila que falta a las cuentas existentes.
insert into public.streaks (user_id)
select id from auth.users
on conflict (user_id) do nothing;

-- 2) register_daily_activity: se auto-repara si falta la fila y cambia de día en la zona del usuario.
--    Mismo comportamiento de racha, escudos y loot que la versión de la Fase 3.
create or replace function public.register_daily_activity(p_user_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_tz text;
  v_today date;
  v_last date;
  v_current integer;
  v_longest integer;
  v_shields integer;
begin
  insert into public.streaks (user_id) values (p_user_id)
  on conflict (user_id) do nothing;

  select tz, last_active_date, current_streak_days, longest_streak, shields_available
    into v_tz, v_last, v_current, v_longest, v_shields
    from public.streaks
    where user_id = p_user_id;

  begin
    v_today := (now() at time zone v_tz)::date;
  exception when others then
    v_today := current_date; -- zona horaria inválida: se cae a UTC en vez de romper
  end;

  if v_last = v_today then
    return;
  elsif v_last = v_today - 1 then
    v_current := v_current + 1;
  elsif v_last = v_today - 2 and v_shields > 0 then
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
        last_active_date = v_today
    where user_id = p_user_id;

  if v_current >= 7 then perform public.grant_loot(p_user_id, 'streak_7'); end if;
  if v_current >= 30 then perform public.grant_loot(p_user_id, 'streak_30'); end if;
  if v_current >= 100 then perform public.grant_loot(p_user_id, 'streak_100'); end if;
end;
$$;
