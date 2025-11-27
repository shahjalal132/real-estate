import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Property } from '@/types';
import { MapPin, Building, Calendar, ArrowLeft, Phone, Mail, Share2, Printer } from 'lucide-react';

interface Props {
    property: Property;
}

export default function Show({ property }: Props) {
    const [activeImage, setActiveImage] = React.useState(0);
    const images = property.images || [];

    return (
        <div className= "min-h-screen bg-gray-50 pb-12" >
        <Head title={ property.name } />

    {/* Header */ }
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" >
            <Link href={ route('properties.index') } className = "flex items-center text-gray-500 hover:text-gray-900 transition-colors" >
                <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Properties
                        </Link>
                        < div className = "flex items-center gap-4" >
                            <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors" >
                                <Share2 className="w-5 h-5" />
                                    </button>
                                    < button className = "p-2 text-gray-500 hover:text-gray-900 transition-colors" >
                                        <Printer className="w-5 h-5" />
                                            </button>
                                            < button className = "px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20" >
                                                Contact Broker
                                                    </button>
                                                    </div>
                                                    </div>
                                                    </div>

                                                    < div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
                                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" >
                                                            {/* Main Content */ }
                                                            < div className = "lg:col-span-2 space-y-8" >
                                                                {/* Image Gallery */ }
                                                                < div className = "bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100" >
                                                                    <div className="aspect-video bg-gray-100 relative" >
                                                                        {
                                                                            images.length > 0 ? (
                                                                                <img 
                                        src= { images[activeImage].url } 
                                        alt={ property.name }
                                        className="w-full h-full object-cover"
                                                                            />
                                ) : (
                                                                                <div className="w-full h-full flex items-center justify-center text-gray-400" >
                                                                            <Building className="w-16 h-16" />
                                                                            </div>
                                                                            )
}
{
    property.status && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-sm" >
            { property.status }
            </div>
                                )
}
</div>
{
    images.length > 1 && (
        <div className="p-4 flex gap-2 overflow-x-auto" >
        {
            images.map((img, idx) => (
                <button
                                            key= { img.id }
                                            onClick = {() => setActiveImage(idx)}
    className = {`relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-transparent hover:border-gray-300'
        }`
}
                                        >
    <img src={ img.url } alt = "" className = "w-full h-full object-cover" />
        </button>
                                    ))}
</div>
                            )}
</div>

{/* Property Info */ }
<div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100" >
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6" >
        <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" > { property.name } </h1>
            < div className = "flex items-center text-gray-500" >
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    { property.location?.full_address || `${property.location?.city}, ${property.location?.state_name}` }
                    </div>
                    </div>
                    < div className = "text-right" >
                        <div className="text-3xl font-bold text-blue-600" > { property.formatted_price } </div>
{
    property.details?.price_per_acre && (
        <div className="text-sm text-gray-500 mt-1" > { property.details.price_per_acre } / acre </div>
                                    )
}
</div>
    </div>

    < div className = "grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-gray-100 mb-8" >
        <div>
        <div className="text-sm text-gray-500 mb-1" > Property Type </div>
            < div className = "font-semibold text-gray-900" > { property.types.join(', ') } </div>
                </div>
{
    property.details?.lot_size_acres && (
        <div>
        <div className="text-sm text-gray-500 mb-1" > Lot Size </div>
            < div className = "font-semibold text-gray-900" > { property.details.lot_size_acres } AC </div>
                </div>
                                )
}
{
    property.details?.zoning && (
        <div>
        <div className="text-sm text-gray-500 mb-1" > Zoning </div>
            < div className = "font-semibold text-gray-900" > { property.details.zoning } </div>
                </div>
                                )
}
<div>
    <div className="text-sm text-gray-500 mb-1" > Date Listed </div>
        < div className = "font-semibold text-gray-900" >
            { property.activated_on ? new Date(property.activated_on).toLocaleDateString() : 'N/A' }
            </div>
            </div>
            </div>

            < div className = "prose max-w-none" >
                <h3 className="text-xl font-bold text-gray-900 mb-4" > Description </h3>
                    < div className = "text-gray-600 leading-relaxed whitespace-pre-line" >
                        { property.marketing_description || property.description }
                        </div>
                        </div>

{
    property.details?.investment_highlights && (
        <div className="mt-8 pt-8 border-t border-gray-100" >
            <h3 className="text-xl font-bold text-gray-900 mb-4" > Investment Highlights </h3>
                < div className = "text-gray-600 leading-relaxed whitespace-pre-line" >
                    { property.details.investment_highlights }
                    </div>
                    </div>
                            )
}
</div>
    </div>

{/* Sidebar */ }
<div className="space-y-6" >
    {/* Broker Card */ }
{
    property.brokers && property.brokers.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" >
            <h3 className="text-lg font-bold text-gray-900 mb-4" > Contact Broker </h3>
    {
        property.brokers.map((broker) => (
            <div key= { broker.id } className = "mb-6 last:mb-0" >
            <div className="flex items-center gap-4 mb-4" >
        {
            broker.thumbnail_url ? (
                <img src= { broker.thumbnail_url } alt={ broker.full_name } className="w-16 h-16 rounded-full object-cover" />
                                            ) : (
            <div className= "w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl font-bold" >
            { broker.first_name[0] }{ broker.last_name[0] }
        </div>
                                            )
    }
    <div>
        <div className="font-bold text-gray-900" > { broker.full_name } </div>
    {
        broker.brokerage && (
            <div className="text-sm text-gray-500" > { broker.brokerage.name } </div>
                                                )
    }
    </div>
        </div>
        < div className = "space-y-3" >
        {
            broker.phone && (
                <a href={ `tel:${broker.phone}` } className = "flex items-center text-gray-600 hover:text-blue-600 transition-colors" >
                    <Phone className="w-4 h-4 mr-3" />
                        { broker.phone }
                        </a>
                                            )
}
<a href={ `mailto:${broker.email}` } className = "flex items-center text-gray-600 hover:text-blue-600 transition-colors" >
    <Mail className="w-4 h-4 mr-3" />
        { broker.email }
        </a>
        </div>
        </div>
                                ))}
<button className="w-full mt-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors" >
    Send Message
        </button>
        </div>
                        )}

{/* Map Placeholder */ }
<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" >
    <h3 className="text-lg font-bold text-gray-900 mb-4" > Location </h3>
        < div className = "aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 mb-4" >
            <MapPin className="w-12 h-12" />
                </div>
                < div className = "text-gray-900 font-medium" > { property.location?.full_address } </div>
                    < div className = "text-gray-500 text-sm mt-1" >
                        { property.location?.city }, { property.location?.state_name } { property.location?.zip }
</div>
    </div>
    </div>
    </div>
    </div>
    </div>
    );
}
