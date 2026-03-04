import React from 'react';
import { Search, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface NewsFilterProps {
    search: string;
    category: string;
    onSearchChange: (search: string) => void;
    onCategoryChange: (category: string) => void;
    onReset: () => void;
}

export const NewsFilter: React.FC<NewsFilterProps> = ({
    search,
    category,
    onSearchChange,
    onCategoryChange,
    onReset,
}) => {
    return (
        <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search news by title, description..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="w-full md:w-48">
                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {(search || category) && (
                    <Button variant="secondary" onClick={onReset}>
                        <X size={16} className="mr-1" />
                        Clear Filters
                    </Button>
                )}
            </div>
        </Card>
    );
};