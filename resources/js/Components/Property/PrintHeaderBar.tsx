import { ChevronLeft } from "lucide-react";

interface PrintHeaderBarProps {
    onBack: () => void;
    onCustomize: () => void;
    onPrint: () => void;
}

export default function PrintHeaderBar({
    onBack,
    onCustomize,
    onPrint,
}: PrintHeaderBarProps) {
    return (
        <div
            data-print-header
            className="bg-gray-50 border-b border-gray-200 px-6 py-2 fixed top-0 left-0 right-0 z-[200] print:hidden"
        >
            <div className="flex items-center justify-between">
                {/* Left Side */}
                <div className="flex flex-col gap-1">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 text-[#0066CC] hover:text-[#0052A3] text-sm font-medium transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to listing
                    </button>
                    <p className="text-xs text-gray-600">
                        To expand a section for printing, scroll down and open
                        it before clicking Print.
                    </p>
                </div>

                {/* Right Side - Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onCustomize}
                        className="px-4 py-2 text-sm font-medium text-[#0066CC] border border-[#0066CC] rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Customize
                    </button>
                    <button
                        onClick={onPrint}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#0066CC] rounded-lg hover:bg-[#0052A3] transition-colors"
                    >
                        Print
                    </button>
                </div>
            </div>
        </div>
    );
}
