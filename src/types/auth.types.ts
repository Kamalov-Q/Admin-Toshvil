import type { User } from "./admin.types";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    admin: Partial<User>
} 