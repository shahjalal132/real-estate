import { Printer } from "lucide-react";

interface PrintButtonProps {
    onPrintClick: () => void;
}

export default function PrintButton({ onPrintClick }: PrintButtonProps) {
    return (
        <button
            type="button"
            onClick={onPrintClick}
            className="flex items-center gap-2 px-4 py-2 text-[16px] font-normal cursor-pointer text-gray-600 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
            aria-label="Print"
        >
            <Printer className="w-4 h-4" />
            <span>Print</span>
        </button>
    );
}
