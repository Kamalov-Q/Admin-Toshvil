import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lotsApi } from '../api/lots';
import type { CreateLotDto } from '../types/lots.types';
import { useUIStore } from '@/stores/uiStore';

export const useLotsList = (page = 1, limit = 10, filters?: any) => {
    return useQuery({
        queryKey: ['lots', page, limit, filters],
        queryFn: () => lotsApi.getAll(page, limit, filters).then((res) => res.data),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

export const useLotDetail = (id: string) => {
    return useQuery({
        queryKey: ['lot', id],
        queryFn: () => lotsApi.getOne(id).then((res) => res.data),
        enabled: !!id,
    });
};

export const useCreateLot = () => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: CreateLotDto) =>
            lotsApi.create(data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lots'] });
            addToast('Lot yaratildi', 'success');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Lotni yaratishda xatolik';
            addToast(`${message}`, 'error');
            console.error('Create lot error:', error);
        },
    });
};

export const useUpdateLot = (id: string) => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: Partial<CreateLotDto>) =>
            lotsApi.update(id, data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lots'] });
            queryClient.invalidateQueries({ queryKey: ['lot', id] });
            addToast('Lot yangilandi', 'success');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Lotni yangilashda xatolik';
            addToast(`${message}`, 'error');
            console.error('Update lot error:', error);
        },
    });
};

export const useDeleteLot = () => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (id: string) =>
            lotsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lots'] });
            addToast('Lot o\'chirildi', 'success');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Lotni o\'chirishda xatolik';
            addToast(`${message}`, 'error');
            console.error('Delete lot error:', error);
        },
    });
};