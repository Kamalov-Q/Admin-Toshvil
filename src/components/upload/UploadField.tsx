import React, { useState } from 'react';
import { FileUploadZone } from './FileUploadZone';
import { UploadProgress } from './UploadProgress';
import { X, Image as ImageIcon } from 'lucide-react';
import { ALLOWED_MIME_TYPES, UploadFolder } from '@/types/upload.types';
import { useUpload } from '@/hooks/useUploads';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ImageUploadFieldProps {
    label?: string;
    value?: string;
    onChange: (url: string) => void;
    error?: string;
    helperText?: string;
    entityId?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
    label = 'Rasm',
    value,
    onChange,
    error,
    helperText,
    entityId,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const { uploadSingle, isUploading, progress, error: uploadError } = useUpload({
        maxSize: 10 * 1024 * 1024,
        allowedTypes: ALLOWED_MIME_TYPES.image,
        folder: UploadFolder.NEWS,
    });

    const handleFileSelect = async (files: File[]) => {
        setSelectedFiles(files);
        if (files.length > 0) {
            const result = await uploadSingle(files[0], entityId);
            if (result) {
                onChange(result.url);
                setSelectedFiles([]);
            }
        }
    };

    const handleRemoveImage = () => {
        onChange('');
        setSelectedFiles([]);
    };

    const handleManualUrlChange = (url: string) => {
        // Validate if it's a valid URL
        try {
            new URL(url);
            onChange(url);
        } catch {
            // Invalid URL, don't update
        }
    };

    return (
        <div className="space-y-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <ImageIcon size={16} />
                    {label}
                </label>
            )}

            {value ? (
                <Card className="p-4">
                    <div className="space-y-4">
                        {/* Image Preview */}
                        <div className="relative group rounded-lg overflow-hidden bg-gray-200 aspect-video shadow-sm">
                            <img
                                src={value}
                                alt="Yuklangan rasm"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).classList.add('hidden');
                                }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={handleRemoveImage}
                                >
                                    <X size={16} className="mr-1" />
                                    O'chirish
                                </Button>
                            </div>
                        </div>

                        {/* URL Display */}
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-600 mb-1">CDN URL:</p>
                            <p className="text-xs text-primary-600 font-mono break-all truncate">
                                {value}
                            </p>
                        </div>

                        {/* Change Image */}
                        <Button
                            variant="secondary"
                            onClick={() => setSelectedFiles([])}
                            className="w-full"
                        >
                            Boshqa rasm tanlash
                        </Button>
                    </div>
                </Card>
            ) : (
                <>
                    <FileUploadZone
                        onFileSelect={handleFileSelect}
                        isLoading={isUploading}
                        multiple={false}
                        allowedTypes={ALLOWED_MIME_TYPES.image}
                        disabled={isUploading}
                    />

                    <UploadProgress
                        isUploading={isUploading}
                        percentage={progress?.percentage || 0}
                        fileName={selectedFiles[0]?.name}
                        error={uploadError}
                        success={!isUploading && !uploadError && !!value}
                    />

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Yoki URL dan</span>
                        </div>
                    </div>

                    {/* Manual URL Input */}
                    <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        onChange={(e) => handleManualUrlChange(e.target.value)}
                        error={error}
                        helperText={helperText || 'Bunny CDN yoki boshqa rasm URL sini kiriting'}
                    />
                </>
            )}
        </div>
    );
};