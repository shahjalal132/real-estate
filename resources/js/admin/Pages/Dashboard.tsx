import AdminLayout from '../Layouts/AdminLayout';

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600">Welcome to the admin panel.</p>
                </div>
            </div>
        </AdminLayout>
    );
}

