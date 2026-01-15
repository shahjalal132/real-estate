import { Info, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import BrokerSidebarCard from "./BrokerSidebarCard";

interface Broker {
    id: number;
    name: string;
    last_name?: string;
    company: string;
    title: string;
    bio?: string;
    specialty?: string;
    markets?: string;
    property_type_focus?: string;
    awards?: any[];
    city?: string;
    [key: string]: any;
}

interface BrokerSummaryOverviewProps {
    broker: Broker;
}

// Star rating display component
function StarRatingDisplay({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-4 w-4 ${
                        star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                    }`}
                />
            ))}
        </div>
    );
}

// Format currency helper
function formatCurrency(value: number): string {
    return `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`;
}

// Format SF helper
function formatSF(value: number): string {
    return value.toLocaleString();
}

export default function BrokerSummaryOverview({
    broker,
}: BrokerSummaryOverviewProps) {
    const [pastTimeframe, setPastTimeframe] = useState("3 Years");
    const [transactionType, setTransactionType] = useState<"lease" | "sale">(
        "sale"
    );

    // Static transaction data
    const recentTransactions = [
        {
            id: 1,
            image: "https://costar.brightspotcdn.com/dims4/default/4fc56ca/2147483647/strip/true/crop/2100x1401+0+0/resize/2100x1401!/quality/100/?url=http%3A%2F%2Fcostar-brightspot.s3.us-east-1.amazonaws.com%2F9f%2Fac%2F37878b9a4499b1c2ad8b97f135e2%2F100-park-avenue-2-costar.jpg",
            title: "1261-1281 Second Ave • Solow Apartments & Townhomes Recap",
            location: "New York, NY 10065-6230 USA",
            rating: 4,
            propertyType: "Multifamily",
            size: 495432.474,
            saleDate: "Jan 2026",
            salePrice: 435000000,
            pricePerSF: 878.02,
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            title: "61-63 Crosby St",
            location: "New York, NY 10012-4446 USA",
            rating: 3,
            propertyType: "Office",
            size: 32400,
            saleDate: "Jan 2026",
            salePrice: 53000000,
            pricePerSF: 1635.8,
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            title: "100 Park Ave • The Emporis Building",
            location: "New York, NY 10017 USA",
            rating: 4,
            propertyType: "Office",
            size: 907000,
            saleDate: "Jan 2026",
            salePrice: 208000000,
            pricePerSF: 468.58,
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            title: "1633 Broadway • Rithm Capital's M&A of Paramount Group",
            location: "New York, NY 10019 USA",
            rating: 4,
            propertyType: "Office",
            size: 12341281,
            saleDate: "Dec 2025",
            salePrice: 2000000000,
            pricePerSF: 129.65,
        },
    ];

    // Static news data
    const newsArticles = [
        {
            id: 1,
            image: "https://costar.brightspotcdn.com/dims4/default/4fc56ca/2147483647/strip/true/crop/2100x1401+0+0/resize/2100x1401!/quality/100/?url=http%3A%2F%2Fcostar-brightspot.s3.us-east-1.amazonaws.com%2F9f%2Fac%2F37878b9a4499b1c2ad8b97f135e2%2F100-park-avenue-2-costar.jpg",
            date: "January 6, 2026",
            headline:
                "Rockpoint picks New York for its first major post-COVID office investment",
            description:
                "Boston firm buys 49% stake in SL Green's 100 Park Ave.",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            date: "December 3, 2025",
            headline:
                "Miami's newest downtown office skyscraper refinanced in one of South Florida's biggest deals this year",
            description:
                "Latest leases at 830 Brickell represent huge premium to average rent in financial district",
        },
    ];

    // Prepare broker data for sidebar card
    const sidebarBrokerData = {
        id: broker.id,
        name: broker.name,
        thumbnail_url: broker.thumbnail_url,
        company: broker.company,
        title: broker.title,
        phone: broker.phone,
        email: broker.email,
        linkedin: broker.linkedin,
        website: broker.website,
        building_name: broker.building_name,
        address: broker.address,
        city: broker.city,
        state: broker.state,
        postal_code: broker.postal_code,
        country: broker.country,
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 py-6">
            {/* Main Content - Left Side */}
            <div className="flex-1 flex flex-col gap-8 text-gray-900 min-w-0">
                {/* 1. Summary/Biography Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 max-w-[80.625rem] text-base leading-6 text-gray-900">
                        <p>
                            Adam Spies serves as Newmark's Co-Head of U.S.
                            Capital Markets.A real estate veteran of more than
                            two decades, Spies and his industry - leading team
                            have been involved in most of the world's largest,
                            highest - profile and record - setting transactions
                            over the last three decades.Known nationally as top
                            capital markets leaders, Spies and his partner Doug
                            Harmon ranked #1 in capital markets in New York for
                            2022, closing nearly $5.7 billion.
                        </p>
                        <p>
                            Based in Newmark's headquarters in New York, Spies
                            joined the company in 2023 from Cushman & Wakefield,
                            where he served as Chairman of Capital Markets.
                            Prior, Spies and Harmon were the top capital markets
                            team at Eastdil Secured.
                        </p>
                    </div>

                    {/* Key Details Grid */}
                    <div className="grid grid-cols-[max-content_1fr] gap-x-10 gap-y-3 text-base">
                        <span className="text-gray-500 font-medium">
                            Specialty
                        </span>
                        <span className="text-gray-900">
                            {" "}
                            Investment Broker{" "}
                        </span>

                        <span className="text-gray-500 font-medium">
                            Markets
                        </span>
                        <span className="text-gray-900">
                            Long Island(New York), New York City, Westchester /
                            So Connecticut
                        </span>

                        <span className="text-gray-500 font-medium">
                            Property Type Focus
                        </span>
                        <span className="text-gray-900">
                            Flex, Hospitality, Industrial, Multifamily, Office,
                            Retail
                        </span>

                        <span className="text-gray-500 font-medium">
                            Company
                        </span>
                        <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Newmark
                            </a>
                        </div>

                        <span className="text-gray-500 font-medium">
                            Ticker
                        </span>
                        <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            <a
                                href="https://www.google.com/finance?q=NMRK"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                NMRK(NAS)
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2. Awards & Qualifications */}
                <div className="flex flex-col gap-6">
                    <header className="flex items-center gap-2 h-8">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Awards
                        </h2>
                        <button className="text-gray-400 hover:text-gray-600">
                            <Info className="w-5 h-5" />
                        </button>
                    </header>

                    <div className="flex flex-col xl:flex-row gap-6 xl:gap-20">
                        {/* Awards List */}
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="flex flex-col gap-1 text-sm text-gray-900">
                                <span>
                                    2024 Power Broker - Individual Sales
                                </span>
                                <span>
                                    2023 Power Broker - Individual Sales
                                </span>
                                <span>
                                    Q3 2025 Power Broker - Quarterly Sales
                                </span>
                                <span>
                                    Q2 2025 Power Broker - Quarterly Sales
                                </span>
                                <span>
                                    Q1 2025 Power Broker - Quarterly Sales
                                </span>
                                <span>
                                    Q4 2024 Power Broker - Quarterly Sales
                                </span>
                            </div>
                            <div className="mt-2">
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-1 px-3 rounded flex items-center gap-2 transition-colors">
                                    All Awards
                                </button>
                            </div>
                        </div>

                        {/* Qualifications */}
                        <div className="flex flex-col gap-2 flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Qualifications
                            </h3>
                            <p className="text-base text-gray-900">
                                Spies earned an undergraduate degree from the
                                University of Vermont.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Activities */}
                <div className="flex flex-col gap-6">
                    <header className="flex items-center h-8">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Activities
                        </h2>
                    </header>

                    <div className="flex flex-col xl:flex-row gap-6 xl:gap-20">
                        {/* Current Stats */}
                        <div className="flex flex-col gap-3 flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                Current
                            </h3>
                            <div className="grid grid-cols-[max-content_1fr] gap-x-10 gap-y-3 text-base">
                                <span className="text-gray-500 font-medium">
                                    Lease Listings Portfolio Size
                                </span>
                                <span className="text-gray-900 font-medium">
                                    —
                                </span>

                                <span className="text-gray-500 font-medium">
                                    Lease Listings Available
                                </span>
                                <span className="text-gray-900 font-medium">
                                    —
                                </span>

                                <span className="text-gray-500 font-medium">
                                    Sale Listings
                                </span>
                                <span className="text-gray-900 font-medium">
                                    —
                                </span>
                            </div>
                        </div>

                        {/* Past Stats */}
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                    Past
                                </h3>
                                <div className="relative">
                                    <select
                                        value={pastTimeframe}
                                        onChange={(e) =>
                                            setPastTimeframe(e.target.value)
                                        }
                                        className="text-sm font-semibold text-gray-900 bg-transparent border-none focus:ring-0 cursor-pointer pr-8 py-0 appearance-none"
                                    >
                                        <option>3 Years </option>
                                        <option> 5 Years </option>
                                        <option> All Time </option>
                                    </select>
                                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-[max-content_1fr] gap-x-10 gap-y-3 text-base">
                                <span className="text-gray-500 font-medium">
                                    Lease Transactions
                                </span>
                                <span className="text-gray-900 font-medium">
                                    —
                                </span>

                                <span className="text-gray-500 font-medium">
                                    Sale Transactions
                                </span>
                                <span className="text-gray-900 font-medium">
                                    63 Transactions • 38,030, 321 SF
                                </span>

                                <span className="text-gray-500 font-medium">
                                    Sales Transactions Volume
                                </span>
                                <span className="text-gray-900 font-medium">
                                    $12, 679, 646, 843
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Map Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-end">
                        <div className="inline-flex items-center bg-white border border-gray-300 rounded px-2 py-1">
                            <select
                                value={`${
                                    transactionType === "sale"
                                        ? "Sale"
                                        : "Lease"
                                } Transactions - ${pastTimeframe}`}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.includes("Sale")) {
                                        setTransactionType("sale");
                                    } else {
                                        setTransactionType("lease");
                                    }
                                }}
                                className="text-sm text-gray-600 bg-transparent border-none focus:ring-0 cursor-pointer py-0 appearance-none pr-6"
                            >
                                <option>Sale Transactions - 3 Years </option>
                                <option> Lease Transactions - 3 Years </option>
                            </select>
                            <ChevronDown className="absolute right-2 w-4 h-4 text-gray-600 pointer-events-none" />
                        </div>
                    </div>

                    <div className="relative h-[500px] w-full bg-[#E5E3DF] rounded overflow-hidden border border-gray-200">
                        {/* Mock Map Background */}
                        <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-gray-200 to-gray-300">
                            {/* Simple map representation */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-gray-400 text-sm">
                                    Map visualization
                                </div>
                            </div>
                        </div>

                        {/* Mock Markers */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="absolute -top-10 -left-20 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md">
                                    {" "}
                                </div>
                                <div className="absolute -top-12 -left-10 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-md">
                                    {" "}
                                </div>
                                <div className="absolute -top-5 -left-5 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md">
                                    {" "}
                                </div>
                                <div className="absolute top-0 left-0 w-6 h-6 bg-purple-600 rounded-full border-2 border-white shadow-md">
                                    {" "}
                                </div>
                                <div className="absolute top-5 left-10 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md">
                                    {" "}
                                </div>
                                <div className="absolute top-10 left-20 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-md">
                                    {" "}
                                </div>
                            </div>
                        </div>

                        {/* Map Attribution */}
                        <div className="absolute bottom-4 right-4 bg-white p-1 rounded shadow text-xs text-gray-500">
                            Map data ©2026 Google
                        </div>
                    </div>

                    {/* Property Type Legend */}
                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded-sm">
                                {" "}
                            </div>
                            <span className="text-gray-700">
                                Hospitality, Multifamily
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-purple-600 rounded-sm">
                                {" "}
                            </div>
                            <span className="text-gray-700">
                                Industrial, Specialty
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-500 rounded-sm">
                                {" "}
                            </div>
                            <span className="text-gray-700">
                                {" "}
                                Land, Retail{" "}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-sm">
                                {" "}
                            </div>
                            <span className="text-gray-700"> Office </span>
                        </div>
                    </div>
                </div>

                {/* 5. Recent Transactions Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Recent Transactions
                            </h2>
                        </div>
                        <div className="flex gap-0 border border-gray-300 rounded overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setTransactionType("lease")}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${
                                    transactionType === "lease"
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                Lease
                            </button>
                            <button
                                type="button"
                                onClick={() => setTransactionType("sale")}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${
                                    transactionType === "sale"
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                Sale
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img
                                        src={transaction.image}
                                        alt={transaction.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 flex flex-col gap-3">
                                    <a
                                        href="#"
                                        className="text-base font-semibold text-blue-600 hover:text-blue-800 line-clamp-2 transition-colors"
                                    >
                                        {transaction.title}
                                    </a>
                                    <p className="text-sm text-gray-600">
                                        {transaction.location}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <StarRatingDisplay
                                            rating={transaction.rating}
                                        />
                                        <span className="text-sm text-gray-700 font-medium">
                                            {transaction.propertyType}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1.5 text-sm text-gray-700">
                                        <span>
                                            {formatSF(transaction.size)} SF
                                        </span>
                                        <span>{transaction.saleDate}</span>
                                        <span className="font-semibold text-gray-900">
                                            {formatCurrency(
                                                transaction.salePrice
                                            )}{" "}
                                            ($
                                            {transaction.pricePerSF.toLocaleString()}
                                            /SF)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. News Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        News
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {newsArticles.map((article) => (
                            <div
                                key={article.id}
                                className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.headline}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 flex flex-col gap-2">
                                    <p className="text-sm text-gray-500">
                                        {article.date}
                                    </p>
                                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                                        {article.headline}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {article.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Sidebar Card - Right Side */}
            <div className="lg:w-80 shrink-0">
                <BrokerSidebarCard broker={sidebarBrokerData} />
            </div>
        </div>
    );
}
