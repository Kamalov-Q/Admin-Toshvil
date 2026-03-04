import React from 'react';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { AlertTriangle } from 'lucide-react';
import type { News } from '@/types/news.types';
import { Card } from '../ui/card';

interface DeleteNewsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    news: News | null;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
}

export const DeleteNewsModal: React.FC<DeleteNewsModalProps> = ({
    open,
    onOpenChange,
    news,
    isLoading = false,
    onConfirm,
    onCancel,
}) => {
    if (!news) return null;

    return (
        <>
            <DeleteConfirmModal
                open={open}
                onOpenChange={onOpenChange}
                title="Delete News Article"
                description="Removing this news article will:"
                itemName={`"${news.titleUz}${news.titleRu ? ` / ${news.titleRu}` : ''}"`}
                isLoading={isLoading}
                isDangerous={true}
                onConfirm={onConfirm}
                onCancel={onCancel}
                confirmText="Delete Article"
                cancelText="Cancel"
            />
            {/* Additional Info */}
            <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <AlertTriangle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Impact of deletion:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>The article will be permanently removed from the database</li>
                            <li>Associated image will be deleted from CDN</li>
                            <li>All view statistics will be lost</li>
                            <li>This action cannot be reversed</li>
                        </ul>
                    </div>
                </div>

                {/* Article Preview */}
                <Card className="p-4 bg-gray-50 border-gray-200">
                    <p className="text-xs text-gray-600 mb-2 font-medium">Article Details:</p>
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium text-gray-900">{news.category || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-medium text-gray-900">
                                {news.isPublished ? '✅ Published' : '📝 Draft'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Views:</span>
                            <span className="font-medium text-gray-900">{news.viewCount}</span>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};