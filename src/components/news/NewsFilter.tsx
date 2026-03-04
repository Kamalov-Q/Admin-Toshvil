import React, { useState, useEffect } from 'react';
import { Search, X, Filter, Loader } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface NewsFilterProps {
    search: string;
    category: string;
    onSearchChange: (search: string) => void;
    onCategoryChange: (category: string) => void;
    onReset: () => void;
    isSearching?: boolean;
}

const MAX_SEARCH_LENGTH = 100;
const MIN_SEARCH_LENGTH = 3;

export const NewsFilter: React.FC<NewsFilterProps> = ({
    search,
    category,
    onSearchChange,
    onCategoryChange,
    onReset,
    isSearching = false,
}) => {
    const [localSearch, setLocalSearch] = useState(search);
    const [isFocused, setIsFocused] = useState(false);

    // Only send request after 3 chars
    const debouncedSearch = useDebounce(localSearch, {
        delay: 500,
        minChars: MIN_SEARCH_LENGTH,
    });

    // Update parent when debounced value changes
    useEffect(() => {
        onSearchChange(debouncedSearch);
    }, [debouncedSearch, onSearchChange]);

    // Update local search when prop changes (from parent)
    useEffect(() => {
        setLocalSearch(search);
    }, [search]);

    const handleSearchChange = (value: string) => {
        if (value.length <= MAX_SEARCH_LENGTH) {
            setLocalSearch(value);
        }
    };

    const handleClearSearch = () => {
        setLocalSearch('');
        onSearchChange(''); // Clear immediately
    };

    const handleReset = () => {
        setLocalSearch('');
        onReset();
    };

    const charsLeft = MAX_SEARCH_LENGTH - localSearch.length;
    const charsNeeded = Math.max(0, MIN_SEARCH_LENGTH - localSearch.length);
    const isNearLimit = charsLeft <= 20;
    const hasFilters = localSearch || category;
    const shouldSearch = localSearch.length >= MIN_SEARCH_LENGTH;

    return (
        <Card className="p-6">
            <div className="space-y-4">
                {/* Filter Header */}
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={18} className="text-primary-600" />
                    <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
                    {hasFilters && (
                        <span className="ml-auto text-xs font-medium bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                            {[localSearch, category].filter(Boolean).length} active
                        </span>
                    )}
                </div>

                {/* Main Filter Row */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Input with Debounce */}
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            Search
                        </label>
                        <div className="relative">
                            <Search
                                size={20}
                                className={`absolute left-3 top-3 transition-colors ${isFocused ? 'text-primary-500' : 'text-gray-400'
                                    }`}
                            />

                            {/* Loading Spinner */}
                            {isSearching && shouldSearch && (
                                <Loader
                                    size={20}
                                    className="absolute right-3 top-3 text-primary-500 animate-spin"
                                />
                            )}

                            <input
                                type="text"
                                placeholder="Type at least 3 characters to search..."
                                className={`w-full pl-10 pr-10 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${isFocused
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                value={localSearch}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                maxLength={MAX_SEARCH_LENGTH}
                            />

                            {/* Clear Button */}
                            {localSearch && !isSearching && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded transition-colors"
                                    title="Clear search"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* Character Counter with Minimum Length Info */}
                        <div className="text-xs font-medium mt-2 flex items-center justify-between">
                            <div
                                className={`flex items-center gap-1 ${shouldSearch
                                    ? 'text-green-600'
                                    : charsNeeded > 0
                                        ? 'text-orange-600'
                                        : 'text-gray-500'
                                    }`}
                            >
                                <span
                                    className={`inline-block w-1.5 h-1.5 rounded-full ${shouldSearch
                                        ? 'bg-green-500'
                                        : charsNeeded > 0
                                            ? 'bg-orange-500'
                                            : 'bg-gray-400'
                                        }`}
                                ></span>
                                {shouldSearch ? (
                                    <span>Ready to search</span>
                                ) : charsNeeded > 0 ? (
                                    <span>Need {charsNeeded} char{charsNeeded !== 1 ? 's' : ''} to search </span>
                                ) : (
                                    <span>Enter search term</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Category Select */}
                    <div className="w-full md:w-48">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            className="w-full px-4 py-2.5 border-2 border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-0 transition-all bg-white"
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            disabled={isSearching}
                        >
                            <option value="">All Categories</option>
                            <option value="announcements">Announcement</option>
                            <option value="events">Events</option>
                            <option value="technology">Technology</option>
                            <option value="press_release">Press Release</option>
                            <option value="other">Others</option>
                        </select>
                    </div>

                    {/* Reset/Clear Button */}
                    {hasFilters && (
                        <div className="flex items-end">
                            <Button
                                variant="secondary"
                                onClick={handleReset}
                                className="w-full md:w-auto cursor-pointer h-10"
                                title="Clear all filters"
                                disabled={isSearching}
                            >
                                <X size={16} className="mr-1" />
                                Clear All
                            </Button>
                        </div>
                    )}
                </div>

                {/* Search Status Indicator */}
                {localSearch && shouldSearch && (
                    <div className="mt-2 p-3 bg-primary-50 border border-primary-200 rounded-lg flex items-center gap-3">
                        {isSearching && (
                            <Loader size={16} className="text-primary-500 animate-spin flex-shrink-0" />
                        )}
                        {!isSearching && (
                            <span className="inline-block w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></span>
                        )}
                        <span className="text-sm text-gray-700">
                            {isSearching ? 'Searching for:' : 'Showing results for:'}{' '}
                            <span className="font-semibold text-primary-700">"{localSearch}"</span>
                            {category && (
                                <span className="text-gray-700 ml-2">
                                    in <span className="font-semibold text-primary-700">{category}</span>
                                </span>
                            )}
                        </span>
                    </div>
                )}

                {/* Minimum Length Warning */}
                {localSearch && !shouldSearch && (
                    <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-3">
                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span className="text-sm text-orange-800">
                            Type <strong>{charsNeeded} more character{charsNeeded !== 1 ? 's' : ''}</strong> to start searching
                        </span>
                    </div>
                )}
            </div>
        </Card>
    );
};