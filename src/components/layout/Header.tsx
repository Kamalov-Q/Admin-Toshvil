import React from 'react';
import { SidebarToggle } from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '../ui/button';

export const Header: React.FC = () => {
    const { admin, logout } = useAuthStore();
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <SidebarToggle />
                    <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{admin?.fullName}</p>
                        <p className="text-xs text-gray-500">{admin?.role}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className='cursor-pointer'
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
};