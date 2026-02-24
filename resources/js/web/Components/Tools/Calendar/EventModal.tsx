import { useState, useEffect } from "react";
import { X } from "lucide-react";

export type CalendarEventType = "open-house" | "viewing" | "closing" | "meeting" | "holiday";

export interface CalendarEventForm {
    id?: number;
    title: string;
    type: CalendarEventType;
    start_at: string;
    end_at: string;
    location: string;
    description: string;
    attendees: string[];
}

const EVENT_TYPES: { value: CalendarEventType; label: string }[] = [
    { value: "open-house", label: "Open House" },
    { value: "viewing", label: "Viewing" },
    { value: "closing", label: "Closing" },
    { value: "meeting", label: "Meeting" },
    { value: "holiday", label: "Holiday" },
];

function toLocalISO(d: Date): string {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CalendarEventForm) => void;
    onDelete?: (id: number) => void;
    initialDate?: Date;
    event?: CalendarEventForm | null;
}

export default function EventModal({
    isOpen,
    onClose,
    onSave,
    onDelete,
    initialDate,
    event,
}: EventModalProps) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState<CalendarEventType>("meeting");
    const [start_at, setStartAt] = useState("");
    const [end_at, setEndAt] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [attendees, setAttendees] = useState("");

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setType(event.type);
            setStartAt(event.start_at.slice(0, 16));
            setEndAt(event.end_at?.slice(0, 16) ?? "");
            setLocation(event.location ?? "");
            setDescription(event.description ?? "");
            setAttendees((event.attendees ?? []).join(", "));
        } else if (initialDate) {
            const start = new Date(initialDate);
            start.setHours(9, 0, 0, 0);
            const end = new Date(start);
            end.setHours(10, 0, 0, 0);
            setStartAt(toLocalISO(start));
            setEndAt(toLocalISO(end));
            setTitle("");
            setType("meeting");
            setLocation("");
            setDescription("");
            setAttendees("");
        }
    }, [event, initialDate, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const t = title.trim();
        if (!t) return;
        const start = start_at || toLocalISO(new Date());
        const end = end_at || start;
        onSave({
            ...(event?.id && { id: event.id }),
            title: t,
            type,
            start_at: start,
            end_at: end,
            location: location.trim() || "",
            description: description.trim() || "",
            attendees: attendees.split(",").map((s) => s.trim()).filter(Boolean),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {event?.id ? "Edit event" : "New event"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Event title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as CalendarEventType)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            {EVENT_TYPES.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
                            <input
                                type="datetime-local"
                                value={start_at}
                                onChange={(e) => setStartAt(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
                            <input
                                type="datetime-local"
                                value={end_at}
                                onChange={(e) => setEndAt(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Address or place"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Attendees (comma-separated)</label>
                        <input
                            type="text"
                            value={attendees}
                            onChange={(e) => setAttendees(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="JD, AS, SC"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Optional notes"
                        />
                    </div>
                </form>
                <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50">
                    <div>
                        {event?.id && onDelete && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.confirm("Delete this event?")) {
                                        onDelete(event.id!);
                                        onClose();
                                    }
                                }}
                                className="text-sm font-medium text-red-600 hover:text-red-700"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                        >
                            {event?.id ? "Save" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
