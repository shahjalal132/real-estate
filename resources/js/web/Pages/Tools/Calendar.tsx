import { useState, useEffect, useMemo } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Filter,
    Users,
    Menu,
    X,
} from "lucide-react";
import EventModal, {
    type CalendarEventForm,
    type CalendarEventType,
} from "../../Components/Tools/Calendar/EventModal";

export interface CalendarEventPayload {
    id: number;
    title: string;
    type: string;
    start_at: string;
    end_at: string | null;
    location: string | null;
    description: string | null;
    attendees: string[];
}

const EVENT_TYPE_CONFIG: Record<string, { color: string; label: string }> = {
    "open-house": { color: "bg-green-100 text-green-700 border-green-200", label: "Open House" },
    viewing: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Viewing" },
    closing: { color: "bg-red-100 text-red-700 border-red-200", label: "Closing" },
    meeting: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Meeting" },
    holiday: { color: "bg-purple-100 text-purple-700 border-purple-200", label: "Holiday" },
};

const CALENDAR_FILTERS = [
    { id: "my-schedule", label: "My Schedule", type: null, color: "bg-blue-500" },
    { id: "open-houses", label: "Open Houses", type: "open-house", color: "bg-green-500" },
    { id: "deadlines", label: "Deadlines", type: "closing", color: "bg-red-500" },
    { id: "holidays", label: "Holidays", type: "holiday", color: "bg-purple-500" },
] as const;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function getRangeStartEnd(
    view: "month" | "week" | "day" | "list",
    date: Date
): { start: string; end: string } {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    const pad = (n: number) => String(n).padStart(2, "0");

    if (view === "month") {
        const end = new Date(y, m + 1, 0);
        return {
            start: `${y}-${pad(m + 1)}-01`,
            end: `${y}-${pad(m + 1)}-${pad(end.getDate())}`,
        };
    }
    if (view === "week") {
        const day = date.getDay();
        const start = new Date(date);
        start.setDate(date.getDate() - day);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return {
            start: `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`,
            end: `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`,
        };
    }
    // day or list: use that day / or month for list
    const startStr = `${y}-${pad(m + 1)}-${pad(d)}`;
    if (view === "day") return { start: startStr, end: startStr };
    const monthEnd = new Date(y, m + 1, 0);
    return {
        start: `${y}-${pad(m + 1)}-01`,
        end: `${y}-${pad(m + 1)}-${pad(monthEnd.getDate())}`,
    };
}

function parseEvents(events: CalendarEventPayload[]): Array<CalendarEventPayload & { startDate: Date; endDate: Date | null }> {
    return events.map((e) => ({
        ...e,
        startDate: new Date(e.start_at),
        endDate: e.end_at ? new Date(e.end_at) : null,
    }));
}

