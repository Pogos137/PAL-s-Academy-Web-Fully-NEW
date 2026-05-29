-- PAL's Academy Supabase schema
-- Run this in the Supabase SQL editor after creating a fresh project.

create extension if not exists "uuid-ossp";

-- ============================================================
-- profiles: extends auth.users with portal access state
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'student' check (role in ('student','parent','tutor','admin')),
  portal_status text not null default 'pending' check (portal_status in ('pending','approved','rejected')),
  approved_at timestamptz,
  approved_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles read self" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles update self" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "profiles admin all" on public.profiles
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Auto-create profile row on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- leads: free-consult / booking captures
-- ============================================================
create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  student_grade text,
  subjects text[],
  goals text,
  source text default 'website',
  status text not null default 'new' check (status in ('new','contacted','booked','converted','closed')),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "leads insert public" on public.leads
  for insert with check (true);

create policy "leads admin read" on public.leads
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "leads admin write" on public.leads
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ============================================================
-- tutor_applications: careers/job applications
-- ============================================================
create table if not exists public.tutor_applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  location text,
  highest_education text,
  university text,
  program text,
  subjects text[] not null,
  grade_levels text[] not null,
  years_experience int,
  availability text,
  resume_url text,
  cover_letter text,
  linkedin text,
  status text not null default 'new' check (status in ('new','reviewing','interview','offer','hired','rejected')),
  created_at timestamptz not null default now()
);

alter table public.tutor_applications enable row level security;

create policy "tutor apps insert public" on public.tutor_applications
  for insert with check (true);

create policy "tutor apps admin all" on public.tutor_applications
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ============================================================
-- helpful indexes
-- ============================================================
create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_tutor_apps_created_at on public.tutor_applications (created_at desc);
create index if not exists idx_profiles_portal_status on public.profiles (portal_status);
