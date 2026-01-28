import AppLayout from "../../Layouts/AppLayout";
import MortgageCalculatorComponent from "../../../Components/Tools/MortgageCalculator";
import { usePage } from "@inertiajs/react";

interface PageProps {
    initialHomePrice?: number;
}

export default function MortgageCalculator() {
    const { props } = usePage<PageProps>();
    const { initialHomePrice } = props;

    return (
        <AppLayout title= "Mortgage Calculator" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
            <MortgageCalculatorComponent
                    initialPropertyPrice={ initialHomePrice }
                />
        </div>
        </AppLayout>
    );
}

