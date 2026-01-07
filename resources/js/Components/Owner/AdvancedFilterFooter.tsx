interface AdvancedFilterFooterProps {
    onClear: () => void;
    onDone: () => void;
}

export default function AdvancedFilterFooter({
    onClear,
    onDone,
}: AdvancedFilterFooterProps) {
    return (
        <div className="border-t border-gray-200 px-4 py-3 bg-white shrink-0">
            <div className="flex items-center justify-between">
                <button
                    onClick={onClear}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    Show Criteria
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onClear}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onDone}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

