import React, { useState, useEffect, useRef } from "react";
import { CheckSquare, Plus, Users, Pencil } from "lucide-react";
import { Task } from "./types";

interface TaskRowProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onUpdateTask: (task: Task) => void;
    onEditTask?: (task: Task) => void;
}

export default function TaskRow({
    task,
    onToggleComplete,
    onUpdateTask,
    onEditTask,
}: TaskRowProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState(task.title);
    const titleInputRef = useRef<HTMLInputElement>(null);

    const [isEditingDate, setIsEditingDate] = useState(false);
    const [date, setDate] = useState(task.due_date ?? "");
    const dateInputRef = useRef<HTMLInputElement>(null);

    const [isEditingProject, setIsEditingProject] = useState(false);
    const [project, setProject] = useState(task.project ?? "");
    const projectInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTitle(task.title);
        setDate(task.due_date ?? "");
        setProject(task.project ?? "");
    }, [task.id, task.title, task.due_date, task.project]);

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [isEditingTitle]);

    useEffect(() => {
        if (isEditingDate && dateInputRef.current) dateInputRef.current.focus();
    }, [isEditingDate]);

    useEffect(() => {
        if (isEditingProject && projectInputRef.current) projectInputRef.current.focus();
    }, [isEditingProject]);

    const applyUpdate = (updates: Partial<Task>) => {
        const next = { ...task, ...updates };
        onUpdateTask(next);
    };

    const handleTitleSave = () => {
        setIsEditingTitle(false);
        const t = (title ?? "").trim();
        if (t && t !== task.title) applyUpdate({ title: t });
        else setTitle(task.title);
    };

    const handleDateSave = () => {
        setIsEditingDate(false);
        if (date !== (task.due_date ?? "")) applyUpdate({ due_date: date || undefined });
        else setDate(task.due_date ?? "");
    };

    const handleProjectSave = () => {
        setIsEditingProject(false);
        if (project !== (task.project ?? "")) applyUpdate({ project: project || undefined });
        else setProject(task.project ?? "");
    };

    const toggleVisibility = () => {
        const newVisibility =
            task.visibility === "Only me" ? "Collaborators" : "Only me";
        applyUpdate({ visibility: newVisibility });
    };

    const collaborators = task.collaborators ?? [];

    return (
        <div
            className="group grid grid-cols-[1fr_120px_120px_180px_140px_40px] gap-4 py-2 border-b border-gray-100 hover:bg-gray-50/80 items-center text-sm transition-all duration-200 text-gray-800 rounded-lg mx-1 px-1"
            data-task-id={task.id}
        >
            <div className="flex items-center gap-3 pl-2 min-w-0">
                <button
                    type="button"
                    onClick={() => onToggleComplete(task.id)}
                    className="relative shrink-0 cursor-pointer group/check focus:outline-none focus:ring-2 focus:ring-[#4573D2] focus:ring-offset-1 rounded-full"
                    aria-label={task.is_completed ? "Mark incomplete" : "Mark complete"}
                >
                    <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            task.is_completed
                                ? "bg-[#5CB85C] border-[#5CB85C]"
                                : "border-gray-300 hover:border-gray-500"
                        }`}
                    >
                        {task.is_completed && (
                            <CheckSquare size={12} className="text-white" strokeWidth={2.5} />
                        )}
                    </div>
                </button>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    {isEditingTitle ? (
                        <input
                            ref={titleInputRef}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleTitleSave}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleTitleSave();
                                if (e.key === "Escape") {
                                setTitle(task.title);
                                setIsEditingTitle(false);
                                }
                            }}
                            className="w-full bg-white border border-[#4573D2] rounded-md px-2 py-1 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-[#4573D2]/30 outline-none"
                        />
                    ) : (
                        <span
                            className={`truncate cursor-text hover:text-gray-900 transition-colors ${
                                task.is_completed ? "line-through text-gray-500" : ""
                            }`}
                            onClick={() => {
                                setIsEditingTitle(true);
                                setTitle(task.title);
                            }}
                        >
                            {task.title}
                        </span>
                    )}
                    {task.comments != null && task.comments > 0 && (
                        <span className="flex items-center gap-0.5 text-xs text-gray-400 shrink-0">
                            <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-[10px] font-medium">
                                {task.comments}
                            </span>
                            <span className="sr-only">comments</span>
                        </span>
                    )}
                </div>
            </div>

            <div
                className={`pl-1 border-l border-gray-100 flex items-center text-xs transition-colors ${
                    task.due_date?.toLowerCase().includes("today") ||
                    task.due_date?.toLowerCase().includes("tomorrow")
                        ? "text-[#1E7E34] font-medium"
                        : task.due_date
                          ? "text-gray-500"
                          : "text-gray-400"
                } cursor-pointer hover:bg-white px-2 py-1 rounded border border-transparent hover:border-gray-200`}
                onClick={() => {
                    setIsEditingDate(true);
                    setDate(task.due_date ?? "");
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
                            if (e.key === "Escape") {
                                setDate(task.due_date ?? "");
                                setIsEditingDate(false);
                            }
                        }}
                        className="w-full bg-white border border-[#4573D2] rounded px-1.5 py-0.5 text-xs text-inherit focus:ring-1 focus:ring-[#4573D2] outline-none"
                    />
                ) : (
                    task.due_date || "—"
                )}
            </div>

            <div className="pl-1 border-l border-gray-100 flex items-center -space-x-1 min-w-0">
                {collaborators.length > 0 ? (
                    collaborators.slice(0, 4).map((initials: string, i: number) => (
                        <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-[#B2EBF2] border-2 border-white flex items-center justify-center text-[9px] font-bold text-[#00838F] shrink-0"
                        >
                            {initials}
                        </div>
                    ))
                ) : (
                    <span className="text-gray-400 text-xs">—</span>
                )}
            </div>

            <div className="pl-1 border-l border-gray-100 flex items-center min-w-0">
                {isEditingProject ? (
                    <input
                        ref={projectInputRef}
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        onBlur={handleProjectSave}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleProjectSave();
                            if (e.key === "Escape") {
                                setProject(task.project ?? "");
                                setIsEditingProject(false);
                            }
                        }}
                        className="w-full bg-white border border-[#4573D2] rounded-md px-2 py-1 text-xs text-gray-700 focus:ring-1 focus:ring-[#4573D2] outline-none"
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditingProject(true);
                            setProject(task.project ?? "");
                        }}
                        className="text-left w-full rounded px-2 py-1 hover:bg-white border border-transparent hover:border-gray-200 transition-colors"
                    >
                        {task.project ? (
                            <span className="inline-block px-2 py-0.5 rounded-full bg-[#E5F6E5] text-[#1E7E34] text-xs font-medium truncate max-w-full">
                                {task.project}
                            </span>
                        ) : (
                            <span className="text-gray-400 italic text-xs hover:text-gray-600">
                                + Add project
                            </span>
                        )}
                    </button>
                )}
            </div>

            <button
                type="button"
                className="pl-1 border-l border-gray-100 flex items-center gap-1.5 text-gray-400 hover:text-gray-600 hover:bg-white px-2 py-1 rounded text-xs transition-colors"
                onClick={toggleVisibility}
            >
                <Users size={12} />
                <span>{task.visibility === "Only me" ? "Only me" : "Collaborators"}</span>
            </button>

            <div className="border-l border-gray-100 flex items-center justify-center gap-0.5">
                {onEditTask && (
                    <button
                        type="button"
                        onClick={() => onEditTask(task)}
                        className="p-1.5 rounded-md text-gray-400 hover:text-[#4573D2] hover:bg-[#4573D2]/10 opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#4573D2]/30"
                        aria-label="Edit task"
                    >
                        <Pencil size={14} />
                    </button>
                )}
                <span className="w-6 h-6 flex items-center justify-center text-gray-300 group-hover:text-gray-400 transition-colors">
                    <Plus size={14} />
                </span>
            </div>
        </div>
    );
}
