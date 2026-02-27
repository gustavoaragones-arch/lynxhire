-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  type text not null check (type in ('candidate', 'employer')),
  email text not null,
  full_name text,
  avatar_url text,
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- COMPANIES (employer profiles)
-- ============================================
create table public.companies (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade unique not null,
  name text not null,
  slug text unique,
  logo_url text,
  website text,
  industry text,
  size text check (size in ('1-10','11-50','51-200','201-500','500+')),
  description text,
  culture text,
  city text,
  province text,
  is_verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- CANDIDATE PROFILES
-- ============================================
create table public.candidate_profiles (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade unique not null,
  phone text,
  city text,
  province text,
  work_authorization text check (work_authorization in ('citizen','permanent_resident','open_work_permit','employer_specific_permit','student_visa','other')),
  resume_url text,
  resume_filename text,
  skills text[] default '{}',
  years_experience int,
  education_level text,
  desired_salary_min int,
  desired_salary_max int,
  desired_work_type text[] default '{}', -- ['full-time','part-time','contract','remote']
  linkedin_url text,
  portfolio_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- JOB POSTINGS
-- ============================================
create table public.job_postings (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  slug text,
  description text,
  requirements text,
  nice_to_have text,
  skills_required text[] default '{}',
  work_type text check (work_type in ('full-time','part-time','contract','internship')),
  location_type text check (location_type in ('in-person','hybrid','remote')),
  city text,
  province text,
  salary_min int,
  salary_max int,
  experience_level text check (experience_level in ('entry','mid','senior','lead','executive')),
  industry text,
  status text default 'active' check (status in ('active','paused','expired','draft')),
  expires_at timestamptz default (now() + interval '60 days'),
  views_count int default 0,
  applications_count int default 0,
  ai_generated boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- APPLICATIONS
-- ============================================
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references public.job_postings(id) on delete cascade not null,
  candidate_id uuid references public.profiles(id) on delete cascade not null,
  resume_url text,
  cover_letter text,
  ai_match_score int check (ai_match_score between 0 and 100),
  status text default 'new' check (status in ('new','reviewed','interview','offer','rejected','withdrawn')),
  employer_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(job_id, candidate_id)
);

-- ============================================
-- SAVED JOBS
-- ============================================
create table public.saved_jobs (
  id uuid default uuid_generate_v4() primary key,
  candidate_id uuid references public.profiles(id) on delete cascade not null,
  job_id uuid references public.job_postings(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(candidate_id, job_id)
);

-- ============================================
-- MESSAGES
-- ============================================
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  recipient_id uuid references public.profiles(id) on delete cascade not null,
  job_id uuid references public.job_postings(id) on delete set null,
  application_id uuid references public.applications(id) on delete set null,
  content text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- SUBSCRIPTIONS
-- ============================================
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade unique not null,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  plan text default 'free' check (plan in ('free','starter','growth','candidate_premium')),
  status text default 'active' check (status in ('active','past_due','cancelled','trialing')),
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,
  title text not null,
  message text,
  link text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- UPDATED_AT TRIGGERS
-- ============================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on public.profiles for each row execute function update_updated_at();
create trigger update_companies_updated_at before update on public.companies for each row execute function update_updated_at();
create trigger update_candidates_updated_at before update on public.candidate_profiles for each row execute function update_updated_at();
create trigger update_jobs_updated_at before update on public.job_postings for each row execute function update_updated_at();
create trigger update_applications_updated_at before update on public.applications for each row execute function update_updated_at();
create trigger update_subscriptions_updated_at before update on public.subscriptions for each row execute function update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.candidate_profiles enable row level security;
alter table public.job_postings enable row level security;
alter table public.applications enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.messages enable row level security;
alter table public.subscriptions enable row level security;
alter table public.notifications enable row level security;

-- Profiles
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Companies (public read for active employers)
create policy "Anyone can view companies" on public.companies for select using (true);
create policy "Employers can insert own company" on public.companies for insert with check (auth.uid() = profile_id);
create policy "Employers can update own company" on public.companies for update using (auth.uid() = profile_id);

-- Candidate profiles (own access only)
create policy "Candidates can manage own profile" on public.candidate_profiles for all using (auth.uid() = profile_id);
create policy "Employers can view candidate profiles" on public.candidate_profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and type = 'employer')
);

-- Job postings (public read active, employers manage own)
create policy "Anyone can view active jobs" on public.job_postings for select using (status = 'active');
create policy "Employers can view own jobs" on public.job_postings for select using (auth.uid() = profile_id);
create policy "Employers can manage own jobs" on public.job_postings for all using (auth.uid() = profile_id);

-- Applications
create policy "Candidates can manage own applications" on public.applications for all using (auth.uid() = candidate_id);
create policy "Employers can view applications for their jobs" on public.applications for select using (
  exists (select 1 from public.job_postings where id = job_id and profile_id = auth.uid())
);
create policy "Employers can update application status" on public.applications for update using (
  exists (select 1 from public.job_postings where id = job_id and profile_id = auth.uid())
);

-- Saved jobs
create policy "Candidates can manage saved jobs" on public.saved_jobs for all using (auth.uid() = candidate_id);

-- Messages
create policy "Users can view own messages" on public.messages for select using (auth.uid() = sender_id or auth.uid() = recipient_id);
create policy "Users can send messages" on public.messages for insert with check (auth.uid() = sender_id);
create policy "Recipients can mark read" on public.messages for update using (auth.uid() = recipient_id);

-- Subscriptions
create policy "Users can view own subscription" on public.subscriptions for select using (auth.uid() = profile_id);

-- Notifications
create policy "Users can manage own notifications" on public.notifications for all using (auth.uid() = profile_id);

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, type)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'type', 'candidate')
  );

  -- Auto-create subscription record (free tier)
  insert into public.subscriptions (profile_id, plan, status)
  values (new.id, 'free', 'active');

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
