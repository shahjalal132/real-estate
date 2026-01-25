import React from "react";
import {
    Plus,
    Home,
    CheckCircle2,
    Inbox,
    BarChart2,
    Briefcase as Portfolio,
    Target,
    Users,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
    isOpen: boolean;
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

export default function Sidebar({
    isOpen,
    activeFilter,
    onFilterChange,
}: SidebarProps) {
    return (
        <aside
            className={`${
                isOpen ? "w-[240px]" : "w-0"
            } bg-[#F9F8F8] flex-shrink-0 transition-all duration-300 border-r border-[#E0E0E0] flex flex-col h-full overflow-hidden`}
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
                <SidebarItem
                    icon={<Home size={18} />}
                    label="Home"
                    active={activeFilter === "Home"}
                    onClick={() => onFilterChange("Home")}
                />
                <SidebarItem
                    icon={<CheckCircle2 size={18} />}
                    label="My tasks"
                    active={activeFilter === "My tasks"}
                    onClick={() => onFilterChange("My tasks")}
                />
                <SidebarItem
                    icon={<Inbox size={18} />}
                    label="Inbox"
                    active={activeFilter === "Inbox"}
                    onClick={() => onFilterChange("Inbox")}
                />

                <div className="pt-6 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Insights
                </div>
                <SidebarItem
                    icon={<BarChart2 size={18} />}
                    label="Reporting"
                    active={activeFilter === "Reporting"}
                    onClick={() => onFilterChange("Reporting")}
                />
                <SidebarItem
                    icon={<Portfolio size={18} />}
                    label="Portfolios"
                    active={activeFilter === "Portfolios"}
                    onClick={() => onFilterChange("Portfolios")}
                />
                <SidebarItem
                    icon={<Target size={18} />}
                    label="Goals"
                    active={activeFilter === "Goals"}
                    onClick={() => onFilterChange("Goals")}
                />

                <div className="pt-6 pb-2 px-3 flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider group cursor-pointer">
                    <span>Projects </span>
                    <Plus
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                </div>
                <SidebarItem
                    icon={<div className="w-2.5 h-2.5 rounded bg-[#4CE0D2]" />}
                    label="Tasks to get done"
                    active={activeFilter === "Tasks to get done"}
                    onClick={() => onFilterChange("Tasks to get done")}
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
                    active={activeFilter === "Avi's first team"}
                    onClick={() => onFilterChange("Avi's first team")}
                />
            </nav>
        </aside>
    );
}
