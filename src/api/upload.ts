import client from './client';
import { type UploadResult, type UploadProgress, UploadFolder } from '../types/upload.types';

export interface UploadParams {
    folder: UploadFolder;
    entityId?: string;
    onProgress?: (progress: UploadProgress) => void;
}

export const uploadApi = {
    // Upload single file to Bunny CDN
    uploadSingle: async (
        file: File,
        folder: UploadFolder = UploadFolder.GENERAL,
        entityId?: string,
        onProgress?: (progress: UploadProgress) => void
    ): Promise<UploadResult> => {
        const formData = new FormData();
        formData.append('file', file);

        const params = new URLSearchParams();
        params.append('folder', folder);
        if (entityId) {
            params.append('entityId', entityId);
        }

        return client
            .post<UploadResult>(`/upload/single?${params.toString()}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        onProgress({
                            loaded: progressEvent.loaded,
                            total: progressEvent.total,
                            percentage: percentCompleted,
                        });
                    }
                },
            })
            .then((res) => res.data);
    },

    // Upload multiple files to Bunny CDN
    uploadMultiple: async (
        files: File[],
        folder: UploadFolder = UploadFolder.GENERAL,
        entityId?: string,
        onProgress?: (progress: UploadProgress) => void
    ): Promise<UploadResult[]> => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        const params = new URLSearchParams();
        params.append('folder', folder);
        if (entityId) {
            params.append('entityId', entityId);
        }

        return client
            .post<UploadResult[]>(`/upload/multiple?${params.toString()}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        onProgress({
                            loaded: progressEvent.loaded,
                            total: progressEvent.total,
                            percentage: percentCompleted,
                        });
                    }
                },
            })
            .then((res) => res.data);
    },

    // Delete file by CDN URL or fileName
    deleteFile: (fileUrl: string) =>
        client.delete('/upload', {
            data: { fileUrl },
        }),

    // Delete multiple files
    deleteMultiple: async (fileUrls: string[]) => {
        const deletePromises = fileUrls.map((url) =>
            client.delete('/upload', { data: { fileUrl: url } })
        );
        return Promise.all(deletePromises);
    },
};