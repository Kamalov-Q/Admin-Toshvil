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

export const LandRightType = {
    IJARA: 'ijara',
    KAPITAL: 'kapital',
}

export type LandRightType = typeof LandRightType[keyof typeof LandRightType];


export interface LotImage {
    id: string;
    url: string;
    lotId: string;
    sortOrder: number;
    isMain: boolean;
    createdAt: string;
}

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
    tradeLocationUz?: string;
    tradeLocationRu?: string;
    tradeLocationEn?: string;
    addressUz: string;
    addressRu?: string;
    addressEn?: string;
    region?: string;
    landRightType: LandRightType;
    leaseYears?: number;
    permittedUseUz?: string;
    permittedUseRu?: string;
    permittedUseEn?: string;
    landCategoryUz?: string;
    landCategoryRu?: string;
    landCategoryEn?: string;
    jobsToCreate?: number;
    requiredInvestmentUz?: string;
    requiredInvestmentRu?: string;
    requiredInvestmentEn?: string;
    hasGas?: boolean;
    hasElectricity?: boolean;
    hasWater?: boolean;
    hasSewage?: boolean;
    landArea?: number;
    distanceToRoad?: string;
    locationAddressUz?: string;
    locationAddressRu?: string;
    locationAddressEn?: string;
    hasBuilding?: boolean;
    buildingArea?: number;
    noteUz?: string;
    noteRu?: string;
    noteEn?: string;
    usageWarningUz?: string;
    usageWarningRu?: string;
    usageWarningEn?: string;
    customerName?: string;
    customerType?: string;
    customerDistrict?: string;
    customerAddress?: string;
    customerPhone?: string;
    customerExtraPhone?: string;
    customerEmail?: string;
    latitude?: number;
    longitude?: number;
    geoPolygon?: object;
    districtId?: string;
    images?: LotImage[];
    isActive: boolean;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateLotDto {
    titleUz: string;
    titleRu?: string;
    titleEn?: string;
    lotNumber: number;
    lotCode?: string;
    status?: LotStatus;
    paymentType?: PaymentType;
    paymentMonths?: number;
    tradeType?: TradeType;
    tradeDate: string;
    applicationDeadline: string;
    tradeLocationUz?: string;
    tradeLocationRu?: string;
    tradeLocationEn?: string;
    addressUz: string;
    addressRu?: string;
    addressEn?: string;
    region?: string;
    landRightType?: LandRightType;
    leaseYears?: number;
    permittedUseUz?: string;
    permittedUseRu?: string;
    permittedUseEn?: string;
    landCategoryUz?: string;
    landCategoryRu?: string;
    landCategoryEn?: string;
    jobsToCreate?: number;
    requiredInvestmentUz?: string;
    requiredInvestmentRu?: string;
    requiredInvestmentEn?: string;
    hasGas?: boolean;
    hasElectricity?: boolean;
    hasWater?: boolean;
    hasSewage?: boolean;
    landArea?: number;
    distanceToRoad?: string;
    locationAddressUz?: string;
    locationAddressRu?: string;
    locationAddressEn?: string;
    hasBuilding?: boolean;
    buildingArea?: number;
    noteUz?: string;
    noteRu?: string;
    noteEn?: string;
    usageWarningUz?: string;
    usageWarningRu?: string;
    usageWarningEn?: string;
    customerName?: string;
    customerType?: string;
    customerDistrict?: string;
    customerAddress?: string;
    customerPhone?: string;
    customerExtraPhone?: string;
    customerEmail?: string;
    latitude?: number;
    longitude?: number;
    geoPolygon?: object;
    districtId?: string;
    imageUrls?: string[];
}
