
// db.ts
import { D1Database } from '@cloudflare/workers-types'; // Import D1 types if using Cloudflare Workers
import { nanoid } from 'nanoid'


interface Env {
  DB: D1Database; // Define environment variable for D1 database (adjust name if needed)
}

// Helper function to generate UUID (if not using a library in your environment)
function generateUUID(): string {
  return nanoid();
}

// 1. Insert 'achievement' type accomplishment
export async function insertAchievement(
  env: Env,
  userId: number,
  issuer: string,
  name: string,
  skills?: string[] | null // Skills as optional array of strings
): Promise<D1Result<any>> {
  const id = generateUUID();
  const skillsJSON = skills ? JSON.stringify(skills) : null; // Convert skills array to JSON string

  return await env.DB.prepare(`
    INSERT INTO user_accomplishments (
      id,
      user_id,
      type,
      issuer,
      name,
      skills
    ) VALUES (?, ?, ?, ?, ?, ?)
  `)
    .bind(id, userId, 'achievement', issuer, name, skillsJSON)
    .run();
}

// 2. Insert 'certification' type accomplishment
export async function insertCertification(
  env: Env,
  userId: number,
  issuer: string,
  name: string,
  completed: string, // Date string (e.g., 'YYYY-MM-DD')
  credentialId?: string | null,
  skills?: string[] | null // Skills as optional array of strings
): Promise<D1Result<any>> {
  const id = generateUUID();
  const skillsJSON = skills ? JSON.stringify(skills) : null;

  return await env.DB.prepare(`
    INSERT INTO user_accomplishments (
      id,
      user_id,
      type,
      issuer,
      name,
      completed,
      credential_id,
      skills
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
    .bind(id, userId, 'certification', issuer, name, completed, credentialId, skillsJSON)
    .run();
}

// 3. Insert 'course' type accomplishment
export async function insertCourse(
  env: Env,
  userId: number,
  issuer: string,
  name: string,
  completed: string, // Date string (e.g., 'YYYY-MM-DD')
  skills?: string[] | null // Skills as optional array of strings
): Promise<D1Result<any>> {
  const id = generateUUID();
  const skillsJSON = skills ? JSON.stringify(skills) : null;

  return await env.DB.prepare(`
    INSERT INTO user_accomplishments (
      id,
      user_id,
      type,
      issuer,
      name,
      completed,
      skills
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
    .bind(id, userId, 'course', issuer, name, completed, skillsJSON)
    .run();
}

// 4. Insert 'skill' type accomplishment
export async function insertSkillAccomplishment( // Renamed to avoid confusion with 'skills' table
  env: Env,
  userId: number,
  name: string, // Name of the skill proficiency/achievement
  skills: string[], // Skills array - REQUIRED for 'skill' type
  issuer?: string | null // Optional issuer for context
): Promise<D1Result<any>> {
  const id = generateUUID();
  const skillsJSON = JSON.stringify(skills); // Skills are REQUIRED for 'skill' type

  return await env.DB.prepare(`
    INSERT INTO user_accomplishments (
      id,
      user_id,
      type,
      issuer,
      name,
      skills
    ) VALUES (?, ?, ?, ?, ?, ?)
  `)
    .bind(id, userId, 'skill', issuer, name, skillsJSON)
    .run();
}


// 5. Insert into 'experiences' table
export async function insertExperience(
  env: Env,
  userId: number,
  isCurrent: boolean,
  title: string,
  companyName: string,
  startMonth: number,
  startYear: number,
  summary?: string | null,
  endMonth?: number | null,
  endYear?: number | null,
  companyLocation?: string | null,
  companyIndustry?: string | null,
  achievements?: string[] | null, // Achievements as optional array of strings
  technologies?: string[] | null // Technologies as optional array of strings
): Promise<D1Result<any>> {
  const id = generateUUID();
  const achievementsJSON = achievements ? JSON.stringify(achievements) : null;
  const technologiesJSON = technologies ? JSON.stringify(technologies) : null;

  return await env.DB.prepare(`
    INSERT INTO experiences (
      id,
      user_id,
      is_current,
      summary,
      title,
      start_month,
      start_year,
      end_month,
      end_year,
      company_name,
      company_location,
      company_industry,
      achievements,
      technologies
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
    .bind(
      id,
      userId,
      isCurrent,
      summary,
      title,
      startMonth,
      startYear,
      endMonth,
      endYear,
      companyName,
      companyLocation,
      companyIndustry,
      achievementsJSON,
      technologiesJSON
    )
    .run();
}


// --- Insert Functions for education table ---

// 6. Insert into 'education' table
export async function insertEducation(
  env: Env,
  userId: number,
  degree: string,
  schoolName: string,
  startYear: number,
  fieldOfStudy?: string | null,
  percentage?: number | null,
  cgpa?: number | null,
  university?: string | null,
  address?: string | null,
  startMonth?: number | null,
  endMonth?: number | null,
  endYear?: number | null
): Promise<D1Result<any>> {
  const id = generateUUID();

  return await env.DB.prepare(`
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
    .bind(
      id,
      userId,
      degree,
      fieldOfStudy,
      percentage,
      cgpa,
      schoolName,
      university,
      address,
      startMonth,
      startYear,
      endMonth,
      endYear
    )
    .run();
}

