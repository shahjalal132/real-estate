import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import TenantSortSelector from "./TenantSortSelector";

interface ContactsFilterBarProps {
    contactName?: string;
    onContactNameChange?: (value: string) => void;
    companyName?: string;
    onCompanyNameChange?: (value: string) => void;
    addressSearch?: string;
    onAddressSearchChange?: (value: string) => void;
    title?: string;
    onTitleChange?: (value: string) => void;
    role?: string[];
    onRoleChange?: (value: string[]) => void;
    contactCount?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;
}

const ROLE_OPTIONS = [
    "Decision Maker - Leasing",
    "Decision Maker - Acquisitions",
    "Decision Influencer - Leasing",
    "Decision Influencer - Acquisitions",
];

export default function ContactsFilterBar({
    contactName = "",
    onContactNameChange,
    companyName = "",
    onCompanyNameChange,
    addressSearch = "",
    onAddressSearchChange,
    title = "",
    onTitleChange,
    role = [],
    onRoleChange,
    contactCount = 0,
    sortBy,
    sortDir,
    onSortChange,
}: ContactsFilterBarProps) {
    const [localContactName, setLocalContactName] = useState(contactName);
    const [localCompanyName, setLocalCompanyName] = useState(companyName);
    const [localAddressSearch, setLocalAddressSearch] = useState(addressSearch);
    const [localTitle, setLocalTitle] = useState(title);
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const roleRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                roleRef.current &&
                !roleRef.current.contains(event.target as Node)
            ) {
                setIsRoleOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleContactNameChange = (value: string) => {
        setLocalContactName(value);
        onContactNameChange?.(value);
    };

    const handleCompanyNameChange = (value: string) => {
        setLocalCompanyName(value);
        onCompanyNameChange?.(value);
    };

    const handleAddressSearchChange = (value: string) => {
        setLocalAddressSearch(value);
        onAddressSearchChange?.(value);
    };

    const handleTitleChange = (value: string) => {
        setLocalTitle(value);
        onTitleChange?.(value);
    };

    return (
        <div className="bg-white border-b border-gray-200 py-4">
            <div className="flex items-center justify-between gap-4">
                {/* Left Group: Filter Inputs */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Contact Name Input */}
                    <div className="relative shrink-0">
                        <input
                            type="text"
                            value={localContactName}
                            onChange={(e) =>
                                handleContactNameChange(e.target.value)
                            }
                            placeholder="Contact Name"
                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[140px]"
                        />
                    </div>

                    {/* Company Name Input */}
                    <div className="relative shrink-0">
                        <input
                            type="text"
                            value={localCompanyName}
                            onChange={(e) =>
                                handleCompanyNameChange(e.target.value)
                            }
                            placeholder="Company Name"
                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[140px]"
                        />
                    </div>

                    {/* Address or Location Input */}
                    <div className="relative w-64 shrink-0">
                        <input
                            type="text"
                            value={localAddressSearch}
                            onChange={(e) =>
                                handleAddressSearchChange(e.target.value)
                            }
                            placeholder="Address or Location"
                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Title Input */}
                    <div className="relative shrink-0">
                        <input
                            type="text"
                            value={localTitle}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="Title"
                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[140px]"
                        />
                    </div>

                    {/* Role Dropdown */}
                    <div className="relative shrink-0" ref={roleRef}>
                        <button
                            type="button"
                            onClick={() => setIsRoleOpen(!isRoleOpen)}
                            className={`flex items-center justify-between rounded-md border py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[140px] ${
                                role.length > 0
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            <span className="truncate">
                                {role.length === 0
                                    ? "Role"
                                    : role.length === 1
                                    ? role[0]
                                    : `${role.length} selected`}
                            </span>
                            <ChevronDown
                                className={`absolute right-2 h-4 w-4 text-gray-400 pointer-events-none transition-transform ${
                                    isRoleOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {isRoleOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsRoleOpen(false)}
                                />
                                <div className="absolute left-0 z-50 mt-1 w-64 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
                                    <div className="py-1">
                                        {ROLE_OPTIONS.map((option) => (
                                            <label
                                                key={option}
                                                className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={role.includes(
                                                        option
                                                    )}
                                                    onChange={() => {
                                                        const newSelection =
                                                            role.includes(
                                                                option
                                                            )
                                                                ? role.filter(
                                                                      (item) =>
                                                                          item !==
                                                                          option
                                                                  )
                                                                : [
                                                                      ...role,
                                                                      option,
                                                                  ];
                                                        onRoleChange?.(
                                                            newSelection
                                                        );
                                                    }}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    {option}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Group: Contact Count and Sort */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Contact Count */}
                    <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {contactCount.toLocaleString()} Contacts
                    </div>

                    {/* Sort Selector */}
                    <TenantSortSelector
                        sortBy={sortBy}
                        sortDir={sortDir}
                        onSortChange={(sortBy, sortDir) => {
                            onSortChange?.(sortBy, sortDir);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
