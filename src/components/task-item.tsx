import React, { useState } from "react";
import type { Task } from "@/types/task";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent as AlertDialogPanel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface TaskItemProps {
    task: Task;
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onUpdateTask: (id: string, newTitle: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({task, onToggleTask, onDeleteTask, onUpdateTask }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const handleUpdate = () => {
        const trimmed = editTitle.trim();

        if (trimmed && trimmed !== task.title) {
        onUpdateTask(task.id, trimmed);
        }

        setIsEditDialogOpen(false);
    };

    return (
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex min-w-0 flex-1 items-center gap-3">
            <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                id={`task-${task.id}`}
            />

            <label
                htmlFor={`task-${task.id}`}
                className={`cursor-pointer truncate text-sm font-medium leading-none select-none ${
                    task.completed ? "text-muted-foreground line-through" : ""
                }`}
            >
                {task.title}
            </label>

            <Badge variant={task.completed ? "secondary" : "default"} className="ml-2">
                {task.completed ? "Terminée" : "À faire"}
            </Badge>
        </div>

        <div className="ml-4 flex items-center gap-2">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                Modifier
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                <DialogTitle>Modifier la tâche</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Titre de la tâche"
                />
                </div>

                <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Annuler
                </Button>
                <Button onClick={handleUpdate}>Enregistrer</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>

            <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="destructive" size="sm">
                Supprimer
                </Button>
            </AlertDialogTrigger>

            <AlertDialogPanel>
                <AlertDialogHeader>
                <AlertDialogTitle>Supprimer cette tâche ?</AlertDialogTitle>
                <AlertDialogDescription>
                    Cette action est irréversible. La tâche sera supprimée définitivement.
                </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDeleteTask(task.id)}>
                    Confirmer
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogPanel>
            </AlertDialog>
        </div>
        </div>
    );
};