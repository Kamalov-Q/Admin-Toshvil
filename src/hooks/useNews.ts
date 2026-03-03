import { newsApi } from "@/api/news"
import { useUIStore } from "@/stores/uiStore";
import type { CreateNewsDto } from "@/types/news.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useNewsList = (page = 1, limit = 10, category?: string, search?: string) => {
    return useQuery({
        queryKey: ['news', page, limit, category, search],
        queryFn: () => newsApi.getAll(page, limit, category, search),
    });
};

export const useNewsDetail = (id: string) => {
    return useQuery({
        queryKey: ['news', id],
        queryFn: () => newsApi.getOne(id),
        enabled: !!id,
    });
};

export const useCreateNews = () => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: CreateNewsDto) => newsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            addToast('News created successful!', 'success');
        },
        onError: (error: any) => {
            addToast(error?.response?.data?.message || 'Failed to create news!', 'error');
        },
    });
};

export const useUpdateNews = (id: string) => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: Partial<CreateNewsDto>) => newsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            queryClient.invalidateQueries({ queryKey: ['news', id] });
            addToast('News updated successfully!', 'success');
        },
        onError: (error: any) => {
            addToast(error?.response?.data?.message || 'Failed to update news!', 'error');
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
            addToast('News deleted successfully!', 'success');
        },
        onError: (error: any) => {
            addToast(error?.response?.data?.message || 'Failed to delete news!', 'error');
        },
    });
};