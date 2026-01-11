export default function PortfolioMap() {
    // Static placeholder for portfolio map
    // This would be replaced with actual map with markers in production

    // Property type colors matching the screenshot
    const propertyTypes = [
        { name: "Hospitality", color: "bg-[#17A2B8]" }, // Teal
        { name: "Industrial", color: "bg-[#6610F2]" }, // Dark Purple
        { name: "Land", color: "bg-[#8B4513]" }, // Brown
        { name: "Office", color: "bg-[#007BFF]" }, // Blue
        { name: "Retail", color: "bg-[#FFC107]" }, // Yellow
        { name: "Flex", color: "bg-[#9C27B0]" }, // Light Purple
        { name: "Sports & Entertainment", color: "bg-[#6F42C1]" }, // Darker Purple
        { name: "Specialty", color: "bg-[#28A745]" }, // Dark Green
        { name: "Multifamily", color: "bg-[#20C997]" }, // Green
        { name: "Health Care", color: "bg-[#17A2B8]" }, // Light Blue
        { name: "Student", color: "bg-[#7CB342]" }, // Lighter Green
        { name: "HQ", color: "bg-black" }, // Black
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Title */}
            <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Portfolio</h3>
            </div>

            {/* Map */}
            <div className="relative w-full bg-gray-100" style={{ height: "500px" }}>
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                        <p className="text-sm">Portfolio Map</p>
                        <p className="text-xs mt-1">Map will be displayed here</p>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Property Type</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {propertyTypes.map((type) => (
                        <div
                            key={type.name}
                            className="flex items-center gap-2"
                        >
                            {type.name === "HQ" ? (
                                <div className="w-4 h-4 bg-black flex items-center justify-center">
                                    <span className="text-white text-[8px] font-bold leading-none">
                                        HQ
                                    </span>
                                </div>
                            ) : (
                                <div
                                    className={`w-4 h-4 ${type.color}`}
                                    style={{
                                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                                    }}
                                />
                            )}
                            <span className="text-sm text-gray-700">{type.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

