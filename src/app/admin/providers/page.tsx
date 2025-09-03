'use client';

import { useEffect, useState } from 'react';
import { ServiceProvider } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function ProvidersManagement() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/providers');
      if (!response.ok) {
        throw new Error('Failed to fetch providers');
      }
      const data = await response.json();
      setProviders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAvailability = async (id: number, currentAvailability: boolean) => {
    try {
      const response = await fetch(`/api/admin/providers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability: !currentAvailability }),
      });

      if (!response.ok) {
        throw new Error('Failed to update provider');
      }

      setProviders(providers.map(p => 
        p.id === id ? { ...p, availability: !currentAvailability } : p
      ));
    } catch (err) {
      setError('Failed to update provider availability');
    }
  };

  const deleteProvider = async (id: number) => {
    if (!confirm('确定要删除这个模特档案吗？此操作不可撤销。')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/providers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete provider');
      }

      setProviders(providers.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete provider');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">模特管理</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">模特管理</h1>
        <Link href="/admin/providers/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            添加新模特
          </Button>
        </Link>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {providers.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">暂无模特档案</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Card key={provider.id} className="overflow-hidden">
              <div className="relative">
                {provider.photos && provider.photos.length > 0 ? (
                  <img
                    src={provider.photos[0]}
                    alt={provider.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                
                <div className="absolute top-2 right-2">
                  <Badge variant={provider.availability ? "default" : "secondary"}>
                    {provider.availability ? "活跃" : "隐藏"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold truncate">{provider.name}</h3>
                  {provider.age && (
                    <Badge variant="outline">{provider.age}岁</Badge>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {provider.description}
                </p>

                {provider.tags && provider.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {provider.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {provider.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{provider.tags.length - 2} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Link href={`/admin/providers/${provider.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-3 w-3" />
                      </Button>
                    </Link>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAvailability(provider.id, provider.availability ?? true)}
                    >
                      {provider.availability ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteProvider(provider.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    ID: {provider.id}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}