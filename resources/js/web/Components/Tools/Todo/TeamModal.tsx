import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Team } from "./types";

const PRESET_COLORS = [
    "#4CE0D2",
    "#4573D2",
    "#E24C4C",
    "#E2B84C",
    "#4CE08A",
    "#9B4CE0",
];

interface TeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    team: Team | null;
    onSave: (data: { name: string; color?: string }) => void;
}

export default function TeamModal({
    isOpen,
    onClose,
    team,
    onSave,
}: TeamModalProps) {
    const [name, setName] = useState("");
    const [color, setColor] = useState<string>("");

    useEffect(() => {
        if (team) {
            setName(team.name);
            setColor(team.color || "");
        } else {
            setName("");
            setColor("");
        }
    }, [team, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        onSave({ name: trimmed, color: color || undefined });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {team ? "Edit team" : "New team"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Team name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4573D2] focus:border-[#4573D2] outline-none transition-shadow"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Color
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {PRESET_COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                                        color === c
                                            ? "border-gray-900 scale-110"
                                            : "border-transparent hover:scale-105"
                                    }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>
                </form>
                <div className="flex gap-2 px-5 pb-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                        className="flex-1 py-3 rounded-xl bg-[#4573D2] text-white font-medium hover:bg-[#3b63b8] disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {team ? "Save" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
