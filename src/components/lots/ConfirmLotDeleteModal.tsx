import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, Home } from 'lucide-react';
import type { Lot } from '../../types/lots.types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface ConfirmLotDeleteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    lot: Lot | null;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
}

export const ConfirmLotDeleteModal: React.FC<ConfirmLotDeleteModalProps> = ({
    open,
    onOpenChange,
    lot,
    isLoading = false,
    onConfirm,
    onCancel,
}) => {
    const [confirmed, setConfirmed] = useState(false);

    if (!open || !lot) return null;

    const handleConfirm = () => {
        if (!confirmed) {
            alert('Please confirm by checking the checkbox');
            return;
        }
        onConfirm();
        setConfirmed(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
        setConfirmed(false);
        onCancel?.();
    };

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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={handleCancel} />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header - Danger Theme */}
                <div className="flex items-start gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100">
                    <div className="p-3 bg-red-200 rounded-full flex-shrink-0">
                        <AlertTriangle className="text-red-700" size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-red-900">Delete Lot?</h2>
                        <p className="text-sm text-red-700 mt-1">This action cannot be undone</p>
                    </div>
                    <button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-600 flex-shrink-0"
                        title="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Item to Delete */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800 font-medium mb-2">You are about to permanently delete:</p>
                        <div className="bg-white rounded p-3 border border-red-200">
                            <h3 className="font-bold text-gray-900 text-sm break-words">{lot.titleUz}</h3>
                            <p className="text-xs text-gray-600 mt-1">Lot #{lot.lotNumber}</p>
                        </div>
                    </div>

                    {/* Lot Quick Info */}
                    <Card className="p-4 bg-gray-50 border-gray-200">
                        <h4 className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Home size={14} />
                            Lot Information
                        </h4>
                        <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Address:</span>
                                <span className="font-medium text-gray-900 text-right max-w-[150px] truncate">
                                    {lot.addressUz}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className={`font-medium px-2 py-0.5 rounded text-xs ${getStatusColor(lot.status)}`}>
                                    {lot.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Trade Type:</span>
                                <span className="font-medium text-gray-900">
                                    {lot.tradeType === 'tender'
                                        ? '📋 Tender'
                                        : lot.tradeType === 'auction'
                                            ? '🔨 Auction'
                                            : '📌 Direct'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Images:</span>
                                <span className="font-medium text-gray-900">{lot.images?.length || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Views:</span>
                                <span className="font-medium text-gray-900">{lot.viewCount}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Impact Warning */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-3">
                        <h4 className="font-bold text-yellow-900 text-sm mb-2 flex items-center gap-2">
                            ⚠️ Impact of Deletion
                        </h4>
                        <ul className="text-xs text-yellow-800 space-y-1 ml-5 list-disc">
                            <li>All lot data will be permanently deleted</li>
                            <li>{lot.images?.length || 0} images will be removed from CDN</li>
                            <li>Trade/auction information will be lost</li>
                            <li>Customer details will be removed</li>
                            <li>View statistics will be erased</li>
                        </ul>
                    </div>

                    {/* Active Lot Warning */}
                    {lot.status === 'active' && (
                        <div className="bg-red-50 border border-red-300 rounded p-3">
                            <p className="text-sm font-semibold text-red-900">
                                🔴 WARNING: This lot is currently ACTIVE
                            </p>
                            <p className="text-xs text-red-800 mt-1">
                                Deleting an active lot may affect ongoing trades or auctions.
                            </p>
                        </div>
                    )}

                    {/* Confirmation Checkbox */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={confirmed}
                                onChange={(e) => setConfirmed(e.target.checked)}
                                className="w-5 h-5 rounded border-red-300 text-red-600 focus:ring-red-500 mt-1 flex-shrink-0"
                                disabled={isLoading}
                            />
                            <span className="text-sm">
                                <span className="font-bold text-red-900 block">
                                    I understand the consequences
                                </span>
                                <p className="text-red-800 text-xs mt-1">
                                    I confirm that I want to permanently delete this lot and all associated data.
                                </p>
                            </span>
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-200 justify-end bg-gray-50">
                    <Button
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="min-w-[100px]"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleConfirm}
                        loading={isLoading}
                        disabled={isLoading || !confirmed}
                        className="min-w-[140px]"
                    >
                        {isLoading ? (
                            <>
                                <Trash2 size={16} className="mr-2 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} className="mr-2" />
                                Delete Lot
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};