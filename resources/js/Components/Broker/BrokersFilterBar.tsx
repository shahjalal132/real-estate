import {
    Search,
    MapPin,
    ArrowUpDown,
    Download,
    List,
    LayoutGrid,
    ChevronDown,
    Save,
    X,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface BrokersFilterBarProps {
    contactName?: string;
    onContactNameChange?: (value: string) => void;
    companyName?: string;
    onCompanyNameChange?: (value: string) => void;
    specialty?: string;
    onSpecialtyChange?: (value: string) => void;
    location?: string;
    onLocationChange?: (value: string) => void;
    onSearch?: () => void;
    onExportClick?: () => void;
    viewMode: "list" | "gallery";
    onViewModeChange: (mode: "list" | "gallery") => void;
}

export default function BrokersFilterBar({
    contactName = "",
    onContactNameChange,
    companyName = "",
    onCompanyNameChange,
    specialty = "",
    onSpecialtyChange,
    location = "",
    onLocationChange,
    onSearch,
    onExportClick,
    viewMode,
    onViewModeChange,
}: BrokersFilterBarProps) {
    const [localContactName, setLocalContactName] = useState(contactName);
    const [localCompanyName, setLocalCompanyName] = useState(companyName);
    const [localLocation, setLocalLocation] = useState(location);
    const [localSpecialty, setLocalSpecialty] = useState(specialty);

    useEffect(() => {
        setLocalContactName(contactName);
    }, [contactName]);
    useEffect(() => {
        setLocalCompanyName(companyName);
    }, [companyName]);
    useEffect(() => {
        setLocalLocation(location);
    }, [location]);
    useEffect(() => {
        setLocalSpecialty(specialty);
    }, [specialty]);

    // Simple debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onContactNameChange && localContactName !== contactName)
                onContactNameChange(localContactName);
        }, 500);
        return () => clearTimeout(timer);
    }, [localContactName, contactName, onContactNameChange]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onCompanyNameChange && localCompanyName !== companyName)
                onCompanyNameChange(localCompanyName);
        }, 500);
        return () => clearTimeout(timer);
    }, [localCompanyName, companyName, onCompanyNameChange]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onLocationChange && localLocation !== location)
                onLocationChange(localLocation);
        }, 500);
        return () => clearTimeout(timer);
    }, [localLocation, location, onLocationChange]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch?.();
        }
    };

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-4">
                    {/* Left Side - Specific Inputs */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Contact Name */}
                        <div className="relative min-w-[200px] max-w-24 flex-1">
                            <input
                                type="text"
                                value={localContactName}
                                onChange={(e) =>
                                    setLocalContactName(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Contact Name"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Company Name */}
                        <div className="relative min-w-[200px] max-w-24 flex-1">
                            <input
                                type="text"
                                value={localCompanyName}
                                onChange={(e) =>
                                    setLocalCompanyName(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Company Name"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Specialty Dropdown */}
                        <div className="relative min-w-[200px] max-w-24  flex-1">
                            <select
                                value={localSpecialty}
                                onChange={(e) => {
                                    setLocalSpecialty(e.target.value);
                                    onSpecialtyChange?.(e.target.value);
                                }}
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                            >
                                <option value=""> Specialty </option>
                                <option value="Investment Broker">
                                    {" "}
                                    Investment Broker{" "}
                                </option>
                                <option value="Landlord Representation">
                                    {" "}
                                    Landlord Representation{" "}
                                </option>
                                <option value="Tenant Representation">
                                    {" "}
                                    Tenant Representation{" "}
                                </option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Location */}
                        <div className="relative min-w-[200px] max-w-32  flex-1">
                            <input
                                type="text"
                                value={localLocation}
                                onChange={(e) =>
                                    setLocalLocation(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Location"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {localLocation ? (
                                <button
                                    onClick={() => setLocalLocation("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            ) : null}
                        </div>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Sort Dropdown */}
                        <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase shadow-sm">
                            <span>Sort </span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Save Dropdown */}
                        <div className="relative">
                            <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase shadow-sm">
                                <span>Save </span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>

                        {/* Export Button */}
                        <button
                            onClick={onExportClick}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase shadow-sm"
                        >
                            <span>Export </span>
                        </button>

                        {/* Divider */}
                        <div className="h-8 w-px bg-gray-300 mx-2"> </div>

                        {/* View Switcher */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => onViewModeChange("list")}
                                className={`flex flex-col items-center justify-center px-2 py-1 rounded-md transition-colors ${
                                    viewMode === "list"
                                        ? "text-blue-600"
                                        : "text-gray-400 hover:text-gray-600"
                                }`}
                            >
                                <List className="h-5 w-5" />
                                <span className="text-[10px] font-bold uppercase leading-none mt-0.5">
                                    {" "}
                                    List{" "}
                                </span>
                            </button>
                            <button
                                onClick={() => onViewModeChange("gallery")}
                                className={`flex flex-col items-center justify-center px-2 py-1 rounded-md transition-colors ${
                                    viewMode === "gallery"
                                        ? "text-blue-600"
                                        : "text-gray-400 hover:text-gray-600"
                                }`}
                            >
                                <LayoutGrid className="h-5 w-5" />
                                <span className="text-[10px] font-bold uppercase leading-none mt-0.5">
                                    {" "}
                                    Gallery{" "}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
