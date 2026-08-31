import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface TaskFormProps {
    onAddTask: (title: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return; // Empêche les titres vides ou uniquement composés d'espaces
        
        onAddTask(trimmedTitle);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <Input
            type="text"
            placeholder="Ajouter une nouvelle tâche..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
        />
        <Button type="submit">Ajouter</Button>
        </form>
    );
};
