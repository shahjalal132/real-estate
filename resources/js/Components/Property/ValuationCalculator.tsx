import { useState } from "react";
import BarChart from "./Charts/BarChart";

export default function ValuationCalculator() {
    const [purchasePrice, setPurchasePrice] = useState("3725000");
    const [downPayment, setDownPayment] = useState("745000");
    const [interestRate, setInterestRate] = useState("5.5");
    const [loanTerm, setLoanTerm] = useState("30");
    const [loanToValue, setLoanToValue] = useState(80);

    const loanAmount = parseFloat(purchasePrice) - parseFloat(downPayment) || 0;
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm) * 12;
    const monthlyPayment =
        loanAmount > 0 && monthlyRate > 0
            ? (loanAmount *
                  (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
              (Math.pow(1 + monthlyRate, numPayments) - 1)
            : 0;
    const totalInterest = monthlyPayment * numPayments - loanAmount || 0;

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
                    <input
                        type="text"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Down Payment
                    </label>
                    <input
                        type="text"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interest Rate (%)
                    </label>
                    <input
                        type="text"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Term (years)
                    </label>
                    <input
                        type="text"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC]"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan to Value: {loanToValue}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={loanToValue}
                        onChange={(e) =>
                            setLoanToValue(parseInt(e.target.value))
                        }
                        className="w-full"
                    />
                </div>
                <div className="md:col-span-2 border-t pt-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-sm text-gray-600 mb-1">
                                Loan Amount
                            </div>
                            <div className="text-2xl font-bold text-[#0066CC]">
                                ${loanAmount.toLocaleString()}
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
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Payment Breakdown Chart */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Payment Breakdown
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <BarChart data={paymentBreakdown} height={200} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
