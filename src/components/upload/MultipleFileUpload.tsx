import React, { useState } from 'react';
import { UploadFolder, ALLOWED_MIME_TYPES, type UploadResult } from '../../types/upload.types';
import { FileUploadZone } from './FileUploadZone';
import { UploadProgress } from './UploadProgress';
import { FileIcon } from 'lucide-react';
import { useUpload } from '@/hooks/useUploads';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface MultipleFileUploadProps {
    folder?: UploadFolder;
    onFilesUploaded: (files: UploadResult[]) => void;
    allowedTypes?: string[];
    maxFiles?: number;
    existingFiles?: UploadResult[];
    entityId?: string;
}

export const MultipleFileUpload: React.FC<MultipleFileUploadProps> = ({
    folder = UploadFolder.GENERAL,
    onFilesUploaded,
    allowedTypes = ALLOWED_MIME_TYPES.image,
    maxFiles = 5,
    existingFiles = [],
    entityId,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<UploadResult[]>(existingFiles);
    const [isUploading, setIsUploading] = useState(false);
    const { uploadMultiple, progress, error: uploadError } = useUpload({
        maxSize: 10 * 1024 * 1024,
        allowedTypes,
        folder,
    });

    const handleFileSelect = (files: File[]) => {
        const totalFiles = uploadedFiles.length + selectedFiles.length + files.length;
        if (totalFiles > maxFiles) {
            alert(`Maksimal ${maxFiles} ta fayl yuklash mumkin`);
            return;
        }
        setSelectedFiles((prev) => [...prev, ...files]);
    };

    const handleRemoveSelected = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveUploaded = (index: number) => {
        const fileToRemove = uploadedFiles[index];
        setUploadedFiles((prev) => {
            const newFiles = prev.filter((_, i) => i !== index);
            onFilesUploaded(newFiles);
            return newFiles;
        });
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setIsUploading(true);
        const results = await uploadMultiple(selectedFiles, entityId);
        setIsUploading(false);

        if (results.length > 0) {
            const allFiles = [...uploadedFiles, ...results];
            setUploadedFiles(allFiles);
            onFilesUploaded(allFiles);
            setSelectedFiles([]);
        }
    };

    const remainingSlots = maxFiles - uploadedFiles.length - selectedFiles.length;
    const totalCount = uploadedFiles.length + selectedFiles.length;

    return (
        <div className="space-y-4">
            {/* Header with Counter */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <FileIcon size={16} />
                    Fayllarni yuklash ({totalCount}/{maxFiles})
                </h3>
                {remainingSlots <= 2 && remainingSlots > 0 && (
                    <span className="text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full border border-yellow-200">
                        ⚠️ {remainingSlots} ta o'rin qoldi
                    </span>
                )}
                {remainingSlots === 0 && (
                    <span className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                        ❌ Maksimal soni to'lgan
                    </span>
                )}
            </div>

            {/* Upload Zone */}
            <FileUploadZone
                onFileSelect={handleFileSelect}
                isLoading={isUploading}
                multiple={maxFiles > 1}
                allowedTypes={allowedTypes}
                disabled={isUploading || remainingSlots === 0}
                previewUrls={uploadedFiles.map((f) => f.url)}
                onRemovePreview={handleRemoveUploaded}
            />

            {/* Selected Files Info */}
            {selectedFiles.length > 0 && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-900">
                            Yuklashga tayyor: {selectedFiles.length} ta fayl
                        </p>
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setSelectedFiles([])}
                                disabled={isUploading}
                            >
                                Tozalash
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleUpload}
                                loading={isUploading}
                                disabled={selectedFiles.length === 0 || isUploading}
                            >
                                {selectedFiles.length} ta faylni yuklash
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Upload Progress */}
            <UploadProgress
                isUploading={isUploading}
                percentage={progress?.percentage || 0}
                error={uploadError}
                success={!isUploading && !uploadError && uploadedFiles.length > 0}
            />
        </div>
    );
};