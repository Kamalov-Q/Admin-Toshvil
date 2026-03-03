export const DistrictType = {
    TUMAN: 'tuman',
    SHAHAR: 'shahar'
} as const;

export type DistrictType = typeof DistrictType[keyof typeof DistrictType];


export interface District {
    id: string;
    slug: string;
    nameUz: string;
    nameRu: string;
    nameEn: string;
    type: DistrictType;
    hokimNameUz?: string;
    hokimNameEn?: string;
    hokimNameRu?: string;
    addressUz?: string;
    addressRu?: string;
    addressEn?: string;
    phone?: string;
    email?: string;
    latitude?: string;
    longitude?: string;
    sortOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}