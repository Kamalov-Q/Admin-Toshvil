import type { Admin } from "@/types/admin.types"
import type { AuthResponse } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface AuthState {
    admin: Partial<Admin> | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    setAuth: (response: AuthResponse) => void;
    logout: () => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        admin: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        setAuth: (response) => {
            set({
                admin: response.admin,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                isAuthenticated: true
            });
        },
        logout: () => {
            set({
                admin: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false
            });
        },
        setTokens(accessToken, refreshToken) {
            set({
                accessToken,
                refreshToken
            })
        },
    }), { name: 'auth-storage' }),
)