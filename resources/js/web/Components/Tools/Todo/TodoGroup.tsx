import React, { useState, useRef, useEffect } from "react";
import {
    LayoutGrid,
    X,
    MoreHorizontal,
    GripVertical,
    ChevronDown,
    Plus,
    Calendar,
    User,
    Clock,
    ListTodo,
} from "lucide-react";
import ActionBtn from "./ActionBtn";

interface GroupOption {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export default function TodoGroup() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeGroups, setActiveGroups] = useState<string[]>(["section"]);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const groupOptions: GroupOption[] = [
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
        { id: "project", label: "Project", icon: <ListTodo size={14} /> },
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

    const addGroup = (id: string) => {
        if (!activeGroups.includes(id)) {
            setActiveGroups([...activeGroups, id]);
        }
        setShowAddMenu(false);
    };

    const removeGroup = (id: string) => {
        setActiveGroups(activeGroups.filter((g) => g !== id));
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <ActionBtn
                icon={<LayoutGrid size={14} />}
                label="Group"
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-[550px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 text-gray-900 p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium text-lg text-gray-900">
                                {" "}
                                Groups{" "}
                            </h3>
                            <button className="text-xs text-gray-500 hover:text-gray-900 underline transition-colors">
                                Send feedback
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                setActiveGroups([]);
                                setIsOpen(false);
                            }}
                            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Clear
                        </button>
                    </div>

                    {/* Active Groups List */}
                    <div className="flex flex-col gap-2 mb-4">
                        {activeGroups.map((group) => (
                            <div
                                key={group}
                                className="flex items-center gap-2 group"
                            >
                                <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                                    <GripVertical size={16} />
                                </button>

                                <div className="flex-1 flex gap-2">
                                    <div className="flex-1 relative">
                                        <button className="flex items-center justify-between w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 bg-white text-left">
                                            <span className="truncate capitalize">
                                                {" "}
                                                {group.replace("_", " ")}{" "}
                                            </span>
                                            <ChevronDown
                                                size={14}
                                                className="text-gray-400"
                                            />
                                        </button>
                                    </div>

                                    <div className="flex-1 relative">
                                        <button className="flex items-center justify-between w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 bg-white text-left">
                                            <span className="truncate">
                                                {" "}
                                                Custom order{" "}
                                            </span>
                                            <ChevronDown
                                                size={14}
                                                className="text-gray-400"
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                                        <MoreHorizontal size={16} />
                                    </button>
                                    <button
                                        onClick={() => removeGroup(group)}
                                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Subgroup Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowAddMenu(!showAddMenu)}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
                        >
                            <Plus size={14} />
                            Add subgroup
                            <ChevronDown size={14} />
                        </button>

                        {showAddMenu && (
                            <div className="absolute top-8 left-0 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20 max-h-64 overflow-y-auto">
                                {groupOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                        onClick={() => addGroup(option.id)}
                                    >
                                        <span className="text-gray-400">
                                            {" "}
                                            {option.icon}{" "}
                                        </span>
                                        {option.label}
                                    </button>
                                ))}
                                <div className="border-t border-gray-100 my-1">
                                    {" "}
                                </div>
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-2">
                                    <Plus size={14} />
                                    Add custom field
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-100 my-4"> </div>

                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        <Plus size={14} />
                        Add custom field
                    </button>
                </div>
            )}
        </div>
    );
}
