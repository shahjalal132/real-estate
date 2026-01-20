import React, { useState } from "react";
import {
    Menu,
    Plus,
    CheckCircle2,
    Calendar,
    LayoutGrid,
    List,
    MoreHorizontal,
    ChevronDown,
    Filter,
    ArrowUpDown,
    Users,
    Home,
    Inbox,
    Target,
    BarChart2,
    Briefcase as Portfolio,
    CheckSquare,
    ChevronRight,
} from "lucide-react";
import AppLayout from "../../Layouts/AppLayout";

// Mock Data
const tasks = [
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
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <AppLayout title="To-Do List">
            <div className="flex w-full bg-white font-sans text-[#2A2B2D] overflow-hidden h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <aside
                    className={`${
                        sidebarOpen ? "w-[240px]" : "w-0"
                    } bg-[#F9F8F8] flex-shrink-0 transition-all duration-300 border-r border-[#E0E0E0] flex flex-col`}
                >
                    <div className="p-4 flex items-center justify-between">
                        <button className="flex items-center gap-2 bg-[#F06A6A] text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#D95D5D] transition-colors shadow-sm">
                            <div className="bg-white/20 rounded-full p-0.5">
                                <Plus size={14} />
                            </div>
                            Create
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-2 space-y-0.5">
                        <SidebarItem icon={<Home size={18} />} label="Home" />
                        <SidebarItem
                            icon={<CheckCircle2 size={18} />}
                            label="My tasks"
                            active
                        />
                        <SidebarItem icon={<Inbox size={18} />} label="Inbox" />

                        <div className="pt-6 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Insights
                        </div>
                        <SidebarItem
                            icon={<BarChart2 size={18} />}
                            label="Reporting"
                        />
                        <SidebarItem
                            icon={<Portfolio size={18} />}
                            label="Portfolios"
                        />
                        <SidebarItem
                            icon={<Target size={18} />}
                            label="Goals"
                        />

                        <div className="pt-6 pb-2 px-3 flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider group cursor-pointer">
                            <span>Projects </span>
                            <Plus
                                size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <SidebarItem
                            icon={
                                <div className="w-2.5 h-2.5 rounded bg-[#4CE0D2]" />
                            }
                            label="Tasks to get done"
                        />

                        <div className="pt-6 pb-2 px-3 flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider group cursor-pointer">
                            <span>Teams </span>
                            <Plus
                                size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <SidebarItem
                            icon={<Users size={18} />}
                            label="Avi's first team"
                            hasSubmenu
                        />
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 bg-white">
                    {/* Tool specific Header Controls */}
                    <div className="pt-4 px-6 flex items-center gap-3">
                        {!sidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500"
                            >
                                <Menu size={20} />
                            </button>
                        )}
                        {sidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500"
                            >
                                <Menu size={20} />
                            </button>
                        )}
                    </div>

                    {/* Page Content */}
                    <div className="flex-1 overflow-auto">
                        {/* My Tasks Header */}
                        <div className="px-6 pt-2 pb-2">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {/* <div className="w-12 h-12 rounded-full bg-[#3FD2C7] flex items-center justify-center text-white text-lg font-bold">
                                        SM
                                    </div> */}
                                    <div>
                                        {/* <div className="flex items-center gap-1">
                                            <h1 className="text-xl font-semibold text-[#2A2B2D]">
                                                {" "}
                                                My tasks{" "}
                                            </h1>
                                            <ChevronDown
                                                size={18}
                                                className="text-gray-400 cursor-pointer hover:text-gray-600"
                                            />
                                        </div> */}
                                        <div className="flex items-center gap-4 mt-2 border-b border-transparent">
                                            <Tab
                                                active
                                                label="List"
                                                icon={<List size={14} />}
                                            />
                                            <Tab
                                                label="Board"
                                                icon={<LayoutGrid size={14} />}
                                            />
                                            <Tab
                                                label="Calendar"
                                                icon={<Calendar size={14} />}
                                            />
                                            <Tab
                                                label="Dashboard"
                                                icon={<BarChart2 size={14} />}
                                            />
                                            <Tab label="Files" />
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
                                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[#4573D2] text-white text-sm font-medium rounded-l-md hover:bg-[#3b63b8] transition-colors">
                                        <Plus size={14} />
                                        Add task
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <ActionBtn
                                        icon={<Filter size={14} />}
                                        label="Filter"
                                    />
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

                        {/* Task List */}
                        <div className="px-6">
                            {/* Table Header */}
                            <div className="grid grid-cols-[1fr_120px_120px_180px_140px_40px] gap-4 py-2 border-b border-[#E0E0E0] text-xs font-semibold text-gray-500 uppercase">
                                <div className="pl-8"> Name </div>
                                <div> Due date </div>
                                <div> Collaborators </div>
                                <div> Projects </div>
                                <div> Task visibility </div>
                                <div className="flex justify-center">
                                    {" "}
                                    <Plus size={14} />
                                </div>
                            </div>

                            {/* Recently Assigned Section */}
                            <div className="mt-4">
                                <div className="flex items-center gap-1 mb-2 group cursor-pointer">
                                    <ChevronDown
                                        size={16}
                                        className="text-gray-400 group-hover:text-gray-600"
                                    />
                                    <h3 className="text-sm font-semibold text-[#2A2B2D] group-hover:text-black">
                                        {" "}
                                        Recently assigned{" "}
                                    </h3>
                                </div>

                                <div className="space-y-0">
                                    {tasks.map((task) => (
                                        <TaskRow key={task.id} task={task} />
                                    ))}
                                    <div className="pl-8 py-2 text-sm text-gray-400 italic hover:text-gray-600 cursor-pointer hover:bg-gray-50 rounded-md transition-colors flex items-center gap-2">
                                        <span>Add task...</span>
                                    </div>
                                </div>
                            </div>

                            {/* Do Today Section */}
                            <div className="mt-6">
                                <div className="flex items-center gap-1 mb-2 group cursor-pointer">
                                    <ChevronRight
                                        size={16}
                                        className="text-gray-400 group-hover:text-gray-600"
                                    />
                                    <h3 className="text-sm font-semibold text-[#2A2B2D] group-hover:text-black">
                                        {" "}
                                        Do today{" "}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}

