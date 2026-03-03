import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-between mt-6">
            <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                <ChevronLeft size={16} className="mr-1" />
                Previous
            </Button>
            <span className="text-gray-600">
                Page {page} of {totalPages}
            </span>
            <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next
                <ChevronRight size={16} className="ml-1" />
            </Button>
        </div>
    );
};