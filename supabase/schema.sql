create extension if not exists pgcrypto;

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null check (form_type in ('free_trial', 'partner', 'workshop', 'stay_tuned')),
  payload jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists form_submissions_form_type_submitted_at_idx
  on public.form_submissions (form_type, submitted_at desc);

alter table public.form_submissions enable row level security;

drop policy if exists "Public can insert form submissions" on public.form_submissions;
create policy "Public can insert form submissions"
  on public.form_submissions
  for insert
  to anon, authenticated
  with check (form_type in ('free_trial', 'partner', 'workshop', 'stay_tuned'));

drop policy if exists "Public can read form submissions" on public.form_submissions;
create policy "Public can read form submissions"
  on public.form_submissions
  for select
  to anon, authenticated
  using (true);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.site_settings enable row level security;

grant select, insert, update on table public.site_settings to anon, authenticated;

drop policy if exists "Public can read site settings" on public.site_settings;
drop policy if exists "Public can insert site settings" on public.site_settings;
drop policy if exists "Public can update site settings" on public.site_settings;
drop policy if exists "Public can manage site settings" on public.site_settings;

create policy "Public can manage site settings"
  on public.site_settings
  for all
  to anon, authenticated
  using (true)
  with check (true);
