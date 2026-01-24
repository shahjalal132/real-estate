import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Task } from "../types";

interface CalendarViewProps {
    tasks: Task[];
}

export default function CalendarView({ tasks }: CalendarViewProps) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // Mocking July/August 2025 as per previous data
    const monthName = "August 2025";
    // Starting mock calendar on Fri Aug 1st 2025 (actually Aug 1 2025 is a Friday)

    const startDayOffset = 5; // 0=Sun, 1=Mon... 5=Fri
    const daysInMonth = 31;

    const calendarDays = [];
    for (let i = 0; i < startDayOffset; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    return (
        <div className= "flex flex-col h-full bg-white" >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200" >
            <div className="flex items-center gap-4" >
                <h2 className="text-lg font-semibold text-gray-800" > { monthName } </h2>
                    < div className = "flex items-center bg-gray-100 rounded-md p-0.5" >
                        <button className="p-1 hover:bg-white rounded shadow-sm text-gray-600" > <ChevronLeft size={ 16 } /></button >
                            <button className="p-1 hover:bg-white rounded shadow-sm text-gray-600" > <ChevronRight size={ 16 } /></button >
                                </div>
                                </div>
                                < div >
                                <button className="text-sm font-medium text-gray-600 hover:text-black" > Today </button>
                                    </div>
                                    </div>

                                    < div className = "grid grid-cols-7 border-b border-gray-200 bg-gray-50" >
                                    {
                                        days.map(d => (
                                            <div key= { d } className = "py-2 text-center text-xs font-semibold text-gray-500 uppercase" >
                                            { d }
                                            </div>
                                        ))
                                    }
                                        </div>

                                        < div className = "flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto" >
                                        {
                                            calendarDays.map((date, idx) => (
                                                <div key= { idx } className = {`border-r border-b border-gray-100 min-h-[100px] p-2 ${!date ? 'bg-gray-50/50' : ''}`} >
                                            { date && (
                                                <>
                                                <span className={ `text-sm font-medium ${date === 4 ? 'bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-gray-700'}` }>
                                                    { date }
                                                    </span>
                                                    < div className = "mt-2 space-y-1" >
                                                    {
                                                        tasks.filter(t => t.dueDate.includes(`Aug ${date}`) || (t.dueDate.includes("Jul") && date === 1 && idx === 0)).map(t => (
                                                            <div key= { t.id } className = {`text-xs px-1.5 py-1 rounded truncate ${t.completed ? 'bg-gray-100 text-gray-400 line-through' : 'bg-blue-50 text-blue-700 border border-blue-100'}`} >
                                                        { t.title }
                                                        </div>
                                    ))
}
</div>
    </>
                         )}
</div>
                 ))}
{/* Filling extra grid space */ }
</div>
    </div>
    );
}
