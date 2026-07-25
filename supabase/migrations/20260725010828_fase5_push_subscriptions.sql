-- Fase 5: suscripciones a Web Push. La Edge Function que envía los push
-- (deployada aparte, ver supabase/functions/send-notifications) usa
-- service_role y por lo tanto no depende de estas políticas para leer,
-- pero igual se deja RLS activo para que el usuario gestione sus propias
-- suscripciones desde el cliente (alta al activar push, baja al desactivar).
create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

create index push_subscriptions_user_id_idx on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;

create policy "push_subscriptions_all_own_rows"
  on public.push_subscriptions for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
