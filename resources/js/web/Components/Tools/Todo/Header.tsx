import React from "react";
import {
    Menu,
    List,
    LayoutGrid,
    Calendar,
    BarChart2,
    Plus,
    Users,
    Filter,
    ArrowUpDown,
    MoreHorizontal,
} from "lucide-react";
import Tab from "./Tab";
import ActionBtn from "./ActionBtn";
import { ViewMode } from "./types";

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    activeView: ViewMode;
    setView: (view: ViewMode) => void;
    onAddTask: () => void;
}

export default function Header({
    sidebarOpen,
    setSidebarOpen,
    activeView,
    setView,
    onAddTask,
}: HeaderProps) {
    return (
        <>
            {/* Tool specific Header Controls */}
            <div className="pt-4 px-6 flex items-center gap-3">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* View Controls */}
            <div className="px-6 pt-2 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="flex items-center gap-4 mt-2 border-b border-transparent">
                                <Tab
                                    active={activeView === "List"}
                                    label="List"
                                    icon={<List size={14} />}
                                    onClick={() => setView("List")}
                                />
                                <Tab
                                    active={activeView === "Board"}
                                    label="Board"
                                    icon={<LayoutGrid size={14} />}
                                    onClick={() => setView("Board")}
                                />
                                <Tab
                                    active={activeView === "Calendar"}
                                    label="Calendar"
                                    icon={<Calendar size={14} />}
                                    onClick={() => setView("Calendar")}
                                />
                                <Tab
                                    active={activeView === "Dashboard"}
                                    label="Dashboard"
                                    icon={<BarChart2 size={14} />}
                                    onClick={() => setView("Dashboard")}
                                />
                                <Tab
                                    label="Files"
                                    active={activeView === "Files"}
                                    onClick={() => setView("Files")}
                                />
                                <button className="p-1 hover:bg-gray-100 rounded-md text-gray-500">
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200 bg-white">
                            <Users size={14} />
                            Share
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200 bg-white">
                            <LayoutGrid size={14} />
                            Customize
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-2">
                    <div className="flex items-center gap-0">
                        <button
                            onClick={onAddTask}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#4573D2] text-white text-sm font-medium rounded-l-md hover:bg-[#3b63b8] transition-colors"
                        >
                            <Plus size={14} />
                            Add task
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <ActionBtn icon={<Filter size={14} />} label="Filter" />
                        <ActionBtn
                            icon={<ArrowUpDown size={14} />}
                            label="Sort"
                        />
                        <ActionBtn
                            icon={<LayoutGrid size={14} />}
                            label="Group"
                        />
                        <ActionBtn
                            icon={<MoreHorizontal size={14} />}
                            label="Options"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
