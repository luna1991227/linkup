import { NextRequest, NextResponse } from 'next/server';
import { createAuthHandler } from '@/lib/middleware';
import { getServiceProviderById, updateServiceProvider, deleteServiceProvider } from '@/lib/db';

async function handleGetProvider(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid provider ID' },
        { status: 400 }
      );
    }

    // Get provider without availability filter for admin
    const { sql } = await import('@vercel/postgres');
    const { rows } = await sql`
      SELECT * FROM service_providers WHERE id = ${id}
    `;
    
    const provider = rows[0];
    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(provider);
  } catch (error) {
    console.error('Failed to fetch provider:', error);
    return NextResponse.json(
      { error: 'Failed to fetch provider' },
      { status: 500 }
    );
  }
}

async function handleUpdateProvider(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid provider ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const updatedProvider = await updateServiceProvider(id, body);
    
    if (!updatedProvider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProvider);
  } catch (error) {
    console.error('Failed to update provider:', error);
    return NextResponse.json(
      { error: 'Failed to update provider' },
      { status: 500 }
    );
  }
}

async function handleDeleteProvider(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid provider ID' },
        { status: 400 }
      );
    }

    const success = await deleteServiceProvider(id);
    if (!success) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Provider deleted successfully' });
  } catch (error) {
    console.error('Failed to delete provider:', error);
    return NextResponse.json(
      { error: 'Failed to delete provider' },
      { status: 500 }
    );
  }
}

export const GET = createAuthHandler(handleGetProvider);
export const PUT = createAuthHandler(handleUpdateProvider);
export const PATCH = createAuthHandler(handleUpdateProvider);
export const DELETE = createAuthHandler(handleDeleteProvider);