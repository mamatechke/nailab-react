/*
  # Add Onboarding Fields to Database

  1. Updates to user_profiles table
    - Add phone_number field
    - Add mentorship_approach (for mentors)
    - Add motivation (why they want to be a mentor)
    - Add advisory_experience (boolean for mentors)
    
  2. Updates to startup_profiles table
    - Add target_market field
    - Add value_proposition field
    - Add funding_stage field
    - Add funding_raised field
    - Add mentorship_areas (array of areas where founder needs help)
    - Add challenge_details (text describing specific challenges)
    - Add preferred_mentorship_mode field
    - Add phone_number field
    
  3. Security
    - Maintain existing RLS policies
*/

-- Add fields to user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN phone_number text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'mentorship_approach'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN mentorship_approach text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'motivation'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN motivation text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'advisory_experience'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN advisory_experience boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'preferred_mentorship_mode'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN preferred_mentorship_mode text;
  END IF;
END $$;

-- Add fields to startup_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startup_profiles' AND column_name = 'target_market'
  ) THEN
    ALTER TABLE startup_profiles ADD COLUMN target_market text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startup_profiles' AND column_name = 'value_proposition'
  ) THEN
    ALTER TABLE startup_profiles ADD COLUMN value_proposition text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startup_profiles' AND column_name = 'funding_stage'
  ) THEN
    ALTER TABLE startup_profiles ADD COLUMN funding_stage text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startup_profiles' AND column_name = 'funding_raised'
  ) THEN
    ALTER TABLE startup_profiles ADD COLUMN funding_raised numeric DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startup_profiles' AND column_name = 'mentorship_areas'
  ) THEN
    ALTER TABLE startup_profiles ADD COLUMN mentorship_areas text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startup_profiles' AND column_name = 'challenge_details'
  ) THEN
    ALTER TABLE startup_profiles ADD COLUMN challenge_details text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startup_profiles' AND column_name = 'preferred_mentorship_mode'
  ) THEN
    ALTER TABLE startup_profiles ADD COLUMN preferred_mentorship_mode text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'startup_profiles' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE startup_profiles ADD COLUMN phone_number text;
  END IF;
END $$;
