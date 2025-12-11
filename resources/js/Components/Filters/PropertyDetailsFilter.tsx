interface PropertyDetailsFilterProps {
    minSqft: string;
    maxSqft: string;
    minPricePerSqft: string;
    maxPricePerSqft: string;
    minAcres: string;
    maxAcres: string;
    onMinSqftChange: (value: string) => void;
    onMaxSqftChange: (value: string) => void;
    onMinPricePerSqftChange: (value: string) => void;
    onMaxPricePerSqftChange: (value: string) => void;
    onMinAcresChange: (value: string) => void;
    onMaxAcresChange: (value: string) => void;
}

export default function PropertyDetailsFilter({
    minSqft,
    maxSqft,
    minPricePerSqft,
    maxPricePerSqft,
    minAcres,
    maxAcres,
    onMinSqftChange,
    onMaxSqftChange,
    onMinPricePerSqftChange,
    onMaxPricePerSqftChange,
    onMinAcresChange,
    onMaxAcresChange,
}: PropertyDetailsFilterProps) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Additional Property Details
            </label>
            <div className="space-y-2">
                {/* Square Footage */}
                <div>
                    <label className="mb-1 block text-xs text-gray-600">
                        Square footage
                    </label>
                    <div className="flex items-center gap-1.5">
                        <input
                            type="number"
                            placeholder="Min SF"
                            value={minSqft}
                            onChange={(e) => onMinSqftChange(e.target.value)}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                        <span className="text-xs text-gray-500">-</span>
                        <input
                            type="number"
                            placeholder="Max SF"
                            value={maxSqft}
                            onChange={(e) => onMaxSqftChange(e.target.value)}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>

                {/* $/SF */}
                <div>
                    <label className="mb-1 block text-xs text-gray-600">
                        $/SF
                    </label>
                    <div className="flex items-center gap-1.5">
                        <input
                            type="number"
                            placeholder="Min $ / SF"
                            value={minPricePerSqft}
                            onChange={(e) =>
                                onMinPricePerSqftChange(e.target.value)
                            }
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                        <span className="text-xs text-gray-500">-</span>
                        <input
                            type="number"
                            placeholder="Max $ / SF"
                            value={maxPricePerSqft}
                            onChange={(e) =>
                                onMaxPricePerSqftChange(e.target.value)
                            }
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>

                {/* Acreage */}
                <div>
                    <label className="mb-1 block text-xs text-gray-600">
                        Acreage
                    </label>
                    <div className="flex items-center gap-1.5">
                        <input
                            type="number"
                            placeholder="Min acres"
                            value={minAcres}
                            onChange={(e) => onMinAcresChange(e.target.value)}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                        <span className="text-xs text-gray-500">-</span>
                        <input
                            type="number"
                            placeholder="Max acres"
                            value={maxAcres}
                            onChange={(e) => onMaxAcresChange(e.target.value)}
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-1 focus:ring-[#0066CC] focus:ring-opacity-20"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
