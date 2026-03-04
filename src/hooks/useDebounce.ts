import { useState, useEffect } from 'react';

interface UseDebounceOptions {
    delay?: number;
    minChars?: number;
}

export function useDebounce<T extends string>(
    value: T,
    options: UseDebounceOptions = {}
): T {
    const { delay = 500, minChars = 3 } = options;
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        if (value.length >= minChars || value.length === 0) {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }
    }, [value, delay, minChars]);

    return debouncedValue;
}