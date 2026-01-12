import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

interface SubmarketTransferListProps {
    selectedSubmarkets?: string[];
    onChange?: (values: string[]) => void;
}

export default function SubmarketTransferList({
    selectedSubmarkets = [],
    onChange,
}: SubmarketTransferListProps) {
    const [availableSubmarkets, setAvailableSubmarkets] = useState<string[]>(
        []
    );
    const [selected, setSelected] = useState<string[]>(selectedSubmarkets);
    const [highlightedAvailable, setHighlightedAvailable] = useState<
        string | null
    >(null);
    const [highlightedSelected, setHighlightedSelected] = useState<
        string | null
    >(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Update selected when prop changes
    useEffect(() => {
        setSelected(selectedSubmarkets);
    }, [selectedSubmarkets]);

    // Filter available submarkets based on search
    const filteredAvailable = availableSubmarkets.filter((submarket) =>
        submarket.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMoveRight = () => {
        if (highlightedAvailable) {
            const newSelected = [...selected, highlightedAvailable];
            setSelected(newSelected);
            setAvailableSubmarkets(
                availableSubmarkets.filter((s) => s !== highlightedAvailable)
            );
            setHighlightedAvailable(null);
            onChange?.(newSelected);
        }
    };

    const handleMoveAllRight = () => {
        const newSelected = [...selected, ...filteredAvailable];
        setSelected(newSelected);
        setAvailableSubmarkets(
            availableSubmarkets.filter((s) => !filteredAvailable.includes(s))
        );
        setHighlightedAvailable(null);
        onChange?.(newSelected);
    };

    const handleMoveLeft = () => {
        if (highlightedSelected) {
            const newAvailable = [...availableSubmarkets, highlightedSelected];
            setAvailableSubmarkets(newAvailable);
            setSelected(selected.filter((s) => s !== highlightedSelected));
            setHighlightedSelected(null);
            const newSelected = selected.filter((s) => s !== highlightedSelected);
            onChange?.(newSelected);
        }
    };

    const handleMoveAllLeft = () => {
        setAvailableSubmarkets([...availableSubmarkets, ...selected]);
        setSelected([]);
        setHighlightedSelected(null);
        onChange?.([]);
    };

    const handleDoubleClickAvailable = (submarket: string) => {
        const newSelected = [...selected, submarket];
        setSelected(newSelected);
        setAvailableSubmarkets(
            availableSubmarkets.filter((s) => s !== submarket)
        );
        onChange?.(newSelected);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4">
            {/* Filter Criteria */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Row 1 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                        </label>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                <option>United States</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Market
                        </label>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                <option>Abilene - TX</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Type
                        </label>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                <option>Office</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Submarket Cluster
                        </label>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10">
                                <option>All Clusters</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Submarket Selection */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="grid grid-cols-12 gap-4">
                    {/* Available Submarkets */}
                    <div className="col-span-5 flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Available Submarkets
                        </label>
                        <div className="relative mb-2">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex-1 border border-gray-300 rounded-md bg-white min-h-[300px] max-h-[400px] overflow-y-auto">
                            {filteredAvailable.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {filteredAvailable.map((submarket) => (
                                        <li
                                            key={submarket}
                                            onClick={() =>
                                                setHighlightedAvailable(
                                                    highlightedAvailable ===
                                                        submarket
                                                        ? null
                                                        : submarket
                                                )
                                            }
                                            onDoubleClick={() =>
                                                handleDoubleClickAvailable(
                                                    submarket
                                                )
                                            }
                                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                                highlightedAvailable ===
                                                submarket
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {submarket}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-500">
                                    No submarkets available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Selection Controls */}
                    <div className="col-span-2 flex flex-col items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={handleMoveAllRight}
                            disabled={filteredAvailable.length === 0}
                            className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="move all right"
                        >
                            <svg
                                className="h-4 w-4 mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M3,5.88 L4.90283401,4 L13,12 L4.90283401,20 L3,18.12 L9.18083671,12 L3,5.88 L3,5.88 Z M11,5.88 L12.902834,4 L21,12 L12.902834,20 L11,18.12 L17.1808367,12 L11,5.88 Z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={handleMoveRight}
                            disabled={!highlightedAvailable}
                            className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="move selected right"
                        >
                            <svg
                                className="h-4 w-4 mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <polygon points="8.90283401 4 7 5.88 13.1808367 12 7 18.12 8.90283401 20 17 12" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={handleMoveLeft}
                            disabled={!highlightedSelected}
                            className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="move selected left"
                        >
                            <svg
                                className="h-4 w-4 mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <polygon points="15.097166 4 17 5.88 10.8191633 12 17 18.12 15.097166 20 7 12" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={handleMoveAllLeft}
                            disabled={selected.length === 0}
                            className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="move all left"
                        >
                            <svg
                                className="h-4 w-4 mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M3,5.88 L4.90283401,4 L13,12 L4.90283401,20 L3,18.12 L9.18083671,12 L3,5.88 L3,5.88 Z M11,5.88 L12.902834,4 L21,12 L12.902834,20 L11,18.12 L17.1808367,12 L11,5.88 Z"
                                    transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000)"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Selected Submarkets */}
                    <div className="col-span-5 flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Selected Submarkets
                        </label>
                        <div className="flex-1 border border-gray-300 rounded-md bg-white min-h-[300px] max-h-[400px] overflow-y-auto">
                            {selected.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {selected.map((submarket) => (
                                        <li
                                            key={submarket}
                                            onClick={() =>
                                                setHighlightedSelected(
                                                    highlightedSelected ===
                                                        submarket
                                                        ? null
                                                        : submarket
                                                )
                                            }
                                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                                                highlightedSelected === submarket
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {submarket}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-400 space-y-1">
                                    <p>
                                        Select Submarkets from the list on the
                                        left by double clicking.
                                    </p>
                                    <p>Or</p>
                                    <p>
                                        Single click to highlight and use the
                                        arrow buttons to add to the list of
                                        Selected Submarkets.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

