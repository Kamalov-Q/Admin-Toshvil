import React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import type { News } from '@/types/news.type';
import { Button } from '../ui/button';

interface NewsFormProps {
    initialData?: News;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export const NewsForm: React.FC<NewsFormProps> = ({ initialData, onSubmit, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {},
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Uzbek Content</h3>
                <div className="space-y-4">
                    <Input
                        label="Title (Uzbek)"
                        placeholder="Enter title in Uzbek"
                        error={errors.titleUz?.message as string}
                        {...register('titleUz', { required: 'Title is required' })}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (Uzbek)
                        </label>
                        <textarea
                            placeholder="Enter description in Uzbek"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            rows={4}
                            {...register('descriptionUz', { required: 'Description is required' })}
                        />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Russian Content</h3>
                <div className="space-y-4">
                    <Input
                        label="Title (Russian)"
                        placeholder="Enter title in Russian"
                        {...register('titleRu')}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (Russian)
                        </label>
                        <textarea
                            placeholder="Enter description in Russian"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            rows={4}
                            {...register('descriptionRu')}
                        />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">English Content</h3>
                <div className="space-y-4">
                    <Input
                        label="Title (English)"
                        placeholder="Enter title in English"
                        {...register('titleEn')}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (English)
                        </label>
                        <textarea
                            placeholder="Enter description in English"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            rows={4}
                            {...register('descriptionEn')}
                        />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Settings</h3>
                <div className="space-y-4">
                    <Input
                        label="Image URL"
                        placeholder="https://example.com/image.jpg"
                        {...register('image')}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <input type="checkbox" {...register('isPublished')} className="mr-2" />
                            Publish immediately
                        </label>
                    </div>
                </div>
            </Card>

            <div className="flex gap-3 justify-end">
                <Button type="submit" loading={isLoading}>
                    {initialData ? 'Update News' : 'Create News'}
                </Button>
            </div>
        </form>
    );
};