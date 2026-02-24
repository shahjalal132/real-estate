import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

import AppLayout from "../../Layouts/AppLayout";
import Header from "../../Components/Tools/Todo/Header";
import TaskList from "../../Components/Tools/Todo/TaskList";
import BoardView from "../../Components/Tools/Todo/Views/BoardView";
import CalendarView from "../../Components/Tools/Todo/Views/CalendarView";
import DashboardView from "../../Components/Tools/Todo/Views/DashboardView";
import FilesView from "../../Components/Tools/Todo/Views/FilesView";
import {
    Task,
    Project,
    Team,
    ViewMode,
} from "../../Components/Tools/Todo/types";
import Sidebar from "../../Components/Tools/Todo/Sidebar";
import ProjectModal from "../../Components/Tools/Todo/ProjectModal";
import TeamModal from "../../Components/Tools/Todo/TeamModal";
import ConfirmDialog from "../../Components/Tools/Todo/ConfirmDialog";

export default function Todo({
    tasks: initialTasks,
    projects = [],
    teams = [],
}: {
    tasks: Task[];
    projects?: Project[];
    teams?: Team[];
}) {
    // --- State ---
    const [view, setView] = useState<ViewMode>("List");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

    const [projectModal, setProjectModal] = useState<{
        open: boolean;
        project: Project | null;
    }>({
        open: false,
        project: null,
    });
    const [teamModal, setTeamModal] = useState<{
        open: boolean;
        team: Team | null;
    }>({
        open: false,
        team: null,
    });
    const [deleteConfirm, setDeleteConfirm] = useState<{
        open: boolean;
        type: "project" | "team";
        id: number;
        name: string;
    } | null>(null);

    // Tasks filtered by selected project
    const tasks =
        activeProjectId == null
            ? initialTasks
            : initialTasks.filter((t) => t.project_id === activeProjectId);

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
        const newTask: Record<string, unknown> = {
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
        if (activeProjectId != null) {
            newTask.project_id = activeProjectId;
        }

        router.post("/tools/todo/tasks", newTask as any, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleToggleTask = (id: number) => {
        const task = initialTasks.find((t) => t.id === id);
        if (task) {
            router.put(
                `/tools/todo/tasks/${id}`,
                { is_completed: !task.is_completed },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }
    };

    const handleMoveTask = (taskId: number, newStatus: string) => {
        router.put(
            `/tools/todo/tasks/${taskId}`,
            { status: newStatus },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
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

        router.post("/tools/todo/tasks", duplicatedTask as any, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // --- Project CRUD ---
    const handleAddProject = () =>
        setProjectModal({ open: true, project: null });
    const handleEditProject = (project: Project) =>
        setProjectModal({ open: true, project });
    const handleSaveProject = (data: { name: string; color?: string }) => {
        if (projectModal.project) {
            router.put(
                `/tools/todo/projects/${projectModal.project.id}`,
                data,
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        } else {
            router.post("/tools/todo/projects", data, {
                preserveState: true,
                preserveScroll: true,
            });
        }
        setProjectModal({ open: false, project: null });
    };
    const handleDeleteProject = (project: Project) => {
        setDeleteConfirm({
            open: true,
            type: "project",
            id: project.id,
            name: project.name,
        });
    };
    const handleConfirmDeleteProject = () => {
        if (!deleteConfirm || deleteConfirm.type !== "project") return;
        router.delete(`/tools/todo/projects/${deleteConfirm.id}`, {
            preserveState: true,
            preserveScroll: true,
        });
        setDeleteConfirm(null);
    };

    // --- Team CRUD ---
    const handleAddTeam = () => setTeamModal({ open: true, team: null });
    const handleEditTeam = (team: Team) => setTeamModal({ open: true, team });
    const handleSaveTeam = (data: { name: string; color?: string }) => {
        if (teamModal.team) {
            router.put(`/tools/todo/teams/${teamModal.team.id}`, data, {
                preserveState: true,
                preserveScroll: true,
            });
        } else {
            router.post("/tools/todo/teams", data, {
                preserveState: true,
                preserveScroll: true,
            });
        }
        setTeamModal({ open: false, team: null });
    };
    const handleDeleteTeam = (team: Team) => {
        setDeleteConfirm({
            open: true,
            type: "team",
            id: team.id,
            name: team.name,
        });
    };
    const handleConfirmDeleteTeam = () => {
        if (!deleteConfirm || deleteConfirm.type !== "team") return;
        router.delete(`/tools/todo/teams/${deleteConfirm.id}`, {
            preserveState: true,
            preserveScroll: true,
        });
        setDeleteConfirm(null);
    };

    const handleConfirmDelete = () => {
        if (!deleteConfirm) return;
        if (deleteConfirm.type === "project") handleConfirmDeleteProject();
        else handleConfirmDeleteTeam();
    };

    // --- Render ---

    if (!isLoaded) return null; // Avoid hydration mismatch or flash

    return (
        <AppLayout title="To-Do List">
            <div className="flex w-full bg-white font-sans text-[#2A2B2D] overflow-hidden h-full lg:h-[calc(100vh-64px)] relative">
                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 bg-white md:bg-gray-50/20">
                    <Header
                        activeView={view}
                        setView={setView}
                        onAddTask={handleCreateTask}
                        onToggleSidebar={toggleSidebar}
                    />

                    {/* Content Wrapper */}
                    <div className="flex flex-1 overflow-hidden relative">
                        {/* Sidebar overlay — below app header on mobile so header stays visible */}
                        {isSidebarOpen && (
                            <div
                                className="fixed top-16 left-0 right-0 bottom-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
                                onClick={() => setIsSidebarOpen(false)}
                                aria-hidden
                            />
                        )}

                        {/* Sidebar — mobile: fixed below app header; desktop: static in flow */}
                        <div
                            className={`
                            z-30 w-[260px] max-w-[85vw] transform transition-transform duration-300 ease-out bg-white border-r border-gray-200 flex flex-col
                            max-lg:fixed max-lg:top-20 max-lg:left-0 max-lg:bottom-0
                            lg:static lg:translate-x-0 lg:max-w-none
                            ${isSidebarOpen ? "translate-x-0 shadow-xl max-lg:shadow-2xl" : "-translate-x-full"}
                            lg:translate-x-0!
                        `}
                        >
                            <Sidebar
                                isOpen={true}
                                activeView={view}
                                onViewChange={(newView) => {
                                    setView(newView);
                                    if (
                                        typeof window !== "undefined" &&
                                        window.innerWidth < 1024
                                    ) {
                                        setIsSidebarOpen(false);
                                    }
                                }}
                                activeProjectId={activeProjectId}
                                onProjectChange={(id) => {
                                    setActiveProjectId(id);
                                    if (
                                        typeof window !== "undefined" &&
                                        window.innerWidth < 1024
                                    ) {
                                        setIsSidebarOpen(false);
                                    }
                                }}
                                projects={projects}
                                onAddTask={handleCreateTask}
                                onAddProject={handleAddProject}
                                onEditProject={handleEditProject}
                                onDeleteProject={handleDeleteProject}
                                teams={teams}
                                onAddTeam={handleAddTeam}
                                onEditTeam={handleEditTeam}
                                onDeleteTeam={handleDeleteTeam}
                                onClose={() => setIsSidebarOpen(false)}
                            />
                        </div>

                        {/* Page Content — mobile-friendly padding and safe area */}
                        <div className="flex-1 overflow-auto bg-white px-3 sm:px-4 md:px-6 pb-[env(safe-area-inset-bottom)]">
                            {view === "List" && (
                                <TaskList
                                    tasks={tasks}
                                    onToggleTask={handleToggleTask}
                                    onAddTask={handleCreateTask}
                                    onUpdateTask={handleUpdateTask}
                                    onDeleteTask={handleDeleteTask}
                                />
                            )}
                            {view === "Board" && (
                                <BoardView
                                    tasks={tasks}
                                    onToggleTask={handleToggleTask}
                                    onAddTask={handleCreateTask}
                                    onMoveTask={handleMoveTask}
                                    onUpdateTask={handleUpdateTask}
                                    onDeleteTask={handleDeleteTask}
                                    onDuplicateTask={handleDuplicateTask}
                                />
                            )}
                            {view === "Calendar" && (
                                <CalendarView
                                    tasks={tasks}
                                    onAddTask={handleCreateTask}
                                />
                            )}
                            {view === "Dashboard" && (
                                <DashboardView tasks={tasks} />
                            )}
                            {view === "Files" && <FilesView />}
                        </div>
                    </div>
                </main>
            </div>

            {/* Project create/edit modal */}
            <ProjectModal
                isOpen={projectModal.open}
                onClose={() => setProjectModal({ open: false, project: null })}
                project={projectModal.project}
                onSave={handleSaveProject}
            />

            {/* Team create/edit modal */}
            <TeamModal
                isOpen={teamModal.open}
                onClose={() => setTeamModal({ open: false, team: null })}
                team={teamModal.team}
                onSave={handleSaveTeam}
            />

            {/* Delete confirmation */}
            <ConfirmDialog
                isOpen={deleteConfirm?.open ?? false}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={handleConfirmDelete}
                title={
                    deleteConfirm?.type === "project"
                        ? "Delete project?"
                        : "Delete team?"
                }
                message={
                    deleteConfirm
                        ? `"${deleteConfirm.name}" will be permanently deleted. This cannot be undone.`
                        : ""
                }
                confirmLabel="Delete"
                danger
            />
        </AppLayout>
    );
}
