import { NextResponse } from 'next/server';
import { createAuthHandler } from '@/lib/middleware';
import { sql } from '@vercel/postgres';

async function handleGetStats() {
  try {
    // Get total providers count
    const totalProvidersResult = await sql`
      SELECT COUNT(*) as count FROM service_providers
    `;
    const totalProviders = parseInt(totalProvidersResult.rows[0].count);

    // Get active providers count
    const activeProvidersResult = await sql`
      SELECT COUNT(*) as count FROM service_providers WHERE availability = true
    `;
    const activeProviders = parseInt(activeProvidersResult.rows[0].count);

    // Get total uploads count (photos + videos)
    const uploadsResult = await sql`
      SELECT 
        SUM(array_length(photos, 1)) as photo_count,
        SUM(array_length(videos, 1)) as video_count
      FROM service_providers
    `;
    const photoCount = parseInt(uploadsResult.rows[0].photo_count || '0');
    const videoCount = parseInt(uploadsResult.rows[0].video_count || '0');
    const totalUploads = photoCount + videoCount;

    return NextResponse.json({
      totalProviders,
      activeProviders,
      totalUploads,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

export const GET = createAuthHandler(handleGetStats);