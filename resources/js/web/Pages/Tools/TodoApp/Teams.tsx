import React, { useState, useEffect } from "react";
import TodoLayout from "../../../Components/Tools/Todo/TodoLayout";
import TaskList from "../../../Components/Tools/Todo/TaskList";
import BoardView from "../../../Components/Tools/Todo/Views/BoardView";
import CalendarView from "../../../Components/Tools/Todo/Views/CalendarView";
import DashboardView from "../../../Components/Tools/Todo/Views/DashboardView";
import FilesView from "../../../Components/Tools/Todo/Views/FilesView";
import { Task, ViewMode } from "../../../Components/Tools/Todo/types";

// Logic for Teams: Show tasks across the team or specific to team members.
// For V1, we simply show all tasks (simulating a team view) or filter by visibility="Everyone" if we had it.
// We'll show all tasks for now like My Tasks but maybe different header title.

export default function Teams() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("todo_tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        } else {
            // If empty, init with nothing or wait for MyTasks to populate
            setTasks([]);
        }
    }, []);

    const handleCreateTask = () => {
        const newTask: Task = {
            id: Date.now(),
            title: "New Team Task",
            dueDate: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            collaborators: ["TEAM"],
            project: "Avi's first team",
            completed: false,
            visibility: "Everyone",
        };
        const updated = [newTask, ...tasks];
        setTasks(updated);
        localStorage.setItem("todo_tasks", JSON.stringify(updated));
    };

    const handleToggleTask = (id: number) => {
        const updated = tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
        );
        setTasks(updated);
        localStorage.setItem("todo_tasks", JSON.stringify(updated));
    };

    // Filter tasks? Maybe show everything for the team view.
    // Let's filter by project "Avi's first team" AND general tasks?
    // It's safer to just show everything or mock it.
    // Let's show everything to make it feel populated.

    // Listen for custom event from Layout Header
    useEffect(() => {
        const onAdd = () => handleCreateTask();
        window.addEventListener("todo-add-task", onAdd);
        return () => window.removeEventListener("todo-add-task", onAdd);
    }, [tasks]);

    return (
        <TodoLayout title="Avi's first team" activeFilter="Avi's first team">
            <Content
                tasks={tasks}
                onToggle={handleToggleTask}
                onCreate={handleCreateTask}
            />
        </TodoLayout>
    );
}

function Content({ tasks, onToggle, onCreate }: any) {
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
                tasks={tasks}
                onToggleTask={onToggle}
                onAddTask={onCreate}
            />
        );
    if (view === "Board")
        return (
            <BoardView
                tasks={tasks}
                onToggleTask={onToggle}
                onAddTask={onCreate}
            />
        );
    if (view === "Calendar") return <CalendarView tasks={tasks} />;
    if (view === "Dashboard") return <DashboardView tasks={tasks} />;
    if (view === "Files") return <FilesView />;
    return null;
}
