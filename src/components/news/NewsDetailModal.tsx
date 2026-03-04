import React from 'react';
import { format } from 'date-fns';
import { Eye, Calendar, Tag } from 'lucide-react';
import type { News } from '@/types/news.types';
import { Dialog } from '../ui/dialog';

interface NewsDetailModalProps {
    news: News | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
    news,
    open,
    onOpenChange,
}) => {
    if (!news) return null;
 
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
            title="News Article Details"
        >
            <div className="space-y-6">
                {/* Image */}
                {news.image && (
                    <img
                        src={news.image}
                        alt={news.titleUz}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                )}

                {/* Metadata */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                            <Eye size={16} />
                            <span className="text-xs font-medium">Views</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900">{news.viewCount}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-purple-600 mb-1">
                            <Tag size={16} />
                            <span className="text-xs font-medium">Category</span>
                        </div>
                        <p className="text-lg font-bold text-purple-900">{news.category || 'N/A'}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-600 mb-1">
                            <Calendar size={16} />
                            <span className="text-xs font-medium">Status</span>
                        </div>
                        <p className="text-lg font-bold text-green-900">
                            {news.isPublished ? 'Published' : 'Draft'}
                        </p>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="space-y-4">
                    {/* Uzbek */}
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">🇺🇿 Uzbek</h4>
                        <h5 className="font-medium text-gray-800 mb-2">{news.titleUz}</h5>
                        <p className="text-sm text-gray-600 mb-2">{news.descriptionUz}</p>
                        {news.shortDescriptionUz && (
                            <p className="text-xs text-gray-500 italic">{news.shortDescriptionUz}</p>
                        )}
                    </div>

                    {/* Russian */}
                    {news.titleRu && (
                        <div className="border-l-4 border-red-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">🇷🇺 Russian</h4>
                            <h5 className="font-medium text-gray-800 mb-2">{news.titleRu}</h5>
                            <p className="text-sm text-gray-600 mb-2">{news.descriptionRu}</p>
                            {news.shortDescriptionRu && (
                                <p className="text-xs text-gray-500 italic">{news.shortDescriptionRu}</p>
                            )}
                        </div>
                    )}

                    {/* English */}
                    {news.titleEn && (
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">🇬🇧 English</h4>
                            <h5 className="font-medium text-gray-800 mb-2">{news.titleEn}</h5>
                            <p className="text-sm text-gray-600 mb-2">{news.descriptionEn}</p>
                            {news.shortDescriptionEn && (
                                <p className="text-xs text-gray-500 italic">{news.shortDescriptionEn}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Timestamps */}
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                    <p>Created: {format(new Date(news.createdAt), 'PPpp')}</p>
                    <p>Last Updated: {format(new Date(news.updatedAt), 'PPpp')}</p>
                    {news.publishedAt && (
                        <p>Published: {format(new Date(news.publishedAt), 'PPpp')}</p>
                    )}
                </div>
            </div>
        </Dialog>
    );
};