import React from "react";
import { Head, Link } from "@inertiajs/react";
import { PaginatedData, Property } from "@/types";
import PropertyCard from "@/Components/PropertyCard";
import AppLayout from "@/app/Layouts/AppLayout";

interface Props {
    properties: PaginatedData<Property>;
    filters: any;
}

export default function Commercial({ properties, filters }: Props) {
    return (
        <AppLayout title="Commercial Properties">
            <div className="min-h-screen bg-gray-50">
                <Head title="Commercial Properties" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Commercial Properties
                        </h1>
                        <p className="text-gray-600">
                            {properties.total} commercial properties available
                        </p>
                    </div>

                    {properties.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {properties.data.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {properties.links.length > 3 && (
                                <div className="mt-8 flex justify-center">
                                    <div className="flex flex-wrap gap-1">
                                        {properties.links.map((link, key) =>
                                            link.url ? (
                                                <Link
                                                    key={key}
                                                    href={link.url}
                                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                                        link.active
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    key={key}
                                                    className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-md border border-gray-200 cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                            <div className="text-gray-400 mb-2">
                                No commercial properties found
                            </div>
                            <p className="text-gray-500 text-sm">
                                Try adjusting your filters or check back later
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
