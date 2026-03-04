import React, { useState } from 'react';
import { Edit2, Trash2, Eye, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { News } from '@/types/news.types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Pagination } from '../Pagination';

interface NewsTableProps {
    news: News[];
    isLoading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEdit: (news: News) => void;
    onDelete: (id: string) => void;
}

export const NewsTable: React.FC<NewsTableProps> = ({
    news,
    isLoading,
    page,
    totalPages,
    onPageChange,
    onEdit,
    onDelete,
}) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            setDeletingId(id);
            onDelete(id);
        }
    };

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                </div>
            </Card>
        );
    }

    if (news.length === 0) {
        return (
            <Card className="p-12 text-center">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No news articles found</h3>
                <p className="text-gray-600">Create your first news article to get started.</p>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Views
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Created
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {news.map((item) => (
                            <tr
                                key={item.id}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.titleUz}
                                                className="w-10 h-10 rounded object-cover"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {item.titleUz}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {item.titleRu || 'No Russian title'}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                                        {item.category || 'Other'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${item.isPublished
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {item.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Eye size={16} />
                                        <span className="text-sm font-medium">{item.viewCount}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className={`flex gap-2 justify-end ${hoveredId !== item.id && 'opacity-0'}`}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(item.id)}
                                            disabled={deletingId === item.id}
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
                </div>
            )}
        </Card>
    );
};