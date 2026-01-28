import AdminLayout from "../Layouts/AdminLayout";
import {
    Users,
    Building2,
    DollarSign,
    TrendingUp,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
];

const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500"> {title} </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                    {" "}
                    {value}{" "}
                </h3>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon
                    className={`w-6 h-6 ${color.replace("bg-", "text-").replace("100", "600")}`}
                />
            </div>
        </div>
        <div className="flex items-center mt-4">
            <span
                className={`flex items-center text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
                {trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {change}
            </span>
            <span className="text-sm text-gray-400 ml-2"> vs last month </span>
        </div>
    </div>
);

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard">
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Properties"
                        value="1,284"
                        change="12%"
                        trend="up"
                        icon={Building2}
                        color="bg-indigo-100"
                    />
                    <StatCard
                        title="Total Leads"
                        value="842"
                        change="3.4%"
                        trend="up"
                        icon={Users}
                        color="bg-blue-100"
                    />
                    <StatCard
                        title="Revenue"
                        value="$42,500"
                        change="2.1%"
                        trend="down"
                        icon={DollarSign}
                        color="bg-green-100"
                    />
                    <StatCard
                        title="Growth"
                        value="18.2%"
                        change="4.5%"
                        trend="up"
                        icon={TrendingUp}
                        color="bg-purple-100"
                    />
                </div>

                {/* Charts & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {" "}
                                Revenue Overview{" "}
                            </h3>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient
                                            id="colorValue"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#4f46e5"
                                                stopOpacity={0.1}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#4f46e5"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#f3f4f6"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#9ca3af" }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#9ca3af" }}
                                    />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4f46e5"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Leases/Sales */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            {" "}
                            Recent Properties{" "}
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                                        {" "}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {" "}
                                            Luxury Apartment {item}{" "}
                                        </h4>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {" "}
                                            $450,000{" "}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 text-sm text-indigo-600 font-medium hover:text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
                            View All Properties
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
