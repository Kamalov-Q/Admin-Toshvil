import React, { useState, useEffect } from 'react';
import { Search, X, Filter, Loader } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface LotsFilterProps {
    search: string;
    status: string;
    tradeType: string;
    onSearchChange: (search: string) => void;
    onStatusChange: (status: string) => void;
    onTradeTypeChange: (tradeType: string) => void;
    onReset: () => void;
    isSearching?: boolean;
}

const MAX_SEARCH_LENGTH = 100;
const MIN_SEARCH_LENGTH = 3;

export const LotsFilter: React.FC<LotsFilterProps> = ({
    search,
    status,
    tradeType,
    onSearchChange,
    onStatusChange,
    onTradeTypeChange,
    onReset,
    isSearching = false,
}) => {
    const [localSearch, setLocalSearch] = useState(search);
    const [isFocused, setIsFocused] = useState(false);
    const debouncedSearch = useDebounce(localSearch, {
        delay: 500,
        minChars: MIN_SEARCH_LENGTH,
    });

    useEffect(() => {
        onSearchChange(debouncedSearch);
    }, [debouncedSearch, onSearchChange]);

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
        onSearchChange('');
    };

    const handleReset = () => {
        setLocalSearch('');
        onReset();
    };

    const charsLeft = MAX_SEARCH_LENGTH - localSearch.length;
    const charsNeeded = Math.max(0, MIN_SEARCH_LENGTH - localSearch.length);
    const hasFilters = localSearch || status || tradeType;
    const shouldSearch = localSearch.length >= MIN_SEARCH_LENGTH;

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={18} className="text-primary-600" />
                    <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
                    {hasFilters && (
                        <span className="ml-auto text-xs font-medium bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                            {[localSearch, status, tradeType].filter(Boolean).length} active
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                            <Search
                                size={20}
                                className={`absolute left-3 top-3 transition-colors ${isFocused ? 'text-primary-500' : 'text-gray-400'
                                    }`}
                            />
                            {isSearching && shouldSearch && (
                                <Loader
                                    size={20}
                                    className="absolute right-3 top-3 text-primary-500 animate-spin"
                                />
                            )}
                            <input
                                type="text"
                                placeholder="Search lot..."
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
                            {localSearch && !isSearching && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <div className="text-xs font-medium mt-2 text-green-600">
                            {shouldSearch ? 'Ready to search' : `Need ${charsNeeded} more character${charsNeeded !== 1 ? 's' : ''}`}
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                        <select
                            className="w-full px-4 py-2.5 border-2 border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:border-primary-500 transition-all"
                            value={status}
                            onChange={(e) => onStatusChange(e.target.value)}
                            disabled={isSearching}
                        >
                            <option value="">All Status</option>
                            <option value="upcoming">⏳ Upcoming</option>
                            <option value="active">✅ Active</option>
                            <option value="completed">✔️ Completed</option>
                            <option value="cancelled">❌ Cancelled</option>
                        </select>
                    </div>

                    {/* Trade Type Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Trade Type</label>
                        <select
                            className="w-full px-4 py-2.5 border-2 border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none focus:border-primary-500 transition-all"
                            value={tradeType}
                            onChange={(e) => onTradeTypeChange(e.target.value)}
                            disabled={isSearching}
                        >
                            <option value="">All Types</option>
                            <option value="tender">📋 Tender</option>
                            <option value="auction">🔨 Auction</option>
                            <option value="direct">📌 Direct</option>
                        </select>
                    </div>
                </div>

                {/* Clear Button */}
                {hasFilters && (
                    <div className="flex justify-end">
                        <Button
                            variant="secondary"
                            onClick={handleReset}
                            className="cursor-pointer"
                            disabled={isSearching}
                        >
                            <X size={16} className="mr-1" />
                            Clear All
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
};