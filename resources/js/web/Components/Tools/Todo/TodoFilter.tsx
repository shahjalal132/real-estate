import React, { useState, useRef, useEffect } from "react";
import {
    Filter,
    ChevronDown,
    Plus,
    Calendar,
    User,
    Clock,
    CheckCircle2,
} from "lucide-react";
import ActionBtn from "./ActionBtn";

interface FilterOption {
    id: string;
    label: string;
    icon?: React.ReactNode;
    type: "status" | "date" | "other";
}

export default function TodoFilter() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const quickFilters: FilterOption[] = [
        {
            id: "incomplete",
            label: "Incomplete tasks",
            type: "status",
            icon: <CheckCircle2 size={14} className="text-gray-400" />,
        },
        {
            id: "completed",
            label: "Completed tasks",
            type: "status",
            icon: <CheckCircle2 size={14} className="text-green-500" />,
        },
        {
            id: "due_week",
            label: "Due this week",
            type: "date",
            icon: <Calendar size={14} />,
        },
        {
            id: "due_next_week",
            label: "Due next week",
            type: "date",
            icon: <Calendar size={14} />,
        },
    ];

    const additionalFilters = [
        {
            id: "completion_status",
            label: "Completion status",
            icon: <CheckCircle2 size={14} />,
        },
        { id: "start_date", label: "Start date", icon: <Calendar size={14} /> },
        { id: "due_date", label: "Due date", icon: <Calendar size={14} /> },
        { id: "created_by", label: "Created by", icon: <User size={14} /> },
        { id: "created_on", label: "Created on", icon: <Clock size={14} /> },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setShowAddMenu(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const toggleFilter = (id: string) => {
        setActiveFilters((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
        );
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <ActionBtn
                icon={<Filter size={14} />}
                label="Filter"
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-[500px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 text-gray-900 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-lg text-gray-900">
                            {" "}
                            Filters{" "}
                        </h3>
                        <button
                            onClick={() => {
                                setActiveFilters([]);
                                setIsOpen(false);
                            }}
                            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Clear
                        </button>
                    </div>

                    <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-2 font-medium">
                            {" "}
                            Quick filters{" "}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {quickFilters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => toggleFilter(filter.id)}
                                    className={`
                                        flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-colors border
                                        ${
                                            activeFilters.includes(filter.id)
                                                ? "bg-blue-50 border-blue-200 text-blue-700"
                                                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                                        }
                                    `}
                                >
                                    {filter.icon}
                                    {filter.label}
                                    {activeFilters.includes(filter.id) && (
                                        <ChevronDown size={12} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowAddMenu(!showAddMenu)}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <Plus size={14} />
                            Add filter
                            <ChevronDown size={14} />
                        </button>

                        {showAddMenu && (
                            <div className="absolute top-8 left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                                {additionalFilters.map((option) => (
                                    <button
                                        key={option.id}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                        onClick={() => {
                                            // Handle adding complex filter logic here later
                                            toggleFilter(option.id);
                                            setShowAddMenu(false);
                                        }}
                                    >
                                        {option.icon}
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
