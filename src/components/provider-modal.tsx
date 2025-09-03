'use client';

import { ServiceProvider } from '@/lib/db';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Calendar, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ContactMethods } from '@/components/contact-methods';

interface ProviderModalProps {
  provider: ServiceProvider;
  onClose: () => void;
}

export function ProviderModal({ provider, onClose }: ProviderModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  const hasPhotos = provider.photos && provider.photos.length > 0;
  const hasVideos = provider.videos && provider.videos.length > 0;

  const nextPhoto = () => {
    if (hasPhotos) {
      setCurrentPhotoIndex((prev) => (prev + 1) % provider.photos.length);
    }
  };

  const prevPhoto = () => {
    if (hasPhotos) {
      setCurrentPhotoIndex((prev) => (prev - 1 + provider.photos.length) % provider.photos.length);
    }
  };

  const nextVideo = () => {
    if (hasVideos) {
      setCurrentVideoIndex((prev) => (prev + 1) % provider.videos.length);
    }
  };

  const prevVideo = () => {
    if (hasVideos) {
      setCurrentVideoIndex((prev) => (prev - 1 + provider.videos.length) % provider.videos.length);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{provider.name}</span>
              {provider.age && (
                <Badge variant="outline">{provider.age}</Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6">
            {(hasPhotos || hasVideos) && (
              <div className="space-y-4">
                <div className="flex gap-2 border-b">
                  {hasPhotos && (
                    <button
                      onClick={() => setActiveTab('photos')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'photos'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Photos ({provider.photos.length})
                    </button>
                  )}
                  {hasVideos && (
                    <button
                      onClick={() => setActiveTab('videos')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'videos'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Videos ({provider.videos.length})
                    </button>
                  )}
                </div>

                {activeTab === 'photos' && hasPhotos && (
                  <div className="relative">
                    <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={provider.photos[currentPhotoIndex]}
                        alt={`${provider.name} photo ${currentPhotoIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {provider.photos.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                            onClick={prevPhoto}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                            onClick={nextPhoto}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                            {currentPhotoIndex + 1} / {provider.photos.length}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {provider.photos.length > 1 && (
                      <div className="flex gap-2 mt-2 overflow-x-auto">
                        {provider.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 flex-shrink-0 ${
                              index === currentPhotoIndex ? 'border-blue-500' : 'border-transparent'
                            }`}
                            onClick={() => setCurrentPhotoIndex(index)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'videos' && hasVideos && (
                  <div className="relative">
                    <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                      <video
                        src={provider.videos[currentVideoIndex]}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                      />
                      {provider.videos.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute left-2 top-2 bg-white/80 backdrop-blur-sm"
                            onClick={prevVideo}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute right-2 top-2 bg-white/80 backdrop-blur-sm"
                            onClick={nextVideo}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                            {currentVideoIndex + 1} / {provider.videos.length}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {provider.videos.length > 1 && (
                      <div className="flex gap-2 mt-2 overflow-x-auto">
                        {provider.videos.map((video, index) => (
                          <div
                            key={index}
                            className={`relative w-16 h-16 bg-gray-200 rounded cursor-pointer border-2 flex-shrink-0 flex items-center justify-center ${
                              index === currentVideoIndex ? 'border-blue-500' : 'border-transparent'
                            }`}
                            onClick={() => setCurrentVideoIndex(index)}
                          >
                            <Play className="h-4 w-4 text-gray-600" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-600 leading-relaxed">{provider.description}</p>
              </div>

              {provider.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.location}</span>
                </div>
              )}

              {provider.tags && provider.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Contact {provider.name}</h3>
                <ContactMethods variant="default" showLabels={true} />
                
                <Button className="w-full mt-4" size="lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}