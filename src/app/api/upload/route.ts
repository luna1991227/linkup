import { NextRequest, NextResponse } from 'next/server';
import { createAuthHandler } from '@/lib/middleware';
import { uploadMultipleMedia, getMediaType } from '@/lib/blob';

async function handleUpload(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const photoFiles: File[] = [];
    const videoFiles: File[] = [];

    for (const file of files) {
      const mediaType = getMediaType(file.name);
      if (mediaType === 'photo') {
        photoFiles.push(file);
      } else if (mediaType === 'video') {
        videoFiles.push(file);
      }
    }

    const [photoUrls, videoUrls] = await Promise.all([
      photoFiles.length > 0 ? uploadMultipleMedia(photoFiles, 'photos') : [],
      videoFiles.length > 0 ? uploadMultipleMedia(videoFiles, 'videos') : []
    ]);

    return NextResponse.json({
      photos: photoUrls,
      videos: videoUrls,
      total: photoUrls.length + videoUrls.length
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}

export const POST = createAuthHandler(handleUpload);
