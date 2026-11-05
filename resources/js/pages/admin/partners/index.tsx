import { Head } from '@inertiajs/react';
import { CrudManager, type CrudField } from '@/components/admin/crud-manager';
import type { Partner } from '@/types/content';

type Props = {
    partners: Partner[];
};

const fields: CrudField[] = [
    { name: 'name', label: 'Nama Mitra', required: true },
    { name: 'url', label: 'Website Mitra', placeholder: 'https://...' },
    {
        name: 'logo',
        label: 'Logo',
        type: 'file',
        help: 'Kosongkan jika tidak ingin mengubah logo.',
    },
    { name: 'sort_order', label: 'Urutan', type: 'number' },
    { name: 'is_active', label: 'Tampilkan di landing page', type: 'checkbox' },
];

export default function AdminPartners({ partners }: Props) {
    return (
        <>
            <Head title="Mitra" />

            <div className="p-4 md:p-6">
                <CrudManager
                    title="Mitra"
                    description="Logo mitra dan lembaga pendukung yang tampil di landing page."
                    storeUrl="/admin/partners"
                    items={partners}
                    fields={fields}
                    updateUrl={(partner) => `/admin/partners/${partner.id}`}
                    deleteUrl={(partner) => `/admin/partners/${partner.id}`}
                    itemTitle={(partner) => partner.name}
                    createButtonLabel="Tambah Mitra"
                    renderItem={(partner) => (
                        <div className="flex items-center gap-4">
                            {partner.logo_url ? (
                                <img
                                    src={partner.logo_url}
                                    alt={partner.name}
                                    className="h-12 w-auto max-w-[120px] rounded border border-gray-200 bg-white object-contain p-1"
                                />
                            ) : (
                                <div className="flex h-12 w-20 items-center justify-center rounded border border-dashed border-gray-300 text-xs text-gray-400">
                                    No logo
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {partner.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Urutan {partner.sort_order} ·{' '}
                                    {partner.is_active ? (
                                        <span className="font-medium text-green-600">
                                            Aktif
                                        </span>
                                    ) : (
                                        <span className="font-medium text-red-500">
                                            Nonaktif
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    )}
                />
            </div>
        </>
    );
}
