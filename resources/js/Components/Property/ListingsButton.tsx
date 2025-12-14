import { List } from "lucide-react";
import { router } from "@inertiajs/react";

export default function ListingsButton() {
    const handleClick = () => {
        router.get("/properties");
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="flex items-center gap-2 px-4 py-2 text-[16px] font-normal cursor-pointer text-gray-600 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
            aria-label="Listings"
        >
            <List className="w-4 h-4" />
            <span>Listings</span>
        </button>
    );
}

