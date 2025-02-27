-- Companies table
CREATE TABLE companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    industry VARCHAR(255)
);

-- Experiences table
CREATE TABLE experiences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    is_current BOOLEAN DEFAULT FALSE,
    start_date_month INTEGER CHECK (start_date_month BETWEEN 1 AND 12),
    start_date_year INTEGER NOT NULL,
    end_date_month INTEGER CHECK (end_date_month BETWEEN 1 AND 12),
    end_date_year INTEGER,
    company_id INTEGER NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- Technologies table
CREATE TABLE technologies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Experience-Technology mapping table
CREATE TABLE experience_technologies (
    experience_id INTEGER,
    technology_id INTEGER,
    PRIMARY KEY (experience_id, technology_id),
    FOREIGN KEY (experience_id) REFERENCES experiences(id),
    FOREIGN KEY (technology_id) REFERENCES technologies(id)
);

-- Achievements table (for both career and certifications)
CREATE TABLE achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    experience_id INTEGER,
    issuer VARCHAR(255),
    name VARCHAR(255),
    FOREIGN KEY (experience_id) REFERENCES experiences(id)
);

-- Education table
CREATE TABLE education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    school_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255) NOT NULL,
    notes TEXT,
    start_date_year INTEGER NOT NULL,
    end_date_year INTEGER,
    grade VARCHAR(100)
);

-- Skills table
CREATE TABLE skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Create indexes for better query performance
CREATE INDEX idx_experiences_company ON experiences(company_id);
CREATE INDEX idx_experiences_current ON experiences(is_current);
CREATE INDEX idx_experience_technologies_exp ON experience_technologies(experience_id);
CREATE INDEX idx_experience_technologies_tech ON experience_technologies(technology_id);
CREATE INDEX idx_achievements_experience ON achievements(experience_id);
CREATE INDEX idx_education_school ON education(school_name);