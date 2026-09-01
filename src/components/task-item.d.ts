import React from "react";
import type { Task } from "@/types/task";
interface TaskItemProps {
    task: Task;
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onUpdateTask: (id: string, newTitle: string) => void;
}
export declare const TaskItem: React.FC<TaskItemProps>;
export {};
