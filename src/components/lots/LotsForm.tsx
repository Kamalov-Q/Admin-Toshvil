import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MultipleFileUpload } from '../upload/MultipleFileUpload';
import { MapPin, DollarSign, Home, User } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { UploadFolder, type UploadResult } from '@/types/upload.types';
import { LandRightType, LotStatus, PaymentType, TradeType, type Lot } from '@/types/lots.types';

const lotSchema = z.object({
    titleUz: z.string().min(3, 'Sarlavha kamida 3 ta belgidan iborat bo\'lishi kerak'),
    titleRu: z.string().optional(),
    titleEn: z.string().optional(),
    lotNumber: z.number().int().min(1, 'Lot raqami 1 dan ko\'p bo\'lishi kerak'),
    lotCode: z.string().optional(),
    status: z.string().optional(),
    paymentType: z.string().optional(),
    paymentMonths: z.number().optional(),
    tradeType: z.string().optional(),
    tradeDate: z.string(),
    applicationDeadline: z.string(),
    tradeLocationUz: z.string().optional(),
    tradeLocationRu: z.string().optional(),
    tradeLocationEn: z.string().optional(),
    addressUz: z.string().min(3, 'Manzil majburiy'),
    addressRu: z.string().optional(),
    addressEn: z.string().optional(),
    region: z.string().optional(),
    landRightType: z.string().optional(),
    leaseYears: z.number().optional(),
    permittedUseUz: z.string().optional(),
    permittedUseRu: z.string().optional(),
    permittedUseEn: z.string().optional(),
    landCategoryUz: z.string().optional(),
    landCategoryRu: z.string().optional(),
    landCategoryEn: z.string().optional(),
    jobsToCreate: z.number().optional(),
    requiredInvestmentUz: z.string().optional(),
    requiredInvestmentRu: z.string().optional(),
    requiredInvestmentEn: z.string().optional(),
    hasGas: z.boolean().optional(),
    hasElectricity: z.boolean().optional(),
    hasWater: z.boolean().optional(),
    hasSewage: z.boolean().optional(),
    landArea: z.number().optional(),
    distanceToRoad: z.string().optional(),
    locationAddressUz: z.string().optional(),
    locationAddressRu: z.string().optional(),
    locationAddressEn: z.string().optional(),
    hasBuilding: z.boolean().optional(),
    buildingArea: z.number().optional(),
    noteUz: z.string().optional(),
    noteRu: z.string().optional(),
    noteEn: z.string().optional(),
    usageWarningUz: z.string().optional(),
    usageWarningRu: z.string().optional(),
    usageWarningEn: z.string().optional(),
    customerName: z.string().optional(),
    customerType: z.string().optional(),
    customerDistrict: z.string().optional(),
    customerAddress: z.string().optional(),
    customerPhone: z.string().optional(),
    customerExtraPhone: z.string().optional(),
    customerEmail: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    imageUrls: z.array(z.string()).optional(),
});

type LotFormData = z.infer<typeof lotSchema>;

interface LotsFormProps {
    initialData?: Lot;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    onCancel?: () => void;
}

