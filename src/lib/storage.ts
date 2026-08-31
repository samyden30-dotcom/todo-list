import type { Task } from '../types/task';

const STORAGE_KEY = 'todo-list-tasks';

export const storage = {
    loadTasks: (): Task[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Erreur lors du chargement des tâches depuis localStorage', error);
            return [];
        }
    },

    saveTasks: (tasks: Task[]): void => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des tâches dans localStorage', error);
        }
    }
};
