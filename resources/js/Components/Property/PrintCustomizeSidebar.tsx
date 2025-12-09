import { X, Check } from "lucide-react";

export interface PrintSection {
    id: string;
    label: string;
    children?: PrintSection[];
}

interface PrintCustomizeSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    sections: PrintSection[];
    selectedSections: string[];
    onToggleSection: (sectionId: string) => void;
}

export default function PrintCustomizeSidebar({
    isOpen,
    onClose,
    sections,
    selectedSections,
    onToggleSection,
}: PrintCustomizeSidebarProps) {
    if (!isOpen) return null;

    const renderSection = (section: PrintSection, level: number = 0) => {
        const isSelected = selectedSections.includes(section.id);
        const hasChildren = section.children && section.children.length > 0;

        return (
            <div key={section.id}>
                <div
                    className={`flex items-center gap-2 py-2 px-${
                        level * 4 + 2
                    } cursor-pointer hover:bg-gray-50 transition-colors`}
                    style={{ paddingLeft: `${level * 16 + 8}px` }}
                    onClick={() => onToggleSection(section.id)}
                >
                    <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                            isSelected
                                ? "border-[#0066CC] bg-[#0066CC]"
                                : "border-gray-300 bg-white"
                        }`}
                    >
                        {isSelected && (
                            <Check className="h-2.5 w-2.5 text-white" />
                        )}
                    </div>
                    <span className="text-sm text-gray-900">
                        {section.label}
                    </span>
                </div>
                {hasChildren &&
                    section.children!.map((child) =>
                        renderSection(child, level + 1)
                    )}
            </div>
        );
    };

    return (
        <>
            {/* Backdrop */}
            <div
                data-print-backdrop
                className="fixed inset-0 z-[90] bg-black opacity-50 transition-opacity duration-300 print:hidden"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                data-print-sidebar
                className="fixed left-0 top-0 bottom-0 z-[100] w-80 bg-white border-r border-gray-200 shadow-xl overflow-y-auto print:hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Data Points
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-4 py-4">
                    {sections.map((section) => renderSection(section))}
                </div>
            </div>
        </>
    );
}
