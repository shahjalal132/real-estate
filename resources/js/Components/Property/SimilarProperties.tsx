import { Heart, MapPin } from "lucide-react";

interface SimilarProperty {
    id: number;
    image: string;
    address: string;
    price: string;
}

const dummyProperties: SimilarProperty[] = [
    {
        id: 1,
        image: "/assets/images/placeholder.png",
        address: "123 Main St, Newark, OH",
        price: "$2,150,000",
    },
    {
        id: 2,
        image: "/assets/images/placeholder.png",
        address: "456 Oak Ave, Newark, OH",
        price: "$310,000",
    },
    {
        id: 3,
        image: "/assets/images/placeholder.png",
        address: "789 Pine Rd, Newark, OH",
        price: "$1,000,000",
    },
    {
        id: 4,
        image: "/assets/images/placeholder.png",
        address: "321 Elm St, Newark, OH",
        price: "$2,500,000",
    },
];

export default function SimilarProperties() {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dummyProperties.map((property) => (
                    <div
                        key={property.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="relative h-40 bg-gray-100">
                            <img
                                src={property.image}
                                alt={property.address}
                                className="w-full h-full object-cover"
                            />
                            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                                <Heart className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="absolute bottom-2 left-2 p-1.5 bg-white rounded shadow-md hover:bg-gray-50">
                                <MapPin className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <div className="p-3">
                            <div className="text-sm font-medium text-gray-900 mb-1">
                                {property.address}
                            </div>
                            <div className="text-lg font-bold text-[#0066CC]">
                                {property.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
