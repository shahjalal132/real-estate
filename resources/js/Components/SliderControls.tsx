import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderControlsProps {
    onPrev: () => void;
    onNext: () => void;
    prevButtonLabel?: string;
    nextButtonLabel?: string;
    className?: string;
}

export default function SliderControls({
    onPrev,
    onNext,
    prevButtonLabel = "Previous",
    nextButtonLabel = "Next",
    className = "",
}: SliderControlsProps) {
    return (
        <div className={`flex items-center justify-center gap-3 ${className}`}>
            <button
                type="button"
                aria-label={prevButtonLabel}
                onClick={onPrev}
                className="rounded-full border border-gray-200 p-3 text-gray-600 transition hover:border-blue-500 hover:text-blue-600"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                type="button"
                aria-label={nextButtonLabel}
                onClick={onNext}
                className="rounded-full border border-gray-200 p-3 text-gray-600 transition hover:border-blue-500 hover:text-blue-600"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}

