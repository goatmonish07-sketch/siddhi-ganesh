-- Sri Siddhi Ganesh Mobiles — initial schema
-- Catalog tables are publicly readable; customer requests are only reachable
-- through the server (service role key), never directly from the browser.

create table brands (
  slug text primary key,
  name text not null,
  sort int not null default 0
);

create table models (
  id bigint generated always as identity primary key,
  brand_slug text not null references brands(slug) on update cascade,
  slug text not null,
  name text not null,
  year int not null,
  tier text not null check (tier in ('budget', 'mid', 'flagship', 'premium')),
  is_active boolean not null default true,
  unique (brand_slug, slug)
);

create table variants (
  id bigint generated always as identity primary key,
  model_id bigint not null references models(id) on delete cascade,
  label text not null,
  base_price int not null check (base_price >= 0), -- max buyback for a flawless unit
  sort int not null default 0
);

create table condition_questions (
  key text primary key,
  title text not null,
  subtitle text not null default '',
  badge text,
  kind text not null check (kind in ('single', 'multi')),
  sort int not null default 0
);

create table condition_options (
  id bigint generated always as identity primary key,
  question_key text not null references condition_questions(key) on delete cascade,
  key text not null,
  label text not null,
  hint text,
  icon text,
  pct numeric(6, 4),        -- e.g. -0.0300 = -3% of base price
  multiplier numeric(6, 4), -- e.g. 0.4000 for a dead phone
  sort int not null default 0,
  unique (question_key, key)
);

create table repair_services (
  key text primary key,
  name text not null,
  description text not null default '',
  icon text not null default 'build',
  badge text not null default '',
  warranty_days int not null default 0,
  minutes int not null default 60,
  -- starting price per phone tier; null = price after inspection
  price_budget int,
  price_mid int,
  price_flagship int,
  price_premium int,
  sort int not null default 0
);

create table products (
  id text primary key,
  brand_slug text not null references brands(slug) on update cascade,
  name text not null,
  variant text not null,
  color text not null default '',
  grade text not null check (grade in ('superb', 'good', 'fair')),
  battery_health int not null check (battery_health between 0 and 100),
  price int not null,
  mrp int not null,
  warranty_months int not null default 6,
  highlights text[] not null default '{}',
  description text not null default '',
  in_box text[] not null default '{}',
  image_url text,
  tint text not null default '#163a24',
  status text not null default 'available' check (status in ('available', 'reserved', 'sold')),
  created_at timestamptz not null default now()
);

create table requests (
  id text primary key,                 -- e.g. SSG-SELL-4K2QZ
  kind text not null check (kind in ('sell', 'repair', 'buy')),
  status text not null default 'new',  -- new → confirmed → in_progress → completed / cancelled
  name text not null,
  phone text not null,
  amount int,                          -- quote / estimate / price
  summary text not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index requests_phone_idx on requests (phone);
create index requests_created_idx on requests (created_at desc);

-- Row level security
alter table brands enable row level security;
alter table models enable row level security;
alter table variants enable row level security;
alter table condition_questions enable row level security;
alter table condition_options enable row level security;
alter table repair_services enable row level security;
alter table products enable row level security;
alter table requests enable row level security;

create policy "public read" on brands for select using (true);
create policy "public read" on models for select using (true);
create policy "public read" on variants for select using (true);
create policy "public read" on condition_questions for select using (true);
create policy "public read" on condition_options for select using (true);
create policy "public read" on repair_services for select using (true);
create policy "public read" on products for select using (true);
-- no policies on requests: only the service role (server) can read/write them

-- Storage bucket for phone photos (set products.image_url to the public URL)
insert into storage.buckets (id, name, public) values ('phones', 'phones', true)
on conflict (id) do nothing;
