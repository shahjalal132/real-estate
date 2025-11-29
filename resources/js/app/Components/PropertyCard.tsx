import {
    Bath,
    Bed,
    Camera,
    Heart,
    Home as HomeIcon,
    MessageCircle,
    Phone,
    Star,
} from "lucide-react";

export interface PropertyCardProps {
    title: string;
    category?: string;
    isFeatured?: boolean;
    price: string;
    priceUnit?: string;
    description: string;
    beds?: number;
    baths?: number;
    area?: string;
    agentName: string;
    photosCount?: number;
    image: string;
    location: string;
    startingBid?: string;
}

export default function PropertyCard({
    title,
    category = "Residential",
    isFeatured = true,
    price,
    priceUnit = "/Sqft",
    description,
    beds = 0,
    baths = 0,
    area,
    agentName,
    photosCount = 0,
    image,
    location,
}: PropertyCardProps) {
    return (
        <article className="relative w-full">
            <a className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <div className="rounded-2xl bg-white p-4 shadow-lg">
                    <div className="relative flex h-52 justify-center overflow-hidden rounded-xl">
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute bottom-3 left-5 flex items-center gap-2 text-white">
                            <Camera className="h-5 w-5" />
                            <p className="text-sm font-medium">
                                {photosCount.toString().padStart(2, "0")}
                            </p>
                        </div>

                        <button
                            type="button"
                            aria-label="Save property"
                            className="absolute bottom-3 right-5 flex items-center text-white"
                        >
                            <Heart className="h-6 w-6" />
                        </button>

                        <span className="absolute right-4 top-4 inline-flex select-none rounded-md bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
                            {category}
                        </span>
                        {isFeatured && (
                            <span className="absolute left-4 top-4 inline-flex select-none items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-white">
                                <Star className="h-4 w-4 fill-current text-yellow-300" />
                                Featured
                            </span>
                        )}
                    </div>

                    <div className="mt-5 space-y-4 text-gray-800">
                        <div>
                            <p className="text-sm uppercase text-blue-600">
                                {location}
                            </p>
                            <h2
                                className="line-clamp-1 text-xl font-semibold"
                                title={title}
                            >
                                {title}
                            </h2>
                            <p className="mt-2 inline-flex items-baseline gap-1 rounded-xl font-semibold text-blue-900">
                                <span className="text-sm uppercase tracking-wide">
                                    USD
                                </span>
                                <span className="text-2xl">{price}</span>
                                <span className="text-sm text-gray-500">
                                    {priceUnit}
                                </span>
                            </p>
                        </div>

                        <p className="line-clamp-2 text-sm text-gray-600">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-700">
                            <span className="inline-flex items-center gap-2">
                                <Bed className="h-4 w-4 text-blue-900" /> {beds}{" "}
                                Beds
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Bath className="h-4 w-4 text-blue-900" />{" "}
                                {baths} Baths
                            </span>
                            {area && (
                                <span className="inline-flex items-center gap-2">
                                    <HomeIcon className="h-4 w-4 text-blue-900" />{" "}
                                    {area}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 items-center">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                                    <span className="absolute right-0 top-0 inline-block h-3 w-3 rounded-full bg-green-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        {agentName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Listing Agent
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="rounded-md bg-[#0174E1] p-2 text-white transition hover:bg-[#005bb4]"
                                    aria-label="Message agent"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md bg-[#0174E1] p-2 text-white transition hover:bg-[#005bb4]"
                                    aria-label="Call agent"
                                >
                                    <Phone className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </article>
    );
}
