import React, { useState } from "react";
import {
    List,
    LayoutGrid,
    Calendar,
    BarChart2,
    FolderOpen,
    Plus,
    ChevronRight,
    MoreHorizontal,
    X,
} from "lucide-react";
import { ViewMode, Project, Team } from "./types";

interface SidebarProps {
    isOpen: boolean;
    activeView: ViewMode;
    onViewChange: (view: ViewMode) => void;
    activeProjectId: number | null;
    onProjectChange: (projectId: number | null) => void;
    projects: Project[];
    onAddTask: () => void;
    onAddProject: () => void;
    onEditProject: (project: Project) => void;
    onDeleteProject: (project: Project) => void;
    teams: Team[];
    onAddTeam: () => void;
    onEditTeam: (team: Team) => void;
    onDeleteTeam: (team: Team) => void;
    onClose?: () => void;
}

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: "List", label: "List", icon: <List size={16} /> },
    { id: "Board", label: "Board", icon: <LayoutGrid size={16} /> },
    { id: "Calendar", label: "Calendar", icon: <Calendar size={16} /> },
    { id: "Dashboard", label: "Dashboard", icon: <BarChart2 size={16} /> },
    { id: "Files", label: "Files", icon: <FolderOpen size={16} /> },
];

const PROJECT_COLORS = [
    "bg-[#4CE0D2]",
    "bg-[#4573D2]",
    "bg-[#E24C4C]",
    "bg-[#E2B84C]",
    "bg-[#4CE08A]",
    "bg-[#9B4CE0]",
];

function getProjectColor(index: number) {
    return PROJECT_COLORS[index % PROJECT_COLORS.length];
}

