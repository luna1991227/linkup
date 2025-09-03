'use client';

import { ServiceProvider } from '@/lib/db';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Play, Image as ImageIcon } from 'lucide-react';

interface ProviderCardProps {
  provider: ServiceProvider;
  onClick: () => void;
}

export function ProviderCard({ provider, onClick }: ProviderCardProps) {
  const firstPhoto = provider.photos?.[0];
  const hasVideos = provider.videos && provider.videos.length > 0;
  const hasPhotos = provider.photos && provider.photos.length > 0;

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="relative">
        {firstPhoto ? (
          <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
            <img
              src={firstPhoto}
              alt={provider.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              {hasPhotos && (
                <Badge variant="secondary" className="text-xs">
                  <ImageIcon className="h-3 w-3 mr-1" />
                  {provider.photos.length}
                </Badge>
              )}
              {hasVideos && (
                <Badge variant="secondary" className="text-xs">
                  <Play className="h-3 w-3 mr-1" />
                  {provider.videos.length}
                </Badge>
              )}
            </div>
          </div>
        ) : (
          <div className="h-64 w-full bg-gray-200 rounded-t-lg flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
            <div className="absolute top-2 right-2 flex gap-1">
              {hasVideos && (
                <Badge variant="secondary" className="text-xs">
                  <Play className="h-3 w-3 mr-1" />
                  {provider.videos.length}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold truncate">{provider.name}</h3>
          {provider.age && (
            <Badge variant="outline" className="text-xs">
              {provider.age}岁
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {provider.description}
        </p>

        {provider.location && (
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {provider.location}
          </div>
        )}

        {provider.tags && provider.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {provider.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {provider.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{provider.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
