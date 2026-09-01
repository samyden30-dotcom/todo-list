import type { Task } from '../types/task';
export declare const storage: {
    loadTasks: () => Task[];
    saveTasks: (tasks: Task[]) => void;
};
