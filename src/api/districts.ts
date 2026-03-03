import type { PaginatedResponse } from "@/types/pagination.types";
import client from "./client";
import type { CreateDistrictDto, District } from "@/types/district.types";


export const districtApi = {
    getAll: (page = 1, limit = 10, type?: string, search?: string) => client.get<PaginatedResponse<District>>('/districts', {
        params: { page, limit, type, search },
    }),
    getOne: (id: string) => client.get<District>(`/districts/${id}`),
    create: (data: CreateDistrictDto) => client.post<District>('/districts', data),
    update: (id: string, data: Partial<CreateDistrictDto>) => client.patch<District>(`/districts/${id}`, data),
    delete: (id: string) => client.delete(`/districts/${id}`)
}