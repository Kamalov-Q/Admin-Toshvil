import React, { useState } from 'react';
import { AlertTriangle, Loader } from 'lucide-react';
import { Button } from '../ui/button';

interface DeleteConfirmModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    itemName: string;
    isLoading?: boolean;
    isDangerous?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    open,
    onOpenChange,
    title,
    description,
    itemName,
    isLoading = false,
    isDangerous = false,
    onConfirm,
    onCancel,
    confirmText = 'Delete',
    cancelText = 'Cancel',
}) => {
    const [confirmed, setConfirmed] = useState(false);

    if (!open) return null;

    const handleConfirm = () => {
        if (isDangerous && !confirmed) {
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50"
                onClick={handleCancel}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-start gap-4 p-6 border-b border-gray-200 bg-red-50">
                    <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                        <AlertTriangle className="text-red-600" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                        {description && (
                            <p className="text-sm text-gray-600 mt-1">{description}</p>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Item Name Display */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">You are about to delete:</p>
                        <p className="text-sm font-semibold text-gray-900 break-words">
                            {itemName}
                        </p>
                    </div>

                    {/* Warning Message */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                            <strong>⚠️ Warning:</strong> This action cannot be undone. The item will be permanently deleted.
                        </p>
                    </div>

                    {/* Confirmation Checkbox (for dangerous operations) */}
                    {isDangerous && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={confirmed}
                                    onChange={(e) => setConfirmed(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                    disabled={isLoading}
                                />
                                <span className="text-sm font-medium text-red-800">
                                    Yes, I want to permanently delete this item
                                </span>
                            </label>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-200 justify-end bg-gray-50">
                    <Button
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className='cursor-pointer'
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleConfirm}
                        className='cursor-pointer'
                        loading={isLoading}
                        disabled={isLoading || (isDangerous && !confirmed)}
                    >
                        {isLoading ? (
                            <>
                                <Loader size={16} className="mr-2 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            confirmText
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};