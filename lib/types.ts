
export interface Experience {
  id: string; // UUID
  user_id: string;
  is_current: boolean;
  summary: string | null;
  title: string;
  start_month: number;
  start_year: number;
  end_month: number | null;
  end_year: number | null;
  company_name: string;
  company_location: string | null;
  company_industry: string | null;
  achievements: string[] ; // JSON Array of strings
  technologies: string[] ; // JSON Array of strings
  created_at: string; // TIMESTAMP
  updated_at: string; // TIMESTAMP
}

export interface Education {
  id: string; // UUID
  user_id: string;
  degree: string;
  field_of_study: string;
  percentage: number | null;
  cgpa: number | null;
  school_name: string;
  university: string;
  address: string;
  start_month: number | null;
  start_year: number;
  end_month: number | null;
  end_year: number | null;
  is_current: boolean
  created_at: string; // TIMESTAMP
  updated_at: string; // TIMESTAMP
}

// --- Base Interface for User Accomplishments ---
export interface UserAccomplishmentBase {
  id: string; // UUID
  user_id: string;
  type: 'achievement' | 'certification' | 'course' | 'skill'; // Still keep type discriminator for the table structure
  issuer?: string;
  name: string;
  skills: string[] | null; // JSON Array of strings
  created_at: string; // TIMESTAMP
}

// --- Interfaces for Specific Accomplishment Types ---

export interface Achievement extends UserAccomplishmentBase {
  type: 'achievement'; // Narrow down the type
  completed?: null;     // Not typically used for achievements
  credential_id?: null; // Not typically used for achievements
}

export interface Certification extends UserAccomplishmentBase {
  type: 'certification'; // Narrow down the type
  completed: string;      // Required for certifications
  credential_id?: string; // Optional, but recommended
}

export interface Course  {
  id: string; // UUID
  user_id: string;
  type: 'course'; // Still keep type discriminator for the table structure
  issuer?: string;
  name: string;
  skills: string[] | null; // JSON Array of strings
  created_at: string; // TIMESTAMP
  completed: string;      // Required for courses
}

export interface Skill extends UserAccomplishmentBase {
  type: 'skill'; // Narrow down the type
  skills: string[];      // Skills array is REQUIRED and NOT nullable for SkillAccomplishment
}

