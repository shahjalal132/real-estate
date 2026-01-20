import AppLayout from "../../Layouts/AppLayout";
import CostSegregationCalculator from "../../../Components/Tools/CostSegregationCalculator";
import { usePage } from "@inertiajs/react";

interface PageProps {
    initialPropertyValue?: number;
    propertyType?: "residential" | "commercial";
}

export default function CostSeg() {
    const { props } = usePage<PageProps>();
    const { initialPropertyValue, propertyType } = props;

    return (
        <AppLayout title="Cost Segregation Calculator">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CostSegregationCalculator
                    initialPropertyValue={initialPropertyValue}
                    propertyType={propertyType}
                />
            </div>
        </AppLayout>
    );
}

