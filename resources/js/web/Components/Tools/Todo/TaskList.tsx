import React, { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Task } from "./types";
import TaskRow from "./TaskRow";

interface TaskListProps {
    tasks: Task[];
    onToggleTask: (id: number) => void;
    onAddTask: () => void;
    onUpdateTask: (id: number, updates: Partial<Task>) => void;
}

export default function TaskList({
    tasks,
    onToggleTask,
    onAddTask,
    onUpdateTask,
}: TaskListProps) {
    const activeTasks = tasks.filter((t) => !t.completed);

    // In a real app, these would filter by date. For now, we mock the distribution or just show empty sections
    // to match the screenshot structure exactly as requested.
    const recentlyAssigned = activeTasks;
    const doToday: Task[] = [];
    const untitledSection: Task[] = [];
    const doNextWeek: Task[] = [];
    const doLater: Task[] = [];

    return (
        <div className= "px-6 text-[#2A2B2D]" >
        {/* Table Header */ }
        < div className = "grid grid-cols-[1fr_120px_120px_180px_140px_40px] gap-4 py-2 border-b border-[#E0E0E0] text-xs font-semibold text-gray-500 uppercase" >
            <div className="pl-8" > Name </div>
                < div className = "pl-1 border-l border-[#E0E0E0]" > Due date </div>
                    < div className = "pl-1 border-l border-[#E0E0E0]" > Collaborators </div>
                        < div className = "pl-1 border-l border-[#E0E0E0]" > Projects </div>
                            < div className = "pl-1 border-l border-[#E0E0E0]" > Task visibility </div>
                                < div className = "flex justify-center border-l border-[#E0E0E0]" >
                                    <Plus size={ 14 } />
                                        </div>
                                        </div>

                                        < div className = "mt-4 space-y-6" >
                                            <TaskSection 
                    title="Recently assigned"
    tasks = { recentlyAssigned }
    onToggleTask = { onToggleTask }
    onUpdateTask = { onUpdateTask }
    onAddTask = { onAddTask }
    isOpenDefault = { true}
        />
        <TaskSection 
                    title="Do today"
    tasks = { doToday }
    onToggleTask = { onToggleTask }
    onUpdateTask = { onUpdateTask }
    onAddTask = { onAddTask }
    isOpenDefault = { false}
        />
        <TaskSection 
                    title="Untitled section"
    tasks = { untitledSection }
    onToggleTask = { onToggleTask }
    onUpdateTask = { onUpdateTask }
    onAddTask = { onAddTask }
    isOpenDefault = { false}
        />
        <TaskSection 
                    title="Do next week"
    tasks = { doNextWeek }
    onToggleTask = { onToggleTask }
    onUpdateTask = { onUpdateTask }
    onAddTask = { onAddTask }
    isOpenDefault = { false}
        />
        <TaskSection 
                    title="Do later"
    tasks = { doLater }
    onToggleTask = { onToggleTask }
    onUpdateTask = { onUpdateTask }
    onAddTask = { onAddTask }
    isOpenDefault = { false}
        />
        </div>

        < div className = "mt-4 mb-8 flex items-center gap-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors text-sm" >
            <Plus size={ 16 } />
                < span > Add section </span>
                    </div>
                    </div>
    );
}

function TaskSection({
    title,
    tasks,
    onToggleTask,
    onUpdateTask,
    onAddTask,
    isOpenDefault
}: {
    title: string,
    tasks: Task[],
    onToggleTask: (id: number) => void,
    onUpdateTask: (id: number, updates: Partial<Task>) => void,
    onAddTask: () => void,
    isOpenDefault: boolean
}) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);

    return (
        <div>
        <div 
                className= "flex items-center gap-1 mb-2 group cursor-pointer"
    onClick = {() => setIsOpen(!isOpen)
}
            >
    {
        isOpen?(
                    <ChevronDown size = { 16} className = "text-gray-400 group-hover:text-gray-600 transition-colors" />
                ): (
                <ChevronRight size = { 16 } className = "text-gray-400 group-hover:text-gray-600 transition-colors" />
                )}
<h3 className="text-sm font-semibold text-[#2A2B2D] group-hover:text-black transition-colors" >
    { title }
    </h3>
    </div>

{
    isOpen && (
        <div className="space-y-0" >
        {
            tasks.map((task) => (
                <TaskRow
                            key= { task.id }
                            task = { task }
                            onToggleComplete = { onToggleTask }
                            onUpdateTask = { onUpdateTask }
                />
                    ))
        }
    {/* Add Task Quick Row */ }
    <div
                        onClick={ onAddTask }
    className = "pl-8 py-2 text-sm text-gray-400 italic hover:text-gray-600 cursor-pointer hover:bg-gray-50 rounded-md transition-colors flex items-center gap-2"
        >
        <span>Add task...</span>
            </div>
            </div>
            )
}
</div>
    );
}
