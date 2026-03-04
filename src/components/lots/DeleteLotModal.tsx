import React from 'react';
import { AlertTriangle, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Lot } from '@/types/lots.types';
import { DeleteConfirmModal } from '../news/DeleteConfirmModal';
import { Card } from '../ui/card';

interface DeleteLotModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    lot: Lot | null;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
}

export const DeleteLotModal: React.FC<DeleteLotModalProps> = ({
    open,
    onOpenChange,
    lot,
    isLoading = false,
    onConfirm,
    onCancel,
}) => {
    if (!lot) return null;

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'upcoming':
                return '⏳ Upcoming';
            case 'active':
                return '✅ Active';
            case 'completed':
                return '✔️ Completed';
            case 'cancelled':
                return '❌ Cancelled';
            default:
                return status;
        }
    };

    const getTradeTypeLabel = (type: string) => {
        switch (type) {
            case 'tender':
                return '📋 Tender';
            case 'auction':
                return '🔨 Auction';
            case 'direct':
                return '📌 Direct';
            default:
                return type;
        }
    };

    return (
        <>
            <DeleteConfirmModal
                open={open}
                onOpenChange={onOpenChange}
                title="Delete Land Lot"
                description="Removing this lot will:"
                itemName={`"${lot.titleUz}" (Lot #${lot.lotNumber})`}
                isLoading={isLoading}
                isDangerous={true}
                onConfirm={onConfirm}
                onCancel={onCancel}
                confirmText="Delete Lot"
                cancelText="Cancel"
            />
            {/* Additional Info */}
            <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <AlertTriangle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Impact of deletion:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>The lot will be permanently removed from the database</li>
                            <li>All associated images ({lot.images?.length || 0}) will be deleted from CDN</li>
                            <li>Trade and auction information will be lost</li>
                            <li>View statistics ({lot.viewCount} views) will be deleted</li>
                            <li>Customer and location information will be removed</li>
                            <li>This action cannot be reversed</li>
                        </ul>
                    </div>
                </div>

                {/* Lot Preview */}
                <Card className="p-4 bg-gray-50 border-gray-200">
                    <p className="text-xs text-gray-600 mb-3 font-medium">Lot Details:</p>
                    <div className="space-y-3">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200">
                            <div>
                                <span className="text-gray-600 text-xs">Lot Number:</span>
                                <p className="font-medium text-gray-900">#{lot.lotNumber}</p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs">Lot Code:</span>
                                <p className="font-medium text-gray-900">{lot.lotCode || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs">Status:</span>
                                <p className="font-medium text-gray-900">{getStatusLabel(lot.status)}</p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs">Type:</span>
                                <p className="font-medium text-gray-900">{getTradeTypeLabel(lot.tradeType)}</p>
                            </div>
                        </div>

                        {/* Location & Trade Info */}
                        <div className="space-y-2 pb-3 border-b border-gray-200">
                            <div className="flex items-start gap-2">
                                <MapPin size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <span className="text-gray-600 text-xs">Address:</span>
                                    <p className="font-medium text-gray-900 text-sm truncate">{lot.addressUz}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Calendar size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <span className="text-gray-600 text-xs">Trade Date:</span>
                                    <p className="font-medium text-gray-900 text-sm">
                                        {format(new Date(lot.tradeDate), 'MMM dd, yyyy HH:mm')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Land & Infrastructure Info */}
                        <div className="space-y-2 pb-3 border-b border-gray-200">
                            <div>
                                <span className="text-gray-600 text-xs">Land Area:</span>
                                <p className="font-medium text-gray-900">
                                    {lot.landArea ? `${lot.landArea} ha` : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs block mb-1">Infrastructure:</span>
                                <div className="flex flex-wrap gap-2">
                                    {lot.hasGas && (
                                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                            ⚡ Gas
                                        </span>
                                    )}
                                    {lot.hasElectricity && (
                                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                            💡 Electricity
                                        </span>
                                    )}
                                    {lot.hasWater && (
                                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                            💧 Water
                                        </span>
                                    )}
                                    {lot.hasSewage && (
                                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                            🔧 Sewage
                                        </span>
                                    )}
                                    {!lot.hasGas &&
                                        !lot.hasElectricity &&
                                        !lot.hasWater &&
                                        !lot.hasSewage && (
                                            <span className="text-xs text-gray-500">No infrastructure specified</span>
                                        )}
                                </div>
                            </div>
                        </div>

                        {/* Payment & Investment Info */}
                        <div className="space-y-2">
                            <div>
                                <span className="text-gray-600 text-xs">Payment Type:</span>
                                <p className="font-medium text-gray-900 text-sm">
                                    {lot.paymentType === 'muddatli_bolib_tolash'
                                        ? `📅 Installment (${lot.paymentMonths || 'N/A'} months)`
                                        : '💵 Cash'}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs">Investment Required:</span>
                                <p className="font-medium text-gray-900 text-sm">
                                    {lot.requiredInvestmentUz || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs">Images:</span>
                                <p className="font-medium text-gray-900">{lot.images?.length || 0} image(s)</p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs">Views:</span>
                                <p className="font-medium text-gray-900">{lot.viewCount}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Warning for Active Lots */}
                {lot.status === 'active' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800">
                            <strong>⚠️ Warning:</strong> This lot is currently <strong>ACTIVE</strong>. Deleting it
                            will remove an ongoing trade/auction from the system.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};