
// db.ts
import { D1Database } from '@cloudflare/workers-types'; // Import D1 types if using Cloudflare Workers
import { nanoid } from 'nanoid'

// Helper function to generate UUID (if not using a library in your D1Databaseironment)
export function generateUUID(): string {
  return nanoid();
}

// 1. Insert 'user'
export async function createUser(
  db: D1Database,
  name: string,
  email: string,
  image: string
): Promise<D1Result<any>> {
  const id = generateUUID();

  return await db.prepare(`
    INSERT INTO users (
      id,
      name,
      email,
      image
    ) VALUES (?, ?, ?, ?)
  `)
    .bind(id, name, email, image)
    .run();
}

// 2. Update 'user'
export async function updateUser(
  db: D1Database,
  name: string,
  email: string,
  image: string
): Promise<D1Result<any>> {

  return await db.prepare("UPDATE users SET name = ?, image = ? WHERE email = ?")
    .bind(name, image, email)
    .run();
}


// 3. Insert 'achievement' type accomplishment
export async function insertAchievement(
  db: D1Database,
  userId: number,
  issuer: string,
  name: string,
  skills?: string[] | null // Skills as optional array of strings
): Promise<D1Result<any>> {
  const id = generateUUID();
  const skillsJSON = skills ? JSON.stringify(skills) : null; // Convert skills array to JSON string

  return await db.prepare(`
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
  db: D1Database,
  userId: number,
  issuer: string,
  name: string,
  completed: string, // Date string (e.g., 'YYYY-MM-DD')
  credentialId?: string | null,
  skills?: string[] | null // Skills as optional array of strings
): Promise<D1Result<any>> {
  const id = generateUUID();
  const skillsJSON = skills ? JSON.stringify(skills) : null;

  return await db.prepare(`
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
  db: D1Database,
  userId: number,
  issuer: string,
  name: string,
  completed: string, // Date string (e.g., 'YYYY-MM-DD')
  skills?: string[] | null // Skills as optional array of strings
): Promise<D1Result<any>> {
  const id = generateUUID();
  const skillsJSON = skills ? JSON.stringify(skills) : null;

  return await db.prepare(`
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
  db: D1Database,
  userId: number,
  name: string, // Name of the skill proficiency/achievement
  skills: string[], // Skills array - REQUIRED for 'skill' type
  issuer?: string | null // Optional issuer for context
): Promise<D1Result<any>> {
  const id = generateUUID();
  const skillsJSON = JSON.stringify(skills); // Skills are REQUIRED for 'skill' type

  return await db.prepare(`
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
  db: D1Database,
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

  return await db.prepare(`
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
  db: D1Database,
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

  return await db.prepare(`
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

