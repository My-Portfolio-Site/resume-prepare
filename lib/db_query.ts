// db_query.ts
export const runtime = 'edge'
import { D1Database } from '@cloudflare/workers-types';
import { User, Profile, Experience, Education, Achievement, Certification, Course, Skill } from './types'; // Import interfaces
import { getRequestContext } from '@cloudflare/next-on-pages'

// 1. Insert 'user'
export async function findUser(
  email: string
): Promise<User | null> {
  const {env} = getRequestContext()

  return await env.DB.prepare("SELECT * FROM users WHERE email = ?")
  .bind(email)
  .first();
}

// 2. Get Profile records for a user
export async function getProfileByUserId( userId: string): Promise<Profile | null> {
  const {env} = getRequestContext()
  
  return await env.DB.prepare(`SELECT * FROM profiles WHERE user_id = ?`)
    .bind(userId)
    .first();
}

// --- Query Functions for experiences table ---
// 1. Get all experiences for a user
export async function getExperiencesByUserI (userId: string): Promise<Experience[]> {
  const {env} = getRequestContext()

  const { results } = await env.DB.prepare(`
    SELECT * FROM experiences WHERE user_id = ? ORDER BY start_year DESC, start_month DESC
  `)
    .bind(userId)
    .all<Experience>();
  return (results || []) as Experience[]; // Ensure return type is Experience[]
}

// --- Query Functions for education table ---

// 4. Get all education records for a user
export async function getEducationByUserI (userId: string): Promise<Education[]> {
  const {env} = getRequestContext()

  const { results } = await env.DB.prepare(`
    SELECT * FROM educations WHERE user_id = ? ORDER BY start_year DESC, start_month DESC
  `)
    .bind(userId)
    .all<Education>();
  return (results || []) as Education[];
}

// --- Query Functions for user_accomplishments table ---
// 8. Get achievement accomplishments for a user
export async function getAchievementsByUserI (userId: string): Promise<Achievement[]> {
  const {env} = getRequestContext()

  const type = 'achievement'
  const { results } = await env.DB.prepare(`
    SELECT * FROM accomplishments WHERE user_id = ? AND type = ? ORDER BY created_at DESC
  `)
    .bind(userId, type)
    .all<Achievement>();
  return (results || []) as Achievement[];
}

// 9. Get certification accomplishments for a user
export async function getCertificationsByUserI (userId: string): Promise<Certification[]> {
  const {env} = getRequestContext()

  const type = 'certification'
  const { results } = await env.DB.prepare(`
    SELECT * FROM accomplishments WHERE user_id = ? AND type = ? ORDER BY created_at DESC
  `)
    .bind(userId, type)
    .all<Certification>();
  return (results || []) as Certification[];
}

// 10. Get course accomplishments for a user
export async function getCoursesByUserI (userId: string): Promise<Course[]> {
  const {env} = getRequestContext()

  const type = 'course'
  const { results } = await env.DB.prepare(`
    SELECT * FROM accomplishments WHERE user_id = ? AND type = ? ORDER BY created_at DESC
  `)
    .bind(userId, type)
    .all<Course>();
  return (results || []) as Course[];
}

// 11. Get skill accomplishments for a user
export async function getSkillsByUserI (userId: string): Promise<Skill[]> {
  const {env} = getRequestContext()

  const type = 'skill'
  const { results } = await env.DB.prepare(`
    SELECT * FROM accomplishments WHERE user_id = ? AND type = ? ORDER BY created_at DESC
  `)
    .bind(userId, type)
    .all<Skill>();
  return (results || []) as Skill[];
}
