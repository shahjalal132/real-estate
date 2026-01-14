import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Info } from "lucide-react";

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className= "border-b border-gray-200 last:border-0" >
        <button
                onClick={ () => setIsOpen(!isOpen) }
    className = "flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
        <span>{ title } </span>
    {
        isOpen ? (
            <ChevronUp className= "h-4 w-4 text-gray-500" />
                ) : (
            <ChevronDown className= "h-4 w-4 text-gray-500" />
                )
    }
    </button>
    { isOpen && <div className="pb-4" > { children } </div> }
    </div>
    );
}

export default function BrokersFilterSidebar() {
    return (
        <div className= "w-[300px] shrink-0 border-l border-gray-200 bg-gray-50 flex flex-col h-full overflow-hidden" >
        {/* Header */ }
        < div className = "p-4 border-b border-gray-200 bg-white" >
            <h2 className="font-semibold text-gray-900" > Contact </h2>
                </div>

                < div className = "flex-1 overflow-y-auto p-4 space-y-1" >
                    {/* Contact Section */ }
                    < AccordionItem title = "Contact" defaultOpen = { true} >
                        <div className="space-y-4 pt-2" >
                            {/* Contact Name */ }
                            < div >
                            <div className="relative" >
                                <input
                                    type="text"
    placeholder = "Contact Name"
    className = "w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            </div>

    {/* Title */ }
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1" > Title </label>
            < input
    type = "text"
    placeholder = "Title"
    className = "w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        </div>

    {/* Specialty */ }
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1" > Specialty </label>
            < select className = "w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
                <option>Select </option>
                < option > Investment Broker </option>
                    < option > Landlord Representation </option>
                        </select>
                        </div>

    {/* Property Type Focus */ }
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1" > Property Type Focus </label>
            < select className = "w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
                <option>Select </option>
                < option > Office </option>
                < option > Retail </option>
                < option > Industrial </option>
                < option > Multifamily </option>
                </select>
                </div>

    {/* Awards */ }
    <div>
        <div className="flex items-center gap-1 mb-1" >
            <label className="block text-xs font-medium text-gray-500" > Awards </label>
                < Info className = "h-3 w-3 text-gray-400" />
                    </div>
                    < div className = "space-y-2" >
                        <label className="flex items-center gap-2 cursor-pointer" >
                            <input type="checkbox" className = "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-700" > Power Broker / CoStar Award </span>
                                    </label>
                                    < label className = "flex items-center gap-2 cursor-pointer" >
                                        <input type="checkbox" className = "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700" > Impact Award </span>
                                                </label>
                                                </div>
                                                </div>

    {/* Languages */ }
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1" > Languages </label>
            < select className = "w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
                <option>Select </option>
                < option > English </option>
                < option > Spanish </option>
                < option > French </option>
                </select>
                </div>
                </div>
                </AccordionItem>

    {/* Company Section */ }
    <AccordionItem title="Company" defaultOpen = { true} >
        <div className="space-y-4 pt-2" >
            {/* Company Name */ }
            < div >
            <label className="block text-xs font-medium text-gray-500 mb-1" > Company </label>
                < div className = "relative" >
                    <input
                                    type="text"
    placeholder = "Company Name"
    className = "w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            </div>
    {/* Office Location */ }
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1" > Office Location </label>
            < input
    type = "text"
    placeholder = "New York - NY (USA)"
    className = "w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        </div>
        </div>
        </AccordionItem>

        < AccordionItem title = "Lease Transactions" defaultOpen = { false} >
            <div className="pt-2 text-sm text-gray-500" > Filters for Lease Transactions...</div>
                </AccordionItem>
                < AccordionItem title = "Lease Listings" defaultOpen = { false} >
                    <div className="pt-2 text-sm text-gray-500" > Filters for Lease Listings...</div>
                        </AccordionItem>
                        < AccordionItem title = "Sale Transactions" defaultOpen = { false} >
                            <div className="pt-2 text-sm text-gray-500" > Filters for Sale Transactions...</div>
                                </AccordionItem>
                                < AccordionItem title = "Sale Listings" defaultOpen = { false} >
                                    <div className="pt-2 text-sm text-gray-500" > Filters for Sale Listings...</div>
                                        </AccordionItem>
                                        </div>

    {/* Footer */ }
    <div className="bg-white p-4 border-t border-gray-200 shrink-0" >
        <div className="flex items-center justify-between" >
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800" >
                Show Criteria
                    </button>
                    < button className = "px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50" >
                        Clear
                        </button>
                        </div>
                        </div>
                        </div>
    );
}
