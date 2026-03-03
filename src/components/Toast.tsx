import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

export const Toast: React.FC = () => {
    const { toasts, removeToast } = useUIStore();

    return (
        <div className="fixed bottom-4 right-4 z-40 space-y-2 max-w-sm">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`flex items-center gap-3 p-4 rounded-lg text-white shadow-lg animate-in slide-in-from-right-full ${toast.type === 'success'
                            ? 'bg-green-600'
                            : toast.type === 'error'
                                ? 'bg-red-600'
                                : 'bg-blue-600'
                        }`}
                >
                    {toast.type === 'success' && <CheckCircle size={20} />}
                    {toast.type === 'error' && <AlertCircle size={20} />}
                    {toast.type === 'info' && <Info size={20} />}
                    <span className="flex-1">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="hover:bg-white/20 rounded p-1"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};