import { NextRequest, NextResponse } from 'next/server';
import { createAuthHandler } from '@/lib/middleware';
import { getServiceProviders, createServiceProvider } from '@/lib/db';

async function getAllProviders() {
  // Get all providers, not just available ones for admin
  const { sql } = await import('@vercel/postgres');
  const { rows } = await sql`
    SELECT * FROM service_providers 
    ORDER BY sequence ASC, created_at DESC
  `;
  
  // Parse JSON arrays back to JavaScript arrays
  return rows.map((row: any) => ({
    ...row,
    photos: typeof row.photos === 'string' ? JSON.parse(row.photos) : row.photos,
    videos: typeof row.videos === 'string' ? JSON.parse(row.videos) : row.videos,
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
  }));
}

async function handleGetProviders() {
  try {
    const providers = await getAllProviders();
    return NextResponse.json(providers);
  } catch (error) {
    console.error('Failed to fetch providers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}

async function handleCreateProvider(req: NextRequest) {
  try {
    const body = await req.json();
    const provider = await createServiceProvider(body);
    return NextResponse.json(provider);
  } catch (error) {
    console.error('Failed to create provider:', error);
    return NextResponse.json(
      { error: 'Failed to create provider' },
      { status: 500 }
    );
  }
}

export const GET = createAuthHandler(handleGetProviders);
export const POST = createAuthHandler(handleCreateProvider);