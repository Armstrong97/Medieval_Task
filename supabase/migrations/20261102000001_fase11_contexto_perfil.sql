-- Fase 11: contexto del usuario para el asistente IA («Sobre mí»).
-- Texto libre que se envía en cada petición; límite de 1000 caracteres. Idempotente.

alter table public.ai_settings
  add column if not exists profile_context text not null default ''
  constraint ai_settings_profile_context_len check (char_length(profile_context) <= 1000);
