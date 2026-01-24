import React from "react";
import TodoLayout from "../../../Components/Tools/Todo/TodoLayout";

export default function Portfolios() {
    return (
        <TodoLayout title= "Portfolios" activeFilter = "Portfolios" >
            <div className="p-6" >
                <h1 className="text-2xl font-bold mb-4" > Portfolios </h1>
                    < p className = "text-gray-500" > Group related projects together to see status and progress across multiple projects at once.</p>
                        </div>
                        </TodoLayout>
    );
}
