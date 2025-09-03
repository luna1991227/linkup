import { put, del, list } from '@vercel/blob';

export async function uploadMedia(file: File, folder: 'photos' | 'videos'): Promise<string> {
  const filename = `${folder}/${Date.now()}-${file.name}`;
  
  const blob = await put(filename, file, {
    access: 'public',
  });

  return blob.url;
}

export async function uploadMultipleMedia(files: File[], folder: 'photos' | 'videos'): Promise<string[]> {
  const uploadPromises = files.map(file => uploadMedia(file, folder));
  return Promise.all(uploadPromises);
}

export async function deleteMedia(url: string): Promise<void> {
  await del(url);
}

export async function deleteMultipleMedia(urls: string[]): Promise<void> {
  const deletePromises = urls.map(url => del(url));
  await Promise.all(deletePromises);
}

export async function listMedia(folder?: string): Promise<{ url: string; pathname: string; size: number; uploadedAt: Date }[]> {
  const { blobs } = await list({ prefix: folder });
  return blobs;
}

export function getMediaType(filename: string): 'photo' | 'video' | 'unknown' {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  const photoExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const videoExtensions = ['mp4', 'webm', 'mov', 'avi', 'mkv', 'm4v'];
  
  if (photoExtensions.includes(extension || '')) {
    return 'photo';
  }
  
  if (videoExtensions.includes(extension || '')) {
    return 'video';
  }
  
  return 'unknown';
}