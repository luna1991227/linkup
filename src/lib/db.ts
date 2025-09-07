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
  sequence?: number;
  created_at: Date;
  updated_at: Date;
}

export async function createServiceProvidersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS service_providers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      photos TEXT DEFAULT '[]',
      videos TEXT DEFAULT '[]',
      location VARCHAR(255),
      age INTEGER,
      tags TEXT DEFAULT '[]',
      availability BOOLEAN DEFAULT true,
      sequence INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function getServiceProviders(): Promise<ServiceProvider[]> {
  const { rows } = await sql`
    SELECT * FROM service_providers 
    WHERE availability = true 
    ORDER BY sequence ASC, created_at DESC
  `;

  // Parse JSON arrays back to JavaScript arrays
  return rows.map((row: any) => ({
    ...row,
    photos: typeof row.photos === 'string' ? JSON.parse(row.photos) : row.photos,
    videos: typeof row.videos === 'string' ? JSON.parse(row.videos) : row.videos,
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
  })) as ServiceProvider[];
}

export async function getServiceProviderById(id: number): Promise<ServiceProvider | null> {
  const { rows } = await sql`
    SELECT * FROM service_providers 
    WHERE id = ${id} AND availability = true
  `;

  const result = rows[0] as any;
  if (!result) return null;

  // Parse JSON arrays back to JavaScript arrays
  return {
    ...result,
    photos: typeof result.photos === 'string' ? JSON.parse(result.photos) : result.photos,
    videos: typeof result.videos === 'string' ? JSON.parse(result.videos) : result.videos,
    tags: typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags,
  } as ServiceProvider;
}

export async function createServiceProvider(provider: Omit<ServiceProvider, 'id' | 'created_at' | 'updated_at'>): Promise<ServiceProvider> {
  const { rows } = await sql`
    INSERT INTO service_providers (
      name, description, photos, videos, location, age, tags, availability
    ) VALUES (
      ${provider.name}, 
      ${provider.description}, 
      ${JSON.stringify(provider.photos || [])}, 
      ${JSON.stringify(provider.videos || [])},
      ${provider.location}, 
      ${provider.age}, 
      ${JSON.stringify(provider.tags || [])}, 
      ${provider.availability ?? true}
    )
    RETURNING *
  `;

  // Parse JSON arrays back to JavaScript arrays
  const result = rows[0] as any;
  if (result) {
    result.photos = typeof result.photos === 'string' ? JSON.parse(result.photos) : result.photos;
    result.videos = typeof result.videos === 'string' ? JSON.parse(result.videos) : result.videos;
    result.tags = typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags;
  }
  return result as ServiceProvider;
}

export async function updateServiceProvider(id: number, updates: Partial<ServiceProvider>): Promise<ServiceProvider | null> {
  // Handle simple single-field updates with template literals
  if (updates.name !== undefined && Object.keys(updates).length === 1) {
    const { rows } = await sql`
      UPDATE service_providers SET name = ${updates.name}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    return rows[0] as ServiceProvider || null;
  }

  if (updates.description !== undefined && Object.keys(updates).length === 1) {
    const { rows } = await sql`
      UPDATE service_providers SET description = ${updates.description}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    return rows[0] as ServiceProvider || null;
  }

  if (updates.location !== undefined && Object.keys(updates).length === 1) {
    const { rows } = await sql`
      UPDATE service_providers SET location = ${updates.location}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    return rows[0] as ServiceProvider || null;
  }

  if (updates.age !== undefined && Object.keys(updates).length === 1) {
    const { rows } = await sql`
      UPDATE service_providers SET age = ${updates.age}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    return rows[0] as ServiceProvider || null;
  }

  if (updates.availability !== undefined && Object.keys(updates).length === 1) {
    const { rows } = await sql`
      UPDATE service_providers SET availability = ${updates.availability}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    return rows[0] as ServiceProvider || null;
  }

  if (updates.photos !== undefined && Object.keys(updates).length === 1) {
    const { rows } = await sql`
      UPDATE service_providers SET photos = ${JSON.stringify(updates.photos || [])}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    const result = rows[0] as any;
    if (result) {
      result.photos = typeof result.photos === 'string' ? JSON.parse(result.photos) : result.photos;
      result.videos = typeof result.videos === 'string' ? JSON.parse(result.videos) : result.videos;
      result.tags = typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags;
    }
    return result as ServiceProvider || null;
  }

  if (updates.videos !== undefined && Object.keys(updates).length === 1) {
    const { rows } = await sql`
      UPDATE service_providers SET videos = ${JSON.stringify(updates.videos || [])}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    const result = rows[0] as any;
    if (result) {
      result.photos = typeof result.photos === 'string' ? JSON.parse(result.photos) : result.photos;
      result.videos = typeof result.videos === 'string' ? JSON.parse(result.videos) : result.videos;
      result.tags = typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags;
    }
    return result as ServiceProvider || null;
  }

  if (updates.tags !== undefined && Object.keys(updates).length === 1) {
    const { rows } = await sql`
      UPDATE service_providers SET tags = ${JSON.stringify(updates.tags || [])}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    const result = rows[0] as any;
    if (result) {
      result.photos = typeof result.photos === 'string' ? JSON.parse(result.photos) : result.photos;
      result.videos = typeof result.videos === 'string' ? JSON.parse(result.videos) : result.videos;
      result.tags = typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags;
    }
    return result as ServiceProvider || null;
  }

  if (updates.sequence !== undefined && Object.keys(updates).length === 1) {
    const { rows } = await sql`
      UPDATE service_providers SET sequence = ${updates.sequence}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    const result = rows[0] as any;
    if (result) {
      result.photos = typeof result.photos === 'string' ? JSON.parse(result.photos) : result.photos;
      result.videos = typeof result.videos === 'string' ? JSON.parse(result.videos) : result.videos;
      result.tags = typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags;
    }
    return result as ServiceProvider || null;
  }

  // For multiple updates, we'll need to handle them individually
  // This is a simple approach that works with Vercel Postgres limitations
  const { rows } = await sql`SELECT * FROM service_providers WHERE id = ${id}`;
  const result = rows[0] as any;
  if (!result) return null;

  // Parse JSON arrays back to JavaScript arrays
  let currentProvider = {
    ...result,
    photos: typeof result.photos === 'string' ? JSON.parse(result.photos) : result.photos,
    videos: typeof result.videos === 'string' ? JSON.parse(result.videos) : result.videos,
    tags: typeof result.tags === 'string' ? JSON.parse(result.tags) : result.tags,
  } as ServiceProvider | null;

  // Apply updates one by one
  for (const [key, value] of Object.entries(updates)) {
    if (key === 'id' || key === 'created_at' || key === 'updated_at') continue;
    if (value === undefined) continue;

    const singleUpdate = { [key]: value };
    currentProvider = await updateServiceProvider(id, singleUpdate);
    if (!currentProvider) return null;
  }

  return currentProvider;
}

export async function deleteServiceProvider(id: number): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM service_providers WHERE id = ${id}
  `;
  return rowCount ? rowCount > 0 : false;
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

export async function updateProvidersSequence(sequences: { id: number; sequence: number }[]): Promise<boolean> {
  try {
    for (const { id, sequence } of sequences) {
      await sql`
        UPDATE service_providers 
        SET sequence = ${sequence}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ${id}
      `;
    }
    return true;
  } catch (error) {
    console.error('Failed to update sequences:', error);
    return false;
  }
}
