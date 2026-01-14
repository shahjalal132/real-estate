import React from "react";
import LocationCard from "./LocationCard";

interface LocationsGalleryProps {
    locations: any[];
}

const LocationsGallery: React.FC<LocationsGalleryProps> = ({ locations }) => {
    return (
        <div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-20" >
        {
            locations.map((location) => (
                <LocationCard key= { location.id } location = { location } />
            ))
        }
        </div>
    );
};

export default LocationsGallery;
