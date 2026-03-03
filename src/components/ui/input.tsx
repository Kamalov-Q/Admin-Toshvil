import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200',
            'transition-colors',
            {
              'border-gray-300': !error,
              'border-red-500 focus:border-red-500 focus:ring-red-200': error,
            },
            className
          )}
          {...props}
        />
        {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
        {helperText && <span className="text-sm text-gray-500 mt-1">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';