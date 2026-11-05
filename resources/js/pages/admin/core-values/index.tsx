import { Head } from '@inertiajs/react';
import { CrudManager, type CrudField } from '@/components/admin/crud-manager';
import type { CoreValue } from '@/types/content';

type Props = {
    values: CoreValue[];
};

const fields: CrudField[] = [
    { name: 'title', label: 'Judul Nilai', required: true },
    {
        name: 'description',
        label: 'Deskripsi',
        type: 'textarea',
        required: true,
        full: true,
    },
    {
        name: 'icon',
        label: 'Ikon',
        type: 'select',
        options: [
            { value: 'leaf', label: 'Daun (leaf)' },
            { value: 'heart', label: 'Hati (heart)' },
            { value: 'trending-up', label: 'Grafik (trending-up)' },
        ],
    },
    { name: 'sort_order', label: 'Urutan', type: 'number' },
];

export default function AdminCoreValues({ values }: Props) {
    return (
        <>
            <Head title="Nilai Perjuangan" />

            <div className="p-4 md:p-6">
                <CrudManager
                    title="Nilai Perjuangan"
                    description="Nilai-nilai inti yang tampil di halaman Tentang Kami."
                    storeUrl="/admin/core-values"
                    items={values}
                    fields={fields}
                    updateUrl={(value) => `/admin/core-values/${value.id}`}
                    deleteUrl={(value) => `/admin/core-values/${value.id}`}
                    itemTitle={(value) => value.title}
                    createButtonLabel="Tambah Nilai"
                    renderItem={(value) => (
                        <div>
                            <p className="font-semibold text-gray-900">
                                {value.title}
                            </p>
                            <p className="line-clamp-2 text-sm text-gray-500">
                                {value.description}
                            </p>
                            <p className="text-xs text-gray-400">
                                Ikon {value.icon ?? '-'} · Urutan{' '}
                                {value.sort_order}
                            </p>
                        </div>
                    )}
                />
            </div>
        </>
    );
}
