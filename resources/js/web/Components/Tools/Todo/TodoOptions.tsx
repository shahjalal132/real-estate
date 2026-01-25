import React, { useState, useEffect, useRef } from "react";
import {
    MoreHorizontal,
    ArrowRight,
    List,
    Columns,
    Filter,
    ArrowUpDown,
    LayoutGrid,
    ChevronRight,
} from "lucide-react";
import ActionBtn from "./ActionBtn";

export default function TodoOptions() {
    const [isOpen, setIsOpen] = useState(false);
    const [viewName, setViewName] = useState("List");
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                drawerRef.current &&
                !drawerRef.current.contains(event.target as Node)
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

    return (
        <div className="relative" ref={drawerRef}>
            <ActionBtn
                icon={<MoreHorizontal size={14} />}
                label="Options"
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div
                    className="absolute top-full right-0 z-50 w-80 bg-white border-l border-b border-gray-200 shadow-xl animate-in slide-in-from-right duration-200 flex flex-col"
                    style={{ height: "calc(100vh - 130px)" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">
                            List
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* View Settings */}
                        <div className="mb-6">
                            <div className="flex gap-4 mb-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-xs font-medium text-gray-500">
                                        Icon
                                    </label>
                                    <div className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:border-gray-400 cursor-pointer bg-white">
                                        <List size={18} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5 flex-[3]">
                                    <label className="text-xs font-medium text-gray-500">
                                        View name
                                    </label>
                                    <input
                                        type="text"
                                        value={viewName}
                                        onChange={(e) =>
                                            setViewName(e.target.value)
                                        }
                                        className="h-9 w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 my-2"> </div>

                        {/* Menu Items */}
                        <div className="flex flex-col">
                            <MenuItem
                                icon={<Columns size={16} />}
                                label="Show/hide columns"
                                value="7 hidden"
                            />
                            <MenuItem
                                icon={<Filter size={16} />}
                                label="Filters"
                            />
                            <MenuItem
                                icon={<ArrowUpDown size={16} />}
                                label="Sorts"
                            />
                            <MenuItem
                                icon={<LayoutGrid size={16} />}
                                label="Groups"
                            />
                        </div>

                        <div className="border-t border-gray-100 my-4"> </div>

                        <button className="text-sm text-gray-500 hover:text-gray-900 hover:underline transition-colors w-fit">
                            Send feedback
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function MenuItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value?: string;
}) {
    return (
        <button className="flex items-center justify-between w-full py-3 px-2 hover:bg-gray-50 rounded-md group transition-colors">
            <div className="flex items-center gap-3 text-gray-700">
                <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    {" "}
                    {icon}{" "}
                </span>
                <span className="text-sm font-medium"> {label} </span>
            </div>
            <div className="flex items-center gap-1">
                {value && (
                    <span className="text-xs text-gray-400 mr-1">
                        {" "}
                        {value}{" "}
                    </span>
                )}
                <ChevronRight
                    size={14}
                    className="text-gray-300 group-hover:text-gray-500"
                />
            </div>
        </button>
    );
}
