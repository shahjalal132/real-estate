import React, { useRef, useEffect } from "react";
import { Edit, Trash2, Copy, MoreVertical } from "lucide-react";
import { Task } from "./types";

interface TaskContextMenuProps {
    task: Task;
    position: { x: number; y: number } | null;
    onClose: () => void;
    onEdit: (task: Task) => void;
    onDelete: (taskId: number) => void;
    onDuplicate?: (task: Task) => void;
}

export default function TaskContextMenu({
    task,
    position,
    onClose,
    onEdit,
    onDelete,
    onDuplicate,
}: TaskContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (position) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [position, onClose]);

    if (!position) return null;

    const handleEdit = () => {
        onEdit(task);
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            onDelete(task.id);
            onClose();
        }
    };

    const handleDuplicate = () => {
        if (onDuplicate) {
            onDuplicate(task);
            onClose();
        }
    };

    return (
        <div
            ref={menuRef}
            className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[180px]"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
                <Edit size={14} />
                Edit
            </button>
            {onDuplicate && (
                <button
                    onClick={handleDuplicate}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                    <Copy size={14} />
                    Duplicate
                </button>
            )}
            <div className="border-t border-gray-200 my-1" />
            <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
                <Trash2 size={14} />
                Delete
            </button>
        </div>
    );
}
