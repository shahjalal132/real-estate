import { useState } from "react";
import { FileText } from "lucide-react";
import NotesModal from "./NotesModal";

interface NotesButtonProps {
    propertyId: number;
}

export default function NotesButton({ propertyId }: NotesButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer text-gray-600 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
                aria-label="Notes"
            >
                <FileText className="w-4 h-4" />
                <span>Notes</span>
            </button>
            <NotesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                propertyId={propertyId}
            />
        </>
    );
}
