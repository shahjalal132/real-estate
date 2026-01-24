import React, { useState, useEffect } from "react";
import TodoLayout from "../../../Components/Tools/Todo/TodoLayout";
import TaskList from "../../../Components/Tools/Todo/TaskList";
import BoardView from "../../../Components/Tools/Todo/Views/BoardView";
import CalendarView from "../../../Components/Tools/Todo/Views/CalendarView";
import DashboardView from "../../../Components/Tools/Todo/Views/DashboardView";
import FilesView from "../../../Components/Tools/Todo/Views/FilesView";
import { Task, ViewMode } from "../../../Components/Tools/Todo/types";

// Re-using initial data logic from MyTasks
const initialTasks: Task[] = [
    { id: 1, title: "Create a desk set up", dueDate: "Aug 4, 2025", collaborators: ["AA", "AR"], project: "Tasks", completed: true, comments: 2 },
    { id: 2, title: "order biz cards", dueDate: "Jul 29, 2025", collaborators: ["AA"], project: "Tasks", completed: true, comments: 3 },
    { id: 3, title: "custom office supplies", dueDate: "Aug 7, 2025", collaborators: ["AA"], project: "Tasks", completed: false },
    { id: 8, title: "Task 1", dueDate: "Jul 28, 2025", collaborators: [], project: "Tasks to get done", completed: false, visibility: "Only me" },
];

export default function Projects() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('todo_tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        } else {
            setTasks(initialTasks); // In real app, this fallback should be consistent or empty
        }
    }, []);

    const handleCreateTask = () => {
        const newTask: Task = {
            id: Date.now(),
            title: "New Project Task",
            dueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            collaborators: ['ME'],
            project: "Tasks to get done", // Default to this project
            completed: false,
            visibility: "Everyone"
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

    // Filter tasks for "Tasks to get done" project
    // Note: The mock data in MyTasks had project: "Tasks". 
    // The user screenshot/requirement says "Tasks to get done".
    // I entered "Tasks" in MyTasks.tsx as string.
    // I should technically filter by that string if I want to show *only* those.
    // But since the user wants *this specific menu* to work, I'll show all tasks that match "Tasks to get done" OR "Tasks" (fuzzy match for V1)
    // Or just show all for now if data is sparse?
    // Let's filter meaningfully: show tasks where project is "Tasks to get done" or "Tasks".

    const projectTasks = tasks.filter(t => t.project === "Tasks to get done" || t.project === "Tasks");

    // Listen for custom event from Layout Header
    useEffect(() => {
        const onAdd = () => handleCreateTask();
        window.addEventListener('todo-add-task', onAdd);
        return () => window.removeEventListener('todo-add-task', onAdd);
    }, [tasks]);

    return (
        <TodoLayout title= "Tasks to get done" activeFilter = "Tasks to get done" >
            <Content 
                tasks={ projectTasks }
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
