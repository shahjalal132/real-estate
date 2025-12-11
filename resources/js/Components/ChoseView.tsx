import { useState } from "react";

interface ChoseViewProps {
    value: string;
    onChange: (value: string) => void;
}

const OPTIONS = [
    { value: "residential", label: "Residential" },
    { value: "auctions", label: "Auctions" },
    { value: "commercial", label: "Commercial" },
];

export default function ChoseView({
    value,
    onChange,
}: ChoseViewProps) {
    const [open, setOpen] = useState(false);

    const selectedLabel =
        OPTIONS.find((opt) => opt.value === value)?.label || "All options";

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-transparent hover:border-[#015EBC] bg-white px-5 py-2 text-sm font-medium text-[#333333] shadow-sm shadow-gray-200 hover:shadow-md hover:bg-gray-50 focus:outline-none"
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>Chose View</span>
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-[#015EBC] focus:outline-none">
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

