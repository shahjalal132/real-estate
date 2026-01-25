import React, { useState } from "react";
import AppLayout from "../../Layouts/AppLayout";
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    MoreHorizontal,
    Plus,
    Search,
    Filter,
    Users,
    ChevronDown,
    Home,
    Inbox,
    Target,
    BarChart2,
    Briefcase as Portfolio,
    CheckCircle2,
    LayoutGrid,
} from "lucide-react";

// Mock Data
const events = [
    {
        id: 1,
        title: "Open House: 123 Maple Ave",
        date: new Date(2025, 7, 4, 14, 0), // Aug 4 2025, 2:00 PM
        type: "open-house",
        location: "123 Maple Ave, Springfield",
        attendees: ["JD", "AS"],
    },
    {
        id: 2,
        title: "Client Viewing: Sarah Connor",
        date: new Date(2025, 7, 5, 10, 0), // Aug 5 2025, 10:00 AM
        type: "viewing",
        location: "456 Oak Dr, Springfield",
        attendees: ["SC", "Agent"],
    },
    {
        id: 3,
        title: "Closing: Smith Residence",
        date: new Date(2025, 7, 8, 9, 0), // Aug 8 2025, 9:00 AM
        type: "closing",
        location: "Title Company Office",
        attendees: ["BS", "Agent", "Lawyer"],
    },
    {
        id: 4,
        title: "Team Meeting",
        date: new Date(2025, 7, 4, 9, 0), // Aug 4 2025, 9:00 AM
        type: "meeting",
        location: "Office Conference Room A",
        attendees: ["All"],
    },
];

