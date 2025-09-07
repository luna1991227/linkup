'use client';

import { useEffect, useState } from 'react';
import { ServiceProvider } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GripVertical, Save, RotateCcw } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';

interface SortableProviderProps {
  provider: ServiceProvider;
  index: number;
}

function SortableProvider({ provider, index }: SortableProviderProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: provider.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white">
      <Card className="mb-3">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div
              {...attributes}
              {...listeners}
              className="cursor-move p-1 text-gray-400 hover:text-gray-600"
            >
              <GripVertical className="h-5 w-5" />
            </div>
            
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
              {provider.photos && provider.photos.length > 0 ? (
                <img
                  src={provider.photos[0]}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 truncate">{provider.name}</h3>
                <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                {provider.age && (
                  <Badge variant="outline" className="text-xs">{provider.age}岁</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{provider.description}</p>
              {provider.tags && provider.tags.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {provider.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {provider.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{provider.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={provider.availability ? "default" : "secondary"}>
                {provider.availability ? "活跃" : "隐藏"}
              </Badge>
              <div className="text-xs text-gray-500">
                ID: {provider.id}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SequenceManagement() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [originalProviders, setOriginalProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    const hasOrderChanged = providers.some((provider, index) => {
      const originalIndex = originalProviders.findIndex(p => p.id === provider.id);
      return originalIndex !== index;
    });
    setHasChanges(hasOrderChanged);
  }, [providers, originalProviders]);

  const fetchProviders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/providers');
      if (!response.ok) {
        throw new Error('Failed to fetch providers');
      }
      const data = await response.json();
      setProviders(data);
      setOriginalProviders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setProviders((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const saveSequence = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const sequences = providers.map((provider, index) => ({
        id: provider.id,
        sequence: index
      }));

      const response = await fetch('/api/admin/providers/sequence', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sequences }),
      });

      if (!response.ok) {
        throw new Error('Failed to save sequence');
      }

      setOriginalProviders([...providers]);
      setHasChanges(false);
      setSuccessMessage('序列已成功保存！');
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('保存序列失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  const resetSequence = () => {
    setProviders([...originalProviders]);
    setHasChanges(false);
    setError(null);
    setSuccessMessage(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">序列管理</h1>
        </div>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse flex items-center gap-4">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                  <div className="flex-grow">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">序列管理</h1>
          <p className="text-gray-600 mt-1">拖拽模特卡片来调整显示顺序</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/providers">
            <Button variant="outline">返回列表</Button>
          </Link>
          {hasChanges && (
            <>
              <Button 
                variant="outline" 
                onClick={resetSequence}
                disabled={isSaving}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                重置
              </Button>
              <Button 
                onClick={saveSequence}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? '保存中...' : '保存序列'}
              </Button>
            </>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {providers.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">暂无模特档案</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 mb-4">
            共 {providers.length} 个模特档案 
            {hasChanges && <span className="text-orange-600 ml-2">• 序列已修改，请保存更改</span>}
          </div>
          
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={providers.map(p => p.id)} 
              strategy={verticalListSortingStrategy}
            >
              {providers.map((provider, index) => (
                <SortableProvider
                  key={provider.id}
                  provider={provider}
                  index={index}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}