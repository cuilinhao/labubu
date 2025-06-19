-- Create items table
create table public.items (
  id            uuid primary key default gen_random_uuid(),
  title         text        not null,
  description_md text       not null,
  cover_url     text        not null,
  pan_link      text        not null,
  click_count   int         default 0,
  created_at    timestamptz default now()
);

-- Create profiles table for admin users
create table public.profiles (
  id uuid primary key,
  email text,
  is_admin boolean default false
);

-- Enable Row Level Security
alter table public.items enable row level security;
alter table public.profiles enable row level security;

-- Create policies
create policy "public read items" on public.items
  for select using (true);

create policy "admin write items" on public.items
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- Create storage bucket for wallpaper covers
insert into storage.buckets (id, name, public) values ('wallpaper-covers', 'wallpaper-covers', true);

-- Create storage policy
create policy "public read wallpaper covers" on storage.objects
  for select using (bucket_id = 'wallpaper-covers');

create policy "admin upload wallpaper covers" on storage.objects
  for insert with check (
    bucket_id = 'wallpaper-covers' and
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );
