import { sql } from '@vercel/postgres';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

export interface ServiceProvider {
  id: number;
  name: string;
  description: string;
  photos: string[];
  videos: string[];
  location?: string;
  age?: number;
  tags: string[];
  availability?: boolean;
  created_at: Date;
  updated_at: Date;
}

export async function createServiceProvidersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS service_providers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      photos TEXT[] DEFAULT '{}',
      videos TEXT[] DEFAULT '{}',
      location VARCHAR(255),
      age INTEGER,
      tags TEXT[] DEFAULT '{}',
      availability BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function getServiceProviders(): Promise<ServiceProvider[]> {
  const { rows } = await sql`
    SELECT * FROM service_providers 
    WHERE availability = true 
    ORDER BY created_at DESC
  `;
  return rows as ServiceProvider[];
}

export async function getServiceProviderById(id: number): Promise<ServiceProvider | null> {
  const { rows } = await sql`
    SELECT * FROM service_providers 
    WHERE id = ${id} AND availability = true
  `;
  return rows[0] as ServiceProvider || null;
}

export async function createServiceProvider(provider: Omit<ServiceProvider, 'id' | 'created_at' | 'updated_at'>): Promise<ServiceProvider> {
  const { rows } = await sql`
    INSERT INTO service_providers (
      name, description, photos, videos, location, age, tags, availability
    ) VALUES (
      ${provider.name}, ${provider.description}, ${provider.photos}, ${provider.videos},
      ${provider.location}, ${provider.age}, ${provider.tags}, ${provider.availability ?? true}
    )
    RETURNING *
  `;
  return rows[0] as ServiceProvider;
}

export async function updateServiceProvider(id: number, updates: Partial<ServiceProvider>): Promise<ServiceProvider | null> {
  const setClause = Object.keys(updates)
    .filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
    .map(key => `${key} = $${key}`)
    .join(', ');

  if (!setClause) return null;

  const { rows } = await sql`
    UPDATE service_providers 
    SET ${sql.raw(setClause)}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as ServiceProvider || null;
}

export async function deleteServiceProvider(id: number): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM service_providers WHERE id = ${id}
  `;
  return rowCount > 0;
}

// User management functions
export async function createUsersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function createUser(email: string, passwordHash: string, role: 'admin' | 'user' = 'user'): Promise<User> {
  const { rows } = await sql`
    INSERT INTO users (email, password_hash, role)
    VALUES (${email}, ${passwordHash}, ${role})
    RETURNING *
  `;
  return rows[0] as User;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  return rows[0] as User || null;
}

export async function getUserById(id: number): Promise<User | null> {
  const { rows } = await sql`
    SELECT * FROM users WHERE id = ${id}
  `;
  return rows[0] as User || null;
}
