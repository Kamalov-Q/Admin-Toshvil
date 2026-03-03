import React, { useState } from 'react';
import { useDistrictsList, useDeleteDistrict } from '../hooks/useDistricts';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const DistrictsPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useDistrictsList(page, 10);
    const { mutate: deleteDistrict } = useDeleteDistrict();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Districts Management</h1>
                    <p className="text-gray-600 mt-1">Manage district and city information</p>
                </div>
                <Button>
                    <Plus size={20} className="mr-2" />
                    New District
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {!isLoading && data?.data.data?.map((district) => (
                    <Card key={district.id} className="p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <MapPin className="text-primary-600" size={20} />
                                <h3 className="font-semibold text-gray-900">{district.nameUz}</h3>
                            </div>
                            <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {district.type}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{district.addressUz}</p>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" className="flex-1">
                                <Edit2 size={16} className="mr-1" />
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                    if (confirm('Delete this district?')) {
                                        deleteDistrict(district.id);
                                    }
                                }}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};