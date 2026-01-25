import React from "react";
import { Plus } from "lucide-react";
import ActionBtn from "./ActionBtn";
import TodoFilter from "./TodoFilter";
import TodoSort from "./TodoSort";
import TodoGroup from "./TodoGroup";
import TodoOptions from "./TodoOptions";
import { ViewMode } from "./types";

interface ViewToolbarProps {
    activeView: ViewMode;
    onAddTask: () => void;
}

export default function ViewToolbar({
    activeView,
    onAddTask,
}: ViewToolbarProps) {
    // Return null for views that have their own specific toolbar or don't need this standard one
    if (activeView === "Calendar" || activeView === "Dashboard") {
        return null;
    }

    // Default Toolbar (List, Board)
    return (
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
                <TodoFilter />
                <TodoSort />
                <TodoGroup />
                <TodoOptions />
            </div>
        </div>
    );
}
