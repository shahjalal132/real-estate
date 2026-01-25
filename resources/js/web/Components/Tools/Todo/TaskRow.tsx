import React, { useState, useEffect, useRef } from "react";
import { CheckSquare, Plus, Users } from "lucide-react";
import { Task } from "./types";

interface TaskRowProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onUpdateTask: (id: number, updates: Partial<Task>) => void;
}

export default function TaskRow({
    task,
    onToggleComplete,
    onUpdateTask,
}: TaskRowProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState(task.title);
    const titleInputRef = useRef<HTMLInputElement>(null);

    const [isEditingDate, setIsEditingDate] = useState(false);
    const [date, setDate] = useState(task.dueDate);
    const dateInputRef = useRef<HTMLInputElement>(null);

    const [isEditingProject, setIsEditingProject] = useState(false);
    const [project, setProject] = useState(task.project);
    const projectInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isEditingTitle]);

    useEffect(() => {
        if (isEditingDate && dateInputRef.current) {
            dateInputRef.current.focus();
        }
    }, [isEditingDate]);

    useEffect(() => {
        if (isEditingProject && projectInputRef.current) {
            projectInputRef.current.focus();
        }
    }, [isEditingProject]);

    const handleTitleSave = () => {
        setIsEditingTitle(false);
        if (title !== task.title) {
            onUpdateTask(task.id, { title });
        }
    };

    const handleDateSave = () => {
        setIsEditingDate(false);
        if (date !== task.dueDate) {
            onUpdateTask(task.id, { dueDate: date });
        }
    };

    const handleProjectSave = () => {
        setIsEditingProject(false);
        if (project !== task.project) {
            onUpdateTask(task.id, { project });
        }
    };

    const toggleVisibility = () => {
        const newVisibility =
            task.visibility === "Only me" ? "Collaborators" : "Only me";
        onUpdateTask(task.id, { visibility: newVisibility });
    };

    return (
        <div className="group grid grid-cols-[1fr_120px_120px_180px_140px_40px] gap-4 py-2 border-b border-[#F0F0F0] hover:bg-[#F9F9F9] items-center text-sm transition-colors text-[#2A2B2D]">
            <div className="flex items-center gap-3 pl-2">
                <div
                    className="relative flex-shrink-0 cursor-pointer group/check"
                    onClick={() => onToggleComplete(task.id)}
                >
                    <div
                        className={`w-4 h-4 rounded-full border ${
                            task.completed
                                ? "bg-[#5CB85C] border-[#5CB85C]"
                                : "border-gray-400 hover:border-black"
                        } flex items-center justify-center transition-colors`}
                    >
                        {task.completed && (
                            <CheckSquare size={10} className="text-white" />
                        )}
                        {!task.completed && (
                            <CheckSquare
                                size={10}
                                className="text-white opacity-0 group-hover/check:opacity-20 text-black"
                            />
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    {isEditingTitle ? (
                        <input
                            ref={titleInputRef}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleTitleSave}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleTitleSave();
                            }}
                            className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-sm font-medium text-[#2A2B2D]"
                        />
                    ) : (
                        <span
                            className="truncate cursor-text hover:text-gray-900"
                            onClick={() => {
                                setIsEditingTitle(true);
                                setTitle(task.title);
                            }}
                        >
                            {task.title}
                        </span>
                    )}
                    {task.comments && (
                        <div className="flex items-center gap-0.5 text-xs text-gray-400">
                            <div className="w-4 h-4 flex items-center justify-center bg-gray-100 rounded text-[10px]">
                                {task.comments}
                            </div>
                            <span className="sr-only"> comments </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Due Date Column */}
            <div
                className={`pl-1 border-l border-[#F0F0F0] h-full flex items-center ${
                    task.dueDate.includes("Jul") || task.dueDate.includes("Aug")
                        ? "text-[#D32F2F]"
                        : "text-gray-500"
                } text-xs cursor-pointer hover:bg-white px-1 rounded transition-colors`}
                onClick={() => {
                    setIsEditingDate(true);
                    setDate(task.dueDate);
                }}
            >
                {isEditingDate ? (
                    <input
                        ref={dateInputRef}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        onBlur={handleDateSave}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleDateSave();
                        }}
                        className="w-full bg-transparent border-none outline-none p-0 text-xs text-inherit h-4"
                    />
                ) : (
                    task.dueDate
                )}
            </div>

            {/* Collaborators Column */}
            <div className="pl-1 border-l border-[#F0F0F0] h-full flex items-center -space-x-1">
                {task.collaborators.map((initials: string, i: number) => (
                    <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-[#B2EBF2] border border-white flex items-center justify-center text-[9px] font-bold text-[#00838F]"
                    >
                        {initials}
                    </div>
                ))}
            </div>

            {/* Project Column */}
            <div className="pl-1 border-l border-[#F0F0F0] h-full flex items-center">
                {isEditingProject ? (
                    <input
                        ref={projectInputRef}
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        onBlur={handleProjectSave}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleProjectSave();
                        }}
                        className="w-full bg-white border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-700 outline-none"
                    />
                ) : (
                    <div
                        onClick={() => {
                            setIsEditingProject(true);
                            setProject(task.project);
                        }}
                        className="cursor-pointer w-full"
                    >
                        {task.project ? (
                            <span className="inline-block px-2 py-0.5 rounded-full bg-[#E5F6E5] text-[#1E7E34] text-xs font-medium truncate max-w-full">
                                • {task.project}
                            </span>
                        ) : (
                            <span className="text-gray-300 italic text-xs px-2 hover:text-gray-500">
                                + Add project
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Visibility Column */}
            <div
                className="pl-1 border-l border-[#F0F0F0] h-full flex items-center gap-2 text-gray-400 text-xs cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors"
                onClick={toggleVisibility}
            >
                {task.visibility === "Only me" ? (
                    <>
                        <Users size={12} className="text-gray-400" />
                        <span>Only me</span>
                    </>
                ) : (
                    <>
                        <Users size={12} className="text-gray-400" />
                        <span>Collaborators </span>
                    </>
                )}
            </div>

            {/* Add Action Column */}
            <div className="border-l border-[#F0F0F0] h-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 cursor-pointer">
                <Plus size={16} />
            </div>
        </div>
    );
}
