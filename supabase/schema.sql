-- BTC PM Roadmap — schema
-- Run this once against a new Supabase project (SQL Editor, or `supabase db push`),
-- then run seed.sql to load the static task list. After that, set
-- NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY and the app switches
-- from localStorage to this backend automatically (lib/progress/index.ts).
--
-- Auth model: the app uses Supabase anonymous sign-in (no login screen), so
-- profiles.id is always an auth.uid() — anonymous today, upgradeable to a
-- real account later without changing this schema.

create extension if not exists pgcrypto;

-- One row per person tracking progress.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  avatar_emoji text not null default '🧑‍💻',
  created_at timestamptz not null default now()
);

-- Static reference of every checklist item in the roadmap. Kept in sync by
-- hand with lib/roadmap-data.ts — ids there must match ids here.
create table if not exists public.roadmap_tasks (
  id text primary key,
  week_number int not null check (week_number between 1 and 6),
  title text not null,
  sort_order int not null,
  points int not null default 10
);

-- Which tasks a profile has checked off.
create table if not exists public.task_completions (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  task_id text not null references public.roadmap_tasks (id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (profile_id, task_id)
);

-- Per-profile rollup — what the progress bars and leaderboard read from.
create or replace view public.profile_progress as
select
  p.id as profile_id,
  p.name,
  p.avatar_emoji,
  count(tc.task_id) as tasks_completed,
  (select count(*) from public.roadmap_tasks) as tasks_total,
  coalesce(sum(rt.points), 0) as points_earned
from public.profiles p
left join public.task_completions tc on tc.profile_id = p.id
left join public.roadmap_tasks rt on rt.id = tc.task_id
group by p.id, p.name, p.avatar_emoji;

alter table public.profiles enable row level security;
alter table public.roadmap_tasks enable row level security;
alter table public.task_completions enable row level security;

-- Progress is shown on a shared leaderboard, so profiles and completions are
-- world-readable; writes are restricted to the owning auth user.
create policy "profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "users insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);
create policy "users update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "tasks are viewable by everyone" on public.roadmap_tasks
  for select using (true);

create policy "completions are viewable by everyone" on public.task_completions
  for select using (true);
create policy "users manage their own completions" on public.task_completions
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
