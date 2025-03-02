// db_query.ts
import { D1Database } from '@cloudflare/workers-types';
import { Experience, Education, Achievement, Certification, Course, Skill } from './types'; // Import interfaces

interface Env {
  DB: D1Database;
}

// --- Query Functions for experiences table ---

// 1. Get all experiences for a user
export async function getExperiencesByUserId(env: Env, userId: string): Promise<Experience[]> {
  const { results } = await env.DB.prepare(`
    SELECT * FROM experiences WHERE user_id = ? ORDER BY start_year DESC, start_month DESC
  `)
    .bind(userId)
    .all<Experience>();
  return (results || []) as Experience[]; // Ensure return type is Experience[]
}

// --- Query Functions for education table ---

// 4. Get all education records for a user
export async function getEducationByUserId(env: Env, userId: string): Promise<Education[]> {
  const { results } = await env.DB.prepare(`
    SELECT * FROM education WHERE user_id = ? ORDER BY start_year DESC, start_month DESC
  `)
    .bind(userId)
    .all<Education>();
  return (results || []) as Education[];
}

// --- Query Functions for user_accomplishments table ---
// 8. Get achievement accomplishments for a user
export async function getAchievementsByUserId(env: Env, userId: string): Promise<Achievement[]> {
  const type = 'achievement'
  const { results } = await env.DB.prepare(`
    SELECT * FROM user_accomplishments WHERE user_id = ? AND type = ? ORDER BY created_at DESC
  `)
    .bind(userId, type)
    .all<Achievement>();
  return (results || []) as Achievement[];
}

// 9. Get certification accomplishments for a user
export async function getCertificationsByUserId(env: Env, userId: string): Promise<Certification[]> {
  const type = 'certification'
  const { results } = await env.DB.prepare(`
    SELECT * FROM user_accomplishments WHERE user_id = ? AND type = ? ORDER BY created_at DESC
  `)
    .bind(userId, type)
    .all<Certification>();
  return (results || []) as Certification[];
}

// 10. Get course accomplishments for a user
export async function getCoursesByUserId(env: Env, userId: string): Promise<Course[]> {
  const type = 'course'
  const { results } = await env.DB.prepare(`
    SELECT * FROM user_accomplishments WHERE user_id = ? AND type = ? ORDER BY created_at DESC
  `)
    .bind(userId, type)
    .all<Course>();
  return (results || []) as Course[];
}

// 11. Get skill accomplishments for a user
export async function getSkillsByUserId(env: Env, userId: string): Promise<Skill[]> {
  const type = 'skill'
  const { results } = await env.DB.prepare(`
    SELECT * FROM user_accomplishments WHERE user_id = ? AND type = ? ORDER BY created_at DESC
  `)
    .bind(userId, type)
    .all<Skill>();
  return (results || []) as Skill[];
}
