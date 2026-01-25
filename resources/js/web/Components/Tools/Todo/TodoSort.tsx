import React, { useState, useRef, useEffect } from "react";
import {
    ArrowUpDown,
    Calendar,
    User,
    Clock,
    ThumbsUp,
    ArrowDownAZ,
    ListTodo,
} from "lucide-react";
import ActionBtn from "./ActionBtn";

interface SortOption {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export default function TodoSort() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSort, setActiveSort] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const sortOptions: SortOption[] = [
        { id: "start_date", label: "Start date", icon: <Calendar size={14} /> },
        { id: "due_date", label: "Due date", icon: <Calendar size={14} /> },
        { id: "created_by", label: "Created by", icon: <User size={14} /> },
        { id: "created_on", label: "Created on", icon: <Clock size={14} /> },
        {
            id: "last_modified_on",
            label: "Last modified on",
            icon: <Clock size={14} />,
        },
        {
            id: "completed_on",
            label: "Completed on",
            icon: <Clock size={14} />,
        },
        { id: "likes", label: "Likes", icon: <ThumbsUp size={14} /> },
        {
            id: "alphabetical",
            label: "Alphabetical",
            icon: <ArrowDownAZ size={14} />,
        },
        { id: "project", label: "Project", icon: <ListTodo size={14} /> },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSort = (id: string) => {
        if (activeSort === id) {
            setActiveSort("");
        } else {
            setActiveSort(id);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <ActionBtn
                icon={<ArrowUpDown size={14} />}
                label="Sort"
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div className="absolute top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 text-gray-900 py-1">
                    {sortOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSort(option.id)}
                            className={`
                                w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors
                                ${activeSort === option.id ? "text-blue-600 bg-blue-50" : "text-gray-700"}
                            `}
                        >
                            <span
                                className={
                                    activeSort === option.id
                                        ? "text-blue-600"
                                        : "text-gray-500"
                                }
                            >
                                {option.icon}
                            </span>
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
