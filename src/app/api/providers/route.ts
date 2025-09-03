import { NextResponse } from 'next/server';
import { getServiceProviders } from '@/lib/db';

export async function GET() {
  try {
    const providers = await getServiceProviders();
    return NextResponse.json(providers);
  } catch (error) {
    console.error('Failed to fetch service providers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service providers' },
      { status: 500 }
    );
  }
}