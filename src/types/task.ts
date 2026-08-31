export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string; // Stocké au format de date sérialisable ISO
}
