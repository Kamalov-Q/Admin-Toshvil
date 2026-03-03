import React from 'react';

export const Loading: React.FC = () => (
    <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
);

export const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 5 }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse mb-2"></div>
        ))}
    </>
);