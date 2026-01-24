import React, { useState, useEffect } from "react";
import TodoLayout from "../../../Components/Tools/Todo/TodoLayout";
import TaskList from "../../../Components/Tools/Todo/TaskList";
import BoardView from "../../../Components/Tools/Todo/Views/BoardView";
import CalendarView from "../../../Components/Tools/Todo/Views/CalendarView";
import DashboardView from "../../../Components/Tools/Todo/Views/DashboardView";
import FilesView from "../../../Components/Tools/Todo/Views/FilesView";
import { Task, ViewMode } from "../../../Components/Tools/Todo/types";

// Re-using initial data from Todo.tsx for now
// Standardizing project name to "Tasks to get done" to match UI
const initialTasks: Task[] = [
    { id: 1, title: "Create a desk set up", dueDate: "Aug 4, 2025", collaborators: ["AA", "AR"], project: "Tasks to get done", completed: true, comments: 2 },
    { id: 2, title: "order biz cards", dueDate: "Jul 29, 2025", collaborators: ["AA"], project: "Tasks to get done", completed: true, comments: 3 },
    { id: 3, title: "custom office supplies", dueDate: "Aug 7, 2025", collaborators: ["AA"], project: "Tasks to get done", completed: false },
    { id: 8, title: "Task 1", dueDate: "Jul 28, 2025", collaborators: [], project: "Tasks to get done", completed: false, visibility: "Only me" },
];

export default function MyTasks({ view = 'List' }: { view?: ViewMode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('todo_tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        } else {
            setTasks(initialTasks);
        }
    }, []);

    const handleCreateTask = () => {
        const newTask: Task = {
            id: Date.now(),
            title: "New Task",
            dueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            collaborators: ['ME'],
            project: "Tasks to get done",
            completed: false,
            visibility: "Only me"
        };
        const updated = [newTask, ...tasks];
        setTasks(updated);
        localStorage.setItem('todo_tasks', JSON.stringify(updated));
    };

    const handleToggleTask = (id: number) => {
        const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        setTasks(updated);
        localStorage.setItem('todo_tasks', JSON.stringify(updated));
    };

    // My Tasks typically shows tasks assigned to me. 
    // For V1 demo, we show everything or filter by "Only me" mock logic?
    // Let's just show all for "My Tasks" to ensure no confusion, as user is 'ME'.

    // Listen for custom event from Layout Header
    useEffect(() => {
        const onAdd = () => handleCreateTask();
        window.addEventListener('todo-add-task', onAdd);
        return () => window.removeEventListener('todo-add-task', onAdd);
    }, [tasks]);

    return (
        <TodoLayout title= "My Tasks" activeFilter = "My tasks" >
            <Content 
                tasks={ tasks }
    onToggle = { handleToggleTask }
    onCreate = { handleCreateTask }
        />
        </TodoLayout>
    );
}

function Content({ tasks, onToggle, onCreate }: any) {
    const [view, setView] = useState<ViewMode>('List');

    useEffect(() => {
        const interval = setInterval(() => {
            const v = localStorage.getItem('todo_view') as ViewMode;
            if (v && v !== view) setView(v);
        }, 500);
        return () => clearInterval(interval);
    }, [view]);

    if (view === 'List') return <TaskList tasks={ tasks } onToggleTask = { onToggle } onAddTask = { onCreate } />;
    if (view === 'Board') return <BoardView tasks={ tasks } onToggleTask = { onToggle } onAddTask = { onCreate } />;
    if (view === 'Calendar') return <CalendarView tasks={ tasks } />;
    if (view === 'Dashboard') return <DashboardView tasks={ tasks } />;
    if (view === 'Files') return <FilesView />;
    return null;
}
