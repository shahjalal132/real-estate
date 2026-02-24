export interface Task {
    id: number;
    title: string;
    description?: string;
    due_date?: string;
    collaborators?: string[];
    project?: string;
    project_id?: number | null;
    is_completed: boolean;
    comments?: number;
    subtasks?: number;
    visibility?: string;
    status?: string;
    position?: number;
}

export interface Project {
    id: number;
    name: string;
    color?: string;
}

export interface Team {
    id: number;
    name: string;
    color?: string;
}

export type ViewMode = 'List' | 'Board' | 'Calendar' | 'Dashboard' | 'Files';

export interface TodoContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id'>) => void;
    toggleTask: (id: number) => void;
    updateTask: (id: number, updates: Partial<Task>) => void;
    deleteTask: (id: number) => void;
    filter: string;
    setFilter: (filter: string) => void;
    view: ViewMode;
    setView: (view: ViewMode) => void;
}
