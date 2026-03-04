import client from './client';
import type { Lot, CreateLotDto } from '../types/lots.types';
import type { PaginatedResponse } from '@/types/pagination.types';

export const lotsApi = {
    // Get all lots with filters and pagination
    getAll: (page = 1, limit = 10, filters?: any) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        if (filters?.status) params.append('status', filters.status);
        if (filters?.paymentType) params.append('paymentType', filters.paymentType);
        if (filters?.tradeType) params.append('tradeType', filters.tradeType);
        if (filters?.districtId) params.append('districtId', filters.districtId);
        if (filters?.search) params.append('search', filters.search);

        return client.get<{ data: PaginatedResponse<Lot> }>(`/lots/admin?${params.toString()}`);
    },

    // Get single lot
    getOne: (id: string) =>
        client.get<Lot>(`/lots/${id}`),

    // Create new lot
    create: (data: CreateLotDto) =>
        client.post<Lot>('/lots', data),

    // Update lot
    update: (id: string, data: Partial<CreateLotDto>) =>
        client.patch<Lot>(`/lots/${id}`, data),

    // Delete lot
    delete: (id: string) =>
        client.delete(`/lots/${id}`),

    // Get lot statistics
    getStats: () =>
        client.get('/lots/stats'),
};