import { Info } from "lucide-react";

export default function ClimateRisk() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
                Climate Risk for 43055
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Flood Risk Card */}
                <div className="group border border-gray-200 rounded-xl p-5 bg-white hover:border-[#0066CC]/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-base font-bold text-gray-900">
                            Flood Risk
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-[#0066CC] transition-colors"
                            aria-label="Flood risk information"
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                        {/* Risk Score Square */}
                        <div className="bg-[#0066CC] rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-sm p-4 min-w-[80px] flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <div className="text-3xl font-bold text-white">
                                1
                            </div>
                            <div className="text-sm text-white/90">/10</div>
                        </div>

                        {/* Minimal Label */}
                        <div className="flex-1 pt-1">
                            <div className="text-lg font-semibold text-[#0066CC] mb-3">
                                Minimal
                            </div>

                            {/* FLOOD FACTOR Logo */}
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-1">
                                    {["F", "L", "O", "O", "D"].map(
                                        (letter, idx) => (
                                            <div
                                                key={idx}
                                                className="w-5 h-5 bg-[#0066CC] text-white text-[10px] font-bold flex items-center justify-center rounded group-hover:bg-[#0052a3] transition-colors duration-300"
                                            >
                                                {letter}
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="flex gap-1">
                                    {["F", "A", "C", "T", "O", "R"].map(
                                        (letter, idx) => (
                                            <div
                                                key={idx}
                                                className="w-5 h-5 bg-[#0066CC] text-white text-[10px] font-bold flex items-center justify-center rounded group-hover:bg-[#0052a3] transition-colors duration-300"
                                            >
                                                {letter}
                                            </div>
                                        )
                                    )}
                                    <span className="text-[#0066CC] text-[10px] font-bold ml-1">
                                        ™
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        This property has a minimal Flood Factor™.
                    </p>

                    {/* Link */}
                    <p className="text-xs text-gray-600">
                        View more in-depth climate risk data on{" "}
                        <a
                            href="#"
                            className="text-[#0066CC] hover:text-[#0052a3] hover:underline font-medium transition-colors"
                        >
                            First Street Technology, Inc
                        </a>
                    </p>
                </div>

                {/* Fire Risk Card */}
                <div className="group border border-gray-200 rounded-xl p-5 bg-white hover:border-[#FF6B35]/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-base font-bold text-gray-900">
                            Fire Risk
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-[#FF6B35] transition-colors"
                            aria-label="Fire risk information"
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                        {/* Risk Score Square */}
                        <div className="bg-[#FF6B35] rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-sm p-4 min-w-[80px] flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <div className="text-3xl font-bold text-white">
                                1
                            </div>
                            <div className="text-sm text-white/90">/10</div>
                        </div>

                        {/* Minimal Label */}
                        <div className="flex-1 pt-1">
                            <div className="text-lg font-semibold text-[#FF6B35] mb-3">
                                Minimal
                            </div>

                            {/* FIRE FACTOR Logo */}
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-1">
                                    {["F", "I", "R", "E"].map((letter, idx) => (
                                        <div
                                            key={idx}
                                            className="w-5 h-5 bg-[#FF6B35] text-white text-[10px] font-bold flex items-center justify-center rounded group-hover:bg-[#e55a2b] transition-colors duration-300"
                                        >
                                            {letter}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-1">
                                    {["F", "A", "C", "T", "O", "R"].map(
                                        (letter, idx) => (
                                            <div
                                                key={idx}
                                                className="w-5 h-5 bg-[#FF6B35] text-white text-[10px] font-bold flex items-center justify-center rounded group-hover:bg-[#e55a2b] transition-colors duration-300"
                                            >
                                                {letter}
                                            </div>
                                        )
                                    )}
                                    <span className="text-[#FF6B35] text-[10px] font-bold ml-1">
                                        ™
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        This property has a minimal Fire Factor™.
                    </p>

                    {/* Link */}
                    <p className="text-xs text-gray-600">
                        View more in-depth climate risk data on{" "}
                        <a
                            href="#"
                            className="text-[#0066CC] hover:text-[#0052a3] hover:underline font-medium transition-colors"
                        >
                            First Street Technology, Inc
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
