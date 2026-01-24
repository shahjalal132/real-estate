import React from "react";
import TodoLayout from "../../../Components/Tools/Todo/TodoLayout";

export default function Goals() {
    return (
        <TodoLayout title="Goals" activeFilter="Goals">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4"> Goals </h1>
                <p className="text-gray-500">
                    {" "}
                    Connect work to outcomes and see how your projects drive
                    company goals.
                </p>
            </div>
        </TodoLayout>
    );
}
