import React from 'react';
import { Link } from '@inertiajs/react';
import { Property } from '@/types';
import { MapPin, Building, Ruler } from 'lucide-react';

interface Props {
    property: Property;
}

export default function PropertyCard({ property }: Props) {
    return (
        <Link 
            href= { route('properties.show', property.id) }
    className = "group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
        >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100" >
            {
                property.thumbnail_url ? (
                    <img 
                        src= { property.thumbnail_url } 
                        alt={ property.name }
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400" >
                <Building className="w-12 h-12" />
                </div>
                )
}
<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-sm" >
    { property.status }
    </div>
{
    property.is_in_opportunity_zone && (
        <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm" >
            Opportunity Zone
                </div>
                )
}
</div>

    < div className = "p-5" >
        <div className="flex items-start justify-between gap-4 mb-2" >
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors" >
                { property.name }
                </h3>
                </div>

                < div className = "flex items-center text-gray-500 text-sm mb-4" >
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate" >
                            { property.location?.city }, { property.location?.state_code }
                            </span>
                            </div>

                            < div className = "flex items-center gap-2 mb-4 flex-wrap" >
                            {
                                property.types.slice(0, 2).map((type, index) => (
                                    <span key= { index } className = "px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium" >
                                    { type }
                                    </span>
                                ))
                            }
                                </div>

                                < div className = "pt-4 border-t border-gray-100 flex items-center justify-between" >
                                    <div className="text-xl font-bold text-gray-900" >
                                        { property.formatted_price }
                                        </div>
{/* Placeholder for size if available in details, though not always present in main object */ }
{/* <div className="flex items-center text-gray-500 text-sm">
                        <Ruler className="w-4 h-4 mr-1" />
                        <span>3.5 ac</span>
                    </div> */}
</div>
    </div>
    </Link>
    );
}
