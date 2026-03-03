import type { Admin } from "./admin.types";

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    admin: Partial<Admin>
} 