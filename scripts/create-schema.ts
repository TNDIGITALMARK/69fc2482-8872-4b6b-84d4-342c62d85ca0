// Script to create all database tables for PredictStream

const TENANT_ID = '29XXK5csF8PVUShyAC755a86Md12';
const PROJECT_ID = '69fc2482-8872-4b6b-84d4-342c62d85ca0';

async function createPredictionsTable() {
  const sql = `
-- ============================================
-- Migration: Create predictions table
-- Purpose: Store prediction markets with voting data
-- ============================================

create table if not exists public.predictions (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,

  -- Prediction details
  title text not null,
  description text,
  category text not null,
  tags text[] default '{}',
  image_url text,

  -- Status and timing
  status text default 'active' check (status in ('active', 'pending', 'resolved', 'cancelled')),
  closes_at timestamptz not null,
  resolved_at timestamptz,
  resolution text check (resolution in ('yes', 'no', null)),

  -- Voting stats
  yes_votes integer default 0,
  no_votes integer default 0,
  participant_count integer default 0,

  -- Metadata
  created_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add foreign key constraints (required)
alter table public.predictions
  add constraint fk_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade;

alter table public.predictions
  add constraint fk_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade;

-- Enable RLS (required)
alter table public.predictions enable row level security;

-- RLS Policies (required - separate per operation)
create policy "anon_select_predictions"
  on public.predictions for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_select_predictions"
  on public.predictions for select to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_insert_predictions"
  on public.predictions for insert to authenticated
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_update_predictions"
  on public.predictions for update to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_delete_predictions"
  on public.predictions for delete to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

-- Add indexes for performance
create index if not exists idx_predictions_tenant_project
  on public.predictions(tenantid, projectid);
create index if not exists idx_predictions_status
  on public.predictions(status);
create index if not exists idx_predictions_category
  on public.predictions(category);
create index if not exists idx_predictions_participant_count
  on public.predictions(participant_count desc);
create index if not exists idx_predictions_closes_at
  on public.predictions(closes_at);

-- Add helpful comments
comment on table public.predictions is 'Prediction markets with tenant/project isolation';
comment on column public.predictions.tenantid is 'FK to tenants.id';
comment on column public.predictions.projectid is 'FK to projects.id';
`;

  const response = await fetch('http://localhost:3006/api/supabase/migrations/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'create_predictions_table',
      sql: sql,
      autoApply: true
    })
  });

  const result = await response.json();
  console.log('Predictions table:', result.success ? '✅ Created' : '❌ Failed');
  if (!result.success) {
    console.error('Error:', result.error);
    if (result.validation && !result.validation.passed) {
      console.error('Validation errors:', result.validation.errors);
    }
  }
  return result.success;
}

async function createUserProfilesTable() {
  const sql = `
-- ============================================
-- Migration: Create user_profiles table
-- Purpose: Store user profile data and stats
-- ============================================

create table if not exists public.user_profiles (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,

  -- Profile data
  username text not null unique,
  display_name text not null,
  avatar_url text,
  bio text,

  -- Stats
  total_predictions integer default 0,
  correct_predictions integer default 0,
  reputation_points integer default 0,
  current_streak integer default 0,
  best_streak integer default 0,

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add foreign key constraints
alter table public.user_profiles
  add constraint fk_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade,
  add constraint fk_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade;

-- Enable RLS
alter table public.user_profiles enable row level security;

-- RLS policies
create policy "anon_select_user_profiles"
  on public.user_profiles for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_select_user_profiles"
  on public.user_profiles for select to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_insert_user_profiles"
  on public.user_profiles for insert to authenticated
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_update_user_profiles"
  on public.user_profiles for update to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

-- Indexes
create index if not exists idx_user_profiles_tenant_project
  on public.user_profiles(tenantid, projectid);
create index if not exists idx_user_profiles_username
  on public.user_profiles(username);
create index if not exists idx_user_profiles_reputation
  on public.user_profiles(reputation_points desc);

-- Comments
comment on table public.user_profiles is 'User profiles with stats and reputation';
comment on column public.user_profiles.tenantid is 'FK to tenants.id';
comment on column public.user_profiles.projectid is 'FK to projects.id';
`;

  const response = await fetch('http://localhost:3006/api/supabase/migrations/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'create_user_profiles_table',
      sql: sql,
      autoApply: true
    })
  });

  const result = await response.json();
  console.log('User profiles table:', result.success ? '✅ Created' : '❌ Failed');
  if (!result.success) {
    console.error('Error:', result.error);
  }
  return result.success;
}

async function createUserPredictionsTable() {
  const sql = `
-- ============================================
-- Migration: Create user_predictions table
-- Purpose: Store user votes on predictions
-- ============================================

create table if not exists public.user_predictions (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,

  -- Relations
  user_id uuid not null,
  prediction_id uuid not null,

  -- Vote data
  choice text not null check (choice in ('yes', 'no')),
  confidence integer default 50 check (confidence >= 0 and confidence <= 100),
  stake_amount integer default 0,

  -- Results
  is_correct boolean,
  points_earned integer default 0,

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Unique constraint: one vote per user per prediction
  unique(user_id, prediction_id)
);

-- Add foreign key constraints
alter table public.user_predictions
  add constraint fk_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade,
  add constraint fk_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade,
  add constraint fk_user
    foreign key (user_id)
    references public.user_profiles(id)
    on delete cascade,
  add constraint fk_prediction
    foreign key (prediction_id)
    references public.predictions(id)
    on delete cascade;

-- Enable RLS
alter table public.user_predictions enable row level security;

-- RLS policies
create policy "anon_select_user_predictions"
  on public.user_predictions for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_select_user_predictions"
  on public.user_predictions for select to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_insert_user_predictions"
  on public.user_predictions for insert to authenticated
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_update_user_predictions"
  on public.user_predictions for update to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

-- Indexes
create index if not exists idx_user_predictions_tenant_project
  on public.user_predictions(tenantid, projectid);
create index if not exists idx_user_predictions_user
  on public.user_predictions(user_id);
create index if not exists idx_user_predictions_prediction
  on public.user_predictions(prediction_id);

-- Comments
comment on table public.user_predictions is 'User votes and predictions with tenant isolation';
comment on column public.user_predictions.tenantid is 'FK to tenants.id';
comment on column public.user_predictions.projectid is 'FK to projects.id';
`;

  const response = await fetch('http://localhost:3006/api/supabase/migrations/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'create_user_predictions_table',
      sql: sql,
      autoApply: true
    })
  });

  const result = await response.json();
  console.log('User predictions table:', result.success ? '✅ Created' : '❌ Failed');
  if (!result.success) {
    console.error('Error:', result.error);
  }
  return result.success;
}

