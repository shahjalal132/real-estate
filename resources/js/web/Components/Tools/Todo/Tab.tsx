import React from "react";

interface TabProps {
    icon?: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export default function Tab({
    icon,
    label,
    active = false,
    onClick,
}: TabProps) {
    return (
        <div
            onClick={onClick}
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
