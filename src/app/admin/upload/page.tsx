'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, Copy, Check } from 'lucide-react';

interface UploadedFile {
  url: string;
  filename: string;
  size: number;
  type: string;
}

export default function UploadPage() {
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleFileUpload = async (files: FileList) => {
    setUploading(true);
    setError(null);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }
        
        return response.json();
      });
      
      const results = await Promise.all(uploadPromises);
      setUploads(prev => [...prev, ...results]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '上传失败');
    } finally {
      setUploading(false);
    }
  };

  const removeUpload = (url: string) => {
    setUploads(prev => prev.filter(upload => upload.url !== url));
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">文件上传</h1>

      <Card>
        <CardHeader>
          <CardTitle>上传文件</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="fileInput"
              multiple
              accept="image/*,video/*"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
            />
            
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {uploading ? '上传中...' : '选择文件上传'}
              </p>
              <p className="text-sm text-gray-500">
                支持图片和视频文件，最大 50MB
              </p>
              
              <Button
                onClick={() => document.getElementById('fileInput')?.click()}
                disabled={uploading}
              >
                {uploading ? '上传中...' : '选择文件'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {uploads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>已上传文件 ({uploads.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploads.map((upload) => (
                <div key={upload.url} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {upload.type.startsWith('image/') ? (
                      <img
                        src={upload.url}
                        alt={upload.filename}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <video
                        src={upload.url}
                        className="w-16 h-16 object-cover rounded"
                        controls={false}
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {upload.filename}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(upload.size)} • {upload.type}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyUrl(upload.url)}
                    >
                      {copiedUrl === upload.url ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeUpload(upload.url)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                使用这些 URL 在模特档案中添加媒体文件。点击复制按钮来复制 URL。
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}