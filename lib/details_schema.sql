CREATE TABLE experiences (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  is_current BOOLEAN NOT NULL,
  summary TEXT,
  title TEXT NOT NULL,
  start_month INTEGER NOT NULL,
  start_year INTEGER NOT NULL,
  end_month INTEGER,
  end_year INTEGER,
  company_name TEXT NOT NULL,
  company_location TEXT,
  company_industry TEXT,
  achievements JSON,  -- Store achievements as a JSON array
  technologies JSON, -- Store technologies as a JSON array
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX idx_experiences_user_id ON experiences(user_id);



CREATE TABLE accomplishments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('achievement', 'certification', 'course', 'skill')), -- Type discriminator now includes 'skill'
  issuer TEXT,
  name TEXT,
  completed TEXT,      -- Applicable for certifications and courses
  credential_id TEXT, -- Applicable for certifications
  skills JSON,         -- Store skills as a JSON array (still relevant)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX idx_accomplishments_user_id ON accomplishments(user_id);



-- User education table
CREATE TABLE educations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  is_current BOOLEAN NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  percentage REAL,
  cgpa REAL,
  school_name TEXT NOT NULL,
  university TEXT NOT NULL,
  address TEXT,
  start_month INTEGER NOT NULL,
  start_year INTEGER NOT NULL,
  end_month INTEGER,
  end_year INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX idx_educations_user_id ON educations(user_id);



CREATE TABLE profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    headline TEXT,       -- Professional headline/title
    summary TEXT,        -- Professional summary/bio
    about_me TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    country TEXT,
    postal_code TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    languages JSON,      -- Store language proficiencies as JSON array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);