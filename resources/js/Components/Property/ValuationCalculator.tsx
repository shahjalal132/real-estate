import { useState, useEffect, useMemo } from "react";
import { Info } from "lucide-react";
import { Property } from "../../types";

interface ValuationCalculatorProps {
    property?: Property;
}

// Helper function to format number with commas (no decimals for currency)
const formatNumber = (value: string | number): string => {
    const numStr = typeof value === "number" ? value.toString() : value;
    // Remove all non-digit characters except decimal point
    const cleaned = numStr.replace(/[^\d.]/g, "");
    if (!cleaned) return "";

    // Round to whole number to avoid floating point errors
    const numValue = parseFloat(cleaned);
    const rounded = Math.round(numValue);

    // Format integer part with commas (no decimals)
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Helper function to parse formatted number string to number
const parseFormattedNumber = (value: string): number => {
    const cleaned = value.replace(/[^\d.]/g, "");
    return parseFloat(cleaned) || 0;
};

export default function ValuationCalculator({
    property,
}: ValuationCalculatorProps) {
    // Initialize with property asking price if available
    const initialPrice = property?.asking_price
        ? formatNumber(property.asking_price.toString())
        : "1,365,000";

    const initialDownPayment = property?.asking_price
        ? formatNumber(
              (parseFloat(property.asking_price.toString()) * 0.12).toString()
          )
        : "163,800";

    // Calculate initial NOI (Net Operating Income) - typically 6-7% of purchase price
    const initialNOI = property?.asking_price
        ? formatNumber(
              (parseFloat(property.asking_price.toString()) * 0.0691).toString()
          )
        : "94,318";

    const [purchasePrice, setPurchasePrice] = useState(initialPrice);
    const [downPayment, setDownPayment] = useState(initialDownPayment);
    const [interestRate, setInterestRate] = useState("6");
    const [netOperatingIncome, setNetOperatingIncome] = useState(initialNOI);
    const [loanTerm, setLoanTerm] = useState("30");
    const [loanToValue, setLoanToValue] = useState(88);
    const [isLtvControlled, setIsLtvControlled] = useState(false);

    // Parse numeric values
    const purchasePriceNum = parseFormattedNumber(purchasePrice);
    const downPaymentNum = parseFormattedNumber(downPayment);
    const interestRateNum = parseFloat(interestRate) || 0;
    const noiNum = parseFormattedNumber(netOperatingIncome);
    const loanTermNum = parseFloat(loanTerm) || 0;

    // Calculate Loan to Value percentage
    const calculatedLtv = useMemo(() => {
        if (purchasePriceNum > 0) {
            const loanAmt = purchasePriceNum - downPaymentNum;
            return Math.round((loanAmt / purchasePriceNum) * 100);
        }
        return 0;
    }, [purchasePriceNum, downPaymentNum]);

    // Calculate Down Payment percentage (100 - LTV)
    const downPaymentPercent = useMemo(() => {
        const ltv = isLtvControlled ? loanToValue : calculatedLtv;
        return 100 - ltv;
    }, [isLtvControlled, loanToValue, calculatedLtv]);

    // Sync LTV slider when down payment or purchase price changes manually
    useEffect(() => {
        if (!isLtvControlled && purchasePriceNum > 0) {
            setLoanToValue(calculatedLtv);
        }
    }, [calculatedLtv, isLtvControlled, purchasePriceNum]);

    // Update down payment when LTV slider changes
    const handleLtvChange = (newLtv: number) => {
        setIsLtvControlled(true);
        setLoanToValue(newLtv);
        const newDownPayment = Math.round(
            purchasePriceNum * (1 - newLtv / 100)
        );
        setDownPayment(formatNumber(newDownPayment.toString()));
    };

    // Handle purchase price change
    const handlePurchasePriceChange = (value: string) => {
        const formatted = formatNumber(value);
        setPurchasePrice(formatted);
        setIsLtvControlled(false);
    };

    // Handle down payment change
    const handleDownPaymentChange = (value: string) => {
        const formatted = formatNumber(value);
        setDownPayment(formatted);
        setIsLtvControlled(false);
    };

    // Handle interest rate change (allow decimals)
    const handleInterestRateChange = (value: string) => {
        const cleaned = value.replace(/[^\d.]/g, "");
        // Allow only one decimal point
        const parts = cleaned.split(".");
        if (parts.length > 2) return;
        setInterestRate(cleaned);
    };

    // Handle NOI change
    const handleNOIChange = (value: string) => {
        const formatted = formatNumber(value);
        setNetOperatingIncome(formatted);
    };

    // Handle loan term change (only integers)
    const handleLoanTermChange = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        setLoanTerm(cleaned);
    };

    // Calculations
    const loanAmount = Math.max(0, purchasePriceNum - downPaymentNum);
    const monthlyRate = interestRateNum / 100 / 12;
    const numPayments = loanTermNum * 12;

    const monthlyPayment =
        loanAmount > 0 && monthlyRate > 0 && numPayments > 0
            ? (loanAmount *
                  (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
              (Math.pow(1 + monthlyRate, numPayments) - 1)
            : 0;

    // Round to avoid floating point precision issues
    const annualDebtService = Math.round(monthlyPayment * 12 * 100) / 100;
    const annualCashFlow = Math.round((noiNum - annualDebtService) * 100) / 100;
    const monthlyCashFlow = Math.round((annualCashFlow / 12) * 100) / 100;

    // Valuation Metrics - round to 2 decimal places
    const dscr =
        annualDebtService > 0
            ? Math.round((noiNum / annualDebtService) * 100) / 100
            : 0;
    const capRate =
        purchasePriceNum > 0
            ? Math.round((noiNum / purchasePriceNum) * 10000) / 100
            : 0;
    const cashOnCash =
        downPaymentNum > 0 && annualCashFlow > 0
            ? Math.round((annualCashFlow / downPaymentNum) * 10000) / 100
            : 0;

    // Info icon component
    const InfoIcon = ({ tooltip }: { tooltip: string }) => (
        <div className="group relative inline-flex items-center overflow-visible">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 overflow-visible">
                {tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8 overflow-x-hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Valuation Calculator
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Column - Input Fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Purchase Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Purchase Price{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={purchasePrice}
                                    onChange={(e) =>
                                        handlePurchasePriceChange(
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                            </div>
                        </div>

                        {/* Down Payment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Down Payment
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={downPayment}
                                    onChange={(e) =>
                                        handleDownPaymentChange(e.target.value)
                                    }
                                    placeholder="0"
                                    className="w-full pl-8 pr-16 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 font-medium">
                                    {downPaymentPercent}%
                                </span>
                            </div>
                            {/* LTV Slider */}
                            <div className="mt-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={
                                        isLtvControlled
                                            ? loanToValue
                                            : calculatedLtv
                                    }
                                    onChange={(e) =>
                                        handleLtvChange(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0066CC]"
                                />
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Interest Rate{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={interestRate}
                                    onChange={(e) =>
                                        handleInterestRateChange(e.target.value)
                                    }
                                    placeholder="0.00"
                                    className="w-full px-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    %
                                </span>
                            </div>
                        </div>

                        {/* Net Operating Income */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Net Operating Income{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={netOperatingIncome}
                                    onChange={(e) =>
                                        handleNOIChange(e.target.value)
                                    }
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                            </div>
                        </div>

                        {/* Term */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Term (years){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={loanTerm}
                                onChange={(e) =>
                                    handleLoanTermChange(e.target.value)
                                }
                                placeholder="30"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Calculated Summaries */}
                <div className="space-y-4 lg:sticky lg:top-4">
                    {/* Loan Amount */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-gray-600">
                                Loan Amount
                            </div>
                            <InfoIcon tooltip="Total loan amount after down payment" />
                        </div>
                        <div className="text-2xl font-bold text-[#0066CC]">
                            $
                            {Math.round(loanAmount).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                            })}
                        </div>
                    </div>

                    {/* Annual Debt Service */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-gray-600">
                                Annual Debt Service
                            </div>
                            <InfoIcon tooltip="Total annual loan payments including principal and interest" />
                        </div>
                        <div className="text-2xl font-bold text-[#0066CC]">
                            $
                            {Math.round(annualDebtService).toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 0,
                                }
                            )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                            $
                            {Math.round(monthlyPayment).toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 0,
                                }
                            )}
                            /mo
                        </div>
                    </div>

                    {/* Annual Cash Flow */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-gray-600">
                                Annual Cash Flow
                            </div>
                            <InfoIcon tooltip="Net Operating Income minus Annual Debt Service" />
                        </div>
                        <div className="text-2xl font-bold text-[#0066CC]">
                            $
                            {Math.round(annualCashFlow).toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 0,
                                }
                            )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                            $
                            {Math.round(monthlyCashFlow).toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 0,
                                }
                            )}
                            /mo
                        </div>
                    </div>
                </div>
            </div>

            {/* Valuation Metrics Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Valuation Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* DSCR */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {dscr.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                })}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                DSCR
                            </div>
                        </div>
                        <InfoIcon tooltip="Debt Service Coverage Ratio: NOI divided by Annual Debt Service. Higher is better." />
                    </div>

                    {/* Cap Rate */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {capRate.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                })}
                                %
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Cap Rate
                            </div>
                        </div>
                        <InfoIcon tooltip="Capitalization Rate: NOI divided by Purchase Price, expressed as a percentage" />
                    </div>

                    {/* Cash on Cash */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {cashOnCash.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                })}
                                %
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Cash on Cash
                            </div>
                        </div>
                        <InfoIcon tooltip="Cash on Cash Return: Annual Cash Flow divided by Down Payment, expressed as a percentage" />
                    </div>
                </div>
            </div>
        </div>
    );
}
