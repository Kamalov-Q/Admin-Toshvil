import type { PaginatedResponse } from "@/types/pagination.types";
import client from "./client";
import type { CreateLotDto, Lot } from "@/types/lots.types";


export const lotsApi = {
    getAll: (page = 1, limit = 10, filters?: any) => client.get<PaginatedResponse<Lot>>('/lots/admin/all', {
        params: { page, limit, ...filters },
    }),
    getOne: (id: string) => client.get<Lot>(`/lots/${id}`),
    create: (data: CreateLotDto) => client.post<Lot>('/lots', data),
    update: (id: string, data: Partial<CreateLotDto>) => client.patch<Lot>(`/lots/${id}`, data),
    delete: (id: string) => client.delete(`/lots/${id}`),
};

