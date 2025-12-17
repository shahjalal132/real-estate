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

    // Helper function to check if value exists
    const hasValue = (value: any): boolean => {
        return value !== null && value !== undefined && value !== "";
    };

    // Helper function to format value (only call when value exists)
    const formatValue = (value: any, prefix = "", suffix = ""): string => {
        if (typeof value === "number") {
            return `${prefix}${value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${suffix}`;
        }
        return `${prefix}${value}${suffix}`;
    };

    // Get net rentable sqft
    const netRentableSqft = details?.net_rentable_sqft
        ? details.net_rentable_sqft.toLocaleString()
        : summaryDetails["Net Rentable (SqFt)"] ||
          summaryDetails["Net Rentable Area"] ||
          "N/A";

    // Get units
    const units =
        summaryDetails["Units"] || summaryDetails["Number of Units"] || "N/A";

    // Get buildings
    const buildings =
        summaryDetails["Buildings"] ||
        summaryDetails["Number of Buildings"] ||
        "N/A";

    // Get occupancy
    const occupancy =
        summaryDetails["Occupancy"] ||
        summaryDetails["Occupancy Rate"] ||
        "N/A";

    // Get APN
    const apn = summaryDetails["APN"] || summaryDetails["Parcel ID"] || "N/A";

    // Get broker co-op
    const brokerCoOp =
        summaryDetails["Broker Co-Op"] ||
        summaryDetails["Broker CoOp"] ||
        "N/A";

    // Calculate price per unit
    const pricePerUnit = details?.price_per_unit
        ? `$${details.price_per_unit.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          })}`
        : property.asking_price &&
          units &&
          typeof units === "number" &&
          units > 0
        ? `$${(
              parseFloat(
                  property.asking_price.toString().replace(/[^0-9.]/g, "")
              ) / units
          ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          })}`
        : "N/A";

    // Build rows array - only include fields that have actual data
    const leftColumnRows: Array<{ label: string; value: string }> = [];

    // Always show these core fields if property exists
    if (property.activated_on || property.created_at) {
        leftColumnRows.push({ label: "Date Listed", value: dateListed });
    }
    if (property.activated_on) {
        leftColumnRows.push({
            label: "Days On Market",
            value: `${daysOnMarket} Days`,
        });
    }
    if (property.external_updated_on || property.updated_at) {
        leftColumnRows.push({ label: "Last Updated", value: lastUpdated });
    }
    if (property.asking_price) {
        leftColumnRows.push({ label: "Asking Price", value: askingPrice });
    }
    if (propertyType !== "N/A") {
        leftColumnRows.push({ label: "Property Type", value: propertyType });
    }
    if (subType !== "N/A") {
        leftColumnRows.push({ label: "Sub Type", value: subType });
    }
    if (details && hasValue(details.investment_type)) {
        leftColumnRows.push({
            label: "Investment Type",
            value: formatValue(details.investment_type),
        });
    }
    if (details && hasValue(details.investment_sub_type)) {
        leftColumnRows.push({
            label: "Investment Sub Type",
            value: formatValue(details.investment_sub_type),
        });
    }
    if (details && hasValue(details.class)) {
        leftColumnRows.push({
            label: "Class",
            value: formatValue(details.class),
        });
    }
    if (details && hasValue(details.lease_type)) {
        leftColumnRows.push({
            label: "Lease Type",
            value: formatValue(details.lease_type),
        });
    }
    if (details && hasValue(details.tenancy)) {
        leftColumnRows.push({
            label: "Tenancy",
            value: formatValue(details.tenancy),
        });
    }
    if (details && hasValue(details.lease_expiration)) {
        leftColumnRows.push({
            label: "Lease Expiration",
            value: formatDate(details.lease_expiration),
        });
    }
    if (squareFootageDisplay !== "N/A") {
        leftColumnRows.push({
            label: "Square Footage",
            value: squareFootageDisplay,
        });
    }
    if (netRentableSqft !== "N/A") {
        leftColumnRows.push({
            label: "Net Rentable (SqFt)",
            value: netRentableSqft,
        });
    }
    if (pricePerSqft !== "N/A") {
        leftColumnRows.push({
            label: "Price per SqFt",
            value: `$${pricePerSqft}`,
        });
    }
    if (details && hasValue(details.cap_rate)) {
        leftColumnRows.push({
            label: "Cap Rate",
            value: `${details.cap_rate}%`,
        });
    }
    if (occupancy !== "N/A") {
        leftColumnRows.push({ label: "Occupancy", value: occupancy });
    }
    if (details && hasValue(details.occupancy_date)) {
        leftColumnRows.push({
            label: "Occupancy Date",
            value: formatDate(details.occupancy_date),
        });
    }
    if (
        details &&
        details.pro_forma_noi !== null &&
        details.pro_forma_noi !== undefined
    ) {
        leftColumnRows.push({
            label: "Pro-Forma NOI",
            value: `$${details.pro_forma_noi.toLocaleString()}`,
        });
    }
    if (units !== "N/A") {
        leftColumnRows.push({ label: "Units", value: units });
    }
    if (yearBuilt !== "N/A") {
        leftColumnRows.push({ label: "Year Built", value: yearBuilt });
    }
    if (buildings !== "N/A") {
        leftColumnRows.push({ label: "Buildings", value: buildings });
    }
    if (stories !== "N/A") {
        leftColumnRows.push({ label: "Stories", value: stories });
    }
    if (details && hasValue(details.zoning)) {
        leftColumnRows.push({
            label: "Zoning",
            value: formatValue(details.zoning),
        });
    }
    if (lotSize !== "N/A") {
        leftColumnRows.push({
            label: "Lot Size (acres)",
            value: lotSize,
        });
    }
    if (details && hasValue(details.parking_spaces)) {
        leftColumnRows.push({
            label: "Parking (spaces)",
            value: formatValue(details.parking_spaces),
        });
    }
    if (brokerCoOp !== "N/A") {
        leftColumnRows.push({ label: "Broker Co-Op", value: brokerCoOp });
    }
    if (apn !== "N/A") {
        leftColumnRows.push({ label: "APN", value: apn });
    }
    if (pricePerUnit !== "N/A") {
        leftColumnRows.push({ label: "Price/Unit", value: pricePerUnit });
    }
    if (details?.ground_lease !== null && details?.ground_lease !== undefined) {
        leftColumnRows.push({
            label: "Ground Lease",
            value: details.ground_lease ? "Yes" : "No",
        });
    }
    if (details) {
        if (hasValue(details.ownership)) {
            leftColumnRows.push({
                label: "Ownership",
                value: formatValue(details.ownership),
            });
        }
        if (hasValue(details.ceiling_height)) {
            leftColumnRows.push({
                label: "Ceiling Height",
                value: formatValue(details.ceiling_height),
            });
        }
        if (hasValue(details.sale_condition)) {
            leftColumnRows.push({
                label: "Sale Condition",
                value: formatValue(details.sale_condition),
            });
        }
    }

    // Adjust to show pairs properly - rows already filtered to only include available data
    const rows = [];
    for (let i = 0; i < leftColumnRows.length; i += 2) {
        rows.push({
            left: leftColumnRows[i],
            right: leftColumnRows[i + 1] || { label: "", value: "" },
        });
    }

    return (
        <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
                Details
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full">
                    <tbody>
                        {rows.map((rowPair, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <tr
                                    key={index}
                                    className={
                                        isEven
                                            ? "bg-gray-50/50 hover:bg-gray-50 transition-colors"
                                            : "bg-white hover:bg-gray-50/30 transition-colors"
                                    }
                                >
                                    {/* Left Column - Label */}
                                    <td className="px-4 py-2  border-gray-200 w-1/4">
                                        {rowPair.left.label && (
                                            <span className="text-sm text-gray-600 font-normal">
                                                {rowPair.left.label}
                                            </span>
                                        )}
                                    </td>
                                    {/* Left Column - Value */}
                                    <td className="px-4 py-2 border-r border-gray-200 w-1/4">
                                        {rowPair.left.label && (
                                            <span className="text-sm font-semibold text-gray-900 text-left block">
                                                {rowPair.left.value}
                                            </span>
                                        )}
                                    </td>
                                    {/* Right Column - Label */}
                                    <td className="px-4 py-2  border-gray-200 w-1/4">
                                        {rowPair.right &&
                                            rowPair.right.label && (
                                                <span className="text-sm text-gray-600 font-normal">
                                                    {rowPair.right.label}
                                                </span>
                                            )}
                                    </td>
                                    {/* Right Column - Value */}
                                    <td className="px-4 py-2 w-1/4">
                                        {rowPair.right &&
                                            rowPair.right.label && (
                                                <span className="text-sm font-semibold text-gray-900 text-left block">
                                                    {rowPair.right.value}
                                                </span>
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
