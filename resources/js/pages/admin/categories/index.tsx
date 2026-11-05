import { Head } from '@inertiajs/react';
import { CrudManager, type CrudField } from '@/components/admin/crud-manager';
import type { PostCategory } from '@/types/content';

type Props = {
    categories: PostCategory[];
};

const fields: CrudField[] = [
    { name: 'name', label: 'Nama Kategori', required: true },
    {
        name: 'slug',
        label: 'Slug URL',
        placeholder: 'Kosongkan untuk otomatis',
    },
    { name: 'sort_order', label: 'Urutan', type: 'number' },
];

export default function AdminCategories({ categories }: Props) {
    return (
        <>
            <Head title="Kategori Blog" />

            <div className="p-4 md:p-6">
                <CrudManager
                    title="Kategori Blog"
                    description="Kategori yang dipakai untuk memfilter artikel di halaman blog."
                    storeUrl="/admin/categories"
                    items={categories}
                    fields={fields}
                    updateUrl={(category) => `/admin/categories/${category.id}`}
                    deleteUrl={(category) => `/admin/categories/${category.id}`}
                    itemTitle={(category) => category.name}
                    createButtonLabel="Tambah Kategori"
                    renderItem={(category) => (
                        <div>
                            <p className="font-semibold text-gray-900">
                                {category.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                /{category.slug} · {category.posts_count ?? 0}{' '}
                                artikel · Urutan {category.sort_order}
                            </p>
                        </div>
                    )}
                />
            </div>
        </>
    );
}