export default function Calendar({
    events: initialEvents = [],
    range: initialRange,
}: {
    events?: CalendarEventPayload[];
    range?: { start: string; end: string };
}) {
    const [currentDate, setCurrentDate] = useState(() => {
        if (initialRange?.start) {
            const [y, m, d] = initialRange.start.split("-").map(Number);
            return new Date(y, (m ?? 1) - 1, d ?? 1);
        }
        return new Date();
    });
    const [view, setView] = useState<"month" | "week" | "day" | "list">("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeCalendar, setActiveCalendar] = useState<string>("my-schedule");
    const [viewMode, setViewMode] = useState<"calendar" | "schedule">("calendar");
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [eventModalDate, setEventModalDate] = useState<Date | undefined>();
    const [editingEvent, setEditingEvent] = useState<CalendarEventForm | null>(null);
    const [events, setEvents] = useState<CalendarEventPayload[]>(initialEvents);

    useEffect(() => {
        setEvents(initialEvents);
    }, [initialEvents]);

    const filterType = useMemo(() => {
        const f = CALENDAR_FILTERS.find((c) => c.id === activeCalendar);
        return f?.type ?? null;
    }, [activeCalendar]);

    const filteredEvents = useMemo(() => {
        if (!filterType) return events;
        return events.filter((e) => e.type === filterType);
    }, [events, filterType]);

    const parsedEvents = useMemo(() => parseEvents(filteredEvents), [filteredEvents]);

    const fetchRange = (start: string, end: string) => {
        router.get("/tools/calendar", { start, end }, { preserveState: true });
    };

    useEffect(() => {
        const { start, end } = getRangeStartEnd(view, currentDate);
        if (initialRange && initialRange.start === start && initialRange.end === end) return;
        fetchRange(start, end);
    }, [currentDate.getTime(), view, initialRange?.start, initialRange?.end]);

    const getDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay();

    const goToDate = (date: Date) => {
        setCurrentDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    };

    const nextMonth = () => goToDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => goToDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    const nextWeek = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() + 7);
        goToDate(d);
    };
    const prevWeek = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() - 7);
        goToDate(d);
    };

    const nextDay = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() + 1);
        goToDate(d);
    };
    const prevDay = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() - 1);
        goToDate(d);
    };

    const handleSaveEvent = (data: CalendarEventForm) => {
        if (data.id) {
            router.put(`/tools/calendar/events/${data.id}`, {
                title: data.title,
                type: data.type,
                start_at: data.start_at,
                end_at: data.end_at || null,
                location: data.location || null,
                description: data.description || null,
                attendees: data.attendees,
            }, { preserveState: true });
        } else {
            router.post("/tools/calendar/events", {
                title: data.title,
                type: data.type,
                start_at: data.start_at,
                end_at: data.end_at || null,
                location: data.location || null,
                description: data.description || null,
                attendees: data.attendees,
            }, { preserveState: true });
        }
        setEventModalOpen(false);
        setEditingEvent(null);
    };

    const handleDeleteEvent = (id: number) => {
        router.delete(`/tools/calendar/events/${id}`, { preserveState: true });
        setEventModalOpen(false);
        setEditingEvent(null);
    };

    const openNewEvent = (date?: Date) => {
        setEventModalDate(date ?? currentDate);
        setEditingEvent(null);
        setEventModalOpen(true);
    };

    const openEditEvent = (e: CalendarEventPayload) => {
        setEditingEvent({
            id: e.id,
            title: e.title,
            type: e.type as CalendarEventType,
            start_at: e.start_at.slice(0, 16),
            end_at: e.end_at ? e.end_at.slice(0, 16) : e.start_at.slice(0, 16),
            location: e.location ?? "",
            description: e.description ?? "",
            attendees: e.attendees ?? [],
        });
        setEventModalOpen(true);
    };

    // Month grid
    const renderMonthGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const cells: React.ReactNode[] = [];

        for (let i = 0; i < firstDay; i++) {
            cells.push(
                <div key={`empty-${i}`} className="min-h-[100px] sm:min-h-[120px] bg-gray-50/50 border-r border-b border-gray-100" />
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayEvents = parsedEvents.filter(
                (e) =>
                    e.startDate.getDate() === day &&
                    e.startDate.getMonth() === month &&
                    e.startDate.getFullYear() === year
            );
            const isToday = new Date().toDateString() === date.toDateString();

            cells.push(
                <div
                    key={day}
                    className={`min-h-[100px] sm:min-h-[120px] bg-white border-r border-b border-gray-200 p-1.5 sm:p-2 hover:bg-gray-50 transition-colors group relative ${isToday ? "bg-blue-50/30" : ""}`}
                >
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span
                            className={`text-xs sm:text-sm font-medium w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full cursor-pointer ${isToday ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                            onClick={() => goToDate(date)}
                        >
                            {day}
                        </span>
                        <button
                            type="button"
                            className="hidden sm:flex opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded text-gray-400"
                            onClick={() => openNewEvent(date)}
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    <div className="space-y-1">
                        {dayEvents.map((event) => (
                            <button
                                key={event.id}
                                type="button"
                                onClick={() => openEditEvent(event)}
                                className={`w-full text-left px-1.5 py-1 rounded text-[10px] sm:text-xs font-medium border truncate hover:opacity-90 flex items-center gap-1.5 ${EVENT_TYPE_CONFIG[event.type]?.color ?? "bg-gray-100 text-gray-700"}`}
                            >
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-current opacity-70" />
                                <span className="hidden sm:inline tabular-nums shrink-0">
                                    {event.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                                <span className="truncate">{event.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }
        return cells;
    };

    // Week view: 7 days
    const getWeekDays = () => {
        const day = currentDate.getDay();
        const start = new Date(currentDate);
        start.setDate(currentDate.getDate() - day);
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });
    };

    const renderWeekView = () => {
        const weekDays = getWeekDays();
        return (
            <div className="grid grid-cols-7 flex-1 min-h-0">
                {weekDays.map((date) => {
                    const dayEvents = parsedEvents.filter(
                        (e) =>
                            e.startDate.getDate() === date.getDate() &&
                            e.startDate.getMonth() === date.getMonth() &&
                            e.startDate.getFullYear() === date.getFullYear()
                    );
                    const isToday = new Date().toDateString() === date.toDateString();
                    return (
                        <div
                            key={date.toISOString()}
                            className={`border-r border-gray-200 flex flex-col min-h-[200px] ${isToday ? "bg-blue-50/20" : "bg-white"}`}
                        >
                            <div className="p-2 border-b border-gray-100 text-center">
                                <span className="text-xs font-medium text-gray-500">{DAYS[date.getDay()]}</span>
                                <div
                                    className={`text-lg font-semibold mt-0.5 w-8 h-8 mx-auto flex items-center justify-center rounded-full cursor-pointer ${isToday ? "bg-blue-600 text-white" : "text-gray-800 hover:bg-gray-100"}`}
                                    onClick={() => goToDate(date)}
                                >
                                    {date.getDate()}
                                </div>
                            </div>
                            <div className="flex-1 p-1 space-y-1 overflow-auto">
                                {dayEvents.map((event) => (
                                    <button
                                        key={event.id}
                                        type="button"
                                        onClick={() => openEditEvent(event)}
                                        className={`w-full text-left px-2 py-1 rounded text-xs font-medium border truncate hover:opacity-90 ${EVENT_TYPE_CONFIG[event.type]?.color ?? "bg-gray-100"}`}
                                    >
                                        {event.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} {event.title}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => openNewEvent(date)}
                                    className="w-full text-left px-2 py-1 text-xs text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Day view
    const renderDayView = () => {
        const dayEvents = parsedEvents.filter(
            (e) =>
                e.startDate.getDate() === currentDate.getDate() &&
                e.startDate.getMonth() === currentDate.getMonth() &&
                e.startDate.getFullYear() === currentDate.getFullYear()
        ).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

        return (
            <div className="flex-1 overflow-auto p-4">
                <div className="max-w-2xl mx-auto space-y-3">
                    {dayEvents.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No events this day.</p>
                    ) : (
                        dayEvents.map((event) => (
                            <button
                                key={event.id}
                                type="button"
                                onClick={() => openEditEvent(event)}
                                className={`w-full text-left p-4 rounded-xl border transition-shadow hover:shadow-md ${EVENT_TYPE_CONFIG[event.type]?.color ?? "bg-white border-gray-200"}`}
                            >
                                <div className="text-xs font-medium text-gray-500">
                                    {event.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    {event.endDate && ` – ${event.endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                                </div>
                                <div className="font-semibold text-gray-900 mt-1">{event.title}</div>
                                {event.location && <div className="text-sm text-gray-600 mt-0.5">{event.location}</div>}
                            </button>
                        ))
                    )}
                    <button
                        type="button"
                        onClick={() => openNewEvent(currentDate)}
                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-300 hover:text-blue-600 text-sm font-medium"
                    >
                        + Add event
                    </button>
                </div>
            </div>
        );
    };

    // List view
    const renderListView = () => {
        const sorted = [...parsedEvents].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        return (
            <div className="flex-1 overflow-auto p-4">
                <div className="max-w-2xl mx-auto space-y-2">
                    {sorted.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No events in this range.</p>
                    ) : (
                        sorted.map((event) => (
                            <button
                                key={event.id}
                                type="button"
                                onClick={() => openEditEvent(event)}
                                className={`w-full text-left p-3 rounded-xl border transition-shadow hover:shadow-md flex items-center gap-3 ${EVENT_TYPE_CONFIG[event.type]?.color ?? "bg-white border-gray-200"}`}
                            >
                                <div className="text-xs font-medium text-gray-600 shrink-0 w-20">
                                    {event.startDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                                </div>
                                <div className="text-xs text-gray-500 shrink-0">
                                    {event.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="font-semibold text-gray-900 truncate">{event.title}</div>
                                    {event.location && <div className="text-xs text-gray-600 truncate">{event.location}</div>}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        );
    };

    const miniCalendarMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const miniCalendarDays = getDaysInMonth(miniCalendarMonth.getFullYear(), miniCalendarMonth.getMonth());
    const miniFirstDay = getFirstDayOfMonth(miniCalendarMonth.getFullYear(), miniCalendarMonth.getMonth());

    return (
        <AppLayout title="Calendar">
            <div className="flex w-full bg-white font-sans text-gray-900 overflow-hidden h-[calc(100vh-64px)] relative">
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <aside
                    className={`fixed inset-y-0 left-0 z-30 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 w-[240px] bg-gray-50 shrink-0 transition-transform duration-300 border-r border-gray-200 flex flex-col shadow-xl lg:shadow-none h-full`}
                >
                    <div className="p-4 flex items-center justify-between border-b border-gray-100 lg:border-none">
                        <h2 className="text-lg font-semibold text-gray-900 lg:hidden">Calendar</h2>
                        <button
                            type="button"
                            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="px-4 pb-2 lg:pt-4">
                        <button
                            type="button"
                            onClick={() => openNewEvent()}
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors w-full"
                        >
                            <Plus size={16} strokeWidth={2.5} />
                            New Event
                        </button>
                    </div>

                    <div className="px-4 py-2">
                        <div className="inline-flex bg-gray-200/80 p-1 rounded-xl w-full">
                            <button
                                type="button"
                                onClick={() => setViewMode("calendar")}
                                className={`flex-1 text-center text-xs font-semibold py-1.5 rounded-lg transition-colors ${viewMode === "calendar" ? "bg-white shadow text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
                            >
                                Calendar
                            </button>
                            <button
                                type="button"
                                onClick={() => { setViewMode("schedule"); setView("list"); }}
                                className={`flex-1 text-center text-xs font-medium py-1.5 rounded-lg transition-colors ${viewMode === "schedule" ? "bg-white shadow text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
                            >
                                Schedule
                            </button>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 mt-2">
                        <div className="px-3 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                            My Calendars
                        </div>
                        {CALENDAR_FILTERS.map((cal) => (
                            <button
                                key={cal.id}
                                type="button"
                                onClick={() => setActiveCalendar(cal.id)}
                                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors text-left ${
                                    activeCalendar === cal.id
                                        ? "bg-blue-50/80 text-blue-700 ring-1 ring-inset ring-blue-500/10"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cal.color}`} />
                                <span className="truncate">{cal.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="text-sm font-semibold mb-3 flex items-center justify-between">
                            <span className="text-gray-800">
                                {MONTHS[miniCalendarMonth.getMonth()]} {miniCalendarMonth.getFullYear()}
                            </span>
                            <div className="flex gap-1 text-gray-400">
                                <button type="button" onClick={() => goToDate(new Date(miniCalendarMonth.getFullYear(), miniCalendarMonth.getMonth() - 1, 1))}>
                                    <ChevronLeft size={16} className="hover:text-gray-600" />
                                </button>
                                <button type="button" onClick={() => goToDate(new Date(miniCalendarMonth.getFullYear(), miniCalendarMonth.getMonth() + 1, 1))}>
                                    <ChevronRight size={16} className="hover:text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center text-xs text-gray-400 mb-1 font-medium">
                            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                                <div key={d}>{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center text-[13px] font-medium text-gray-600">
                            {Array.from({ length: miniFirstDay }, (_, i) => (
                                <div key={`e-${i}`} />
                            ))}
                            {Array.from({ length: miniCalendarDays }, (_, i) => {
                                const day = i + 1;
                                const d = new Date(miniCalendarMonth.getFullYear(), miniCalendarMonth.getMonth(), day);
                                const isToday = new Date().toDateString() === d.toDateString();
                                const isCurrent = currentDate.getDate() === day && currentDate.getMonth() === miniCalendarMonth.getMonth();
                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => goToDate(d)}
                                        className={`aspect-square w-full flex items-center justify-center rounded-full transition-colors ${
                                            isToday ? "bg-blue-600 text-white font-semibold" : isCurrent ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-100"
                                        }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col min-w-0 bg-white h-full relative z-0">
                    <header className="px-4 sm:px-6 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shrink-0">
                        <div className="flex items-center justify-between sm:justify-start gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-xl text-gray-500"
                                >
                                    <Menu size={22} />
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                                    {view === "month" && `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                                    {view === "week" && `Week of ${MONTHS[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
                                    {view === "day" && `${MONTHS[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
                                    {view === "list" && `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                                </h1>
                            </div>

                            <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                                <button type="button" onClick={view === "month" ? prevMonth : view === "week" ? prevWeek : prevDay} className="p-1.5 hover:bg-white text-gray-500 hover:shadow-sm rounded-md transition-all">
                                    <ChevronLeft size={16} strokeWidth={2.5} />
                                </button>
                                <button type="button" onClick={() => goToDate(new Date())} className="px-3 py-1 text-[13px] font-semibold text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                                    Today
                                </button>
                                <button type="button" onClick={view === "month" ? nextMonth : view === "week" ? nextWeek : nextDay} className="p-1.5 hover:bg-white text-gray-500 hover:shadow-sm rounded-md transition-all">
                                    <ChevronRight size={16} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>

                        <div className="flex sm:hidden items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-0.5 w-full">
                            <button type="button" onClick={view === "month" ? prevMonth : view === "week" ? prevWeek : prevDay} className="p-2 text-gray-500">
                                <ChevronLeft size={18} />
                            </button>
                            <button type="button" onClick={() => goToDate(new Date())} className="px-4 py-1.5 text-sm font-semibold text-gray-600">
                                Today
                            </button>
                            <button type="button" onClick={view === "month" ? nextMonth : view === "week" ? nextWeek : nextDay} className="p-2 text-gray-500">
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar shrink-0 w-full sm:w-auto">
                            <div className="flex items-center bg-gray-50 border border-gray-200 p-0.5 rounded-lg shrink-0">
                                {(["Month", "Week", "Day", "List"] as const).map((v) => (
                                    <button
                                        key={v}
                                        type="button"
                                        onClick={() => setView(v.toLowerCase() as "month" | "week" | "day" | "list")}
                                        className={`px-3 sm:px-4 py-1.5 text-[13px] font-semibold rounded-md transition-all ${
                                            view === v.toLowerCase() ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5" : "text-gray-500 hover:text-gray-800"
                                        }`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => openNewEvent()}
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shrink-0 text-sm"
                            >
                                <Plus size={16} strokeWidth={2.5} />
                                Add Event
                            </button>
                        </div>
                    </header>

                    <div className="px-4 sm:px-6 py-2 border-b border-gray-100 flex items-center justify-between gap-4 overflow-x-auto hide-scrollbar shrink-0 bg-white">
                        <div className="flex items-center gap-1.5 shrink-0">
                            <button type="button" className="flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
                                <Filter size={14} />
                                Filter
                            </button>
                            <button type="button" className="flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
                                <Users size={14} />
                                Everyone
                            </button>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium text-gray-500 shrink-0">
                            {Object.entries(EVENT_TYPE_CONFIG).map(([key, cfg]) => (
                                <span key={key} className="flex items-center gap-1.5 whitespace-nowrap">
                                    <span className={`w-2 h-2 rounded-full ${key === "open-house" ? "bg-green-500" : key === "viewing" ? "bg-blue-500" : key === "closing" ? "bg-red-500" : key === "holiday" ? "bg-purple-500" : "bg-yellow-500"}`} />
                                    {cfg.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto bg-gray-50 flex flex-col">
                        {view === "month" && (
                            <>
                                <div className="grid grid-cols-7 border-b border-gray-200 sticky top-0 z-10 bg-white shadow-sm">
                                    {DAYS.map((day) => (
                                        <div key={day} className="py-2.5 text-center text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 auto-rows-fr flex-1 pb-8 sm:pb-0">
                                    {renderMonthGrid()}
                                </div>
                            </>
                        )}
                        {view === "week" && renderWeekView()}
                        {view === "day" && renderDayView()}
                        {view === "list" && renderListView()}
                    </div>

                    <button
                        type="button"
                        onClick={() => openNewEvent()}
                        className="sm:hidden fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 active:scale-95 transition-all z-10"
                    >
                        <Plus size={24} strokeWidth={2.5} />
                    </button>
                </main>
            </div>

            <EventModal
                isOpen={eventModalOpen}
                onClose={() => { setEventModalOpen(false); setEditingEvent(null); }}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
                initialDate={eventModalDate}
                event={editingEvent}
            />

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </AppLayout>
    );
}
