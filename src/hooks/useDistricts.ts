import { districtApi } from '@/api/districts';
import { useUIStore } from '@/stores/uiStore';
import type { CreateDistrictDto } from '@/types/district.types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useDistrictsList = (page = 1, limit = 10, type?: string, search?: string) => {
    return useQuery({
        queryKey: ['districts', page, limit, type, search],
        queryFn: () => districtApi.getAll(page, limit, type, search),
    });
};

export const useDistrictDetail = (id: string) => {
    return useQuery({
        queryKey: ['district', id],
        queryFn: () => districtApi.getOne(id),
        enabled: !!id,
    });
};

export const useCreateDistrict = () => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: CreateDistrictDto) => districtApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['districts'] });
            addToast('District created successfully', 'success');
        },
        onError: (error: any) => {
            addToast(error.response?.data?.message || 'Failed to create district', 'error');
        },
    });
};

export const useUpdateDistrict = (id: string) => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (data: Partial<CreateDistrictDto>) => districtApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['districts'] });
            queryClient.invalidateQueries({ queryKey: ['district', id] });
            addToast('District updated successfully', 'success');
        },
        onError: (error: any) => {
            addToast(error.response?.data?.message || 'Failed to update district', 'error');
        },
    });
};

export const useDeleteDistrict = () => {
    const queryClient = useQueryClient();
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (id: string) => districtApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['districts'] });
            addToast('District deleted successfully', 'success');
        },
        onError: (error: any) => {
            addToast(error.response?.data?.message || 'Failed to delete district', 'error');
        },
    });
};