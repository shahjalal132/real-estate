import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Task } from "./types";
import TaskRow from "./TaskRow";
import TaskEditModal from "./TaskEditModal";

interface TaskListProps {
    tasks: Task[];
    onToggleTask: (id: number) => void;
    onAddTask: (initialStatus?: string) => void;
    onUpdateTask: (task: Task) => void;
    onDeleteTask?: (taskId: number) => void;
}

function getTasksForSection(tasks: Task[], status: string): Task[] {
    return tasks.filter((t) => (t.status || "todo") === status);
}

export default function TaskList({
    tasks,
    onToggleTask,
    onAddTask,
    onUpdateTask,
    onDeleteTask,
}: TaskListProps) {
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const sectionConfig = [
        { title: "Recently assigned", status: "recently_assigned", isOpenDefault: true },
        { title: "Do today", status: "do_today", isOpenDefault: true },
        { title: "Untitled section", status: "todo", isOpenDefault: true },
        { title: "Do next week", status: "next_week", isOpenDefault: false },
        { title: "Do later", status: "do_later", isOpenDefault: false },
    ] as const;

    return (
        <div className="px-4 sm:px-6 text-gray-800">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_120px_120px_180px_140px_40px] gap-4 py-3 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="pl-8">Name</div>
                <div className="pl-1 border-l border-gray-200">Due date</div>
                <div className="pl-1 border-l border-gray-200">Collaborators</div>
                <div className="pl-1 border-l border-gray-200">Projects</div>
                <div className="pl-1 border-l border-gray-200">Visibility</div>
                <div className="flex justify-center border-l border-gray-200">
                    <Plus size={14} />
                </div>
            </div>

            <div className="mt-2 space-y-1">
                {sectionConfig.map(({ title, status, isOpenDefault }) => (
                    <TaskSection
                        key={status}
                        title={title}
                        tasks={getTasksForSection(tasks, status)}
                        onToggleTask={onToggleTask}
                        onUpdateTask={onUpdateTask}
                        onAddTask={() => onAddTask(status)}
                        onEditTask={setEditingTask}
                        isOpenDefault={isOpenDefault}
                    />
                ))}
            </div>

            <div className="mt-4 mb-8 flex items-center gap-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors text-sm py-2 rounded-lg hover:bg-gray-50 w-fit px-2 -ml-2">
                <Plus size={16} />
                <span>Add section</span>
            </div>

            {/* Full task edit modal */}
            <TaskEditModal
                task={editingTask}
                isOpen={!!editingTask}
                onClose={() => setEditingTask(null)}
                onSave={(updated) => {
                    onUpdateTask(updated);
                    setEditingTask(null);
                }}
                onDelete={
                    onDeleteTask
                        ? (id) => {
                              onDeleteTask(id);
                              setEditingTask(null);
                          }
                        : undefined
                }
            />
        </div>
    );
}

function TaskSection({
    title,
    tasks,
    onToggleTask,
    onUpdateTask,
    onAddTask,
    onEditTask,
    isOpenDefault,
}: {
    title: string;
    tasks: Task[];
    onToggleTask: (id: number) => void;
    onUpdateTask: (task: Task) => void;
    onAddTask: () => void;
    onEditTask?: (task: Task) => void;
    isOpenDefault: boolean;
}) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);

    return (
        <div className="rounded-xl border border-transparent hover:border-gray-100 transition-colors duration-200">
            <button
                type="button"
                className="flex items-center gap-2 w-full py-2.5 px-1 mb-0.5 rounded-lg hover:bg-gray-50/80 transition-colors duration-200 group/header text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span
                    className="text-gray-400 group-hover/header:text-gray-600 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                >
                    <ChevronDown size={18} />
                </span>
                <h3 className="text-sm font-semibold text-gray-800 group-hover/header:text-gray-900 transition-colors">
                    {title}
                </h3>
                <span className="text-xs text-gray-400 font-normal tabular-nums">
                    {tasks.length}
                </span>
            </button>

            <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="space-y-0 pb-1">
                        {tasks.map((task) => (
                            <div key={task.id}>
                                <TaskRow
                                    task={task}
                                    onToggleComplete={onToggleTask}
                                    onUpdateTask={onUpdateTask}
                                    onEditTask={onEditTask}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={onAddTask}
                            className="w-full pl-8 py-2.5 text-sm text-gray-400 hover:text-[#4573D2] hover:bg-[#4573D2]/5 rounded-lg transition-all duration-200 flex items-center gap-2 border border-dashed border-transparent hover:border-[#4573D2]/20"
                        >
                            <Plus size={14} className="opacity-70" />
                            <span>Add task...</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
