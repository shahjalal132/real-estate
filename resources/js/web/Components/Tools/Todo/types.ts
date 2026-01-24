export interface Task {
    id: number;
    title: string;
    dueDate: string;
    collaborators: string[];
    project: string;
    completed: boolean;
    comments?: number;
    subtasks?: number;
    visibility?: string;
}

export type ViewMode = 'List' | 'Board' | 'Calendar' | 'Dashboard' | 'Files';

export interface TodoContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id'>) => void;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
    filter: string;
    setFilter: (filter: string) => void;
    view: ViewMode;
    setView: (view: ViewMode) => void;
}
