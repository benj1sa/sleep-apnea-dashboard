-- night_scores stores one AHI-equivalent score per user per night.
-- Written by the ML predict action after each morning's data pull.

create table if not exists night_scores (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  date        date not null,
  ahi_equivalent   numeric(6, 2) not null check (ahi_equivalent >= 0),
  confidence       numeric(4, 3) not null check (confidence between 0 and 1),
  data_quality     text not null check (data_quality in ('good', 'partial', 'poor')),
  cpap_used        boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (user_id, date)
);

-- Users can only read and insert their own rows.
alter table night_scores enable row level security;

create policy "Users can read own night scores"
  on night_scores for select
  using (auth.uid() = user_id);

create policy "Users can insert own night scores"
  on night_scores for insert
  with check (auth.uid() = user_id);

create policy "Users can update own night scores"
  on night_scores for update
  using (auth.uid() = user_id);

create policy "Users can delete own night scores"
  on night_scores for delete
  using (auth.uid() = user_id);

-- Index for fast per-user date-range queries (trend view, results screen).
create index night_scores_user_date_idx on night_scores (user_id, date desc);
