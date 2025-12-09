import { useState } from "react";
import { Share2 } from "lucide-react";
import { Property } from "../../types";
import ShareModal from "./ShareModal";

interface ShareButtonProps {
    property: Property;
    propertyImage?: string;
}

export default function ShareButton({
    property,
    propertyImage,
}: ShareButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer text-gray-600 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
                aria-label="Share"
            >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
            </button>
            <ShareModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                property={property}
                propertyImage={propertyImage}
            />
        </>
    );
}
