import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Post } from '@/types/content';

type Props = {
    posts: Post[];
};

type StatusFilter = 'all' | 'published' | 'draft';

function formatDate(value: string | null): string {
    if (!value) return 'Belum terjadwal';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function AdminPosts({ posts }: Props) {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');
    const [categoryId, setCategoryId] = useState<string>('all');
    const [showAll, setShowAll] = useState(false);
    const [perPage, setPerPage] = useState(10);

    const remove = (post: Post) => {
        if (
            !window.confirm(
                `Hapus artikel "${post.title}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/posts/${post.id}`, { preserveScroll: true });
    };

    // Daftar kategori unik dari posts
    const categories = useMemo(() => {
        const map = new Map<string, string>();
        posts.forEach((p) => {
            if (p.category?.id && p.category?.name) {
                map.set(String(p.category.id), p.category.name);
            }
        });
        return Array.from(map, ([id, name]) => ({ id, name }));
    }, [posts]);

    // Filter + search
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();

        return posts.filter((p) => {
            if (status === 'published' && !p.is_published) return false;
            if (status === 'draft' && p.is_published) return false;

            if (
                categoryId !== 'all' &&
                String(p.category?.id ?? '') !== categoryId
            ) {
                return false;
            }

            if (!q) return true;

            const haystack = [
                p.title,
                p.author ?? '',
                p.category?.name ?? '',
            ]
                .join(' ')
                .toLowerCase();

            return haystack.includes(q);
        });
    }, [posts, search, status, categoryId]);

    const visible = showAll ? filtered : filtered.slice(0, perPage);
    const hasActiveFilter =
        search.trim() !== '' ||
        status !== 'all' ||
        categoryId !== 'all';

    const resetFilters = () => {
        setSearch('');
        setStatus('all');
        setCategoryId('all');
    };

    return (
        <>
            <Head title="Artikel Blog" />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Artikel Blog
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola publikasi berita dan artikel di halaman blog.
                        </p>
                    </div>
                    <Link
                        href="/admin/posts/create"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#4b552a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3a4220]"
                    >
                        <Plus className="h-4 w-4" /> Tambah Artikel
                    </Link>
                </div>

                {/* Toolbar: Search & Filter */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul, penulis, atau kategori..."
                                className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-9 text-sm text-gray-900 outline-none transition focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label="Hapus pencarian"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Status */}
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as StatusFilter)
                            }
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                        >
                            <option value="all">Semua Status</option>
                            <option value="published">Terbit</option>
                            <option value="draft">Draft</option>
                        </select>

                        {/* Kategori */}
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                        >
                            <option value="all">Semua Kategori</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        {/* Reset */}
                        {hasActiveFilter && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <X className="h-4 w-4" /> Reset
                            </button>
                        )}
                    </div>

                    {hasActiveFilter && (
                        <p className="mt-3 text-xs text-gray-500">
                            Menampilkan {filtered.length} dari {posts.length}{' '}
                            artikel.
                        </p>
                    )}
                </div>

                {/* List */}
                {filtered.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                        {posts.length === 0
                            ? 'Belum ada artikel. Klik "Tambah Artikel".'
                            : 'Tidak ada artikel yang cocok dengan filter/pencarian.'}
                    </div>
                ) : (
                    <>
                        <div className="space-y-3">
                            {visible.map((post) => (
                                <div
                                    key={post.id}
                                    className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                >
                                    <div className="flex min-w-0 items-start gap-4">
                                        {post.image_url && (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="h-16 w-24 rounded-lg object-cover"
                                            />
                                        )}
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900">
                                                {post.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {post.category?.name ??
                                                    'Tanpa kategori'}{' '}
                                                · {post.author ?? 'Tanpa penulis'}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {formatDate(post.published_at)} ·{' '}
                                                {post.is_published ? (
                                                    <span className="font-medium text-green-600">
                                                        Terbit
                                                    </span>
                                                ) : (
                                                    <span className="font-medium text-red-500">
                                                        Draft
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2">
                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                        >
                                            <Pencil className="h-4 w-4" /> Edit
                                        </Link>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => remove(post)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Show All / Pagination control */}
                        {!showAll && filtered.length > perPage && (
                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
                                <span>
                                    Menampilkan {visible.length} dari{' '}
                                    {filtered.length} artikel
                                </span>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={perPage}
                                        onChange={(e) => {
                                            setPerPage(Number(e.target.value));
                                            setShowAll(false);
                                        }}
                                        className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                                    >
                                        <option value={5}>5 / hal</option>
                                        <option value={10}>10 / hal</option>
                                        <option value={25}>25 / hal</option>
                                        <option value={50}>50 / hal</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => setShowAll(true)}
                                        className="rounded-lg border border-gray-300 px-3 py-1.5 font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Tampilkan semua
                                    </button>
                                </div>
                            </div>
                        )}

                        {showAll && filtered.length > perPage && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowAll(false)}
                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    Sembunyikan (tampilkan {perPage})
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}