import React, { useState, useEffect } from "react";
import { X, Calendar, Users, Tag, FileText } from "lucide-react";
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

    useEffect(() => {
        if (task) {
            setFormData({
                ...task,
            });
        }
    }, [task]);

    if (!isOpen || !task) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title?.trim()) {
            onSave({ ...task, ...formData } as Task);
            onClose();
        }
    };

    const handleDelete = () => {
        if (onDelete && window.confirm("Are you sure you want to delete this task?")) {
            onDelete(task.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Edit Task</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-md text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Task title"
                                autoFocus
                            />
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar size={16} className="inline mr-2" />
                                Due Date
                            </label>
                            <input
                                type="text"
                                value={formData.dueDate || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, dueDate: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Aug 4, 2025 or Today or Tomorrow"
                            />
                        </div>

                        {/* Project */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Tag size={16} className="inline mr-2" />
                                Project
                            </label>
                            <input
                                type="text"
                                value={formData.project || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, project: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Project name"
                            />
                        </div>

                        {/* Collaborators */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Users size={16} className="inline mr-2" />
                                Collaborators (comma-separated initials)
                            </label>
                            <input
                                type="text"
                                value={formData.collaborators?.join(", ") || ""}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        collaborators: e.target.value
                                            .split(",")
                                            .map((c) => c.trim())
                                            .filter((c) => c),
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="AA, AR, ME"
                            />
                        </div>

                        {/* Visibility */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Visibility
                            </label>
                            <select
                                value={formData.visibility || "Only me"}
                                onChange={(e) =>
                                    setFormData({ ...formData, visibility: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Only me">Only me</option>
                                <option value="Collaborators">Collaborators</option>
                            </select>
                        </div>

                        {/* Completed */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="completed"
                                checked={formData.completed || false}
                                onChange={(e) =>
                                    setFormData({ ...formData, completed: e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="completed" className="ml-2 text-sm text-gray-700">
                                Mark as completed
                            </label>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
                    <div>
                        {onDelete && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