const eventTypes = {
    "open-house": {
        color: "bg-green-100 text-green-700 border-green-200",
        label: "Open House",
    },
    viewing: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        label: "Viewing",
    },
    closing: {
        color: "bg-red-100 text-red-700 border-red-200",
        label: "Closing",
    },
    meeting: {
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        label: "Meeting",
    },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // Aug 2025
    const [view, setView] = useState<"month" | "week" | "day">("month");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const getDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay();

    const renderMonthGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        // Empty cells for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div
                    key={`empty-${i}`}
                    className="min-h-[120px] bg-gray-50/50 border-r border-b border-gray-100"
                >
                    {" "}
                </div>,
            );
        }

        // Days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayEvents = events.filter(
                (e) =>
                    e.date.getDate() === day &&
                    e.date.getMonth() === month &&
                    e.date.getFullYear() === year,
            );

            const isToday = new Date().toDateString() === date.toDateString();

            days.push(
                <div
                    key={day}
                    className={`min-h-[120px] bg-white border-r border-b border-gray-200 p-2 hover:bg-gray-50 transition-colors group relative ${isToday ? "bg-blue-50/30" : ""}`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? "bg-blue-600 text-white" : "text-gray-700"}`}
                        >
                            {day}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded text-gray-400">
                            <Plus size={14} />
                        </button>
                    </div>

                    <div className="space-y-1">
                        {dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className={`px-2 py-1 rounded text-xs font-medium border truncate cursor-pointer hover:opacity-80 ${eventTypes[event.type as keyof typeof eventTypes].color}`}
                            >
                                <div className="flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-current">
                                        {" "}
                                    </span>
                                    {event.date.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                                <div className="truncate"> {event.title} </div>
                            </div>
                        ))}
                    </div>
                </div>,
            );
        }

        return days;
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
        );
    };

    const prevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
    };

    return (
        <AppLayout title="Calendar">
            <div className="flex w-full bg-white font-sans text-[#2A2B2D] overflow-hidden h-[calc(100vh-64px)]">
                {/* Sidebar - Consistent with Todo Page */}
                <aside
                    className={`${
                        sidebarOpen ? "w-[240px]" : "w-0"
                    } bg-[#F9F8F8] flex-shrink-0 transition-all duration-300 border-r border-[#E0E0E0] flex flex-col`}
                >
                    <div className="p-4 flex items-center justify-between">
                        <button className="flex items-center gap-2 bg-[#F06A6A] text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#D95D5D] transition-colors shadow-sm w-full justification-center">
                            <div className="bg-white/20 rounded-full p-0.5">
                                <Plus size={14} />
                            </div>
                            New Event
                        </button>
                    </div>

                    <div className="px-4 py-2">
                        <div className="inline-flex bg-gray-200 p-1 rounded-lg w-full">
                            <div className="w-1/2 text-center text-xs font-semibold py-1 bg-white rounded shadow-sm text-gray-800">
                                Calendar
                            </div>
                            <div className="w-1/2 text-center text-xs font-medium py-1 text-gray-500 hover:text-gray-700 cursor-pointer">
                                Schedule
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 mt-2">
                        <div className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            My Calendars
                        </div>
                        <SidebarItem
                            icon={
                                <div className="w-3 h-3 rounded bg-blue-500" />
                            }
                            label="My Schedule"
                            active
                        />
                        <SidebarItem
                            icon={
                                <div className="w-3 h-3 rounded bg-green-500" />
                            }
                            label="Open Houses"
                        />
                        <SidebarItem
                            icon={
                                <div className="w-3 h-3 rounded bg-red-500" />
                            }
                            label="Deadlines"
                        />
                        <SidebarItem
                            icon={
                                <div className="w-3 h-3 rounded bg-purple-500" />
                            }
                            label="Holidays"
                        />

                        <div className="pt-6 pb-2 px-3 flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider group cursor-pointer">
                            <span>Team Calendars </span>
                            <Plus
                                size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <SidebarItem
                            icon={<Users size={16} />}
                            label="Sales Team"
                        />
                        <SidebarItem
                            icon={<Users size={16} />}
                            label="Marketing"
                        />
                    </nav>

                    {/* Mini Calendar in Sidebar */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="text-sm font-semibold mb-2">
                            {" "}
                            August 2025{" "}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-500">
                            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                                <div key={d}> {d} </div>
                            ))}
                            {Array.from({ length: 31 }, (_, i) => (
                                <div
                                    key={i}
                                    className={`h-5 w-5 flex items-center justify-center rounded-full ${i + 1 === 4 ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 bg-white">
                    {/* Header Controls */}
                    <header className="px-6 py-4 border-b border-[#E0E0E0] flex items-center justify-between bg-white">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 hover:bg-gray-100 rounded-md text-gray-500"
                            >
                                <LayoutGrid size={20} />
                            </button>

                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {MONTHS[currentDate.getMonth()]}{" "}
                                    {currentDate.getFullYear()}
                                </h1>
                                <div className="flex items-center bg-gray-100 rounded-md p-0.5 ml-4">
                                    <button
                                        onClick={prevMonth}
                                        className="p-1 hover:bg-white hover:shadow-sm rounded transition-all"
                                    >
                                        <ChevronLeft
                                            size={18}
                                            className="text-gray-600"
                                        />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setCurrentDate(new Date())
                                        }
                                        className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded transition-all"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={nextMonth}
                                        className="p-1 hover:bg-white hover:shadow-sm rounded transition-all"
                                    >
                                        <ChevronRight
                                            size={18}
                                            className="text-gray-600"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                                {["Month", "Week", "Day", "List"].map((v) => (
                                    <button
                                        key={v}
                                        onClick={() =>
                                            setView(v.toLowerCase() as any)
                                        }
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                                            view === v.toLowerCase()
                                                ? "bg-white text-blue-600 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                <Plus size={16} />
                                <span className="text-sm font-medium">
                                    {" "}
                                    Add Event{" "}
                                </span>
                            </button>
                        </div>
                    </header>

                    {/* Toolbar */}
                    <div className="px-6 py-2 border-b border-[#E0E0E0] flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                                <Filter size={14} />
                                Filter
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                                <Users size={14} />
                                Everyone
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                {" "}
                                <div className="w-2 h-2 rounded-full bg-green-500">
                                    {" "}
                                </div>{" "}
                                Open House
                            </span>
                            <span className="flex items-center gap-1">
                                {" "}
                                <div className="w-2 h-2 rounded-full bg-blue-500">
                                    {" "}
                                </div>{" "}
                                Viewing
                            </span>
                            <span className="flex items-center gap-1">
                                {" "}
                                <div className="w-2 h-2 rounded-full bg-red-500">
                                    {" "}
                                </div>{" "}
                                Closing
                            </span>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="flex-1 overflow-auto bg-white">
                        {/* Weekday Headers */}
                        <div className="grid grid-cols-7 border-b border-gray-200">
                            {DAYS.map((day) => (
                                <div
                                    key={day}
                                    className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 auto-rows-fr">
                            {renderMonthGrid()}
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}

function SidebarItem({ icon, label, active = false, hasSubmenu = false }: any) {
    return (
        <div
            className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer group text-sm ${
                active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
            }`}
        >
            <div className="flex items-center gap-3">
                <span
                    className={`${active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`}
                >
                    {icon}
                </span>
                <span className="font-medium"> {label} </span>
            </div>
            {hasSubmenu && (
                <div className="text-gray-400 opacity-0 group-hover:opacity-100">
                    →
                </div>
            )}
        </div>
    );
}
