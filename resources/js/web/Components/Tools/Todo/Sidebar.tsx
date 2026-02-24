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
} from "lucide-react";
import { ViewMode } from "./types";
import { Project } from "./types";
import { Team } from "./types";

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
}

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: "List", label: "List", icon: <List size={20} /> },
    { id: "Board", label: "Board", icon: <LayoutGrid size={20} /> },
    { id: "Calendar", label: "Calendar", icon: <Calendar size={20} /> },
    { id: "Dashboard", label: "Dashboard", icon: <BarChart2 size={20} /> },
    { id: "Files", label: "Files", icon: <FolderOpen size={20} /> },
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
            } bg-white shrink-0 transition-all duration-300 border-r border-gray-200 flex flex-col h-full overflow-hidden shadow-sm`}
        >
            <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-4">
                {/* Add Task — primary CTA, mobile-friendly touch target */}
                <button
                    type="button"
                    onClick={() => {
                        onAddTask();
                        closeMenus();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#4573D2] text-white font-semibold shadow-md hover:bg-[#3b63b8] active:scale-[0.98] transition-all min-h-[48px] touch-manipulation"
                >
                    <Plus size={20} strokeWidth={2.5} />
                    Add task
                </button>

                {/* Task management — view modes */}
                <div>
                    <h3 className="px-2 mb-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Task management
                    </h3>
                    <nav className="space-y-0.5">
                        {VIEW_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                    onViewChange(opt.id);
                                    closeMenus();
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors min-h-[48px] touch-manipulation ${
                                    activeView === opt.id
                                        ? "bg-[#4573D2] text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                                }`}
                            >
                                <span
                                    className={
                                        activeView === opt.id
                                            ? "text-white"
                                            : "text-gray-500"
                                    }
                                >
                                    {opt.icon}
                                </span>
                                <span className="flex-1 text-left">{opt.label}</span>
                                {activeView === opt.id && (
                                    <ChevronRight size={18} className="opacity-80" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Projects */}
                <div>
                    <div className="flex items-center justify-between px-2 mb-1.5">
                        <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                            Projects
                        </h3>
                        <button
                            type="button"
                            onClick={() => {
                                onAddProject();
                                closeMenus();
                            }}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
                            title="Add project"
                            aria-label="Add project"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                    <nav className="space-y-0.5">
                        <button
                            type="button"
                            onClick={() => {
                                onProjectChange(null);
                                closeMenus();
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors min-h-[48px] touch-manipulation ${
                                activeProjectId === null
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                            }`}
                        >
                            <span className="w-3 h-3 rounded-full bg-gray-300 shrink-0" />
                            <span className="flex-1 text-left">All tasks</span>
                        </button>
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="relative group flex items-center rounded-xl min-h-[48px] hover:bg-gray-50"
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        onProjectChange(project.id);
                                        closeMenus();
                                    }}
                                    className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors text-left touch-manipulation min-h-[48px] ${
                                        activeProjectId === project.id
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-600"
                                    }`}
                                >
                                    <span
                                        className={`w-3 h-3 rounded-full shrink-0 ${!project.color ? getProjectColor(index) : ""}`}
                                        style={
                                            project.color
                                                ? { backgroundColor: project.color }
                                                : undefined
                                        }
                                    />
                                    <span className="flex-1 truncate">{project.name}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setProjectMenuId(projectMenuId === project.id ? null : project.id);
                                        setTeamMenuId(null);
                                    }}
                                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-600 touch-manipulation shrink-0"
                                    aria-label="Project options"
                                >
                                    <MoreHorizontal size={18} />
                                </button>
                                {projectMenuId === project.id && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={closeMenus}
                                            aria-hidden
                                        />
                                        <div className="absolute right-2 top-full mt-1 z-20 py-1 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[120px]">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onEditProject(project);
                                                    closeMenus();
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onDeleteProject(project);
                                                    closeMenus();
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                        {projects.length === 0 && (
                            <p className="px-3 py-2 text-xs text-gray-400">No projects yet</p>
                        )}
                    </nav>
                </div>

                {/* Teams */}
                <div>
                    <div className="flex items-center justify-between px-2 mb-1.5">
                        <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                            Teams
                        </h3>
                        <button
                            type="button"
                            onClick={() => {
                                onAddTeam();
                                closeMenus();
                            }}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
                            title="Add team"
                            aria-label="Add team"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                    <nav className="space-y-0.5">
                        {teams.map((team, index) => (
                            <div
                                key={team.id}
                                className="relative group flex items-center rounded-xl min-h-[48px] hover:bg-gray-50"
                            >
                                <div className="flex-1 flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-600 min-h-[48px]">
                                    <span
                                        className={`w-3 h-3 rounded-full shrink-0 ${!team.color ? getProjectColor(index) : ""}`}
                                        style={
                                            team.color
                                                ? { backgroundColor: team.color }
                                                : undefined
                                        }
                                    />
                                    <span className="flex-1 truncate">{team.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTeamMenuId(teamMenuId === team.id ? null : team.id);
                                        setProjectMenuId(null);
                                    }}
                                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-600 touch-manipulation shrink-0"
                                    aria-label="Team options"
                                >
                                    <MoreHorizontal size={18} />
                                </button>
                                {teamMenuId === team.id && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={closeMenus}
                                            aria-hidden
                                        />
                                        <div className="absolute right-2 top-full mt-1 z-20 py-1 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[120px]">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onEditTeam(team);
                                                    closeMenus();
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onDeleteTeam(team);
                                                    closeMenus();
                                                }}
                                                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                        {teams.length === 0 && (
                            <p className="px-3 py-2 text-xs text-gray-400">No teams yet</p>
                        )}
                    </nav>
                </div>
            </div>
        </aside>
    );
}
