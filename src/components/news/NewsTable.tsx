import React, { useState } from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import type { News } from '@/types/news.type';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Pagination } from '../Pagination';
import { format } from 'date-fns'

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

    if (isLoading) {
        return <Card className="p-6"><div className="animate-pulse h-64 bg-gray-200 rounded"></div></Card>;
    }

    return (
        <Card className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Views</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
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
                                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.titleUz}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                        {item.category || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${item.isPublished
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {item.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Eye size={16} />
                                        <span className="text-sm">{item.viewCount}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className={`flex gap-2 justify-end ${hoveredId !== item.id && 'opacity-0'}`}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                        >
                                            <Edit2 size={16} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => onDelete(item.id)}
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
                <div className="px-6 py-4 border-t border-gray-200">
                    <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
                </div>
            )}
        </Card>
    );
};