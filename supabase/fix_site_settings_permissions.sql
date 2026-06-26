-- Run this in the Supabase SQL editor if dashboard settings save fails.
-- Fixes missing table grants and RLS policies for site_settings.

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
