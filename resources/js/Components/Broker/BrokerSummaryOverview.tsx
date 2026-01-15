import {
    Award,
    Building2,
    Globe,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Trophy,
    User,
    Info,
} from "lucide-react";

interface Broker {
    id: number;
    name: string;
    last_name?: string;
    thumbnail_url?: string;
    company: string;
    title: string;
    location?: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    website?: string;
    bio?: string;
    specialty?: string;
    markets?: string;
    property_type_focus?: string;
    awards?: any[];
    activities?: any[];
    transactions?: any[];
    news?: any[];
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
}

interface BrokerSummaryOverviewProps {
    broker: Broker;
}

export default function BrokerSummaryOverview({
    broker,
}: BrokerSummaryOverviewProps) {
    const defaultAwards = [
        { title: "Power Broker", year: "2024", issuer: "CoStar" },
        { title: "Top Producer", year: "2023", issuer: broker.company },
    ];

    const displayAwards =
        broker.awards && broker.awards.length > 0
            ? broker.awards
            : defaultAwards;

    return (
        <div className= "py-6 space-y-10" >
        {/* 1. Bio & Details Section */ }
        < div className = "space-y-6" >
            <div className="prose prose-sm max-w-none text-gray-600" >
                <p>
                {
                    broker.bio ||
                        `${broker.name} serves as ${broker.title} at ${broker.company
                        }. A real estate veteran of more than two decades, ${broker.last_name || "Generic"
                        } and his industry-leading team have been involved in most of the world's largest transactions over the last three decades.`
                }
                </p>
                < p className = "mt-4" >
                    Based in { broker.company }'s headquarters in {broker.city},{" "}
    { broker.last_name || "Generic" } joined the company in
        2023 from Cushman & Wakefield, where he served as
            Chairman of Capital Markets.
                    </p>
                </div>

    {/* Details Grid */ }
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-3 text-sm" >
        {/* Specialty */ }
        < div className = "text-gray-400 font-medium" > Specialty </div>
            < div className = "text-gray-900 font-medium" >
                { broker.specialty || "Investment Broker" }
                </div>

    {/* Markets */ }
    <div className="text-gray-400 font-medium" > Markets </div>
        < div className = "text-gray-900" >
        {
            broker.markets ||
                "Long Island (New York), New York City, Westchester/So Connecticut"
        }
            </div>

    {/* Property Type Focus */ }
    <div className="text-gray-400 font-medium" >
        Property Type Focus
            </div>
            < div className = "text-gray-900" >
            {
                broker.property_type_focus ||
                    "Flex, Hospitality, Industrial, Multifamily, Office, Retail"
            }
                </div>

    {/* Company */ }
    <div className="text-gray-400 font-medium" > Company </div>
        < div className = "text-blue-600 font-medium hover:underline cursor-pointer" >
            { broker.company }
            </div>

    {/* Ticker */ }
    <div className="text-gray-400 font-medium" > Ticker </div>
        < div className = "text-blue-600 font-medium hover:underline cursor-pointer" >
            NMRK(NAS)
            </div>
            </div>
            </div>

    {/* 2. Awards & Qualifications */ }
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12" >
        {/* Awards */ }
        < div >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" >
            Awards < Info className = "h-4 w-4 text-gray-400" />
                </h3>
                < ul className = "space-y-2 mb-4" >
                {
                    displayAwards.map((award, index) => (
                        <li key= { index } className = "text-sm text-gray-900" >
                        { award.year } { award.title } - { award.issuer }
                    </li>
                    ))
                }
                    < li className = "text-sm text-gray-900" >
                        Q3 2025 Power Broker - Quarterly Sales
                            </li>
                            < li className = "text-sm text-gray-900" >
                                Q2 2025 Power Broker - Quarterly Sales
                                    </li>
                                    < li className = "text-sm text-gray-900" >
                                        Q1 2025 Power Broker - Quarterly Sales
                                            </li>
                                            < li className = "text-sm text-gray-900" >
                                                Q4 2024 Power Broker - Quarterly Sales
                                                    </li>
                                                    </ul>
                                                    < button className = "text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors" >
                                                        All Awards
                                                            </button>
                                                            </div>

    {/* Qualifications */ }
    <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4" >
            Qualifications
            </h3>
            < div className = "text-sm text-gray-900" >
                <p>
                { broker.last_name || "The broker" } earned an
                            undergraduate degree from the University of Vermont.
                        </p>
        </div>
        </div>
        </div>

    {/* 3. Activities */ }
    <div>
        <h3 className="text-lg font-bold text-gray-900 mb-6" >
            Activities
            </h3>

            < div className = "grid grid-cols-1 md:grid-cols-2 gap-12" >
                {/* Current Stats */ }
                < div >
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide" >
                    Current
                    </h4>
                    < div className = "space-y-3" >
                        <div className="flex justify-between text-sm" >
                            <span className="text-gray-500" >
                                Lease Listings Portfolio Size
                                    </span>
                                    < span className = "text-gray-900 font-medium" >
                                        -
                                        </span>
                                        </div>
                                        < div className = "flex justify-between text-sm" >
                                            <span className="text-gray-500" >
                                                Lease Listings Available
                                                    </span>
                                                    < span className = "text-gray-900 font-medium" >
                                                        -
                                                        </span>
                                                        </div>
                                                        < div className = "flex justify-between text-sm" >
                                                            <span className="text-gray-500" >
                                                                Sale Listings
                                                                    </span>
                                                                    < span className = "text-gray-900 font-medium" >
                                                                        -
                                                                        </span>
                                                                        </div>
                                                                        </div>
                                                                        </div>

    {/* Past 3 Years Stats */ }
    <div>
        <div className="flex items-center gap-2 mb-4" >
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide" >
                Past
                </h4>
                < select className = "text-sm border-none bg-transparent font-bold text-gray-900 p-0 focus:ring-0 cursor-pointer" >
                    <option>3 Years </option>
                        < option > 5 Years </option>
                            < option > All Time </option>
                                </select>
                                </div>
                                < div className = "space-y-3" >
                                    <div className="flex justify-between text-sm" >
                                        <span className="text-gray-500" >
                                            Lease Transactions
                                                </span>
                                                < span className = "text-gray-900 font-medium" >
                                                    -
                                                    </span>
                                                    </div>
                                                    < div className = "flex justify-between text-sm" >
                                                        <span className="text-gray-500" >
                                                            Sale Transactions
                                                                </span>
                                                                < span className = "text-gray-900 font-medium" >
                                                                    63 Transactions • 38,030, 321 SF
                                                                        </span>
                                                                        </div>
                                                                        < div className = "flex justify-between text-sm" >
                                                                            <span className="text-gray-500" >
                                                                                Sales Transactions Volume
                                                                                    </span>
                                                                                    < span className = "text-gray-900 font-medium" >
                                                                                        $12, 679, 646, 843
                                                                                        </span>
                                                                                        </div>
                                                                                        </div>
                                                                                        </div>
                                                                                        </div>
                                                                                        </div>

    {/* 4. Map Placeholder */ }
    <div>
        <div className="flex items-center justify-end mb-2" >
            <select className="text-sm border border-gray-300 rounded shadow-sm py-1 pl-2 pr-8 text-gray-600 bg-white" >
                <option>Sale Transactions - 3 Years </option>
                    </select>
                    </div>
                    < div className = "bg-blue-50 rounded-lg h-64 flex items-center justify-center border border-blue-100 overflow-hidden relative" >
                        {/* Mock Map Background */ }
                        < div className = "absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=10&size=600x300&style=feature:all|element:labels|visibility:off')] opacity-20 bg-cover bg-center" > </div>

                            < div className = "text-center text-gray-500 relative z-10" >
                                <MapPin className="h-10 w-10 mx-auto mb-2 opacity-50 text-blue-500" />
                                    <span className="font-medium text-blue-900" >
                                        Map View Unavailable
                                            </span>
                                            < p className = "text-xs mt-1 text-blue-800" >
                                                Interactive map integration pending
                                                    </p>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
    );
}
