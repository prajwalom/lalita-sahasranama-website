-- Create database schema for Lalita Sahasranama

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Names table for storing all 1000 names
CREATE TABLE IF NOT EXISTS sacred_names (
  id SERIAL PRIMARY KEY,
  number INTEGER UNIQUE NOT NULL,
  sanskrit TEXT NOT NULL,
  transliteration VARCHAR(255) NOT NULL,
  english TEXT NOT NULL,
  hindi TEXT NOT NULL,
  meaning TEXT NOT NULL,
  detailed_meaning TEXT,
  category VARCHAR(100),
  significance TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User favorites
CREATE TABLE IF NOT EXISTS user_favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name_id INTEGER REFERENCES sacred_names(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, name_id)
);

-- Daily verses
CREATE TABLE IF NOT EXISTS daily_verses (
  id SERIAL PRIMARY KEY,
  sanskrit TEXT NOT NULL,
  transliteration VARCHAR(255),
  english TEXT NOT NULL,
  hindi TEXT,
  meaning TEXT NOT NULL,
  date_for DATE UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User progress tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  names_studied INTEGER DEFAULT 0,
  last_studied_name INTEGER,
  streak_days INTEGER DEFAULT 0,
  last_visit_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sacred_names_number ON sacred_names(number);
CREATE INDEX IF NOT EXISTS idx_sacred_names_category ON sacred_names(category);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_verses_date ON daily_verses(date_for);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
