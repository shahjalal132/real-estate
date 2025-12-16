import { useState, useEffect, useMemo } from "react";
import BarChart from "./Charts/BarChart";
import { Property } from "../../types";

interface ValuationCalculatorProps {
    property?: Property;
}

// Helper function to format number with commas
const formatNumber = (value: string | number): string => {
    const numStr = typeof value === "number" ? value.toString() : value;
    // Remove all non-digit characters except decimal point
    const cleaned = numStr.replace(/[^\d.]/g, "");
    if (!cleaned) return "";

    // Split into integer and decimal parts
    const parts = cleaned.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Format integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine with decimal part if exists
    return decimalPart !== undefined
        ? `${formattedInteger}.${decimalPart}`
        : formattedInteger;
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
        : "3,725,000";

    const initialDownPayment = property?.asking_price
        ? formatNumber(
              (parseFloat(property.asking_price.toString()) * 0.2).toString()
          )
        : "745,000";

    const [purchasePrice, setPurchasePrice] = useState(initialPrice);
    const [downPayment, setDownPayment] = useState(initialDownPayment);
    const [interestRate, setInterestRate] = useState("5.5");
    const [loanTerm, setLoanTerm] = useState("30");
    const [loanToValue, setLoanToValue] = useState(80);
    const [isLtvControlled, setIsLtvControlled] = useState(false);

    // Parse numeric values
    const purchasePriceNum = parseFormattedNumber(purchasePrice);
    const downPaymentNum = parseFormattedNumber(downPayment);
    const interestRateNum = parseFloat(interestRate) || 0;
    const loanTermNum = parseFloat(loanTerm) || 0;

    // Calculate Loan to Value percentage
    const calculatedLtv = useMemo(() => {
        if (purchasePriceNum > 0) {
            const loanAmt = purchasePriceNum - downPaymentNum;
            return Math.round((loanAmt / purchasePriceNum) * 100);
        }
        return 0;
    }, [purchasePriceNum, downPaymentNum]);

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
        const newDownPayment = purchasePriceNum * (1 - newLtv / 100);
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

    const totalInterest = Math.max(
        0,
        monthlyPayment * numPayments - loanAmount
    );

    const paymentBreakdown = [
        { label: "Principal", value: loanAmount, color: "#0066CC" },
        { label: "Interest", value: totalInterest, color: "#0052A3" },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Valuation Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purchase Price
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            $
                        </span>
                        <input
                            type="text"
                            value={purchasePrice}
                            onChange={(e) =>
                                handlePurchasePriceChange(e.target.value)
                            }
                            placeholder="0"
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                        />
                    </div>
                </div>
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
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interest Rate (%)
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={interestRate}
                            onChange={(e) =>
                                handleInterestRateChange(e.target.value)
                            }
                            placeholder="0.00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                            %
                        </span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Term (years)
                    </label>
                    <input
                        type="text"
                        value={loanTerm}
                        onChange={(e) => handleLoanTermChange(e.target.value)}
                        placeholder="30"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan to Value:{" "}
                        {isLtvControlled ? loanToValue : calculatedLtv}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={isLtvControlled ? loanToValue : calculatedLtv}
                        onChange={(e) =>
                            handleLtvChange(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0066CC]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>100%</span>
                    </div>
                </div>
                <div className="md:col-span-2 border-t pt-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-sm text-gray-600 mb-1">
                                Loan Amount
                            </div>
                            <div className="text-2xl font-bold text-[#0066CC]">
                                $
                                {loanAmount.toLocaleString(undefined, {
                                    maximumFractionDigits: 0,
                                })}
                            </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-sm text-gray-600 mb-1">
                                Monthly Payment
                            </div>
                            <div className="text-2xl font-bold text-[#0066CC]">
                                $
                                {monthlyPayment.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                })}
                            </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-sm text-gray-600 mb-1">
                                Total Interest Paid
                            </div>
                            <div className="text-2xl font-bold text-[#0066CC]">
                                $
                                {totalInterest.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Payment Breakdown Chart */}
                    {loanAmount > 0 && totalInterest > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Payment Breakdown
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <BarChart
                                    data={paymentBreakdown}
                                    height={200}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
