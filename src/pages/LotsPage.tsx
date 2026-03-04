import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { LotsTable } from '../components/lots/LotsTable';
import { LotsForm } from '../components/lots/LotsForm';
import { LotsFilter } from '../components/lots/LotsFilter';
import { Dialog } from '../components/ui/dialog';
import { useLotsList, useCreateLot, useUpdateLot, useDeleteLot } from '../hooks/useLots';
import type { Lot } from '../types/lots.types';
import { Plus, RefreshCw } from 'lucide-react';

export const LotsPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [tradeType, setTradeType] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingLot, setEditingLot] = useState<Lot | null>(null);

    const { data, isLoading, refetch } = useLotsList(page, 10, {
        search,
        status,
        tradeType,
    });
    const { mutate: createLot, isPending: isCreating } = useCreateLot();
    const { mutate: updateLot, isPending: isUpdating } = useUpdateLot(editingLot?.id || '');
    const { mutate: deleteLot, isPending: isDeleting } = useDeleteLot();

    const handleCreateNew = () => {
        setEditingLot(null);
        setDialogOpen(true);
    };

    const handleEdit = (lot: Lot) => {
        setEditingLot(lot);
        setDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteLot(id, {
            onSuccess: () => {
                if ((data?.data.data?.length || 0) <= 1 && page > 1) {
                    setPage(page - 1);
                }
            },
        });
    };

    const handleSubmit = (formData: any) => {
        if (editingLot) {
            updateLot(formData, {
                onSuccess: () => {
                    setDialogOpen(false);
                    setEditingLot(null);
                    setPage(1);
                },
            });
        } else {
            createLot(formData, {
                onSuccess: () => {
                    setDialogOpen(false);
                    setPage(1);
                },
            });
        }
    };

    const handleResetFilters = () => {
        setSearch('');
        setStatus('');
        setTradeType('');
        setPage(1);
    };

    const totalPages = Math.ceil((data?.data.total || 0) / 10);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">🏘️ Lots Management</h1>
                    <p className="text-gray-600 mt-1">
                        Create, edit, and manage land lots
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={() => refetch()}
                        disabled={isLoading}
                    >
                        <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                    </Button>
                    <Button onClick={handleCreateNew}>
                        <Plus size={20} className="mr-2" />
                        New Lot
                    </Button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 shadow-sm">
                    <p className="text-blue-600 text-sm font-medium">📊 Total Lots</p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">{data?.data.total || 0}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 shadow-sm">
                    <p className="text-purple-600 text-sm font-medium">📄 Current Page</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">{page}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200 shadow-sm">
                    <p className="text-green-600 text-sm font-medium">📑 Total Pages</p>
                    <p className="text-3xl font-bold text-green-900 mt-2">{totalPages || 1}</p>
                </div>
            </div>

            {/* Filters */}
            <LotsFilter
                search={search}
                status={status}
                tradeType={tradeType}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPage(1);
                }}
                onStatusChange={(value) => {
                    setStatus(value);
                    setPage(1);
                }}
                onTradeTypeChange={(value) => {
                    setTradeType(value);
                    setPage(1);
                }}
                onReset={handleResetFilters}
                isSearching={isLoading}
            />

            {/* Lots Table - Now handles delete modal internally */}
            <LotsTable
                lots={data?.data.data || []}
                isLoading={isLoading}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={isDeleting}
            />

            {/* Create/Edit Dialog */}
            <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={editingLot ? '✏️ Edit Lot' : '➕ Create New Lot'}
                footer={
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setDialogOpen(false)}
                            disabled={isCreating || isUpdating}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                const form = document.querySelector('form');
                                if (form) {
                                    form.dispatchEvent(
                                        new Event('submit', { bubbles: true, cancelable: true })
                                    );
                                }
                            }}
                            loading={isCreating || isUpdating}
                            disabled={isCreating || isUpdating}
                        >
                            {editingLot ? '✏️ Update Lot' : '➕ Create Lot'}
                        </Button>
                    </div>
                }
            >
                <LotsForm
                    initialData={editingLot || undefined}
                    onSubmit={handleSubmit}
                    isLoading={isCreating || isUpdating}
                    onCancel={() => setDialogOpen(false)}
                />
            </Dialog>
        </div>
    );
};