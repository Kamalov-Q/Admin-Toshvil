import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLogin } from '../../hooks/useAuth';
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const { mutate: login, isPending } = useLogin();

    const onSubmit = (data: LoginFormData) => {
        login(data, {
            onSuccess,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Email"
                type="email"
                placeholder="admin@example.com"
                error={errors.email?.message}
                {...register('email')}
            />
            <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
            />
            <Button type="submit" loading={isPending} className="w-full">
                Sign In
            </Button>
        </form>
    );
};