function SidebarItem({ icon, label, active = false, hasSubmenu = false }: any) {
    return (
        <div
            className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer group text-sm ${
                active
                    ? "bg-[#E5F2FD] text-[#4573D2]"
                    : "text-[#5A5A5A] hover:bg-[#EBEBEB]"
            }`}
        >
            <div className="flex items-center gap-3">
                <span
                    className={`${active ? "text-[#4573D2]" : "text-[#6E6E6E] group-hover:text-[#2A2B2D]"}`}
                >
                    {icon}
                </span>
                <span className="font-medium"> {label} </span>
            </div>
            {hasSubmenu && (
                <ChevronRight
                    size={14}
                    className="text-gray-400 opacity-0 group-hover:opacity-100"
                />
            )}
        </div>
    );
}

function Tab({ icon, label, active = false }: any) {
    return (
        <div
            className={`flex items-center gap-1.5 px-1 py-3 text-sm font-medium border-b-2 cursor-pointer transition-colors ${
                active
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
            }`}
        >
            {icon}
            {label}
        </div>
    );
}

function ActionBtn({ icon, label }: any) {
    return (
        <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-md hover:text-gray-700 transition-colors">
            {icon}
            {label}
        </button>
    );
}

function TaskRow({ task }: any) {
    return (
        <div className="group grid grid-cols-[1fr_120px_120px_180px_140px_40px] gap-4 py-2 border-b border-[#F0F0F0] hover:bg-[#F9F9F9] items-center text-sm transition-colors">
            <div className="flex items-center gap-3 pl-2">
                <div className="relative flex-shrink-0 cursor-pointer group/check">
                    <div
                        className={`w-4 h-4 rounded-full border ${task.completed ? "bg-[#5CB85C] border-[#5CB85C]" : "border-gray-400 hover:border-black"} flex items-center justify-center transition-colors`}
                    >
                        {task.completed && (
                            <CheckSquare size={10} className="text-white" />
                        )}
                        {!task.completed && (
                            <CheckSquare
                                size={10}
                                className="text-white opacity-0 group-hover/check:opacity-20 text-black"
                            />
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate"> {task.title} </span>
                    {task.comments && (
                        <div className="flex items-center gap-0.5 text-xs text-gray-400">
                            <div className="w-4 h-4 flex items-center justify-center bg-gray-100 rounded text-[10px]">
                                {" "}
                                {task.comments}{" "}
                            </div>
                            <span className="sr-only"> comments </span>
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`${
                    task.dueDate.includes("Jul") || task.dueDate.includes("Aug")
                        ? "text-[#D32F2F]"
                        : "text-gray-500"
                } text-xs`}
            >
                {task.dueDate}
            </div>
            <div className="flex -space-x-1">
                {task.collaborators.map((initials: string, i: number) => (
                    <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-[#B2EBF2] border border-white flex items-center justify-center text-[9px] font-bold text-[#00838F]"
                    >
                        {initials}
                    </div>
                ))}
            </div>
            <div>
                {task.project && (
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#E5F6E5] text-[#1E7E34] text-xs font-medium truncate max-w-full">
                        • {task.project}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
                {task.visibility === "Only me" ? (
                    <>
                        <Users size={12} className="text-gray-400" />
                        <span>Only me</span>
                    </>
                ) : (
                    <>
                        <Users size={12} className="text-gray-400" />
                        <span>Collaborators </span>
                    </>
                )}
            </div>
            <div className="opacity-0 group-hover:opacity-100 flex justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                <Plus size={16} />
            </div>
        </div>
    );
}
