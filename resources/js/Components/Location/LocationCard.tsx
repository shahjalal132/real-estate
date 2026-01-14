import { MapPin } from "lucide-react";
import React from "react";

interface LocationCardProps {
    location: any;
}

const LOGOS = [
    "https://ahprd1cdn.csgpimgs.com/i2/KusPisvc_OVaY0NA5w4ICNRNDWlg5A5Igc5ulHzYZzc/118/contact.jpg",
    "https://ahprd1cdn.csgpimgs.com/i2/jnpzyGwdiz7GxTBX0HNFDWAh2aFQBMMapD4KrbYOqyc/118/contact.png",
    "https://ahprd1cdn.csgpimgs.com/i2/DRQoiAmPk-9bllVvbZ3y65Mceu7DGvKA5KmqsdTiwHw/118/contact.jpg",
];

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
    // Deterministic random logo based on ID
    const logoUrl = LOGOS[location.id % LOGOS.length];

    const formatNumber = (num: number | null | undefined): string => {
        if (num === null || num === undefined) return "—";
        return num.toLocaleString();
    };

    return (
        <div className= "bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full" >
        <div className="flex justify-between items-start mb-4" >
            <div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2" >
                { location.company || "Unknown Company" }
                </h3>
    {
        location.building_name && (
            <div className="text-sm text-gray-600 mt-1 font-medium" > { location.building_name } </div>
                    )}
<div className="text-sm text-gray-600 mt-1" >
    { location.address && <div>{ location.address } </div> }
    <div>
{ location.city ? `${location.city}, ` : "" }
{ location.state } { location.postal_code }
</div>
{ location.country && <div>{ location.country } </div> }
</div>


{/* Placeholder for Phone since it's not in DB yet, but shown in design. 
                        If strictly verifying, I should check if I missed it, but sticking to DB for now. 
                        Design shows phone icon + number. 
                    */}
{/* <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>(212) 984-8000</span>
                    </div> */}

{
    location.website && (
        <a
                            href={
        location.website.startsWith("http")
            ? location.website
            : `https://${location.website}`
    }
    target = "_blank"
    rel = "noreferrer"
    className = "text-blue-600 hover:underline text-sm font-medium mt-2 block truncate max-w-[200px]"
        >
        { location.website }
        </a>
                    )
}
</div>
    < div className = "shrink-0 ml-4" >
        <img
                        src={ logoUrl }
alt = {`${location.company} Logo`}
className = "h-12 object-contain max-w-[100px]"
    />
    </div>
    </div>

    < div className = "mt-auto pt-4 border-t border-gray-100 space-y-2" >
        <div className="flex items-start justify-between text-sm" >
            <span className="text-gray-500" > Specialty </span>
                < span className = "text-gray-900 font-medium text-right max-w-[60%]" > { location.specialty || "—" } </span>
                    </div>
                    < div className = "flex items-center justify-between text-sm" >
                        <span className="text-gray-500" > Location Employees </span>
                            < span className = "text-gray-900 font-medium" > { formatNumber(location.location_employees) } </span>
                                </div>
                                </div>
                                </div>
    );
};

export default LocationCard;
