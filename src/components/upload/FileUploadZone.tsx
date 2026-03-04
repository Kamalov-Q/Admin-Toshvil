import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface FileUploadZoneProps {
    onFileSelect: (files: File[]) => void;
    isLoading?: boolean;
    maxSize?: number;
    allowedTypes?: string[];
    multiple?: boolean;
    disabled?: boolean;
    previewUrls?: string[];
    onRemovePreview?: (index: number) => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
    onFileSelect,
    isLoading = false,
    maxSize = 10 * 1024 * 1024,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    multiple = true,
    disabled = false,
    previewUrls = [],
    onRemovePreview,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        handleFiles(files);
    };

    const handleFiles = (files: File[]) => {
        const validFiles = files.filter((file) => {
            if (file.size > maxSize) {
                return false;
            }
            if (!allowedTypes.includes(file.type)) {
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            if (multiple) {
                setSelectedFiles((prev) => [...prev, ...validFiles]);
            } else {
                setSelectedFiles([validFiles[0]]);
            }
            onFileSelect(validFiles);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.startsWith('image/')) {
            return '🖼️';
        } else if (mimeType.startsWith('video/')) {
            return '🎥';
        }
        return '📄';
    };

    return (
        <div className="space-y-4">
            {/* Upload Zone */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={!disabled ? handleUploadClick : undefined}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={multiple}
                    onChange={handleFileInputChange}
                    disabled={disabled || isLoading}
                    className="hidden"
                    accept={allowedTypes.join(',')}
                />

                <div className="flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-full ${isDragActive ? 'bg-primary-200 text-primary-700' : 'bg-primary-100 text-primary-600'}`}>
                        <Upload size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-900">
                            Faylni bu yerga tashlang yoki bosing
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            Rasm va Video: JPG, PNG, WebP, MP4, WebM, MOV
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Maksimal hajm: {(maxSize / 1024 / 1024).toFixed(0)}MB
                        </p>
                    </div>
                </div>
            </div>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
                <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Tanlangan fayllar</h4>
                    <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="text-2xl flex-shrink-0">
                                        {getFileIcon(file.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(index)}
                                    disabled={isLoading}
                                    title="O'chirish"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Uploaded Files Preview */}
            {previewUrls.length > 0 && (
                <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                        Yuklangan fayllar ({previewUrls.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {previewUrls.map((url, index) => (
                            <div
                                key={index}
                                className="relative group rounded-lg overflow-hidden bg-gray-200 aspect-video hover:shadow-lg transition-shadow"
                            >
                                <img
                                    src={url}
                                    alt={`Preview ${index}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                {onRemovePreview && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => onRemovePreview(index)}
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="O'chirish"
                                    >
                                        <X size={16} />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};