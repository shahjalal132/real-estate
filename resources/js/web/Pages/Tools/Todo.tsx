import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

import AppLayout from "../../Layouts/AppLayout";
import Header from "../../Components/Tools/Todo/Header";
import TaskList from "../../Components/Tools/Todo/TaskList";
import BoardView from "../../Components/Tools/Todo/Views/BoardView";
import CalendarView from "../../Components/Tools/Todo/Views/CalendarView";
import DashboardView from "../../Components/Tools/Todo/Views/DashboardView";
import FilesView from "../../Components/Tools/Todo/Views/FilesView";
import { Task, Project, ViewMode } from "../../Components/Tools/Todo/types";
import Sidebar from "../../Components/Tools/Todo/Sidebar";

export default function Todo({ tasks: initialTasks }: { tasks: Task[], projects: Project[] }) {
    // --- State ---
    const [view, setView] = useState<ViewMode>("List");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile initially
    const [activeFilter, setActiveFilter] = useState("My tasks");

    // --- Effects ---

    // Load View preference from Local Storage on Mount
    useEffect(() => {
        const storedView = localStorage.getItem("todo_view");
        if (storedView) {
            setView(storedView as ViewMode);
        }
        setIsLoaded(true);
    }, []);

    // Save to Local Storage on Change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("todo_view", view);
        }
    }, [view, isLoaded]);

    // --- Handlers (Interacting with Backend via Inertia) ---

    // Toggle Mobile Sidebar
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleCreateTask = (initialStatus: string = "todo") => {
        const newTask = {
            title: "New Task",
            due_date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            collaborators: ["ME"],
            project: "Inbox",
            is_completed: false,
            visibility: "Only me",
            status: initialStatus,
        };

        router.post('/tools/todo/tasks', newTask as any, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleToggleTask = (id: number) => {
        const task = initialTasks.find(t => t.id === id);
        if (task) {
            router.put(`/tools/todo/tasks/${id}`, { is_completed: !task.is_completed }, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const handleMoveTask = (taskId: number, newStatus: string) => {
        router.put(`/tools/todo/tasks/${taskId}`, { status: newStatus }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleUpdateTask = (updatedTask: Task) => {
        router.put(`/tools/todo/tasks/${updatedTask.id}`, updatedTask as any, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDeleteTask = (taskId: number) => {
        router.delete(`/tools/todo/tasks/${taskId}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDuplicateTask = (task: Task) => {
        const duplicatedTask = {
            ...task,
            title: `${task.title} (Copy)`,
        };

        router.post('/tools/todo/tasks', duplicatedTask as any, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // --- Render ---

    if (!isLoaded) return null; // Avoid hydration mismatch or flash

    return (
        <AppLayout title= "To-Do List" >
        <div className="flex w-full bg-white font-sans text-[#2A2B2D] overflow-hidden h-full lg:h-[calc(100vh-64px)] relative" >
            {/* Main Content */ }
            < main className = "flex-1 flex flex-col min-w-0 bg-white md:bg-gray-50/20" >
                <Header
                        activeView={ view }
    setView = { setView }
    onAddTask = { handleCreateTask }
    onToggleSidebar = { toggleSidebar }
        />

        {/* Content Wrapper */ }
        < div className = "flex flex-1 overflow-hidden relative" >
            {/* Sidebar Off-canvas Overlay for Mobile */ }
    {
        isSidebarOpen && (
            <div 
                                className="fixed inset-0 bg-black/40 z-20 lg:hidden"
        onClick = {() => setIsSidebarOpen(false)
    }
                            />
                        )
}

{/* Sidebar */ }
<div className={
    `
                            absolute inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out bg-white
                            lg:static lg:translate-x-0
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        `}>
    <Sidebar
                                isOpen={ true }
activeFilter = { activeFilter }
onFilterChange = {(f) => {
    setActiveFilter(f);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
}}
                            />
    </div>

{/* Page Content */ }
<div className="flex-1 overflow-auto bg-white" >
    { view === "List" && (
        <TaskList
                                    tasks={ initialTasks }
onToggleTask = { handleToggleTask }
onAddTask = { handleCreateTask }
onUpdateTask = { handleUpdateTask }
    />
                            )}
{
    view === "Board" && (
        <BoardView
                                    tasks={ initialTasks }
    onToggleTask = { handleToggleTask }
    onAddTask = { handleCreateTask }
    onMoveTask = { handleMoveTask }
    onUpdateTask = { handleUpdateTask }
    onDeleteTask = { handleDeleteTask }
    onDuplicateTask = { handleDuplicateTask }
        />
                            )
}
{
    view === "Calendar" && (
        <CalendarView
                                    tasks={ initialTasks }
    onAddTask = { handleCreateTask }
        />
                            )
}
{
    view === "Dashboard" && (
        <DashboardView tasks={ initialTasks } />
                            )
}
{ view === "Files" && <FilesView /> }
</div>
    </div>
    </main>
    </div>
    </AppLayout>
    );
}
