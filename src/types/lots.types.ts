import type { District } from "./district.types";

export const LotStatus = {
    UPCOMING: 'upcoming',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
}

export type LotStatus = typeof LotStatus[keyof typeof LotStatus];

export const TradeType = {
    TENDER: 'tender',
    AUCTION: 'auction',
    DIRECT: 'direct'
}

export type TradeType = typeof TradeType[keyof typeof TradeType];

export const PaymentType = {
    MUDDATLI: 'muddatli',
    NAXT: 'naxt'
}

export type PaymentType = typeof PaymentType[keyof typeof PaymentType];

export interface Lot {
    id: string;
    titleUz: string;
    titleRu?: string;
    titleEn?: string;
    lotNumber: number;
    lotCode?: string;
    status: LotStatus;
    paymentType: PaymentType;
    paymentMonths?: number;
    tradeType: TradeType;
    tradeDate: string;
    applicationDeadline: string;
    addressUz: string;
    addressRu?: string;
    addressEn?: string;
    latitude?: number;
    longitude?: number;
    landArea?: number;
    hasGas?: boolean;
    hasElectricity?: boolean;
    hasWater?: boolean;
    hasSewage?: boolean;
    isActive: boolean;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    districtId?: string;
    images?: LotImage[];
    district?: District;
}


export interface LotImage {
    id: string;
    url: string;
    lotId: string;
    sortOrder: number;
    isMain: boolean;
    createdAt: string;
}