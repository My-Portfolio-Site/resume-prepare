export const runtime = 'edge'
import { getRequestContext } from '@cloudflare/next-on-pages';
import { D1Database } from '@cloudflare/workers-types';

interface EnvWithDB {
  DB: D1Database;
}

let db: D1Database | null = null;

export async function getDatabase(): Promise<D1Database> {
  if (db) return db;

  try {
    const { env } = getRequestContext();
    const environment = env as unknown as EnvWithDB;
    
    if (!environment.DB) {
      throw new Error('Database connection not found in environment');
    }

    db = environment.DB;
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw new Error('Failed to initialize database connection');
  }
}