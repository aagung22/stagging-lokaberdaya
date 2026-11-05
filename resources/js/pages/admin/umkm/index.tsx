import { Head, Link, router } from '@inertiajs/react';
import { ChevronDown, MapPin, Pencil, Plus, Search, Trash2, Users, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { UmkmRegion } from '@/types/content';

type Props = {
    regions: UmkmRegion[];
};

type SortFilter = 'default' | 'az' | 'za' | 'most_beneficiaries' | 'most_images';

export default function AdminUmkm({ regions }: Props) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortFilter>('default');
    const [showAll, setShowAll] = useState(false);
    const [perPage, setPerPage] = useState(6); // Default 6 karena menggunakan grid 2 kolom

    const remove = (region: UmkmRegion) => {
        if (
            !window.confirm(
                `Hapus wilayah "${region.city}" beserta gambar dan penerima manfaatnya? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/umkm/${region.id}`, { preserveScroll: true });
    };

    // Filter dan Sorting
    const filteredAndSorted = useMemo(() => {
        const q = search.trim().toLowerCase();

        let result = regions.filter((r) => {
            if (!q) return true;
            const haystack = [r.city, r.description ?? ''].join(' ').toLowerCase();
            return haystack.includes(q);
        });

        if (sortBy === 'az') {
            result.sort((a, b) => a.city.localeCompare(b.city));
        } else if (sortBy === 'za') {
            result.sort((a, b) => b.city.localeCompare(a.city));
        } else if (sortBy === 'most_beneficiaries') {
            result.sort((a, b) => (b.beneficiaries_count ?? 0) - (a.beneficiaries_count ?? 0));
        } else if (sortBy === 'most_images') {
            result.sort((a, b) => (b.images_count ?? 0) - (a.images_count ?? 0));
        } else {
            // Default: urutkan berdasarkan sort_order
            result.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        }

        return result;
    }, [regions, search, sortBy]);

    const visible = showAll ? filteredAndSorted : filteredAndSorted.slice(0, perPage);
    const hasActiveFilter = search.trim() !== '' || sortBy !== 'default';

    const resetFilters = () => {
        setSearch('');
        setSortBy('default');
    };

    return (
        <>
            <Head title="Wilayah UMKM" />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Wilayah UMKM
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola wilayah sebaran penerima manfaat UMKM beserta
                            galeri dan daftar pelakunya.
                        </p>
                    </div>
                    <Link
                        href="/admin/umkm/create"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#4b552a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3a4220]"
                    >
                        <Plus className="h-4 w-4" /> Tambah Wilayah
                    </Link>
                </div>

                {/* Toolbar: Search & Filter */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        {/* Search */}
                        <div className="relative flex-1 lg:min-w-[240px]">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama kota atau deskripsi wilayah..."
                                className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-9 text-sm text-gray-900 outline-none transition focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch('')}
                                    className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                                    aria-label="Hapus pencarian"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Filter Urutan */}
                        <div className="relative w-full sm:w-auto">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortFilter)}
                                className="h-10 w-full appearance-none rounded-lg border border-gray-300 bg-white pl-4 pr-10 text-sm text-gray-700 outline-none transition hover:bg-gray-50 focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a] sm:min-w-[180px]"
                            >
                                <option value="default">Urutan Default</option>
                                <option value="az">Nama Kota (A-Z)</option>
                                <option value="za">Nama Kota (Z-A)</option>
                                <option value="most_beneficiaries">Penerima Terbanyak</option>
                                <option value="most_images">Gambar Terbanyak</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        </div>

                        {/* Reset */}
                        {hasActiveFilter && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 w-full sm:w-auto"
                            >
                                <X className="h-4 w-4" /> Reset
                            </button>
                        )}
                    </div>

                    {hasActiveFilter && (
                        <p className="mt-3 text-xs text-gray-500">
                            Menampilkan {filteredAndSorted.length} dari {regions.length} wilayah.
                        </p>
                    )}
                </div>

                {/* Grid List */}
                {filteredAndSorted.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                        {regions.length === 0
                            ? 'Belum ada wilayah UMKM.'
                            : 'Tidak ada wilayah yang cocok dengan filter/pencarian.'}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {visible.map((region) => (
                                <div
                                    key={region.id}
                                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                                                <MapPin className="h-5 w-5 text-[#4b552a]" />
                                                {region.city}
                                            </h2>
                                            <p className="mt-1 text-xs text-gray-400">
                                                Urutan {region.sort_order}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/umkm/${region.id}/edit`}
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                            >
                                                <Pencil className="h-4 w-4" /> Edit
                                            </Link>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => remove(region)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                                        {region.description ??
                                            'Belum ada deskripsi wilayah.'}
                                    </p>

                                    <div className="mt-4 flex gap-5 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {region.beneficiaries_count ?? 0}{' '}
                                            penerima manfaat
                                        </span>
                                        <span>
                                            {region.images_count ?? 0} gambar
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Show All / Pagination control */}
                        {!showAll && filteredAndSorted.length > perPage && (
                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
                                <span>
                                    Menampilkan {visible.length} dari{' '}
                                    {filteredAndSorted.length} wilayah
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <select
                                            value={perPage}
                                            onChange={(e) => {
                                                setPerPage(Number(e.target.value));
                                                setShowAll(false);
                                            }}
                                            className="h-9 appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-8 text-sm text-gray-700 outline-none transition hover:bg-gray-50 focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                                        >
                                            <option value={6}>6 / hal</option>
                                            <option value={12}>12 / hal</option>
                                            <option value={24}>24 / hal</option>
                                            <option value={48}>48 / hal</option>
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowAll(true)}
                                        className="h-9 rounded-lg border border-gray-300 px-3 font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Tampilkan semua
                                    </button>
                                </div>
                            </div>
                        )}

                        {showAll && filteredAndSorted.length > perPage && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowAll(false)}
                                    className="h-9 rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
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