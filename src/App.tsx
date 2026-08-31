import { useState, useEffect } from 'react';
import type { Task } from '@/types/task';
import { storage } from './lib/storage';
import { TaskForm } from './components/task-form';
import { TaskFilters } from './components/task-filters';
import { TaskList } from './components/task-list';
import { TaskSummary } from './components/task-summary';

export function App() {
  // Source unique de vérité initialisée avec l'état persistant
    const [tasks, setTasks] = useState<Task[]>(() => storage.loadTasks());
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');

    // Effet React de synchronisation vers localStorage à chaque mise à jour du tableau
    useEffect(() => {
        storage.saveTasks(tasks);
    }, [tasks]);

    // Handler métier : Ajout immuable en tête de liste
    const handleAddTask = (title: string) => {
        const newTask: Task = {
        id: crypto.randomUUID(), // ID unique et stable conforme aux normes actuelles du web
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    // Handler métier : Inversion de l'état terminé
    const handleToggleTask = (id: string) => {
        setTasks((prev) =>
        prev.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
        );
    };

    // Handler métier : Édition de titre
    const handleUpdateTask = (id: string, newTitle: string) => {
        setTasks((prev) =>
        prev.map((task) =>
            task.id === id ? { ...task, title: newTitle } : task
        )
        );
    };

    // Handler métier : Suppression
    const handleDeleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    // Valeurs dérivées (calculées à chaque rendu, évitant de polluer l'état)
    const totalCount = tasks.length;
    const completedCount = tasks.filter((t) => t.completed).length;
    const activeCount = totalCount - completedCount;

    // Filtrage combiné (Recherche + Onglet actif)
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || (activeFilter === 'active' && !task.completed) || (activeFilter === 'completed' && task.completed);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-background text-foreground flex justify-center py-10 px-4">
        <div className="w-full max-w-2xl flex flex-col gap-6">
            <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-extrabold tracking-tight">Todo List</h1>
            <p className="text-muted-foreground text-sm">
                Gestion de tache pour les utilisateurs
            </p>
            </header>

            <main className="flex flex-col gap-6">
            {/* Formulaire de création */}
            <TaskForm onAddTask={handleAddTask} />
            
            {/* Statistiques calculées */}
            <TaskSummary
                total={totalCount}
                active={activeCount}
                completed={completedCount}
            />
            
            {/* Barre de recherche et sélection des filtres */}
            <TaskFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />
            
            {/* Liste et rendu conditionnel de l'état vide */}
            <TaskList
                tasks={filteredTasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />
            </main>
        </div>
        </div>
    );
}
export default App
