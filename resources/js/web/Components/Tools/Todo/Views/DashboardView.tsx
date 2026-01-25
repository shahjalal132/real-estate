import React from "react";
import { Filter } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from "recharts";
import { Task } from "../types";

interface DashboardViewProps {
    tasks: Task[];
}

// Card Component (Light Theme)
const StatCard = ({ title, count, subtitle }: { title: string; count: number; subtitle: string }) => (
    <div className= "bg-white border border-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center shadow-sm" >
    <h3 className="text-gray-500 text-sm mb-2" > { title } </h3>
        < div className = "text-4xl text-gray-800 font-normal mb-4" > { count } </div>
            < div className = "flex items-center gap-1 text-xs text-gray-400" >
                <Filter size={ 10 } />
                    < span > { subtitle } </span>
                    </div>
                    </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className= "bg-white border border-gray-200 p-2 rounded shadow-lg text-xs text-gray-700" >
            <p className="label font-medium" > {`${label} : ${payload[0].value}`
    } </p>
        </div>
        );
    }
return null;
};

export default function DashboardView({ tasks }: DashboardViewProps) {
    // 1. Stats Calculation
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const incompleteTasks = totalTasks - completedTasks;
    // Mocking overdue as date parsing might be complex with current mock strings
    const overdueTasks = 0;

    // 2. Data for "Total tasks by section"
    const sectionCounts: Record<string, number> = {
        "Recently assigned": 0,
        "Do today": 0,
        "Untitled section": 0,
        "Do next week": 0,
        "Do later": 0
    };

    tasks.forEach(t => {
        if (t.status === 'recently_assigned') sectionCounts["Recently assigned"]++;
        else if (t.status === 'todo') sectionCounts["Do today"]++;
        else if (t.status === 'do_later') sectionCounts["Do later"]++;
        else sectionCounts["Untitled section"]++;
    });

    const tasksBySectionData = Object.keys(sectionCounts).map(key => ({
        name: key,
        count: sectionCounts[key]
    }));

    // 3. Data for "Tasks by completion status"
    const completionData = [
        { name: "Completed", value: completedTasks },
        { name: "Incomplete", value: incompleteTasks },
    ];

    // 4. Data for "Total tasks by project"
    const projectCounts: Record<string, number> = {};
    tasks.forEach(t => {
        const p = t.project || "No Project";
        projectCounts[p] = (projectCounts[p] || 0) + 1;
    });
    const tasksByProjectData = Object.keys(projectCounts).map(key => ({
        name: key,
        count: projectCounts[key]
    }));

    // 5. Data for "Task completion over time"
    const timeData = [
        { name: '01/11', total: 0, completed: 0 },
        { name: '01/12', total: 0, completed: 0 },
        { name: '01/13', total: 0, completed: 0 },
        { name: '01/14', total: 0, completed: 0 },
        { name: '01/15', total: 0, completed: 0 },
        { name: '01/16', total: 0, completed: 0 },
        { name: '01/17', total: 0, completed: 0 },
        { name: '01/18', total: 0, completed: 0 },
        { name: '01/19', total: 0, completed: 0 },
        { name: '01/20', total: 0, completed: 0 },
        { name: '01/21', total: 0, completed: 0 },
        { name: '01/22', total: 0, completed: 0 },
        { name: '01/23', total: 0, completed: 0 },
        { name: '01/24', total: 2, completed: 1 },
        { name: '01/25', total: totalTasks, completed: completedTasks },
    ];


    return (
        <div className= "bg-gray-50 min-h-full p-6 text-gray-800" >
        {/* Top Row: Stat Cards */ }
        < div className = "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" >
            <StatCard title="Total completed tasks" count = { completedTasks } subtitle = "1 Filter" />
                <StatCard title="Total incomplete tasks" count = { incompleteTasks } subtitle = "1 Filter" />
                    <StatCard title="Total overdue tasks" count = { overdueTasks } subtitle = "1 Filter" />
                        <StatCard title="Total tasks" count = { totalTasks } subtitle = "No Filters" />
                            </div>

    {/* Middle Row */ }
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6" >
        {/* Bar Chart: Total tasks by section */ }
        < div className = "bg-white p-6 rounded-lg border border-gray-200 shadow-sm" >
            <div className="flex justify-between items-center mb-6" >
                <h3 className="text-gray-500 text-xs uppercase tracking-wider font-semibold" > Total tasks by section </h3>
                    </div>
                    < div className = "h-64" >
                        <ResponsiveContainer width="100%" height = "100%" >
                            <BarChart data={ tasksBySectionData } margin = {{ top: 5, right: 30, left: -20, bottom: 5 }
}>
    <CartesianGrid strokeDasharray="3 3" vertical = { false} stroke = "#E5E7EB" />
        <XAxis 
                                    dataKey="name"
tick = {{ fill: '#6B7280', fontSize: 10 }}
axisLine = {{ stroke: '#E5E7EB' }}
tickLine = { false}
interval = { 0}
angle = {- 45}
textAnchor = "end"
height = { 60}
    />
    <YAxis 
                                    tick={ { fill: '#6B7280', fontSize: 10 } }
axisLine = { false}
tickLine = { false}
    />
    <Tooltip content={
        <CustomTooltip />} cursor={{ fill: '#F3F4F6' }} / >
        <Bar dataKey="count" fill = "#8B5CF6" barSize = { 30} radius = { [4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
            </div>
            < div className = "flex justify-between items-center mt-4 border-t border-gray-100 pt-3" >
                <div className="flex items-center gap-2 text-xs text-gray-500" >
                    <Filter size={ 12 } />
                        < span > 1 Filter </span>
                            </div>
                            < button className = "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200" > See all </button>
                                </div>
                                </div>

    {/* Donut Chart: Tasks by completion status */ }
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm" >
        <div className="flex justify-between items-center mb-2" >
            <h3 className="text-gray-500 text-xs uppercase tracking-wider font-semibold" > Tasks by completion status this upcoming month </h3>
                </div>
                < div className = "h-64 flex items-center justify-center relative" >
                    <ResponsiveContainer width="100%" height = "100%" >
                        <PieChart>
                        <Pie
                                    data={ completionData }
    cx = "50%"
    cy = "50%"
    innerRadius = { 60}
    outerRadius = { 80}
    paddingAngle = { 0}
    dataKey = "value"
    stroke = "none"
        >
        <Cell key="cell-0" fill = "#E5E7EB" /> {/* Completed (Gray) */ }
            < Cell key = "cell-1" fill = "#8B5CF6" /> {/* Incomplete (Violet) */ }
                </Pie>
                < Tooltip content = {< CustomTooltip />} />
                    </PieChart>
                    </ResponsiveContainer>
{/* Center Text */ }
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center" >
    <div className="text-3xl text-gray-800 font-light" > { incompleteTasks } </div>
        </div>
{/* Legend */ }
<div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4" >
    <div className="flex items-center gap-2 mb-1" >
        <div className="w-3 h-3 bg-[#8B5CF6] rounded-sm" > </div>
            < span className = "text-xs text-gray-500" > Incomplete </span>
                </div>
                </div>
                </div>

                < div className = "flex justify-between items-center mt-4 border-t border-gray-100 pt-3" >
                    <div className="flex items-center gap-2 text-xs text-gray-500" >
                        <Filter size={ 12 } />
                            < span > 2 Filters </span>
                                </div>
                                < button className = "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200" > See all </button>
                                    </div>
                                    </div>
                                    </div>

{/* Bottom Row */ }
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4" >
    {/* Bar Chart: Projects */ }
    < div className = "bg-white p-6 rounded-lg border border-gray-200 shadow-sm" >
        <div className="flex justify-between items-center mb-6" >
            <h3 className="text-gray-500 text-xs uppercase tracking-wider font-semibold" > Total tasks by project </h3>
                </div>
                < div className = "h-64" >
                    <ResponsiveContainer width="100%" height = "100%" >
                        <BarChart data={ tasksByProjectData } margin = {{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical = { false} stroke = "#E5E7EB" />
                                <XAxis dataKey="name" axisLine = {{ stroke: '#E5E7EB' }} tickLine = { false} tick = {{ fill: '#6B7280', fontSize: 10 }} />
                                    < YAxis axisLine = { false} tickLine = { false} tick = {{ fill: '#6B7280', fontSize: 10 }} />
                                        < Tooltip content = {< CustomTooltip />} cursor = {{ fill: '#F3F4F6' }} />
                                            < Bar dataKey = "count" fill = "#DDD6FE" barSize = { 6} radius = { [10, 10, 0, 0]} />
                                                </BarChart>
                                                </ResponsiveContainer>
                                                </div>
                                                < div className = "flex justify-between items-center mt-4 border-t border-gray-100 pt-3" >
                                                    <div className="flex items-center gap-2 text-xs text-gray-500" >
                                                        <Filter size={ 12 } />
                                                            < span > 1 Filter </span>
                                                                </div>
                                                                </div>
                                                                </div>

{/* Area Chart: Task completion over time */ }
<div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm" >
    <div className="flex justify-between items-center mb-6" >
        <h3 className="text-gray-500 text-xs uppercase tracking-wider font-semibold" > Task completion over time </h3>
            </div>
            < div className = "h-64" >
                <ResponsiveContainer width="100%" height = "100%" >
                    <AreaChart data={ timeData } margin = {{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                        <linearGradient id="colorTotal" x1 = "0" y1 = "0" x2 = "0" y2 = "1" >
                            <stop offset="5%" stopColor = "#8B5CF6" stopOpacity = { 0.1} />
                                <stop offset="95%" stopColor = "#8B5CF6" stopOpacity = { 0} />
                                    </linearGradient>
                                    </defs>
                                    < CartesianGrid strokeDasharray = "3 3" vertical = { false} stroke = "#E5E7EB" />
                                        <XAxis 
                                    dataKey="name"
tick = {{ fill: '#6B7280', fontSize: 10 }}
axisLine = {{ stroke: '#E5E7EB' }}
tickLine = { false}
interval = { 1}
angle = {- 45}
textAnchor = "end"
height = { 50}
    />
    <YAxis axisLine={ false } tickLine = { false} tick = {{ fill: '#6B7280', fontSize: 10 }} />
        < Tooltip content = {< CustomTooltip />} />
            < Area type = "monotone" dataKey = "total" stroke = "#DDD6FE" fillOpacity = { 1} fill = "url(#colorTotal)" strokeWidth = { 2} />
                <Area type="monotone" dataKey = "completed" stroke = "#8B5CF6" fill = "none" strokeWidth = { 2} />
                    </AreaChart>
                    </ResponsiveContainer>
                    </div>
                    < div className = "flex justify-between items-center mt-4 border-t border-gray-100 pt-3" >
                        <div className="flex items-center gap-2 text-xs text-gray-500" >
                            <Filter size={ 12 } />
                                < span > 2 Filters </span>
                                    </div>
                                    < button className = "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200" > See all </button>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
    );
}
