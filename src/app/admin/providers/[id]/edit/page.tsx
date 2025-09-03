'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProviderForm } from '@/components/admin/provider-form';
import { ServiceProvider } from '@/lib/db';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function EditProviderPage() {
  const router = useRouter();
  const params = useParams();
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProvider();
  }, []);

  const fetchProvider = async () => {
    try {
      const response = await fetch(`/api/admin/providers/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch provider');
      }
      const data = await response.json();
      setProvider(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch provider');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (updatedProvider: ServiceProvider) => {
    router.push('/admin/providers');
  };

  const handleCancel = () => {
    router.push('/admin/providers');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">编辑模特档案</h1>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">编辑模特档案</h1>
        <Alert variant="destructive">
          <AlertDescription>{error || '找不到模特档案'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">编辑模特档案</h1>
      <ProviderForm
        provider={provider}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}