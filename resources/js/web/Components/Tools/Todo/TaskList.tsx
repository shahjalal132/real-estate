import React, { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Task } from "./types";
import TaskRow from "./TaskRow";

interface TaskListProps {
    tasks: Task[];
    onToggleTask: (id: number) => void;
    onAddTask: () => void;
}

export default function TaskList({ tasks, onToggleTask, onAddTask }: TaskListProps) {
    // Separate tasks into "Recently assigned" (or just all for now) and "Do today" logic if needed.
    // For now, mirroring the original design's sections but populate them dynamically.

    // We can just show all tasks for simplicty or split them.
    // Let's split by simple logic for demo:
    // "Recently assigned" -> all non-completed tasks? or just all?
    // The original mockup had manual categorization.

    // Simplification: Show all tasks in one list for now, or split by completion if desired.
    // Let's stick to the mockup sections but maybe just filter differently.

    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return (
        <div className= "px-6" >
        {/* Table Header */ }
        < div className = "grid grid-cols-[1fr_120px_120px_180px_140px_40px] gap-4 py-2 border-b border-[#E0E0E0] text-xs font-semibold text-gray-500 uppercase" >
            <div className="pl-8" > Name </div>
                < div > Due date </div>
                    < div > Collaborators </div>
                    < div > Projects </div>
                    < div > Task visibility </div>
                        < div className = "flex justify-center" >
                            { " "}
                            < Plus size = { 14} />
                                </div>
                                </div>

    {/* Recently Assigned Section (Active tasks) */ }
    <div className="mt-4" >
        <div className="flex items-center gap-1 mb-2 group cursor-pointer" >
            <ChevronDown
                        size={ 16 }
    className = "text-gray-400 group-hover:text-gray-600"
        />
        <h3 className="text-sm font-semibold text-[#2A2B2D] group-hover:text-black" >
            { " "}
                        Active Tasks{ " " }
    </h3>
        </div>

        < div className = "space-y-0" >
        {
            activeTasks.map((task) => (
                <TaskRow key= { task.id } task = { task } onToggleComplete = { onToggleTask } />
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
            </div>

    {/* Do Today / Completed Section */ }
    {
        completedTasks.length > 0 && (
            <div className="mt-6" >
                <div className="flex items-center gap-1 mb-2 group cursor-pointer" >
                    <ChevronRight
                            size={ 16 }
        className = "text-gray-400 group-hover:text-gray-600"
            />
            <h3 className="text-sm font-semibold text-[#2A2B2D] group-hover:text-black" >
                { " "}
                            Completed Tasks{ " " }
        </h3>
            </div>
            <div>
        {
            completedTasks.map((task) => (
                <TaskRow key= { task.id } task = { task } onToggleComplete = { onToggleTask } />
                        ))
        }
        </div>
            </div>
            )
    }
    </div>
    );
}
