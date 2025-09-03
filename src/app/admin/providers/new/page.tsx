'use client';

import { useRouter } from 'next/navigation';
import { ProviderForm } from '@/components/admin/provider-form';
import { ServiceProvider } from '@/lib/db';

export default function NewProviderPage() {
  const router = useRouter();

  const handleSuccess = (provider: ServiceProvider) => {
    router.push('/admin/providers');
  };

  const handleCancel = () => {
    router.push('/admin/providers');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">添加新模特</h1>
      <ProviderForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}