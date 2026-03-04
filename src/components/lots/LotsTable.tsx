import React, { useState } from 'react';
import { Edit2, Trash2, Eye, MapPin, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { Lot } from '@/types/lots.types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Pagination } from '../Pagination';
import { DeleteLotModal } from './DeleteLotModal';

interface LotsTableProps {
    lots: Lot[];
    isLoading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEdit: (lot: Lot) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const LotsTable: React.FC<LotsTableProps> = ({
    lots,
    isLoading,
    page,
    totalPages,
    onPageChange,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        lot: Lot | null;
    }>({
        open: false,
        lot: null,
    });

    const handleDeleteClick = (lot: Lot) => {
        setDeleteModal({
            open: true,
            lot,
        });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.lot) {
            onDelete(deleteModal.lot.id);
            setDeleteModal({ open: false, lot: null });
        }
    };

    const handleCancelDelete = () => {
        setDeleteModal({ open: false, lot: null });
    };

    if (isLoading) {
        return (
            <Card className="p-6">
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                </div>
            </Card>
        );
    }

    if (lots.length === 0) {
        return (
            <Card className="p-12 text-center">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No lots found</h3>
                <p className="text-gray-600">Create your first land lot to get started.</p>
            </Card>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-800';
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-gray-100 text-gray-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Lot #
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Trade Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Views
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {lots.map((item) => (
                                <tr
                                    key={item.id}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {item.images && item.images.length > 0 && (
                                                <img
                                                    src={item.images[0]?.url}
                                                    alt={item.titleUz}
                                                    className="w-10 h-10 rounded object-cover"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {item.titleUz}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-1">
                                                    <MapPin size={12} />
                                                    {item.addressUz}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
                                            #{item.lotNumber}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                                item.status
                                            )}`}
                                        >
                                            {item.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {format(new Date(item.tradeDate), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <Eye size={16} />
                                            <span className="text-sm font-medium">{item.viewCount}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className={`flex gap-2 justify-end ${hoveredId !== item.id && 'opacity-0'}`}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteClick(item)}
                                                disabled={isDeleting}
                                                title="Delete"
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
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
                    </div>
                )}
            </Card>

            {/* Delete Modal */}
            <DeleteLotModal
                open={deleteModal.open}
                onOpenChange={(open) => !open && handleCancelDelete()}
                lot={deleteModal.lot}
                isLoading={isDeleting}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
};