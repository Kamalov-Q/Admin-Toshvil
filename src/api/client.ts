import { useAuthStore } from "@/stores/authStore";
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios"

export const API_BASE_URL = import.meta.env.VITE_API_URL;

const client: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));


// Response interceptor 
client.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;
            const { refreshToken } = useAuthStore.getState();

            if (refreshToken) {
                try {
                    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                        refreshToken
                    });

                    const { accessToken, refreshToken: newRefreshToken } = response.data;
                    useAuthStore.getState().setTokens(accessToken, newRefreshToken);
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return client(originalRequest);
                }
                catch (refreshError) {
                    useAuthStore.getState().logout();
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
)

export default client;