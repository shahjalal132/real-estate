import { Menu } from "lucide-react";
import ViewToolbar from "./ViewToolbar";
import { ViewMode } from "./types";

interface HeaderProps {
    activeView: ViewMode;
    setView: (view: ViewMode) => void;
    onAddTask: () => void;
    onToggleSidebar?: () => void;
}

export default function Header({
    activeView,
    onAddTask,
    onToggleSidebar,
}: HeaderProps) {
    return (
        <div className="px-4 sm:px-6 py-3 bg-white border-b border-gray-200 min-h-[52px] flex items-center">
            <div className="flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="p-3 -ml-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 transition-colors lg:hidden min-w-[44px] min-h-[44px] touch-manipulation"
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={22} />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900 truncate">
                        To-Do
                    </h1>
                </div>
                <ViewToolbar activeView={activeView} onAddTask={onAddTask} />
            </div>
        </div>
    );
}
