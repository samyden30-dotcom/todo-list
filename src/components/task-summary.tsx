import React from 'react';
import { Card, CardContent } from './ui/card';

interface TaskSummaryProps {
    total: number;
    active: number;
    completed: number;
}

export const TaskSummary: React.FC<TaskSummaryProps> = ({ total, active, completed }) => {
    return (
        <div className="grid grid-cols-3 gap-4 w-full">
        <Card>
            <CardContent className="pt-6 text-center">
                <p className="text-xs text-muted-foreground"> Total </p>
                <div className="text-2xl font-bold">{total}</div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="pt-6 text-center">
                <p className="text-xs text-muted-foreground"> À faire </p>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{active}</div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="pt-6 text-center">
                <p className="text-xs text-muted-foreground"> Terminées </p>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completed}</div>
            </CardContent>
        </Card>
        </div>
    );
};
