import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SpaceUseSelectorProps {
    spaceUse: string[];
    onSpaceUseChange: (value: string[]) => void;
    inShoppingCenter?: boolean;
    onInShoppingCenterChange?: (value: boolean) => void;
    label?: string;
}

const SPACE_USE_OPTIONS = [
    "Office",
    "Coworking",
    "Industrial",
    "Retail",
    "Flex",
    "Medical",
];

export default function SpaceUseSelector({
    spaceUse = [],
    onSpaceUseChange,
    inShoppingCenter = false,
    onInShoppingCenterChange,
    label = "Space Use",
}: SpaceUseSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isShoppingCenterOpen, setIsShoppingCenterOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectorRef.current &&
                !selectorRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setIsShoppingCenterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSpaceUseToggle = (option: string) => {
        const newSelection = spaceUse.includes(option)
            ? spaceUse.filter((item) => item !== option)
            : [...spaceUse, option];
        onSpaceUseChange(newSelection);
    };

    const getDisplayText = () => {
        if (spaceUse.length === 0) return label;
        if (spaceUse.length === 1) return spaceUse[0];
        return `${spaceUse.length} selected`;
    };

    return (
        <div className="relative shrink-0" ref={selectorRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between rounded-md border py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[140px] ${
                    spaceUse.length > 0
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span className="truncate">{getDisplayText()}</span>
                <ChevronDown
                    className={`absolute right-2 h-4 w-4 text-gray-400 pointer-events-none transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute left-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
                        <div className="py-1">
                            {/* Space Use Options */}
                            {SPACE_USE_OPTIONS.map((option) => (
                                <label
                                    key={option}
                                    className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={spaceUse.includes(option)}
                                        onChange={() =>
                                            handleSpaceUseToggle(option)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {option}
                                    </span>
                                </label>
                            ))}

                            {/* Separator */}
                            {onInShoppingCenterChange && (
                                <>
                                    <div className="border-t border-gray-200 my-1" />

                                    {/* In a Shopping Center Option */}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsShoppingCenterOpen(
                                                    !isShoppingCenterOpen
                                                );
                                            }}
                                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-50 transition-colors"
                                        >
                                            <label className="flex cursor-pointer items-center gap-2 flex-1 pointer-events-none">
                                                <input
                                                    type="checkbox"
                                                    checked={inShoppingCenter}
                                                    readOnly
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    In a Shopping Center
                                                </span>
                                            </label>
                                            <ChevronDown
                                                className={`h-4 w-4 text-gray-400 transition-transform ${
                                                    isShoppingCenterOpen
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </button>

                                        {/* Shopping Center Sub-options */}
                                        {isShoppingCenterOpen && (
                                            <div className="bg-white">
                                                <label className="flex cursor-pointer items-center gap-2 px-4 py-2 pl-8 hover:bg-blue-50 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            inShoppingCenter
                                                        }
                                                        onChange={(e) => {
                                                            e.stopPropagation();
                                                            onInShoppingCenterChange?.(
                                                                true
                                                            );
                                                        }}
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        In a Shopping Center
                                                    </span>
                                                </label>
                                                <label className="flex cursor-pointer items-center gap-2 px-4 py-2 pl-8 hover:bg-blue-50 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            !inShoppingCenter
                                                        }
                                                        onChange={(e) => {
                                                            e.stopPropagation();
                                                            onInShoppingCenterChange?.(
                                                                false
                                                            );
                                                        }}
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        Not in a Shopping Center
                                                    </span>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
