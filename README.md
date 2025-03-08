npx wrangler d1 export personal-data-db --output=./users_schema.sql --no-data

npx wrangler d1 execute personal-data-db --local --file=./lib/users_schema.sql
npx wrangler d1 execute personal-data-db --local --file=./lib/details_schema.sql

npx wrangler d1 migrations apply personal-data-db --local


=============================================================================
-- Insert an experience with achievements and technologies as JSON
INSERT INTO experiences (
    user_id, is_current, summary, title,
    start_month, start_year, end_month, end_year,
    company_name, company_location, company_industry,
    achievements, technologies
) VALUES (
    89899, 1, 'Full-stack developer working with Angular and Java. Working for the iShares platform',
    'Associate Software Developer', 11, 2017, 11, 2025,
    'BlackRock', 'London, UK', 'Financial Services',
    '["Improved application performance by 40% through optimization", "Led team of 3 developers in new feature development", "Implemented CI/CD pipeline reducing deployment time by 60%"]',
    '["Angular 12", "Java 11", "Spring Boot", "PostgreSQL", "AWS"]'
);
=============================================================================
INSERT INTO education (
    id,
    user_id,
    degree,
    field_of_study,
    percentage,
    cgpa,
    school_name,
    university,
    address,
    start_month,
    start_year,
    end_month,
    end_year
) VALUES (
    123,        -- Example education ID (replace with your desired ID, or NULL/omit if auto-increment)
    89899,      -- User ID (replace with the actual user_id)
    'Master of Science', -- Degree
    'Computer Science',  -- Field of Study
    85.5,       -- Percentage
    3.8,        -- CGPA
    'Example School Name', -- School Name
    'Example University Name', -- University (optional)
    '123 Example Address, City, Country', -- Address (optional)
    9,          -- Start Month (September)
    2010,       -- Start Year
    6,          -- End Month (June)
    2012        -- End Year
);
=============================================================================
INSERT INTO user_accomplishments (
    id,                 -- UUID (TEXT) - REQUIRED
    user_id,            -- INTEGER - REQUIRED
    type,               -- TEXT - REQUIRED, must be 'achievement'
    issuer,             -- TEXT - REQUIRED
    name,               -- TEXT - REQUIRED
    completed,          -- TEXT - OPTIONAL (NULL is acceptable)
    credential_id,      -- TEXT - OPTIONAL (NULL is acceptable)
    skills              -- JSON - OPTIONAL (can be NULL or empty JSON array '[]')
) VALUES (
    'uuid-for-achievement-1',  -- Replace with actual UUID
    89899,                      -- Replace with actual user_id
    'achievement',
    'Example Company',          -- Issuer of the achievement
    'Employee of the Month - Q3 2024', -- Name of the achievement
    NULL,                       -- completed - Not typically relevant for general achievements
    NULL,                       -- credential_id - Not typically relevant for general achievements
    '["Teamwork", "Leadership", "Performance"]' -- Example skills (JSON array of strings)
);
-----------------------------------------------------------------------------
INSERT INTO user_accomplishments (
    id,                 -- UUID (TEXT) - REQUIRED
    user_id,            -- INTEGER - REQUIRED
    type,               -- TEXT - REQUIRED, must be 'course'
    issuer,             -- TEXT - REQUIRED
    name,               -- TEXT - REQUIRED
    completed,          -- TEXT - REQUIRED (Date of completion)
    credential_id,      -- TEXT - OPTIONAL (NULL is acceptable for courses)
    skills              -- JSON - OPTIONAL (can be NULL or empty JSON array '[]')
) VALUES (
    'uuid-for-course-1',      -- Replace with actual UUID
    89899,                      -- Replace with actual user_id
    'course',
    'Coursera',                 -- Issuer of the course (platform or provider)
    'Deep Learning Specialization', -- Name of the course
    '2024-02-28',               -- completed - Completion date (YYYY-MM-DD or a format you prefer)
    NULL,                       -- credential_id - Often not provided for courses
    '["Deep Learning", "Machine Learning", "Python", "TensorFlow"]' -- Example skills (JSON array of strings)
);
-----------------------------------------------------------------------------
INSERT INTO user_accomplishments (
    id,                 -- UUID (TEXT) - REQUIRED
    user_id,            -- INTEGER - REQUIRED
    type,               -- TEXT - REQUIRED, must be 'skill'
    issuer,             -- TEXT - OPTIONAL (but recommended to provide context)
    name,               -- TEXT - REQUIRED (Name of the skill proficiency/achievement)
    completed,          -- TEXT - OPTIONAL (NULL is often acceptable for skills)
    credential_id,      -- TEXT - OPTIONAL (NULL is acceptable for skills)
    skills              -- JSON - REQUIRED (Must list the skills related to this accomplishment)
) VALUES (
    'uuid-for-skill-1',       -- Replace with actual UUID
    89899,                      -- Replace with actual user_id
    'skill',
    'Self-Assessment',        -- issuer - Context of the skill assessment (e.g., 'Self-Assessment', 'Project Experience', 'Team Lead Feedback') - OPTIONAL, but helpful
    'Proficient in Python Programming', -- name - Description of the skill proficiency
    NULL,                       -- completed - Not typically relevant for general skills
    NULL,                       -- credential_id - Not typically relevant for general skills
    '["Python", "Data Structures", "Algorithms", "Scripting"]' -- skills - JSON array of skills being claimed as proficient.
);
-----------------------------------------------------------------------------



=============================================================================

-- Example: Find user accomplishments of type 'skill' that mention "Angular" skill
SELECT *
FROM user_accomplishments
WHERE type = 'skill'
  AND json_extract(skills, '$') LIKE '%Angular%';

-- Example: Get all 'skill' type accomplishments for a user
SELECT *
FROM user_accomplishments
WHERE user_id = 89899
  AND type = 'skill';

-- Example: Count skill-type accomplishments for each issuer
SELECT issuer, COUNT(*) AS skill_achievement_count
FROM user_accomplishments
WHERE type = 'skill'
GROUP BY issuer;

