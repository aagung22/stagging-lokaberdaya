import { Head } from '@inertiajs/react';
import { CrudManager, type CrudField } from '@/components/admin/crud-manager';
import type { HeroSlide } from '@/types/content';

type Props = {
    slides: HeroSlide[];
};

const fields: CrudField[] = [
    {
        name: 'image',
        label: 'Gambar Slide',
        type: 'file',
        help: 'Wajib diisi saat menambah slide baru. Format JPG, PNG, WEBP maks. 4 MB.',
    },
    { name: 'title', label: 'Judul', placeholder: 'Judul slide' },
    { name: 'subtitle', label: 'Subjudul', placeholder: 'Deskripsi singkat' },
    { name: 'sort_order', label: 'Urutan', type: 'number' },
    { name: 'is_active', label: 'Tampilkan di landing page', type: 'checkbox' },
];

export default function AdminHeroSlides({ slides }: Props) {
    return (
        <>
            <Head title="Slide Hero" />

            <div className="p-4 md:p-6">
                <div
                    className="
                        [&_input:not([type='checkbox']):not([type='file'])]:text-gray-900
                        [&_input:not([type='checkbox']):not([type='file'])]:placeholder:text-gray-400
                        [&_textarea]:text-gray-900
                        [&_textarea]:placeholder:text-gray-400
                        [&_select]:text-gray-900
                    "
                >
                    <CrudManager
                        title="Slide Hero"
                        description="Gambar latar yang tampil bergantian di bagian atas landing page."
                        storeUrl="/admin/hero-slides"
                        items={slides}
                        fields={fields}
                        updateUrl={(slide) => `/admin/hero-slides/${slide.id}`}
                        deleteUrl={(slide) => `/admin/hero-slides/${slide.id}`}
                        itemTitle={(slide) => slide.title || 'Slide'}
                        createButtonLabel="Tambah Slide"
                        renderItem={(slide) => (
                            <div className="flex items-start gap-4">
                                {slide.image_url && (
                                    <img
                                        src={slide.image_url}
                                        alt={slide.title ?? 'Slide'}
                                        className="h-16 w-24 rounded-lg object-cover"
                                    />
                                )}
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {slide.title || 'Tanpa judul'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {slide.subtitle || 'Tanpa subjudul'}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        Urutan {slide.sort_order} ·{' '}
                                        {slide.is_active ? (
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
            </div>
        </>
    );
}