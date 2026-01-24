import React from "react";
import TodoLayout from "../../../Components/Tools/Todo/TodoLayout";

export default function Home() {
    return (
        <TodoLayout title= "Home" activeFilter = "Home" >
            <div className="p-8 text-center text-gray-500" >
                <h2 className="text-xl font-semibold mb-2" > Welcome Home </h2>
                    < p > Your centralized workspace key metrics will appear here.</p>
                        </div>
                        </TodoLayout>
    );
}
