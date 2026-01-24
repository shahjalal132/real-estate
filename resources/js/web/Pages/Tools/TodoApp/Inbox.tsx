import React from "react";
import TodoLayout from "../../../Components/Tools/Todo/TodoLayout";

export default function Inbox() {
    return (
        <TodoLayout title="Inbox" activeFilter="Inbox">
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <h3 className="text-lg font-medium"> Inbox Empty </h3>
                <p> You have no pending notifications or unassigned tasks.</p>
            </div>
        </TodoLayout>
    );
}
