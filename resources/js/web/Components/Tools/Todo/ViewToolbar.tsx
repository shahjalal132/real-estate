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
}: ViewToolbarProps) {
    if (activeView === "Calendar" || activeView === "Dashboard") {
        return null;
    }

    return (
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 gap-2 flex-wrap">
            <div className="flex items-center gap-2 min-h-[44px]">
                <TodoFilter />
                <TodoSort />
                <TodoGroup />
                <TodoOptions />
            </div>
        </div>
    );
}
