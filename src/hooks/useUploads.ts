import { useState, useCallback } from 'react';
import { uploadApi } from '../api/upload';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, UploadFolder, type UploadProgress, type UploadResult } from '@/types/upload.types';
import { useUIStore } from '@/stores/uiStore';

interface UseUploadOptions {
    maxSize?: number;
    allowedTypes?: string[];
    folder?: UploadFolder;
}

export const useUpload = (options: UseUploadOptions = {}) => {
    const {
        maxSize = MAX_FILE_SIZE,
        allowedTypes = ALLOWED_MIME_TYPES.image,
        folder = UploadFolder.GENERAL,
    } = options;

    const [uploadedFiles, setUploadedFiles] = useState<UploadResult[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState<UploadProgress | null>(null);
    const [error, setError] = useState<string | null>(null);
    const addToast = useUIStore((state) => state.addToast);

    const validateFile = useCallback(
        (file: File): string | null => {
            // Check file size
            if (file.size > maxSize) {
                const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0);
                return `Fayl hajmi ${maxSizeMB}MB dan katta bo'lmasligi kerak`;
            }

            // Check file type
            if (!allowedTypes.includes(file.type)) {
                const allowedExts = allowedTypes
                    .map((t) => t.split('/')[1].toUpperCase())
                    .join(', ');
                return `Faqat quyidagi formatlar ruxsat: ${allowedExts}`;
            }

            return null;
        },
        [maxSize, allowedTypes]
    );

    const uploadSingle = useCallback(
        async (file: File, entityId?: string) => {
            setError(null);
            const validationError = validateFile(file);

            if (validationError) {
                setError(validationError);
                addToast(`❌ ${validationError}`, 'error');
                return null;
            }

            try {
                setIsUploading(true);
                const result = await uploadApi.uploadSingle(
                    file,
                    folder,
                    entityId,
                    (prog) => setProgress(prog)
                );
                setUploadedFiles((prev) => [...prev, result]);
                addToast('✅ Fayl muvaffaqiyatli yuklandi', 'success');
                return result;
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || 'Faylni yuklashda xatolik yuz berdi';
                setError(errorMessage);
                addToast(`❌ ${errorMessage}`, 'error');
                console.error('Upload error:', err);
                return null;
            } finally {
                setIsUploading(false);
                setProgress(null);
            }
        },
        [validateFile, folder, addToast]
    );

    const uploadMultiple = useCallback(
        async (files: File[], entityId?: string) => {
            setError(null);
            const validationErrors = files
                .map((file) => validateFile(file))
                .filter((err) => err !== null);

            if (validationErrors.length > 0) {
                const errorMsg = validationErrors[0];
                setError(errorMsg);
                addToast(`❌ ${errorMsg}`, 'error');
                return [];
            }

            try {
                setIsUploading(true);
                const results = await uploadApi.uploadMultiple(
                    files,
                    folder,
                    entityId,
                    (prog) => setProgress(prog)
                );
                setUploadedFiles((prev) => [...prev, ...results]);
                addToast(`✅ ${results.length} ta fayl muvaffaqiyatli yuklandi`, 'success');
                return results;
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || 'Fayllarni yuklashda xatolik yuz berdi';
                setError(errorMessage);
                addToast(`❌ ${errorMessage}`, 'error');
                console.error('Upload error:', err);
                return [];
            } finally {
                setIsUploading(false);
                setProgress(null);
            }
        },
        [validateFile, folder, addToast]
    );

    const deleteFile = useCallback(
        async (fileUrl: string) => {
            try {
                await uploadApi.deleteFile(fileUrl);
                setUploadedFiles((prev) => prev.filter((f) => f.url !== fileUrl));
                addToast('✅ Fayl o\'chirildi', 'success');
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || 'Faylni o\'chirishda xatolik yuz berdi';
                addToast(`❌ ${errorMessage}`, 'error');
                console.error('Delete error:', err);
            }
        },
        [addToast]
    );

    const deleteMultiple = useCallback(
        async (fileUrls: string[]) => {
            try {
                await uploadApi.deleteMultiple(fileUrls);
                setUploadedFiles((prev) =>
                    prev.filter((f) => !fileUrls.includes(f.url))
                );
                addToast(`✅ ${fileUrls.length} ta fayl o'chirildi`, 'success');
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || 'Fayllarni o\'chirishda xatolik yuz berdi';
                addToast(`❌ ${errorMessage}`, 'error');
                console.error('Delete error:', err);
            }
        },
        [addToast]
    );

    const clearUploaded = useCallback(() => {
        setUploadedFiles([]);
        setError(null);
    }, []);

    return {
        uploadedFiles,
        isUploading,
        progress,
        error,
        uploadSingle,
        uploadMultiple,
        deleteFile,
        deleteMultiple,
        clearUploaded,
    };
};