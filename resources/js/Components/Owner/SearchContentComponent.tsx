import { RefObject } from "react";
import { Info } from "lucide-react";
import PortfolioFilters from "./Filters/PortfolioFilters";
import SalesTransactionsFilters from "./Filters/SalesTransactionsFilters";
import SalesListingsFilters from "./Filters/SalesListingsFilters";

interface SearchContentComponentProps {
    activeSection:
        | "contacts"
        | "portfolio"
        | "sales-transactions"
        | "sales-listings";
    scrollToSection: (
        section:
            | "contacts"
            | "portfolio"
            | "sales-transactions"
            | "sales-listings"
    ) => void;
    contactsRef: RefObject<HTMLDivElement | null>;
    portfolioRef: RefObject<HTMLDivElement | null>;
    salesTransactionsRef: RefObject<HTMLDivElement | null>;
    salesListingsRef: RefObject<HTMLDivElement | null>;
    scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export default function SearchContentComponent({
    activeSection,
    scrollToSection,
    contactsRef,
    portfolioRef,
    salesTransactionsRef,
    salesListingsRef,
    scrollContainerRef,
}: SearchContentComponentProps) {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Main Content Tabs - Act as section references */}
            <div className="border-b border-gray-200 bg-white px-4 shrink-0">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => scrollToSection("portfolio")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "portfolio"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Portfolio</span>
                        {activeSection === "portfolio" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => scrollToSection("sales-transactions")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "sales-transactions"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">
                            Sales Transactions
                        </span>
                        {activeSection === "sales-transactions" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => scrollToSection("sales-listings")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "sales-listings"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Sales Listings</span>
                        {activeSection === "sales-listings" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                    <button
                        onClick={() => scrollToSection("contacts")}
                        className={`relative px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                            activeSection === "contacts"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                        }`}
                    >
                        <span className="relative z-10">Contacts</span>
                        {activeSection === "contacts" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-pulse" />
                        )}
                    </button>
                </div>
            </div>

            {/* Vertically Scrollable Content */}
            <div
                ref={scrollContainerRef}
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-gray-50"
                style={{ scrollSnapType: "y mandatory" }}
            >
                <div className="flex flex-col gap-4 p-4">
                    {/* Portfolio Section */}
                    <div
                        ref={portfolioRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm p-6"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <PortfolioFilters />
                    </div>

                    {/* Sales Transactions Section */}
                    <div
                        ref={salesTransactionsRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Sales Transactions
                            </h2>
                            <SalesTransactionsFilters />
                        </div>
                    </div>

                    {/* Sales Listings Section */}
                    <div
                        ref={salesListingsRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Sales Listings
                            </h2>
                            <SalesListingsFilters />
                        </div>
                    </div>
                    {/* Contacts Section */}
                    <div
                        ref={contactsRef}
                        className="w-full shrink-0 bg-white rounded-lg border border-gray-200 shadow-sm"
                        style={{ scrollSnapAlign: "start" }}
                    >
                        <div className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                                Contacts
                            </h2>

                            {/* True Owner */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    True Owner
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Owner Name or Ticker"
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <svg
                                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Owner Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Owner Type
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* HQ Location */}
                            <div>
                                <div className="flex items-center gap-1 mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        HQ Location
                                    </label>
                                    <button className="text-blue-500 hover:text-blue-600">
                                        <Info className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="City, State or Country"
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <svg
                                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Is Publicly Traded */}
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Is Publicly Traded
                                    </span>
                                </label>
                            </div>

                            {/* Contacts by Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contacts by Role
                                </label>
                                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
