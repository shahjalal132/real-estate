import BrokerCard from "./BrokerCard";

interface DirectoryContact {
    id: number;
    name: string;
    company: string;
    title: string;
    specialty: string;
    property_type_focus: string;
    phone: string;
    email: string;
    linkedin: string;
    building_name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    website: string;
}

interface BrokersGalleryProps {
    brokers: DirectoryContact[];
}

export default function BrokersGallery({ brokers }: BrokersGalleryProps) {
    if (!brokers.length) {
        return (
            <div className= "flex h-full items-center justify-center p-8 text-gray-500" >
            No brokers found.
            </div>
        );
    }

    return (
        <div className= "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 overflow-y-auto h-full" >
        {
            brokers.map((broker) => (
                <BrokerCard key= { broker.id } broker = { broker } />
            ))
        }
        </div>
    );
}
