import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent as AlertDialogPanel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
export const TaskItem = ({ task, onToggleTask, onDeleteTask, onUpdateTask }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const handleUpdate = () => {
        const trimmed = editTitle.trim();
        if (trimmed && trimmed !== task.title) {
            onUpdateTask(task.id, trimmed);
        }
        setIsEditDialogOpen(false);
    };
    return (_jsxs("div", { className: "flex items-center justify-between gap-3 rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md", children: [_jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: [_jsx(Checkbox, { checked: task.completed, onCheckedChange: () => onToggleTask(task.id), id: `task-${task.id}` }), _jsx("label", { htmlFor: `task-${task.id}`, className: `cursor-pointer truncate text-sm font-medium leading-none select-none ${task.completed ? "text-muted-foreground line-through" : ""}`, children: task.title }), _jsx(Badge, { variant: task.completed ? "secondary" : "default", className: "ml-2", children: task.completed ? "Terminée" : "À faire" })] }), _jsxs("div", { className: "ml-4 flex items-center gap-2", children: [_jsxs(Dialog, { open: isEditDialogOpen, onOpenChange: setIsEditDialogOpen, children: [_jsx(DialogTrigger, { render: _jsx(Button, { variant: "outline", size: "sm" }), children: "Modifier" }), _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Modifier la t\u00E2che" }) }), _jsx("div", { className: "py-4", children: _jsx(Input, { value: editTitle, onChange: (e) => setEditTitle(e.target.value), placeholder: "Titre de la t\u00E2che" }) }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsEditDialogOpen(false), children: "Annuler" }), _jsx(Button, { onClick: handleUpdate, children: "Enregistrer" })] })] })] }), _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { render: _jsx(Button, { variant: "destructive", size: "sm" }), children: "Supprimer" }), _jsxs(AlertDialogPanel, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Supprimer cette t\u00E2che ?" }), _jsx(AlertDialogDescription, { children: "Cette action est irr\u00E9versible. La t\u00E2che sera supprim\u00E9e d\u00E9finitivement." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Annuler" }), _jsx(AlertDialogAction, { onClick: () => onDeleteTask(task.id), children: "Confirmer" })] })] })] })] })] }));
};
