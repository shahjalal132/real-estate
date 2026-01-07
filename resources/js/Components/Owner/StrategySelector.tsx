import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface StrategySelectorProps {
    selectedStrategies: string[];
    onChange: (values: string[]) => void;
}

const STRATEGY_OPTIONS = [
    "Select All",
    "Co-Investment",
    "Core",
    "Core-Plus",
    "Debt",
    "Distressed",
    "Fund of Funds",
    "Opportunistic",
    "Secondaries",
    "Value Added",
];

export default function StrategySelector({
    selectedStrategies = [],
    onChange,
}: StrategySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectorRef.current &&
                !selectorRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    const isAllStrategiesSelected =
        selectedStrategies.length === STRATEGY_OPTIONS.length - 1;

    const handleStrategyToggle = (strategy: string) => {
        if (strategy === "Select All") {
            if (isAllStrategiesSelected) {
                onChange([]);
            } else {
                onChange(
                    STRATEGY_OPTIONS.filter((s) => s !== "Select All")
                );
            }
        } else {
            const newSelection = selectedStrategies.includes(strategy)
                ? selectedStrategies.filter((s) => s !== strategy)
                : [...selectedStrategies, strategy];
            onChange(newSelection);
        }
    };

    const getDisplayLabel = () => {
        if (selectedStrategies.length === 0) {
            return "Strategy";
        }
        if (selectedStrategies.length === 1) {
            return selectedStrategies[0];
        }
        // Show format like "Value Added +1" (first item name + count of additional items)
        const firstItem = selectedStrategies[0];
        const additionalCount = selectedStrategies.length - 1;
        return `${firstItem} +${additionalCount}`;
    };

    return (
        <div className="relative" ref={selectorRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    selectedStrategies.length > 0
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span className="whitespace-nowrap">{getDisplayLabel()}</span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
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
                    <div
                        className="absolute left-0 z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="py-1 max-h-96 overflow-y-auto">
                            {STRATEGY_OPTIONS.map((strategy) => {
                                const isChecked =
                                    strategy === "Select All"
                                        ? isAllStrategiesSelected
                                        : selectedStrategies.includes(strategy);
                                return (
                                    <label
                                        key={strategy}
                                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleStrategyToggle(strategy);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-3.5 w-3.5 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC] cursor-pointer"
                                        />
                                        <span className="text-gray-700">
                                            {strategy}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

