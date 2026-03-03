import type { AuthResponse, LoginDto } from "@/types/auth.types";
import client from "./client";

export const authApi = {
    login: (data: LoginDto) => client.post<AuthResponse>('/auth/login', data),
    logout: () => client.post('/auth/logout'),
    getProfile: () => client.get('/auth/profile'),
    refreshToken: (refreshToken: string) => client.post('/auth/refresh', { refreshToken })
}