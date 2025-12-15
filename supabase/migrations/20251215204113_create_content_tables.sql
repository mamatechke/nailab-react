/*
  # Create Content Management Tables

  1. New Tables
    - `programs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Short summary
      - `content` (text) - Full article content
      - `cover_image_url` (text) - Cover image URL
      - `category` (text) - Program category
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `company` (text)
      - `content` (text) - Testimonial text
      - `image_url` (text) - Person's photo URL
      - `rating` (integer) - 1-5 rating
      - `created_at` (timestamptz)
    
    - `partners`
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo_url` (text)
      - `website_url` (text)
      - `display_order` (integer) - For sorting
      - `created_at` (timestamptz)
    
    - `hero_slides`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `image_url` (text)
      - `cta_text` (text) - Call to action button text
      - `cta_link` (text) - Call to action button link
      - `display_order` (integer)
      - `active` (boolean) - Whether slide is active
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (since this is public website content)
    - Only authenticated users with proper roles should be able to write
*/

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  cover_image_url text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view programs"
  ON programs FOR SELECT
  TO anon, authenticated
  USING (true);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view partners"
  ON partners FOR SELECT
  TO anon, authenticated
  USING (true);

-- Hero slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  image_url text NOT NULL,
  cta_text text DEFAULT 'Learn More',
  cta_link text DEFAULT '/programs',
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active hero slides"
  ON hero_slides FOR SELECT
  TO anon, authenticated
  USING (active = true);