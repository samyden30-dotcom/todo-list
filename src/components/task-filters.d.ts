import React from 'react';
interface TaskFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeFilter: 'all' | 'active' | 'completed';
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}
export declare const TaskFilters: React.FC<TaskFiltersProps>;
export {};
