import type { PaginatedResponse } from "@/types/pagination.types";
import client from "./client";
import type { CreateNewsDto, News } from "@/types/news.type";

export const newsApi = {
    getAll: (page = 1, limit = 10, category?: string, search?: string) => client.get<PaginatedResponse<News>>('/news/admin',
        {
            params: { page, limit, category, search }
        }
    ),
    getOne: (id: string) => client.get<News>(`/news/${id}`),
    create: (data: CreateNewsDto) => client.post<News>('/news', data),
    update: (id: string, data: Partial<CreateNewsDto>) => client.patch<News>(`/news/${id}`, data),
    delete: (id: string) => client.delete(`/news/${id}`),
};