import React, { useState, useEffect } from "react";
import { X, Calendar, Users, Tag } from "lucide-react";
import { Task } from "./types";

interface TaskEditModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    onDelete?: (taskId: number) => void;
}

export default function TaskEditModal({
    task,
    isOpen,
    onClose,
    onSave,
    onDelete,
}: TaskEditModalProps) {
    const [formData, setFormData] = useState<Partial<Task>>({});
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                due_date: task.due_date,
                project: task.project,
                project_id: task.project_id,
                collaborators: task.collaborators ?? [],
                visibility: task.visibility ?? "Only me",
                is_completed: task.is_completed,
                status: task.status,
            });
        }
    }, [task]);

    if (!task) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 180);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const titleTrimmed = formData.title?.trim();
        if (!titleTrimmed) return;
        const updated: Task = {
            ...task,
            ...formData,
            title: titleTrimmed,
            collaborators: formData.collaborators ?? [],
        };
        onSave(updated);
        handleClose();
    };

    const handleDelete = () => {
        if (onDelete && window.confirm("Are you sure you want to delete this task?")) {
            onDelete(task.id);
            handleClose();
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) handleClose();
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-edit-title"
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
                isOpen && !isClosing ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
                onClick={handleBackdropClick}
                aria-hidden
            />

            {/* Modal panel */}
            <div
                className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transition-all duration-200 ${
                    isOpen && !isClosing
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between shrink-0 px-6 py-4 border-b border-gray-100">
                    <h2 id="task-edit-title" className="text-lg font-semibold text-gray-900">
                        Edit task
                    </h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
                >
                    <div>
                        <label htmlFor="task-edit-title-input" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Title
                        </label>
                        <input
                            id="task-edit-title-input"
                            type="text"
                            value={formData.title ?? ""}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4573D2] focus:ring-2 focus:ring-[#4573D2]/20 outline-none transition-shadow"
                            placeholder="Task title"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label htmlFor="task-edit-due" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Calendar size={16} className="text-gray-500" />
                            Due date
                        </label>
                        <input
                            id="task-edit-due"
                            type="text"
                            value={formData.due_date ?? ""}
                            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4573D2] focus:ring-2 focus:ring-[#4573D2]/20 outline-none transition-shadow"
                            placeholder="e.g. Aug 4, 2025 or Today"
                        />
                    </div>

                    <div>
                        <label htmlFor="task-edit-project" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Tag size={16} className="text-gray-500" />
                            Project
                        </label>
                        <input
                            id="task-edit-project"
                            type="text"
                            value={formData.project ?? ""}
                            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4573D2] focus:ring-2 focus:ring-[#4573D2]/20 outline-none transition-shadow"
                            placeholder="Project name"
                        />
                    </div>

                    <div>
                        <label htmlFor="task-edit-collab" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Users size={16} className="text-gray-500" />
                            Collaborators (comma-separated)
                        </label>
                        <input
                            id="task-edit-collab"
                            type="text"
                            value={(formData.collaborators ?? []).join(", ")}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    collaborators: e.target.value
                                        .split(",")
                                        .map((c) => c.trim())
                                        .filter(Boolean),
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4573D2] focus:ring-2 focus:ring-[#4573D2]/20 outline-none transition-shadow"
                            placeholder="AA, AR, ME"
                        />
                    </div>

                    <div>
                        <label htmlFor="task-edit-visibility" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Visibility
                        </label>
                        <select
                            id="task-edit-visibility"
                            value={formData.visibility ?? "Only me"}
                            onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4573D2] focus:ring-2 focus:ring-[#4573D2]/20 outline-none transition-shadow"
                        >
                            <option value="Only me">Only me</option>
                            <option value="Collaborators">Collaborators</option>
                        </select>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={formData.is_completed ?? false}
                            onChange={(e) => setFormData({ ...formData, is_completed: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-[#4573D2] focus:ring-[#4573D2]"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            Mark as completed
                        </span>
                    </label>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-between gap-3 shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50/80 rounded-b-2xl">
                    <div>
                        {onDelete && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!formData.title?.trim()}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-[#4573D2] rounded-xl hover:bg-[#3b63b8] disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