export const LotsForm: React.FC<LotsFormProps> = ({
    initialData,
    onSubmit,
    isLoading = false,
    onCancel,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<LotFormData>({
        resolver: zodResolver(lotSchema),
        defaultValues: initialData ? {
            titleUz: initialData.titleUz,
            titleRu: initialData.titleRu,
            titleEn: initialData.titleEn,
            lotNumber: initialData.lotNumber,
            lotCode: initialData.lotCode,
            status: initialData.status,
            paymentType: initialData.paymentType,
            paymentMonths: initialData.paymentMonths,
            tradeType: initialData.tradeType,
            tradeDate: initialData.tradeDate,
            applicationDeadline: initialData.applicationDeadline,
            tradeLocationUz: initialData.tradeLocationUz,
            tradeLocationRu: initialData.tradeLocationRu,
            tradeLocationEn: initialData.tradeLocationEn,
            addressUz: initialData.addressUz,
            addressRu: initialData.addressRu,
            addressEn: initialData.addressEn,
            region: initialData.region,
            landRightType: initialData.landRightType,
            leaseYears: initialData.leaseYears,
            permittedUseUz: initialData.permittedUseUz,
            permittedUseRu: initialData.permittedUseRu,
            permittedUseEn: initialData.permittedUseEn,
            landCategoryUz: initialData.landCategoryUz,
            landCategoryRu: initialData.landCategoryRu,
            landCategoryEn: initialData.landCategoryEn,
            jobsToCreate: initialData.jobsToCreate,
            requiredInvestmentUz: initialData.requiredInvestmentUz,
            requiredInvestmentRu: initialData.requiredInvestmentRu,
            requiredInvestmentEn: initialData.requiredInvestmentEn,
            hasGas: initialData.hasGas,
            hasElectricity: initialData.hasElectricity,
            hasWater: initialData.hasWater,
            hasSewage: initialData.hasSewage,
            landArea: initialData.landArea,
            distanceToRoad: initialData.distanceToRoad,
            locationAddressUz: initialData.locationAddressUz,
            locationAddressRu: initialData.locationAddressRu,
            locationAddressEn: initialData.locationAddressEn,
            hasBuilding: initialData.hasBuilding,
            buildingArea: initialData.buildingArea,
            noteUz: initialData.noteUz,
            noteRu: initialData.noteRu,
            noteEn: initialData.noteEn,
            usageWarningUz: initialData.usageWarningUz,
            usageWarningRu: initialData.usageWarningRu,
            usageWarningEn: initialData.usageWarningEn,
            customerName: initialData.customerName,
            customerType: initialData.customerType,
            customerDistrict: initialData.customerDistrict,
            customerAddress: initialData.customerAddress,
            customerPhone: initialData.customerPhone,
            customerExtraPhone: initialData.customerExtraPhone,
            customerEmail: initialData.customerEmail,
            latitude: initialData.latitude,
            longitude: initialData.longitude,
            imageUrls: initialData.images?.map((img) => img.url),
        } : {
            status: LotStatus.UPCOMING,
            paymentType: PaymentType.MUDDATLI,
            tradeType: TradeType.TENDER,
            landRightType: LandRightType.IJARA,
            hasGas: false,
            hasElectricity: false,
            hasWater: false,
            hasSewage: false,
            hasBuilding: false,
        },
    });

    const imageUrls = watch('imageUrls') || [];
    const hasGas = watch('hasGas');
    const hasElectricity = watch('hasElectricity');
    const hasWater = watch('hasWater');
    const hasSewage = watch('hasSewage');

    const handleImagesUploaded = (files: UploadResult[]) => {
        setValue('imageUrls', files.map((f) => f.url));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <Card className="p-6 border-l-4 border-l-blue-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    Asosiy Ma'lumot
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Sarlavha (O'zbekcha) *"
                        placeholder="Gofur Gulom Kichik Sanoat Zonasi"
                        error={errors.titleUz?.message}
                        {...register('titleUz')}
                    />
                    <Input
                        label="Lot Raqami *"
                        type="number"
                        placeholder="2"
                        error={errors.lotNumber?.message}
                        {...register('lotNumber', { valueAsNumber: true })}
                    />
                    <Input
                        label="Sarlavha (Rus)"
                        placeholder="Гофур Гулом Малая Промышленная Зона"
                        {...register('titleRu')}
                    />
                    <Input
                        label="Lot Kodi"
                        placeholder="21698113"
                        {...register('lotCode')}
                    />
                    <Input
                        label="Sarlavha (English)"
                        placeholder="Gofur Gulom Small Industrial Zone"
                        {...register('titleEn')}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            {...register('status')}
                        >
                            <option value="upcoming">⏳ Upcoming</option>
                            <option value="active">✅ Active</option>
                            <option value="completed">✔️ Completed</option>
                            <option value="cancelled">❌ Cancelled</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Address Information */}
            <Card className="p-6 border-l-4 border-l-green-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={20} />
                    Manzil Ma'lumoti
                </h3>
                <div className="space-y-4">
                    <Input
                        label="Manzil (O'zbekcha) *"
                        placeholder="Gofur Gulom MFY Dustlik kuchasi"
                        error={errors.addressUz?.message}
                        {...register('addressUz')}
                    />
                    <Input
                        label="Manzil (Rus)"
                        placeholder="Гофур Гулом МФЙ ул. Дустлик"
                        {...register('addressRu')}
                    />
                    <Input
                        label="Manzil (English)"
                        placeholder="Gofur Gulom MFY Dustlik street"
                        {...register('addressEn')}
                    />
                    <Input
                        label="Viloyat"
                        placeholder="Toshkent viloyati"
                        {...register('region')}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Kenglik (Latitude)"
                            type="number"
                            placeholder="41.0567"
                            {...register('latitude', { valueAsNumber: true })}
                        />
                        <Input
                            label="Uzunlik (Longitude)"
                            type="number"
                            placeholder="69.6478"
                            {...register('longitude', { valueAsNumber: true })}
                        />
                    </div>
                </div>
            </Card>

            {/* Trade Information */}
            <Card className="p-6 border-l-4 border-l-purple-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign size={20} />
                    Savdo Ma'lumoti
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Savdo Turi</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            {...register('tradeType')}
                        >
                            <option value="tender">📋 Tender</option>
                            <option value="auction">🔨 Auction</option>
                            <option value="direct">📌 Direct</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To'lov Turi</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            {...register('paymentType')}
                        >
                            <option value="muddatli_bolib_tolash">📅 Muddatli Bo'lib To'lash</option>
                            <option value="naxt">💵 Naxt</option>
                        </select>
                    </div>
                    <Input
                        label="Savdo Sanasi *"
                        type="datetime-local"
                        error={errors.tradeDate?.message}
                        {...register('tradeDate')}
                    />
                    <Input
                        label="Ariza Muddati *"
                        type="datetime-local"
                        error={errors.applicationDeadline?.message}
                        {...register('applicationDeadline')}
                    />
                    {watch('paymentType') === 'muddatli_bolib_tolash' && (
                        <Input
                            label="To'lov Oylar Soni"
                            type="number"
                            placeholder="60"
                            {...register('paymentMonths', { valueAsNumber: true })}
                        />
                    )}
                </div>
            </Card>

            {/* Land Information */}
            <Card className="p-6 border-l-4 border-l-yellow-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Home size={20} />
                    Yer Ma'lumoti
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Yer Huquqi</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            {...register('landRightType')}
                        >
                            <option value="ijara">📄 Ijara</option>
                            <option value="kapital">🏗️ Kapital</option>
                        </select>
                    </div>
                    <Input
                        label="Ijara Yillari"
                        type="number"
                        placeholder="25"
                        {...register('leaseYears', { valueAsNumber: true })}
                    />
                    <Input
                        label="Yer Maydoni (Hektar)"
                        type="number"
                        placeholder="0.1762"
                        step="0.0001"
                        {...register('landArea', { valueAsNumber: true })}
                    />
                    <Input
                        label="Yo'lga Masofa"
                        placeholder="150 m"
                        {...register('distanceToRoad')}
                    />
                </div>

                {/* Utilities */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">⚡ Infra Strukturalar</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register('hasGas')} className="w-4 h-4" />
                            <span className="text-sm text-gray-700">Gas</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register('hasElectricity')} className="w-4 h-4" />
                            <span className="text-sm text-gray-700">Elektr</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register('hasWater')} className="w-4 h-4" />
                            <span className="text-sm text-gray-700">Suv</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register('hasSewage')} className="w-4 h-4" />
                            <span className="text-sm text-gray-700">Kanalizatsiya</span>
                        </label>
                    </div>
                </div>
            </Card>

            {/* Customer Information */}
            <Card className="p-6 border-l-4 border-l-red-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={20} />
                    Xaridor Ma'lumoti
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Ismi"
                        placeholder="Xaridor ismi"
                        {...register('customerName')}
                    />
                    <Input
                        label="Turi"
                        placeholder="Jismoniy / Yuridik"
                        {...register('customerType')}
                    />
                    <Input
                        label="Tuman/Shahar"
                        placeholder="Toshkent shahar"
                        {...register('customerDistrict')}
                    />
                    <Input
                        label="Manzil"
                        placeholder="Manzili"
                        {...register('customerAddress')}
                    />
                    <Input
                        label="Telefon"
                        placeholder="+998 90 000 00 00"
                        {...register('customerPhone')}
                    />
                    <Input
                        label="Qo'shimcha Telefon"
                        placeholder="+998 91 000 00 00"
                        {...register('customerExtraPhone')}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="email@example.com"
                        {...register('customerEmail')}
                    />
                </div>
            </Card>

            {/* Images */}
            <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📸 Rasmlar</h3>
                <MultipleFileUpload
                    folder={UploadFolder.LOTS}
                    onFilesUploaded={handleImagesUploaded}
                    maxFiles={10}
                    existingFiles={initialData?.images?.map((img) => ({
                        url: img.url,
                        fileName: img.url.split('/').pop() || '',
                        originalName: img.url.split('/').pop() || '',
                        size: 0,
                    })) || []}
                    entityId={initialData?.id}
                />
            </Card>

            {/* Additional Information */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Qo'shimcha Ma'lumot</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ruxsat Etilgan Foydalanish (O'z)
                        </label>
                        <textarea
                            placeholder="Qurilish sanoati"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            rows={2}
                            {...register('permittedUseUz')}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Talab Qilinadigan Investitsiya (O'z)
                        </label>
                        <textarea
                            placeholder="1 500 000 000 UZS"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            rows={2}
                            {...register('requiredInvestmentUz')}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Eslatma (O'z)
                        </label>
                        <textarea
                            placeholder="Qo'shimcha eslatma"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            rows={2}
                            {...register('noteUz')}
                        />
                    </div>
                </div>
            </Card>
        </form>
    );
};