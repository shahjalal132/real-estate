import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    ChevronDown,
    Filter,
    Settings2,
    Search,
    Calendar,
} from "lucide-react";
import { Task } from "../types";

interface CalendarViewProps {
    tasks: Task[];
    onAddTask?: () => void;
}

export default function CalendarView({ tasks, onAddTask }: CalendarViewProps) {
    // Helper to normalize date to start of day
    const startOfDay = (date: Date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    // Helper to get start of week (Sunday)
    const getStartOfWeek = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay(); // 0 is Sunday
        const diff = d.getDate() - day;
        return startOfDay(new Date(d.setDate(diff)));
    };

    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        // Default to a date that shows data (Aug 4 2025 is Mon, so Sun Aug 3 is start)
        return getStartOfWeek(new Date("2025-08-04"));
    });

    const addDays = (date: Date, days: number) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const formatDateForComparison = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const weekDays = Array.from({ length: 7 }, (_, i) =>
        addDays(currentWeekStart, i),
    );

    const handlePrevWeek = () =>
        setCurrentWeekStart(addDays(currentWeekStart, -7));
    const handleNextWeek = () =>
        setCurrentWeekStart(addDays(currentWeekStart, 7));
    const handleToday = () => setCurrentWeekStart(getStartOfWeek(new Date()));

    const currentMonthYear = currentWeekStart.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    // Check if a date is today
    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-4">
                    {/* Add Task Segmented Button */}
                    <div className="flex items-center rounded-md overflow-hidden shadow-sm">
                        <button
                            onClick={() => onAddTask && onAddTask()}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm font-medium transition-colors"
                        >
                            <Plus size={16} />
                            <span> Add task </span>
                        </button>
                        <div className="w-px bg-blue-700 h-full"> </div>
                    </div>

                    <div className="h-6 w-px bg-gray-300 mx-1"> </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrevWeek}
                            className="p-1 hover:bg-gray-100 rounded text-gray-500"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={handleToday}
                            className="text-sm font-medium text-gray-700 hover:text-black"
                        >
                            Today
                        </button>
                        <button
                            onClick={handleNextWeek}
                            className="p-1 hover:bg-gray-100 rounded text-gray-500"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <h2 className="text-lg font-medium text-gray-800 ml-1">
                        {" "}
                        {currentMonthYear}{" "}
                    </h2>
                </div>

                {/* Right side controls */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <button className="flex items-center gap-1.5 hover:text-gray-900 px-2 py-1">
                        <Calendar size={14} />
                        <span> Weeks </span>
                    </button>
                    <div className="h-4 w-px bg-gray-300"> </div>
                    <button className="flex items-center gap-1.5 hover:text-gray-900 px-2 py-1">
                        <Filter size={14} />
                        <span> Filter </span>
                    </button>
                    <div className="h-4 w-px bg-gray-300"> </div>
                    <button className="flex items-center gap-1.5 hover:text-gray-900 px-2 py-1">
                        <Settings2 size={14} />
                        <span> Options </span>
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-md ml-1 text-gray-500 hover:text-gray-900">
                        <Search size={16} />
                    </button>
                </div>
            </div>

            {/* Week Grid */}
            <div className="flex-1 grid grid-cols-7 h-full overflow-hidden divide-x divide-gray-200">
                {weekDays.map((date, idx) => {
                    const dateStr = formatDateForComparison(date);
                    const dayTasks = tasks.filter((t) => t.dueDate === dateStr);
                    const isCurrentDay = isToday(date);

                    return (
                        <div
                            key={idx}
                            className="flex flex-col h-full min-w-0 bg-white group"
                        >
                            {/* Column Header */}
                            <div className={`p-3 border-b border-gray-100`}>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                                        {date
                                            .toLocaleDateString("en-US", {
                                                weekday: "short",
                                            })
                                            .toUpperCase()}
                                    </span>
                                    {/* Date Number - Blue Box if Current Day */}
                                    <div
                                        className={`text-2xl font-normal leading-none mt-1 w-9 h-9 flex items-center justify-center rounded-md ${
                                            isCurrentDay
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {date.getDate()}
                                    </div>
                                </div>
                            </div>

                            {/* Tasks Container */}
                            <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                                {dayTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={`p-3 rounded border text-sm shadow-sm cursor-pointer hover:shadow-md transition-all ${
                                            task.completed
                                                ? "bg-gray-50 border-gray-200 text-gray-400"
                                                : "bg-white border-gray-200 text-gray-800"
                                        }`}
                                    >
                                        <div
                                            className={`font-medium mb-1 ${task.completed ? "line-through" : ""}`}
                                        >
                                            {task.title}
                                        </div>
                                        {task.project && (
                                            <div className="text-xs text-gray-500 truncate">
                                                {task.project}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Add Task Button - Appears on hover or if empty, styling matches screenshot ghost button */}
                                <button
                                    onClick={() => onAddTask && onAddTask()}
                                    className="w-full py-2 flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all text-sm opacity-0 group-hover:opacity-100"
                                >
                                    <Plus size={14} />
                                    <span> Add task </span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
