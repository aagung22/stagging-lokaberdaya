import { type FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Post, PostCategory } from '@/types/content';

type Props = {
    post: Post | null;
    categories: PostCategory[];
};

const labelClass = 'mb-1.5 block';
const fieldClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none';

function toDateInput(value: string | null): string {
    if (!value) return '';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value.slice(0, 10);

    return date.toISOString().slice(0, 10);
}

export default function AdminPostEdit({ post, categories }: Props) {
    const isEditing = post !== null;

    const form = useForm({
        title: post?.title ?? '',
        slug: post?.slug ?? '',
        post_category_id: post?.post_category_id
            ? String(post.post_category_id)
            : '',
        author: post?.author ?? '',
        published_at: toDateInput(post?.published_at ?? null),
        excerpt: post?.excerpt ?? '',
        body: post?.body ?? '',
        external_link: post?.external_link ?? '',
        sort_order: post?.sort_order ?? 0,
        is_published: post?.is_published ?? true,
        image: null as File | null,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (isEditing) {
            form.put(`/admin/posts/${post.id}`, {
                forceFormData: true,
                preserveScroll: true,
            });

            return;
        }

        form.post('/admin/posts', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head
                title={
                    isEditing
                        ? `Edit Artikel - ${post.title}`
                        : 'Tambah Artikel'
                }
            />

            <form onSubmit={submit} className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/admin/posts"
                            className="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#4b552a]"
                        >
                            <ArrowLeft className="h-4 w-4" /> Kembali ke daftar
                            artikel
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditing ? 'Edit Artikel' : 'Tambah Artikel'}
                        </h1>
                    </div>
                    <Button type="submit" disabled={form.processing}>
                        {isEditing ? 'Simpan Perubahan' : 'Simpan Artikel'}
                    </Button>
                </div>

                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label className={labelClass}>Judul *</Label>
                            <Input
                                value={form.data.title}
                                onChange={(event) =>
                                    form.setData('title', event.target.value)
                                }
                                className="bg-white"
                                required
                            />
                            {form.errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className={labelClass}>Slug URL</Label>
                            <Input
                                value={form.data.slug}
                                onChange={(event) =>
                                    form.setData('slug', event.target.value)
                                }
                                placeholder="Kosongkan untuk otomatis"
                                className="bg-white"
                            />
                            {form.errors.slug && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.errors.slug}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className={labelClass}>Kategori</Label>
                            <select
                                value={form.data.post_category_id}
                                onChange={(event) =>
                                    form.setData(
                                        'post_category_id',
                                        event.target.value,
                                    )
                                }
                                className={fieldClass}
                            >
                                <option value="">Tanpa kategori</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={String(category.id)}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label className={labelClass}>Penulis</Label>
                            <Input
                                value={form.data.author}
                                onChange={(event) =>
                                    form.setData('author', event.target.value)
                                }
                                className="bg-white"
                            />
                        </div>

                        <div>
                            <Label className={labelClass}>
                                Tanggal Publikasi
                            </Label>
                            <Input
                                type="date"
                                value={form.data.published_at}
                                onChange={(event) =>
                                    form.setData(
                                        'published_at',
                                        event.target.value,
                                    )
                                }
                                className="bg-white"
                            />
                            {form.errors.published_at && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.errors.published_at}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className={labelClass}>Urutan</Label>
                            <Input
                                type="number"
                                value={form.data.sort_order}
                                onChange={(event) =>
                                    form.setData(
                                        'sort_order',
                                        Number(event.target.value),
                                    )
                                }
                                className="bg-white"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label className={labelClass}>
                                Link Eksternal (opsional)
                            </Label>
                            <Input
                                value={form.data.external_link}
                                onChange={(event) =>
                                    form.setData(
                                        'external_link',
                                        event.target.value,
                                    )
                                }
                                placeholder="https://..."
                                className="bg-white"
                            />
                            {form.errors.external_link && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.errors.external_link}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <Label className={labelClass}>Ringkasan</Label>
                            <textarea
                                value={form.data.excerpt}
                                onChange={(event) =>
                                    form.setData('excerpt', event.target.value)
                                }
                                rows={3}
                                className={fieldClass}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label className={labelClass}>Isi Artikel</Label>
                            <textarea
                                value={form.data.body}
                                onChange={(event) =>
                                    form.setData('body', event.target.value)
                                }
                                rows={10}
                                className={fieldClass}
                            />
                        </div>

                        <div>
                            <Label className={labelClass}>Gambar Cover</Label>
                            {post?.image_url && (
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="mb-2 h-24 w-auto rounded border border-gray-200 object-cover"
                                />
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(event) =>
                                    form.setData(
                                        'image',
                                        event.target.files?.[0] ?? null,
                                    )
                                }
                                className="bg-white"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Kosongkan jika tidak ingin mengubah gambar.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 pt-6">
                            <input
                                id="is_published"
                                type="checkbox"
                                checked={form.data.is_published}
                                onChange={(event) =>
                                    form.setData(
                                        'is_published',
                                        event.target.checked,
                                    )
                                }
                                className="h-4 w-4 rounded border-gray-300 text-[#4b552a] focus:ring-[#4b552a]"
                            />
                            <Label
                                htmlFor="is_published"
                                className="cursor-pointer"
                            >
                                Publikasikan artikel
                            </Label>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end">
                    <Button type="submit" disabled={form.processing}>
                        {isEditing ? 'Simpan Perubahan' : 'Simpan Artikel'}
                    </Button>
                </div>
            </form>
        </>
    );
}
