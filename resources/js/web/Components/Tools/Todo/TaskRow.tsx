import React from "react";
import { CheckSquare, Plus, Users } from "lucide-react";
import { Task } from "./types";

interface TaskRowProps {
    task: Task;
    onToggleComplete: (id: number) => void;
}

export default function TaskRow({ task, onToggleComplete }: TaskRowProps) {
    return (
        <div className= "group grid grid-cols-[1fr_120px_120px_180px_140px_40px] gap-4 py-2 border-b border-[#F0F0F0] hover:bg-[#F9F9F9] items-center text-sm transition-colors" >
        <div className="flex items-center gap-3 pl-2" >
            <div 
                    className="relative flex-shrink-0 cursor-pointer group/check"
    onClick = {() => onToggleComplete(task.id)
}
                >
    <div
                        className={ `w-4 h-4 rounded-full border ${task.completed ? "bg-[#5CB85C] border-[#5CB85C]" : "border-gray-400 hover:border-black"} flex items-center justify-center transition-colors` }
                    >
{
    task.completed && (
        <CheckSquare size={ 10 } className = "text-white" />
                        )}
{
    !task.completed && (
        <CheckSquare
                                size={ 10 }
    className = "text-white opacity-0 group-hover/check:opacity-20 text-black"
        />
                        )
}
</div>
    </div>
    < div className = "flex items-center gap-2 min-w-0" >
        <span className="truncate" > { task.title } </span>
{
    task.comments && (
        <div className="flex items-center gap-0.5 text-xs text-gray-400" >
            <div className="w-4 h-4 flex items-center justify-center bg-gray-100 rounded text-[10px]" >
                { " "}
    { task.comments } { " " }
    </div>
        < span className = "sr-only" > comments </span>
            </div>
                    )
}
</div>
    </div>
    < div
className = {`${task.dueDate.includes("Jul") || task.dueDate.includes("Aug") // Improve this logic later with real dates
        ? "text-[#D32F2F]"
        : "text-gray-500"
    } text-xs`}
            >
    { task.dueDate }
    </div>
    < div className = "flex -space-x-1" >
    {
        task.collaborators.map((initials: string, i: number) => (
            <div
                        key= { i }
                        className = "w-6 h-6 rounded-full bg-[#B2EBF2] border border-white flex items-center justify-center text-[9px] font-bold text-[#00838F]"
            >
            { initials }
            </div>
        ))
    }
        </div>
        <div>
{
    task.project && (
        <span className="inline-block px-2 py-0.5 rounded-full bg-[#E5F6E5] text-[#1E7E34] text-xs font-medium truncate max-w-full" >
                        • { task.project }
    </span>
                )
}
</div>
    < div className = "flex items-center gap-2 text-gray-400 text-xs" >
        {
            task.visibility === "Only me" ? (
                <>
                <Users size= { 12} className="text-gray-400" />
                <span>Only me</ span >
        </>
                ) : (
    <>
    <Users size= { 12} className = "text-gray-400" />
        <span>Collaborators </span>
        </>
                )}
</div>
    < div className = "opacity-0 group-hover:opacity-100 flex justify-center text-gray-400 hover:text-gray-600 cursor-pointer" >
        <Plus size={ 16 } />
            </div>
            </div>
    );
}
