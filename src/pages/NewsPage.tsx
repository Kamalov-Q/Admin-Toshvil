import React, { useState } from 'react';
import { NewsTable } from '../components/news/NewsTable';
import { NewsForm } from '../components/news/NewsForm';
import { NewsFilter } from '../components/news/NewsFilter';
import { NewsDetailModal } from '../components/news/NewsDetailModal';
import { useNewsList, useCreateNews, useUpdateNews, useDeleteNews } from '../hooks/useNews';
import type { News } from '../types/news.types';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

export const NewsPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [selectedNews, setSelectedNews] = useState<News | null>(null);

    const { data, isLoading, refetch } = useNewsList(page, 10, category, search);
    const { mutate: createNews, isPending: isCreating } = useCreateNews();
    const { mutate: updateNews, isPending: isUpdating } = useUpdateNews(editingNews?.id || '');
    const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

    const handleCreateNew = () => {
        setEditingNews(null);
        setDialogOpen(true);
    };

    const handleEdit = (news: News) => {
        setEditingNews(news);
        setDialogOpen(true);
    };

    const handleViewDetails = (news: News) => {
        setSelectedNews(news);
        setDetailOpen(true);
    };

    const handleSubmit = (formData: any) => {
        if (editingNews) {
            updateNews(formData, {
                onSuccess: () => {
                    setDialogOpen(false);
                    setEditingNews(null);
                    setPage(1);
                },
            });
        } else {
            createNews(formData, {
                onSuccess: () => {
                    setDialogOpen(false);
                    setPage(1);
                },
            });
        }
    };

    const handleDelete = (id: string) => {
        deleteNews(id, {
            onSuccess: () => {
                if ((data?.data?.length || 0) <= 1 && page > 1) {
                    setPage(page - 1);
                }
            },
        });
    };

    const handleResetFilters = () => {
        setSearch('');
        setCategory('');
        setPage(1);
    };

    const totalPages = Math.ceil((data?.total || 0) / 10);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📰 Yangiliklar Boshqaruvi</h1>
                    <p className="text-gray-600 mt-1">
                        Yangiliklar yaratish, tahrirlash va boshqarish
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={() => refetch()}
                        disabled={isLoading}
                        title="Sahifani yangilash"
                    >
                        <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                    </Button>
                    <Button onClick={handleCreateNew}>
                        <Plus size={20} className="mr-2" />
                        Yangi Yangilik
                    </Button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 shadow-sm">
                    <p className="text-blue-600 text-sm font-medium">📊 Jami Yangiliklar</p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">{data?.total || 0}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 shadow-sm">
                    <p className="text-purple-600 text-sm font-medium">📄 Joriy Sahifa</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">{page}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200 shadow-sm">
                    <p className="text-green-600 text-sm font-medium">📑 Jami Sahifalar</p>
                    <p className="text-3xl font-bold text-green-900 mt-2">{totalPages || 1}</p>
                </div>
            </div>

            {/* Filters */}
            <NewsFilter
                search={search}
                category={category}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPage(1);
                }}
                onCategoryChange={(value) => {
                    setCategory(value);
                    setPage(1);
                }}
                onReset={handleResetFilters}
            />

            {/* News Table */}
            <NewsTable
                news={data?.data || []}
                isLoading={isLoading || isDeleting}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Create/Edit Dialog */}
            <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={editingNews ? '✏️ Yangilikni Tahrirlash' : '➕ Yangi Yangilik Yaratish'}
            >
                <NewsForm
                    initialData={editingNews || undefined}
                    onSubmit={handleSubmit}
                    isLoading={isCreating || isUpdating}
                />
            </Dialog>

            {/* Detail Modal */}
            <NewsDetailModal
                news={selectedNews}
                open={detailOpen}
                onOpenChange={setDetailOpen}
            />
        </div>
    );
};