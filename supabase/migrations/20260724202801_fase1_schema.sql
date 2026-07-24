-- Fase 1: categories, projects, kanban_columns, tasks
-- Gamification (class_ranks, user_category_xp, quests, streaks, loot),
-- follow_ups y notifications quedan para fases posteriores del roadmap.

-- ============================================================
-- categories
-- Tabla de referencia fija (seed), compartida por todos los usuarios.
-- No lleva user_id: es de solo lectura para cualquier usuario autenticado.
-- "order" es palabra reservada en SQL, se usa "position" en su lugar.
-- ============================================================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color_hex text not null,
  icon_name text not null,
  class_name text not null,
  position integer not null,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "categories_select_authenticated"
  on public.categories for select
  to authenticated
  using (true);

insert into public.categories (name, color_hex, icon_name, class_name, position) values
  ('Concentrix', '#7c3aed', 'brain',      'Nigromante', 1),
  ('Delorean',   '#ea580c', 'car',        'Bárbaro',    2),
  ('Estudios',   '#2563eb', 'book-open',  'Mago',       3),
  ('Hobbies',    '#db2777', 'gamepad-2',  'Pícaro',     4),
  ('Personal',   '#059669', 'heart',      'Clérigo',    5),
  ('Hogar',      '#b45309', 'home',       'Druida',     6);

-- ============================================================
-- projects
-- ============================================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete restrict,
  name text not null,
  description text,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now()
);

create index projects_user_id_idx on public.projects (user_id);

alter table public.projects enable row level security;

create policy "projects_all_own_rows"
  on public.projects for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- kanban_columns
-- project_id nulo = columnas del tablero global "Tareas sueltas" del usuario.
-- ============================================================
create table public.kanban_columns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete cascade,
  name text not null,
  position integer not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index kanban_columns_user_id_idx on public.kanban_columns (user_id);
create index kanban_columns_project_id_idx on public.kanban_columns (project_id);

alter table public.kanban_columns enable row level security;

create policy "kanban_columns_all_own_rows"
  on public.kanban_columns for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- tasks
-- Regla de deadline: obligatorio salvo que sea un item de inbox sin triar
-- (parent_task_id null y kanban_column_id null). Las subtareas siempre
-- requieren deadline. Misma lógica para category_id, salvo que las
-- subtareas quedan exentas (heredan la categoría de la tarea padre).
-- ============================================================
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  parent_task_id uuid references public.tasks (id) on delete cascade,
  kanban_column_id uuid references public.kanban_columns (id) on delete set null,
  category_id uuid references public.categories (id) on delete set null,
  title text not null,
  description text,
  deadline timestamptz,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'done')),
  created_at timestamptz not null default now(),
  completed_at timestamptz,

  constraint deadline_required_once_triaged check (
    deadline is not null or (parent_task_id is null and kanban_column_id is null)
  ),
  constraint category_required_once_triaged check (
    category_id is not null or parent_task_id is not null or kanban_column_id is null
  )
);

create index tasks_user_id_idx on public.tasks (user_id);
create index tasks_project_id_idx on public.tasks (project_id);
create index tasks_kanban_column_id_idx on public.tasks (kanban_column_id);
create index tasks_parent_task_id_idx on public.tasks (parent_task_id);
create index tasks_deadline_idx on public.tasks (deadline);

alter table public.tasks enable row level security;

create policy "tasks_all_own_rows"
  on public.tasks for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- Triggers
-- ============================================================

-- Seed de columnas default del tablero global "Tareas sueltas" para cada
-- usuario nuevo.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.kanban_columns (user_id, project_id, name, position, is_default)
  values
    (new.id, null, 'Por hacer', 1, true),
    (new.id, null, 'En progreso', 2, true),
    (new.id, null, 'Hecho', 3, true);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seed de columnas default para cada proyecto nuevo.
create function public.handle_new_project()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  insert into public.kanban_columns (user_id, project_id, name, position, is_default)
  values
    (new.user_id, new.id, 'Por hacer', 1, true),
    (new.user_id, new.id, 'En progreso', 2, true),
    (new.user_id, new.id, 'Hecho', 3, true);
  return new;
end;
$$;

create trigger on_project_created
  after insert on public.projects
  for each row execute function public.handle_new_project();

-- Validación cruzada de deadlines padre/subtarea (padre >= última subtarea)
-- y bookkeeping de completed_at según status.
create function public.tasks_before_write()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.parent_task_id is not null and new.deadline is not null then
    if exists (
      select 1 from public.tasks
      where id = new.parent_task_id
        and deadline is not null
        and deadline < new.deadline
    ) then
      raise exception 'El deadline de la subtarea no puede ser posterior al de la tarea padre';
    end if;
  end if;

  if tg_op = 'UPDATE' and new.deadline is not null
     and new.deadline is distinct from old.deadline then
    if exists (
      select 1 from public.tasks
      where parent_task_id = new.id
        and deadline is not null
        and deadline > new.deadline
    ) then
      raise exception 'El deadline de la tarea no puede ser anterior al de alguna de sus subtareas';
    end if;
  end if;

  if new.status = 'done' and (tg_op = 'INSERT' or old.status is distinct from 'done') then
    new.completed_at := now();
  elsif new.status <> 'done' then
    new.completed_at := null;
  end if;

  return new;
end;
$$;

create trigger tasks_before_write
  before insert or update on public.tasks
  for each row execute function public.tasks_before_write();
