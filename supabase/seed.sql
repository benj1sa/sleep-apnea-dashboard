-- Seed: 14-night complete arc for the dev user.
-- Run after migrations in local dev: supabase db reset
-- Replace the user_id below with the UUID of your local dev user.

do $$
declare
  dev_user_id uuid;
begin
  -- Use the first confirmed user in local dev, or skip if none exists.
  select id into dev_user_id from auth.users limit 1;

  if dev_user_id is null then
    raise notice 'No users found — skipping night_scores seed.';
    return;
  end if;

  insert into night_scores (user_id, date, ahi_equivalent, confidence, data_quality, cpap_used)
  values
    (dev_user_id, current_date - 13, 14.2, 0.91, 'good',    false),
    (dev_user_id, current_date - 12,  8.1, 0.88, 'good',    false),
    (dev_user_id, current_date - 11, 19.5, 0.85, 'good',    false),
    (dev_user_id, current_date - 10, 11.3, 0.92, 'good',    false),
    (dev_user_id, current_date -  9, 16.7, 0.89, 'partial', false),
    (dev_user_id, current_date -  8,  9.4, 0.94, 'good',    true),
    (dev_user_id, current_date -  7, 12.8, 0.87, 'good',    true),
    (dev_user_id, current_date -  6, 17.1, 0.83, 'good',    false),
    (dev_user_id, current_date -  5,  7.6, 0.95, 'good',    true),
    (dev_user_id, current_date -  4, 13.9, 0.90, 'good',    false),
    (dev_user_id, current_date -  3, 10.2, 0.91, 'good',    false),
    (dev_user_id, current_date -  2, 15.4, 0.86, 'partial', false),
    (dev_user_id, current_date -  1,  8.8, 0.93, 'good',    true),
    (dev_user_id, current_date,      11.6, 0.89, 'good',    false)
  on conflict (user_id, date) do nothing;
end;
$$;
