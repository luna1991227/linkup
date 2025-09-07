import { NextRequest, NextResponse } from 'next/server';
import { createAuthHandler } from '@/lib/middleware';
import { updateProvidersSequence } from '@/lib/db';

async function handleUpdateSequence(req: NextRequest) {
  try {
    const body = await req.json();
    const { sequences } = body;

    if (!Array.isArray(sequences)) {
      return NextResponse.json(
        { error: 'Sequences must be an array' },
        { status: 400 }
      );
    }

    for (const seq of sequences) {
      if (!seq.id || typeof seq.sequence !== 'number') {
        return NextResponse.json(
          { error: 'Each sequence item must have id and sequence number' },
          { status: 400 }
        );
      }
    }

    const success = await updateProvidersSequence(sequences);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update sequences' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update sequences:', error);
    return NextResponse.json(
      { error: 'Failed to update sequences' },
      { status: 500 }
    );
  }
}

export const PUT = createAuthHandler(handleUpdateSequence);