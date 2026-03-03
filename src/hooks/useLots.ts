import { lotsApi } from '@/api/lots';
import { useUIStore } from '@/stores/uiStore';
import type { CreateLotDto } from '@/types/lots.types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useLotsList = (page = 1, limit = 10, filters?: any) => {
    return useQuery({
        queryKey: ['lots', page, limit, filters],
        queryFn: () => lotsApi.getAll(page, limit, filters),
    });
};

export const useLotDetail = (id: string) => {
    return useQuery({
        queryKey: ['lot', id],
        queryFn: () => lotsApi.getOne(id),
        enabled: !!id,
    });
};

export const useCreateLot = () => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: CreateLotDto) => lotsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lots'] });
            addToast('Lot created successfully', 'success');
        },
        onError: (error: any) => {
            addToast(error.response?.data?.message || 'Failed to create lot', 'error');
        },
    });
};

export const useUpdateLot = (id: string) => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: Partial<CreateLotDto>) => lotsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lots'] });
            queryClient.invalidateQueries({ queryKey: ['lot', id] });
            addToast('Lot updated successfully', 'success');
        },
        onError: (error: any) => {
            addToast(error.response?.data?.message || 'Failed to update lot', 'error');
        },
    });
};

export const useDeleteLot = () => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (id: string) => lotsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lots'] });
            addToast('Lot deleted successfully', 'success');
        },
        onError: (error: any) => {
            addToast(error.response?.data?.message || 'Failed to delete lot', 'error');
        },
    });
};