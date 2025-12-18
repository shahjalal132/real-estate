import SectionHeading from "../SectionHeading";
import PropertySort from "../PropertySort";
import { Property } from "../../types";

interface PropertyResultsHeaderProps {
    title: string;
    resultsCount: number;
    properties: Property[];
    section: string | null;
    onSortChange: (sortedProperties: Property[]) => void;
}

export default function PropertyResultsHeader({
    title,
    resultsCount,
    properties,
    section,
    onSortChange,
}: PropertyResultsHeaderProps) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
                <SectionHeading>{title}</SectionHeading>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-sm text-gray-600">
                    <strong>Results: </strong>
                    <span className="font-semibold">{resultsCount}</span>{" "}
                    results
                </div>

                <PropertySort
                    properties={properties}
                    section={section}
                    onSortChange={onSortChange}
                />
            </div>
        </div>
    );
}