async function createAchievementsTable() {
  const sql = `
-- ============================================
-- Migration: Create achievements table
-- Purpose: Store achievement definitions
-- ============================================

create table if not exists public.achievements (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,

  -- Achievement data
  name text not null,
  description text not null,
  badge_icon text not null,
  badge_color text not null,

  -- Requirements
  requirement_type text not null check (requirement_type in ('predictions_count', 'accuracy', 'streak', 'category_expert', 'reputation')),
  requirement_value integer not null,
  rarity text default 'common' check (rarity in ('common', 'rare', 'epic', 'legendary')),

  -- Metadata
  created_at timestamptz default now()
);

-- Add foreign key constraints
alter table public.achievements
  add constraint fk_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade,
  add constraint fk_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade;

-- Enable RLS
alter table public.achievements enable row level security;

-- RLS policies
create policy "anon_select_achievements"
  on public.achievements for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_all_achievements"
  on public.achievements for all to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  )
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

-- Indexes
create index if not exists idx_achievements_tenant_project
  on public.achievements(tenantid, projectid);
create index if not exists idx_achievements_rarity
  on public.achievements(rarity);

-- Comments
comment on table public.achievements is 'Achievement definitions with tenant/project isolation';
comment on column public.achievements.tenantid is 'FK to tenants.id';
comment on column public.achievements.projectid is 'FK to projects.id';
`;

  const response = await fetch('http://localhost:3006/api/supabase/migrations/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'create_achievements_table',
      sql: sql,
      autoApply: true
    })
  });

  const result = await response.json();
  console.log('Achievements table:', result.success ? '✅ Created' : '❌ Failed');
  if (!result.success) {
    console.error('Error:', result.error);
  }
  return result.success;
}

async function createUserAchievementsTable() {
  const sql = `
-- ============================================
-- Migration: Create user_achievements table
-- Purpose: Store unlocked achievements per user
-- ============================================

create table if not exists public.user_achievements (
  id uuid primary key default uuid_generate_v4(),
  tenantid text not null,
  projectid uuid not null,

  -- Relations
  user_id uuid not null,
  achievement_id uuid not null,

  -- Metadata
  unlocked_at timestamptz default now(),

  -- Unique constraint
  unique(user_id, achievement_id)
);

-- Add foreign key constraints
alter table public.user_achievements
  add constraint fk_tenant
    foreign key (tenantid)
    references public.tenants(id)
    on delete cascade,
  add constraint fk_project
    foreign key (projectid)
    references public.projects(id)
    on delete cascade,
  add constraint fk_user
    foreign key (user_id)
    references public.user_profiles(id)
    on delete cascade,
  add constraint fk_achievement
    foreign key (achievement_id)
    references public.achievements(id)
    on delete cascade;

-- Enable RLS
alter table public.user_achievements enable row level security;

-- RLS policies
create policy "anon_select_user_achievements"
  on public.user_achievements for select to anon
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

create policy "auth_all_user_achievements"
  on public.user_achievements for all to authenticated
  using (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  )
  with check (
    tenantid = (auth.jwt() ->> 'tenant_id')::text
    and projectid = (auth.jwt() ->> 'project_id')::uuid
  );

-- Indexes
create index if not exists idx_user_achievements_tenant_project
  on public.user_achievements(tenantid, projectid);
create index if not exists idx_user_achievements_user
  on public.user_achievements(user_id);
create index if not exists idx_user_achievements_achievement
  on public.user_achievements(achievement_id);

-- Comments
comment on table public.user_achievements is 'User unlocked achievements with tenant/project isolation';
comment on column public.user_achievements.tenantid is 'FK to tenants.id';
comment on column public.user_achievements.projectid is 'FK to projects.id';
`;

  const response = await fetch('http://localhost:3006/api/supabase/migrations/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'create_user_achievements_table',
      sql: sql,
      autoApply: true
    })
  });

  const result = await response.json();
  console.log('User achievements table:', result.success ? '✅ Created' : '❌ Failed');
  if (!result.success) {
    console.error('Error:', result.error);
  }
  return result.success;
}

async function main() {
  console.log('=== CREATING DATABASE SCHEMA ===\n');

  const results = [];
  results.push(await createPredictionsTable());
  results.push(await createUserProfilesTable());
  results.push(await createUserPredictionsTable());
  results.push(await createAchievementsTable());
  results.push(await createUserAchievementsTable());

  console.log('\n=== SUMMARY ===');
  const successCount = results.filter(r => r).length;
  console.log(`${successCount}/${results.length} tables created successfully`);

  if (successCount === results.length) {
    console.log('\n✅ All database tables created successfully!');
  } else {
    console.log('\n⚠️  Some tables failed to create. Check errors above.');
  }
}

main().catch(console.error);
