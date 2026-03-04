import React, { useState } from 'react';
import { useLotsList, useDeleteLot } from '../hooks/useLots';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const LotsPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useLotsList(page, 10);
    const { mutate: deleteLot } = useDeleteLot();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Land Lots Management</h1>
                    <p className="text-gray-600 mt-1">Manage land auction lots and tenders</p>
                </div>
                <Button className='cursor-pointer bg-black'>
                    <Plus size={20} className="mr-2" />
                    New Lot
                </Button>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Trade Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Views</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {!isLoading && data?.data.data?.map((lot) => (
                                <tr key={lot.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-900">{lot.titleUz}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            {lot.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {format(new Date(lot.tradeDate), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <Eye size={16} />
                                            <span className="text-sm">{lot.viewCount}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="ghost" size="sm">
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm('Delete this lot?')) {
                                                        deleteLot(lot.id);
                                                    }
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};