import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Info, Star } from "lucide-react";
import PropertyTypeDropdown from "../Owner/PropertyTypeDropdown";
import SpaceUseSelector from "../Tenant/SpaceUseSelector";

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function AccordionItem({
    title,
    children,
    defaultOpen = false,
}: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
                <span>{title}</span>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-500 shrink-0" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
                )}
            </button>
            {isOpen && <div className="pb-4">{children}</div>}
        </div>
    );
}

const LEASE_ROLE_OPTIONS = [
    { value: "", label: "Select" },
    { value: "tenant_representative", label: "Tenant Representative" },
    { value: "landlord_representative", label: "Landlord Representative" },
    { value: "owner", label: "Owner" },
];

const SALE_ROLE_OPTIONS = [
    { value: "", label: "Select" },
    { value: "buyer", label: "Buyer" },
    { value: "seller", label: "Seller" },
    { value: "buyers_broker", label: "Buyer's Broker" },
    { value: "sellers_broker", label: "Seller's Broker" },
];

export default function BrokersFilterSidebar() {
    const [leaseSignDate, setLeaseSignDate] = useState("");
    const [leaseTransactionCount, setLeaseTransactionCount] = useState("");
    const [leaseSizeLeased, setLeaseSizeLeased] = useState("");
    const [leaseSpaceUse, setLeaseSpaceUse] = useState<string[]>([]);
    const [leasePropertyTypes, setLeasePropertyTypes] = useState<string[]>([]);
    const [leaseRating, setLeaseRating] = useState<number | null>(null);
    const [leaseLocation, setLeaseLocation] = useState("");
    const [leaseRole, setLeaseRole] = useState("");

    // Lease Listings filters
    const [listingCount, setListingCount] = useState("");
    const [listingAvailableSize, setListingAvailableSize] = useState("");
    const [listingSpaceUse, setListingSpaceUse] = useState<string[]>([]);
    const [listingPropertyTypes, setListingPropertyTypes] = useState<string[]>([]);
    const [listingRating, setListingRating] = useState<number | null>(null);
    const [listingLocation, setListingLocation] = useState("");

    // Sale Transactions filters
    const [saleSignDate, setSaleSignDate] = useState("");
    const [saleTransactionCount, setSaleTransactionCount] = useState("");
    const [saleVolume, setSaleVolume] = useState("");
    const [salePropertyTypes, setSalePropertyTypes] = useState<string[]>([]);
    const [saleRating, setSaleRating] = useState<number | null>(null);
    const [saleLocation, setSaleLocation] = useState("");
    const [saleRole, setSaleRole] = useState("");

    // Sale Listings filters
    const [saleListingCount, setSaleListingCount] = useState("");
    const [saleListingSize, setSaleListingSize] = useState("");
    const [saleListingPropertyTypes, setSaleListingPropertyTypes] = useState<string[]>([]);
    const [saleListingRating, setSaleListingRating] = useState<number | null>(null);
    const [saleListingLocation, setSaleListingLocation] = useState("");

    const handleClear = () => {
        setLeaseSignDate("");
        setLeaseTransactionCount("");
        setLeaseSizeLeased("");
        setLeaseSpaceUse([]);
        setLeasePropertyTypes([]);
        setLeaseRating(null);
        setLeaseLocation("");
        setLeaseRole("");
        setListingCount("");
        setListingAvailableSize("");
        setListingSpaceUse([]);
        setListingPropertyTypes([]);
        setListingRating(null);
        setListingLocation("");
        setSaleSignDate("");
        setSaleTransactionCount("");
        setSaleVolume("");
        setSalePropertyTypes([]);
        setSaleRating(null);
        setSaleLocation("");
        setSaleRole("");
        setSaleListingCount("");
        setSaleListingSize("");
        setSaleListingPropertyTypes([]);
        setSaleListingRating(null);
        setSaleListingLocation("");
    };

    return (
        <div className="w-[300px] shrink-0 border-l border-gray-200 bg-gray-50 flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {/* Contact Section (includes former Company fields) */}
                <AccordionItem title="Contact" defaultOpen={true}>
                    <div className="space-y-4 pt-2">
                        {/* Contact Name */}
                        <div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Contact Name"
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Specialty */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Specialty</label>
                            <select className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>Select</option>
                                <option>Investment Broker</option>
                                <option>Landlord Representation</option>
                            </select>
                        </div>

                        {/* Property Type Focus */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Property Type Focus</label>
                            <select className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>Select</option>
                                <option>Office</option>
                                <option>Retail</option>
                                <option>Industrial</option>
                                <option>Multifamily</option>
                            </select>
                        </div>

                        {/* Company Name (moved from Company section) */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Company</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Office Location (moved from Company section) */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Office Location</label>
                            <input
                                type="text"
                                placeholder="New York - NY (USA)"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Awards */}
                        <div>
                            <div className="flex items-center gap-1 mb-1">
                                <label className="block text-xs font-medium text-gray-500">Awards</label>
                                <Info className="h-3 w-3 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Power Broker / CoStar Award</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Impact Award</span>
                                </label>
                            </div>
                        </div>

                        {/* Languages */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Languages</label>
                            <select className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>Select</option>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                        </div>
                    </div>
                </AccordionItem>

                {/* Lease Transactions */}
                <AccordionItem title="Lease Transactions" defaultOpen={false}>
                    <div className="space-y-4 pt-2">
                        {/* Sign Date */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Sign Date</label>
                            <input
                                type="date"
                                value={leaseSignDate}
                                onChange={(e) => setLeaseSignDate(e.target.value)}
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Number of Lease Transactions */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Number of Lease Transactions</label>
                            <input
                                type="number"
                                min={0}
                                value={leaseTransactionCount}
                                onChange={(e) => setLeaseTransactionCount(e.target.value)}
                                placeholder="e.g. 5"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Size Leased */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Size Leased</label>
                            <input
                                type="number"
                                min={0}
                                value={leaseSizeLeased}
                                onChange={(e) => setLeaseSizeLeased(e.target.value)}
                                placeholder="SF"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Space multiselect */}
                        <div className="w-full [&>*]:w-full [&_button]:w-full">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Space</label>
                            <SpaceUseSelector
                                label="Space"
                                spaceUse={leaseSpaceUse}
                                onSpaceUseChange={setLeaseSpaceUse}
                            />
                        </div>

                        {/* Property Type multiselect */}
                        <div className="w-full [&>*]:w-full [&_button]:w-full">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label>
                            <PropertyTypeDropdown
                                label="Property Type"
                                selectedTypes={leasePropertyTypes}
                                onChange={setLeasePropertyTypes}
                            />
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Rating</label>
                            <div className="flex items-center gap-1 pt-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() =>
                                            setLeaseRating((prev) => (prev === star ? null : star))
                                        }
                                        className="text-gray-300 hover:text-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded"
                                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                    >
                                        <Star
                                            className={`h-6 w-6 ${
                                                leaseRating !== null && star <= leaseRating
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "fill-none"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Lease Transaction Location */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Lease Transaction Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={leaseLocation}
                                    onChange={(e) => setLeaseLocation(e.target.value)}
                                    placeholder="Search location"
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Lease Transaction Role */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Lease Transaction Role</label>
                            <select
                                value={leaseRole}
                                onChange={(e) => setLeaseRole(e.target.value)}
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                {LEASE_ROLE_OPTIONS.map((opt) => (
                                    <option key={opt.value || "select"} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </AccordionItem>

                <AccordionItem title="Lease Listings" defaultOpen={false}>
                    <div className="space-y-4 pt-2">
                        {/* Number of Lease Listings (Min) */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Number of Lease Listings</label>
                            <input
                                type="number"
                                min={0}
                                value={listingCount}
                                onChange={(e) => setListingCount(e.target.value)}
                                placeholder="Min"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Available Size of Lease Listings (Min SF) */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Available Size of Lease Listings</label>
                            <input
                                type="number"
                                min={0}
                                value={listingAvailableSize}
                                onChange={(e) => setListingAvailableSize(e.target.value)}
                                placeholder="Min SF"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Space Use */}
                        <div className="w-full *:w-full [&_button]:w-full">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Space Use</label>
                            <SpaceUseSelector
                                label="Space Use"
                                spaceUse={listingSpaceUse}
                                onSpaceUseChange={setListingSpaceUse}
                            />
                        </div>

                        {/* Property Type */}
                        <div className="w-full *:w-full [&_button]:w-full">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label>
                            <PropertyTypeDropdown
                                label="Property Type"
                                selectedTypes={listingPropertyTypes}
                                onChange={setListingPropertyTypes}
                            />
                        </div>

                        {/* CoStar Rating */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">CoStar Rating</label>
                            <div className="flex items-center gap-1 pt-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() =>
                                            setListingRating((prev) => (prev === star ? null : star))
                                        }
                                        className="text-gray-300 hover:text-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded"
                                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                    >
                                        <Star
                                            className={`h-6 w-6 ${
                                                listingRating !== null && star <= listingRating
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "fill-none"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Lease Listing Location */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Lease Listing Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={listingLocation}
                                    onChange={(e) => setListingLocation(e.target.value)}
                                    placeholder="Search location"
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem title="Sale Transactions" defaultOpen={false}>
                    <div className="space-y-4 pt-2">
                        {/* Sign Date */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Sign Date</label>
                            <input
                                type="date"
                                value={saleSignDate}
                                onChange={(e) => setSaleSignDate(e.target.value)}
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Number of Sale Transactions */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Number of Sale Transactions</label>
                            <input
                                type="number"
                                min={0}
                                value={saleTransactionCount}
                                onChange={(e) => setSaleTransactionCount(e.target.value)}
                                placeholder="e.g. 5"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Sale Volume */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Sale Volume</label>
                            <input
                                type="number"
                                min={0}
                                value={saleVolume}
                                onChange={(e) => setSaleVolume(e.target.value)}
                                placeholder="Min"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Property Type */}
                        <div className="w-full *:w-full [&_button]:w-full">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label>
                            <PropertyTypeDropdown
                                label="Property Type"
                                selectedTypes={salePropertyTypes}
                                onChange={setSalePropertyTypes}
                            />
                        </div>

                        {/* CoStar Rating */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">CoStar Rating</label>
                            <div className="flex items-center gap-1 pt-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() =>
                                            setSaleRating((prev) => (prev === star ? null : star))
                                        }
                                        className="text-gray-300 hover:text-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded"
                                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                    >
                                        <Star
                                            className={`h-6 w-6 ${
                                                saleRating !== null && star <= saleRating
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "fill-none"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sale Transaction Location */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Sale Transaction Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={saleLocation}
                                    onChange={(e) => setSaleLocation(e.target.value)}
                                    placeholder="Search location"
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Sale Transaction Role */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Sale Transaction Role</label>
                            <select
                                value={saleRole}
                                onChange={(e) => setSaleRole(e.target.value)}
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                {SALE_ROLE_OPTIONS.map((opt) => (
                                    <option key={opt.value || "select"} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem title="Sale Listings" defaultOpen={false}>
                    <div className="space-y-4 pt-2">
                        {/* Number of Sale Listings */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Number of Sale Listings</label>
                            <input
                                type="number"
                                min={0}
                                value={saleListingCount}
                                onChange={(e) => setSaleListingCount(e.target.value)}
                                placeholder="Min"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Size of Sale Listings */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Size of Sale Listings</label>
                            <input
                                type="number"
                                min={0}
                                value={saleListingSize}
                                onChange={(e) => setSaleListingSize(e.target.value)}
                                placeholder="Min SF"
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Property Type */}
                        <div className="w-full *:w-full [&_button]:w-full">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label>
                            <PropertyTypeDropdown
                                label="Property Type"
                                selectedTypes={saleListingPropertyTypes}
                                onChange={setSaleListingPropertyTypes}
                            />
                        </div>

                        {/* CoStar Rating */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">CoStar Rating</label>
                            <div className="flex items-center gap-1 pt-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() =>
                                            setSaleListingRating((prev) => (prev === star ? null : star))
                                        }
                                        className="text-gray-300 hover:text-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded"
                                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                    >
                                        <Star
                                            className={`h-6 w-6 ${
                                                saleListingRating !== null && star <= saleListingRating
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "fill-none"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sale Listing Location */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Sale Listing Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={saleListingLocation}
                                    onChange={(e) => setSaleListingLocation(e.target.value)}
                                    placeholder="Market, City or Postal Code"
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </AccordionItem>
            </div>

            {/* Footer */}
            <div className="bg-white p-4 border-t border-gray-200 shrink-0">
                <div className="flex items-center justify-between">
                    <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        Show Criteria
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}
