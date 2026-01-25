import React, { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Task } from "../types";
import TaskEditModal from "../TaskEditModal";
import TaskContextMenu from "../TaskContextMenu";

interface BoardViewProps {
    tasks: Task[];
    onToggleTask: (id: number) => void;
    onAddTask: (status?: string) => void;
    onMoveTask?: (taskId: number, newStatus: string) => void;
    onUpdateTask: (task: Task) => void; // Make this required since we use it as fallback
    onDeleteTask?: (taskId: number) => void;
    onDuplicateTask?: (task: Task) => void;
}

interface Section {
    id: string;
    title: string;
}

const DEFAULT_SECTIONS: Section[] = [
    { id: "recently_assigned", title: "Recently assigned" },
    { id: "do_today", title: "Do today" },
    { id: "todo", title: "Untitled section" },
    { id: "next_week", title: "Do next week" },
    { id: "do_later", title: "Do later" },
];

export default function BoardView({
    tasks,
    onToggleTask,
    onAddTask,
    onMoveTask,
    onUpdateTask,
    onDeleteTask,
    onDuplicateTask,
}: BoardViewProps) {
    // Always use DEFAULT_SECTIONS - no custom sections allowed
    const sections = DEFAULT_SECTIONS;
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [contextMenu, setContextMenu] = useState<{
        task: Task;
        position: { x: number; y: number };
    } | null>(null);

    const getTasksByStatus = (status: string) => {
        return tasks.filter((t) => (t.status || "todo") === status);
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        console.log("BoardView: onDragEnd", {
            draggableId,
            sourceId: source.droppableId,
            destId: destination?.droppableId
        });

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Robust ID parsing
        // const taskId = parseInt(draggableId, 10); // Unused, using string comparison below

        const newStatus = destination.droppableId;

        // Ensure the destination is a valid section
        const isValidSection = sections.some(s => s.id === newStatus);
        if (!isValidSection) {
            console.warn('BoardView: Invalid section ID:', newStatus);
            return;
        }

        // Find the task - loose comparison to handle string/number mismatches
        const task = tasks.find(t => String(t.id) === draggableId);

        if (!task) {
            console.error('BoardView: Task not found for ID:', draggableId);
            return;
        }

        const finalTaskId = task.id;

        console.log(`BoardView: Moving task ${finalTaskId} to ${newStatus}`);

        // Update task status
        if (typeof onMoveTask === 'function') {
            onMoveTask(finalTaskId, newStatus);
        } else {
            console.warn('BoardView: onMoveTask prop is missing or not a function, using onUpdateTask fallback');
            onUpdateTask({ ...task, status: newStatus });
        }
    };

    const handleTaskClick = (task: Task) => {
        setEditingTask(task);
    };

    const handleContextMenu = (e: React.MouseEvent, task: Task) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            task,
            position: { x: e.clientX, y: e.clientY },
        });
    };

    const handleSaveTask = (task: Task) => {
        if (onUpdateTask) {
            onUpdateTask(task);
        }
        setEditingTask(null);
    };

    const handleDeleteTask = (taskId: number) => {
        if (onDeleteTask) {
            onDeleteTask(taskId);
        }
        setEditingTask(null);
    };

    const handleAddTaskToSection = (sectionId: string) => {
        onAddTask(sectionId);
    };


    return (
        <div className= "p-6 h-full overflow-x-auto bg-gray-50 text-gray-900" >
        <DragDropContext onDragEnd={ onDragEnd }>
            <div className="flex gap-6 h-full" >
            {
                sections.map((section) => {
                    const sectionTasks = getTasksByStatus(section.id);
                    return (
                        <Droppable key= { section.id } droppableId = { section.id } >
                            {(provided, snapshot) => (
                                <div
                                        ref= { provided.innerRef }
                    {...provided.droppableProps}
    className = {`w-[300px] shrink-0 flex flex-col h-full max-h-full ${snapshot.isDraggingOver ? "bg-blue-50" : ""
        }`
}
                                    >
    {/* Section Header */ }
    < div className = "p-3 font-semibold text-sm flex justify-between items-center group mb-2 bg-white rounded-lg shadow-sm" >
        <span className="text-gray-700 flex-1" >
            { section.title }
            < span className = "ml-1 text-gray-400 font-normal" >
                { sectionTasks.length }
                </span>
                </span>
                < div className = "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" >
                    <button
                                                    onClick={
    () =>
        handleAddTaskToSection(section.id)
}
className = "p-1 hover:bg-gray-200 rounded text-gray-500"
title = "Add task"
    >
    <Plus size={ 14 } />
        </button>
        < button
className = "p-1 hover:bg-gray-200 rounded text-gray-500"
title = "Section options"
    >
    <MoreHorizontal size={ 14 } />
        </button>
        </div>
        </div>

{/* Tasks List */ }
<div className="flex-1 overflow-y-auto space-y-3 pb-2" >
{
    sectionTasks.map((task, index) => (
        <Draggable
                                                    key= { task.id }
                                                    draggableId = { task.id.toString() }
                                                    index = { index }
        >
        {(provided, snapshot) =>(
            <div
                                                            ref= { provided.innerRef }
                                                            { ...provided.draggableProps }
                                                            style = {{
        ...provided.draggableProps.style,
        opacity: snapshot.isDragging
            ? 0.8
            : 1,
    }}
    >
    <BoardCard
                                                                task={ task }
onToggleComplete = { onToggleTask }
onUpdate = { onUpdateTask }
onContextMenu = {(e) =>
handleContextMenu(e, task)
                                                                }
dragHandleProps = { provided.dragHandleProps }
    />
    </div>
                                                    )}
</Draggable>
                                            ))}
{ provided.placeholder }

<button
                                                onClick={ () => handleAddTaskToSection(section.id) }
className = "w-full py-2 flex items-center pl-2 gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded text-sm transition-colors text-left"
    >
    <Plus size={ 14 } /> Add task
        </button>
        </div>
        </div>
                                )}
</Droppable>
                        );
                    })}
</div>
    </DragDropContext>

{/* Task Edit Modal */ }
{
    editingTask && (
        <TaskEditModal
                    task={ editingTask }
    isOpen = {!!editingTask
}
onClose = {() => setEditingTask(null)}
onSave = { handleSaveTask }
onDelete = { onDeleteTask? handleDeleteTask: undefined }
    />
            )}

{/* Context Menu */ }
{
    contextMenu && (
        <TaskContextMenu
                    task={ contextMenu.task }
    position = { contextMenu.position }
    onClose = {() => setContextMenu(null)
}
onEdit = { handleTaskClick }
onDelete = { onDeleteTask || (() => { })}
onDuplicate = { onDuplicateTask }
    />
            )}
</div>
    );
}

