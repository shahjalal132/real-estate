import React from "react";
import { ChevronRight } from "lucide-react";

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    hasSubmenu?: boolean;
    onClick?: () => void;
}

export default function SidebarItem({
    icon,
    label,
    active = false,
    hasSubmenu = false,
    onClick,
}: SidebarItemProps) {
    return (
        <div
            onClick={onClick}
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
