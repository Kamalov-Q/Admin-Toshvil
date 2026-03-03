import { create } from 'zustand';

interface UIState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
    removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toasts: [],
    addToast: (message, type) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, message, type }],
        }));
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t?.id !== id),
            }));
        }, 2000);
    },
    removeToast: (id: string) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t?.id !== id),
        }))
    }
}))