interface BoardCardProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onUpdate: (task: Task) => void;
    onContextMenu: (e: React.MouseEvent) => void;
    dragHandleProps?: any;
}

function BoardCard({
    task,
    onToggleComplete,
    onUpdate,
    onContextMenu,
    dragHandleProps,
}: BoardCardProps) {
    const isCompleted = task.completed;
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    // Sync state with props if task changes externally
    React.useEffect(() => {
        setEditTitle(task.title);
    }, [task.title]);

    const handleSave = () => {
        if (editTitle.trim() !== task.title) {
            onUpdate({ ...task, title: editTitle.trim() });
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditTitle(task.title);
            setIsEditing(false);
        }
    };

    return (
        <div
            className= "bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative"
    onContextMenu = { onContextMenu }
    {...dragHandleProps }
        >
        <div className="flex items-start justify-between mb-3" >
            <div
                    className={
        `w-5 h-5 rounded-full border ${isCompleted
            ? "bg-[#5CB85C] border-[#5CB85C]"
            : "border-gray-300 hover:border-gray-400"
        } flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 mt-0.5`
    }
    onClick = {(e) => {
        e.stopPropagation();
        onToggleComplete(task.id);
    }
}
                >
    { isCompleted && <span className="text-white text-xs" >✓</span>}
</div>
    < button
onClick = {(e) => {
    e.stopPropagation();
    onContextMenu(e);
}}
className = "opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded text-gray-400 transition-opacity absolute top-2 right-2"
    >
    <MoreHorizontal size={ 14 } />
        </button>
        </div>

{
    isEditing ? (
        <input
                    type= "text"
                    autoFocus
    value = { editTitle }
    onChange = {(e) => setEditTitle(e.target.value)
}
onBlur = { handleSave }
onKeyDown = { handleKeyDown }
className = "w-full text-sm font-medium text-gray-800 mb-2 border-b border-blue-500 outline-none p-0 bg-transparent"
onClick = {(e) => e.stopPropagation()}
onMouseDown = {(e) => e.stopPropagation()} // Prevent drag start when interacting with input
                />
            ) : (
    <div
                    className= {`text-sm font-medium text-gray-800 mb-2 cursor-pointer hover:text-blue-600 min-h-[20px] ${isCompleted ? "line-through text-gray-400" : ""
        }`}
onClick = {() => setIsEditing(true)}
                >
    { task.title }
    </div>
            )}

{/* Task Metadata */ }
<div className="flex items-center justify-between text-xs mt-3" >
    <div
                    className={
    `${task.dueDate.toLowerCase().includes("today") ||
        task.dueDate.toLowerCase().includes("tomorrow")
        ? "text-[#5CB85C]"
        : "text-gray-500"
    }`
}
                >
    { task.dueDate }
    </div>
{
    task.collaborators && task.collaborators.length > 0 && (
        <div className="flex -space-x-1" >
        {
            task.collaborators.slice(0, 3).map((initials, i) => (
                <div
                                key= { i }
                                className = "w-5 h-5 rounded-full bg-[#B2EBF2] border border-white flex items-center justify-center text-[9px] font-bold text-[#00838F]"
                >
                { initials }
                </div>
            ))
        }
    {
        task.collaborators.length > 3 && (
            <div className="w-5 h-5 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[9px] font-bold text-gray-600" >
                +{ task.collaborators.length - 3 }
                </div>
                        )
    }
    </div>
                )
}
</div>

{/* Additional Info */ }
{
    (task.comments || task.subtasks || task.project) && (
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500" >
        {
            task.comments && (
                <span className="flex items-center gap-1">
                            💬 { task.comments }
    </span>
                    )
}
{
    task.subtasks && (
        <span className="flex items-center gap-1" >
                            ✓ { task.subtasks }
    </span>
                    )
}
{
    task.project && (
        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 truncate max-w-[120px]" >
            { task.project }
            </span>
                    )
}
</div>
            )}
</div>
    );
}
