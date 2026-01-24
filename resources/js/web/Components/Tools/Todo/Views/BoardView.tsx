import React from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { Task } from "../types";
import TaskRow from "../TaskRow"; // Reusing TaskRow or creating Card? Let's create a simple Card style.

interface BoardViewProps {
    tasks: Task[];
    onToggleTask: (id: number) => void;
    onAddTask: () => void;
}

export default function BoardView({ tasks, onToggleTask, onAddTask }: BoardViewProps) {
    const todoTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    // For now, let's look at "To Do" vs "Completed" columns.
    // In a real app we might have customized statuses.

    return (
        <div className= "p-6 h-full overflow-x-auto" >
        <div className="flex gap-6 h-full" >
            {/* To Do Column */ }
            < div className = "w-[300px] flex-shrink-0 flex flex-col bg-gray-50 rounded-lg h-full max-h-full" >
                <div className="p-3 font-semibold text-sm text-gray-700 flex justify-between items-center border-b border-gray-200" >
                    <span>To Do < span className = "ml-1 text-gray-400 font-normal" > { todoTasks.length } < /span></span >
                        <div className="flex gap-1" >
                            <button className="p-1 hover:bg-gray-200 rounded text-gray-500" > <Plus size={ 14 } /></button >
                                <button className="p-1 hover:bg-gray-200 rounded text-gray-500" > <MoreHorizontal size={ 14 } /></button >
                                    </div>
                                    </div>
                                    < div className = "p-3 flex-1 overflow-y-auto space-y-3" >
                                    {
                                        todoTasks.map(task => (
                                            <BoardCard key= { task.id } task = { task } onToggleComplete = { onToggleTask } />
                         ))
                                    }
                                        < button
    onClick = { onAddTask }
    className = "w-full py-2 flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-200 rounded-md border border-dashed border-gray-300 text-sm"
        >
        <Plus size={ 14 } /> Add Task
            </button>
            </div>
            </div>

    {/* Completed Column */ }
    <div className="w-[300px] flex-shrink-0 flex flex-col bg-gray-50 rounded-lg h-full max-h-full" >
        <div className="p-3 font-semibold text-sm text-gray-700 flex justify-between items-center border-b border-gray-200" >
            <span>Completed < span className = "ml-1 text-gray-400 font-normal" > { completedTasks.length } < /span></span >
                <div className="flex gap-1" >
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500" > <MoreHorizontal size={ 14 } /></button >
                        </div>
                        </div>
                        < div className = "p-3 flex-1 overflow-y-auto space-y-3" >
                        {
                            completedTasks.map(task => (
                                <BoardCard key= { task.id } task = { task } onToggleComplete = { onToggleTask } />
                         ))
                        }
                            </div>
                            </div>

    {/* In Progress Mock Column */ }
    <div className="w-[300px] flex-shrink-0 flex flex-col bg-gray-50 rounded-lg h-full max-h-full opacity-60" >
        <div className="p-3 font-semibold text-sm text-gray-700 flex justify-between items-center border-b border-gray-200" >
            <span>In Progress < span className = "ml-1 text-gray-400 font-normal" > 0 < /span></span >
                <div className="flex gap-1" >
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500" > <Plus size={ 14 } /></button >
                        <button className="p-1 hover:bg-gray-200 rounded text-gray-500" > <MoreHorizontal size={ 14 } /></button >
                            </div>
                            </div>
                            < div className = "p-3 flex-1 overflow-y-auto flex items-center justify-center text-sm text-gray-400 italic" >
                                No tasks
                                    </div>
                                    </div>

                                    </div>
                                    </div>
    );
}

function BoardCard({ task, onToggleComplete }: { task: Task, onToggleComplete: (id: number) => void }) {
    return (
        <div className= "bg-white p-3 rounded shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group" >
        <div className="flex items-start justify-between mb-2" >
            <div 
                    className={ `w-4 h-4 mt-0.5 rounded-full border ${task.completed ? "bg-[#5CB85C] border-[#5CB85C]" : "border-gray-400/50"} flex items-center justify-center cursor-pointer` }
    onClick = {(e) => { e.stopPropagation(); onToggleComplete(task.id); }
}
                 >
    {/* Checkmark done in CSS or simple logic */ }
    </div>
{/* <MoreHorizontal size={14} className="text-gray-300 opacity-0 group-hover:opacity-100" /> */ }
</div>
    < div className = "text-sm font-medium text-gray-800 mb-2" > { task.title } </div>
        < div className = "flex items-center justify-between text-xs text-gray-500" >
            <div className={ task.dueDate.includes("Aug") ? "text-red-500" : "" }> { task.dueDate } </div>
                < div className = "flex -space-x-1" >
                {
                    task.collaborators.map((c, i) => (
                        <div key= { i } className = "w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[8px] text-blue-600 border border-white" >
                        { c }
                        </div>
                    ))
                }
                    </div>
                    </div>
                    </div>
    )
}
