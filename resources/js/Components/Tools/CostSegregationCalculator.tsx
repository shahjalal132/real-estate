import { useState, useEffect, useMemo } from "react";
import { Info } from "lucide-react";

interface CostSegregationCalculatorProps {
    initialPropertyValue?: number;
    propertyType?: "residential" | "commercial";
}

// Helper function to format number with commas (no decimals for currency)
const formatNumber = (value: string | number): string => {
    const numStr = typeof value === "number" ? value.toString() : value;
    const cleaned = numStr.replace(/[^\d.]/g, "");
    if (!cleaned) return "";

    const numValue = parseFloat(cleaned);
    const rounded = Math.round(numValue);

    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Helper function to parse formatted number string to number
const parseFormattedNumber = (value: string): number => {
    const cleaned = value.replace(/[^\d.]/g, "");
    return parseFloat(cleaned) || 0;
};

// Helper function to format percentage
const formatPercentage = (value: string | number): string => {
    const numStr = typeof value === "number" ? value.toString() : value;
    const cleaned = numStr.replace(/[^\d.]/g, "");
    if (!cleaned) return "";

    const parts = cleaned.split(".");
    if (parts.length > 2) return parts[0] + "." + parts[1];

    return cleaned;
};

// Helper function to parse percentage string to number
const parsePercentage = (value: string): number => {
    const cleaned = value.replace(/[^\d.]/g, "");
    return parseFloat(cleaned) || 0;
};

export default function CostSegregationCalculator({
    initialPropertyValue,
    propertyType = "commercial",
}: CostSegregationCalculatorProps) {
    // Initialize with default values
    const initialPrice = initialPropertyValue
        ? formatNumber(initialPropertyValue.toString())
        : "1,000,000";

    const [propertyValue, setPropertyValue] = useState(initialPrice);
    const [landValuePercent, setLandValuePercent] = useState("20");
    const [federalTaxRate, setFederalTaxRate] = useState("37");
    const [stateTaxRate, setStateTaxRate] = useState("5");
    const [fiveYearPercent, setFiveYearPercent] = useState("15");
    const [sevenYearPercent, setSevenYearPercent] = useState("5");
    const [fifteenYearPercent, setFifteenYearPercent] = useState("10");
    const [propertyTypeState, setPropertyTypeState] =
        useState<"residential" | "commercial">(propertyType);

    // Parse numeric values
    const propertyValueNum = parseFormattedNumber(propertyValue);
    const landValuePercentNum = parsePercentage(landValuePercent);
    const federalTaxRateNum = parsePercentage(federalTaxRate);
    const stateTaxRateNum = parsePercentage(stateTaxRate);
    const fiveYearPercentNum = parsePercentage(fiveYearPercent);
    const sevenYearPercentNum = parsePercentage(sevenYearPercent);
    const fifteenYearPercentNum = parsePercentage(fifteenYearPercent);

    // Calculate building basis (property value minus land)
    const landValue = useMemo(() => {
        return (propertyValueNum * landValuePercentNum) / 100;
    }, [propertyValueNum, landValuePercentNum]);

    const buildingBasis = useMemo(() => {
        return propertyValueNum - landValue;
    }, [propertyValueNum, landValue]);

    // Calculate allocation amounts
    const fiveYearAmount = useMemo(() => {
        return (buildingBasis * fiveYearPercentNum) / 100;
    }, [buildingBasis, fiveYearPercentNum]);

    const sevenYearAmount = useMemo(() => {
        return (buildingBasis * sevenYearPercentNum) / 100;
    }, [buildingBasis, sevenYearPercentNum]);

    const fifteenYearAmount = useMemo(() => {
        return (buildingBasis * fifteenYearPercentNum) / 100;
    }, [buildingBasis, fifteenYearPercentNum]);

    const remainingBasis = useMemo(() => {
        const allocated =
            fiveYearAmount + sevenYearAmount + fifteenYearAmount;
        return Math.max(0, buildingBasis - allocated);
    }, [buildingBasis, fiveYearAmount, sevenYearAmount, fifteenYearAmount]);

    // Standard depreciation period (27.5 for residential, 39 for commercial)
    const standardDepreciationPeriod =
        propertyTypeState === "residential" ? 27.5 : 39;

    // Calculate standard depreciation (straight-line)
    const standardYearOneDepreciation = useMemo(() => {
        if (buildingBasis <= 0 || standardDepreciationPeriod <= 0) return 0;
        return buildingBasis / standardDepreciationPeriod;
    }, [buildingBasis, standardDepreciationPeriod]);

    // Calculate accelerated depreciation (cost segregation)
    const acceleratedYearOneDepreciation = useMemo(() => {
        let total = 0;

        // 5-year property depreciation (first year with bonus depreciation)
        // Assuming 100% bonus depreciation in year 1 for 5-year property
        if (fiveYearAmount > 0) {
            total += fiveYearAmount; // Full bonus depreciation
        }

        // 7-year property depreciation (first year with bonus depreciation)
        if (sevenYearAmount > 0) {
            total += sevenYearAmount; // Full bonus depreciation
        }

        // 15-year property depreciation (first year)
        if (fifteenYearAmount > 0) {
            total += fifteenYearAmount / 15;
        }

        // Remaining basis depreciated over standard period
        if (remainingBasis > 0) {
            total += remainingBasis / standardDepreciationPeriod;
        }

        return total;
    }, [
        fiveYearAmount,
        sevenYearAmount,
        fifteenYearAmount,
        remainingBasis,
        standardDepreciationPeriod,
    ]);

    // Calculate tax savings
    const combinedTaxRate = federalTaxRateNum + stateTaxRateNum;
    const yearOneTaxSavings = useMemo(() => {
        const additionalDepreciation =
            acceleratedYearOneDepreciation - standardYearOneDepreciation;
        return additionalDepreciation * (combinedTaxRate / 100);
    }, [
        acceleratedYearOneDepreciation,
        standardYearOneDepreciation,
        combinedTaxRate,
    ]);

    // Calculate total tax savings over depreciation period
    // Simplified calculation: Year 1 savings + remaining years at reduced rate
    const totalTaxSavings = useMemo(() => {
        // Year 1 has maximum benefit
        let total = yearOneTaxSavings;

        // Years 2-5: 5-year property continues depreciating
        const fiveYearAnnual = (fiveYearAmount / 5) * (combinedTaxRate / 100);
        total += fiveYearAnnual * 4; // Years 2-5

        // Years 2-7: 7-year property continues depreciating
        const sevenYearAnnual =
            (sevenYearAmount / 7) * (combinedTaxRate / 100);
        total += sevenYearAnnual * 6; // Years 2-7

        // Years 2-15: 15-year property continues depreciating
        const fifteenYearAnnual =
            (fifteenYearAmount / 15) * (combinedTaxRate / 100);
        total += fifteenYearAnnual * 14; // Years 2-15

        // After accelerated periods, standard depreciation continues
        // The benefit decreases as we've already taken accelerated depreciation
        return total;
    }, [
        yearOneTaxSavings,
        fiveYearAmount,
        sevenYearAmount,
        fifteenYearAmount,
        combinedTaxRate,
    ]);

    // Net Present Value calculation (simplified, assuming 5% discount rate)
    const discountRate = 0.05;
    const npv = useMemo(() => {
        // Simplified NPV: Year 1 savings + discounted future savings
        const futureSavings = totalTaxSavings - yearOneTaxSavings;
        const discountedFutureSavings = futureSavings / Math.pow(1 + discountRate, 5);
        return yearOneTaxSavings + discountedFutureSavings;
    }, [yearOneTaxSavings, totalTaxSavings, discountRate]);

    // Handle input changes
    const handlePropertyValueChange = (value: string) => {
        const formatted = formatNumber(value);
        setPropertyValue(formatted);
    };

    const handleLandValuePercentChange = (value: string) => {
        const formatted = formatPercentage(value);
        if (parseFloat(formatted) <= 100) {
            setLandValuePercent(formatted);
        }
    };

    const handleFederalTaxRateChange = (value: string) => {
        const formatted = formatPercentage(value);
        if (parseFloat(formatted) <= 100) {
            setFederalTaxRate(formatted);
        }
    };

    const handleStateTaxRateChange = (value: string) => {
        const formatted = formatPercentage(value);
        if (parseFloat(formatted) <= 100) {
            setStateTaxRate(formatted);
        }
    };

    const handleFiveYearPercentChange = (value: string) => {
        const formatted = formatPercentage(value);
        if (parseFloat(formatted) <= 100) {
            setFiveYearPercent(formatted);
        }
    };

    const handleSevenYearPercentChange = (value: string) => {
        const formatted = formatPercentage(value);
        if (parseFloat(formatted) <= 100) {
            setSevenYearPercent(formatted);
        }
    };

    const handleFifteenYearPercentChange = (value: string) => {
        const formatted = formatPercentage(value);
        if (parseFloat(formatted) <= 100) {
            setFifteenYearPercent(formatted);
        }
    };

    // Info icon component
    const InfoIcon = ({ tooltip }: { tooltip: string }) => (
        <div className="group relative inline-flex items-center overflow-visible">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 overflow-visible max-w-xs">
                {tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
        </div>
    );

    // Calculate allocation percentage total
    const totalAllocationPercent =
        fiveYearPercentNum +
        sevenYearPercentNum +
        fifteenYearPercentNum;
    const allocationWarning =
        totalAllocationPercent > 100
            ? "Total allocation exceeds 100%"
            : totalAllocationPercent < 100
            ? `${(100 - totalAllocationPercent).toFixed(1)}% allocated to ${standardDepreciationPeriod}-year property`
            : null;

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8 overflow-x-hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Cost Segregation Calculator
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Column - Input Fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Property Value */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Purchase Price{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={propertyValue}
                                    onChange={(e) =>
                                        handlePropertyValueChange(e.target.value)
                                    }
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                            </div>
                        </div>

                        {/* Property Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Type{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={propertyTypeState}
                                onChange={(e) =>
                                    setPropertyTypeState(
                                        e.target.value as
                                            | "residential"
                                            | "commercial"
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                            >
                                <option value="residential">
                                    Residential (27.5 years)
                                </option>
                                <option value="commercial">
                                    Commercial (39 years)
                                </option>
                            </select>
                        </div>

                        {/* Land Value Percentage */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Land Value Percentage
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={landValuePercent}
                                    onChange={(e) =>
                                        handleLandValuePercentChange(
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                    className="w-full px-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    %
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Land Value: $
                                {Math.round(landValue).toLocaleString()}
                            </div>
                        </div>

                        {/* Building Basis Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Building Basis
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={formatNumber(
                                        Math.round(buildingBasis).toString()
                                    )}
                                    readOnly
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                                />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Depreciable basis
                            </div>
                        </div>

                        {/* Federal Tax Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Federal Tax Rate{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={federalTaxRate}
                                    onChange={(e) =>
                                        handleFederalTaxRateChange(
                                            e.target.value
                                        )
                                    }
                                    placeholder="37"
                                    className="w-full px-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    %
                                </span>
                            </div>
                        </div>

                        {/* State Tax Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                State Tax Rate
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={stateTaxRate}
                                    onChange={(e) =>
                                        handleStateTaxRateChange(e.target.value)
                                    }
                                    placeholder="5"
                                    className="w-full px-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    %
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Asset Allocation Section */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Asset Allocation
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* 5-Year Property */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    5-Year Property (%)
                                    <InfoIcon tooltip="Personal property like carpeting, appliances, fixtures that qualify for 5-year depreciation" />
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={fiveYearPercent}
                                        onChange={(e) =>
                                            handleFiveYearPercentChange(
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                        className="w-full px-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        %
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    $
                                    {Math.round(
                                        fiveYearAmount
                                    ).toLocaleString()}
                                </div>
                            </div>

                            {/* 7-Year Property */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    7-Year Property (%)
                                    <InfoIcon tooltip="Furniture, fixtures, and equipment that qualify for 7-year depreciation" />
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={sevenYearPercent}
                                        onChange={(e) =>
                                            handleSevenYearPercentChange(
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                        className="w-full px-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        %
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    $
                                    {Math.round(
                                        sevenYearAmount
                                    ).toLocaleString()}
                                </div>
                            </div>

                            {/* 15-Year Property */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    15-Year Property (%)
                                    <InfoIcon tooltip="Land improvements like parking lots, landscaping, sidewalks that qualify for 15-year depreciation" />
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={fifteenYearPercent}
                                        onChange={(e) =>
                                            handleFifteenYearPercentChange(
                                                e.target.value
                                            )
                                        }
                                        placeholder="0"
                                        className="w-full px-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        %
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    $
                                    {Math.round(
                                        fifteenYearAmount
                                    ).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        {allocationWarning && (
                            <div
                                className={`mt-3 text-sm ${
                                    totalAllocationPercent > 100
                                        ? "text-red-600"
                                        : "text-gray-600"
                                }`}
                            >
                                {allocationWarning}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Calculated Summaries */}
                <div className="space-y-4 lg:sticky lg:top-4">
                    {/* Year 1 Tax Savings */}
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-semibold text-gray-700">
                                Year 1 Tax Savings
                            </div>
                            <InfoIcon tooltip="Additional tax savings in the first year from accelerated depreciation" />
                        </div>
                        <div className="text-3xl font-bold text-green-700">
                            $
                            {Math.round(yearOneTaxSavings).toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 0,
                                }
                            )}
                        </div>
                    </div>

                    {/* Standard vs Accelerated Depreciation */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-gray-600">
                                Standard Depreciation (Year 1)
                            </div>
                            <InfoIcon tooltip={`Standard straight-line depreciation over ${standardDepreciationPeriod} years`} />
                        </div>
                        <div className="text-2xl font-bold text-[#0066CC]">
                            $
                            {Math.round(
                                standardYearOneDepreciation
                            ).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                            })}
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-gray-600">
                                Accelerated Depreciation (Year 1)
                            </div>
                            <InfoIcon tooltip="Accelerated depreciation using cost segregation study allocations" />
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                            $
                            {Math.round(
                                acceleratedYearOneDepreciation
                            ).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                            })}
                        </div>
                    </div>

                    {/* Total Tax Savings */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-gray-600">
                                Estimated Total Tax Savings
                            </div>
                            <InfoIcon tooltip="Estimated total tax savings over the depreciation period" />
                        </div>
                        <div className="text-2xl font-bold text-[#0066CC]">
                            $
                            {Math.round(totalTaxSavings).toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 0,
                                }
                            )}
                        </div>
                    </div>

                    {/* NPV */}
                    <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-gray-600">
                                Net Present Value (NPV)
                            </div>
                            <InfoIcon tooltip="Present value of tax savings discounted at 5% annual rate" />
                        </div>
                        <div className="text-2xl font-bold text-indigo-700">
                            $
                            {Math.round(npv).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Depreciation Breakdown Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Depreciation Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* 5-Year */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                            5-Year Property
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                            $
                            {Math.round(fiveYearAmount).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {fiveYearPercentNum.toFixed(1)}% of building
                        </div>
                    </div>

                    {/* 7-Year */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                            7-Year Property
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                            $
                            {Math.round(sevenYearAmount).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {sevenYearPercentNum.toFixed(1)}% of building
                        </div>
                    </div>

                    {/* 15-Year */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                            15-Year Property
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                            $
                            {Math.round(fifteenYearAmount).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {fifteenYearPercentNum.toFixed(1)}% of building
                        </div>
                    </div>

                    {/* Remaining */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                            {standardDepreciationPeriod}-Year Property
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                            $
                            {Math.round(remainingBasis).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {buildingBasis > 0
                                ? (
                                      (remainingBasis / buildingBasis) *
                                      100
                                  ).toFixed(1)
                                : "0"}
                            % of building
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
