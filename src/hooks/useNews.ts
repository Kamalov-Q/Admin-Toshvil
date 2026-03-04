import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newsApi } from '../api/news';
import { useUIStore } from '@/stores/uiStore';
import type { CreateNewsDto } from '@/types/news.types';

export const useNewsList = (page = 1, limit = 10, category?: string, search?: string) => {
    return useQuery({
        queryKey: ['news', page, limit, category, search],
        queryFn: () => newsApi.getAll(page, limit, category, search).then((res) => res.data),
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    });
};

export const useNewsDetail = (id: string) => {
    return useQuery({
        queryKey: ['news', id],
        queryFn: () => newsApi.getOne(id).then((res) => res.data),
        enabled: !!id,
    });
};

export const useCreateNews = () => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: CreateNewsDto) =>
            newsApi.create(data).then((res) => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            addToast('✅ News article created successfully', 'success');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to create news article';
            addToast(`❌ ${message}`, 'error');
            console.error('Create news error:', error);
        },
    });
};

export const useUpdateNews = (id: string) => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: Partial<CreateNewsDto>) =>
            newsApi.update(id, data).then((res) => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            queryClient.invalidateQueries({ queryKey: ['news', id] });
            addToast('✅ News article updated successfully', 'success');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update news article';
            addToast(`❌ ${message}`, 'error');
            console.error('Update news error:', error);
        },
    });
};

export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (id: string) => newsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            addToast('✅ News article deleted successfully', 'success');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to delete news article';
            addToast(`❌ ${message}`, 'error');
            console.error('Delete news error:', error);
        },
    });
};