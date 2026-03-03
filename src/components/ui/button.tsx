import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center font-medium rounded-lg transition-colors',
          {
            'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-300': variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50': variant === 'secondary',
            'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300': variant === 'danger',
            'hover:bg-gray-100 text-gray-700': variant === 'ghost',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
            'opacity-50 cursor-not-allowed': disabled || loading,
          },
          className
        )}
        {...props}
      >
        {loading && <span className="mr-2 animate-spin">⏳</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';