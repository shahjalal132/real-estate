import React from "react";
import { CheckCircle2, Clock, AlertCircle, BarChart2 } from "lucide-react";
import { Task } from "../types";

interface DashboardViewProps {
    tasks: Task[];
}

export default function DashboardView({ tasks }: DashboardViewProps) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Calculate simple statuses
    // Overdue: Due date is in past (simplified for demo string comparison)
    // Actually implementing proper date check would be better but keeping simple for now.

    return (
        <div className= "p-8 max-w-5xl mx-auto" >
        <h2 className="text-2xl font-bold mb-6 text-gray-800" > Project Overview </h2>

            < div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" >
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4" >
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg" >
                        <BarChart2 size={ 24 } />
                            </div>
                            < div >
                            <div className="text-sm text-gray-500 font-medium" > Total Tasks </div>
                                < div className = "text-3xl font-bold text-gray-800" > { total } </div>
                                    </div>
                                    </div>

                                    < div className = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4" >
                                        <div className="p-3 bg-green-50 text-green-600 rounded-lg" >
                                            <CheckCircle2 size={ 24 } />
                                                </div>
                                                < div >
                                                <div className="text-sm text-gray-500 font-medium" > Completed </div>
                                                    < div className = "text-3xl font-bold text-gray-800" > { completed } </div>
                                                        </div>
                                                        </div>

                                                        < div className = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4" >
                                                            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg" >
                                                                <Clock size={ 24 } />
                                                                    </div>
                                                                    < div >
                                                                    <div className="text-sm text-gray-500 font-medium" > Pending </div>
                                                                        < div className = "text-3xl font-bold text-gray-800" > { pending } </div>
                                                                            </div>
                                                                            </div>
                                                                            </div>

                                                                            < div className = "bg-white p-8 rounded-xl border border-gray-100 shadow-sm mb-8" >
                                                                                <div className="flex items-center justify-between mb-4" >
                                                                                    <h3 className="text-lg font-semibold text-gray-800" > Overall Progress </h3>
                                                                                        < span className = "text-2xl font-bold text-blue-600" > { progress } % </span>
                                                                                            </div>
                                                                                            < div className = "w-full bg-gray-100 rounded-full h-3" >
                                                                                                <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
    style = {{ width: `${progress}%` }
}
                    />
    </div>
    </div>

    < div className = "grid grid-cols-1 md:grid-cols-2 gap-8" >
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm" >
            <h3 className="text-lg font-semibold text-gray-800 mb-4" > Recent Activity </h3>
                < div className = "space-y-4" >
                    {
                        tasks.slice(0, 5).map(task => (
                            <div key= { task.id } className = "flex items-center gap-3 text-sm" >
                            <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <span className="font-medium text-gray-700 truncate flex-1" > { task.title } </span>
                        < span className = "text-gray-400 text-xs" > { task.completed ? 'Completed' : 'Created' } </span>
                            </div>
                        ))}
</div>
    </div>

    < div className = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm" >
        <h3 className="text-lg font-semibold text-gray-800 mb-4" > Task Distribution </h3>
{/* Placeholder for a chart or list */ }
<div className="space-y-3" >
    <div className="flex items-center justify-between text-sm" >
        <span className="text-gray-600" > Tasks to get done </span>
            < span className = "font-medium text-gray-800" > 7 </span>
                </div>
                < div className = "w-full bg-gray-100 rounded-full h-2" >
                    <div className="bg-purple-500 h-2 rounded-full" style = {{ width: '70%' }} />
                        </div>

                        < div className = "flex items-center justify-between text-sm pt-2" >
                            <span className="text-gray-600" > Personal </span>
                                < span className = "font-medium text-gray-800" > 3 </span>
                                    </div>
                                    < div className = "w-full bg-gray-100 rounded-full h-2" >
                                        <div className="bg-indigo-500 h-2 rounded-full" style = {{ width: '30%' }} />
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
    );
}
