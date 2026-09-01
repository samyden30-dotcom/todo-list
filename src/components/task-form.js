import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
export const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedTitle = title.trim();
        if (!trimmedTitle)
            return; // Empêche les titres vides ou uniquement composés d'espaces
        onAddTask(trimmedTitle);
        setTitle('');
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2 w-full", children: [_jsx(Input, { type: "text", placeholder: "Ajouter une nouvelle t\u00E2che...", value: title, onChange: (e) => setTitle(e.target.value), className: "flex-1" }), _jsx(Button, { type: "submit", children: "Ajouter" })] }));
};
