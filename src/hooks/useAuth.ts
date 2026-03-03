import { authApi } from "@/api/auth";
import { useAuthStore } from "@/stores/authStore"
import { useUIStore } from "@/stores/uiStore";
import type { LoginDto } from "@/types/auth.types";
import { useMutation, useQuery } from '@tanstack/react-query';


export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const addToast = useUIStore((state) => state.addToast);

    return useMutation({
        mutationFn: (credentials: LoginDto) => authApi.login(credentials),
        onSuccess: (response) => {
            setAuth(response.data);
            addToast('Login successful!', 'success');
        },
        onError: (error: any) => {
            addToast(error?.response?.data?.message || 'Login failed!', 'error');
        }
    })
}

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            logout();
        },
    });
};

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => authApi.getProfile(),
        enabled: useAuthStore((state) => state.isAuthenticated),
    });
};