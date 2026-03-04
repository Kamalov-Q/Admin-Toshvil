import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle } from 'lucide-react';
import type { News } from '@/types/news.types';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { ImageUploadField } from '../upload/UploadField';

const newsSchema = z.object({
    titleUz: z.string().min(3, 'Sarlavha kamida 3 ta belgidan iborat bo\'lishi kerak'),
    titleRu: z.string().optional(),
    titleEn: z.string().optional(),
    descriptionUz: z.string().min(10, 'Tavsif kamida 10 ta belgidan iborat bo\'lishi kerak'),
    descriptionRu: z.string().optional(),
    descriptionEn: z.string().optional(),
    shortDescriptionUz: z.string().optional(),
    shortDescriptionRu: z.string().optional(),
    shortDescriptionEn: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    isPublished: z.boolean().optional(),
});

type NewsFormData = z.infer<typeof newsSchema>;

interface NewsFormProps {
    initialData?: News;
    onSubmit: (data: NewsFormData) => void;
    isLoading?: boolean;
}

export const NewsForm: React.FC<NewsFormProps> = ({ initialData, onSubmit, isLoading = false }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<NewsFormData>({
        resolver: zodResolver(newsSchema),
        defaultValues: initialData ? {
            titleUz: initialData.titleUz,
            titleRu: initialData.titleRu,
            titleEn: initialData.titleEn,
            descriptionUz: initialData.descriptionUz,
            descriptionRu: initialData.descriptionRu,
            descriptionEn: initialData.descriptionEn,
            shortDescriptionUz: initialData.shortDescriptionUz,
            shortDescriptionRu: initialData.shortDescriptionRu,
            shortDescriptionEn: initialData.shortDescriptionEn,
            image: initialData.image,
            category: initialData.category,
            isPublished: initialData.isPublished,
        } : {
            isPublished: false,
        },
    });

    const imageUrl = watch('image');
    watch('isPublished');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Uzbek Content Section */}
            <Card className="p-6 border-l-4 border-l-blue-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🇺🇿</span>
                    O'zbekcha Mazmun
                </h3>
                <div className="space-y-4">
                    <Input
                        label="Sarlavha (O'zbekcha) *"
                        placeholder="Yangi hukumat portali ishga tushirildi"
                        error={errors.titleUz?.message}
                        {...register('titleUz')}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To'liq Tavsif (O'zbekcha) *
                        </label>
                        <textarea
                            placeholder="Rasmiy hukumat portali yangi xususiyatlar bilan yangilandi..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent transition-all"
                            rows={4}
                            {...register('descriptionUz')}
                        />
                        {errors.descriptionUz && (
                            <span className="text-sm text-red-600 mt-1 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.descriptionUz.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Qisqacha Tavsif (O'zbekcha)
                        </label>
                        <textarea
                            placeholder="Qisqacha mazmun..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent transition-all"
                            rows={2}
                            {...register('shortDescriptionUz')}
                        />
                    </div>
                </div>
            </Card>

            {/* Russian Content Section */}
            <Card className="p-6 border-l-4 border-l-red-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🇷🇺</span>
                    Русский Контент
                </h3>
                <div className="space-y-4">
                    <Input
                        label="Заголовок (Русский)"
                        placeholder="Запущен новый правительственный портал"
                        {...register('titleRu')}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Описание (Русский)
                        </label>
                        <textarea
                            placeholder="Описание на русском языке..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent transition-all"
                            rows={4}
                            {...register('descriptionRu')}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Краткое описание (Русский)
                        </label>
                        <textarea
                            placeholder="Краткое описание..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent transition-all"
                            rows={2}
                            {...register('shortDescriptionRu')}
                        />
                    </div>
                </div>
            </Card>

            {/* English Content Section */}
            <Card className="p-6 border-l-4 border-l-green-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🇬🇧</span>
                    English Content
                </h3>
                <div className="space-y-4">
                    <Input
                        label="Title (English)"
                        placeholder="New government portal launched"
                        {...register('titleEn')}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (English)
                        </label>
                        <textarea
                            placeholder="Description in English..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent transition-all"
                            rows={4}
                            {...register('descriptionEn')}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Short Description (English)
                        </label>
                        <textarea
                            placeholder="Brief description..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent transition-all"
                            rows={2}
                            {...register('shortDescriptionEn')}
                        />
                    </div>
                </div>
            </Card>

            {/* Image and Settings Section */}
            <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📸 Media va Sozlamalar</h3>
                <div className="space-y-6">
                    {/* Image Upload Field */}
                    <ImageUploadField
                        label="Yangilik uchun rasm"
                        value={imageUrl || ''}
                        onChange={(url) => setValue('image', url)}
                        error={errors.image?.message}
                        helperText="Rasm yuklang yoki URL sini kiriting (JPG, PNG, WebP)"
                        entityId={initialData?.id}
                    />

                    {/* Category Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📁 Category
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            {...register('category')}
                        >
                            <option value="">-- Kategoriya tanlang --</option>
                            <option value="announcements">Announcement</option>
                            <option value="events">Events</option>
                            <option value="technology">Technology</option>
                            <option value="press_release">Press Release</option>
                            <option value="other">Others</option>

                        </select>
                    </div>

                    {/* Publish Settings */}
                    <div className="bg-white rounded-lg p-4 border-2 border-primary-200">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                {...register('isPublished')}
                            />
                            <span className="ml-3">
                                <span className="font-medium text-gray-900 block">
                                    🚀 Darhol nashr qiling
                                </span>
                                <p className="text-sm text-gray-600">
                                    Yangilik foydalanuvchilarga ko'rinadi
                                </p>
                            </span>
                        </label>
                    </div>
                </div>
            </Card>
        </form>
    );
};