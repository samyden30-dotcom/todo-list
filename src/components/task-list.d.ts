import React from "react";
import type { Task } from "../types/task";
interface TaskListProps {
    tasks: Task[];
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onUpdateTask: (id: string, newTitle: string) => void;
}
export declare const TaskList: React.FC<TaskListProps>;
export {};
