import type { PaginatedResponse } from "@/types/pagination.types";
import client from "./client";
import type { CreateNewsDto, News } from "@/types/news.types";

export const newsApi = {
    getAll: (
        page = 1,
        limit = 10,
        category?: string,
        search?: string
    ) => {
        const params: Record<string, any> = { page, limit };

        if (category) params.category = category;
        if (search) params.search = search;

        return client.get<PaginatedResponse<News>>(
            '/news/admin/all',
            { params }
        );
    },
    getOne: (id: string) => client.get<News>(`/news/${id}`),
    create: (data: CreateNewsDto) => client.post<News>('/news/admin', data),
    update: (id: string, data: Partial<CreateNewsDto>) => client.patch<News>(`/news/admin/${id}`, data),
    delete: (id: string) => client.delete(`/news/admin/${id}`),
};