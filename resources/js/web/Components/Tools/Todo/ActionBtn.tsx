import React from "react";

interface ActionBtnProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

export default function ActionBtn({ icon, label, onClick }: ActionBtnProps) {
    return (
        <button 
            onClick= { onClick }
    className = "flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-md hover:text-gray-700 transition-colors"
        >
        { icon }
    { label }
    </button>
    );
}