export default function Sidebar({
    isOpen,
    activeView,
    onViewChange,
    activeProjectId,
    onProjectChange,
    projects,
    onAddTask,
    onAddProject,
    onEditProject,
    onDeleteProject,
    teams,
    onAddTeam,
    onEditTeam,
    onDeleteTeam,
    onClose,
}: SidebarProps) {
    const [projectMenuId, setProjectMenuId] = useState<number | null>(null);
    const [teamMenuId, setTeamMenuId] = useState<number | null>(null);

    const closeMenus = () => {
        setProjectMenuId(null);
        setTeamMenuId(null);
    };

    return (
        <aside
            className={`${
                isOpen ? "w-[260px]" : "w-0"
            } bg-white shrink-0 transition-all duration-300 border-r border-gray-100 flex flex-col h-full overflow-hidden shadow-sm`}
        >
            {onClose && (
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 lg:hidden">
                    <h2 className="text-lg font-semibold text-gray-900 px-1">
                        To - Do
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
            )}

            <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-4">
                <button
                    type="button"
                    onClick={() => {
                        onAddTask();
                        closeMenus();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all touch-manipulation mb-2"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    Add task
                </button>

                {/* Task management — view modes */}
                <div className="mb-2">
                    <h3 className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Views
                    </h3>
                    <nav className="space-y-1.5 px-1">
                        {VIEW_OPTIONS.map((opt) => {
                            const isActiveView = activeView === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => {
                                        onViewChange(opt.id);
                                        closeMenus();
                                    }}
                                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] transition-all duration-200 touch-manipulation group outline-none ${
                                        isActiveView
                                            ? "bg-blue-50/80 text-blue-700 font-semibold shadow-sm ring-1 ring-inset ring-blue-500/10"
                                            : "text-gray-600 font-medium hover:bg-gray-100/50 hover:text-gray-900"
                                    }`}
                                >
                                    <span
                                        className={`flex items-center justify-center w-7 h-7 rounded-md transition-all ${
                                            isActiveView
                                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                                                : "text-gray-400 group-hover:bg-white group-hover:text-blue-500 group-hover:shadow-sm group-hover:ring-1 group-hover:ring-black/5"
                                        }`}
                                    >
                                        <span
                                            className={
                                                isActiveView
                                                    ? "scale-105 transition-transform"
                                                    : "scale-100 group-hover:scale-105 transition-transform"
                                            }
                                        >
                                            {opt.icon}
                                        </span>
                                    </span>
                                    <span className="flex-1 text-left">
                                        {opt.label}
                                    </span>
                                    {isActiveView && (
                                        <ChevronRight
                                            size={14}
                                            strokeWidth={3}
                                            className="text-blue-500 opacity-70"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Projects */}
                <div className="mb-2">
                    <div className="flex items-center justify-between px-3 mb-2 group">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Projects
                        </h3>
                        <button
                            type="button"
                            onClick={() => {
                                onAddProject();
                                closeMenus();
                            }}
                            className="p-1 rounded bg-gray-50/0 group-hover:bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
                            title="Add project"
                        >
                            <Plus size={14} strokeWidth={2.5} />
                        </button>
                    </div>
                    <nav className="space-y-0.5 px-1">
                        <button
                            type="button"
                            onClick={() => {
                                onProjectChange(null);
                                closeMenus();
                            }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 touch-manipulation group outline-none ${
                                activeProjectId === null
                                    ? "bg-blue-50/80 text-blue-700 font-semibold shadow-sm ring-1 ring-inset ring-blue-500/10"
                                    : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900"
                            }`}
                        >
                            <span
                                className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform ${activeProjectId === null ? "bg-blue-500 scale-110 shadow-sm" : "bg-gray-300 group-hover:scale-110 group-hover:bg-gray-400"}`}
                            />
                            <span className="flex-1 text-left">
                                {" "}
                                All tasks{" "}
                            </span>
                        </button>
                        {projects.map((project, index) => {
                            const isActiveProject =
                                activeProjectId === project.id;
                            return (
                                <div
                                    key={project.id}
                                    className={`relative group flex items-center rounded-lg transition-all duration-200 ${
                                        isActiveProject
                                            ? "bg-blue-50/80 text-blue-700 font-semibold shadow-sm ring-1 ring-inset ring-blue-500/10"
                                            : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900"
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onProjectChange(project.id);
                                            closeMenus();
                                        }}
                                        className="flex-1 flex items-center gap-2.5 px-2.5 py-2 text-[13px] font-medium text-left touch-manipulation outline-none"
                                    >
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform shadow-sm ${isActiveProject ? "scale-110" : "group-hover:scale-110"} ${!project.color ? getProjectColor(index) : ""}`}
                                            style={
                                                project.color
                                                    ? {
                                                          backgroundColor:
                                                              project.color,
                                                      }
                                                    : undefined
                                            }
                                        />
                                        <span className="flex-1 truncate">
                                            {project.name}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setProjectMenuId(
                                                projectMenuId === project.id
                                                    ? null
                                                    : project.id,
                                            );
                                            setTeamMenuId(null);
                                        }}
                                        className={`p-1 mr-1.5 rounded transition-colors touch-manipulation shrink-0 ${isActiveProject ? "text-blue-500 hover:bg-blue-100/50" : "text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 hover:text-gray-700"}`}
                                    >
                                        <MoreHorizontal size={16} />
                                    </button>
                                    {projectMenuId === project.id && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={closeMenus}
                                            />
                                            <div className="absolute right-2 top-[80%] mt-1 z-20 py-1 bg-white rounded-lg shadow-xl border border-gray-100 min-w-[140px] animate-in fade-in zoom-in-95 duration-100">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onEditProject(project);
                                                        closeMenus();
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-[13px] font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50 outline-none"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onDeleteProject(
                                                            project,
                                                        );
                                                        closeMenus();
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-[13px] font-medium text-red-600 hover:bg-red-50 focus:bg-red-50 outline-none"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                        {projects.length === 0 && (
                            <p className="px-3 py-2 text-xs text-gray-400 font-medium">
                                No projects yet
                            </p>
                        )}
                    </nav>
                </div>

                {/* Teams */}
                <div className="mb-2">
                    <div className="flex items-center justify-between px-3 mb-2 group">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Teams
                        </h3>
                        <button
                            type="button"
                            onClick={() => {
                                onAddTeam();
                                closeMenus();
                            }}
                            className="p-1 rounded bg-gray-50/0 group-hover:bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
                            title="Add team"
                        >
                            <Plus size={14} strokeWidth={2.5} />
                        </button>
                    </div>
                    <nav className="space-y-0.5 px-1">
                        {teams.map((team, index) => {
                            const isActiveTeam = teamMenuId === team.id;
                            return (
                                <div
                                    key={team.id}
                                    className="relative group flex items-center rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-100/50 hover:text-gray-900"
                                >
                                    <div className="flex-1 flex items-center gap-2.5 px-2.5 py-2 text-[13px] font-medium text-left">
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-110 shadow-sm ${!team.color ? getProjectColor(index) : ""}`}
                                            style={
                                                team.color
                                                    ? {
                                                          backgroundColor:
                                                              team.color,
                                                      }
                                                    : undefined
                                            }
                                        />
                                        <span className="flex-1 truncate">
                                            {team.name}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTeamMenuId(
                                                teamMenuId === team.id
                                                    ? null
                                                    : team.id,
                                            );
                                            setProjectMenuId(null);
                                        }}
                                        className="p-1 mr-1.5 rounded text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 hover:text-gray-700 transition-colors touch-manipulation shrink-0"
                                    >
                                        <MoreHorizontal size={16} />
                                    </button>
                                    {isActiveTeam && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={closeMenus}
                                            />
                                            <div className="absolute right-2 top-[80%] mt-1 z-20 py-1 bg-white rounded-lg shadow-xl border border-gray-100 min-w-[140px] animate-in fade-in zoom-in-95 duration-100">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onEditTeam(team);
                                                        closeMenus();
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-[13px] font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50 outline-none"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onDeleteTeam(team);
                                                        closeMenus();
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-[13px] font-medium text-red-600 hover:bg-red-50 focus:bg-red-50 outline-none"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                        {teams.length === 0 && (
                            <p className="px-3 py-2 text-xs text-gray-400 font-medium">
                                No teams yet
                            </p>
                        )}
                    </nav>
                </div>
            </div>
        </aside>
    );
}
