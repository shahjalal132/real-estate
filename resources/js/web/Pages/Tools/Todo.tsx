import React, { useState, useEffect } from "react";
import AppLayout from "../../Layouts/AppLayout";
import Sidebar from "../../Components/Tools/Todo/Sidebar";
import Header from "../../Components/Tools/Todo/Header";
import TaskList from "../../Components/Tools/Todo/TaskList";
import BoardView from "../../Components/Tools/Todo/Views/BoardView";
import CalendarView from "../../Components/Tools/Todo/Views/CalendarView";
import DashboardView from "../../Components/Tools/Todo/Views/DashboardView";
import FilesView from "../../Components/Tools/Todo/Views/FilesView";
import { Task, ViewMode } from "../../Components/Tools/Todo/types";

// Mock Data for Initial State
const initialTasks: Task[] = [
    {
        id: 1,
        title: "Create a desk set up so shay can purchase",
        dueDate: "Aug 4, 2025",
        collaborators: ["AA", "AR"],
        project: "Tasks to get done",
        completed: true,
        comments: 2,
    },
    {
        id: 2,
        title: "order biz cards",
        dueDate: "Jul 29, 2025",
        collaborators: ["AA", "AR"],
        project: "Tasks to get done",
        completed: true,
        comments: 3,
    },
    {
        id: 3,
        title: "custom office supplies",
        dueDate: "Aug 7, 2025",
        collaborators: ["AA", "AR"],
        project: "Tasks to get done",
        completed: false,
    },
    {
        id: 4,
        title: "Lets order some Merch so team is hyped",
        dueDate: "Aug 11, 2025",
        collaborators: ["AA", "AR"],
        project: "Tasks to get done",
        completed: false,
        comments: 4,
    },
    {
        id: 5,
        title: "open bank account and credit card",
        dueDate: "Aug 6, 2025",
        collaborators: ["AA"],
        project: "Tasks to get done",
        completed: true,
    },
    {
        id: 6,
        title: "secure the bond office space",
        dueDate: "Aug 4, 2025",
        collaborators: ["AA"],
        project: "Tasks to get done",
        completed: true,
    },
    {
        id: 7,
        title: "Find sign vendor",
        dueDate: "Jul 31, 2025",
        collaborators: ["AA"],
        project: "Tasks to get done",
        completed: false,
        subtasks: 2,
    },
    {
        id: 8,
        title: "Task 1",
        dueDate: "Jul 28, 2025",
        collaborators: [],
        project: "",
        completed: false,
        visibility: "Only me",
    },
    {
        id: 9,
        title: "Task 2",
        dueDate: "Jul 29, 2025",
        collaborators: [],
        project: "",
        completed: false,
        visibility: "Only me",
    },
    {
        id: 10,
        title: "Task 3",
        dueDate: "Jul 30, 2025",
        collaborators: [],
        project: "",
        completed: false,
        visibility: "Only me",
    },
];

export default function Todo() {
    // --- State ---
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [view, setView] = useState<ViewMode>("List");
    const [filter, setFilter] = useState("My tasks");
    const [isLoaded, setIsLoaded] = useState(false);

    // --- Effects ---

    // Load from Local Storage on Mount
    useEffect(() => {
        const storedTasks = localStorage.getItem("todo_tasks");
        const storedSidebar = localStorage.getItem("todo_sidebar_open");
        const storedView = localStorage.getItem("todo_view");

        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        } else {
            setTasks(initialTasks);
        }

        if (storedSidebar !== null) {
            setSidebarOpen(JSON.parse(storedSidebar));
        }

        if (storedView) {
            setView(storedView as ViewMode);
        }

        setIsLoaded(true);
    }, []);

    // Save to Local Storage on Change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("todo_tasks", JSON.stringify(tasks));
        }
    }, [tasks, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(
                "todo_sidebar_open",
                JSON.stringify(sidebarOpen),
            );
        }
    }, [sidebarOpen, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("todo_view", view);
        }
    }, [view, isLoaded]);

    // --- Handlers ---

    const handleCreateTask = () => {
        const newTask: Task = {
            id: Date.now(),
            title: "New Task",
            dueDate: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            collaborators: ["ME"],
            project: "Inbox",
            completed: false,
            visibility: "Only me",
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const handleToggleTask = (id: number) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t,
            ),
        );
    };

    // --- Render ---

    if (!isLoaded) return null; // Avoid hydration mismatch or flash

    return (
        <AppLayout title="To-Do List">
            <div className="flex w-full bg-white font-sans text-[#2A2B2D] overflow-hidden h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <Sidebar
                    isOpen={sidebarOpen}
                    activeFilter={filter}
                    onFilterChange={setFilter}
                />

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 bg-white">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        activeView={view}
                        setView={setView}
                        onAddTask={handleCreateTask}
                    />

                    {/* Page Content */}
                    <div className="flex-1 overflow-auto bg-white">
                        {view === "List" && (
                            <TaskList
                                tasks={tasks}
                                onToggleTask={handleToggleTask}
                                onAddTask={handleCreateTask}
                            />
                        )}
                        {view === "Board" && (
                            <BoardView
                                tasks={tasks}
                                onToggleTask={handleToggleTask}
                                onAddTask={handleCreateTask}
                            />
                        )}
                        {view === "Calendar" && <CalendarView tasks={tasks} />}
                        {view === "Dashboard" && (
                            <DashboardView tasks={tasks} />
                        )}
                        {view === "Files" && <FilesView />}
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
