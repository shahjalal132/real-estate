import React, { useState, useEffect } from "react";
import TodoLayout from "../../../Components/Tools/Todo/TodoLayout";
import TaskList from "../../../Components/Tools/Todo/TaskList";
import BoardView from "../../../Components/Tools/Todo/Views/BoardView";
import CalendarView from "../../../Components/Tools/Todo/Views/CalendarView";
import DashboardView from "../../../Components/Tools/Todo/Views/DashboardView";
import FilesView from "../../../Components/Tools/Todo/Views/FilesView";
import { Task, ViewMode } from "../../../Components/Tools/Todo/types";

// Initial data removed as we now load from backend

// @ts-ignore
import { router } from "@inertiajs/react";

export default function MyTasks({ tasks }: { tasks: Task[] }) {

    // Create Task (Sync with backend)
    const handleCreateTask = () => {
        const newTask = {
            title: "New Task",
            due_date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            project: "Tasks to get done",
            status: "todo",
            visibility: "Only me",
            collaborators: ["ME"],
        };

        router.post(route('tools.todo.store'), newTask, {
            preserveScroll: true,
        });
    };

    // Toggle Task Completion (Sync with backend)
    const handleToggleTask = (id: number) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        router.put(route('tools.todo.update', task.id), {
            is_completed: !task.completed
        }, {
            preserveScroll: true,
        });
    };

    // Update Task (Sync with backend)
    const handleUpdateTask = (id: number, updates: Partial<Task>) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        router.put(route('tools.todo.update', task.id), updates, {
            preserveScroll: true,
        });
    };

    // Listen for custom event from Layout Header
    useEffect(() => {
        const onAdd = () => handleCreateTask();
        window.addEventListener("todo-add-task", onAdd);
        return () => window.removeEventListener("todo-add-task", onAdd);
    }, []);

    return (
        <TodoLayout title= "My Tasks" activeFilter = "My tasks" >
            <Content
                tasks={ tasks }
    onToggle = { handleToggleTask }
    onCreate = { handleCreateTask }
    onUpdate = { handleUpdateTask }
        />
        </TodoLayout>
    );
}

function Content({ tasks, onToggle, onCreate, onUpdate }: any) {
    const [view, setView] = useState<ViewMode>("List");

    useEffect(() => {
        const interval = setInterval(() => {
            const v = localStorage.getItem("todo_view") as ViewMode;
            if (v && v !== view) setView(v);
        }, 500);
        return () => clearInterval(interval);
    }, [view]);

    if (view === "List")
        return (
            <TaskList
                tasks= { tasks }
    onToggleTask = { onToggle }
    onAddTask = { onCreate }
    onUpdateTask = { onUpdate }
        />
        );
    if (view === "Board")
        return (
            <BoardView
                tasks= { tasks }
    onToggleTask = { onToggle }
    onAddTask = { onCreate }
    onUpdateTask = { onUpdate }
        />
        );
    if (view === "Calendar") return <CalendarView tasks={ tasks } />;
    if (view === "Dashboard") return <DashboardView tasks={ tasks } />;
    if (view === "Files") return <FilesView />;
    return null;
}
