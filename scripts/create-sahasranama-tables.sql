-- Create tables for Lalita Sahasranama verses

-- Sahasranama verses table
CREATE TABLE IF NOT EXISTS sahasranama_verses (
  id SERIAL PRIMARY KEY,
  verse_number INTEGER UNIQUE NOT NULL,
  sanskrit TEXT NOT NULL,
  transliteration TEXT NOT NULL,
  english TEXT NOT NULL,
  hindi TEXT NOT NULL,
  meaning TEXT NOT NULL,
  detailed_commentary TEXT,
  audio_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Names within verses junction table
CREATE TABLE IF NOT EXISTS verse_names (
  id SERIAL PRIMARY KEY,
  verse_id INTEGER REFERENCES sahasranama_verses(id) ON DELETE CASCADE,
  name_id INTEGER REFERENCES sacred_names(id) ON DELETE CASCADE,
  position_in_verse INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(verse_id, name_id)
);

-- User verse progress
CREATE TABLE IF NOT EXISTS user_verse_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  verse_id INTEGER REFERENCES sahasranama_verses(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  times_read INTEGER DEFAULT 0,
  last_read_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, verse_id)
);

-- User reading sessions
CREATE TABLE IF NOT EXISTS reading_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  session_end TIMESTAMP,
  verses_read INTEGER DEFAULT 0,
  total_time_minutes INTEGER DEFAULT 0,
  session_type VARCHAR(50) DEFAULT 'manual', -- 'manual', 'auto_scroll', 'audio'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookmarks for verses
CREATE TABLE IF NOT EXISTS verse_bookmarks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  verse_id INTEGER REFERENCES sahasranama_verses(id) ON DELETE CASCADE,
  bookmark_name VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, verse_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sahasranama_verses_number ON sahasranama_verses(verse_number);
CREATE INDEX IF NOT EXISTS idx_verse_names_verse_id ON verse_names(verse_id);
CREATE INDEX IF NOT EXISTS idx_verse_names_name_id ON verse_names(name_id);
CREATE INDEX IF NOT EXISTS idx_user_verse_progress_user_id ON user_verse_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_sessions_user_id ON reading_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_verse_bookmarks_user_id ON verse_bookmarks(user_id);
