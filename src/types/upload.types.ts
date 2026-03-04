export interface UploadResult {
    url: string;
    fileName: string;
    originalName: string;
    size: number;
}

export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

export const UploadFolder = {
    NEWS: 'news',
    LOTS: 'lots',
    DISTRICTS: 'districts',
    GENERAL: 'general',
}

export type UploadFolder = typeof UploadFolder[keyof typeof UploadFolder];

export const ALLOWED_MIME_TYPES = {
    image: ['image/jpeg', 'image/png', 'image/webp'],
    video: ['video/mp4', 'video/webm', 'video/quicktime'],
    all: [
        'image/jpeg',
        'image/png',
        'image/webp',
        'video/mp4',
        'video/webm',
        'video/quicktime',
    ],
};

export const ALLOWED_EXTENSIONS = {
    image: ['.jpg', '.jpeg', '.png', '.webp'],
    video: ['.mp4', '.webm', '.mov'],
    all: ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm', '.mov'],
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB