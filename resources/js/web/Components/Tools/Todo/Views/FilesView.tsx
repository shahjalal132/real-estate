import React from "react";
import { PieChart, TrendingUp, Image as ImageIcon } from "lucide-react";

export default function FilesView() {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gray-50 p-6 text-center">
            {/* Illustration Container */}
            <div className="relative w-32 h-32 mb-6">
                {/* Back Item (Image/Bottom) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-16 h-20 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center rotate-[-10deg] z-10">
                    <ImageIcon size={24} className="text-red-400" />
                </div>

                {/* Left Item (Pie Chart) */}
                <div className="absolute top-2 left-2 w-16 h-20 bg-white border border-gray-200 rounded shadow-sm flex flex-col items-center justify-center -rotate-12 z-20">
                    <PieChart size={24} className="text-red-400 mb-1" />
                    <div className="w-8 h-1 bg-gray-100 rounded"> </div>
                    <div className="w-6 h-1 bg-gray-100 rounded mt-1"> </div>
                </div>

                {/* Right Item (Graph) */}
                <div className="absolute top-4 right-0 w-16 h-20 bg-white border border-gray-200 rounded shadow-sm flex flex-col items-center justify-center rotate-12 z-30">
                    <TrendingUp size={24} className="text-red-400 mb-1" />
                    <div className="w-10 h-8 border-l border-b border-gray-100 ml-1">
                        {" "}
                    </div>
                </div>
            </div>

            {/* Text */}
            <p className="text-gray-600 text-sm max-w-sm">
                All attachments to tasks & messages in this project will appear
                here
            </p>
        </div>
    );
}
