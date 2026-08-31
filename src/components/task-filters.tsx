import React from 'react';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface TaskFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeFilter: 'all' | 'active' | 'completed';
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({searchQuery, onSearchChange, activeFilter, onFilterChange}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full items-center justify-between">
        <Input
            type="text"
            placeholder="Rechercher une tâche..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:max-w-xs"
        />
        <Tabs
            value={activeFilter}
            onValueChange={(value) => onFilterChange(value as 'all' | 'active' | 'completed')}
            className="w-full sm:w-auto"
        >
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
            <TabsTrigger value="all"> Toutes </TabsTrigger>
            <TabsTrigger value="active"> À faire </TabsTrigger>
            <TabsTrigger value="completed"> Terminées </TabsTrigger>
            </TabsList>
        </Tabs>
        </div>
    );
};
