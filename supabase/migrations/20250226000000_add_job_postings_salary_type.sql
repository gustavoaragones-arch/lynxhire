-- Run this in Supabase SQL Editor to add salary_type to job_postings.
-- Allows employers to specify annual vs hourly salary (default: annual).

ALTER TABLE job_postings ADD COLUMN IF NOT EXISTS salary_type text DEFAULT 'annual';
