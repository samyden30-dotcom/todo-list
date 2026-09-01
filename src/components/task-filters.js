import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
export const TaskFilters = ({ searchQuery, onSearchChange, activeFilter, onFilterChange }) => {
    return (_jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full items-center justify-between", children: [_jsx(Input, { type: "text", placeholder: "Rechercher une t\u00E2che...", value: searchQuery, onChange: (e) => onSearchChange(e.target.value), className: "w-full sm:max-w-xs" }), _jsx(Tabs, { value: activeFilter, onValueChange: (value) => onFilterChange(value), className: "w-full sm:w-auto", children: _jsxs(TabsList, { className: "grid grid-cols-3 w-full sm:w-auto", children: [_jsx(TabsTrigger, { value: "all", children: " Toutes " }), _jsx(TabsTrigger, { value: "active", children: " \u00C0 faire " }), _jsx(TabsTrigger, { value: "completed", children: " Termin\u00E9es " })] }) })] }));
};
