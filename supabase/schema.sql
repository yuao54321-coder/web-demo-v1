-- ============================================
-- 飞探 Flight Detective - Supabase Schema
-- 执行方式：Supabase Dashboard → SQL Editor → 粘贴 → Run
-- ============================================

-- 1. 用户档案（扩展 auth.users）
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text,
  avatar_url text,
  created_at timestamptz default now()
);

-- 2. 特价航班（公共数据）
create table if not exists flights (
  id bigint primary key,
  from_city text not null,
  to_city text not null,
  country text,
  price integer not null,
  tags jsonb default '[]'::jsonb,
  source text,
  source_type text,
  code text,
  remaining_time text,
  created_at timestamptz default now()
);

-- 3. 抢票日历（公共数据）
create table if not exists rush_deals (
  id bigint primary key,
  deal_date text not null,
  deal_type text,
  icon text,
  name text not null,
  deal_time text,
  description text,
  price text,
  condition text,
  reminder_price integer default 0,
  rush_price integer default 0,
  is_auto_rush boolean default false,
  created_at timestamptz default now()
);

-- 4. 用户行程
create table if not exists trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  destination text not null,
  departure_date date,
  total_price integer default 0,
  days integer default 0,
  status text default 'planning',
  created_at timestamptz default now()
);

-- 5. 行程分段
create table if not exists trip_segments (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  order_num integer not null,
  from_city text,
  to_city text,
  transport_type text,
  transport_number text,
  depart_time text,
  arrive_time text,
  price integer default 0,
  status text default 'pending'
);

-- 6. 代抢订单
create table if not exists rush_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  deal_id bigint references rush_deals(id),
  status text default 'watching',
  prepay_amount integer default 0,
  service_fee integer default 0,
  created_at timestamptz default now()
);

-- 7. 抢票提醒
create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  deal_id bigint references rush_deals(id),
  created_at timestamptz default now(),
  unique(user_id, deal_id)
);

-- ============================================
-- RLS（Row Level Security）
-- ============================================
alter table profiles enable row level security;
alter table flights enable row level security;
alter table rush_deals enable row level security;
alter table trips enable row level security;
alter table trip_segments enable row level security;
alter table rush_orders enable row level security;
alter table reminders enable row level security;

-- profiles: 自己能看/改自己的
drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
drop policy if exists "profiles_insert_own" on profiles;
create policy "profiles_insert_own" on profiles for insert with check (auth.uid() = id);
drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- flights / rush_deals: 所有人可读
drop policy if exists "flights_public_read" on flights;
create policy "flights_public_read" on flights for select using (true);
drop policy if exists "rush_deals_public_read" on rush_deals;
create policy "rush_deals_public_read" on rush_deals for select using (true);

-- trips: 只能操作自己的
drop policy if exists "trips_own" on trips;
create policy "trips_own" on trips for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- trip_segments: 通过 trip 判断归属
drop policy if exists "segments_own" on trip_segments;
create policy "segments_own" on trip_segments for all
  using (exists (select 1 from trips where trips.id = trip_segments.trip_id and trips.user_id = auth.uid()))
  with check (exists (select 1 from trips where trips.id = trip_segments.trip_id and trips.user_id = auth.uid()));

-- rush_orders / reminders: 只能操作自己的
drop policy if exists "rush_orders_own" on rush_orders;
create policy "rush_orders_own" on rush_orders for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "reminders_own" on reminders;
create policy "reminders_own" on reminders for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================
-- 新用户自动建 profile
-- ============================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, split_part(coalesce(new.email,''), '@', 1))
  on conflict (id) do nothing;
  return new;
exception when others then
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();
