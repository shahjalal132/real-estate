import { Info } from "lucide-react";

export default function ClimateRisk() {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Climate Risk for 43055
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Flood Risk Card */}
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg font-bold text-gray-900">
                            Flood Risk
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Flood risk information"
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                        {/* Risk Score Square */}
                        <div className="bg-[#0066CC] rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-sm p-6 min-w-[100px] flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold text-white">
                                1
                            </div>
                            <div className="text-lg text-white/90">/10</div>
                        </div>

                        {/* Minimal Label */}
                        <div className="flex-1 pt-2">
                            <div className="text-xl font-semibold text-[#0066CC] mb-4">
                                Minimal
                            </div>

                            {/* FLOOD FACTOR Logo */}
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-1">
                                    {["F", "L", "O", "O", "D"].map(
                                        (letter, idx) => (
                                            <div
                                                key={idx}
                                                className="w-6 h-6 bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center rounded"
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
                                                className="w-6 h-6 bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center rounded"
                                            >
                                                {letter}
                                            </div>
                                        )
                                    )}
                                    <span className="text-[#0066CC] text-xs font-bold ml-1">
                                        ™
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-4">
                        This property has a minimal Flood Factor™.
                    </p>

                    {/* Link */}
                    <p className="text-xs text-gray-600">
                        View more in-depth climate risk data on{" "}
                        <a
                            href="#"
                            className="text-[#0066CC] hover:underline font-medium"
                        >
                            First Street Technology, Inc
                        </a>
                    </p>
                </div>

                {/* Fire Risk Card */}
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg font-bold text-gray-900">
                            Fire Risk
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Fire risk information"
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                        {/* Risk Score Square */}
                        <div className="bg-[#FF6B35] rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-sm p-6 min-w-[100px] flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold text-white">
                                1
                            </div>
                            <div className="text-lg text-white/90">/10</div>
                        </div>

                        {/* Minimal Label */}
                        <div className="flex-1 pt-2">
                            <div className="text-xl font-semibold text-[#FF6B35] mb-4">
                                Minimal
                            </div>

                            {/* FIRE FACTOR Logo */}
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-1">
                                    {["F", "I", "R", "E"].map((letter, idx) => (
                                        <div
                                            key={idx}
                                            className="w-6 h-6 bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center rounded"
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
                                                className="w-6 h-6 bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center rounded"
                                            >
                                                {letter}
                                            </div>
                                        )
                                    )}
                                    <span className="text-[#FF6B35] text-xs font-bold ml-1">
                                        ™
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-4">
                        This property has a minimal Fire Factor™.
                    </p>

                    {/* Link */}
                    <p className="text-xs text-gray-600">
                        View more in-depth climate risk data on{" "}
                        <a
                            href="#"
                            className="text-[#0066CC] hover:underline font-medium"
                        >
                            First Street Technology, Inc
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
