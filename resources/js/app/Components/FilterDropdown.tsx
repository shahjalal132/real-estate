import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

interface FilterDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const OPTIONS = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
];

export default function FilterDropdown({ value, onChange }: FilterDropdownProps) {
    const [open, setOpen] = useState(false);

    const selectedLabel =
        OPTIONS.find((opt) => opt.value === value)?.label || "All options";

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white px-5 py-2 text-sm font-medium text-[#4a4a4a] shadow-sm shadow-gray-200 hover:shadow-md hover:bg-gray-50 focus:outline-none"
                onClick={() => setOpen((prev) => !prev)}
            >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 text-sm text-gray-700">
                        <button
                            type="button"
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                                onChange("all");
                                setOpen(false);
                            }}
                        >
                            All options
                        </button>
                        {OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

