import React from "react";
import TodoLayout from "../../../Components/Tools/Todo/TodoLayout";

export default function Reporting() {
    return (
        <TodoLayout title="Reporting" activeFilter="Reporting">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    {" "}
                    Reporting & Insights{" "}
                </h1>
                <div className="bg-gray-50 border rounded-lg p-8 text-center text-gray-500">
                    Charts and analytics module coming soon.
                </div>
            </div>
        </TodoLayout>
    );
}
