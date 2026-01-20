import { useState, useEffect, useMemo } from "react";
import { Info } from "lucide-react";

interface MortgageCalculatorProps {
    initialHomePrice?: number;
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

export default function MortgageCalculator({
    initialHomePrice,
}: MortgageCalculatorProps) {
    // Initialize with default values
    const initialPrice = initialHomePrice
        ? formatNumber(initialHomePrice.toString())
        : "400,000";

    const initialDownPayment = initialHomePrice
        ? formatNumber(
              (parseFloat(initialHomePrice.toString()) * 0.2).toString()
          )
        : "80,000";

    const [homePrice, setHomePrice] = useState(initialPrice);
    const [downPayment, setDownPayment] = useState(initialDownPayment);
    const [interestRate, setInterestRate] = useState("6.5");
    const [loanTerm, setLoanTerm] = useState("30");
    const [propertyTax, setPropertyTax] = useState("4,800");
    const [homeInsurance, setHomeInsurance] = useState("1,200");
    const [hoaFees, setHoaFees] = useState("0");
    const [loanToValue, setLoanToValue] = useState(80);
    const [isLtvControlled, setIsLtvControlled] = useState(false);

    // Parse numeric values
    const homePriceNum = parseFormattedNumber(homePrice);
    const downPaymentNum = parseFormattedNumber(downPayment);
    const interestRateNum = parseFloat(interestRate) || 0;
    const loanTermNum = parseFloat(loanTerm) || 0;
    const propertyTaxNum = parseFormattedNumber(propertyTax);
    const homeInsuranceNum = parseFormattedNumber(homeInsurance);
    const hoaFeesNum = parseFormattedNumber(hoaFees);

    // Calculate Loan to Value percentage
    const calculatedLtv = useMemo(() => {
        if (homePriceNum > 0) {
            const loanAmt = homePriceNum - downPaymentNum;
            return Math.round((loanAmt / homePriceNum) * 100);
        }
        return 0;
    }, [homePriceNum, downPaymentNum]);

    // Calculate Down Payment percentage (100 - LTV)
    const downPaymentPercent = useMemo(() => {
        const ltv = isLtvControlled ? loanToValue : calculatedLtv;
        return 100 - ltv;
    }, [isLtvControlled, loanToValue, calculatedLtv]);

    // Sync LTV slider when down payment or home price changes manually
    useEffect(() => {
        if (!isLtvControlled && homePriceNum > 0) {
            setLoanToValue(calculatedLtv);
        }
    }, [calculatedLtv, isLtvControlled, homePriceNum]);

    // Update down payment when LTV slider changes
    const handleLtvChange = (newLtv: number) => {
        setIsLtvControlled(true);
        setLoanToValue(newLtv);
        const newDownPayment = Math.round(
            homePriceNum * (1 - newLtv / 100)
        );
        setDownPayment(formatNumber(newDownPayment.toString()));
    };

    // Handle home price change
    const handleHomePriceChange = (value: string) => {
        const formatted = formatNumber(value);
        setHomePrice(formatted);
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

    // Handle property tax change
    const handlePropertyTaxChange = (value: string) => {
        const formatted = formatNumber(value);
        setPropertyTax(formatted);
    };

    // Handle home insurance change
    const handleHomeInsuranceChange = (value: string) => {
        const formatted = formatNumber(value);
        setHomeInsurance(formatted);
    };

    // Handle HOA fees change
    const handleHoaFeesChange = (value: string) => {
        const formatted = formatNumber(value);
        setHoaFees(formatted);
    };

    // Handle loan term change (only integers)
    const handleLoanTermChange = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        setLoanTerm(cleaned);
    };

    // Calculations
    const loanAmount = Math.max(0, homePriceNum - downPaymentNum);
    const monthlyRate = interestRateNum / 100 / 12;
    const numPayments = loanTermNum * 12;

    // Monthly Principal & Interest Payment
    const monthlyPrincipalInterest =
        loanAmount > 0 && monthlyRate > 0 && numPayments > 0
            ? (loanAmount *
                  (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
              (Math.pow(1 + monthlyRate, numPayments) - 1)
            : 0;

    // Monthly costs
    const monthlyPropertyTax = propertyTaxNum / 12;
    const monthlyHomeInsurance = homeInsuranceNum / 12;
    const monthlyHoaFees = hoaFeesNum;

    // PMI calculation (typically 0.5% to 1% of loan amount annually if LTV > 80%)
    const ltv = isLtvControlled ? loanToValue : calculatedLtv;
    const annualPmi = ltv > 80 ? (loanAmount * 0.005) : 0; // 0.5% annual PMI
    const monthlyPmi = annualPmi / 12;

    // Total monthly payment
    const totalMonthlyPayment =
        monthlyPrincipalInterest +
        monthlyPropertyTax +
        monthlyHomeInsurance +
        monthlyPmi +
        monthlyHoaFees;

    // Total payments over life of loan
    const totalPayments = totalMonthlyPayment * numPayments;
    const totalInterest =
        monthlyPrincipalInterest * numPayments - loanAmount;
    const totalCost = totalPayments + downPaymentNum;

    // Round values for display
    const roundedMonthlyPrincipalInterest = Math.round(
        monthlyPrincipalInterest * 100
    ) / 100;
    const roundedMonthlyPropertyTax = Math.round(monthlyPropertyTax * 100) / 100;
    const roundedMonthlyHomeInsurance =
        Math.round(monthlyHomeInsurance * 100) / 100;
    const roundedMonthlyPmi = Math.round(monthlyPmi * 100) / 100;
    const roundedTotalMonthlyPayment =
        Math.round(totalMonthlyPayment * 100) / 100;

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
                Mortgage Calculator
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Column - Input Fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Home Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Home Price{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={homePrice}
                                    onChange={(e) =>
                                        handleHomePriceChange(e.target.value)
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

                        {/* Loan Term */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loan Term (years){" "}
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

                        {/* Property Tax (Annual) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Tax (Annual)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={propertyTax}
                                    onChange={(e) =>
                                        handlePropertyTaxChange(e.target.value)
                                    }
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                            </div>
                        </div>

                        {/* Home Insurance (Annual) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Home Insurance (Annual)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={homeInsurance}
                                    onChange={(e) =>
                                        handleHomeInsuranceChange(
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                            </div>
                        </div>

                        {/* HOA Fees (Monthly) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                HOA Fees (Monthly)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={hoaFees}
                                    onChange={(e) =>
                                        handleHoaFeesChange(e.target.value)
                                    }
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                                />
                            </div>
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

                    {/* Monthly Principal & Interest */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-gray-600">
                                Principal & Interest
                            </div>
                            <InfoIcon tooltip="Monthly payment toward principal and interest" />
                        </div>
                        <div className="text-2xl font-bold text-[#0066CC]">
                            $
                            {roundedMonthlyPrincipalInterest.toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                }
                            )}
                        </div>
                    </div>

                    {/* Total Monthly Payment */}
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-semibold text-gray-700">
                                Total Monthly Payment
                            </div>
                            <InfoIcon tooltip="Total monthly payment including P&I, taxes, insurance, PMI, and HOA" />
                        </div>
                        <div className="text-3xl font-bold text-green-700">
                            $
                            {roundedTotalMonthlyPayment.toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                }
                            )}
                        </div>
                        <div className="mt-2 space-y-1 text-xs text-gray-600">
                            <div className="flex justify-between">
                                <span>Property Tax:</span>
                                <span>
                                    $
                                    {roundedMonthlyPropertyTax.toLocaleString(
                                        undefined,
                                        {
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 2,
                                        }
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Home Insurance:</span>
                                <span>
                                    $
                                    {roundedMonthlyHomeInsurance.toLocaleString(
                                        undefined,
                                        {
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 2,
                                        }
                                    )}
                                </span>
                            </div>
                            {monthlyPmi > 0 && (
                                <div className="flex justify-between">
                                    <span>PMI:</span>
                                    <span>
                                        $
                                        {roundedMonthlyPmi.toLocaleString(
                                            undefined,
                                            {
                                                maximumFractionDigits: 2,
                                                minimumFractionDigits: 2,
                                            }
                                        )}
                                    </span>
                                </div>
                            )}
                            {monthlyHoaFees > 0 && (
                                <div className="flex justify-between">
                                    <span>HOA:</span>
                                    <span>
                                        $
                                        {monthlyHoaFees.toLocaleString(
                                            undefined,
                                            {
                                                maximumFractionDigits: 2,
                                                minimumFractionDigits: 2,
                                            }
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Metrics Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Loan Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Interest Paid */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                $
                                {Math.round(totalInterest).toLocaleString(
                                    undefined,
                                    {
                                        maximumFractionDigits: 0,
                                    }
                                )}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Total Interest Paid
                            </div>
                        </div>
                        <InfoIcon tooltip="Total interest paid over the life of the loan" />
                    </div>

                    {/* Total Amount Paid */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                $
                                {Math.round(totalCost).toLocaleString(
                                    undefined,
                                    {
                                        maximumFractionDigits: 0,
                                    }
                                )}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Total Amount Paid
                            </div>
                        </div>
                        <InfoIcon tooltip="Total amount paid including down payment and all monthly payments" />
                    </div>

                    {/* Payoff Date */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {loanTermNum > 0
                                    ? new Date(
                                          new Date().setFullYear(
                                              new Date().getFullYear() +
                                                  loanTermNum
                                          )
                                      ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                      })
                                    : "—"}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Payoff Date
                            </div>
                        </div>
                        <InfoIcon tooltip="Estimated date when the loan will be fully paid off" />
                    </div>
                </div>
            </div>
        </div>
    );
}
