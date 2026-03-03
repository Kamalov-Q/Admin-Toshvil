export const NewsCategory = {
    TECHNOLOGY: 'technology',
    BUSINESS: 'business',
    OTHER: 'other'
}

export type NewsCategory = typeof NewsCategory[keyof typeof NewsCategory];

export interface News {
    id: string;
    titleUz: string;
    titleRu: string;
    titleEn: string;
    descriptionUz: string;
    descriptionRu?: string;
    descriptionEn?: string;
    shortDescriptionUz?: string;
    shortDescriptionRu?: string;
    shortDescriptionEn?: string;
    image?: string;
    category?: NewsCategory;
    isPublished: boolean;
    publishedAt?: string;
    isActive: boolean;
    viewCount: number;
    createdAt: string;
    updatedAt: string;

}