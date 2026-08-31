import React from "react";
import type { Task } from "../types/task";
import { TaskItem } from "./task-item";

// contra 
interface TaskListProps {
    tasks: Task[];
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onUpdateTask: (id: string, newTitle: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({tasks, onToggleTask, onDeleteTask, onUpdateTask }) => {
    if (tasks.length === 0) {
        return (
        <div className="text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground">
            Aucune tâche à afficher.
        </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 w-full">
        {tasks.map((task) => (
            <TaskItem
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
            />
        ))}
        </div>
    );
};