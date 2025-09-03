import { NextResponse } from 'next/server';
import { getServiceProviderById } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid provider ID' },
        { status: 400 }
      );
    }

    const provider = await getServiceProviderById(id);
    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(provider);
  } catch (error) {
    console.error('Failed to fetch service provider:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service provider' },
      { status: 500 }
    );
  }
}