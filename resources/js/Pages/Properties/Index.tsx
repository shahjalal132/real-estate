import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PaginatedData, Property } from '@/types';
import PropertyCard from '@/Components/PropertyCard';
import FilterSidebar from '@/Components/FilterSidebar';
import { LayoutGrid, List } from 'lucide-react';

interface Props {
    properties: PaginatedData<Property>;
    filters: any;
}

export default function Index({ properties, filters }: Props) {
    return (
        <div className= "min-h-screen bg-gray-50" >
        <Head title="Commercial Properties" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
                <div className="flex flex-col md:flex-row gap-8" >
                    {/* Sidebar */ }
                    < div className = "w-full md:w-64 flex-shrink-0" >
                        <FilterSidebar filters={ filters } />
                            </div>

    {/* Main Content */ }
    <div className="flex-1" >
        <div className="flex items-center justify-between mb-6" >
            <h1 className="text-2xl font-bold text-gray-900" >
                Properties
                < span className = "ml-2 text-sm font-normal text-gray-500" >
                    ({ properties.total } results)
    </span>
        </h1>

        < div className = "flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200" >
            <button className="p-2 text-blue-600 bg-blue-50 rounded-md" >
                <LayoutGrid className="w-5 h-5" />
                    </button>
                    < button className = "p-2 text-gray-400 hover:text-gray-600" >
                        <List className="w-5 h-5" />
                            </button>
                            </div>
                            </div>

    {
        properties.data.length > 0 ? (
            <div className= "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
            {
                properties.data.map((property) => (
                    <PropertyCard key= { property.id } property = { property } />
                                ))
            }
            </div>
                        ) : (
            <div className= "bg-white rounded-xl p-12 text-center border border-gray-100" >
            <div className="text-gray-400 mb-2" > No properties found </div>
                < p className = "text-gray-500 text-sm" > Try adjusting your filters or search terms </p>
                    </div>
                        )
    }

    {/* Pagination */ }
    {
        properties.links.length > 3 && (
            <div className="mt-8 flex justify-center" >
                <div className="flex flex-wrap gap-1" >
                {
                    properties.links.map((link, key) => (
                        link.url ? (
                            <Link
                                                key= { key }
                                                href = { link.url }
                                                className = {`px-4 py-2 text-sm font-medium rounded-md transition-colors ${link.active
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
        dangerouslySetInnerHTML = {{ __html: link.label }
    }
                                            />
                                        ) : (
        <span
                                                key= { key }
    className = "px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-md border border-gray-200 cursor-not-allowed"
    dangerouslySetInnerHTML = {{ __html: link.label }
}
                                            />
                                        )
                                    ))}
</div>
    </div>
                        )}
</div>
    </div>
    </div>
    </div>
    );
}
