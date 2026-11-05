import { Head } from '@inertiajs/react';
import { CrudManager, type CrudField } from '@/components/admin/crud-manager';
import type { Testimonial } from '@/types/content';

type Props = {
    testimonials: Testimonial[];
};

const fields: CrudField[] = [
    {
        name: 'quote',
        label: 'Isi Testimoni',
        type: 'textarea',
        required: true,
        full: true,
    },
    { name: 'name', label: 'Nama', required: true },
    { name: 'role', label: 'Jabatan / Peran' },
    {
        name: 'photo',
        label: 'Foto',
        type: 'file',
        help: 'Kosongkan jika tidak ingin mengubah foto.',
    },
    { name: 'sort_order', label: 'Urutan', type: 'number' },
    { name: 'is_active', label: 'Tampilkan di landing page', type: 'checkbox' },
];

export default function AdminTestimonials({ testimonials }: Props) {
    return (
        <>
            <Head title="Testimoni" />

            <div className="p-4 md:p-6">
                <CrudManager
                    title="Testimoni"
                    description="Kutipan dan foto penerima manfaat yang tampil di landing page."
                    storeUrl="/admin/testimonials"
                    items={testimonials}
                    fields={fields}
                    updateUrl={(testimonial) =>
                        `/admin/testimonials/${testimonial.id}`
                    }
                    deleteUrl={(testimonial) =>
                        `/admin/testimonials/${testimonial.id}`
                    }
                    itemTitle={(testimonial) => testimonial.name}
                    createButtonLabel="Tambah Testimoni"
                    renderItem={(testimonial) => (
                        <div className="flex items-start gap-4">
                            {testimonial.photo_url && (
                                <img
                                    src={testimonial.photo_url}
                                    alt={testimonial.name}
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <p className="line-clamp-2 text-gray-700 italic">
                                    "{testimonial.quote}"
                                </p>
                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                    {testimonial.name}
                                    {testimonial.role && (
                                        <span className="font-normal text-gray-500">
                                            {' '}
                                            · {testimonial.role}
                                        </span>
                                    )}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Urutan {testimonial.sort_order} ·{' '}
                                    {testimonial.is_active ? (
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
