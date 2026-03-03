import React, { useState } from 'react';
import { NewsTable } from '../components/news/NewsTable';
import { NewsForm } from '../components/news/NewsForm';
import { useNewsList, useCreateNews, useUpdateNews, useDeleteNews } from '../hooks/useNews';
import { Plus, Search } from 'lucide-react';
import type { News } from '@/types/news.type';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';

export const NewsPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);

    const { data, isLoading } = useNewsList(page, 10, undefined, search);
    const { mutate: createNews, isPending: isCreating } = useCreateNews();
    const { mutate: updateNews, isPending: isUpdating } = useUpdateNews(editingNews?.id || '');
    const { mutate: deleteNews } = useDeleteNews();

    const handleSubmit = (formData: any) => {
        if (editingNews) {
            updateNews(formData, {
                onSuccess: () => {
                    setDialogOpen(false);
                    setEditingNews(null);
                },
            });
        } else {
            createNews(formData, {
                onSuccess: () => {
                    setDialogOpen(false);
                },
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
                    <p className="text-gray-600 mt-1">Create and manage news articles</p>
                </div>
                <Button
                    onClick={() => {
                        setEditingNews(null);
                        setDialogOpen(true);
                    }}
                >
                    <Plus size={20} className="mr-2" />
                    New Article
                </Button>
            </div>

            <Card className="p-4">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search news..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                </div>
            </Card>

            <NewsTable
                news={data?.data.data || []}
                isLoading={isLoading}
                page={page}
                totalPages={Math.ceil((data?.data.total || 0) / 10)}
                onPageChange={setPage}
                onEdit={(news) => {
                    setEditingNews(news);
                    setDialogOpen(true);
                }}
                onDelete={(id) => {
                    if (confirm('Are you sure?')) {
                        deleteNews(id);
                    }
                }}
            />

            <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={editingNews ? 'Edit News' : 'Create News'}
            >
                <NewsForm
                    initialData={editingNews || undefined}
                    onSubmit={handleSubmit}
                    isLoading={isCreating || isUpdating}
                />
            </Dialog>
        </div>
    );
};