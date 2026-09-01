import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { TaskItem } from "./task-item";
export const TaskList = ({ tasks, onToggleTask, onDeleteTask, onUpdateTask }) => {
    if (tasks.length === 0) {
        return (_jsx("div", { className: "text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground", children: "Aucune t\u00E2che \u00E0 afficher." }));
    }
    return (_jsx("div", { className: "flex flex-col gap-3 w-full", children: tasks.map((task) => (_jsx(TaskItem, { task: task, onToggleTask: onToggleTask, onDeleteTask: onDeleteTask, onUpdateTask: onUpdateTask }, task.id))) }));
};
