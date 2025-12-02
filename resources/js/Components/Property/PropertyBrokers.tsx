import { Phone, Mail, Star } from "lucide-react";
import { Broker } from "../../../types";

interface PropertyBrokersProps {
    brokers: Broker[];
}

export default function PropertyBrokers({ brokers }: PropertyBrokersProps) {
    if (brokers.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
                Listing Agents
            </h3>
            <div className="space-y-6">
                {brokers.map((broker) => (
                    <div
                        key={broker.id}
                        className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                        <div className="flex items-start gap-4">
                            <div className="relative shrink-0">
                                <img
                                    src={
                                        broker.thumbnail_url ??
                                        "/assets/images/broker.jpeg"
                                    }
                                    alt={broker.full_name}
                                    className="h-16 w-16 rounded-full object-cover ring-4 ring-gray-100"
                                />
                                {broker.is_platinum && (
                                    <Star className="absolute -top-1 -right-1 h-6 w-6 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 text-lg mb-1">
                                    {broker.full_name}
                                </h4>
                                {broker.brokerage && (
                                    <p className="text-sm text-gray-600 mb-3">
                                        {broker.brokerage.name}
                                    </p>
                                )}
                                <div className="flex flex-col gap-2">
                                    {broker.phone && (
                                        <a
                                            href={`tel:${broker.phone}`}
                                            className="flex items-center gap-2 text-sm text-[#0066CC] hover:text-[#0052A3] font-medium transition-colors"
                                        >
                                            <Phone className="h-4 w-4" />
                                            {broker.phone}
                                        </a>
                                    )}
                                    {broker.email && (
                                        <a
                                            href={`mailto:${broker.email}`}
                                            className="flex items-center gap-2 text-sm text-[#0066CC] hover:text-[#0052A3] font-medium transition-colors"
                                        >
                                            <Mail className="h-4 w-4" />
                                            {broker.email}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
