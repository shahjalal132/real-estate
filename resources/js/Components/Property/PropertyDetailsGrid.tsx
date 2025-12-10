import { PropertyDetail, Property } from "@/types";

interface PropertyDetailsGridProps {
    details: PropertyDetail | null;
    property: Property;
    isInOpportunityZone?: boolean;
}

export default function PropertyDetailsGrid({
    details,
    property,
}: PropertyDetailsGridProps) {
    // Format date
    const formatDate = (dateString: string | null | undefined): string => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        } catch {
            return "N/A";
        }
    };

    // Calculate days on market
    const daysOnMarket = property.activated_on
        ? Math.floor(
              (new Date().getTime() -
                  new Date(property.activated_on).getTime()) /
                  (1000 * 60 * 60 * 24)
          )
        : 0;

    // Get property type
    const propertyType =
        property.types && property.types.length > 0 ? property.types[0] : "N/A";

    // Get sub type
    const subType =
        property.subtypes && property.subtypes.length > 0
            ? property.subtypes[0]
            : "N/A";

    // Get square footage
    const summaryDetails = details?.summary_details || {};
    const squareFootage =
        summaryDetails["Square Feet"] ||
        summaryDetails["Sqft"] ||
        summaryDetails["Square Footage"] ||
        summaryDetails["building_size"] ||
        summaryDetails["square_footage"] ||
        "N/A";

    const squareFootageDisplay =
        typeof squareFootage === "number"
            ? squareFootage.toLocaleString()
            : squareFootage;

    // Get year built
    const yearBuilt =
        summaryDetails["Year Built"] || summaryDetails["Year"] || "N/A";

    // Get lot size
    const lotSize = details?.lot_size_acres
        ? details.lot_size_acres.toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
          })
        : "N/A";

    // Calculate price per sqft
    const pricePerSqft =
        property.asking_price &&
        squareFootage &&
        typeof squareFootage === "number"
            ? (
                  parseFloat(
                      property.asking_price.toString().replace(/[^0-9.]/g, "")
                  ) / squareFootage
              ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
              })
            : "N/A";

    // Get stories
    const stories =
        summaryDetails["Stories"] ||
        summaryDetails["Story"] ||
        summaryDetails["Number of Stories"] ||
        "N/A";

    // Format asking price
    const askingPrice =
        property.formatted_price ||
        (property.asking_price
            ? `${parseFloat(
                  property.asking_price.toString().replace(/[^0-9.]/g, "")
              ).toLocaleString()}`
            : "N/A");

    // Date listed
    const dateListed = formatDate(property.activated_on || property.created_at);

    // Last updated
    const lastUpdated = formatDate(
        property.external_updated_on || property.updated_at
    );

    // Table rows data
    const leftColumnRows = [
        { label: "Date Listed", value: dateListed },
        { label: "Last Updated", value: lastUpdated },
        { label: "Property Type", value: propertyType },
        { label: "Square Footage", value: squareFootageDisplay },
        { label: "Year Built", value: yearBuilt },
        {
            label: "Lot Size (acres)",
            value: lotSize !== "N/A" ? lotSize : "N/A",
        },
    ];

    const rightColumnRows = [
        { label: "Days On Market", value: `${daysOnMarket} Days` },
        { label: "Asking Price", value: askingPrice },
        { label: "Sub Type", value: subType },
        {
            label: "Price per SqFt",
            value: pricePerSqft !== "N/A" ? `$${pricePerSqft}` : "N/A",
        },
        { label: "Stories", value: stories },
        { label: "", value: "" }, // Empty row to balance
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Details
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                    <tbody>
                        {leftColumnRows.map((row, index) => {
                            const rightRow = rightColumnRows[index];
                            const isEven = index % 2 === 0;

                            return (
                                <tr
                                    key={index}
                                    className={
                                        isEven ? "bg-gray-50" : "bg-white"
                                    }
                                >
                                    {/* Left Column */}
                                    <td className="px-4 py-3 border-r border-gray-200 w-1/2">
                                        <div className="flex justify-between items-center gap-6">
                                            <span className="text-[15px] text-gray-600">
                                                {row.label}
                                            </span>
                                            <span className="text-[15px] font-semibold text-gray-900">
                                                {row.value}
                                            </span>
                                        </div>
                                    </td>
                                    {/* Right Column */}
                                    <td className="px-4 py-3 w-1/2">
                                        {rightRow && rightRow.label && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-[15px] text-gray-600 font-medium">
                                                    {rightRow.label}
                                                </span>
                                                <span className="text-[15px] font-semibold text-gray-900">
                                                    {rightRow.value}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
