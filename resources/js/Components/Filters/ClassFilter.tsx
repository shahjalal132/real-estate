interface ClassFilterProps {
    selectedClasses: string[];
    onChange: (classes: string[]) => void;
}

const CLASS_OPTIONS = ["A", "B", "C", "D"];

export default function ClassFilter({
    selectedClasses,
    onChange,
}: ClassFilterProps) {
    const handleToggle = (classOption: string) => {
        if (selectedClasses.includes(classOption)) {
            onChange(selectedClasses.filter((c) => c !== classOption));
        } else {
            onChange([...selectedClasses, classOption]);
        }
    };

    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
                Class
            </label>
            <div className="flex flex-wrap gap-1.5">
                {CLASS_OPTIONS.map((classOption) => (
                    <button
                        key={classOption}
                        type="button"
                        onClick={() => handleToggle(classOption)}
                        className={`rounded border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                            selectedClasses.includes(classOption)
                                ? "border-[#0066CC] bg-[#0066CC] text-white shadow-sm"
                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                    >
                        {classOption}
                    </button>
                ))}
            </div>
        </div>
    );
}
