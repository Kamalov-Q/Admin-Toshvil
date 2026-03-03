import React from 'react';
import { BarChart3, Newspaper, MapPin, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number }> = ({
    icon,
    label,
    value,
}) => (
    <Card className="p-6">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-lg text-primary-600">{icon}</div>
            <div>
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </Card>
);

export const DashboardPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
                <p className="text-gray-600">Here's what's happening in your dashboard today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<Newspaper size={24} />} label="Total News" value={42} />
                <StatCard icon={<MapPin size={24} />} label="Total Lots" value={128} />
                <StatCard icon={<BarChart3 size={24} />} label="Districts" value={22} />
                <StatCard icon={<Eye size={24} />} label="Total Views" value={15420} />
            </div>

            <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition">
                        <Newspaper className="text-blue-600 mb-2" size={24} />
                        <p className="font-medium text-gray-900">Create News</p>
                        <p className="text-sm text-gray-600">Add new announcement</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer transition">
                        <MapPin className="text-green-600 mb-2" size={24} />
                        <p className="font-medium text-gray-900">Create Lot</p>
                        <p className="text-sm text-gray-600">Add new land lot</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 cursor-pointer transition">
                        <BarChart3 className="text-purple-600 mb-2" size={24} />
                        <p className="font-medium text-gray-900">Manage Districts</p>
                        <p className="text-sm text-gray-600">Edit district info</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};