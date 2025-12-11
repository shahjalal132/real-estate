import { useState } from "react";
import { Star } from "lucide-react";
import { Property } from "../../types";
import SaveModal from "./SaveModal";

interface SaveButtonProps {
    property: Property;
    propertyImage?: string;
}

export default function SaveButton({
    property,
    propertyImage,
}: SaveButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-[16px] font-normal cursor-pointer text-gray-600 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
                aria-label="Save"
            >
                <Star className="w-4 h-4" />
                <span>Save</span>
            </button>
            <SaveModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                property={property}
                propertyImage={propertyImage}
            />
        </>
    );
}
