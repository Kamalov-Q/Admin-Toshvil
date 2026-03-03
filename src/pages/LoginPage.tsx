import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { Card } from '@/components/ui/card';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                <Card className="p-8">
                    <LoginForm onSuccess={() => navigate('/dashboard')} />
                </Card>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Demo credentials: admin@gmail.com / parol123
                </p>
            </div>
        </div>
    );
};