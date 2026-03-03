import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('bg-white rounded-lg border border-gray-200 shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';